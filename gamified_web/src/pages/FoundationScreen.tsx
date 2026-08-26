// ============================================================
// STEM Adventure Platform — Foundation Screen
// Phase 1 Only — NOT part of the final story
//
// This screen proves that the foundation is working.
// It demonstrates the visual language, components, and state.
// It will be replaced by the INTRO scene in Phase 2.
// ============================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  BarChart2,
  FlaskConical,
  Cpu,
  Wrench,
  Sigma,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';

import {
  PrimaryButton,
  SecondaryButton,
  GlassPanel,
  GlowCard,
  IconButton,
  ProgressIndicator,
  Modal,
  Toast,
} from '../components/ui';

import { useGameState } from '../context/GameStateContext';
import { STEM_DOMAINS } from '../data/domains';
import { hasSavedState } from '../utils/gameStorage';

import {
  staggerContainer,
  staggerChild,
  fadeInSlow,
} from '../animations/variants';
import type { TargetAndTransition } from 'framer-motion';

// Typed animation objects for direct use in `animate` prop
const floatAnim: TargetAndTransition = {
  y: [0, -6, 0],
  transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
};
const glowAnim: TargetAndTransition = {
  opacity: [0.5, 1, 0.5],
  transition: { duration: 2.5, ease: 'easeInOut', repeat: Infinity },
};
const statusPulse: TargetAndTransition = {
  opacity: [0.4, 1, 0.4],
  transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
};

// Domain icon map — resolved at render time
const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  FlaskConical: <FlaskConical size={28} />,
  Cpu:          <Cpu size={28} />,
  Wrench:       <Wrench size={28} />,
  Sigma:        <Sigma size={28} />,
};

export const FoundationScreen: React.FC = () => {
  const { state, dispatch, navigateTo } = useGameState();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'info' | 'success' | 'warning'>('info');
  const [modalOpen, setModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Show a notification toast
  function showToast(msg: string, type: 'info' | 'success' | 'warning' = 'info') {
    setToastMessage(msg);
    setToastType(type);
    setToastVisible(true);
  }

  function handleEnterPrototype() {
    // Navigate to the INTRO scene with a brief visual cue
    setIsTransitioning(true);
    setTimeout(() => {
      navigateTo('INTRO');
    }, 600);
  }

  function handleResetGame() {
    dispatch({ type: 'RESET_GAME' });
    showToast('Game state reset to default.', 'warning');
  }

  return (
    <>
      {/* ---- CINEMATIC TRANSITION OVERLAY ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeIn' }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'black',
          zIndex: 9999,
          pointerEvents: isTransitioning ? 'all' : 'none',
        }}
      />

      {/* ---- TOAST ---- */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={toastVisible}
        onDismiss={() => setToastVisible(false)}
        duration={4500}
      />


      {/* ---- MODAL DEMO ---- */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="System Architecture"
        accentColor="var(--color-secondary)"
      >
        <div style={{ color: 'var(--color-text-secondary)' }} className="space-y-3">
          <p className="text-base" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            This modal component is the reusable foundation for all future
            information panels, stage explanations, settings, and rewards.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { label: 'Current Scene',  value: state.currentScene },
              { label: 'Player Level',   value: `Level ${state.player.level}` },
              { label: 'Stones',         value: `${state.player.collectedStones.length} / 4` },
              { label: 'State Version',  value: `v${state._version}` },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                }}
              >
                <div className="text-label" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
                <div className="text-status mt-1" style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>{value}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <SecondaryButton size="sm" onClick={() => setModalOpen(false)}>
              Close
            </SecondaryButton>
          </div>
        </div>
      </Modal>

      {/* ======================================================
          MAIN SCREEN CONTENT
         ====================================================== */}
      <div className="relative min-h-screen w-full flex flex-col">

        {/* ---- TOP BAR ---- */}
        <motion.header
          variants={fadeInSlow}
          initial="hidden"
          animate="visible"
          className="relative z-20 flex items-center justify-between px-6 py-4"
          style={{
            borderBottom: '1px solid var(--color-border-subtle)',
            background: 'rgba(5,5,8,0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={glowAnim}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                boxShadow: 'var(--glow-primary)',
              }}
            />
            <span
              className="text-label"
              style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.15em' }}
            >
              STEM ADVENTURE
            </span>
          </div>

          {/* Phase badge */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(123,47,255,0.12)',
              border: '1px solid rgba(123,47,255,0.3)',
            }}
          >
            <span className="text-label" style={{ color: 'rgba(180,130,255,0.9)' }}>
              PHASE 1 — FOUNDATION
            </span>
          </div>

          {/* Icon buttons */}
          <div className="flex items-center gap-2">
            <IconButton
              icon={<User size={16} />}
              tooltip="Player Profile"
              size="sm"
            />
            <IconButton
              icon={<BarChart2 size={16} />}
              tooltip="Progress"
              size="sm"
              onClick={() => setModalOpen(true)}
            />
            <IconButton
              icon={<Settings size={16} />}
              tooltip="Settings"
              size="sm"
            />
          </div>
        </motion.header>

        {/* ---- HERO SECTION ---- */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
            style={{ gap: '24px' }}
          >
            {/* Floating accent shape above title */}
            <motion.div animate={floatAnim}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  border: '1px solid rgba(0,180,255,0.4)',
                  transform: 'rotate(45deg)',
                  borderRadius: '8px',
                  background: 'rgba(0,100,200,0.12)',
                  boxShadow: '0 0 30px rgba(0,180,255,0.2)',
                  backdropFilter: 'blur(4px)',
                }}
              />
            </motion.div>

            {/* Main title */}
            <motion.h1 variants={staggerChild} className="text-cinematic gradient-text-primary">
              STEM<br />ADVENTURE
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={staggerChild}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.03em',
                maxWidth: '520px',
              }}
            >
              A journey where knowledge shapes the future.
            </motion.p>

            {/* Divider */}
            <motion.div
              variants={staggerChild}
              style={{
                width: '120px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
              }}
            />

            {/* CTA Buttons */}
            <motion.div
              variants={staggerChild}
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <PrimaryButton
                size="lg"
                onClick={handleEnterPrototype}
                disabled={isTransitioning}
                loading={isTransitioning}
                aria-label="Begin the story — enter the opening cinematic"
              >
                Begin the Story
                <ChevronRight size={16} />
              </PrimaryButton>
              <SecondaryButton
                size="lg"
                onClick={() => setModalOpen(true)}
                aria-label="View system architecture"
              >
                System Info
              </SecondaryButton>
            </motion.div>

            {/* State save indicator */}
            <motion.div variants={staggerChild}>
              <span
                className="text-status flex items-center gap-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <motion.span
                  animate={statusPulse}
                  style={{ color: 'var(--color-success)', fontSize: '8px' }}
                >
                  ●
                </motion.span>
                {hasSavedState()
                  ? 'Game state persisted to localStorage'
                  : 'Initializing game state...'}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ======================================================
            COMPONENT SHOWCASE — proves visual language is working
           ====================================================== */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-16"
          style={{ gap: '32px', display: 'flex', flexDirection: 'column' }}
        >
          {/* Section label */}
          <motion.div variants={staggerChild} className="flex items-center gap-4">
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'var(--color-border-subtle)',
              }}
            />
            <span className="text-label" style={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
              COMPONENT FOUNDATION
            </span>
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'var(--color-border-subtle)',
              }}
            />
          </motion.div>

          {/* ---- DOMAIN GLOW CARDS ---- */}
          <motion.div
            variants={staggerChild}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {STEM_DOMAINS.map((domain) => (
              <GlowCard
                key={domain.id}
                color={domain.color}
                interactive
                aria-label={`${domain.name} domain — coming in later phases`}
                onClick={() =>
                  showToast(`${domain.name} world unlocks in a future phase.`, 'info')
                }
              >
                <div className="p-5 flex flex-col gap-3">
                  {/* Icon */}
                  <div
                    style={{
                      color: domain.color,
                      filter: `drop-shadow(0 0 8px ${domain.color}80)`,
                    }}
                  >
                    {DOMAIN_ICONS[domain.iconName]}
                  </div>

                  {/* Name */}
                  <div>
                    <div
                      className="text-label mb-1"
                      style={{ color: domain.color }}
                    >
                      {domain.shortName}
                    </div>
                    <h3
                      className="font-display font-semibold"
                      style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {domain.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {domain.description}
                  </p>

                  {/* Locked badge */}
                  <div
                    className="text-label"
                    style={{
                      color: 'var(--color-text-muted)',
                      marginTop: 'auto',
                    }}
                  >
                    ◈ LOCKED — Phase 4
                  </div>
                </div>
              </GlowCard>
            ))}
          </motion.div>

          {/* ---- GLASS PANELS + PROGRESS ---- */}
          <motion.div
            variants={staggerChild}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Player status panel */}
            <GlassPanel accentColor="var(--color-primary)" padding="lg" animate>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-label" style={{ color: 'var(--color-primary)' }}>
                    PLAYER STATUS
                  </span>
                  <span className="text-status">
                    {state.player.name} · Lv.{state.player.level}
                  </span>
                </div>

                <ProgressIndicator
                  value={state.player.overallProgress}
                  label="Journey Progress"
                  showValue
                  color="var(--color-primary)"
                />

                <ProgressIndicator
                  value={state.player.collectedStones.length}
                  max={4}
                  variant="segmented"
                  label="Stones Collected"
                  showValue
                  color="var(--color-accent)"
                />

                <div className="flex gap-2 flex-wrap">
                  <SecondaryButton
                    size="sm"
                    onClick={() =>
                      dispatch({
                        type: 'COLLECT_STONE',
                        stoneId: 'science-stone',
                        domainId: 'science',
                      })
                    }
                  >
                    + Stone (test)
                  </SecondaryButton>

                  <IconButton
                    icon={<RotateCcw size={14} />}
                    size="sm"
                    tooltip="Reset game state"
                    color="var(--color-error)"
                    onClick={handleResetGame}
                  />
                </div>
              </div>
            </GlassPanel>

            {/* Architecture panel */}
            <GlassPanel accentColor="var(--color-secondary)" padding="lg" animate>
              <div className="flex flex-col gap-4">
                <span className="text-label" style={{ color: 'var(--color-secondary)' }}>
                  ARCHITECTURE FOUNDATION
                </span>

                <div className="flex flex-col gap-2">
                  {[
                    ['GameStateContext', 'useReducer + localStorage sync'],
                    ['SceneTransition',  'AnimatePresence scene swap'],
                    ['FuturisticBg',     '35-particle atmospheric env'],
                    ['Animation Library','Framer Motion variants'],
                    ['Design Tokens',    'CSS custom properties'],
                  ].map(([name, desc]) => (
                    <div
                      key={name}
                      className="flex items-start gap-3"
                      style={{
                        padding: '8px 12px',
                        background: 'var(--color-surface)',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border-subtle)',
                      }}
                    >
                      <span
                        className="text-label shrink-0 mt-0.5"
                        style={{ color: 'var(--color-secondary)', minWidth: '130px' }}
                      >
                        {name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          {/* ---- SCENE REGISTRY ---- */}
          <motion.div variants={staggerChild}>
            <GlassPanel accentColor="var(--color-accent)" padding="lg">
              <div className="flex flex-col gap-4">
                <span className="text-label" style={{ color: 'var(--color-accent)' }}>
                  SCENE REGISTRY — Future Phases
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { scene: 'FOUNDATION',         phase: 1,  active: true  },
                    { scene: 'INTRO',              phase: 2,  active: true  },
                    { scene: 'TIME_PORTAL',        phase: 3,  active: true  },
                    { scene: 'FUTURE_VISION',      phase: 3,  active: true  },
                    { scene: 'TESSERACT',          phase: 3,  active: true  },
                    { scene: 'TESSERACT_ACTIVATION', phase: 4, active: true },
                    { scene: 'GATEWAY_OPENING',    phase: 4,  active: true  },
                    { scene: 'GATEWAY_TRAVEL',     phase: 4,  active: true  },
                    { scene: 'NEW_WORLD_ARRIVAL',  phase: 4,  active: true  },
                    { scene: 'MAIN_INTERFACE',     phase: 5,  active: false },
                    { scene: 'SCIENCE_WORLD',      phase: 6,  active: false },
                    { scene: 'TECHNOLOGY_WORLD',   phase: 6,  active: false },
                    { scene: 'ENGINEERING_WORLD',  phase: 6,  active: false },
                    { scene: 'MATHEMATICS_WORLD',  phase: 6,  active: false },
                    { scene: 'LEARNING_PATH',      phase: 6,  active: false },
                    { scene: 'STONE_REWARD',       phase: 6,  active: false },
                    { scene: 'FINAL_PATH',         phase: 6,  active: false },
                    { scene: 'HERO_TRANSFORMATION',phase: 6,  active: false },
                    { scene: 'ENDING',             phase: 6,  active: false },
                  ].map(({ scene, phase, active }) => (
                    <div
                      key={scene}
                      className="text-label px-3 py-1.5 rounded-full"
                      style={{
                        background: active
                          ? 'rgba(0,255,204,0.12)'
                          : 'var(--color-surface)',
                        border: `1px solid ${active ? 'rgba(0,255,204,0.4)' : 'var(--color-border-subtle)'}`,
                        color: active
                          ? 'var(--color-accent)'
                          : 'var(--color-text-muted)',
                        letterSpacing: '0.08em',
                        fontSize: '0.65rem',
                      }}
                    >
                      {scene}
                      <span
                        style={{
                          marginLeft: '6px',
                          opacity: 0.5,
                          fontWeight: 400,
                        }}
                      >
                        P{phase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          {/* ---- FOOTER ---- */}
          <motion.div
            variants={staggerChild}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <span className="text-status">
              STEM ADVENTURE · Phase 1 Foundation · {new Date().getFullYear()}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-status">React + TypeScript + Vite + Tailwind + Framer Motion</span>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};
