// ============================================================
// STEM Adventure Platform — TravelTunnel Component
// Phase 4
//
// Cinematic full-screen dimensional travel sequence.
// Uses concentric square wireframe tunnels scaling up rapidly
// towards the camera alongside streaking speed particles
// to create a powerful sense of velocity and travel.
// ============================================================

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface StarStreak {
  id: number;
  x: number;
  y: number;
  length: number;
  width: number;
  duration: number;
  delay: number;
}

function genStreaks(count: number): StarStreak[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80, // % from center
    y: 10 + Math.random() * 80,
    length: Math.random() * 180 + 80,
    width: Math.random() * 2 + 1,
    duration: Math.random() * 0.8 + 0.5, // fast!
    delay: Math.random() * -1.5,
  }));
}

export const TravelTunnel: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const streaks = useMemo(() => genStreaks(25), []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle, #010412 0%, #000000 100%)',
        zIndex: 100,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Center vortex core */}
      <div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(220,250,255,0.7) 0%, rgba(0,120,255,0.3) 40%, transparent 75%)',
          filter: 'blur(30px)',
          borderRadius: '50%',
          zIndex: 102,
        }}
      />

      {/* Speed streaks zooming from center outwards */}
      {!prefersReduced &&
        streaks.map((s) => {
          // Compute angle from screen center
          const angle = Math.atan2(s.y - 50, s.x - 50);
          return (
            <motion.div
              key={s.id}
              initial={{ scaleX: 0.1, scaleY: 0.1, x: 0, y: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                scaleY: 1,
                // Move outward along angle
                x: Math.cos(angle) * window.innerWidth * 0.7,
                y: Math.sin(angle) * window.innerHeight * 0.7,
                opacity: [0, 0.95, 0.95, 0],
              }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                ease: 'easeIn',
              }}
              style={{
                position: 'absolute',
                width: `${s.length}px`,
                height: `${s.width}px`,
                background: 'linear-gradient(90deg, transparent, rgba(0,220,255,0.8), #ffffff)',
                transformOrigin: 'left center',
                transform: `rotate(${angle}rad)`,
                zIndex: 101,
              }}
            />
          );
        })}

      {/* Zooming concentric square frames */}
      {!prefersReduced &&
        [0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`tunnel-ring-${i}`}
            initial={{ scale: 0.05, opacity: 0, rotate: i * 15 }}
            animate={{
              scale: 4.5,
              opacity: [0, 0.45, 0.45, 0],
              rotate: i * 15 + 45,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeIn',
            }}
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              border: '1.5px solid rgba(0,180,255,0.3)',
              boxShadow: '0 0 10px rgba(0,180,255,0.15)',
              borderRadius: '24px',
              pointerEvents: 'none',
              zIndex: 99,
            }}
          />
        ))}

      {/* Rushing flash frames */}
      {!prefersReduced && (
        <motion.div
          animate={{ opacity: [0, 0.1, 0, 0.15, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,150,255,0.06)',
            pointerEvents: 'none',
            zIndex: 103,
          }}
        />
      )}
    </div>
  );
};
