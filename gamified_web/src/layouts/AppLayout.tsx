// ============================================================
// STEM Adventure Platform — AppLayout
// Phase 1 Foundation + Phase 2 Update
//
// The root layout. Conditionally renders the global
// FuturisticBackground — story scenes manage their own
// environment so the global background is hidden for them.
// ============================================================

import React from 'react';
import { FuturisticBackground, SceneTransition } from '../components/ui';
import { useGameState } from '../context/GameStateContext';
import type { SceneName } from '../types';

// Scenes that provide their own full-screen environment
const STORY_SCENES: SceneName[] = [
  'LANGUAGE_SELECTION',
  'TEACHER_DASHBOARD',
  'INTRO',
  'TIME_PORTAL',
  'FUTURE_VISION',
  'TESSERACT',
  'TESSERACT_ACTIVATION',
  'GATEWAY_OPENING',
  'GATEWAY_TRAVEL',
  'NEW_WORLD_ARRIVAL',
  'MAIN_INTERFACE',
  'SCIENCE_WORLD',
  'TECHNOLOGY_WORLD',
  'ENGINEERING_WORLD',
  'MATHEMATICS_WORLD',
  'LEARNING_PATH',
  'STONE_REWARD',
  'FINAL_PATH',
  'HERO_TRANSFORMATION',
  'ENDING',
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { state } = useGameState();

  // Story scenes manage their own background — suppress global one
  const showGlobalBackground = !STORY_SCENES.includes(state.currentScene);

  // Group Phase 3 and Phase 4 scenes to prevent page remounts during dialogue transitions
  const activeSceneKey = (() => {
    switch (state.currentScene) {
      case 'TIME_PORTAL':
      case 'FUTURE_VISION':
      case 'TESSERACT':
        return 'PHASE_3_SCENE';
      case 'TESSERACT_ACTIVATION':
      case 'GATEWAY_OPENING':
      case 'GATEWAY_TRAVEL':
      case 'NEW_WORLD_ARRIVAL':
        return 'PHASE_4_SCENE';
      default:
        return state.currentScene;
    }
  })();

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: 'var(--color-void)' }}
    >
      {/* Layer 0 — Global atmospheric background (Foundation screen only) */}
      {showGlobalBackground && <FuturisticBackground intensity="medium" />}

      {/* Layer 1 — Scene content with transitions */}
      <div className="relative z-10 min-h-screen w-full">
        <SceneTransition sceneKey={activeSceneKey}>
          {children}
        </SceneTransition>
      </div>
    </div>
  );
};
