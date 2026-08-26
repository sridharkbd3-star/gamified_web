// ============================================================
// STEM Adventure Platform â€” Main Interface Component
// Phase 5 â€” The Four STEM Doors
//
// The central learning hub of the platform. Morales is standing
// on the central platform surrounded by four massive interactive gateways
// representing Science, Technology, Engineering, and Mathematics.
//
// Features:
//  - First-visit cinematic reveal + dialogue lines.
//  - Semicircular perspective doors layout.
//  - Domain specific details & themes.
//  - Sliding Domain Preview Panel.
//  - Secondary HUD controls (Profile, Progress, Inventory, Settings, Help modals).
//  - Persistent state and mute controls.
// ============================================================

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  User,
  BarChart2,
  Briefcase,
  Settings,
  HelpCircle,
  X,
  ShieldAlert,
  BookOpen,
  Zap,
} from 'lucide-react';

import { useReducedMotion } from '../hooks';
import { useTranslation } from 'react-i18next';

// ── Reused components ─────────────────────────────────
import { ArrivalEnvironment } from '../components/story/ArrivalEnvironment';
import { CharacterReveal } from '../components/story/CharacterReveal';
import { TesseractObject } from '../components/story/TesseractObject';
import { CinematicDialoguePanel } from '../components/story/CinematicDialoguePanel';
import { Modal } from '../components/ui/Modal';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { DemoModeOverlay, DemoModeBadge } from '../components/demo/DemoModeOverlay';

// â”€â”€ State & Context â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { useGameState } from '../context/GameStateContext';
import { STEM_DOMAINS } from '../data/domains';
import { audioSynth } from '../utils/audio';
import { clearSessionEmail } from '../utils/gameStorage';
import type { DomainId, DialogueLine } from '../types';

// Intro dialogues for the first visit
const MAIN_INTRO_DIALOGUE: DialogueLine[] = [
  {
    id: 'm-intro-01',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'So this is the world my future self was talking about...',
    emotion: 'neutral',
  },
  {
    id: 'm-intro-02',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'Four paths... four kinds of knowledge.',
    emotion: 'neutral',
  },
];

export const MainInterface: React.FC = () => {
  const { state, navigateTo, dispatch } = useGameState();
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const isFirstVisit = state.isFirstMainInterfaceVisit ?? true;

  // Helper to calculate progress of a domain dynamically
  const getDomainProgress = (domainId: DomainId) => {
    const domain = STEM_DOMAINS.find((d) => d.id === domainId);
    if (!domain) return 0;
    const completedCount = domain.stages.filter((stg) =>
      state.completedStageIds.includes(stg.id)
    ).length;
    return Math.round((completedCount / domain.stages.length) * 100);
  };

  const getCompletedDomainsCount = () => {
    return STEM_DOMAINS.filter((d) => getDomainProgress(d.id) === 100).length;
  };

  const handleEnterWorld = (domainId: DomainId) => {
    dispatch({ type: 'ENTER_DOMAIN', domainId });
    const sceneName = (domainId.toUpperCase() + '_WORLD') as any;
    navigateTo(sceneName);
  };

  // Cinematic / UI States
  const [revealStage, setRevealStage] = useState<'idle' | 'revealing' | 'interactive'>(
    isFirstVisit ? 'idle' : 'interactive'
  );
  const [introDiagIndex, setIntroDiagIndex] = useState(0);
  const [activeDomainId, setActiveDomainId] = useState<DomainId | null>(null);
  const [hoveredDomainId, setHoveredDomainId] = useState<DomainId | null>(null);
  const [muted, setMuted] = useState(() => audioSynth.getMuted());
  const [activeHubPortalDialogue, setActiveHubPortalDialogue] = useState<DialogueLine | null>(null);
  const [showDemoOverlay, setShowDemoOverlay] = useState(false);

  // Checks for completion Moralestone warnings from Future Morales
  useEffect(() => {
    if (revealStage !== 'interactive') return;

    const completedCount = getCompletedDomainsCount();
    if (completedCount > 0 && completedCount <= 4) {
      const storageKey = `seen_hub_Moralestone_${completedCount}`;
      const seen = localStorage.getItem(storageKey);
      if (!seen) {
        if (!muted) {
          audioSynth.playPortalOpen();
        }
        let txt = '';
        let emo: 'neutral' | 'serious' | 'urgent' | 'hopeful' | 'proud' = 'serious';
        if (completedCount === 1) {
          txt = 'One path has been completed, Morales. Three remain. The Tesseract is beginning to awaken. Keep moving.';
          emo = 'serious';
        } else if (completedCount === 2) {
          txt = 'Two paths are active. The future timeline is beginning to bend. Your efforts are making a difference. Do not stop.';
          emo = 'hopeful';
        } else if (completedCount === 3) {
          txt = 'Three stones are united in the inventory. Only one pillar remains. The Tesseract energy is pulsing. The final test is near.';
          emo = 'urgent';
        } else if (completedCount === 4) {
          txt = 'You have gathered what you were searching for. The foundations are complete. But the final mission has not yet begun.';
          emo = 'proud';
        }

        setActiveHubPortalDialogue({
          id: `hub-Moralestone-dialog-${completedCount}`,
          speakerId: 'future-self',
          speakerName: 'Future Morales',
          text: txt,
          emotion: emo,
        });

        localStorage.setItem(storageKey, 'true');
      }
    }
  }, [revealStage]);

  // Modal states
  const [activeModal, setActiveModal] = useState<'profile' | 'progress' | 'inventory' | 'settings' | 'help' | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // References
  const layoutContainerRef = useRef<HTMLDivElement>(null);

  // Play arrival sound chime on initial visit load
  useEffect(() => {
    if (!muted) {
      audioSynth.playArrivalChime();
    }
  }, [muted]);

  // First Visit Reveal Timeline
  useEffect(() => {
    if (!isFirstVisit) return;

    // Start reveal sequence after a short delay
    const tReveal = setTimeout(() => {
      setRevealStage('revealing');
    }, 1000);

    return () => clearTimeout(tReveal);
  }, [isFirstVisit]);

  const handleAdvanceIntro = useCallback(() => {
    setIntroDiagIndex((prev) => {
      const next = prev + 1;
      if (next >= MAIN_INTRO_DIALOGUE.length) {
        // First visit complete! Enable interactive mode
        dispatch({ type: 'MARK_FIRST_VISIT_COMPLETE' });
        setRevealStage('interactive');
        return prev;
      }
      return next;
    });
  }, [dispatch]);

  const handleToggleMute = () => {
    const isNowMuted = audioSynth.toggleMute();
    setMuted(isNowMuted);
  };

  const handleResetGame = () => {
    dispatch({ type: 'RESET_GAME' });
    navigateTo('FOUNDATION');
  };

  // Door Hover sound feedback
  const handleDoorHover = (id: DomainId | null) => {
    setHoveredDomainId(id);
    if (id && !muted) {
      // Play a very subtle high frequency hover click synth
      try {
        const audioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (audioCtx) {
          const ctx = new audioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1000, ctx.currentTime);
          gain.gain.setValueAtTime(0.005, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        }
      } catch {}
    }
  };

  // Semicircular door layout mappings
  const getDoorTransform = (id: DomainId) => {
    if (activeDomainId) {
      return activeDomainId === id
        ? 'scale(1.08) translate3d(0, -10px, 0)'
        : 'scale(0.8) opacity(0.12)';
    }
    
    // Default semicircular styling on desktop
    switch (id) {
      case 'science':
        return 'perspective(600px) rotateY(15deg) translate3d(-35px, 0, 0)';
      case 'technology':
        return 'perspective(600px) rotateY(5deg) translate3d(-10px, 0, 0)';
      case 'engineering':
        return 'perspective(600px) rotateY(-5deg) translate3d(10px, 0, 0)';
      case 'mathematics':
        return 'perspective(600px) rotateY(-15deg) translate3d(35px, 0, 0)';
      default:
        return 'none';
    }
  };

  // Holographic motifs per domain
  const getDomainMotif = (id: DomainId) => {
    switch (id) {
      case 'science':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            {/* Molecular / atomic orbits */}
            <div className="w-20 h-20 rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="w-24 h-10 rounded-full border border-cyan-400/25 absolute rotate-45" />
            <div className="w-24 h-10 rounded-full border border-cyan-400/25 absolute -rotate-45" />
          </div>
        );
      case 'technology':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-20 p-2">
            {/* PCB / Circuit traces grid */}
            <div className="w-full h-full border-t border-b border-purple-500/20 grid grid-cols-4 divide-x divide-purple-500/10">
              <div /><div /><div /><div />
            </div>
            <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#7b2fff]" />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#7b2fff]" />
          </div>
        );
      case 'engineering':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
            {/* Rotational mesh blueprints */}
            <div className="w-16 h-16 border-2 border-dashed border-orange-500/30 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
            <div className="w-10 h-10 border border-orange-500/20 absolute transform rotate-12" />
            <div className="w-10 h-10 border border-orange-500/20 absolute transform -rotate-12" />
          </div>
        );
      case 'mathematics':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {/* Mathematical geometry coordinate graphs */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-500/30" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-green-500/30" />
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path d="M 10 50 Q 30 10 50 50 T 90 50" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="1" />
            </svg>
          </div>
        );
    }
  };

  const selectedDomain = activeDomainId ? STEM_DOMAINS.find((d) => d.id === activeDomainId) : null;

  return (
    <div
      ref={layoutContainerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* â”€â”€ Layer 0: Environment â”€â”€ */}
      <ArrivalEnvironment />

      {/* â”€â”€ Layer 1: Energy Pathways â”€â”€ */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id="path-sci" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="path-tech" x1="20%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7b2fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="path-eng" x1="80%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#ff9500" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff9500" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="path-math" x1="100%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Draw subtle connection lines between central platform (50%, 90%) and doors (15%, 35%, 65%, 85%) */}
        {revealStage === 'interactive' && !activeDomainId && (
          <>
            <path d="M 50 82 Q 35 60 15 50" fill="none" stroke="url(#path-sci)" strokeWidth="1.5" className="hidden lg:block opacity-40" />
            <path d="M 50 82 Q 42 60 38 48" fill="none" stroke="url(#path-tech)" strokeWidth="1.5" className="hidden lg:block opacity-40" />
            <path d="M 50 82 Q 58 60 62 48" fill="none" stroke="url(#path-eng)" strokeWidth="1.5" className="hidden lg:block opacity-40" />
            <path d="M 50 82 Q 65 60 85 50" fill="none" stroke="url(#path-math)" strokeWidth="1.5" className="hidden lg:block opacity-40" />
          </>
        )}
      </svg>

      {/* â”€â”€ Layer 2: Characters & Tesseract â”€â”€ */}
      {/* â”€â”€ Layer 2 & 3 Combined: Layout Grid (Left Morales, Right Domains) â”€â”€ */}
      {!activeDomainId && (
        <div
          className="absolute inset-0 flex flex-col md:flex-row justify-between items-stretch px-6 md:px-12 py-24 select-none z-10 overflow-y-auto md:overflow-hidden"
          style={{ height: '100%' }}
        >
          {/* Left Column: Player Character (Morales) */}
          <div
            className="w-full md:w-[28%] lg:w-[24%] shrink-0 flex items-end justify-center relative h-[250px] md:h-full pb-4"
            style={{
              transition: 'opacity 1.5s ease, transform 1s ease',
              opacity: revealStage === 'interactive' ? 1.0 : 0.35,
            }}
          >
            <div className="relative w-full h-full max-w-[240px] md:max-w-none flex items-end justify-center">
              <CharacterReveal phase="revealed" />
            </div>
          </div>

          {/* Right/Center Area: STEM Domain Doors Grid & Tesseract Core */}
          <div className="flex-1 flex flex-col justify-center gap-6 min-h-0 pl-0 md:pl-8 lg:pl-16">
            
            {/* The Four Domain doors grid */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
              style={{ transition: 'all 1.5s ease-in-out' }}
            >
              {STEM_DOMAINS.map((domain, index) => {
                const isHovered = hoveredDomainId === domain.id;
                const isLocked = revealStage === 'idle';
                const progress = getDomainProgress(domain.id);
                const delayReveal = index * 0.5;

                return (
                  <motion.div
                    key={domain.id}
                    initial={isFirstVisit ? { opacity: 0, scale: 0.7, y: 50 } : { opacity: 1, scale: 1, y: 0 }}
                    animate={
                      revealStage === 'revealing' || revealStage === 'interactive'
                        ? { opacity: 1, scale: 1, y: 0 }
                        : isFirstVisit
                        ? { opacity: 0, scale: 0.7, y: 50 }
                        : {}
                    }
                    transition={{
                      delay: isFirstVisit ? delayReveal : 0,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      transform: getDoorTransform(domain.id),
                      transition: 'all 1s ease-in-out, transform 0.4s ease',
                    }}
                  >
                    <div
                      onMouseEnter={() => !isLocked && !activeDomainId && handleDoorHover(domain.id)}
                      onMouseLeave={() => !isLocked && !activeDomainId && setHoveredDomainId(null)}
                      onClick={() => !isLocked && !activeDomainId && setActiveDomainId(domain.id)}
                      style={{
                        background: 'rgba(5, 5, 20, 0.82)',
                        backdropFilter: 'blur(8px)',
                        border: `1.5px solid ${
                          isHovered ? domain.color : progress === 100 ? `${domain.color}90` : 'rgba(0, 180, 255, 0.15)'
                        }`,
                        borderRadius: '16px',
                        height: 'clamp(180px, 32vh, 290px)',
                        padding: '16px',
                        cursor: isLocked || activeDomainId ? 'default' : 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isHovered
                          ? `0 0 35px ${domain.glowColor}`
                          : progress === 100
                          ? `0 0 15px ${domain.glowColor}, 0 8px 32px rgba(0,0,0,0.6)`
                          : '0 8px 32px rgba(0,0,0,0.6)',
                        transition: 'all 0.4s ease-out',
                      }}
                      aria-label={`${domain.name} Domain Gate`}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: '10%',
                          right: '10%',
                          height: '2px',
                          background: `linear-gradient(90deg, transparent, ${domain.color}, transparent)`,
                        }}
                      />
                      {getDomainMotif(domain.id)}
                      <div className="flex justify-between items-center z-10">
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.55rem',
                            letterSpacing: '0.12em',
                            color: domain.color,
                            border: `1px solid ${domain.color}33`,
                            padding: '2px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {domain.shortName}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.55rem',
                            letterSpacing: '0.08em',
                            color: progress === 100 ? '#00ff88' : progress > 0 ? domain.color : 'rgba(255,255,255,0.4)',
                          }}
                        >
                          {progress === 100 ? '❖ COMPLETED' : progress > 0 ? `❖ ${progress}%` : '❖ NOT STARTED'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center flex-1 py-4 z-10">
                        <div
                          style={{
                            width: 'clamp(50px, 8vh, 70px)',
                            height: 'clamp(55px, 10vh, 80px)',
                            border: `1px dashed ${domain.color}55`,
                            borderRadius: '8px 8px 0 0',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.25)',
                          }}
                        >
                          <motion.div
                            animate={
                              isHovered && !prefersReduced
                                ? { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }
                                : {}
                            }
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              background: domain.color,
                              boxShadow: `0 0 12px ${domain.color}`,
                              opacity: isHovered ? 0.9 : 0.4,
                              transition: 'all 0.4s ease',
                            }}
                          />
                        </div>
                      </div>
                      <div className="z-10 text-center">
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
                            letterSpacing: '0.12em',
                            color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.8)',
                            textShadow: isHovered ? `0 0 10px ${domain.color}` : 'none',
                            textTransform: 'uppercase',
                            margin: 0,
                            transition: 'all 0.4s ease',
                          }}
                        >
                          {t(`domains.${domain.id}`, domain.name)}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.6rem',
                            color: 'rgba(255,255,255,0.4)',
                            marginTop: '4px',
                            lineHeight: 1.3,
                          }}
                        >
                          {t(`domains.${domain.id}Desc`, domain.description)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom/Secondary Area inside column: Tesseract status core */}
            <div className="h-[95px] w-full relative flex items-center justify-center border border-cyan-500/10 bg-cyan-950/5 rounded-xl z-20">
              {state.player.collectedStones.length === 4 ? (
                <button
                  onClick={() => {
                    if (!muted) {
                      try {
                        const audioCtx = window.AudioContext || (window as any).webkitAudioContext;
                        if (audioCtx) {
                          const ctx = new audioCtx();
                          const osc = ctx.createOscillator();
                          const gain = ctx.createGain();
                          osc.type = 'sine';
                          osc.frequency.setValueAtTime(1000, ctx.currentTime);
                          gain.gain.setValueAtTime(0.005, ctx.currentTime);
                          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
                          osc.connect(gain);
                          gain.connect(ctx.destination);
                          osc.start();
                          osc.stop(ctx.currentTime + 0.1);
                        }
                      } catch {}
                    }
                    navigateTo('FINAL_PATH');
                  }}
                  style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 30,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'block',
                  }}
                  aria-label="Activate Tesseract Climax Sequence"
                >
                  <TesseractObject phase="pulsing" />
                  <span 
                    className="absolute bottom-[-32px] left-1/2 transform -translate-x-1/2 font-display text-[8px] tracking-widest text-cyan-300 uppercase whitespace-nowrap bg-black/80 border border-cyan-400/20 px-2 py-0.5 rounded animate-pulse"
                    style={{ zIndex: 40 }}
                  >
                    {state.player.avatarId === 'hero' ? 'â—ˆ REPLAY FINAL PATH â—ˆ' : 'â—ˆ ACTIVATE TESSERACT â—ˆ'}
                  </span>
                </button>
              ) : (
                <TesseractObject phase={revealStage === 'interactive' ? 'calm' : 'hidden'} />
              )}
            </div>

          </div>
        </div>
      )}

      {/* â”€â”€ Layer 4: Domain Details/Preview Sliding Panel â”€â”€ */}
      <AnimatePresence>
        {selectedDomain && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] z-[80]"
          >
            <div
              style={{
                height: '100%',
                background: 'rgba(4, 4, 12, 0.94)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderLeft: `1px solid ${selectedDomain.color}35`,
                padding: 'clamp(20px, 4vw, 40px) 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: `-10px 0 50px rgba(0,0,0,0.8), -5px 0 30px ${selectedDomain.glowColor}`,
              }}
            >
              {/* Dynamic Motif Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
                {getDomainMotif(selectedDomain.id)}
              </div>

              {/* Panel Top Header */}
              <div className="z-10">
                <div className="flex justify-between items-center mb-6">
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      color: selectedDomain.color,
                      textTransform: 'uppercase',
                    }}
                  >
                    Domain Gateway
                  </span>
                  <button
                    onClick={() => setActiveDomainId(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.4)',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                    aria-label="Close Preview"
                  >
                    <X size={20} />
                  </button>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                    color: selectedDomain.color,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    margin: 0,
                    textShadow: `0 0 15px ${selectedDomain.glowColor}`,
                  }}
                >
                  {selectedDomain.name}
                </h2>
                <div
                  style={{
                    width: '60px',
                    height: '2px',
                    background: selectedDomain.color,
                    margin: '12px 0 24px 0',
                  }}
                />

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.7,
                  }}
                >
                  {selectedDomain.longDescription}
                </p>

                <div
                  style={{
                    marginTop: '32px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(0,180,255,0.1)',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      color: 'rgba(255,255,255,0.35)',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Learning Path Status
                  </span>
                  <div
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      color: selectedDomain.color,
                      border: `1px solid ${selectedDomain.color}50`,
                      borderRadius: '4px',
                      padding: '4px 12px',
                      textTransform: 'uppercase',
                      background: `${selectedDomain.color}05`,
                    }}
                  >
                    {getDomainProgress(selectedDomain.id) === 100 ? 'Fully Completed' : 'Stages Available'}
                  </div>
                </div>
              </div>

              {/* Panel Bottom Controls */}
              <div className="z-10 flex flex-col gap-3">
                <button
                  onClick={() => handleEnterWorld(selectedDomain.id)}
                  style={{
                    width: '100%',
                    background: selectedDomain.color,
                    border: `1px solid ${selectedDomain.color}`,
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#000000',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: `0 0 15px ${selectedDomain.glowColor}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.style.boxShadow = `0 0 25px ${selectedDomain.color}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'none';
                    e.currentTarget.style.boxShadow = `0 0 15px ${selectedDomain.glowColor}`;
                  }}
                >
                  Enter World
                </button>

                <button
                  onClick={() => setActiveDomainId(null)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                >
                  Back to Hub
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* â”€â”€ Layer 5: HUD (Heads Up Display Layer) â”€â”€ */}
      {revealStage === 'interactive' && (
        <>
          {/* Top Left: Player Status badge */}
          <div
            className="absolute top-6 left-6"
            style={{
              zIndex: 50,
              background: 'rgba(5,5,18,0.65)',
              border: '1px solid rgba(0,180,255,0.15)',
              borderRadius: '10px',
              padding: '8px 14px',
              backdropFilter: 'blur(8px)',
              pointerEvents: activeDomainId ? 'none' : 'auto',
              opacity: activeDomainId ? 0.15 : 1.0,
              transition: 'opacity 0.6s ease',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                color: 'rgba(0,180,255,0.5)',
                textTransform: 'uppercase',
              }}
            >
              Player Status
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: '#ffffff',
                marginTop: '2px',
              }}
            >
              Morales <span style={{ color: 'var(--color-primary)' }}>Lv.1</span>
            </div>
          </div>

          {/* Top Right: System settings row */}
          <div
            className="absolute top-6 right-6 flex items-center gap-2"
            style={{
              zIndex: 50,
              pointerEvents: activeDomainId ? 'none' : 'auto',
              opacity: activeDomainId ? 0.15 : 1.0,
              transition: 'opacity 0.6s ease',
            }}
          >
            {/* Multilingual Language Selector */}
            <LanguageSelector />

            {/* Hackathon Demo / Cheat Mode Button */}
            <button
              onClick={() => setShowDemoOverlay(true)}
              title="Hackathon Demo / Cheat Mode"
              aria-label="Hackathon Demo / Cheat Mode"
              className="h-8 px-3 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-display text-[10px] font-bold tracking-widest uppercase transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)] flex items-center gap-1.5 cursor-pointer"
            >
              <Zap size={13} className="text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">DEMO MODE</span>
            </button>

            {/* Story Recall Button */}
            <button
              onClick={() => {
                dispatch({ type: 'SET_STORY_RECALL_MODE', active: true });
                navigateTo('INTRO');
              }}
              title="REVISIT YOUR JOURNEY"
              aria-label="REVISIT YOUR JOURNEY"
              style={{
                height: '32px',
                padding: '0 10px',
                borderRadius: '8px',
                background: 'rgba(5,5,18,0.65)',
                border: '1px solid rgba(0,180,255,0.15)',
                color: 'rgba(0,180,255,0.65)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(0,180,255,0.45)';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(0,180,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(0,180,255,0.65)';
                e.currentTarget.style.borderColor = 'rgba(0,180,255,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <BookOpen size={12} />
              <span className="hidden sm:inline">Story</span>
            </button>

            {[
              { icon: <User size={14} />, tooltip: 'Profile', key: 'profile' },
              { icon: <BarChart2 size={14} />, tooltip: 'Progress', key: 'progress' },
              { icon: <Briefcase size={14} />, tooltip: 'Inventory', key: 'inventory' },
              { icon: <Settings size={14} />, tooltip: 'Settings', key: 'settings' },
              { icon: <HelpCircle size={14} />, tooltip: 'Help', key: 'help' },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setActiveModal(btn.key as any)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(5,5,18,0.65)',
                  border: '1px solid rgba(0,180,255,0.15)',
                  color: 'rgba(0,180,255,0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(0,180,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(0,180,255,0.65)';
                  e.currentTarget.style.borderColor = 'rgba(0,180,255,0.15)';
                }}
                aria-label={btn.tooltip}
              >
                {btn.icon}
              </button>
            ))}

            {/* Mute button */}
            <button
              onClick={handleToggleMute}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(5,5,18,0.65)',
                border: '1px solid rgba(0,180,255,0.15)',
                color: muted ? 'rgba(0,180,255,0.4)' : '#00e5ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
              aria-label={muted ? 'Unmute sound' : 'Mute sound'}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>

          {/* Bottom HUD: Progress Stone slots bar */}
          <div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] px-6"
            style={{
              zIndex: 45,
              pointerEvents: activeDomainId ? 'none' : 'auto',
              opacity: activeDomainId ? 0.12 : 1.0,
              transition: 'opacity 0.6s ease',
            }}
          >
            <div
              style={{
                background: 'rgba(5,5,18,0.72)',
                border: '1px solid rgba(0,180,255,0.15)',
                borderRadius: '12px',
                padding: '10px 16px',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                STEM Core Status ({state.player.collectedStones.length} / 4 stones collected)
              </div>
              
              {/* Four slots for collected stones */}
              <div className="flex justify-center gap-4">
                {[
                  { id: 'science-stone', name: 'Science Stone', color: '#00e5ff' },
                  { id: 'technology-stone', name: 'Technology Stone', color: '#7b2fff' },
                  { id: 'engineering-stone', name: 'Engineering Stone', color: '#ff9500' },
                  { id: 'mathematics-stone', name: 'Mathematics Stone', color: '#00ff88' },
                ].map((stn, idx) => {
                  const isCollected = state.player.collectedStones.includes(stn.id as any);
                  return (
                    <div
                      key={idx}
                      title={`${stn.name} â€” ${isCollected ? 'Collected' : 'Locked'}`}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: isCollected ? `1.5px solid ${stn.color}` : '1px dashed rgba(0,180,255,0.25)',
                        background: isCollected ? `${stn.color}25` : 'rgba(0,0,0,0.45)',
                        boxShadow: isCollected ? `0 0 10px ${stn.color}60` : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.45rem',
                        fontFamily: 'var(--font-display)',
                        color: isCollected ? '#ffffff' : 'rgba(255,255,255,0.15)',
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* â”€â”€ Layer 6: First-Visit Dialogue Reveal Panel â”€â”€ */}
      {revealStage === 'revealing' && (
        <CinematicDialoguePanel
          line={MAIN_INTRO_DIALOGUE[introDiagIndex]}
          isVisible={true}
          onAdvance={handleAdvanceIntro}
          lineIndex={introDiagIndex}
          totalLines={MAIN_INTRO_DIALOGUE.length}
        />
      )}

      {/* â”€â”€ Secondary HUD Modals â”€â”€ */}
      
      {/* Profile Modal */}
      <Modal isOpen={activeModal === 'profile'} onClose={() => setActiveModal(null)} title="Player Profile" accentColor="var(--color-primary)">
        <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }} className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-lg">
            <div className="w-12 h-12 rounded-full border border-cyan-400/40 flex items-center justify-center font-display text-cyan-400 bg-cyan-400/10">
              M
            </div>
            <div>
              <div className="font-display text-white text-base">Morales</div>
              <div className="text-xs text-cyan-400 uppercase tracking-widest mt-0.5">Lv.1 Journeyer</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-[10px] uppercase tracking-wider text-white/40 block">Stones Earned</span>
              <span className="font-display text-lg text-white mt-1 block">{state.player.collectedStones.length} / 4</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-[10px] uppercase tracking-wider text-white/40 block">Domains Solved</span>
              <span className="font-display text-lg text-white mt-1 block">{getCompletedDomainsCount()} / 4</span>
            </div>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-white/40 block">Tesseract Sync</span>
            <span className="font-display text-xs text-cyan-400 tracking-wider block">â—ˆ SYNCED & ACTIVE</span>
          </div>
        </div>
      </Modal>

      {/* Progress Modal */}
      <Modal isOpen={activeModal === 'progress'} onClose={() => setActiveModal(null)} title="Journey Progress" accentColor="var(--color-accent)">
        <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }} className="space-y-3">
          {[
            { id: 'science', name: 'Science', color: '#00e5ff' },
            { id: 'technology', name: 'Technology', color: '#7b2fff' },
            { id: 'engineering', name: 'Engineering', color: '#ff9500' },
            { id: 'mathematics', name: 'Mathematics', color: '#00ff88' },
          ].map((item) => {
            const progress = getDomainProgress(item.id as any);
            const statusText = progress === 100 ? 'Completed' : progress > 0 ? `In Progress (${progress}%)` : 'Not Started';
            return (
              <div key={item.name} className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                  <span className="font-display text-white tracking-wider uppercase text-xs">{item.name}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-white/40" style={{ color: progress === 100 ? '#00ff88' : progress > 0 ? item.color : 'rgba(255,255,255,0.4)' }}>{statusText}</span>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Inventory Modal */}
      <Modal isOpen={activeModal === 'inventory'} onClose={() => setActiveModal(null)} title="Inventorial Core" accentColor="var(--color-secondary)">
        <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }} className="space-y-4">
          <p className="text-center text-xs text-white/50 italic py-2">
            â€œYour collected STEM stones will appear here.â€
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'science-stone', name: 'Science', color: '#00e5ff' },
              { id: 'technology-stone', name: 'Technology', color: '#7b2fff' },
              { id: 'engineering-stone', name: 'Engineering', color: '#ff9500' },
              { id: 'mathematics-stone', name: 'Mathematics', color: '#00ff88' },
            ].map((stn, i) => {
              const isCollected = state.player.collectedStones.includes(stn.id as any);
              return (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-black/40 flex flex-col items-center justify-center gap-1.5 p-1 text-center"
                  style={{
                    border: isCollected ? `1.5px solid ${stn.color}` : '1px dashed rgba(255,255,255,0.15)',
                    boxShadow: isCollected ? `inset 0 0 10px ${stn.color}40, 0 0 10px ${stn.color}20` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                  title={`${stn.name} Stone â€” ${isCollected ? 'Collected' : 'Locked'}`}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center font-display text-[9px]"
                    style={{
                      border: isCollected ? `1px solid ${stn.color}` : '1px solid rgba(255,255,255,0.05)',
                      background: isCollected ? `${stn.color}15` : 'rgba(255,255,255,0.05)',
                      color: isCollected ? '#ffffff' : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className="text-[9px] uppercase tracking-wider truncate w-full"
                    style={{ color: isCollected ? stn.color : 'rgba(255,255,255,0.25)' }}
                  >
                    {stn.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal isOpen={activeModal === 'settings'} onClose={() => setActiveModal(null)} title="Core Parameters" accentColor="var(--color-primary)">
        <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }} className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
            <span className="font-display text-white tracking-wider text-xs uppercase">Sound Effects</span>
            <button
              onClick={handleToggleMute}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                padding: '4px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: muted ? 'rgba(255,255,255,0.05)' : 'rgba(0,180,255,0.12)',
                border: `1px solid ${muted ? 'rgba(255,255,255,0.15)' : 'rgba(0,180,255,0.4)'}`,
                color: muted ? 'rgba(255,255,255,0.4)' : '#00e5ff',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >
              {muted ? 'Muted' : 'Active'}
            </button>
          </div>

          <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
            <div>
              <span className="font-display text-white tracking-wider text-xs uppercase block">Sign Out Session</span>
              <span className="text-[10px] text-white/40 mt-1 block">Log out of the secure terminal.</span>
            </div>
            <button
              onClick={() => {
                setActiveModal(null);
                clearSessionEmail();
                dispatch({ type: 'LOGOUT_USER' });
                navigateTo('LANDING');
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: 'rgba(0,180,255,0.12)',
                border: '1px solid rgba(0,180,255,0.4)',
                color: '#00e5ff',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,180,255,0.25)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,180,255,0.12)';
                e.currentTarget.style.color = '#00e5ff';
              }}
            >
              Log Out
            </button>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex flex-col gap-3">
            <div>
              <span className="font-display text-white tracking-wider text-xs uppercase block">Erase State</span>
              <span className="text-[10px] text-white/40 mt-1 block">Wipe all local storage and return to starting screen.</span>
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              style={{
                width: 'fit-content',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '6px',
                padding: '6px 16px',
                color: 'rgb(239, 68, 68)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
            >
              Reset Progress
            </button>
          </div>
        </div>
      </Modal>

      {/* Help Modal */}
      <Modal isOpen={activeModal === 'help'} onClose={() => setActiveModal(null)} title="Core Transmission" accentColor="var(--color-primary)">
        <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }} className="space-y-3">
          <p>
            Welcome to the entry platform of the learning universe. Your future self has opened this gateway.
          </p>
          <div className="space-y-1 mt-2">
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">â—ˆ</span>
              <span>Select any of the four gates to examine details about the domain.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">â—ˆ</span>
              <span>Completing paths in later updates yields stones.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">â—ˆ</span>
              <span>Combine all four stones in the Tesseract core to unlock the final stage.</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* RESET GAME DOUBLE-CONFIRMATION BOX */}
      <Modal isOpen={showResetConfirm} onClose={() => setShowResetConfirm(false)} title="Security Protocol" accentColor="rgb(239, 68, 68)">
        <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }} className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <ShieldAlert size={28} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-display text-white text-xs uppercase tracking-widest">Erase Memory?</div>
              <p className="text-[10px] text-red-400/80 mt-1">
                This action is permanent. All completed dialog logs, story states, and player progress will be cleared.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setShowResetConfirm(false)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '6px 14px',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleResetGame}
              style={{
                background: 'rgb(239, 68, 68)',
                border: '1px solid rgb(239, 68, 68)',
                borderRadius: '6px',
                padding: '6px 14px',
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                cursor: 'pointer',
              }}
            >
              Confirm Wipe
            </button>
          </div>
        </div>
      </Modal>

      {/* â”€â”€ Future-Self inter-domain Moralestone dialogue overlay â”€â”€ */}
      <AnimatePresence>
        {activeHubPortalDialogue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex flex-col justify-end"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(5,5,25,0.72) 0%, rgba(0,0,0,0.9) 80%)',
            }}
          >
            {/* Hologram spotlight */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[280px] h-[280px] rounded-full border border-cyan-400/20 flex items-center justify-center animate-pulse"
                style={{
                  boxShadow: '0 0 35px rgba(0, 229, 255, 0.2)',
                }}
              >
                <div className="w-20 h-20 rounded-full border border-cyan-400/5" />
              </div>
            </div>

            {/* Portal character model */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[180px] pointer-events-none">
              <CharacterReveal phase="revealed" />
            </div>

            <CinematicDialoguePanel
              line={activeHubPortalDialogue}
              isVisible={true}
              onAdvance={() => setActiveHubPortalDialogue(null)}
              lineIndex={0}
              totalLines={1}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Mode Overlay Modal */}
      {showDemoOverlay && (
        <DemoModeOverlay onClose={() => setShowDemoOverlay(false)} />
      )}

      {/* Demo Mode active badge */}
      {state.player.collectedStones.length > 0 && <DemoModeBadge />}
    </div>
  );
};
