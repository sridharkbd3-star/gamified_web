// ============================================================
// STEM Adventure Platform — Game State Context
// Phase 1 Foundation
//
// Centralized state management using useReducer + Context.
// Automatically syncs to localStorage on every state change.
// All future phases dispatch actions to this reducer.
// ============================================================

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import type { GameState, GameAction, DomainId, StoneId } from '../types';
import { DEFAULT_PLAYER } from '../data/player';
import { saveGameState, loadGameState, resetGameState, saveUserGameState, loadUserGameState, loadSessionEmail } from '../utils/gameStorage';

// ----------------------------------------------------------
// INITIAL STATE
// Represents a player who has not started the journey.
// ----------------------------------------------------------
export const INITIAL_GAME_STATE: GameState = {
  currentScene: 'LANDING',
  currentDomainId: null,
  currentStageId: null,
  player: DEFAULT_PLAYER,
  completedStageIds: [],
  dialogueProgress: {},
  isFinalPathUnlocked: false,
  isHeroTransformationComplete: false,
  isFirstMainInterfaceVisit: true,
  isStoryRecallMode: false,
  visitedDomains: [],
  stagePerformance: {},
  _version: 1,
  currentUserEmail: null,
  hasSeenIntroStory: false,
};

// ----------------------------------------------------------
// REDUCER
// Pure function — no side effects inside the reducer.
// localStorage sync happens in the useEffect below.
// ----------------------------------------------------------
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NAVIGATE_TO_SCENE':
      return { ...state, currentScene: action.scene };

    case 'ENTER_DOMAIN':
      return { ...state, currentDomainId: action.domainId };

    case 'EXIT_DOMAIN':
      return { ...state, currentDomainId: null, currentStageId: null };

    case 'ENTER_STAGE':
      return { ...state, currentStageId: action.stageId };

    case 'COMPLETE_STAGE': {
      const alreadyDone = state.completedStageIds.includes(action.stageId);
      if (alreadyDone) return state;
      return {
        ...state,
        completedStageIds: [...state.completedStageIds, action.stageId],
      };
    }

    case 'COLLECT_STONE': {
      const alreadyCollected = state.player.collectedStones.includes(action.stoneId);
      if (alreadyCollected) return state;

      const newStones: StoneId[] = [...state.player.collectedStones, action.stoneId];
      const newDomains: DomainId[] = [...state.player.completedDomains, action.domainId];
      const allFour = newStones.length >= 4;

      return {
        ...state,
        player: {
          ...state.player,
          collectedStones: newStones,
          completedDomains: newDomains,
          overallProgress: Math.min(100, newStones.length * 25),
        },
        isFinalPathUnlocked: allFour,
      };
    }

    case 'ADVANCE_DIALOGUE': {
      const current = state.dialogueProgress[action.sequenceId] ?? 0;
      return {
        ...state,
        dialogueProgress: {
          ...state.dialogueProgress,
          [action.sequenceId]: current + 1,
        },
      };
    }

    case 'UNLOCK_FINAL_PATH':
      return { ...state, isFinalPathUnlocked: true };

    case 'COMPLETE_HERO_TRANSFORMATION':
      return {
        ...state,
        isHeroTransformationComplete: true,
        player: { ...state.player, avatarId: 'hero', level: 5 },
      };

    case 'UPDATE_PLAYER':
      return { ...state, player: { ...state.player, ...action.updates } };

    case 'MARK_FIRST_VISIT_COMPLETE':
      return { ...state, isFirstMainInterfaceVisit: false };

    case 'MARK_DOMAIN_VISITED':
      if (state.visitedDomains.includes(action.domainId)) return state;
      return {
        ...state,
        visitedDomains: [...state.visitedDomains, action.domainId],
      };

    case 'RECORD_STAGE_PERFORMANCE':
      return {
        ...state,
        stagePerformance: {
          ...state.stagePerformance,
          [action.stageId]: action.performance,
        },
      };

    case 'SET_STORY_RECALL_MODE':
      return { ...state, isStoryRecallMode: action.active };

    case 'LOGIN_USER': {
      const baseState = action.progressState ?? INITIAL_GAME_STATE;
      return {
        ...INITIAL_GAME_STATE,
        ...baseState,
        currentUserEmail: action.email,
        currentScene: baseState.hasSeenIntroStory ? 'MAIN_INTERFACE' : 'INTRO',
      };
    }

    case 'LOGOUT_USER':
      return {
        ...INITIAL_GAME_STATE,
        currentUserEmail: null,
        currentScene: 'LANDING',
      };

    case 'MARK_STORY_SEEN':
      return {
        ...state,
        hasSeenIntroStory: true,
      };

    case 'RESET_GAME':
      resetGameState();
      return INITIAL_GAME_STATE;

    case 'LOAD_STATE':
      return {
        ...INITIAL_GAME_STATE,
        ...action.state,
        player: {
          ...INITIAL_GAME_STATE.player,
          ...(action.state?.player ?? {}),
        },
        dialogueProgress: {
          ...INITIAL_GAME_STATE.dialogueProgress,
          ...(action.state?.dialogueProgress ?? {}),
        },
        isStoryRecallMode: action.state?.isStoryRecallMode ?? INITIAL_GAME_STATE.isStoryRecallMode,
        visitedDomains: action.state?.visitedDomains ?? INITIAL_GAME_STATE.visitedDomains,
        stagePerformance: action.state?.stagePerformance ?? INITIAL_GAME_STATE.stagePerformance,
        currentUserEmail: action.state?.currentUserEmail ?? null,
        hasSeenIntroStory: action.state?.hasSeenIntroStory ?? false,
      };

    default:
      return state;
  }
}

// ----------------------------------------------------------
// CONTEXT TYPE
// ----------------------------------------------------------
interface GameStateContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  /** Convenience helpers */
  navigateTo: (scene: GameState['currentScene']) => void;
  resetGame: () => void;
}

const GameStateContext = createContext<GameStateContextValue | undefined>(undefined);

// ----------------------------------------------------------
// PROVIDER
// ----------------------------------------------------------
interface GameStateProviderProps {
  children: React.ReactNode;
}

export function GameStateProvider({ children }: GameStateProviderProps) {
  // Load persisted state on first render
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE, () => {
    const activeEmail = loadSessionEmail();
    if (activeEmail) {
      const saved = loadUserGameState(activeEmail);
      if (saved) {
        return {
          ...INITIAL_GAME_STATE,
          ...saved,
          currentScene: 'LANDING' as const,
          player: {
            ...INITIAL_GAME_STATE.player,
            ...(saved.player ?? {}),
          },
          dialogueProgress: {
            ...INITIAL_GAME_STATE.dialogueProgress,
            ...(saved.dialogueProgress ?? {}),
          },
          isStoryRecallMode: saved.isStoryRecallMode ?? INITIAL_GAME_STATE.isStoryRecallMode,
          visitedDomains: saved.visitedDomains ?? INITIAL_GAME_STATE.visitedDomains,
          stagePerformance: saved.stagePerformance ?? INITIAL_GAME_STATE.stagePerformance,
          currentUserEmail: activeEmail,
          hasSeenIntroStory: saved.hasSeenIntroStory ?? false,
        };
      }
    }
    const savedGlobal = loadGameState();
    if (savedGlobal) {
      return {
        ...INITIAL_GAME_STATE,
        ...savedGlobal,
        currentScene: 'LANDING' as const,
        player: {
          ...INITIAL_GAME_STATE.player,
          ...(savedGlobal.player ?? {}),
        },
        dialogueProgress: {
          ...INITIAL_GAME_STATE.dialogueProgress,
          ...(savedGlobal.dialogueProgress ?? {}),
        },
        isStoryRecallMode: savedGlobal.isStoryRecallMode ?? INITIAL_GAME_STATE.isStoryRecallMode,
        visitedDomains: savedGlobal.visitedDomains ?? INITIAL_GAME_STATE.visitedDomains,
        stagePerformance: savedGlobal.stagePerformance ?? INITIAL_GAME_STATE.stagePerformance,
        currentUserEmail: null,
        hasSeenIntroStory: savedGlobal.hasSeenIntroStory ?? false,
      };
    }
    return INITIAL_GAME_STATE;
  });

  // Persist state to localStorage on every change
  useEffect(() => {
    if (state.currentUserEmail) {
      saveUserGameState(state.currentUserEmail, state);
    } else {
      saveGameState(state);
    }
  }, [state]);

  const navigateTo = useCallback(
    (scene: GameState['currentScene']) =>
      dispatch({ type: 'NAVIGATE_TO_SCENE', scene }),
    [],
  );

  const resetGame = useCallback(() => dispatch({ type: 'RESET_GAME' }), []);

  const value: GameStateContextValue = {
    state,
    dispatch,
    navigateTo,
    resetGame,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}

// ----------------------------------------------------------
// HOOK
// ----------------------------------------------------------
export function useGameState(): GameStateContextValue {
  const ctx = useContext(GameStateContext);
  if (!ctx) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return ctx;
}
