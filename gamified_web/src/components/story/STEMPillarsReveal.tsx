// ============================================================
// STEM Adventure Platform — STEMPillarsReveal
// Phase 3
//
// Full-screen cinematic overlay revealing the four STEM
// pillars one by one with domain-specific visual motifs.
// Appears during Phase 3 dialogue after "What knowledge?"
// ============================================================

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface STEMPillarsRevealProps {
  isVisible: boolean;
  onComplete: () => void;
}

const PILLARS = [
  {
    id: 'science',
    label: 'SCIENCE',
    color: '#00b4ff',
    glow: 'rgba(0,180,255,0.6)',
    delay: 0.3,
    // Molecular dot pattern using SVG-like dots
    bgPattern: `radial-gradient(circle at 20% 30%, rgba(0,180,255,0.15) 2px, transparent 2px),
                radial-gradient(circle at 50% 60%, rgba(0,180,255,0.12) 3px, transparent 3px),
                radial-gradient(circle at 80% 20%, rgba(0,180,255,0.1) 2px, transparent 2px),
                radial-gradient(circle at 35% 75%, rgba(0,180,255,0.13) 2px, transparent 2px),
                radial-gradient(circle at 70% 50%, rgba(0,180,255,0.1) 2px, transparent 2px)`,
    symbol: '⬡',
  },
  {
    id: 'technology',
    label: 'TECHNOLOGY',
    color: '#7b2fff',
    glow: 'rgba(123,47,255,0.6)',
    delay: 0.6,
    bgPattern: `repeating-linear-gradient(0deg, rgba(123,47,255,0.06) 0px, rgba(123,47,255,0.06) 1px, transparent 1px, transparent 20px),
                repeating-linear-gradient(90deg, rgba(123,47,255,0.06) 0px, rgba(123,47,255,0.06) 1px, transparent 1px, transparent 20px)`,
    symbol: '⬡',
  },
  {
    id: 'engineering',
    label: 'ENGINEERING',
    color: '#00ffcc',
    glow: 'rgba(0,255,204,0.6)',
    delay: 0.9,
    bgPattern: `repeating-linear-gradient(60deg, rgba(0,255,204,0.05) 0px, rgba(0,255,204,0.05) 1px, transparent 1px, transparent 30px),
                repeating-linear-gradient(-60deg, rgba(0,255,204,0.05) 0px, rgba(0,255,204,0.05) 1px, transparent 1px, transparent 30px)`,
    symbol: '△',
  },
  {
    id: 'mathematics',
    label: 'MATHEMATICS',
    color: '#ff9d00',
    glow: 'rgba(255,157,0,0.6)',
    delay: 1.2,
    bgPattern: `radial-gradient(circle at 25% 50%, rgba(255,157,0,0.08) 0%, transparent 40%),
                radial-gradient(circle at 75% 50%, rgba(255,157,0,0.06) 0%, transparent 40%)`,
    symbol: '∑',
  },
];

export const STEMPillarsReveal: React.FC<STEMPillarsRevealProps> = ({
  isVisible,
  onComplete,
}) => {
  const [allVisible, setAllVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setAllVisible(false);
      return;
    }
    // Show all pillars simultaneously after sequential reveal
    const t1 = setTimeout(() => setAllVisible(true), 2200);
    // Auto-complete after viewing
    const t2 = setTimeout(() => {
      onComplete();
    }, 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="stem-reveal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(3,3,12,0.92)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vh, 32px)',
            padding: 'clamp(20px, 4vw, 60px)',
          }}
        >
          {/* Header */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(0,180,255,0.5)',
              marginBottom: 'clamp(8px, 2vh, 20px)',
            }}
          >
            The Four Pillars
          </motion.p>

          {/* Pillar cards — laid out in a responsive grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'clamp(10px, 2vw, 24px)',
              width: '100%',
              maxWidth: '800px',
            }}
          >
            {PILLARS.map((pillar) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, scale: 0.7, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: pillar.delay,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: 'relative',
                  padding: 'clamp(16px, 2.5vw, 28px)',
                  background: `rgba(5,5,20,0.8)`,
                  border: `1px solid ${pillar.color}44`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  textAlign: 'center',
                  backgroundImage: pillar.bgPattern,
                  backgroundSize: '40px 40px, 40px 40px',
                }}
              >
                {/* Glow corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${pillar.color}, transparent)`,
                  }}
                />

                {/* Domain symbol */}
                <div
                  style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    color: pillar.color,
                    textShadow: `0 0 12px ${pillar.glow}`,
                    marginBottom: '8px',
                    filter: 'drop-shadow(0 0 8px currentColor)',
                  }}
                >
                  {pillar.symbol}
                </div>

                {/* Domain name */}
                <motion.h3
                  animate={
                    allVisible
                      ? { textShadow: [`0 0 8px ${pillar.glow}`, `0 0 20px ${pillar.glow}`, `0 0 8px ${pillar.glow}`] }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.85rem, 2vw, 1.3rem)',
                    letterSpacing: 'clamp(0.1em, 0.5vw, 0.25em)',
                    fontWeight: 700,
                    color: pillar.color,
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  {pillar.label}
                </motion.h3>
              </motion.div>
            ))}
          </div>

          {/* Connecting energy lines (all visible state) */}
          {allVisible && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                width: 'clamp(120px, 30vw, 300px)',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(0,180,255,0.5), transparent)',
                marginTop: '8px',
              }}
            />
          )}

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 3, duration: 1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              position: 'absolute',
              bottom: 'clamp(16px, 4vh, 40px)',
            }}
          >
            Continuing...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
