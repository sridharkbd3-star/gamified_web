// ============================================================
// S.H.I.E.L.D. Platform — FinalConclusionPhase1 Component
// Final Conclusion — Phase 1 of 2
//
// Sequence:
//   1. ALL FOUR STEM DOMAINS COMPLETED & VERIFIED
//   2. FOUR STONES REVEALED (4/4 STONES COLLECTED)
//   3. TIME PORTAL APPEARS & FUTURE SELF EMERGES
//   4. CINEMATIC DIALOGUE (Young Man + Future Self)
//   5. FINAL PATH REVEALED → CONTINUE BUTTON TO PHASE 2
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical,
  Cpu,
  Wrench,
  Sigma,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Volume2,
  VolumeX,
} from 'lucide-react';

import { TimePortal } from './TimePortal';
import { FutureSelfReveal } from './FutureSelfReveal';
import { CharacterReveal } from './CharacterReveal';
import { CinematicDialoguePanel } from './CinematicDialoguePanel';
import { LanguageSelector } from '../ui/LanguageSelector';
import { audioSynth } from '../../utils/audio';
import type { DialogueLine } from '../../types';

interface FinalConclusionPhase1Props {
  onContinue: () => void;
}

// ── DOMAIN DATA ──────────────────────────────────────────────
const STEM_DOMAINS = [
  {
    id: 'science',
    name: 'SCIENCE',
    stoneName: 'SCIENCE STONE',
    desc: 'Discovery and understanding',
    icon: FlaskConical,
    color: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.5)',
  },
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    stoneName: 'TECHNOLOGY STONE',
    desc: 'Innovation and digital thinking',
    icon: Cpu,
    color: '#7b2fff',
    glowColor: 'rgba(123, 47, 255, 0.5)',
  },
  {
    id: 'engineering',
    name: 'ENGINEERING',
    stoneName: 'ENGINEERING STONE',
    desc: 'Creation and problem solving',
    icon: Wrench,
    color: '#ff9500',
    glowColor: 'rgba(255, 149, 0, 0.5)',
  },
  {
    id: 'mathematics',
    name: 'MATHEMATICS',
    stoneName: 'MATHEMATICS STONE',
    desc: 'Logic and reasoning',
    icon: Sigma,
    color: '#00ff88',
    glowColor: 'rgba(0, 255, 136, 0.5)',
  },
];

// ── DIALOGUE SEQUENCE DATA ──────────────────────────────────
const PHASE1_DIALOGUES: DialogueLine[] = [
  {
    id: 'p1-01',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'You did it. You have completed all four STEM domains and collected all four stones.',
    emotion: 'proud',
  },
  {
    id: 'p1-02',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'I completed everything you asked me to. But what are these stones really for?',
    emotion: 'neutral',
  },
  {
    id: 'p1-03',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'These stones represent more than your achievements.',
    emotion: 'serious',
  },
  {
    id: 'p1-04',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Each one carries the knowledge and abilities you gained from Science, Technology, Engineering, and Mathematics.',
    emotion: 'hopeful',
  },
  {
    id: 'p1-05',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'Then what do I have to do now?',
    emotion: 'serious',
  },
  {
    id: 'p1-06',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'There is one final step.',
    emotion: 'serious',
  },
  {
    id: 'p1-07',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Follow the path. At the end, you will find where the four stones belong.',
    emotion: 'hopeful',
  },
  {
    id: 'p1-08',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'The final step awaits...',
    emotion: 'serious',
  },
];

type PhaseStep =
  | 'domains-reveal'
  | 'domains-verified'
  | 'stones-reveal'
  | 'stones-complete'
  | 'portal-opening'
  | 'dialogue'
  | 'final-step-ready';

export const FinalConclusionPhase1: React.FC<FinalConclusionPhase1Props> = ({ onContinue }) => {
  const [muted, setMuted] = useState(() => audioSynth.getMuted());
  const [step, setStep] = useState<PhaseStep>('domains-reveal');
  const [revealedDomainsCount, setRevealedDomainsCount] = useState(0);
  const [revealedStonesCount, setRevealedStonesCount] = useState(0);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [pulseDomains, setPulseDomains] = useState(false);

  // Audio synthesizer beep helper
  const playBeep = useCallback((freq: number, duration: number = 0.1) => {
    if (muted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
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

  // ── Step 1: Sequential Domain Completion Reveal ──
  useEffect(() => {
    if (step === 'domains-reveal') {
      const timer = setInterval(() => {
        setRevealedDomainsCount((prev) => {
          if (prev < 4) {
            playBeep(440 + prev * 110, 0.12);
            return prev + 1;
          } else {
            clearInterval(timer);
            // Trigger domain verification energy pulse
            setTimeout(() => {
              setPulseDomains(true);
              setStep('domains-verified');
              playBeep(880, 0.3);
            }, 800);
            return prev;
          }
        });
      }, 700);
      return () => clearInterval(timer);
    }
  }, [step, playBeep]);

  // ── Step 2: Transition from verified domains to stones reveal ──
  useEffect(() => {
    if (step === 'domains-verified') {
      const timer = setTimeout(() => {
        setStep('stones-reveal');
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // ── Step 3: Sequential Stone Reveal ──
  useEffect(() => {
    if (step === 'stones-reveal') {
      const timer = setInterval(() => {
        setRevealedStonesCount((prev) => {
          if (prev < 4) {
            playBeep(523.25 * (prev + 1), 0.15);
            return prev + 1;
          } else {
            clearInterval(timer);
            setTimeout(() => {
              setStep('stones-complete');
              playBeep(1046.5, 0.4);
            }, 900);
            return prev;
          }
        });
      }, 800);
      return () => clearInterval(timer);
    }
  }, [step, playBeep]);

  // ── Step 4: Transition from stones complete to Portal Opening ──
  useEffect(() => {
    if (step === 'stones-complete') {
      const timer = setTimeout(() => {
        setStep('portal-opening');
        playBeep(300, 0.5);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, playBeep]);

  // ── Step 5: Portal opening to dialogue ──
  useEffect(() => {
    if (step === 'portal-opening') {
      const timer = setTimeout(() => {
        setStep('dialogue');
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Advance dialogue callback
  const handleAdvanceDialogue = () => {
    playBeep(600, 0.08);
    if (dialogueIdx < PHASE1_DIALOGUES.length - 1) {
      setDialogueIdx((prev) => prev + 1);
    } else {
      setStep('final-step-ready');
    }
  };

  const portalPhase =
    step === 'portal-opening' || step === 'dialogue' || step === 'final-step-ready'
      ? 'open'
      : 'hidden';

  const futureSelfPhase =
    step === 'dialogue' || step === 'final-step-ready' ? 'present' : 'hidden';

  return (
    <div className="relative w-full h-[100svh] min-h-screen overflow-hidden bg-[#020208] text-white select-none">
      
      {/* ── Background Grid & Radial Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.08) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* ── Top HUD Bar ── */}
      <header className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
            <Shield size={16} className="text-[#00e5ff]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs tracking-[0.25em] font-bold text-slate-200">S.H.I.E.L.D.</span>
            <span className="text-[8px] tracking-widest text-cyan-400 uppercase font-bold">FINAL CONCLUSION · PHASE 1</span>
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

      {/* ── Main Interactive Content Area ── */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
        
        {/* ── STAGE 1 & 2: STEM DOMAINS COMPLETION REVEAL ── */}
        {(step === 'domains-reveal' || step === 'domains-verified') && (
          <motion.div
            key="domains-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-4xl w-full"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-display text-[9px] font-bold tracking-[0.3em] uppercase">
                ✦ MISSION ACCOMPLISHED ✦
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-wider uppercase mt-4">
                ALL FOUR STEM DOMAINS COMPLETED
              </h1>
              <p className="text-slate-400 text-xs md:text-sm mt-2 font-display tracking-wide">
                You have mastered the four pillars of STEM.
              </p>
            </motion.div>

            {/* 4 Domains Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
              {STEM_DOMAINS.map((domain, i) => {
                const IconComponent = domain.icon;
                const isRevealed = i < revealedDomainsCount;
                return (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={
                      isRevealed
                        ? {
                            opacity: 1,
                            scale: pulseDomains ? [1, 1.06, 1] : 1,
                            borderColor: domain.color,
                            boxShadow: `0 0 25px ${domain.glowColor}`,
                          }
                        : { opacity: 0.2, scale: 0.9, borderColor: '#1e293b' }
                    }
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex flex-col items-center p-5 rounded-2xl border bg-[#060612]/80 backdrop-blur-md"
                  >
                    <div
                      className="w-12 h-12 rounded-xl border flex items-center justify-center mb-3"
                      style={{
                        borderColor: isRevealed ? domain.color : '#334155',
                        backgroundColor: isRevealed ? domain.color + '15' : 'transparent',
                        color: isRevealed ? domain.color : '#475569',
                      }}
                    >
                      <IconComponent size={22} />
                    </div>

                    <h3 className="font-display text-sm font-bold tracking-wider text-white">
                      {domain.name}
                    </h3>

                    <div className="flex items-center gap-1 mt-2">
                      {isRevealed ? (
                        <>
                          <CheckCircle2 size={12} style={{ color: domain.color }} />
                          <span className="text-[10px] font-display font-bold uppercase tracking-widest" style={{ color: domain.color }}>
                            COMPLETED · 100%
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-display font-bold uppercase tracking-widest text-slate-600">
                          VERIFYING...
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Verified Banner */}
            <AnimatePresence>
              {step === 'domains-verified' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-2.5 rounded-full border border-cyan-400/50 bg-cyan-500/15 text-cyan-300 font-display text-xs font-bold tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center gap-2"
                >
                  <Sparkles size={14} className="animate-spin" />
                  ALL DOMAINS VERIFIED
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── STAGE 3 & 4: FOUR STONES REVEAL ── */}
        {(step === 'stones-reveal' || step === 'stones-complete') && (
          <motion.div
            key="stones-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center text-center max-w-4xl w-full"
          >
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 font-display text-[9px] font-bold tracking-[0.3em] uppercase">
                🪨 THE FOUR REWARD STONES 🪨
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white tracking-wider uppercase mt-3">
                KNOWLEDGE GAINED FROM THE FOUR PILLARS
              </h2>
            </div>

            {/* 4 Stones Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-8">
              {STEM_DOMAINS.map((domain, i) => {
                const isStoneRevealed = i < revealedStonesCount;
                return (
                  <motion.div
                    key={domain.id + '-stone'}
                    initial={{ opacity: 0, scale: 0.4, y: 30 }}
                    animate={
                      isStoneRevealed
                        ? {
                            opacity: 1,
                            scale: 1,
                            y: [0, -8, 0],
                          }
                        : { opacity: 0.15, scale: 0.6 }
                    }
                    transition={{
                      scale: { duration: 0.6, ease: 'easeOut' },
                      y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                    }}
                    className="flex flex-col items-center p-6 rounded-3xl border bg-[#08081a]/90 backdrop-blur-xl relative overflow-hidden"
                    style={
                      isStoneRevealed
                        ? { borderColor: domain.color + '60', boxShadow: `0 0 35px ${domain.glowColor}` }
                        : { borderColor: '#1e293b' }
                    }
                  >
                    {/* Glowing background aura */}
                    {isStoneRevealed && (
                      <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${domain.color} 0%, transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Stone Gem Symbol Container */}
                    <div
                      className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-4xl mb-4 relative z-10"
                      style={{
                        borderColor: isStoneRevealed ? domain.color : '#334155',
                        backgroundColor: isStoneRevealed ? domain.color + '20' : 'transparent',
                        boxShadow: isStoneRevealed ? `0 0 25px ${domain.glowColor}` : 'none',
                      }}
                    >
                      {isStoneRevealed ? '🪨' : '🔒'}
                    </div>

                    <h4 className="font-display text-xs font-bold tracking-widest uppercase text-white z-10">
                      {domain.stoneName}
                    </h4>

                    <p className="text-[10px] text-slate-400 mt-2 font-display leading-tight italic z-10">
                      "{domain.desc}"
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Counter and Journey Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="px-6 py-2 rounded-full border border-amber-400/40 bg-amber-500/10 text-amber-300 font-display text-sm font-bold tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                4 / 4 STONES COLLECTED
              </div>
              <p className="text-slate-300 font-display text-xs tracking-[0.2em] uppercase mt-2 font-bold">
                FOUR DOMAINS. FOUR JOURNEYS.
              </p>
              <p className="text-cyan-400 font-display text-xs tracking-[0.25em] uppercase font-bold animate-pulse">
                ONE FINAL PATH AWAITS.
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* ── STAGE 5, 6 & 7: TIME PORTAL & FUTURE SELF CONVERSATION ── */}
        {(step === 'portal-opening' || step === 'dialogue' || step === 'final-step-ready') && (
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* Time Portal Animation Component */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <TimePortal phase={portalPhase} />
            </div>

            {/* Young Man (Protagonist - Left Side) */}
            <div className="absolute bottom-0 left-[5%] md:left-[12%] w-[180px] md:w-[260px] z-20 pointer-events-none">
              <CharacterReveal phase="revealed" />

              {/* Floating Stones next to Young Man */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-black/60 backdrop-blur-md">
                {STEM_DOMAINS.map((d) => (
                  <span key={d.id} className="text-xs" title={d.stoneName}>
                    🪨
                  </span>
                ))}
              </div>
            </div>

            {/* Future Self (Older Morales - Right Side) */}
            <FutureSelfReveal phase={futureSelfPhase} />

            {/* Dialogue Panel */}
            {step === 'dialogue' && (
              <div className="absolute bottom-6 left-0 right-0 z-40 px-4 max-w-4xl mx-auto">
                <CinematicDialoguePanel
                  line={PHASE1_DIALOGUES[dialogueIdx]}
                  isVisible={true}
                  onAdvance={handleAdvanceDialogue}
                  lineIndex={dialogueIdx}
                  totalLines={PHASE1_DIALOGUES.length}
                />
              </div>
            )}

            {/* Final Step Ready — CONTINUE Button */}
            {step === 'final-step-ready' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute bottom-12 z-50 flex flex-col items-center text-center px-4"
              >
                <p className="text-cyan-400 font-display text-xs tracking-[0.3em] uppercase font-bold mb-3 animate-pulse">
                  THE FINAL STEP AWAITS...
                </p>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(0, 229, 255, 0.4)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onContinue}
                  className="px-12 py-4 rounded-2xl border-2 border-cyan-400 bg-cyan-500/20 text-white font-display text-sm font-extrabold tracking-[0.25em] uppercase transition-all shadow-[0_0_25px_rgba(0,229,255,0.25)] flex items-center gap-3 cursor-pointer"
                >
                  <span>CONTINUE</span>
                  <ArrowRight size={16} className="text-cyan-300" />
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
