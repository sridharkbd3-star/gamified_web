// ============================================================
// STEM Adventure Platform â€” FutureSelfReveal
// Phase 3
//
// Renders the future-self character (older Morales).
// Uses the generated image with layered reveal animation:
// hidden â†’ silhouette â†’ fade-in â†’ present â†’ departing
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

export type FutureSelfPhase =
  | 'hidden'
  | 'arriving'     // stepping through portal
  | 'present'      // fully visible, standing
  | 'departing';   // stepping back toward portal

interface FutureSelfRevealProps {
  phase: FutureSelfPhase;
}

export const FutureSelfReveal: React.FC<FutureSelfRevealProps> = ({ phase }) => {
  const prefersReduced = useReducedMotion();
  const isVisible = phase !== 'hidden';

  const imageOpacity =
    phase === 'arriving'  ? 0.85
    : phase === 'present' ? 0.92
    : 0.5; // departing

  const imageFilter =
    phase === 'arriving'
      ? 'brightness(1.2) saturate(0.8) blur(0.5px)'
      : phase === 'present'
      ? 'brightness(1.0) saturate(0.95)'
      : 'brightness(0.7) saturate(0.5) blur(1px)';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="future-self"
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={{
            opacity: imageOpacity,
            x: phase === 'departing' ? 60 : 0,
            scale: phase === 'departing' ? 0.85 : 1,
          }}
          exit={{ opacity: 0, x: 80, scale: 0.8 }}
          transition={{
            duration: phase === 'arriving' ? 2 : phase === 'departing' ? 2.5 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            // Future self on the right side
            right: 'clamp(2%, 8vw, 12%)',
            width: 'clamp(160px, 22vw, 320px)',
            zIndex: 12,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {/* Portal light aura behind future self */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '50%',
              background: 'radial-gradient(ellipse, rgba(0,140,255,0.35) 0%, transparent 70%)',
              filter: 'blur(20px)',
              borderRadius: '50%',
              zIndex: 0,
            }}
            animate={
              prefersReduced
                ? {}
                : { opacity: phase === 'present' ? [0.6, 1, 0.6] : 0.4 }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Arrival shimmer overlay */}
          {phase === 'arriving' && !prefersReduced && (
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,180,255,0.4) 0%, transparent 60%)',
                zIndex: 3,
                borderRadius: '8px',
              }}
            />
          )}

          {/* Character image */}
          <div style={{ position: 'relative', paddingBottom: '133%' }}>
            <motion.img
              src="/future-self.jpg"
              alt="Future Morales â€” future version of the protagonist"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                filter: imageFilter,
                transition: 'filter 1.5s ease',
                zIndex: 2,
              }}
            />

            {/* Bottom fade */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '20%',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                zIndex: 4,
              }}
            />
          </div>

          {/* Subtle futuristic outline glow on present */}
          {phase === 'present' && !prefersReduced && (
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '5% 10%',
                border: '1px solid rgba(0,160,255,0.25)',
                borderRadius: '4px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
          )}

          {/* Departure ripple */}
          {phase === 'departing' && !prefersReduced && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '-5%',
                background: 'radial-gradient(ellipse, rgba(0,180,255,0.3) 0%, transparent 70%)',
                filter: 'blur(10px)',
                zIndex: 0,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
