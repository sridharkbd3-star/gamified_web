// ============================================================
// STEM Adventure Platform — TesseractGateway Component
// Phase 4
//
// The dimensional learning gateway opened by the Tesseract.
// It consists of concentric, 3D rotating square energy frames
// to distinguish it from the circular Phase 3 Time Portal.
// Displays a teaser viewport of the arrival world inside its center.
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface TesseractGatewayProps {
  phase: 'hidden' | 'forming' | 'open';
}

const SQUARE_FRAMES = [
  { size: '100%', color: 'rgba(0,180,255,0.25)',  border: 1.5, rotSpeed: 18, dir: 1  },
  { size: '84%',  color: 'rgba(0,210,255,0.4)',   border: 1.5, rotSpeed: 12, dir: -1 },
  { size: '68%',  color: 'rgba(0,240,255,0.55)',  border: 2,   rotSpeed: 9,  dir: 1  },
  { size: '52%',  color: 'rgba(0,255,255,0.7)',   border: 2,   rotSpeed: 6.5,dir: -1 },
  { size: '36%',  color: 'rgba(120,255,255,0.95)', border: 3,   rotSpeed: 4.5,dir: 1  },
];

export const TesseractGateway: React.FC<TesseractGatewayProps> = ({ phase }) => {
  const prefersReduced = useReducedMotion();
  const isVisible = phase !== 'hidden';

  const scale =
    phase === 'hidden' ? 0
    : phase === 'forming' ? 0.55
    : 1.0;

  const opacity =
    phase === 'hidden' ? 0
    : phase === 'forming' ? 0.6
    : 1.0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="tesseract-gateway"
          initial={{ opacity: 0, scale: 0, rotate: 45 }}
          animate={{ opacity, scale, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, transition: { duration: 1.5 } }}
          transition={{
            opacity: { duration: phase === 'forming' ? 3.0 : 1.2, ease: 'easeOut' },
            scale: { duration: phase === 'forming' ? 3.5 : 1.5, ease: 'easeOut' },
            rotate: { duration: 2.5, ease: 'easeOut' },
          }}
          style={{
            position: 'absolute',
            top: '48%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(260px, 36vw, 480px)',
            height: 'clamp(260px, 36vw, 480px)',
            zIndex: 14,
            perspective: 1000,
          }}
        >
          {/* External atmospheric light glow */}
          <div
            style={{
              position: 'absolute',
              inset: '-30%',
              background: 'radial-gradient(circle, rgba(0,120,255,0.18) 0%, rgba(0,200,255,0.06) 45%, transparent 70%)',
              filter: 'blur(25px)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }}
          />

          {/* Concentric rotating squares */}
          {SQUARE_FRAMES.map((frm, idx) => {
            const offset = `${(100 - parseFloat(frm.size)) / 2}%`;
            return (
              <motion.div
                key={idx}
                animate={
                  prefersReduced
                    ? {}
                    : {
                        rotate: frm.dir > 0 ? 360 : -360,
                        rotateX: [0, 15, 0, -15, 0],
                        rotateY: [0, -10, 0, 10, 0],
                      }
                }
                transition={{
                  rotate: { duration: frm.rotSpeed, repeat: Infinity, ease: 'linear' },
                  rotateX: { duration: frm.rotSpeed * 1.5, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: frm.rotSpeed * 1.8, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{
                  position: 'absolute',
                  top: offset,
                  left: offset,
                  width: frm.size,
                  height: frm.size,
                  border: `${frm.border}px solid ${frm.color}`,
                  borderRadius: '16px',
                  boxShadow: `0 0 ${10 + idx * 4}px ${frm.color}, inset 0 0 ${5 + idx * 2}px ${frm.color}`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Circuit corner marks */}
                <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '8px', height: '8px', border: `2px solid ${frm.color}`, borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '8px', height: '8px', border: `2px solid ${frm.color}`, borderRadius: '50%' }} />
              </motion.div>
            );
          })}

          {/* Central viewport showing a teaser window of the new world */}
          <div
            style={{
              position: 'absolute',
              top: '32%',
              left: '32%',
              width: '36%',
              height: '36%',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 0 30px rgba(0,180,255,0.4)',
              zIndex: 10,
            }}
          >
            {/* Viewport backdrop (blurred structural matrix) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, rgba(0,30,80,0.95) 0%, rgba(3,3,10,0.98) 100%)',
              }}
            />
            
            {/* Pulsing grid grid lines inside gateway */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '-20%',
                backgroundImage: 'linear-gradient(rgba(0,180,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.15) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
              animate={prefersReduced ? {} : { scale: [1, 1.15, 1], y: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Inner holographic shapes (teaser of structures) */}
            <motion.div
              style={{
                position: 'absolute',
                top: '25%',
                left: '25%',
                width: '50%',
                height: '50%',
                border: '1px solid rgba(0,255,200,0.4)',
                transform: 'rotate(45deg)',
                background: 'linear-gradient(135deg, rgba(0,255,200,0.1) 0%, transparent 100%)',
              }}
              animate={prefersReduced ? {} : { opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Light shaft burst */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, rgba(220,250,255,0.85) 0%, rgba(0,160,255,0.4) 40%, transparent 75%)',
                transition: 'opacity 1.5s ease',
                opacity: phase === 'open' ? 0.9 : 0.3,
              }}
            />
          </div>

          {/* Energy shockwaves flowing inward */}
          {phase === 'open' && !prefersReduced && [0, 1, 2].map((i) => (
            <motion.div
              key={`shock-${i}`}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 0.36, opacity: [0, 0.85, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeIn',
              }}
              style={{
                position: 'absolute',
                inset: 0,
                border: '1.5px solid rgba(0,220,255,0.5)',
                borderRadius: '12px',
                pointerEvents: 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
