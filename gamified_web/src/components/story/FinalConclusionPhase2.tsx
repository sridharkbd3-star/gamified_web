// ============================================================
// S.H.I.E.L.D. Platform — FinalConclusionPhase2 Component
// Final Conclusion — Phase 2 of 2
//
// Complete Climax Sequence:
//   1. Mysterious Final Path Journey
//   2. Final Destination Chamber Reveal (4 Stone Slots + Central Tesseract Core)
//   3. Interactive Four Stone Placement (Science → Technology → Engineering → Mathematics)
//   4. All Stones Activated & Energy Convergence
//   5. Central Tesseract Activation ("FOUR DOMAINS. ONE POWER. KNOWLEDGE BECOMES POWER.")
//   6. STEM Hero Transformation & Reveal ("KNOWLEDGE HAS BECOME YOUR POWER. STEM HERO")
//   7. Final Future Self Appearance & Farewell Dialogue
//   8. Future Self Disappearance into Portal
//   9. Final SHIELD Conclusion Screen & Action Buttons (Replay, Achievements, Hub)
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical,
  Cpu,
  Wrench,
  Sigma,
  Shield,
  RotateCcw,
  Trophy,
  Home,
  Volume2,
  VolumeX,
} from 'lucide-react';

import { TimePortal } from './TimePortal';
import { FutureSelfReveal } from './FutureSelfReveal';
import { CharacterReveal } from './CharacterReveal';
import { TesseractObject } from './TesseractObject';
import { CinematicDialoguePanel } from './CinematicDialoguePanel';
import { LanguageSelector } from '../ui/LanguageSelector';
import { audioSynth } from '../../utils/audio';
import type { DialogueLine } from '../../types';

interface FinalConclusionPhase2Props {
  onReplay: () => void;
  onReturnToHub: () => void;
}

// ── STONE DEFINITIONS ───────────────────────────────────────
const STONES_DATA = [
  {
    id: 'sci',
    stoneId: 'science-stone',
    name: 'SCIENCE STONE',
    domain: 'SCIENCE',
    icon: FlaskConical,
    color: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.6)',
    desc: 'Discovery and understanding',
  },
  {
    id: 'tech',
    stoneId: 'technology-stone',
    name: 'TECHNOLOGY STONE',
    domain: 'TECHNOLOGY',
    icon: Cpu,
    color: '#7b2fff',
    glowColor: 'rgba(123, 47, 255, 0.6)',
    desc: 'Innovation and digital thinking',
  },
  {
    id: 'eng',
    stoneId: 'engineering-stone',
    name: 'ENGINEERING STONE',
    domain: 'ENGINEERING',
    icon: Wrench,
    color: '#ff9500',
    glowColor: 'rgba(255, 149, 0, 0.6)',
    desc: 'Creation and problem solving',
  },
  {
    id: 'math',
    stoneId: 'mathematics-stone',
    name: 'MATHEMATICS STONE',
    domain: 'MATHEMATICS',
    icon: Sigma,
    color: '#00ff88',
    glowColor: 'rgba(0, 255, 136, 0.6)',
    desc: 'Logic and reasoning',
  },
];

// ── FINAL CONVERSATION DIALOGUES ─────────────────────────────
const PHASE2_DIALOGUES: DialogueLine[] = [
  {
    id: 'p2-01',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'What... have I become?',
    emotion: 'neutral',
  },
  {
    id: 'p2-02',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'You have become the person you were meant to become.',
    emotion: 'proud',
  },
  {
    id: 'p2-03',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Your power was never in the suit.',
    emotion: 'serious',
  },
  {
    id: 'p2-04',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'The suit represents what you gained through your journey — knowledge, creativity, logic, problem-solving, and the courage to learn.',
    emotion: 'hopeful',
  },
  {
    id: 'p2-05',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'Then I am ready.',
    emotion: 'serious',
  },
  {
    id: 'p2-[#06]',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Yes. You are now ready to shape the future.',
    emotion: 'hopeful',
  },
  {
    id: 'p2-07',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'Will I see you again?',
    emotion: 'neutral',
  },
  {
    id: 'p2-08',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: "You won't need to.",
    emotion: 'serious',
  },
  {
    id: 'p2-09',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'From now on, the future is in your hands.',
    emotion: 'proud',
  },
];

type Phase2Step =
  | 'path-journey'
  | 'chamber-reveal'
  | 'stone-placement'
  | 'stones-activated'
  | 'tesseract-activation'
  | 'stem-combining'
  | 'hero-transformation'
  | 'hero-reveal'
  | 'future-self-dialogue'
  | 'future-self-goodbye'
  | 'final-shield-ending';

export const FinalConclusionPhase2: React.FC<FinalConclusionPhase2Props> = ({
  onReplay,
  onReturnToHub,
}) => {
  const [muted, setMuted] = useState(() => audioSynth.getMuted());
  const [step, setStep] = useState<Phase2Step>('path-journey');

  // Stone placement state tracking
  const [placedStones, setPlacedStones] = useState<Record<string, boolean>>({
    sci: false,
    tech: false,
    eng: false,
    math: false,
  });

  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  // Audio tone helper
  const playTone = useCallback((freq: number, duration: number = 0.1, type: OscillatorType = 'sine') => {
    if (muted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      }
    } catch {}
  }, [muted]);

  const handleToggleMute = () => {
    const isNowMuted = audioSynth.toggleMute();
    setMuted(isNowMuted);
  };

  // ── Step 1: Automatic camera travel along mysterious path to chamber ──
  useEffect(() => {
    if (step === 'path-journey') {
      playTone(350, 0.4);
      const timer = setTimeout(() => {
        setStep('chamber-reveal');
        playTone(550, 0.3);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step, playTone]);

  // ── Step 2: Chamber reveal transitions to interactive stone placement ──
  useEffect(() => {
    if (step === 'chamber-reveal') {
      const timer = setTimeout(() => {
        setStep('stone-placement');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Handle individual stone placement click
  const handlePlaceStone = (stoneKey: string) => {
    if (placedStones[stoneKey] || step !== 'stone-placement') return;

    const nextState = { ...placedStones, [stoneKey]: true };
    setPlacedStones(nextState);

    const freqs: Record<string, number> = { sci: 523.25, tech: 659.25, eng: 783.99, math: 1046.5 };
    playTone(freqs[stoneKey] || 600, 0.2, 'triangle');

    // Check if all 4 stones are placed
    if (Object.values(nextState).every(Boolean)) {
      setTimeout(() => {
        setStep('stones-activated');
        playTone(880, 0.4, 'sine');
      }, 1000);
    }
  };

  // ── Step 4: Stones activated → Tesseract activation ──
  useEffect(() => {
    if (step === 'stones-activated') {
      const timer = setTimeout(() => {
        setStep('tesseract-activation');
        playTone(440, 0.5, 'sawtooth');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, playTone]);

  // ── Step 5: Tesseract activation → STEM knowledge combining ──
  useEffect(() => {
    if (step === 'tesseract-activation') {
      const timer = setTimeout(() => {
        setStep('stem-combining');
        playTone(600, 0.4, 'sine');
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [step, playTone]);

  // ── Step 6: STEM combining → Hero transformation ──
  useEffect(() => {
    if (step === 'stem-combining') {
      const timer = setTimeout(() => {
        setStep('hero-transformation');
        playTone(750, 0.6, 'triangle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, playTone]);

  // ── Step 7: Hero transformation → Hero reveal ──
  useEffect(() => {
    if (step === 'hero-transformation') {
      const timer = setTimeout(() => {
        setStep('hero-reveal');
        playTone(900, 0.5, 'sine');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step, playTone]);

  // ── Step 8: Hero reveal → Future Self dialogue ──
  useEffect(() => {
    if (step === 'hero-reveal') {
      const timer = setTimeout(() => {
        setStep('future-self-dialogue');
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Dialogue advancement
  const handleAdvanceDialogue = () => {
    playTone(600, 0.08);
    if (dialogueIdx < PHASE2_DIALOGUES.length - 1) {
      setDialogueIdx((prev) => prev + 1);
    } else {
      // Future Self goodbye transition
      setStep('future-self-goodbye');
      playTone(400, 0.4);
    }
  };

  // ── Step 9: Future Self goodbye → Final SHIELD ending screen ──
  useEffect(() => {
    if (step === 'future-self-goodbye') {
      const timer = setTimeout(() => {
        setStep('final-shield-ending');
        playTone(1000, 0.6, 'triangle');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step, playTone]);

  const allPlaced = Object.values(placedStones).every(Boolean);

  const portalPhase =
    step === 'future-self-dialogue'
      ? 'open'
      : step === 'future-self-goodbye'
      ? 'closing'
      : 'hidden';

  const futureSelfPhase =
    step === 'future-self-dialogue'
      ? 'present'
      : step === 'future-self-goodbye'
      ? 'departing'
      : 'hidden';

  return (
    <div className="relative w-full h-[100svh] min-h-screen overflow-hidden bg-[#010106] text-white select-none">
      
      {/* ── Background Particles & Cosmic Lighting ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* ── Header HUD Bar ── */}
      <header className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
            <Shield size={16} className="text-[#00e5ff]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs tracking-[0.25em] font-bold text-slate-200">S.H.I.E.L.D.</span>
            <span className="text-[8px] tracking-widest text-cyan-400 uppercase font-bold">FINAL CONCLUSION · PHASE 2</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={handleToggleMute}
            className="w-8 h-8 rounded-lg border border-slate-800 bg-[#0d0d1a] flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
            title={muted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </header>

      {/* ── Main View Area ── */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          
          {/* ── STEP 1: MYSTERIOUS FINAL PATH JOURNEY ── */}
          {step === 'path-journey' && (
            <motion.div
              key="path-journey-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center max-w-2xl w-full"
            >
              <span className="px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-display text-[9px] font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">
                ✦ FOLLOWING THE PATH ✦
              </span>

              <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white tracking-widest uppercase mb-2">
                THE FINAL DESTINATION
              </h2>
              <p className="text-slate-400 text-xs md:text-sm font-display italic mb-8">
                "Follow the path. At the end, you will find where the four stones belong."
              </p>

              {/* Path Energy Line Visualization */}
              <div className="relative w-full max-w-md h-32 flex items-center justify-center overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3, ease: 'easeInOut' }}
                  className="w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-500 shadow-[0_0_20px_#00e5ff]"
                />

                {/* Traveling Energy Orb */}
                <motion.div
                  animate={{ x: [-180, 180] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-8 h-8 rounded-full bg-white border-2 border-cyan-400 shadow-[0_0_30px_#00e5ff]"
                />
              </div>
            </motion.div>
          )}

          {/* ── STEP 2 & 3: FINAL CHAMBER REVEAL & STONE PLACEMENT ── */}
          {(step === 'chamber-reveal' || step === 'stone-placement' || step === 'stones-activated') && (
            <motion.div
              key="chamber-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center max-w-4xl w-full"
            >
              <div className="mb-4">
                <span className="px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 font-display text-[9px] font-bold tracking-[0.3em] uppercase">
                  🏛️ THE FINAL CHAMBER
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wider uppercase mt-2">
                  PLACE THE FOUR REWARD STONES
                </h2>
                <p className="text-slate-400 text-xs mt-1 font-display">
                  Tap each stone slot to align knowledge cores with the central Tesseract.
                </p>
              </div>

              {/* Central Chamber Chamber Platform */}
              <div className="relative w-full max-w-md h-80 flex items-center justify-center bg-[#050514]/80 border border-cyan-500/20 rounded-3xl p-6 shadow-2xl mb-4">
                
                {/* Central Tesseract Core */}
                <div className="relative z-20 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360, scale: allPlaced ? [1, 1.15, 1] : 1 }}
                    transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.5, repeat: Infinity } }}
                    className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-4xl"
                    style={{
                      borderColor: allPlaced ? '#00e5ff' : 'rgba(0,229,255,0.4)',
                      backgroundColor: allPlaced ? 'rgba(0,229,255,0.2)' : 'rgba(5,5,20,0.8)',
                      boxShadow: allPlaced ? '0 0 50px #00e5ff, 0 0 100px #00e5ff' : '0 0 20px rgba(0,229,255,0.2)',
                    }}
                  >
                    🔷
                  </motion.div>
                </div>

                {/* 4 Stone Placement Slots Positioned Around Central Core */}
                {STONES_DATA.map((stn, i) => {
                  const isPlaced = placedStones[stn.id];
                  const positions = [
                    'top-4 left-1/2 -translate-x-1/2', // North (Science)
                    'top-1/2 right-4 -translate-y-1/2', // East (Technology)
                    'bottom-4 left-1/2 -translate-x-1/2', // South (Engineering)
                    'top-1/2 left-4 -translate-y-1/2', // West (Mathematics)
                  ];
                  return (
                    <motion.button
                      key={stn.id}
                      onClick={() => handlePlaceStone(stn.id)}
                      disabled={isPlaced || step !== 'stone-placement'}
                      whileHover={!isPlaced ? { scale: 1.1 } : {}}
                      whileTap={!isPlaced ? { scale: 0.92 } : {}}
                      className={`absolute ${positions[i]} p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${isPlaced ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                      style={{
                        borderColor: isPlaced ? stn.color : '#334155',
                        backgroundColor: isPlaced ? stn.color + '25' : '#090918',
                        boxShadow: isPlaced ? `0 0 30px ${stn.glowColor}` : 'none',
                      }}
                    >
                      <span className="text-xl">{isPlaced ? '🪨' : '🔒'}</span>
                      <span className="text-[8px] font-display font-bold uppercase tracking-widest" style={{ color: isPlaced ? stn.color : '#64748b' }}>
                        {stn.domain}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Quick Auto-Place Button for Hackathon Demos */}
              {step === 'stone-placement' && !allPlaced && (
                <button
                  onClick={() => {
                    setPlacedStones({ sci: true, tech: true, eng: true, math: true });
                    playTone(880, 0.4);
                    setTimeout(() => setStep('stones-activated'), 800);
                  }}
                  className="px-4 py-2 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-display text-[9px] font-bold tracking-widest uppercase cursor-pointer transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                >
                  ⚡ PLACE ALL FOUR STONES (DEMO MODE)
                </button>
              )}

              {/* Status Indicator */}
              {step === 'stones-activated' && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-6 py-2 rounded-full border border-cyan-400 bg-cyan-500/20 text-cyan-300 font-display text-xs font-bold tracking-[0.25em] uppercase shadow-[0_0_30px_#00e5ff] animate-pulse"
                >
                  ALL FOUR STONES ACTIVATED
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── STEP 4: TESSERACT ACTIVATION & STEM COMBINING ── */}
          {(step === 'tesseract-activation' || step === 'stem-combining') && (
            <motion.div
              key="tesseract-activation-view"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center max-w-xl w-full"
            >
              <p className="text-cyan-400 font-display text-[10px] font-bold tracking-[0.35em] uppercase mb-3">
                ◈ TESSERACT ACTIVATED ◈
              </p>

              {/* Reused Animated Tesseract Object */}
              <div className="w-44 h-44 mb-6 relative flex items-center justify-center">
                <TesseractObject phase="activating" />
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl font-extrabold text-white tracking-widest uppercase mb-2"
              >
                FOUR DOMAINS. ONE POWER.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-amber-400 font-display text-sm font-bold tracking-[0.25em] uppercase"
              >
                KNOWLEDGE BECOMES POWER.
              </motion.p>
            </motion.div>
          )}

          {/* ── STEP 5: STEM HERO TRANSFORMATION & REVEAL ── */}
          {(step === 'hero-transformation' || step === 'hero-reveal') && (
            <motion.div
              key="hero-reveal-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center max-w-xl w-full"
            >
              {/* Hero Character Visual */}
              <div className="w-56 h-72 relative mb-4">
                <CharacterReveal phase="revealed" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010106] via-transparent to-transparent z-10" />
              </div>

              <span className="px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-500/15 text-amber-300 font-display text-[10px] font-bold tracking-[0.3em] uppercase mb-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                KNOWLEDGE HAS BECOME YOUR POWER.
              </span>

              <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white tracking-widest uppercase">
                STEM HERO
              </h1>
            </motion.div>
          )}

          {/* ── STEP 6 & 7: FUTURE SELF CONVERSATION & GOODBYE ── */}
          {(step === 'future-self-dialogue' || step === 'future-self-goodbye') && (
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Time Portal */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <TimePortal phase={portalPhase} />
              </div>

              {/* STEM Hero (Protagonist - Left) */}
              <div className="absolute bottom-0 left-[5%] md:left-[12%] w-[180px] md:w-[260px] z-20 pointer-events-none">
                <CharacterReveal phase="revealed" />
              </div>

              {/* Future Self (Right) */}
              <FutureSelfReveal phase={futureSelfPhase} />

              {/* Dialogue Box */}
              {step === 'future-self-dialogue' && (
                <div className="absolute bottom-6 left-0 right-0 z-40 px-4 max-w-4xl mx-auto">
                  <CinematicDialoguePanel
                    line={PHASE2_DIALOGUES[dialogueIdx]}
                    isVisible={true}
                    onAdvance={handleAdvanceDialogue}
                    lineIndex={dialogueIdx}
                    totalLines={PHASE2_DIALOGUES.length}
                  />
                </div>
              )}

              {/* Goodbye Banner */}
              {step === 'future-self-goodbye' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-16 z-50 px-6 py-3 rounded-full border border-cyan-400/40 bg-black/70 backdrop-blur-md text-cyan-300 font-display text-xs font-bold tracking-[0.3em] uppercase shadow-[0_0_30px_#00e5ff]"
                >
                  "FROM NOW ON, THE FUTURE IS IN YOUR HANDS."
                </motion.div>
              )}
            </div>
          )}

          {/* ── STEP 8: FINAL SHIELD CONCLUSION SCREEN & ACTION BUTTONS ── */}
          {step === 'final-shield-ending' && (
            <motion.div
              key="final-shield-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center max-w-2xl w-full p-8 bg-[#050514]/90 border border-cyan-500/30 rounded-3xl backdrop-blur-2xl shadow-[0_0_50px_rgba(0,229,255,0.15)]"
            >
              <div className="w-16 h-16 rounded-2xl border border-cyan-400/40 bg-cyan-500/10 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(0,229,255,0.3)]">
                <Shield size={32} className="text-[#00e5ff]" />
              </div>

              <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white tracking-[0.25em] uppercase mb-2">
                S.H.I.E.L.D.
              </h1>

              <p className="text-cyan-400 font-display text-xs font-bold tracking-[0.3em] uppercase mb-6">
                LEARN. CHALLENGE. TRANSFORM. SHAPE THE FUTURE.
              </p>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 mb-8 text-slate-300 text-xs md:text-sm font-display leading-relaxed max-w-lg">
                "Your journey began with a question.<br />
                It ended with knowledge.<br />
                And now the future is yours to shape."
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <button
                  onClick={onReplay}
                  className="py-3.5 px-4 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-display text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> REPLAY JOURNEY
                </button>

                <button
                  onClick={() => setShowAchievementsModal(true)}
                  className="py-3.5 px-4 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-display text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Trophy size={14} /> ACHIEVEMENTS
                </button>

                <button
                  onClick={onReturnToHub}
                  className="py-3.5 px-4 rounded-xl border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-display text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Home size={14} /> STEM HUB
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── ACHIEVEMENTS SUMMARY MODAL ── */}
      {showAchievementsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#08081a] border border-cyan-500/30 rounded-3xl p-6 w-full max-w-md text-center">
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-4">
              🏆 STEM HERO ACHIEVEMENTS
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {STONES_DATA.map((s) => (
                <div key={s.id} className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex flex-col items-center">
                  <span className="text-2xl mb-1">🪨</span>
                  <span className="text-[9px] font-display font-bold uppercase" style={{ color: s.color }}>
                    {s.name}
                  </span>
                  <span className="text-[8px] text-slate-400 uppercase mt-0.5">Mastered</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAchievementsModal(false)}
              className="w-full py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 font-display text-xs uppercase tracking-widest cursor-pointer hover:border-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
