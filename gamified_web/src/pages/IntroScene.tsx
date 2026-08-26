// ============================================================
// STEM Adventure Platform — IntroScene
// Phase 2 — The Young Man Wakes
//
// This is the opening cinematic sequence of the story.
// The young man appears in a mysterious unknown world.
// He wakes, looks around, and speaks his first words.
//
// What this scene does NOT contain:
//   - Time portal (Phase 3)
//   - Future self (Phase 3)
//   - Tesseract (Phase 3)
//   - STEM worlds (Phase 4+)
// ============================================================

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { IntroEnvironment } from '../components/story/IntroEnvironment';
import { CharacterReveal } from '../components/story/CharacterReveal';
import { CinematicDialoguePanel } from '../components/story/CinematicDialoguePanel';
import { useIntroSequence } from '../hooks/useIntroSequence';
import { useGameState } from '../context/GameStateContext';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { INTRO_DIALOGUE } from '../data/dialogue';
import type { CharacterPhase } from '../components/story/CharacterReveal';

// ----------------------------------------------------------
// Map IntroPhase → CharacterPhase for CharacterReveal
// ----------------------------------------------------------
function toCharacterPhase(introPhase: string): CharacterPhase {
  switch (introPhase) {
    case 'DARKNESS':
    case 'ENERGY_APPEARS': return 'hidden';
    case 'SILHOUETTE':     return 'silhouette';
    case 'REVEALING':      return 'revealing';
    case 'WAKING':         return 'waking';
    case 'LOOKING_AROUND':
    case 'DIALOGUE':
    case 'COMPLETE':       return 'revealed';
    default:               return 'hidden';
  }
}

export const IntroScene: React.FC = () => {
  const { state, navigateTo, dispatch } = useGameState();
  const {
    phase,
    environmentReveal,
    dialogueIndex,
    showDialogue,
    isComplete,
    advanceDialogue,
  } = useIntroSequence();

  // When Phase 2 is fully complete, transition to Phase 3
  useEffect(() => {
    if (isComplete) {
      // Hold the "Something is approaching..." state briefly, then start Phase 3
      const timer = setTimeout(() => {
        navigateTo('TIME_PORTAL');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, navigateTo]);

  const currentLine =
    dialogueIndex >= 0 && dialogueIndex < INTRO_DIALOGUE.lines.length
      ? INTRO_DIALOGUE.lines[dialogueIndex]
      : null;

  const charPhase = toCharacterPhase(phase);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '100vh' }}
    >
      {/* ── Layer 0: Mysterious environment ── */}
      <IntroEnvironment revealProgress={environmentReveal} />

      {/* ── Layer 1: Darkness overlay — fades out as scene reveals ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'black',
          zIndex: 5,
          pointerEvents: 'none',
        }}
        animate={{
          opacity:
            phase === 'DARKNESS' ? 1
            : phase === 'ENERGY_APPEARS' ? 0.92
            : phase === 'SILHOUETTE' ? 0.75
            : phase === 'REVEALING' ? 0.55
            : phase === 'WAKING' ? 0.3
            : 0.12,
        }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />

      {/* ── Layer 2: Character ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: showDialogue ? 'clamp(200px, 30vh, 320px)' : 0,
          transition: 'padding-bottom 0.8s ease',
        }}
      >
        <CharacterReveal phase={charPhase} />
      </div>

      {/* ── Layer 3: Scene text overlays ── */}

      {/* "UNKNOWN DIMENSION" subtle label — appears with energy */}
      <AnimatePresence>
        {(phase === 'ENERGY_APPEARS' || phase === 'SILHOUETTE') && (
          <motion.div
            key="dimension-label"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'clamp(20px, 5vh, 60px)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.55rem, 1.2vw, 0.7rem)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(0,180,255,0.35)',
              }}
            >
              ◈ &nbsp; Unknown Dimension &nbsp; ◈
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "?" thought indicator — appears when character looks around */}
      <AnimatePresence>
        {phase === 'LOOKING_AROUND' && (
          <motion.div
            key="thought-indicator"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: [0, 0.8, 0.6, 0.8], scale: 1, y: [10, 0, 2, 0] }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '55%',
              zIndex: 20,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                color: 'rgba(0,200,255,0.6)',
                textShadow: '0 0 20px rgba(0,200,255,0.4)',
              }}
            >
              ?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Layer 4: HUD Corner info ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase !== 'DARKNESS' ? 1 : 0 }}
        transition={{ duration: 2, delay: 1 }}
        style={{
          position: 'absolute',
          top: 'clamp(12px, 3vw, 24px)',
          left: 'clamp(12px, 3vw, 24px)',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Back to foundation (dev helper) or Exit Recall */}
        {state.isStoryRecallMode ? (
          <button
            onClick={() => {
              dispatch({ type: 'SET_STORY_RECALL_MODE', active: false });
              navigateTo('MAIN_INTERFACE');
            }}
            style={{
              background: 'rgba(5,5,18,0.6)',
              border: '1px solid rgba(220,50,50,0.15)',
              borderRadius: '8px',
              padding: '6px 14px',
              color: 'rgba(220,50,50,0.5)',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.color = 'rgba(255,100,100,0.9)';
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,100,100,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.color = 'rgba(220,50,50,0.5)';
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(220,50,50,0.15)';
            }}
            aria-label="Exit Story Recall"
          >
            ← Exit Recall
          </button>
        ) : (
          <button
            onClick={() => navigateTo('FOUNDATION')}
            style={{
              background: 'rgba(5,5,18,0.6)',
              border: '1px solid rgba(0,180,255,0.15)',
              borderRadius: '8px',
              padding: '6px 14px',
              color: 'rgba(0,180,255,0.4)',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.color = 'rgba(0,180,255,0.9)';
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(0,180,255,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.color = 'rgba(0,180,255,0.4)';
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(0,180,255,0.15)';
            }}
            aria-label="Return to foundation screen"
          >
            ← Foundation
          </button>
        )}
      </motion.div>

      {/* Phase indicator (dev helper — subtle) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          top: 'clamp(12px, 3vw, 24px)',
          right: 'clamp(12px, 3vw, 24px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <LanguageSelector />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(0,180,255,0.5)',
          }}
        >
          Phase 2 · {phase.replace('_', ' ')}
        </span>
      </motion.div>

      {/* ── Layer 5: Waking flash ── */}
      <AnimatePresence>
        {phase === 'WAKING' && (
          <motion.div
            key="waking-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut', times: [0, 0.3, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 60%, rgba(0,150,255,0.4) 0%, transparent 60%)',
              zIndex: 15,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Layer 6: Dialogue panel ── */}
      {currentLine && (
        <CinematicDialoguePanel
          line={currentLine}
          isVisible={showDialogue}
          onAdvance={advanceDialogue}
          lineIndex={dialogueIndex}
          totalLines={INTRO_DIALOGUE.lines.length}
        />
      )}

      {/* ── Phase 2 Complete — anticipation message ── */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            key="complete-msg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 'clamp(30px, 8vh, 80px)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 40,
              textAlign: 'center',
            }}
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(0,180,255,0.55)',
              }}
            >
              Something is approaching...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
