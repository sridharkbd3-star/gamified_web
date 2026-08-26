// ============================================================
// STEM Adventure Platform — GlowCard
// Phase 1 Foundation
//
// A glass card with a colored edge glow. Used for STEM domains,
// missions, achievements, and stages in later phases.
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { hoverLift, tapPress } from '../../animations/variants';
import { useReducedMotion } from '../../hooks';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  /** Primary color for glow and accent */
  color?: string;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  color = 'var(--color-primary)',
  interactive = false,
  onClick,
  'aria-label': ariaLabel,
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick?.();
            }
          : undefined
      }
      whileHover={interactive && !prefersReduced ? hoverLift : undefined}
      whileTap={interactive && !prefersReduced ? tapPress : undefined}
      className={[
        'relative overflow-hidden',
        interactive ? 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2' : '',
        className,
      ].join(' ')}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${color}30`,
        borderRadius: '12px',
        boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 30px ${color}18`,
        outlineColor: color,
      }}
    >
      {/* Top glowing edge */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${color}80 30%, ${color} 50%, ${color}80 70%, transparent 100%)`,
        }}
      />

      {/* Hover glow overlay — shows on hover via CSS in parent */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at top, ${color}08 0%, transparent 60%)`,
          opacity: interactive ? 1 : 0,
        }}
      />

      {children}
    </motion.div>
  );
};
