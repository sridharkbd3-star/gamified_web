// ============================================================
// STEM Adventure Platform — ProgressIndicator
// Phase 1 Foundation
//
// Reusable progress visualization. Supports linear and
// segmented variants. Will show STEM journey progress in
// later phases.
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';
import type { ProgressProps } from '../../types';

export const ProgressIndicator: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'linear',
  color = 'var(--color-primary)',
  label,
  showValue = false,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  if (variant === 'segmented') {
    return (
      <SegmentedProgress
        pct={pct}
        color={color}
        label={label}
        showValue={showValue}
        className={className}
        prefersReduced={prefersReduced}
      />
    );
  }

  // Linear (default)
  return (
    <div className={['flex flex-col gap-1', className].join(' ')}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-label" style={{ color: 'var(--color-text-secondary)' }}>
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-status" style={{ color }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}

      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '6px',
          background: 'var(--color-surface-3)',
          borderRadius: '99px',
          border: '1px solid var(--color-border-subtle)',
        }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            borderRadius: '99px',
            boxShadow: `0 0 8px ${color}60`,
          }}
          initial={{ width: 0 }}
          animate={{ width: prefersReduced ? `${pct}%` : `${pct}%` }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </div>
    </div>
  );
};

// ----------------------------------------------------------
// Segmented variant
// ----------------------------------------------------------
interface SegmentedProgressProps {
  pct: number;
  color: string;
  label?: string;
  showValue?: boolean;
  className?: string;
  prefersReduced?: boolean;
}

const SEGMENTS = 10;

function SegmentedProgress({
  pct,
  color,
  label,
  showValue,
  className = '',
  prefersReduced,
}: SegmentedProgressProps) {
  const filledCount = Math.round((pct / 100) * SEGMENTS);

  return (
    <div className={['flex flex-col gap-2', className].join(' ')}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-label" style={{ color: 'var(--color-text-secondary)' }}>
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-status" style={{ color }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const isFilled = i < filledCount;
          return (
            <motion.div
              key={i}
              className="flex-1"
              style={{
                height: '8px',
                borderRadius: '2px',
                background: isFilled ? color : 'var(--color-surface-3)',
                border: `1px solid ${isFilled ? `${color}50` : 'var(--color-border-subtle)'}`,
                boxShadow: isFilled ? `0 0 6px ${color}50` : 'none',
              }}
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            />
          );
        })}
      </div>
    </div>
  );
}
