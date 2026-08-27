// ============================================================
// STEM Adventure Platform — CinematicDialoguePanel
// Phase 2 + Phase 3 Update
//
// Extends the Phase 1 DialoguePanel shell with actual
// typewriter animation, speaker styling, and continue logic.
// Uses the TypewriterText component for text reveal.
//
// Phase 3 additions:
//  - future-self speaker: amber/gold color scheme
//  - isFutureSelf styling branch
// ============================================================

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, SkipForward } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TypewriterText } from './TypewriterText';
import type { DialogueLine } from '../../types';
import { getLocalizedDialogueLine } from '../../data/dialogue';

interface CinematicDialoguePanelProps {
  line: DialogueLine;
  isVisible: boolean;
  onAdvance: () => void;
  lineIndex: number;
  totalLines: number;
}

export const CinematicDialoguePanel: React.FC<CinematicDialoguePanelProps> = ({
  line: rawLine,
  isVisible,
  onAdvance,
  lineIndex,
  totalLines,
}) => {
  const { t } = useTranslation();
  const line = getLocalizedDialogueLine(rawLine, t);

  const [isTextComplete, setIsTextComplete] = useState(false);
  const [key, setKey] = useState(0); // force re-mount on line change

  // When line changes, reset typing state
  React.useEffect(() => {
    setIsTextComplete(false);
    setKey((k) => k + 1);
  }, [line.id]);

  const handleAdvance = useCallback(() => {
    if (!isTextComplete) {
      // First tap: skip typing, show full text instantly
      setIsTextComplete(true);
    } else {
      // Second tap: advance to next line
      onAdvance();
    }
  }, [isTextComplete, onAdvance]);

  const isEnvironment = line.speakerId === 'environment';
  const isFutureSelf  = line.speakerId === 'future-self';

  // Speaker accent colour
  const speakerColor =
    isEnvironment ? 'rgba(180,100,255,0.7)'
    : isFutureSelf ? 'rgba(255,175,50,0.9)'
    : 'var(--color-primary)';   // young man → cyan

  const topLineColor =
    isEnvironment ? 'rgba(180,100,255,0.6)'
    : isFutureSelf ? 'rgba(255,175,50,0.7)'
    : 'rgba(0,180,255,0.7)';

  const textColor =
    isEnvironment ? 'rgba(200,170,255,0.8)'
    : isFutureSelf ? 'rgba(255,225,160,0.95)'
    : 'var(--color-text-primary)';

  const borderColor =
    isEnvironment ? 'rgba(180,100,255,0.22)'
    : isFutureSelf ? 'rgba(255,175,50,0.22)'
    : 'rgba(0,180,255,0.22)';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-dialogue"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{ padding: 'clamp(12px, 3vw, 32px)' }}
        >
          <div
            style={{
              maxWidth: '860px',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            {/* Main panel */}
            <div
              style={{
                background: 'rgba(5,5,18,0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${borderColor}`,
                borderRadius: '16px',
                padding: 'clamp(16px, 3vw, 28px)',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.7), 0 0 60px rgba(0,100,200,0.1)',
                transition: 'border-color 0.4s ease',
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '10%',
                  right: '10%',
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, ${topLineColor}, transparent)`,
                  borderRadius: '1px',
                  transition: 'background 0.4s ease',
                }}
              />

              {/* Speaker label */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: speakerColor,
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.4s ease',
                }}
              >
                {/* Speaker dot */}
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: speakerColor,
                    boxShadow: `0 0 6px ${speakerColor}`,
                    transition: 'background 0.4s ease',
                  }}
                />
                {line.speakerName}
              </div>

              {/* Dialogue text */}
              <div
                style={{
                  minHeight: 'clamp(40px, 6vw, 64px)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TypewriterText
                  key={key}
                  text={isTextComplete ? line.text : line.text}
                  speed={isTextComplete ? 999 : 38}
                  onComplete={() => setIsTextComplete(true)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    color: textColor,
                    lineHeight: 1.65,
                    fontStyle: isEnvironment ? 'italic' : 'normal',
                    transition: 'color 0.4s ease',
                  }}
                />
              </div>

              {/* Footer row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                }}
              >
                {/* Progress dots */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: totalLines }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i === lineIndex ? '18px' : '6px',
                        height: '6px',
                        borderRadius: '3px',
                        background:
                          i < lineIndex
                            ? 'rgba(0,180,255,0.6)'
                            : i === lineIndex
                            ? speakerColor
                            : 'rgba(255,255,255,0.1)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>

                {/* Advance button */}
                <motion.button
                  onClick={handleAdvance}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: isTextComplete
                      ? `${speakerColor}22`
                      : 'transparent',
                    border: `1px solid ${isTextComplete ? speakerColor : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '8px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: isTextComplete
                      ? speakerColor
                      : 'rgba(255,255,255,0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  aria-label={isTextComplete ? 'Continue to next dialogue' : 'Skip typing animation'}
                >
                  {isTextComplete ? (
                    <>
                      {t('actions.continue', 'Continue')}
                      <ChevronRight size={13} />
                    </>
                  ) : (
                    <>
                      {t('actions.skip', 'Skip')}
                      <SkipForward size={12} />
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Corner accents */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '20px',
                height: '20px',
                borderBottom: `1px solid ${topLineColor}`,
                borderLeft: `1px solid ${topLineColor}`,
                borderRadius: '0 0 0 16px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '20px',
                height: '20px',
                borderBottom: `1px solid ${topLineColor}`,
                borderRight: `1px solid ${topLineColor}`,
                borderRadius: '0 0 16px 0',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
