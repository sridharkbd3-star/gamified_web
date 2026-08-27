// ============================================================
// STEM Adventure Platform — Futuristic Background
// Phase 1 Foundation
//
// A dark atmospheric environment with subtle depth layers
// and drifting particles. Reusable across all future scenes.
// ============================================================

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

interface FuturisticBackgroundProps {
  /** Optional extra class names for the wrapper */
  className?: string;
  /** Intensity of the atmospheric glow: low | medium | high */
  intensity?: 'low' | 'medium' | 'high';
  /** Optional domain-specific spatial atmosphere variant */
  variant?: 'default' | 'science' | 'technology' | 'engineering' | 'mathematics';
}

const PARTICLE_COUNT = 35;

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.05,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -30,
    driftX: (Math.random() - 0.5) * 60,
    driftY: (Math.random() - 0.5) * 60,
  }));
}

export const FuturisticBackground: React.FC<FuturisticBackgroundProps> = ({
  className = '',
  intensity = 'medium',
  variant = 'default',
}) => {
  const prefersReduced = useReducedMotion();
  const particles = useMemo(() => generateParticles(), []);

  const variantGlowColors = {
    default: { primary: 'rgba(0,180,255,0.18)', secondary: 'rgba(123,47,255,0.15)' },
    science: { primary: 'rgba(0,229,255,0.22)', secondary: 'rgba(0,140,255,0.18)' },
    technology: { primary: 'rgba(123,47,255,0.22)', secondary: 'rgba(0,229,255,0.18)' },
    engineering: { primary: 'rgba(255,149,0,0.22)', secondary: 'rgba(245,158,11,0.18)' },
    mathematics: { primary: 'rgba(0,255,136,0.22)', secondary: 'rgba(0,229,255,0.18)' },
  }[variant];

  const glowStrength = {
    low: { primary: '300px', secondary: '250px', opacity: 0.06 },
    medium: { primary: '500px', secondary: '400px', opacity: 0.1 },
    high: { primary: '700px', secondary: '550px', opacity: 0.15 },
  }[intensity];

  return (
    <div
      className={`fixed inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Deep void base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #050508 0%, #07071a 40%, #080818 70%, #050508 100%)',
        }}
      />

      {/* Primary atmospheric glow — top-left */}
      <div
        className="absolute"
        style={{
          top: '-10%',
          left: '-5%',
          width: glowStrength.primary,
          height: glowStrength.primary,
          background: `radial-gradient(circle, ${variantGlowColors.primary} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary atmospheric glow — bottom-right */}
      <div
        className="absolute"
        style={{
          bottom: '-10%',
          right: '-5%',
          width: glowStrength.secondary,
          height: glowStrength.secondary,
          background: `radial-gradient(circle, ${variantGlowColors.secondary} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Tertiary glow — center subtle cyan */}
      <div
        className="absolute"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: `radial-gradient(ellipse, rgba(0,180,255,${glowStrength.opacity}) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,180,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating particles */}
      {!prefersReduced &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.id % 3 === 0
                ? 'rgba(0,180,255,1)'
                : p.id % 3 === 1
                ? 'rgba(120,60,255,1)'
                : 'rgba(0,220,255,1)',
              opacity: p.opacity,
            }}
            animate={{
              x: [0, p.driftX, 0],
              y: [0, p.driftY, 0],
              opacity: [p.opacity, p.opacity * 1.8, p.opacity],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Top-edge scan line — subtle */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,180,255,0.3) 30%, rgba(0,180,255,0.5) 50%, rgba(0,180,255,0.3) 70%, transparent 100%)',
        }}
      />
    </div>
  );
};
