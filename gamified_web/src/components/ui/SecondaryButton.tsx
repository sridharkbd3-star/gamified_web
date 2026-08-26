// ============================================================
// STEM Adventure Platform — SecondaryButton
// Phase 1 Foundation
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { hoverGlow, tapPress } from '../../animations/variants';
import { useReducedMotion } from '../../hooks';
import type { ButtonSize } from '../../types';

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  children: React.ReactNode;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  size = 'md',
  children,
  className = '',
  disabled,
  ...rest
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      whileHover={!disabled && !prefersReduced ? hoverGlow : undefined}
      whileTap={!disabled && !prefersReduced ? tapPress : undefined}
      className={[
        'relative inline-flex items-center justify-center gap-2',
        'font-display tracking-widest uppercase font-medium',
        'rounded-lg border transition-all select-none',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]',
        sizeStyles[size],
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
      disabled={disabled}
      style={{
        background: 'rgba(123,47,255,0.08)',
        borderColor: 'rgba(123,47,255,0.35)',
        color: 'rgba(200,160,255,0.9)',
        backdropFilter: 'blur(8px)',
      }}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
};
