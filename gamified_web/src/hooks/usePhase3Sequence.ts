// ============================================================
// STEM Adventure Platform — usePhase3Sequence
// Phase 3
//
// State machine for the Phase 3 cinematic sequence.
// Manages internal sub-phases, dialogue, and special event
// triggers (STEM reveal, Tesseract reveal, handover, etc.)
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { PHASE3_DIALOGUE, PHASE3_TIMINGS } from '../data/dialogue';
import type { DialogueEvent } from '../types';
import type { PortalPhase } from '../components/story/TimePortal';
import type { FutureSelfPhase } from '../components/story/FutureSelfReveal';
import type { TesseractPhase } from '../components/story/TesseractObject';
import { useGameState } from '../context/GameStateContext';

// ── Internal sub-phases ──────────────────────────────────────
export type Phase3SubPhase =
  | 'PORTAL_FORMING'
  | 'PORTAL_STABLE'
  | 'PORTAL_OPEN'
  | 'FUTURE_ARRIVING'
  | 'FIRST_MEETING'
  | 'DIALOGUE'
  | 'FUTURE_DEPARTING'
  | 'PORTAL_CLOSING'
  | 'YOUNG_MAN_ALONE'
  | 'COMPLETE';

interface Phase3SequenceState {
  subPhase: Phase3SubPhase;
  dialogueIndex: number;
  showDialogue: boolean;
  activeEvent: DialogueEvent | null;
  portalPhase: PortalPhase;
  futureSelfPhase: FutureSelfPhase;
  tesseractPhase: TesseractPhase;
  advanceDialogue: () => void;
  onSTEMRevealComplete: () => void;
}

export function usePhase3Sequence(): Phase3SequenceState {
  const { state, navigateTo, dispatch } = useGameState();
  const savedIndex = state.isStoryRecallMode ? 0 : (state.dialogueProgress['phase3-dialogue'] ?? 0);

  // ── Initialize subPhase based on persisted currentScene ────
  const [subPhase, setSubPhase] = useState<Phase3SubPhase>(() => {
    if (state.currentScene === 'FUTURE_VISION') return 'DIALOGUE';
    if (state.currentScene === 'TESSERACT') {
      if (savedIndex >= PHASE3_DIALOGUE.length - 1) return 'YOUNG_MAN_ALONE';
      return 'DIALOGUE';
    }
    return 'PORTAL_FORMING';
  });

  // ── Initialize dialogueIndex based on progress ──────────────
  const [dialogueIndex, setDialogueIndex] = useState(() => {
    if (state.currentScene === 'FUTURE_VISION') {
      return Math.min(savedIndex, 11);
    }
    if (state.currentScene === 'TESSERACT') {
      return Math.max(12, Math.min(savedIndex, PHASE3_DIALOGUE.length - 1));
    }
    return 0;
  });

  const [activeEvent, setActiveEvent] = useState<DialogueEvent | null>(null);

  // Track whether we're currently waiting for an event to finish
  const eventPendingRef = useRef(false);

  // ── Auto-advance portal / arrival phases via timers ─────────
  useEffect(() => {
    if (state.currentScene !== 'TIME_PORTAL') return;

    const T = PHASE3_TIMINGS;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const t0 = 0;
    const t1 = t0 + T.PORTAL_FORMING;                    // → PORTAL_STABLE
    const t2 = t1 + T.PORTAL_STABLE;                     // → PORTAL_OPEN
    const t3 = t2 + T.PORTAL_OPEN;                       // → FUTURE_ARRIVING
    const t4 = t3 + T.FUTURE_ARRIVING;                   // → FIRST_MEETING
    const t5 = t4 + T.FIRST_MEETING;                     // → DIALOGUE

    timers.push(setTimeout(() => setSubPhase('PORTAL_STABLE'),   t1));
    timers.push(setTimeout(() => setSubPhase('PORTAL_OPEN'),     t2));
    timers.push(setTimeout(() => setSubPhase('FUTURE_ARRIVING'), t3));
    timers.push(setTimeout(() => setSubPhase('FIRST_MEETING'),   t4));
    timers.push(setTimeout(() => {
      setSubPhase('DIALOGUE');
      setDialogueIndex(0);
      navigateTo('FUTURE_VISION');
    }, t5));

    return () => timers.forEach(clearTimeout);
  }, [state.currentScene, navigateTo]);

  // ── Derive visual component states from sub-phase ────────────
  const portalPhase: PortalPhase = (() => {
    switch (subPhase) {
      case 'PORTAL_FORMING':   return 'forming';
      case 'PORTAL_STABLE':    return 'stable';
      case 'PORTAL_OPEN':
      case 'FUTURE_ARRIVING':
      case 'FIRST_MEETING':
      case 'DIALOGUE':         return 'open';
      case 'FUTURE_DEPARTING': return 'open';
      case 'PORTAL_CLOSING':   return 'closing';
      default:                 return 'hidden';
    }
  })();

  const futureSelfPhase: FutureSelfPhase = (() => {
    switch (subPhase) {
      case 'FUTURE_ARRIVING': return 'arriving';
      case 'FIRST_MEETING':
      case 'DIALOGUE':        return 'present';
      case 'FUTURE_DEPARTING':return 'departing';
      default:                return 'hidden';
    }
  })();

  const tesseractPhase: TesseractPhase = (() => {
    if (activeEvent === 'TESSERACT_REVEAL') return 'appearing';
    switch (subPhase) {
      case 'DIALOGUE': {
        // Show tesseract from line 12 onwards (after TESSERACT_REVEAL event)
        if (dialogueIndex >= 12 && dialogueIndex < 16) return 'floating';
        if (dialogueIndex >= 16) return 'held';
        return 'hidden';
      }
      case 'YOUNG_MAN_ALONE':
      case 'COMPLETE':   return 'held';
      default:           return 'hidden';
    }
  })();

  const showDialogue =
    subPhase === 'DIALOGUE' && activeEvent === null;

  // ── Advance dialogue ──────────────────────────────────────────
  const advanceDialogue = useCallback(() => {
    if (eventPendingRef.current) return; // block if event is playing

    const currentLine = PHASE3_DIALOGUE[dialogueIndex];
    if (currentLine?.event) {
      if (currentLine.event === 'TESSERACT_REVEAL') {
        navigateTo('TESSERACT');
      }
    }

    setDialogueIndex((prev) => {
      const line = PHASE3_DIALOGUE[prev];

      // Dispatch global state change for dialog progress
      if (!state.isStoryRecallMode) {
        dispatch({ type: 'ADVANCE_DIALOGUE', sequenceId: 'phase3-dialogue' });
      }

      // If this line has an event, trigger it before advancing
      if (line?.event && !eventPendingRef.current) {
        eventPendingRef.current = true;
        setActiveEvent(line.event);

        // Special handling: PORTAL_REOPEN auto-triggers departure sequence
        if (line.event === 'PORTAL_REOPEN') {
          // Departure auto-timer kicks in after a brief pause
          setTimeout(() => {
            eventPendingRef.current = false;
            setActiveEvent(null);
            setSubPhase('FUTURE_DEPARTING');
            setTimeout(() => setSubPhase('PORTAL_CLOSING'), PHASE3_TIMINGS.DEPARTING);
            setTimeout(() => {
              setSubPhase('YOUNG_MAN_ALONE');
            }, PHASE3_TIMINGS.DEPARTING + PHASE3_TIMINGS.PORTAL_CLOSING);
          }, 3000);
          return prev; // don't advance — sequence ends
        }

        // TESSERACT_HANDOVER — auto-continue after animation
        if (line.event === 'TESSERACT_HANDOVER') {
          setTimeout(() => {
            eventPendingRef.current = false;
            setActiveEvent(null);
          }, PHASE3_TIMINGS.HANDOVER_DURATION);
          return prev + 1;
        }

        // For TESSERACT_REVEAL — auto-continue after appear
        if (line.event === 'TESSERACT_REVEAL') {
          setTimeout(() => {
            eventPendingRef.current = false;
            setActiveEvent(null);
          }, PHASE3_TIMINGS.TESSERACT_APPEAR);
          return prev + 1;
        }

        // For STEM_REVEAL — handled separately via onSTEMRevealComplete
        return prev + 1;
      }

      const next = prev + 1;
      if (next >= PHASE3_DIALOGUE.length) {
        setSubPhase('COMPLETE');
        return prev;
      }
      return next;
    });
  }, [dispatch, navigateTo, dialogueIndex]);

  // Called when the STEM reveal overlay completes
  const onSTEMRevealComplete = useCallback(() => {
    eventPendingRef.current = false;
    setActiveEvent(null);
  }, []);

  return {
    subPhase,
    dialogueIndex,
    showDialogue,
    activeEvent,
    portalPhase,
    futureSelfPhase,
    tesseractPhase,
    advanceDialogue,
    onSTEMRevealComplete,
  };
}
