// ============================================================
// STEM Adventure Platform â€” Phase4Scene
// Phase 4 â€” Tesseract Activation, Gateway, and Arrival
//
// Reuses from previous phases:
//   IntroEnvironment, CharacterReveal, CinematicDialoguePanel,
//   TesseractObject, audioSynth
//
// New Phase 4 components:
//   TesseractGateway, TravelTunnel, ArrivalEnvironment
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// â”€â”€ Shared components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { IntroEnvironment } from '../components/story/IntroEnvironment';
import { CharacterReveal } from '../components/story/CharacterReveal';
import { CinematicDialoguePanel } from '../components/story/CinematicDialoguePanel';
import { TesseractObject } from '../components/story/TesseractObject';
import { LanguageSelector } from '../components/ui/LanguageSelector';

// â”€â”€ Phase 4 components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { TesseractGateway } from '../components/story/TesseractGateway';
import { TravelTunnel } from '../components/story/TravelTunnel';
import { ArrivalEnvironment } from '../components/story/ArrivalEnvironment';

// â”€â”€ State & Timings â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { usePhase4Sequence } from '../hooks/usePhase4Sequence';
import { useGameState } from '../context/GameStateContext';
import { PHASE4_DIALOGUE, PHASE4_TIMINGS } from '../data/dialogue';
import { audioSynth } from '../utils/audio';

export const Phase4Scene: React.FC = () => {
  const { state, navigateTo, dispatch } = useGameState();

  const {
    subPhase,
    dialogueIndex,
    showDialogue,
    tesseractPhase,
    gatewayPhase,
    advanceDialogue,
  } = usePhase4Sequence();

  const [muted, setMuted] = React.useState(() => audioSynth.getMuted());
  const travelSoundRef = React.useRef<{ stop: (time: number) => void } | null>(null);

  // Trigger procedural audio SFX based on subPhase state changes
  React.useEffect(() => {
    if (muted) {
      if (travelSoundRef.current) {
        travelSoundRef.current.stop(0);
        travelSoundRef.current = null;
      }
      return;
    }

    if (subPhase === 'ACTIVATING') {
      audioSynth.playTesseractWake();
    } else if (subPhase === 'GATEWAY_FORMING') {
      audioSynth.playGatewayOpen();
    } else if (subPhase === 'TRAVEL') {
      if (!travelSoundRef.current) {
        travelSoundRef.current = audioSynth.startTravelTunnel();
      }
    } else if (subPhase === 'ARRIVAL') {
      if (travelSoundRef.current) {
        travelSoundRef.current.stop(0);
        travelSoundRef.current = null;
      }
      audioSynth.playArrivalChime();

      if (state.isStoryRecallMode) {
        // Do not automatically redirect during story recall replay
        return;
      }

      // Automatically navigate to Phase 5 Main Interface after 3.5 seconds
      const timer = setTimeout(() => {
        dispatch({ type: 'MARK_STORY_SEEN' });
        navigateTo('MAIN_INTERFACE');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [subPhase, muted]);

  // Cleanup sound loop on unmount
  React.useEffect(() => {
    return () => {
      if (travelSoundRef.current) {
        travelSoundRef.current.stop(0);
      }
    };
  }, []);

  const handleToggleMute = () => {
    const isNowMuted = audioSynth.toggleMute();
    setMuted(isNowMuted);
  };

  const currentLine =
    dialogueIndex >= 0 && dialogueIndex < PHASE4_DIALOGUE.length
      ? PHASE4_DIALOGUE[dialogueIndex]
      : null;

  // Character positioning and sizing per sub-phase
  // Steps to the left during Tesseract activation, walks center and scales down to enter, then arrives center
  const MoralesPositionStyle: React.CSSProperties = (() => {
    const base: React.CSSProperties = {
      position: 'absolute',
      bottom: 0,
      zIndex: 11,
      userSelect: 'none',
      pointerEvents: 'none',
    };

    switch (subPhase) {
      case 'ACTIVATION_WAIT':
        return {
          ...base,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(120px, 18vw, 260px)',
          transition: 'all 2s ease-in-out',
        };
      case 'ACTIVATING':
      case 'PULSING':
      case 'GATEWAY_FORMING':
      case 'GATEWAY_OPEN':
        return {
          ...base,
          left: '8%',
          transform: 'none',
          width: 'clamp(120px, 18vw, 260px)',
          transition: 'all 2.2s ease-in-out',
        };
      case 'GATEWAY_ENTER':
        return {
          ...base,
          left: '50%',
          transform: 'translateX(-50%) scale(0.65)',
          opacity: 0,
          width: 'clamp(120px, 18vw, 260px)',
          transition: `all ${PHASE4_TIMINGS.GATEWAY_ENTER / 1000}s ease-in-out`,
        };
      case 'ARRIVAL':
        return {
          ...base,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(110px, 16vw, 220px)',
          transition: 'opacity 2.5s ease-out',
        };
      default: // TRAVEL or hidden
        return {
          ...base,
          display: 'none',
        };
    }
  })();

  const isNewWorld = subPhase === 'ARRIVAL';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* â”€â”€ Layer 0: Background Environment â”€â”€ */}
      <AnimatePresence mode="wait">
        {isNewWorld ? (
          <motion.div
            key="arrival-world-env"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <ArrivalEnvironment />
          </motion.div>
        ) : (
          <motion.div
            key="void-world-env"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <IntroEnvironment revealProgress={1.0} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* â”€â”€ Layer 1: Darkness Overlay (during wake wait / pulsing flashes) â”€â”€ */}
      <AnimatePresence>
        {subPhase === 'PULSING' && (
          <motion.div
            key="pulse-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'white',
              zIndex: 16,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* â”€â”€ Layer 2: Morales (Young Man) â”€â”€ */}
      <div style={MoralesPositionStyle}>
        <CharacterReveal phase={isNewWorld ? 'revealed' : 'revealed'} />
      </div>

      {/* â”€â”€ Layer 3: Tesseract Gateway Portal â”€â”€ */}
      <TesseractGateway phase={gatewayPhase} />

      {/* â”€â”€ Layer 4: 3D Tesseract Object â”€â”€ */}
      <TesseractObject phase={tesseractPhase} />

      {/* â”€â”€ Layer 5: Dimensional Space Travel Tunnel â”€â”€ */}
      {subPhase === 'TRAVEL' && <TravelTunnel />}

      {/* â”€â”€ Layer 6: Lower-Third Dialogue Panel â”€â”€ */}
      {currentLine && (
        <CinematicDialoguePanel
          line={currentLine}
          isVisible={showDialogue}
          onAdvance={advanceDialogue}
          lineIndex={dialogueIndex}
          totalLines={PHASE4_DIALOGUE.length}
        />
      )}

      {/* â”€â”€ Layer 7: HUD (Top-Left navigation and sound toggle) â”€â”€ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        style={{
          position: 'absolute',
          top: 'clamp(12px, 3vw, 24px)',
          left: 'clamp(12px, 3vw, 24px)',
          zIndex: 120,
          display: 'flex',
          gap: '8px',
        }}
      >
        {/* Back to Phase 3 (dev helper) or Exit Recall */}
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
            onClick={() => navigateTo('TESSERACT')}
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
            aria-label="Return to Phase 3"
          >
            â† Phase 3
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

      {/* â”€â”€ Layer 8: Scene State Indicator (subtle dev HUD) â”€â”€ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          top: 'clamp(12px, 3vw, 24px)',
          right: 'clamp(12px, 3vw, 24px)',
          zIndex: 120,
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
          Phase 4 Â· {subPhase.replace(/_/g, ' ')}
        </span>
      </motion.div>

      {/* â”€â”€ Layer 9: Anticipation text on arrival complete â”€â”€ */}
      <AnimatePresence>
        {isNewWorld && (
          <motion.div
            key="phase4-arrival-complete"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 2.2 }}
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
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(0,220,255,0.65)',
              }}
            >
              {state.isStoryRecallMode ? '' : 'The learning universe awaits...'}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* â”€â”€ Story Recall Finish Action Button â”€â”€ */}
      {state.isStoryRecallMode && subPhase === 'ARRIVAL' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          style={{
            position: 'absolute',
            bottom: '22%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 150,
            textAlign: 'center',
          }}
        >
          <button
            onClick={() => {
              dispatch({ type: 'SET_STORY_RECALL_MODE', active: false });
              navigateTo('MAIN_INTERFACE');
            }}
            style={{
              background: 'rgba(5,5,18,0.75)',
              border: '1.5px solid rgba(0,180,255,0.4)',
              borderRadius: '8px',
              padding: '12px 28px',
              color: 'rgba(0,220,255,0.9)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(0,180,255,0.2)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(0,220,255,0.9)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(0,220,255,0.5)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(0,220,255,0.9)';
              e.currentTarget.style.borderColor = 'rgba(0,180,255,0.4)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0,180,255,0.2)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Return to STEM Hub
          </button>
        </motion.div>
      )}
    </div>
  );
};
