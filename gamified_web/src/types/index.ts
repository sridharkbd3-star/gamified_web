// ============================================================
// STEM Adventure Platform — Core TypeScript Types
// Phase 1 Foundation
// All future scenes, domains, stones, and state types live here.
// ============================================================

// ----------------------------------------------------------
// SCENE ARCHITECTURE
// All future scene names are registered here so the router
// knows about them from Day 1. Add new scenes to this union
// as each phase is built.
// ----------------------------------------------------------
export type SceneName =
  | 'LANGUAGE_SELECTION' // Language Choice before Login
  | 'LANDING'           // S.H.I.E.L.D. Landing page
  | 'SIGN_IN'           // Sign In page
  | 'TEACHER_SIGN_IN'   // Teacher Sign In page
  | 'SIGN_UP'           // Sign Up page
  | 'TEACHER_DASHBOARD' // Teacher Command Center Dashboard
  | 'FOUNDATION'        // Phase 1 only — remove in final build
  | 'INTRO'             // Phase 2 — young man wakes up
  | 'TIME_PORTAL'       // Phase 3 — portal appears
  | 'FUTURE_VISION'     // Phase 3 — future self speaks
  | 'TESSERACT'         // Phase 3 — Tesseract given
  | 'TESSERACT_ACTIVATION' // Phase 4 — Tesseract wakes up
  | 'GATEWAY_OPENING'   // Phase 4 — learning gateway forms
  | 'GATEWAY_TRAVEL'    // Phase 4 — tunnel sequence
  | 'NEW_WORLD_ARRIVAL' // Phase 4 — arrival in central chamber
  | 'MAIN_INTERFACE'    // Phase 5 — four STEM doors
  | 'SCIENCE_WORLD'     // Phase 6
  | 'TECHNOLOGY_WORLD'  // Phase 4
  | 'ENGINEERING_WORLD' // Phase 4
  | 'MATHEMATICS_WORLD' // Phase 4
  | 'LEARNING_PATH'     // Phase 5 — stage-by-stage learning
  | 'STONE_REWARD'      // Phase 5 — stone collected
  | 'FINAL_PATH'        // Phase 6 — four stones gathered
  | 'HERO_TRANSFORMATION' // Phase 6 — hero suit
  | 'ENDING';           // Phase 6 — finale

// ----------------------------------------------------------
// ROLES & DOUBTS
// ----------------------------------------------------------
export type UserRole = 'student' | 'teacher';

export interface DoubtItem {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  domainId: DomainId;
  domainName: string;
  stageTitle?: string;
  stageId?: string;
  question: string;
  answer?: string;
  answeredAt?: string;
  teacherName?: string;
  status: 'NEW' | 'WAITING' | 'ANSWERED';
  createdAt: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  role: 'student';
  overallProgress: number; // 0–100
  domainProgress: Record<DomainId, number>;
  currentStage: string;
  completedMissionsCount: number;
  xp: number;
  level: number;
  collectedStones: StoneId[];
  status: 'ACTIVE' | 'COMPLETED' | 'NEEDS_SUPPORT';
  recentActivity: string;
  doubts: DoubtItem[];
}

// ----------------------------------------------------------
// STEM DOMAINS
// ----------------------------------------------------------
export type DomainId = 'science' | 'technology' | 'engineering' | 'mathematics';

export interface StagePerformance {
  attempts: number;
  score: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  incorrectAnswers: number;
  hintsUsed: number;
  completionTime: number; // in seconds
}

export interface LearningStage {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  learningObjective?: string;
  concept?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  estimatedTime?: string;
  gameType?: string;
  reward?: string;
}

export interface STEMDomain {
  id: DomainId;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  /** Lucide icon name — resolved at render time */
  iconName: string;
  /** Primary color for this domain (CSS color string) */
  color: string;
  /** Secondary/glow color */
  glowColor: string;
  /** Associated stone ID */
  stoneId: StoneId;
  /** Learning stages — populated in Phase 5 */
  stages: LearningStage[];
  isUnlocked: boolean;
  isCompleted: boolean;
}

// ----------------------------------------------------------
// STONES
// ----------------------------------------------------------
export type StoneId =
  | 'science-stone'
  | 'technology-stone'
  | 'engineering-stone'
  | 'mathematics-stone';

export interface Stone {
  id: StoneId;
  name: string;
  domainId: DomainId;
  description: string;
  /** CSS color for the stone's glow */
  color: string;
  glowColor: string;
  isCollected: boolean;
}

// ----------------------------------------------------------
// PLAYER
// ----------------------------------------------------------
export type AvatarId = 'default' | 'hero'; // more added in Phase 6

export interface Player {
  name: string;
  avatarId: AvatarId;
  level: number;
  /** 0–100 overall journey progress */
  overallProgress: number;
  completedDomains: DomainId[];
  collectedStones: StoneId[];
  xp?: number;
}

// ----------------------------------------------------------
// DIALOGUE
// Phase 2+ dialogue system.
// event field triggers special visual moments (STEM reveal, etc.)
// ----------------------------------------------------------

/** Visual event triggered after a specific dialogue line completes. */
export type DialogueEvent =
  | 'STEM_REVEAL'
  | 'TESSERACT_REVEAL'
  | 'TESSERACT_HANDOVER'
  | 'PORTAL_REOPEN';

export interface DialogueLine {
  id: string;
  speakerId: string;
  speakerName: string;
  text: string;
  /** Optional: emotion / expression tag for future character animation */
  emotion?: 'neutral' | 'serious' | 'urgent' | 'hopeful' | 'proud';
  /** Optional: triggers a special visual event after this line completes */
  event?: DialogueEvent;
}

export interface DialogueSequence {
  id: string;
  lines: DialogueLine[];
  sceneId: SceneName;
}

// ----------------------------------------------------------
// GLOBAL GAME STATE
// The central state object that will be persisted in localStorage
// and managed by GameStateContext + useReducer.
// ----------------------------------------------------------
export interface GameState {
  currentScene: SceneName;
  /** null when not inside a domain world */
  currentDomainId: DomainId | null;
  /** null when not inside a learning path */
  currentStageId: string | null;
  player: Player;
  completedStageIds: string[];
  /** Dialogue line index for the active sequence */
  dialogueProgress: Record<string, number>;
  isFinalPathUnlocked: boolean;
  isHeroTransformationComplete: boolean;
  isFirstMainInterfaceVisit?: boolean;
  isStoryRecallMode?: boolean;
  visitedDomains: DomainId[];
  stagePerformance: Record<string, StagePerformance>;
  /** Internal version — bump when state schema changes */
  _version: number;
  
  // Auth & Role state
  currentUserEmail: string | null;
  userRole: UserRole;
  hasSeenIntroStory: boolean;
}

// ----------------------------------------------------------
// GAME STATE ACTIONS
// useReducer action types. Add new actions as each phase ships.
// ----------------------------------------------------------
export type GameAction =
  | { type: 'NAVIGATE_TO_SCENE'; scene: SceneName }
  | { type: 'ENTER_DOMAIN'; domainId: DomainId }
  | { type: 'EXIT_DOMAIN' }
  | { type: 'ENTER_STAGE'; stageId: string }
  | { type: 'COMPLETE_STAGE'; stageId: string }
  | { type: 'COLLECT_STONE'; stoneId: StoneId; domainId: DomainId }
  | { type: 'ADVANCE_DIALOGUE'; sequenceId: string }
  | { type: 'UNLOCK_FINAL_PATH' }
  | { type: 'COMPLETE_HERO_TRANSFORMATION' }
  | { type: 'UPDATE_PLAYER'; updates: Partial<Player> }
  | { type: 'MARK_FIRST_VISIT_COMPLETE' }
  | { type: 'RECORD_STAGE_PERFORMANCE'; stageId: string; performance: StagePerformance }
  | { type: 'MARK_DOMAIN_VISITED'; domainId: DomainId }
  | { type: 'SET_STORY_RECALL_MODE'; active: boolean }
  | { type: 'LOGIN_USER'; email: string; role?: UserRole; progressState: GameState | null }
  | { type: 'LOGOUT_USER' }
  | { type: 'MARK_STORY_SEEN' }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_STATE'; state: GameState };

// ----------------------------------------------------------
// UI COMPONENT PROP TYPES (shared)
// ----------------------------------------------------------
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  'aria-label'?: string;
}

export type ProgressVariant = 'linear' | 'segmented' | 'circular';

export interface ProgressProps {
  value: number; // 0–100
  max?: number;
  variant?: ProgressVariant;
  color?: string;
  label?: string;
  showValue?: boolean;
  className?: string;
}
