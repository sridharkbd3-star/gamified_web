// ============================================================
// STEM Adventure Platform — IntroEnvironment
// Phase 2
//
// The mysterious void environment for the opening scene.
// Layers: background image, atmospheric glows, energy particles,
// subtle fog, and slow pulsing light — all CSS/Framer Motion.
// This is separate from the global FuturisticBackground so it
// can be replaced or themed differently per scene.
// ============================================================

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface IntroEnvironmentProps {
  /** 0..1 — controls how much of the environment is revealed */
  revealProgress: number;
}

interface EnergyParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

const COLORS = [
  'rgba(0, 160, 255, 1)',
  'rgba(80, 40, 255, 1)',
  'rgba(0, 200, 255, 1)',
  'rgba(120, 60, 255, 1)',
  'rgba(0, 240, 200, 1)',
];

function genParticles(count: number): EnergyParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 0.5,
    opacity: Math.random() * 0.6 + 0.05,
    color: COLORS[i % COLORS.length],
    duration: Math.random() * 25 + 18,
    delay: Math.random() * -40,
    driftX: (Math.random() - 0.5) * 120,
    driftY: (Math.random() - 0.5) * 80,
  }));
}

export const IntroEnvironment: React.FC<IntroEnvironmentProps> = ({
  revealProgress,
}) => {
  const prefersReduced = useReducedMotion();
  const particles = useMemo(() => genParticles(45), []);

  // Reveal progress controls opacity of different layers
  const bgOpacity = Math.min(1, revealProgress * 1.2);
  const particleOpacity = Math.min(1, revealProgress * 2);
  const glowOpacity = Math.min(0.8, revealProgress * 1.5);

  return (
    <div className="fixed inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
      {/* ── Base void ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, #03030f 0%, #0c0c22 60%, #050511 100%)',
        }}
      />

      {/* ── Environment background image ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/intro-environment.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          opacity: bgOpacity * 0.45,
          filter: 'blur(2px) saturate(0.85)',
        }}
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.015, 1], opacity: [bgOpacity * 0.4, bgOpacity * 0.52, bgOpacity * 0.4] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Left atmospheric glow — deep blue ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-8%',
          width: '55%',
          height: '70%',
          background: 'radial-gradient(ellipse, rgba(0,180,255,0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: glowOpacity,
        }}
        animate={prefersReduced ? {} : { opacity: [glowOpacity * 0.7, glowOpacity, glowOpacity * 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Right atmospheric glow — purple ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: '50%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(123,47,255,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: glowOpacity,
        }}
        animate={prefersReduced ? {} : { opacity: [glowOpacity * 0.6, glowOpacity * 0.9, glowOpacity * 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* ── Center ground glow ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '80px',
          background: 'radial-gradient(ellipse, rgba(0,180,255,0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: glowOpacity,
          borderRadius: '50%',
        }}
        animate={prefersReduced ? {} : { opacity: [glowOpacity * 0.5, glowOpacity, glowOpacity * 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── Floating energy particles ── */}
      {!prefersReduced &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity: 0,
            }}
            animate={{
              x: [0, p.driftX * 0.5, p.driftX, p.driftX * 0.5, 0],
              y: [0, p.driftY * 0.5, p.driftY, p.driftY * 0.3, 0],
              opacity: [0, p.opacity * particleOpacity * 0.8, p.opacity * particleOpacity * 0.5, p.opacity * particleOpacity * 0.8, 0],
              scale: [0.8, 1.2, 1, 1.1, 0.8],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* ── Horizontal scan line effect ── */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          top: '55%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.06) 20%, rgba(37,99,235,0.12) 50%, rgba(37,99,235,0.06) 80%, transparent 100%)',
          opacity: particleOpacity * 0.5,
        }}
        animate={prefersReduced ? {} : { opacity: [0, particleOpacity * 0.4, 0], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Bottom vignette ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(transparent, rgba(255,255,255,0.45))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
