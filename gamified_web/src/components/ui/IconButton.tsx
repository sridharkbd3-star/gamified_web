// ============================================================
// STEM Adventure Platform — IconButton
// Phase 1 Foundation
//
// Compact round button for navigation, settings, profile, etc.
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { hoverGlow, tapPressStrong } from '../../animations/variants';
import { useReducedMotion } from '../../hooks';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  color?: string;
}

const sizeMap = {
  sm: { dim: '32px', iconSize: '14px' },
  md: { dim: '40px', iconSize: '18px' },
  lg: { dim: '48px', iconSize: '22px' },
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  tooltip,
  color = 'var(--color-primary)',
  className = '',
  disabled,
  ...rest
}) => {
  const prefersReduced = useReducedMotion();
  const { dim } = sizeMap[size];

  return (
    <motion.button
      title={tooltip}
      aria-label={tooltip}
      whileHover={!disabled && !prefersReduced ? hoverGlow : undefined}
      whileTap={!disabled && !prefersReduced ? tapPressStrong : undefined}
      className={[
        'relative inline-flex items-center justify-center',
        'rounded-full border transition-all',
        'focus-visible:ring-2 focus-visible:ring-offset-1',
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
      disabled={disabled}
      style={{
        width: dim,
        height: dim,
        background: `${color}14`,
        borderColor: `${color}35`,
        color: color,
        boxShadow: `0 0 12px ${color}20`,
        fontSize: sizeMap[size].iconSize,
      }}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {icon}
    </motion.button>
  );
};
