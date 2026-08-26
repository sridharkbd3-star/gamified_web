// ============================================================
// S.H.I.E.L.D. Platform — Secure Player Access (Login Screen)
// Futuristic S.H.I.E.L.D. Universe Login Page
// Inserted between Landing Page and Existing Story
// ============================================================

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Shield,
  ArrowLeft,
  User as UserIcon,
  Key,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Zap,
  Radio,
  Lock,
  Activity
} from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { INITIAL_GAME_STATE } from '../context/GameStateContext';
import { saveUserGameState, saveSessionEmail } from '../utils/gameStorage';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { staggerContainer, staggerChild } from '../animations/variants';

export const SignInScreen: React.FC = () => {
  const { navigateTo, dispatch } = useGameState();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  // Mouse Parallax for Desktop Spatial Environment
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const spatialRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const spatialRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  const layer1X = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const layer1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  const layer2X = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
  const layer2Y = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  // Execute login sequence and transition to Intro Story
  const triggerSuccessfulLogin = (playerName: string) => {
    const cleanName = playerName.trim() || 'Cadet Explorer';
    setLoginSuccess(cleanName);
    setIsSubmitting(true);

    setTimeout(() => {
      const email = `${cleanName.toLowerCase().replace(/\s+/g, '.')}@shield.gov`;

      const newProgressState = {
        ...INITIAL_GAME_STATE,
        currentUserEmail: email,
        currentScene: 'INTRO' as const,
        hasSeenIntroStory: false, // Ensures existing story starts from the beginning
        player: {
          ...INITIAL_GAME_STATE.player,
          name: cleanName,
          level: 1,
          overallProgress: 0,
          completedDomains: [],
          collectedStones: [],
        },
      };

      saveUserGameState(email, newProgressState);
      saveSessionEmail(email);

      dispatch({
        type: 'LOGIN_USER',
        email,
        progressState: newProgressState,
      });

      navigateTo('INTRO');
    }, 1300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const trimmedName = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedName || !trimmedPass) {
      setValidationError('PLAYER ID REQUIRED — ENTER YOUR ACCESS CREDENTIALS');
      return;
    }

    triggerSuccessfulLogin(trimmedName);
  };

  const handleDemoMode = () => {
    setValidationError('');
    triggerSuccessfulLogin('AIDEN');
  };

  const handleBackToLanding = () => {
    navigateTo('LANDING');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen min-h-[100dvh] h-full flex flex-col items-center justify-between overflow-x-hidden overflow-y-auto text-slate-200 select-none bg-[#030308]"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #0d1232 0%, #050614 60%, #020206 100%)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ============================================================
          LAYER 0: ATMOSPHERIC DEEP SPACE & GRID BACKGROUND
          ============================================================ */}

      {/* Perspective Grid Plane */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 180, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 180, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2.5)',
          transformOrigin: 'top center',
        }}
      />

      {/* Atmospheric Energy Glow Spots */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none animate-pulse"
        style={{ animationDuration: '6s' }}
      />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      {/* Floating Spatial Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-300"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              boxShadow: '0 0 8px rgba(0, 212, 255, 0.8)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-1 opacity-15"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* ============================================================
          HEADER BAR
          ============================================================ */}
      <header className="relative z-30 w-full px-6 py-4 md:px-10 flex items-center justify-between backdrop-blur-md bg-[#030308]/40 border-b border-cyan-500/10 shrink-0">
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={handleBackToLanding}>
          <div className="relative w-9 h-9 rounded-lg border border-[#c59b27]/40 flex items-center justify-center bg-[#0d0d1a] shadow-[0_0_15px_rgba(197,155,39,0.2)]">
            <Shield size={18} className="text-[#c59b27]" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs md:text-sm tracking-[0.25em] font-bold text-slate-100 leading-none">
              S.H.I.E.L.D.
            </span>
            <span className="text-[8px] tracking-[0.2em] text-cyan-400/80 uppercase mt-1 font-display">
              SECURE PLAYER ACCESS
            </span>
          </div>
        </div>

        {/* Floating Header Status Bar */}
        <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-sm text-[9px] font-display tracking-widest text-cyan-300">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AUTHENTICATION GATEWAY ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5 text-amber-400/90">
            <Zap size={10} />
            ENCRYPTION: LEVEL 5
          </span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={handleBackToLanding}
            className="px-3.5 py-1.5 rounded-lg border border-slate-800 bg-[#0d0d1a] hover:border-cyan-500/40 hover:text-cyan-300 text-[10px] md:text-xs font-display tracking-widest uppercase text-slate-400 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft size={12} />
            <span className="hidden sm:inline">Return</span>
          </button>
        </div>
      </header>

      {/* ============================================================
          SURROUNDING SPATIAL 3D GRAPHICS (Tesseract Visual Preview)
          ============================================================ */}
      <motion.div
        style={{ x: layer1X, y: layer1Y, rotateX: spatialRotateX, rotateY: spatialRotateY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 overflow-hidden"
      >
        {/* Outer Rotating Holographic Ring */}
        <div
          className="w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] md:w-[680px] md:h-[680px] lg:w-[780px] lg:h-[780px] rounded-full border border-cyan-500/15 absolute animate-spin"
          style={{
            animationDuration: '50s',
            borderStyle: 'dashed',
            boxShadow: '0 0 50px rgba(0, 180, 255, 0.05)',
          }}
        />

        {/* Middle Rotating Gold Ring */}
        <div
          className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] rounded-full border border-[#c59b27]/20 absolute animate-spin"
          style={{
            animationDuration: '35s',
            animationDirection: 'reverse',
          }}
        />

        {/* Futuristic SVG Tesseract Wireframe Visualizer */}
        <motion.div
          style={{ x: layer2X, y: layer2Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35 md:opacity-45"
        >
          <svg
            viewBox="0 0 400 400"
            className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] filter drop-shadow-[0_0_30px_rgba(0,180,255,0.25)]"
          >
            <defs>
              <linearGradient id="loginTesseractGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00b4ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#7b2fff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#c59b27" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="loginTesseractGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c59b27" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Tesseract Outer Polygon Frame */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '200px 200px' }}
            >
              <polygon
                points="200,30 350,115 350,285 200,370 50,285 50,115"
                fill="none"
                stroke="url(#loginTesseractGrad1)"
                strokeWidth="1.5"
                strokeDasharray="8 4"
              />
              <circle cx="200" cy="30" r="4" fill="#00b4ff" />
              <circle cx="350" cy="115" r="4" fill="#7b2fff" />
              <circle cx="350" cy="285" r="4" fill="#c59b27" />
              <circle cx="200" cy="370" r="4" fill="#00ffcc" />
              <circle cx="50" cy="285" r="4" fill="#7b2fff" />
              <circle cx="50" cy="115" r="4" fill="#00b4ff" />
            </motion.g>

            {/* Inner Hypercube Wireframe */}
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '200px 200px' }}
            >
              <polygon
                points="200,95 285,145 285,255 200,305 115,255 115,145"
                fill="rgba(13, 13, 26, 0.3)"
                stroke="url(#loginTesseractGrad2)"
                strokeWidth="1.5"
              />
              <line x1="200" y1="30" x2="200" y2="95" stroke="rgba(0, 180, 255, 0.3)" strokeWidth="1" />
              <line x1="350" y1="115" x2="285" y2="145" stroke="rgba(123, 47, 255, 0.3)" strokeWidth="1" />
              <line x1="350" y1="285" x2="285" y2="255" stroke="rgba(197, 155, 39, 0.3)" strokeWidth="1" />
              <line x1="200" y1="370" x2="200" y2="305" stroke="rgba(0, 255, 204, 0.3)" strokeWidth="1" />
              <line x1="50" y1="285" x2="115" y2="255" stroke="rgba(123, 47, 255, 0.3)" strokeWidth="1" />
              <line x1="50" y1="115" x2="115" y2="145" stroke="rgba(0, 180, 255, 0.3)" strokeWidth="1" />
            </motion.g>
          </svg>
        </motion.div>

        {/* Floating Corner HUD elements */}
        <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
          <div className="flex justify-between items-start w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-[#090c1e]/70 backdrop-blur-md text-[9px] font-display"
            >
              <Activity size={12} className="text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-bold tracking-widest">PORTAL HANDSHAKE ACTIVE</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-[#090c1e]/70 backdrop-blur-md text-[9px] font-display"
            >
              <Lock size={12} className="text-amber-400" />
              <span className="text-amber-400 font-bold tracking-widest">SHIELD CLEARANCE REQ</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          MAIN HERO LOGIN CARD (CENTERED LAYOUT)
          ============================================================ */}
      <main className="relative z-20 flex-1 w-full max-w-lg mx-auto px-4 sm:px-6 py-6 md:py-10 flex flex-col items-center justify-center text-center self-center my-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center gap-5"
        >
          {/* Top Title & Subtitle */}
          <motion.div variants={staggerChild} className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-2xl border border-[#c59b27]/40 flex items-center justify-center bg-[#0d0d1a] shadow-[0_0_25px_rgba(197,155,39,0.25)]"
            >
              <Shield size={30} className="text-[#c59b27]" />
            </div>

            <h1
              className="font-display text-3xl sm:text-4xl tracking-[0.22em] font-extrabold uppercase text-white leading-none mt-1"
              style={{
                textShadow: '0 0 30px rgba(0, 180, 255, 0.35)',
              }}
            >
              S.H.I.E.L.D.
            </h1>

            <p className="font-display text-xs sm:text-sm text-[#c59b27] font-bold tracking-[0.2em] uppercase">
              SECURE PLAYER ACCESS
            </p>
          </motion.div>

          {/* Main Futuristic Login Card */}
          <motion.div
            variants={staggerChild}
            className="relative w-full rounded-2xl border border-cyan-500/30 bg-[#090c22]/85 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,180,255,0.15)] flex flex-col gap-5 overflow-hidden"
          >
            {/* Card Top Border Light Beam */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

            {/* Futuristic Corner Accents */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

            {/* Login Success HUD Confirmation Overlay */}
            <AnimatePresence>
              {loginSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-[#060817]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 gap-3 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-full border-2 border-emerald-400 bg-emerald-950/40 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.4)]"
                  >
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </motion.div>

                  <div className="flex flex-col gap-1">
                    <span className="font-display text-base font-extrabold tracking-[0.25em] text-emerald-400 uppercase">
                      ACCESS GRANTED
                    </span>
                    <span className="font-display text-xs tracking-widest text-cyan-300 font-semibold uppercase">
                      PLAYER IDENTIFIED: {loginSuccess}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-[10px] font-display text-cyan-400 tracking-widest animate-pulse uppercase">
                    <Radio size={11} />
                    INITIALIZING JOURNEY...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Card Section Header */}
            <div className="flex flex-col items-center gap-1">
              <h2 className="font-display text-base sm:text-lg tracking-[0.25em] font-extrabold text-white uppercase">
                PLAYER LOGIN
              </h2>
              <span className="text-[9px] font-display tracking-[0.18em] text-slate-400 uppercase">
                ENTER CREDENTIALS TO START MISSION
              </span>
            </div>

            {/* HUD Inline Validation Message */}
            <AnimatePresence>
              {validationError && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-amber-500/40 bg-amber-950/30 text-amber-300 text-[10px] font-display tracking-wider uppercase text-left shadow-sm"
                >
                  <AlertTriangle size={15} className="text-amber-400 shrink-0" />
                  <span>{validationError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left w-full">
              {/* Field 1: PLAYER NAME / USERNAME */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] tracking-[0.2em] uppercase font-bold text-cyan-400 flex items-center justify-between">
                  <span>PLAYER NAME / USERNAME</span>
                  <span className="text-[8px] text-slate-500 font-normal">REQ *</span>
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="e.g. AIDEN"
                    aria-label="PLAYER NAME / USERNAME"
                    className="w-full pl-10 pr-4 py-3 text-xs font-body border border-cyan-500/25 rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,180,255,0.25)] transition-all"
                  />
                </div>
              </div>

              {/* Field 2: PASSWORD */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] tracking-[0.2em] uppercase font-bold text-cyan-400 flex items-center justify-between">
                  <span>PASSWORD</span>
                  <span className="text-[8px] text-slate-500 font-normal">REQ *</span>
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="••••••••••••"
                    aria-label="PASSWORD"
                    className="w-full pl-10 pr-4 py-3 text-xs font-body border border-cyan-500/25 rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,180,255,0.25)] transition-all"
                  />
                </div>
              </div>

              {/* Primary Action Button: ENTER THE JOURNEY → */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group w-full mt-2 py-3.5 rounded-xl text-xs sm:text-sm font-display tracking-[0.2em] uppercase text-white font-bold transition-all duration-300 shadow-[0_0_25px_rgba(197,155,39,0.35)] hover:shadow-[0_0_35px_rgba(197,155,39,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #9e3855, #c59b27)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">ENTER THE JOURNEY →</span>
              </button>

              {/* Secondary Option: NEW PLAYER? CREATE PROFILE */}
              <div className="flex justify-center items-center pt-1 text-[10px] font-display text-slate-400">
                <span>NEW PLAYER?</span>
                <button
                  type="button"
                  onClick={() => navigateTo('SIGN_UP')}
                  className="ml-1.5 text-cyan-400 hover:text-cyan-300 font-bold tracking-wider hover:underline cursor-pointer bg-none border-none uppercase"
                >
                  CREATE PROFILE
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="w-full border-t border-cyan-500/15" />
                <span className="absolute bg-[#090c22] px-3 text-[8px] font-display tracking-widest text-slate-500 uppercase">
                  OR
                </span>
              </div>

              {/* DEMO MODE (For Hackathon Demonstration) */}
              <button
                type="button"
                onClick={handleDemoMode}
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl text-[10px] sm:text-xs font-display tracking-[0.2em] uppercase text-amber-300 font-bold transition-all bg-amber-950/20 hover:bg-amber-900/35 border border-amber-500/40 hover:border-amber-400 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={13} className="text-amber-400" />
                <span>DEMO MODE</span>
              </button>
            </form>
          </motion.div>

          {/* Subtle Back Button below Card */}
          <motion.div variants={staggerChild} className="pt-1">
            <button
              type="button"
              onClick={handleBackToLanding}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-display tracking-[0.18em] uppercase text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer border border-transparent hover:border-cyan-500/20 bg-none"
            >
              <ArrowLeft size={13} />
              <span>RETURN TO ENTRY</span>
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-30 w-full px-6 py-3 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-cyan-500/10 backdrop-blur-md bg-[#030308]/60 text-[9px] md:text-[10px] shrink-0">
        <div className="flex items-center gap-2 text-slate-400 font-display tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>S.H.I.E.L.D. SECURE LOGIN TERMINAL · {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 font-display tracking-widest uppercase text-[8px]">
          <span>CLEARANCE: LEVEL 5</span>
          <span>•</span>
          <span className="text-cyan-400/80">AUTHENTICATION ACTIVE</span>
        </div>
      </footer>
    </div>
  );
};
