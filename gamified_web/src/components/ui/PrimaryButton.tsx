// ============================================================
// STEM Adventure Platform — PrimaryButton
// Phase 1 Foundation
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { hoverLift, tapPress } from '../../animations/variants';
import { useReducedMotion } from '../../hooks';
import type { ButtonSize } from '../../types';

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  loading?: boolean;
  glowColor?: string;
  children: React.ReactNode;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  size = 'md',
  loading = false,
  glowColor,
  children,
  className = '',
  disabled,
  ...rest
}) => {
  const prefersReduced = useReducedMotion();
  const isDisabled = disabled || loading;

  const customGlow = glowColor
    ? `0 0 20px ${glowColor}, 0 0 60px ${glowColor}40`
    : undefined;

  return (
    <motion.button
      whileHover={!isDisabled && !prefersReduced ? hoverLift : undefined}
      whileTap={!isDisabled && !prefersReduced ? tapPress : undefined}
      className={[
        'relative inline-flex items-center justify-center gap-2',
        'font-display tracking-widest uppercase font-semibold',
        'rounded-lg border transition-all select-none cursor-pointer',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
        sizeStyles[size],
        isDisabled
          ? 'opacity-40 cursor-not-allowed'
          : 'cursor-pointer',
        className,
      ].join(' ')}
      disabled={isDisabled}
      style={{
        background: isDisabled
          ? 'rgba(0,180,255,0.08)'
          : 'linear-gradient(135deg, rgba(0,140,255,0.25) 0%, rgba(0,80,200,0.35) 100%)',
        borderColor: isDisabled
          ? 'rgba(0,180,255,0.2)'
          : 'rgba(0,180,255,0.5)',
        color: 'var(--color-text-primary)',
        boxShadow: isDisabled
          ? 'none'
          : (customGlow ?? 'var(--glow-primary)'),
        backdropFilter: 'blur(8px)',
      }}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {/* Shine overlay */}
      {!isDisabled && (
        <span
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
          }}
        />
      )}

      {loading && (
        <Loader2 size={16} className="animate-spin shrink-0" aria-hidden="true" />
      )}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
