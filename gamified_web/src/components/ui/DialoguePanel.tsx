// ============================================================
// STEM Adventure Platform — DialoguePanel
// Phase 1 Foundation
//
// The reusable visual shell for future dialogue sequences.
// Actual dialogue content (future-self conversations, NPC lines)
// will be connected in Phase 2+. This only provides the layout
// and visual foundation.
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from './GlassPanel';
import { fadeIn, slideUp } from '../../animations/variants';
import type { DialogueLine } from '../../types';

interface DialoguePanelProps {
  /** Current line to display. Pass null to hide the panel. */
  currentLine?: DialogueLine | null;
  /** Whether the panel is visible */
  isVisible?: boolean;
  /** Avatar URL/element for the speaker */
  speakerAvatar?: React.ReactNode;
  /** Called when user clicks to advance */
  onAdvance?: () => void;
  className?: string;
}

export const DialoguePanel: React.FC<DialoguePanelProps> = ({
  currentLine,
  isVisible = false,
  speakerAvatar,
  onAdvance,
  className = '',
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={['fixed bottom-0 left-0 right-0 z-50 p-4 md:p-8', className].join(' ')}
        >
          <GlassPanel
            accentColor="var(--color-primary)"
            padding="lg"
            rounded="xl"
            style={{ maxWidth: '900px', margin: '0 auto' }}
          >
            <div className="flex items-start gap-4">
              {/* Avatar slot */}
              <div
                className="shrink-0 rounded-full overflow-hidden"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--glass-bg-2)',
                  border: '2px solid var(--color-border-strong)',
                  boxShadow: 'var(--glow-primary)',
                }}
              >
                {speakerAvatar ?? (
                  // Placeholder avatar ring
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    <span className="text-label">??</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Speaker name */}
                <div className="mb-1">
                  <span
                    className="text-label"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {currentLine?.speakerName ?? 'Unknown'}
                  </span>
                </div>

                {/* Dialogue text */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentLine?.id}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-dialogue"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {currentLine?.text ?? '...'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Advance indicator */}
            <button
              onClick={onAdvance}
              className="absolute bottom-4 right-4 text-status cursor-pointer opacity-60 hover:opacity-100 transition-opacity focus-visible:ring-2 rounded"
              style={{ color: 'var(--color-primary)', background: 'none', border: 'none' }}
              aria-label="Continue dialogue"
            >
              ▶ Continue
            </button>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
