// ============================================================
// STEM Adventure Platform — App Root
// Phase 1 Foundation + Phase 2 Extension
//
// Scene router with all registered scenes.
// Adding a new scene requires:
//   1. Add to types/index.ts SceneName union
//   2. Create src/pages/SceneName.tsx
//   3. Add one case to renderScene() below
// ============================================================

import React from 'react';
import { GameStateProvider, useGameState } from './context/GameStateContext';
import { AppLayout } from './layouts/AppLayout';
import { FoundationScreen } from './pages/FoundationScreen';
import { IntroScene } from './pages/IntroScene';
import { Phase3Scene } from './pages/Phase3Scene';
import { Phase4Scene } from './pages/Phase4Scene';
import { MainInterface } from './pages/MainInterface';
import { DomainWorld } from './pages/DomainWorld';
import { FinalStoryJourney } from './pages/FinalStoryJourney';
import { LandingScreen } from './pages/LandingScreen';
import { LanguageSelectionScreen } from './pages/LanguageSelectionScreen';
import { SignInScreen } from './pages/SignInScreen';
import { TeacherSignInScreen } from './pages/TeacherSignInScreen';
import { SignUpScreen } from './pages/SignUpScreen';
import { TeacherDashboard } from './pages/TeacherDashboard';
import type { SceneName } from './types';

// ----------------------------------------------------------
// SCENE ROUTER
// ----------------------------------------------------------
function SceneRouter() {
  const { state, navigateTo } = useGameState();
  const isAuthenticated = !!state.currentUserEmail;

  React.useEffect(() => {
    const publicScenes: SceneName[] = ['LANGUAGE_SELECTION', 'LANDING', 'SIGN_IN', 'TEACHER_SIGN_IN', 'SIGN_UP', 'FOUNDATION'];
    if (!isAuthenticated && !publicScenes.includes(state.currentScene)) {
      navigateTo('LANDING');
      return;
    }

    if (isAuthenticated) {
      if (state.userRole === 'teacher' && state.currentScene !== 'TEACHER_DASHBOARD' && !publicScenes.includes(state.currentScene)) {
        navigateTo('TEACHER_DASHBOARD');
      } else if (state.userRole === 'student' && state.currentScene === 'TEACHER_DASHBOARD') {
        navigateTo('MAIN_INTERFACE');
      }
    }
  }, [isAuthenticated, state.userRole, state.currentScene, navigateTo]);

  // Protect private screens with a loading redirection overlay
  const publicScenes: SceneName[] = ['LANGUAGE_SELECTION', 'LANDING', 'SIGN_IN', 'TEACHER_SIGN_IN', 'SIGN_UP', 'FOUNDATION'];
  if (!isAuthenticated && !publicScenes.includes(state.currentScene)) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black text-cyan-400 font-display text-xs tracking-[0.2em] uppercase select-none">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
        INITIALIZING S.H.I.E.L.D...
      </div>
    );
  }

  return renderScene(state.currentScene);
}

function renderScene(scene: SceneName): React.ReactElement {
  switch (scene) {
    // ── Auth & Entrance ──
    case 'LANGUAGE_SELECTION':
      return <LanguageSelectionScreen />;
    case 'LANDING':
      return <LandingScreen />;
    case 'SIGN_IN':
      return <SignInScreen />;
    case 'TEACHER_SIGN_IN':
      return <TeacherSignInScreen />;
    case 'SIGN_UP':
      return <SignUpScreen />;
    case 'TEACHER_DASHBOARD':
      return <TeacherDashboard />;

    // ── Phase 1 ──
    case 'FOUNDATION':
      return <FoundationScreen />;

    // ── Phase 2 ──
    case 'INTRO':
      return <IntroScene />;

    // ── Phase 3 ──
    case 'TIME_PORTAL':
    case 'FUTURE_VISION':
    case 'TESSERACT':
      return <Phase3Scene />;

    // ── Phase 4 ──
    case 'TESSERACT_ACTIVATION':
    case 'GATEWAY_OPENING':
    case 'GATEWAY_TRAVEL':
    case 'NEW_WORLD_ARRIVAL':
      return <Phase4Scene />;

    // ── Phase 5 ──
    case 'MAIN_INTERFACE':
      return <MainInterface />;

    // ── Phase 6 ──
    case 'SCIENCE_WORLD':
    case 'TECHNOLOGY_WORLD':
    case 'ENGINEERING_WORLD':
    case 'MATHEMATICS_WORLD':
      return <DomainWorld />;

    // ── Phase 5 ──
    case 'LEARNING_PATH':
    case 'STONE_REWARD':
      return <PlaceholderScene name={scene} phase={5} />;

    // ── Phase 10 ──
    case 'FINAL_PATH':
    case 'HERO_TRANSFORMATION':
    case 'ENDING':
      return <FinalStoryJourney />;

    default:
      return <FoundationScreen />;
  }
}

// Story scenes that manage their own full-screen environment
const STORY_SCENES: SceneName[] = [
  'LANGUAGE_SELECTION',
  'LANDING',
  'SIGN_IN',
  'TEACHER_SIGN_IN',
  'SIGN_UP',
  'TEACHER_DASHBOARD',
  'INTRO',
  'TIME_PORTAL',
  'FUTURE_VISION',
  'TESSERACT',
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

export { STORY_SCENES };

// ----------------------------------------------------------
// Placeholder for future scenes
// ----------------------------------------------------------
function PlaceholderScene({ name, phase }: { name: string; phase: number }) {
  const { navigateTo } = useGameState();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-label" style={{ color: 'var(--color-text-muted)' }}>
        SCENE NOT YET IMPLEMENTED
      </p>
      <h2 className="text-section gradient-text-primary">{name}</h2>
      <p className="text-status">This scene will be built in Phase {phase}.</p>
      <button
        onClick={() => navigateTo('FOUNDATION')}
        style={{
          marginTop: '16px',
          color: 'var(--color-primary)',
          background: 'none',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '8px 20px',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        ← Back to Foundation
      </button>
    </div>
  );
}

// ----------------------------------------------------------
// ROOT APP
// ----------------------------------------------------------
function App() {
  return (
    <GameStateProvider>
      <AppLayout>
        <SceneRouter />
      </AppLayout>
    </GameStateProvider>
  );
}

export default App;
