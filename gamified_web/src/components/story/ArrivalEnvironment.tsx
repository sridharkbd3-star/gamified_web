// ============================================================
// STEM Adventure Platform — ArrivalEnvironment Component
// Phase 4
//
// The central futuristic arrival chamber in the learning universe.
// Designed with a clean, structured visual grid, neon pillars,
// and floating holographic nodes. Leaving empty space around the
// central platform for the four STEM doors to emerge in Phase 5.
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

export const ArrivalEnvironment: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 60%, #08081a 0%, #030308 75%, #000000 100%)',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* ── Floor geometric grid (Pulsing and receding in perspective) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-20%',
          right: '-20%',
          height: '45vh',
          backgroundImage: `linear-gradient(rgba(0,180,255,0.18) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(0,180,255,0.18) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(200px) rotateX(60deg)',
          transformOrigin: 'top center',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Central arrival platform ── */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.0, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(500px, 90vw)',
          height: '25vh',
          background: 'radial-gradient(ellipse, rgba(0,180,255,0.25) 0%, rgba(13,13,26,0.82) 60%, rgba(5,5,12,0.95) 90%)',
          border: '1.5px solid rgba(0,180,255,0.35)',
          boxShadow: '0 -15px 50px rgba(0,180,255,0.2), inset 0 0 30px rgba(0,180,255,0.15)',
          borderRadius: '50%',
          zIndex: 2,
        }}
      >
        {/* Core glow on platform */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '40px',
            background: 'radial-gradient(circle, rgba(0,255,255,0.35) 0%, transparent 70%)',
            filter: 'blur(5px)',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      {/* ── Distant futuristic skyscrapers / towers (representing structural learning worlds) ── */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: 0,
          right: 0,
          height: '50vh',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          padding: '0 8%',
          opacity: 0.38,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* Pillar 1 */}
        <div style={{ width: '40px', height: '80%', background: 'linear-gradient(to top, rgba(0,180,255,0.3), transparent)', borderRadius: '4px 4px 0 0' }} />
        {/* Pillar 2 */}
        <div style={{ width: '50px', height: '95%', background: 'linear-gradient(to top, rgba(0,255,200,0.25), transparent)', borderRadius: '4px 4px 0 0' }} />
        {/* Pillar 3 */}
        <div style={{ width: '35px', height: '70%', background: 'linear-gradient(to top, rgba(123,47,255,0.3), transparent)', borderRadius: '4px 4px 0 0' }} />
        {/* Pillar 4 */}
        <div style={{ width: '45px', height: '85%', background: 'linear-gradient(to top, rgba(255,150,0,0.25), transparent)', borderRadius: '4px 4px 0 0' }} />
      </div>

      {/* ── Atmospheric particles (slow floating tech grids) ── */}
      {!prefersReduced && [0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={`arrival-node-${i}`}
          initial={{ opacity: 0.1, y: 300, x: 100 + i * 150 }}
          animate={{
            y: -100,
            opacity: [0.1, 0.45, 0.45, 0.1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'linear',
            delay: i * -4,
          }}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'rgba(0,180,255,0.8)',
            boxShadow: '0 0 8px rgba(0,180,255,0.6)',
            borderRadius: '50%',
            zIndex: 1,
          }}
        />
      ))}

      {/* ── Holographic grid lines in background ── */}
      <motion.div
        animate={prefersReduced ? {} : { opacity: [0.18, 0.35, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '40vh',
          borderLeft: '1px solid rgba(0,180,255,0.12)',
          borderRight: '1px solid rgba(0,180,255,0.12)',
          backgroundImage: 'radial-gradient(circle, rgba(0,180,255,0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          zIndex: 1,
        }}
      />

      {/* ── Radial overlay to blur edges ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 60%, transparent 40%, rgba(5,5,15,0.5) 80%, #020208 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
