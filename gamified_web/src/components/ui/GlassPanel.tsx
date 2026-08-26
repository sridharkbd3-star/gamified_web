// ============================================================
// STEM Adventure Platform — GlassPanel
// Phase 1 Foundation
//
// A translucent futuristic panel. The visual building block
// for all future scene panels, menus, and info cards.
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  /** Apply a colored top-edge accent line */
  accentColor?: string;
  /** Padding preset */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Border radius preset */
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Whether to animate on mount */
  animate?: boolean;
  as?: React.ElementType;
}

const paddingMap = {
  none: '0',
  sm:   '12px',
  md:   '20px',
  lg:   '28px',
  xl:   '40px',
};

const radiusMap = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
};

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  accentColor,
  padding = 'md',
  rounded = 'lg',
  style,
  animate = false,
}) => {
  const Component = animate ? motion.div : 'div';

  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as Easing },
      }
    : {};

  return (
    <Component
      className={['relative overflow-hidden', className].join(' ')}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-panel)',
        borderRadius: radiusMap[rounded],
        padding: paddingMap[padding],
        ...style,
      }}
      {...motionProps}
    >
      {/* Top accent line */}
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            borderRadius: `${radiusMap[rounded]} ${radiusMap[rounded]} 0 0`,
          }}
        />
      )}

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-4 h-4 pointer-events-none"
        style={{
          borderTop: '1px solid var(--color-border-strong)',
          borderLeft: '1px solid var(--color-border-strong)',
          borderRadius: `${radiusMap[rounded]} 0 0 0`,
        }}
      />
      <div
        className="absolute top-0 right-0 w-4 h-4 pointer-events-none"
        style={{
          borderTop: '1px solid var(--color-border-strong)',
          borderRight: '1px solid var(--color-border-strong)',
          borderRadius: `0 ${radiusMap[rounded]} 0 0`,
        }}
      />

      {children}
    </Component>
  );
};
