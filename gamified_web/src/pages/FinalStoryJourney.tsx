// ============================================================
// STEM Adventure Platform — FinalStoryJourney
// Final Conclusion Manager (Phase 1 & Phase 2)
//
// Manages the complete story climax:
//  - Phase 1: 4 STEM Domains Completed → 4 Stones → Future Self → Final Path
//  - Phase 2: Final Path → 4 Stones Placement → Tesseract Activation → STEM Hero → Ending
// ============================================================

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useGameState } from '../context/GameStateContext';
import { FinalConclusionPhase1 } from '../components/story/FinalConclusionPhase1';
import { FinalConclusionPhase2 } from '../components/story/FinalConclusionPhase2';

export const FinalStoryJourney: React.FC = () => {
  const { state, navigateTo } = useGameState();
  const [conclusionPhase, setConclusionPhase] = useState<'phase1' | 'phase2'>('phase1');

  return (
    <div className="relative w-full h-[100svh] min-h-screen overflow-hidden bg-black text-white select-none">
      <AnimatePresence mode="wait">
        {/* PHASE 1 OF FINAL CONCLUSION */}
        {state.currentScene === 'FINAL_PATH' && conclusionPhase === 'phase1' && (
          <FinalConclusionPhase1 key="phase1" onContinue={() => setConclusionPhase('phase2')} />
        )}

        {/* PHASE 2 OF FINAL CONCLUSION */}
        {state.currentScene === 'FINAL_PATH' && conclusionPhase === 'phase2' && (
          <FinalConclusionPhase2
            key="phase2"
            onReplay={() => setConclusionPhase('phase1')}
            onReturnToHub={() => navigateTo('MAIN_INTERFACE')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
