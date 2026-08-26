// ============================================================
// STEM Adventure Platform â€” Phase3Scene
// Phase 3 â€” The Time Portal, Future Self, and Tesseract
//
// One continuous cinematic sequence:
//   Portal formation â†’ Future Self arrival â†’ Dialogue â†’
//   STEM reveal â†’ Tesseract reveal â†’ Handover â†’
//   Future Self departure â†’ Portal closes â†’
//   Young man alone with Tesseract (Phase 4 awaits)
//
// Reuses from Phase 1/2:
//   IntroEnvironment, CharacterReveal, CinematicDialoguePanel
//
// New Phase 3 components:
//   TimePortal, FutureSelfReveal, TesseractObject,
//   STEMPillarsReveal
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// â”€â”€ Phase 1 / Phase 2 components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { IntroEnvironment } from '../components/story/IntroEnvironment';
import { CharacterReveal } from '../components/story/CharacterReveal';
import { CinematicDialoguePanel } from '../components/story/CinematicDialoguePanel';
import { LanguageSelector } from '../components/ui/LanguageSelector';

// â”€â”€ Phase 3 components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { TimePortal } from '../components/story/TimePortal';
import { FutureSelfReveal } from '../components/story/FutureSelfReveal';
import { TesseractObject } from '../components/story/TesseractObject';
import { STEMPillarsReveal } from '../components/story/STEMPillarsReveal';

// â”€â”€ State & Audio â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { usePhase3Sequence } from '../hooks/usePhase3Sequence';
import { useGameState } from '../context/GameStateContext';
import { PHASE3_DIALOGUE } from '../data/dialogue';
import { audioSynth } from '../utils/audio';

export const Phase3Scene: React.FC = () => {
  const { state, navigateTo, dispatch } = useGameState();

  const {
    subPhase,
    dialogueIndex,
    showDialogue,
    activeEvent,
    portalPhase,
    futureSelfPhase,
    tesseractPhase,
    advanceDialogue,
    onSTEMRevealComplete,
  } = usePhase3Sequence();

  const [muted, setMuted] = React.useState(() => audioSynth.getMuted());
  const portalHumRef = React.useRef<{ stop: (time: number) => void } | null>(null);

  // Trigger procedural audio SFX on state changes
  React.useEffect(() => {
    if (muted) {
      if (portalHumRef.current) {
        portalHumRef.current.stop(0);
        portalHumRef.current = null;
      }
      return;
    }

    const shouldHum =
      (portalPhase === 'forming' || portalPhase === 'stable' || portalPhase === 'open') &&
      subPhase !== 'FUTURE_DEPARTING' &&
      subPhase !== 'PORTAL_CLOSING';

    if (shouldHum) {
      if (!portalHumRef.current) {
        portalHumRef.current = audioSynth.startPortalHum();
      }
    } else {
      if (portalHumRef.current) {
        portalHumRef.current.stop(0);
        portalHumRef.current = null;
      }
    }

    if (subPhase === 'PORTAL_OPEN') {
      audioSynth.playPortalOpen();
    }
  }, [subPhase, portalPhase, muted]);

  React.useEffect(() => {
    if (muted) return;
    if (activeEvent === 'TESSERACT_HANDOVER') {
      audioSynth.playTesseractPulse();
    }
  }, [activeEvent, muted]);

  // Clean up audio on unmount
  React.useEffect(() => {
    return () => {
      if (portalHumRef.current) {
        portalHumRef.current.stop(0);
      }
    };
  }, []);

  const handleToggleMute = () => {
    const isNowMuted = audioSynth.toggleMute();
    setMuted(isNowMuted);
  };

  // Auto-navigate to Tesseract activation (Phase 4) after 4.5 seconds of reflection
  React.useEffect(() => {
    if (subPhase === 'YOUNG_MAN_ALONE') {
      const timer = setTimeout(() => {
        navigateTo('TESSERACT_ACTIVATION');
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [subPhase, navigateTo]);

  const handleScreenClick = () => {
    if (subPhase === 'YOUNG_MAN_ALONE') {
      navigateTo('TESSERACT_ACTIVATION');
    }
  };

  const currentLine =
    dialogueIndex >= 0 && dialogueIndex < PHASE3_DIALOGUE.length
      ? PHASE3_DIALOGUE[dialogueIndex]
      : null;

  // Morales shifts left when Future Self is present
  const MoralesPositionStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: futureSelfPhase !== 'hidden' ? '8%' : '50%',
    transform: futureSelfPhase !== 'hidden' ? 'none' : 'translateX(-50%)',
    width: 'clamp(120px, 18vw, 260px)',
    zIndex: 11,
    transition: 'left 1.2s ease, transform 1.2s ease',
    pointerEvents: 'none',
    userSelect: 'none',
  };

  // Environment brightness slightly increases with portal
  const environmentReveal =
    subPhase === 'PORTAL_FORMING'   ? 0.95
    : subPhase === 'PORTAL_STABLE'  ? 0.97
    : 1.0;

  return (
    <div
      onClick={handleScreenClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '100vh',
        overflow: 'hidden',
        cursor: subPhase === 'YOUNG_MAN_ALONE' ? 'pointer' : 'default',
      }}
    >
      {/* â”€â”€ Layer 0: Environment background â”€â”€ */}
      <IntroEnvironment revealProgress={environmentReveal} />

      {/* â”€â”€ Layer 1: Very thin darkness overlay â”€â”€ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.12)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* â”€â”€ Layer 2: Portal formation energy glow (pre-portal) â”€â”€ */}
      <AnimatePresence>
        {subPhase === 'PORTAL_FORMING' && (
          <motion.div
            key="pre-portal-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2, 0.5, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '30%',
              right: '25%',
              width: 'clamp(100px, 20vw, 280px)',
              height: 'clamp(100px, 20vw, 280px)',
              background: 'radial-gradient(circle, rgba(0,120,255,0.5) 0%, transparent 70%)',
              filter: 'blur(40px)',
              borderRadius: '50%',
              zIndex: 6,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* â”€â”€ Layer 3: Morales (young man) â€” left-shifted when Future Self present â”€â”€ */}
      <div style={MoralesPositionStyle}>
        <CharacterReveal phase="revealed" />
      </div>

      {/* â”€â”€ Layer 4: Time Portal â”€â”€ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 14,
          pointerEvents: 'none',
        }}
      >
        <TimePortal phase={portalPhase} />
      </div>

      {/* â”€â”€ Layer 5: Future Self â”€â”€ */}
      <FutureSelfReveal phase={futureSelfPhase} />

      {/* â”€â”€ Layer 6: Tesseract â”€â”€ */}
      <TesseractObject phase={tesseractPhase} />

      {/* â”€â”€ Layer 7: STEM Pillars overlay â”€â”€ */}
      <STEMPillarsReveal
        isVisible={activeEvent === 'STEM_REVEAL'}
        onComplete={onSTEMRevealComplete}
      />

      {/* â”€â”€ Layer 8: Dialogue panel â”€â”€ */}
      {currentLine && (
        <CinematicDialoguePanel
          line={currentLine}
          isVisible={showDialogue}
          onAdvance={advanceDialogue}
          lineIndex={dialogueIndex}
          totalLines={PHASE3_DIALOGUE.length}
        />
      )}

      {/* â”€â”€ Layer 9: HUD top-left (back to Phase 2 + sound toggle) â”€â”€ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        style={{
          position: 'absolute',
          top: 'clamp(12px, 3vw, 24px)',
          left: 'clamp(12px, 3vw, 24px)',
          zIndex: 50,
          display: 'flex',
          gap: '8px',
        }}
      >
        {/* Back to Phase 2 (dev helper) or Exit Recall */}
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
            â† Exit Recall
          </button>
        ) : (
          <button
            onClick={() => navigateTo('INTRO')}
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
            aria-label="Return to Phase 2"
          >
            â† Phase 2
          </button>
        )}

        <button
          onClick={handleToggleMute}
          style={{
            background: 'rgba(5,5,18,0.6)',
            border: `1px solid ${muted ? 'rgba(0,180,255,0.15)' : 'rgba(0,180,255,0.4)'}`,
            borderRadius: '8px',
            padding: '6px 12px',
            color: muted ? 'rgba(0,180,255,0.4)' : 'rgba(0,180,255,0.9)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
          aria-label={muted ? 'Unmute audio' : 'Mute audio'}
        >
          {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          {muted ? 'Sound: Off' : 'Sound: On'}
        </button>
      </motion.div>

      {/* â”€â”€ Phase indicator (dev) â”€â”€ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          top: 'clamp(12px, 3vw, 24px)',
          right: 'clamp(12px, 3vw, 24px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
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
          Phase 3 Â· {subPhase.replace(/_/g, ' ')}
        </span>
      </motion.div>

      {/* â”€â”€ First meeting atmosphere â”€â”€ */}
      <AnimatePresence>
        {subPhase === 'FIRST_MEETING' && (
          <motion.div
            key="first-meeting-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0.08, 0.15] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 60% 40%, rgba(0,120,255,0.2) 0%, transparent 60%)',
              zIndex: 8,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* â”€â”€ Handover energy pulse â”€â”€ */}
      <AnimatePresence>
        {activeEvent === 'TESSERACT_HANDOVER' && (
          <motion.div
            key="handover-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 60%, rgba(0,200,255,0.25) 0%, transparent 55%)',
              zIndex: 8,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* â”€â”€ Phase 3 complete â€” anticipation cue â”€â”€ */}
      <AnimatePresence>
        {(subPhase === 'YOUNG_MAN_ALONE' || subPhase === 'COMPLETE') && (
          <motion.div
            key="phase3-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            style={{
              position: 'absolute',
              bottom: 'clamp(24px, 6vh, 60px)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 40,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.p
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(0,200,255,0.6)',
              }}
            >
              The journey begins...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
