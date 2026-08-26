// ============================================================
// STEM Adventure Platform — TesseractObject
// Phase 3 & Phase 4 Update
//
// The glowing blue Tesseract — a CSS 3D cube with Framer
// Motion animations. No image required.
//
// Phases:
//  hidden      — not rendered
//  appearing   — fades + scales in with light burst
//  floating    — gently rotating + floating (held by future self)
//  handover    — moves from right to center
//  held        — smaller, near young man, pulsing (in hands)
//  activating  — floats up, scales up, spins rapidly
//  pulsing     — extremely bright, fires shockwaves
//  traveling   — centers on screen, zooms forward/backward
//  calm        — floats peacefully in the learning world
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

export type TesseractPhase =
  | 'hidden'
  | 'appearing'
  | 'floating'
  | 'handover'
  | 'held'
  | 'activating'
  | 'pulsing'
  | 'traveling'
  | 'calm';

interface TesseractObjectProps {
  phase: TesseractPhase;
}

const getFaceStyles = (halfSize: number): React.CSSProperties[] => [
  // front
  { background: 'linear-gradient(135deg, rgba(0,140,255,0.55) 0%, rgba(0,80,200,0.35) 100%)', transform: `translateZ(${halfSize}px)` },
  // back
  { background: 'linear-gradient(135deg, rgba(0,60,180,0.4) 0%, rgba(0,30,120,0.3) 100%)', transform: `translateZ(-${halfSize}px) rotateY(180deg)` },
  // left
  { background: 'linear-gradient(135deg, rgba(0,100,220,0.45) 0%, rgba(0,60,160,0.3) 100%)', transform: `rotateY(-90deg) translateZ(${halfSize}px)` },
  // right
  { background: 'linear-gradient(135deg, rgba(0,120,240,0.45) 0%, rgba(0,80,180,0.3) 100%)', transform: `rotateY(90deg) translateZ(${halfSize}px)` },
  // top
  { background: 'linear-gradient(135deg, rgba(60,180,255,0.55) 0%, rgba(0,120,220,0.35) 100%)', transform: `rotateX(90deg) translateZ(${halfSize}px)` },
  // bottom
  { background: 'linear-gradient(135deg, rgba(0,80,200,0.35) 0%, rgba(0,40,140,0.25) 100%)', transform: `rotateX(-90deg) translateZ(${halfSize}px)` },
];

export const TesseractObject: React.FC<TesseractObjectProps> = ({ phase }) => {
  const prefersReduced = useReducedMotion();
  const isVisible = phase !== 'hidden';

  // Size changes dynamically per phase
  const cubeSize =
    phase === 'held' ? 52
    : phase === 'activating' || phase === 'pulsing' ? 90
    : phase === 'traveling' ? 75
    : phase === 'calm' ? 64
    : 80;
  const halfSize = cubeSize / 2;

  // Position coordinates - interpolated smoothly via CSS transition
  const positionStyle: React.CSSProperties = (() => {
    switch (phase) {
      case 'held':
        return {
          position: 'absolute',
          bottom: '28%',
          left: '38%',
          transform: 'translate(-50%, 50%)',
          zIndex: 20,
          transition: 'all 2s ease-in-out',
        };
      case 'activating':
      case 'pulsing':
        return {
          position: 'absolute',
          top: '32%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          transition: 'all 2.5s ease-in-out',
        };
      case 'traveling':
        return {
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 35,
        };
      case 'calm':
        return {
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          transition: 'all 2s ease-in-out',
        };
      default: // appearing, floating, handover
        return {
          position: 'absolute',
          top: '35%',
          right: '22%',
          transform: 'translate(50%, -50%)',
          zIndex: 20,
          transition: 'all 2s ease-in-out',
        };
    }
  })();

  const isPulsing = phase === 'activating' || phase === 'pulsing';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="tesseract"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: phase === 'appearing' ? [0, 1] : 1,
            scale: phase === 'appearing' ? [0.3, 1.1, 1] : phase === 'handover' ? [1, 0.7] : 1,
            x: phase === 'handover' ? [0, -180] : 0,
          }}
          exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
          transition={{
            duration: phase === 'appearing' ? 1.5 : phase === 'handover' ? 2 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={positionStyle}
        >
          {/* Outer glow ring */}
          <motion.div
            style={{
              position: 'absolute',
              inset: isPulsing ? '-90%' : '-60%',
              background: isPulsing
                ? 'radial-gradient(ellipse, rgba(0,180,255,0.55) 0%, rgba(0,100,255,0.2) 40%, transparent 70%)'
                : 'radial-gradient(ellipse, rgba(0,160,255,0.35) 0%, transparent 65%)',
              filter: 'blur(15px)',
              borderRadius: '50%',
              pointerEvents: 'none',
              transition: 'inset 2s ease',
            }}
            animate={
              prefersReduced
                ? {}
                : {
                    opacity: phase === 'held' ? [0.6, 1, 0.6] : isPulsing ? [0.8, 1.1, 0.8] : [0.5, 0.8, 0.5],
                    scale: phase === 'held' ? [1, 1.15, 1] : isPulsing ? [1, 1.12, 1] : [1, 1.05, 1],
                  }
            }
            transition={{ duration: phase === 'held' ? 2 : isPulsing ? 1.2 : 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating HUD labels */}
          {(phase === 'floating' || phase === 'held' || phase === 'activating' || phase === 'calm') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                position: 'absolute',
                top: `-${cubeSize * 0.8}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: phase === 'held' || phase === 'calm' ? '0.55rem' : '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: isPulsing ? 'rgba(0,255,255,0.9)' : 'rgba(0,200,255,0.7)',
                  textShadow: isPulsing ? '0 0 15px rgba(0,255,255,0.8)' : '0 0 10px rgba(0,200,255,0.5)',
                  transition: 'color 1s, text-shadow 1s',
                }}
              >
                {phase === 'calm' ? 'TESSERACT STABLE' : 'TESSERACT'}
              </span>
            </motion.div>
          )}

          {/* 3D Cube wrapper */}
          <motion.div
            style={{
              width: cubeSize,
              height: cubeSize,
              perspective: 600,
            }}
            animate={
              prefersReduced
                ? {}
                : {
                    y: phase === 'held' ? [0, -4, 0] : isPulsing ? [0, -12, 0] : [0, -6, 0],
                    rotateY: phase === 'handover' ? 0 : 360,
                  }
            }
            transition={{
              y: { duration: isPulsing ? 1.5 : 3, repeat: Infinity, ease: 'easeInOut' },
              rotateY: { duration: isPulsing ? 3.5 : phase === 'traveling' ? 2 : 8, repeat: Infinity, ease: 'linear' },
            }}
          >
            {/* CSS 3D Cube */}
            <div
              style={{
                width: cubeSize,
                height: cubeSize,
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `rotateX(25deg)`,
              }}
            >
              {getFaceStyles(halfSize).map((faceStyle, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: cubeSize,
                    height: cubeSize,
                    ...faceStyle,
                    border: `1px solid rgba(0,180,255,${isPulsing ? 0.75 : 0.4 + i * 0.05})`,
                    boxShadow: isPulsing
                      ? `inset 0 0 ${halfSize}px rgba(0,200,255,0.45), 0 0 ${halfSize * 0.8}px rgba(0,220,255,0.8)`
                      : `inset 0 0 ${halfSize}px rgba(0,160,255,0.2), 0 0 ${halfSize * 0.4}px rgba(0,180,255,0.6)`,
                    backdropFilter: 'blur(2px)',
                    transition: 'border-color 1.5s, box-shadow 1.5s',
                  }}
                />
              ))}

              {/* Inner glowing core */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '25%',
                  width: '50%',
                  height: '50%',
                  background: isPulsing ? 'rgba(0,255,255,0.95)' : 'rgba(0,200,255,0.6)',
                  filter: `blur(${halfSize * (isPulsing ? 0.2 : 0.4)}px)`,
                  borderRadius: '50%',
                  transform: 'translateZ(0)',
                }}
                animate={isPulsing ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          {/* Handover & Shockwave Pulses */}
          {phase === 'handover' && !prefersReduced && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 3], opacity: [0.7, 0] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: '-50%',
                borderRadius: '50%',
                border: '2px solid rgba(0,200,255,0.8)',
                pointerEvents: 'none',
              }}
            />
          )}

          {phase === 'pulsing' && !prefersReduced && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: [0.8, 4.2], opacity: [0.9, 0] }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: '-50%',
                borderRadius: '50%',
                border: '3px solid rgba(0,240,255,0.9)',
                boxShadow: '0 0 15px rgba(0,240,255,0.6)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Held pulse ring */}
          {(phase === 'held' || phase === 'calm') && !prefersReduced && (
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: '-30%',
                borderRadius: '50%',
                border: '1px solid rgba(0,200,255,0.5)',
                pointerEvents: 'none',
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
