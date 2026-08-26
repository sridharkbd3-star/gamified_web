// ============================================================
// STEM Adventure Platform — Toast Notification
// Phase 1 Foundation
//
// Lightweight futuristic toast for system feedback.
// Used by ENTER PROTOTYPE button and future action confirmations.
// ============================================================

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, AlertTriangle, X } from 'lucide-react';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onDismiss: () => void;
  /** Auto-dismiss after ms (0 = no auto-dismiss) */
  duration?: number;
}

const toastConfig: Record<ToastType, { color: string; icon: React.ReactNode }> = {
  info:    { color: 'var(--color-primary)',   icon: <Info size={16} /> },
  success: { color: 'var(--color-success)',   icon: <CheckCircle size={16} /> },
  warning: { color: 'var(--color-warning)',   icon: <AlertTriangle size={16} /> },
  error:   { color: 'var(--color-error)',     icon: <X size={16} /> },
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onDismiss,
  duration = 4000,
}) => {
  const { color, icon } = toastConfig[type];

  useEffect(() => {
    if (!isVisible || duration === 0) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 left-1/2 z-[100]"
          style={{ transform: 'translateX(-50%)', width: 'max-content', maxWidth: '90vw' }}
          role="alert"
          aria-live="assertive"
        >
          <div
            style={{
              background: 'var(--glass-bg-2)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: `1px solid ${color}40`,
              borderRadius: '10px',
              boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${color}25`,
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--color-text-primary)',
            }}
          >
            {/* Left accent bar */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '20%',
                bottom: '20%',
                width: '2px',
                background: color,
                borderRadius: '99px',
                boxShadow: `0 0 8px ${color}`,
              }}
            />

            <span style={{ color, flexShrink: 0 }}>{icon}</span>

            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.5,
              }}
            >
              {message}
            </span>

            <button
              onClick={onDismiss}
              aria-label="Dismiss notification"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                padding: '2px',
                marginLeft: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
