// ============================================================
// STEM Adventure Platform — usePhase4Sequence
// Phase 4
//
// State machine that drives the Phase 4 gateway cinematic flow.
// Automatically orchestrates timings for Tesseract wakeup,
// shockwave, gateway opening, dialogue, entrance, travel, and arrival.
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { PHASE4_DIALOGUE, PHASE4_TIMINGS } from '../data/dialogue';
import { useGameState } from '../context/GameStateContext';
import type { TesseractPhase } from '../components/story/TesseractObject';

export type Phase4SubPhase =
  | 'ACTIVATION_WAIT'  // quiet start, holding cube
  | 'ACTIVATING'       // cube floats up, glowing builds
  | 'PULSING'          // shockwave expands
  | 'GATEWAY_FORMING'  // square gateway energy forms
  | 'GATEWAY_OPEN'     // gateway stabilized, dialogue active
  | 'GATEWAY_ENTER'    // stepping into gateway, screen whiteout
  | 'TRAVEL'           // moving through tunnel sequence
  | 'ARRIVAL';         // central chamber panning

interface Phase4SequenceState {
  subPhase: Phase4SubPhase;
  dialogueIndex: number;
  showDialogue: boolean;
  tesseractPhase: TesseractPhase;
  gatewayPhase: 'hidden' | 'forming' | 'open';
  advanceDialogue: () => void;
}

export function usePhase4Sequence(): Phase4SequenceState {
  const { state, navigateTo, dispatch } = useGameState();
  const savedDialogue = state.isStoryRecallMode ? 0 : (state.dialogueProgress['phase4-dialogue'] ?? 0);

  // ── Initialize sub-phase based on global currentScene ──────
  const [subPhase, setSubPhase] = useState<Phase4SubPhase>(() => {
    switch (state.currentScene) {
      case 'GATEWAY_OPENING':
        return 'GATEWAY_OPEN';
      case 'GATEWAY_TRAVEL':
        return 'TRAVEL';
      case 'NEW_WORLD_ARRIVAL':
        return 'ARRIVAL';
      default:
        return 'ACTIVATION_WAIT';
    }
  });

  // ── Initialize dialogue index ──────────────────────────────
  const [dialogueIndex, setDialogueIndex] = useState(() => {
    if (state.currentScene === 'GATEWAY_OPENING') {
      return Math.min(savedDialogue, PHASE4_DIALOGUE.length - 1);
    }
    return 0;
  });

  // Keep a reference of the current scene updated on every render to check in the cleanup closure
  const currentSceneRef = useRef(state.currentScene);
  currentSceneRef.current = state.currentScene;

  // Track if action timers are currently playing
  const timerStartedRef = useRef(false);

  // ── Auto-advance intro timeline (only on ACTIVATION_WAIT) ──
  useEffect(() => {
    if (state.currentScene !== 'TESSERACT_ACTIVATION') return;
    if (timerStartedRef.current) return;
    
    timerStartedRef.current = true;
    const T = PHASE4_TIMINGS;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const t0 = 0;
    const t1 = t0 + 1500;                  // ACTIVATION_WAIT → ACTIVATING
    const t2 = t1 + T.TESSERACT_WAKE;      // ACTIVATING → PULSING
    const t3 = t2 + T.ENERGY_PULSE;        // PULSING → GATEWAY_FORMING
    const t4 = t3 + T.GATEWAY_FORMING;     // GATEWAY_FORMING → GATEWAY_OPEN

    timers.push(setTimeout(() => setSubPhase('ACTIVATING'), t1));
    timers.push(setTimeout(() => setSubPhase('PULSING'), t2));
    timers.push(setTimeout(() => {
      setSubPhase('GATEWAY_FORMING');
      navigateTo('GATEWAY_OPENING');
    }, t3));
    
    timers.push(setTimeout(() => {
      setSubPhase('GATEWAY_OPEN');
      setDialogueIndex(0);
    }, t4));

    return () => {
      const nextScene = currentSceneRef.current;
      const isPhase4Scene = [
        'TESSERACT_ACTIVATION',
        'GATEWAY_OPENING',
        'GATEWAY_TRAVEL',
        'NEW_WORLD_ARRIVAL',
      ].includes(nextScene);

      if (!isPhase4Scene) {
        timers.forEach(clearTimeout);
        timerStartedRef.current = false;
      }
    };
  }, [state.currentScene, navigateTo]);

  // ── Auto-advance travel/arrival timelines ─────────────────
  useEffect(() => {
    if (subPhase === 'GATEWAY_ENTER') {
      const timer = setTimeout(() => {
        setSubPhase('TRAVEL');
        navigateTo('GATEWAY_TRAVEL');
      }, PHASE4_TIMINGS.GATEWAY_ENTER);
      return () => clearTimeout(timer);
    }

    if (subPhase === 'TRAVEL') {
      const timer = setTimeout(() => {
        setSubPhase('ARRIVAL');
        navigateTo('NEW_WORLD_ARRIVAL');
      }, PHASE4_TIMINGS.TRAVEL_TUNNEL);
      return () => clearTimeout(timer);
    }
  }, [subPhase, navigateTo]);

  // ── Map internal sub-phase to Tesseract phase ──────────────
  const tesseractPhase: TesseractPhase = (() => {
    switch (subPhase) {
      case 'ACTIVATION_WAIT': return 'held';
      case 'ACTIVATING':      return 'activating';
      case 'PULSING':         return 'pulsing';
      case 'GATEWAY_FORMING': return 'pulsing';
      case 'GATEWAY_OPEN':    return 'floating';
      case 'GATEWAY_ENTER':   return 'traveling';
      case 'TRAVEL':          return 'traveling';
      case 'ARRIVAL':         return 'calm';
      default:                return 'hidden';
    }
  })();

  // ── Map internal sub-phase to Tesseract Gateway phase ──────
  const gatewayPhase: 'hidden' | 'forming' | 'open' = (() => {
    switch (subPhase) {
      case 'GATEWAY_FORMING': return 'forming';
      case 'GATEWAY_OPEN':
      case 'GATEWAY_ENTER':   return 'open';
      default:                return 'hidden';
    }
  })();

  const showDialogue = subPhase === 'GATEWAY_OPEN';

  // ── Advance dialogue ──────────────────────────────────────────
  const advanceDialogue = useCallback(() => {
    setDialogueIndex((prev) => {
      if (!state.isStoryRecallMode) {
        dispatch({ type: 'ADVANCE_DIALOGUE', sequenceId: 'phase4-dialogue' });
      }
      
      const next = prev + 1;
      if (next >= PHASE4_DIALOGUE.length) {
        // Dialogue finished — step through the gateway!
        setSubPhase('GATEWAY_ENTER');
        return prev;
      }
      return next;
    });
  }, [dispatch, state.isStoryRecallMode]);

  return {
    subPhase,
    dialogueIndex,
    showDialogue,
    tesseractPhase,
    gatewayPhase,
    advanceDialogue,
  };
}
