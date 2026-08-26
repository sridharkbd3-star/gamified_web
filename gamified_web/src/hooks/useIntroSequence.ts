// ============================================================
// STEM Adventure Platform — useIntroSequence hook
// Phase 2
//
// Manages the cinematic phase progression of the INTRO scene.
// Phases auto-advance on timers. The hook exposes the current
// phase and dialogue state for IntroScene to render.
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { INTRO_DIALOGUE, INTRO_PHASE_TIMINGS } from '../data/dialogue';

// ----------------------------------------------------------
// CINEMATIC PHASES (strictly ordered)
// ----------------------------------------------------------
export type IntroPhase =
  | 'DARKNESS'         // Pure black — nothing visible yet
  | 'ENERGY_APPEARS'   // Particles and atmospheric energy emerge
  | 'SILHOUETTE'       // Character silhouette fades in
  | 'REVEALING'        // Character image becomes more visible
  | 'WAKING'           // Character wakes — brief bright flash
  | 'LOOKING_AROUND'   // Character fully visible, looking around
  | 'DIALOGUE'         // Dialogue lines begin
  | 'COMPLETE';        // Phase 2 complete — awaiting Phase 3


interface IntroSequenceState {
  phase: IntroPhase;
  /** 0..1 overall environment reveal progress */
  environmentReveal: number;
  /** Current dialogue line index (-1 = no dialogue yet) */
  dialogueIndex: number;
  /** Whether dialogue is currently shown */
  showDialogue: boolean;
  /** Whether the sequence is complete (Phase 3 ready) */
  isComplete: boolean;
  /** Advance the current dialogue line */
  advanceDialogue: () => void;
}

export function useIntroSequence(): IntroSequenceState {
  const [phase, setPhase] = useState<IntroPhase>('DARKNESS');
  const [dialogueIndex, setDialogueIndex] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  // ── Auto-advance phases via timers ──────────────────────
  useEffect(() => {
    const T = INTRO_PHASE_TIMINGS;

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase('ENERGY_APPEARS'), T.DARKNESS_DURATION));

    timers.push(setTimeout(() => setPhase('SILHOUETTE'),
      T.DARKNESS_DURATION + T.ENERGY_BUILD_DURATION));

    timers.push(setTimeout(() => setPhase('REVEALING'),
      T.DARKNESS_DURATION + T.ENERGY_BUILD_DURATION + T.SILHOUETTE_DELAY));

    timers.push(setTimeout(() => setPhase('WAKING'),
      T.DARKNESS_DURATION + T.ENERGY_BUILD_DURATION + T.SILHOUETTE_DELAY + T.REVEAL_DELAY));

    timers.push(setTimeout(() => setPhase('LOOKING_AROUND'),
      T.DARKNESS_DURATION + T.ENERGY_BUILD_DURATION + T.SILHOUETTE_DELAY + T.REVEAL_DELAY + T.WAKING_DELAY));

    timers.push(setTimeout(() => {
      setPhase('DIALOGUE');
      setDialogueIndex(0);
    },
      T.DARKNESS_DURATION + T.ENERGY_BUILD_DURATION + T.SILHOUETTE_DELAY + T.REVEAL_DELAY + T.WAKING_DELAY + T.DIALOGUE_DELAY));

    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Environment reveal progress (0..1) ──────────────────
  const environmentReveal = (() => {
    switch (phase) {
      case 'DARKNESS':       return 0;
      case 'ENERGY_APPEARS': return 0.3;
      case 'SILHOUETTE':     return 0.5;
      case 'REVEALING':      return 0.65;
      case 'WAKING':         return 0.8;
      case 'LOOKING_AROUND': return 0.9;
      case 'DIALOGUE':
      case 'COMPLETE':       return 1.0;
      default:               return 0;
    }
  })();

  // ── Advance dialogue ──────────────────────────────────────
  const advanceDialogue = useCallback(() => {
    const totalLines = INTRO_DIALOGUE.lines.length;
    setDialogueIndex((prev) => {
      const next = prev + 1;
      if (next >= totalLines) {
        // All lines complete — Phase 2 is done, Phase 3 incoming
        setPhase('COMPLETE');
        setIsComplete(true);
        return prev;
      }
      return next;
    });
  }, []);

  return {
    phase,
    environmentReveal,
    dialogueIndex,
    showDialogue: phase === 'DIALOGUE' || phase === 'COMPLETE',
    isComplete,
    advanceDialogue,
  };
}
