// ============================================================
// STEM Adventure Platform — Modal
// Phase 1 Foundation
//
// Reusable modal for settings, stage explanations, rewards,
// information panels, and future story overlays.
// ============================================================

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import { scaleInBounce } from '../../animations/variants';
import { IconButton } from './IconButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Max width of the modal panel */
  maxWidth?: string;
  /** Accent color for the top border */
  accentColor?: string;
  /** Whether clicking the backdrop closes the modal */
  closeOnBackdrop?: boolean;
  /** Hides the close button */
  hideCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '560px',
  accentColor = 'var(--color-primary)',
  closeOnBackdrop = true,
  hideCloseButton = false,
}) => {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={closeOnBackdrop ? onClose : undefined}
          >
            {/* Panel */}
            <motion.div
              key="modal-panel"
              variants={scaleInBounce}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ width: '100%', maxWidth }}
              onClick={(e) => e.stopPropagation()}
            >
              <GlassPanel
                accentColor={accentColor}
                padding="lg"
                rounded="xl"
                style={{ boxShadow: 'var(--shadow-modal)' }}
              >
                {/* Header */}
                {(title || !hideCloseButton) && (
                  <div className="flex items-center justify-between mb-5">
                    {title && (
                      <h2
                        className="text-section"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {title}
                      </h2>
                    )}
                    {!hideCloseButton && (
                      <IconButton
                        icon={<X size={16} />}
                        size="sm"
                        tooltip="Close"
                        onClick={onClose}
                        color="var(--color-text-secondary)"
                        aria-label="Close modal"
                      />
                    )}
                  </div>
                )}

                {/* Content */}
                <div>{children}</div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
