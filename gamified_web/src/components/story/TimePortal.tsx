// ============================================================
// STEM Adventure Platform — TimePortal
// Phase 3
//
// The cinematic time portal. Built entirely with CSS + Framer
// Motion — no images needed. The portal consists of:
//  - Multiple concentric rotating rings (alternating directions)
//  - Orbiting particle field
//  - Center vortex (layered radial gradients)
//  - Outer atmospheric glow
//  - Formation / opening / closing animations
// ============================================================

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

export type PortalPhase = 'hidden' | 'forming' | 'stable' | 'open' | 'closing';

interface TimePortalProps {
  phase: PortalPhase;
}

// Ring configuration (outer → inner)
const RINGS = [
  { ratio: 1.00, color: 'rgba(0,80,200,0.28)',   border: 1, speed: 28,  dir: 1  },
  { ratio: 0.87, color: 'rgba(0,120,255,0.42)',   border: 1, speed: 20,  dir: -1 },
  { ratio: 0.74, color: 'rgba(0,160,255,0.55)',   border: 2, speed: 14,  dir: 1  },
  { ratio: 0.62, color: 'rgba(0,200,255,0.68)',   border: 2, speed: 10,  dir: -1 },
  { ratio: 0.50, color: 'rgba(40,220,255,0.80)',  border: 3, speed: 7.5, dir: 1  },
  { ratio: 0.38, color: 'rgba(120,240,255,0.90)', border: 3, speed: 5,   dir: -1 },
  { ratio: 0.27, color: 'rgba(200,250,255,1.00)', border: 4, speed: 3.5, dir: 1  },
];

interface Particle { id: number; angle: number; radius: number; size: number; opacity: number; speed: number; }

function buildOrbitParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i / count) * 360,
    radius: 0.54 + (i % 3) * 0.08, // 3 orbital rings
    size: 1.5 + (i % 3) * 1,
    opacity: 0.5 + (i % 4) * 0.12,
    speed: 6 + (i % 5) * 2,
  }));
}

export const TimePortal: React.FC<TimePortalProps> = ({ phase }) => {
  const prefersReduced = useReducedMotion();
  const orbitParticles = useMemo(() => buildOrbitParticles(24), []);

  const isVisible = phase !== 'hidden';

  // Scale factor for forming/closing
  const scale =
    phase === 'hidden'  ? 0
    : phase === 'forming' ? 0.6
    : phase === 'closing' ? 0
    : 1;

  // Opacity
  const containerOpacity =
    phase === 'hidden'  ? 0
    : phase === 'forming' ? 0.7
    : 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="time-portal"
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{
            opacity: containerOpacity,
            scale,
            rotate: phase === 'forming' ? [0, 5, -3, 0] : 0,
          }}
          exit={{ opacity: 0, scale: 0, transition: { duration: 2, ease: 'easeIn' } }}
          transition={{
            opacity: { duration: phase === 'forming' ? 3 : 1.5, ease: 'easeOut' },
            scale:   { duration: phase === 'forming' ? 3.5 : phase === 'closing' ? 2.5 : 1.5, ease: phase === 'closing' ? 'easeIn' : 'easeOut' },
            rotate:  { duration: 3, ease: 'easeOut' },
          }}
          style={{
            position: 'absolute',
            // Portal positioned center-right
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -55%)',
            width:  'clamp(200px, 28vw, 380px)',
            height: 'clamp(200px, 28vw, 380px)',
            zIndex: 15,
          }}
        >
          {/* ── Outer atmospheric glow ── */}
          <div
            style={{
              position: 'absolute',
              inset: '-40%',
              background: 'radial-gradient(ellipse, rgba(0,100,255,0.18) 0%, rgba(0,60,200,0.08) 40%, transparent 70%)',
              filter: 'blur(30px)',
              borderRadius: '50%',
            }}
          />

          {/* ── Rings ── */}
          {RINGS.map((ring, idx) => {
            const size = `${ring.ratio * 100}%`;
            const offset = `${(1 - ring.ratio) * 50}%`;
            return (
              <motion.div
                key={idx}
                animate={
                  prefersReduced
                    ? {}
                    : { rotate: ring.dir > 0 ? 360 : -360 }
                }
                transition={{
                  duration: ring.speed,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  position: 'absolute',
                  top: offset,
                  left: offset,
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  border: `${ring.border}px solid ${ring.color}`,
                  boxShadow: `0 0 ${8 + idx * 3}px ${ring.color}, inset 0 0 ${4 + idx * 2}px ${ring.color}`,
                }}
              >
                {/* Tick marks on outermost ring */}
                {idx === 0 && Array.from({ length: 12 }).map((_, t) => (
                  <div
                    key={t}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '2px',
                      height: '6px',
                      background: 'rgba(0,180,255,0.5)',
                      transformOrigin: '1px 0',
                      transform: `translate(-50%, -100%) rotate(${t * 30}deg) translateY(-${50 / ring.ratio}%)`,
                    }}
                  />
                ))}
              </motion.div>
            );
          })}

          {/* ── Orbiting particles ── */}
          {!prefersReduced && orbitParticles.map((p) => (
            <motion.div
              key={p.id}
              animate={{ rotate: 360 }}
              transition={{ duration: p.speed, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: `${50 - p.radius * 50}%`,
                  left: '50%',
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  background: 'rgba(0,220,255,0.9)',
                  boxShadow: '0 0 4px rgba(0,220,255,0.8)',
                  transform: `translateX(-50%) rotate(${p.angle}deg)`,
                  opacity: p.opacity,
                }}
              />
            </motion.div>
          ))}

          {/* ── Center vortex ── */}
          <div
            style={{
              position: 'absolute',
              top: '27%',
              left: '27%',
              width: '46%',
              height: '46%',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            {/* Base portal center */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: phase === 'open'
                  ? 'radial-gradient(circle, rgba(220,245,255,0.95) 0%, rgba(80,200,255,0.8) 25%, rgba(0,120,255,0.6) 50%, rgba(0,40,180,0.4) 70%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(0,150,255,0.4) 0%, rgba(0,80,200,0.2) 50%, transparent 80%)',
                transition: 'background 1.5s ease',
              }}
            />

            {/* Swirling inner effect */}
            {!prefersReduced && (
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  borderRadius: '50%',
                  background: phase === 'open'
                    ? 'conic-gradient(from 0deg, transparent 0%, rgba(150,230,255,0.4) 20%, transparent 40%, rgba(80,180,255,0.3) 60%, transparent 80%)'
                    : 'conic-gradient(from 0deg, transparent 0%, rgba(0,150,255,0.2) 25%, transparent 50%)',
                  transition: 'background 1.5s ease',
                }}
              />
            )}

            {/* Open pulse */}
            {phase === 'open' && !prefersReduced && (
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
                }}
              />
            )}
          </div>

          {/* ── Energy ripples (open phase) ── */}
          {phase === 'open' && !prefersReduced && [0, 1, 2].map((i) => (
            <motion.div
              key={`ripple-${i}`}
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                inset: '15%',
                borderRadius: '50%',
                border: '1px solid rgba(0,200,255,0.6)',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
