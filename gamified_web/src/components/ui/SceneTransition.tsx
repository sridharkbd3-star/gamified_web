// ============================================================
// STEM Adventure Platform — SceneTransition
// Phase 1 Foundation
//
// Wraps scene content with AnimatePresence-based transitions.
// Future scenes plug in here without changing the architecture.
// ============================================================

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransition } from '../../animations/variants';
import { useReducedMotion } from '../../hooks';
import type { SceneName } from '../../types';

interface SceneTransitionProps {
  /** Key must change whenever the scene changes */
  sceneKey: SceneName | string;
  children: React.ReactNode;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  sceneKey,
  children,
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        variants={prefersReduced ? undefined : pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
