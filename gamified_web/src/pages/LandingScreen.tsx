// ============================================================
// S.H.I.E.L.D. Platform — Landing Screen
// Futuristic Full-Screen Spatial UI Landing Page (Centered Hero Layout)
// ============================================================

import React, { useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Shield, 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  Atom, 
  Cpu, 
  Compass, 
  Binary, 
  Activity,
  Zap,
  Globe,
  Radio,
  Lock,
  Terminal
} from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { staggerContainer, staggerChild } from '../animations/variants';

export const LandingScreen: React.FC = () => {
  const { navigateTo, dispatch } = useGameState();
  const { t } = useTranslation();
  const [isMuted, setIsMuted] = useState(false);

  // Mouse Parallax for Desktop Background Layers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms for surrounding spatial environment
  const spatialRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const spatialRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  
  const layer1X = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const layer1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  
  const layer2X = useTransform(smoothMouseX, [-0.5, 0.5], [25, -25]);
  const layer2Y = useTransform(smoothMouseY, [-0.5, 0.5], [25, -25]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Disable parallax on mobile/tablet
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleStartAdventure = () => {
    navigateTo('LANGUAGE_SELECTION');
  };

  const handleDiscoverShield = () => {
    // Generate a default demo guest account progress
    const guestEmail = 'guest@shield.gov';
    dispatch({
      type: 'LOGIN_USER',
      email: guestEmail,
      progressState: {
        currentScene: 'INTRO',
        currentDomainId: null,
        currentStageId: null,
        player: {
          name: 'Agent Guest',
          avatarId: 'default',
          level: 1,
          overallProgress: 0,
          completedDomains: [],
          collectedStones: [],
        },
        completedStageIds: [],
        dialogueProgress: {},
        isFinalPathUnlocked: false,
        isHeroTransformationComplete: false,
        isFirstMainInterfaceVisit: true,
        visitedDomains: [],
        stagePerformance: {},
        _version: 1,
        currentUserEmail: guestEmail,
        userRole: 'student',
        hasSeenIntroStory: false,
      },
    });
    navigateTo('INTRO');
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

      {/* Atmospheric Energy Glow Spots (Centered behind Hero) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none animate-pulse"
        style={{ animationDuration: '7s' }}
      />
      <div 
        className="absolute top-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none"
      />
      <div 
        className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none"
      />

      {/* Floating Spatial Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
        {[...Array(24)].map((_, i) => (
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
              y: [0, -35, 0],
              opacity: [0.2, 0.85, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Subtle Scanline Overlay */}
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
        <div className="flex items-center gap-3.5">
          <div className="relative w-9 h-9 rounded-lg border border-[#c59b27]/40 flex items-center justify-center bg-[#0d0d1a] shadow-[0_0_15px_rgba(197,155,39,0.2)]">
            <Shield size={18} className="text-[#c59b27]" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs md:text-sm tracking-[0.25em] font-bold text-slate-100 leading-none">S.H.I.E.L.D.</span>
            <span className="text-[8px] tracking-[0.2em] text-cyan-400/80 uppercase mt-1 font-display">STEM HUB // SECURE PORTAL</span>
          </div>
        </div>

        {/* Floating Header Status Bar */}
        <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-sm text-[9px] font-display tracking-widest text-cyan-300">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SYSTEM ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5 text-amber-400/90">
            <Zap size={10} />
            CORE STABLE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">LATENCY: 0.04ms</span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            title="Sound Toggle"
            className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center bg-[#0d0d1a] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer shadow-sm"
          >
            <Volume2 size={15} className={isMuted ? 'opacity-40' : 'text-cyan-400'} />
          </button>
          
          <button 
            onClick={() => navigateTo('SIGN_IN')} 
            className="px-4 py-2 rounded-lg border border-cyan-500/30 bg-cyan-950/30 hover:bg-cyan-900/40 hover:border-cyan-400 text-[10px] md:text-xs font-display tracking-widest uppercase text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,180,255,0.15)] transition-all cursor-pointer"
          >
            Start
          </button>
        </div>
      </header>

      {/* ============================================================
          SURROUNDING SPATIAL 3D GRAPHICS (Layered Behind Centered Hero)
          ============================================================ */}
      <motion.div 
        style={{ x: layer1X, y: layer1Y, rotateX: spatialRotateX, rotateY: spatialRotateY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 overflow-hidden"
      >
        {/* Outer Rotating Holographic Ring */}
        <div 
          className="w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] md:w-[700px] md:h-[700px] lg:w-[820px] lg:h-[820px] rounded-full border border-cyan-500/15 absolute animate-spin"
          style={{ 
            animationDuration: '45s',
            borderStyle: 'dashed',
            boxShadow: '0 0 50px rgba(0, 180, 255, 0.05)',
          }}
        />

        {/* Middle Rotating Gold Ring */}
        <div 
          className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[560px] md:h-[560px] lg:w-[660px] lg:h-[660px] rounded-full border border-[#c59b27]/20 absolute animate-spin"
          style={{ 
            animationDuration: '30s',
            animationDirection: 'reverse',
          }}
        />

        {/* Inner Radial Glow Matrix Ring */}
        <div className="w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px] rounded-full border border-purple-500/25 absolute bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-amber-500/5 backdrop-blur-[1px]" />

        {/* Futuristic SVG Tesseract / Spatial Hypercube Wireframe centered in background */}
        <motion.div 
          style={{ x: layer2X, y: layer2Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 md:opacity-50"
        >
          <svg 
            viewBox="0 0 400 400" 
            className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] lg:w-[640px] lg:h-[640px] filter drop-shadow-[0_0_30px_rgba(0,180,255,0.3)]"
          >
            <defs>
              <linearGradient id="shieldGradCentered1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00b4ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#7b2fff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#c59b27" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="shieldGradCentered2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c59b27" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Tesseract Outer Polygon Frame */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "200px 200px" }}
            >
              <polygon 
                points="200,30 350,115 350,285 200,370 50,285 50,115" 
                fill="none" 
                stroke="url(#shieldGradCentered1)" 
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

            {/* Tesseract Inner Rotating Cube Wireframe */}
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "200px 200px" }}
            >
              <polygon 
                points="200,95 285,145 285,255 200,305 115,255 115,145" 
                fill="rgba(13, 13, 26, 0.3)" 
                stroke="url(#shieldGradCentered2)" 
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

        {/* Floating Corner HUD Cards (Surrounding the Centered Hero) */}
        <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
          <div className="flex justify-between items-start w-full">
            {/* Top Left HUD */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-cyan-500/30 bg-[#090c1e]/70 backdrop-blur-md text-[9px] font-display shadow-lg pointer-events-auto"
            >
              <Activity size={13} className="text-cyan-400 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-cyan-400 font-bold tracking-widest">STEM CORE ONLINE</span>
                <span className="text-[7px] text-slate-400 tracking-wider">MATRIX FREQ: 4.8 GHz</span>
              </div>
            </motion.div>

            {/* Top Right HUD */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-purple-500/30 bg-[#090c1e]/70 backdrop-blur-md text-[9px] font-display shadow-lg pointer-events-auto"
            >
              <Globe size={13} className="text-purple-400" />
              <div className="flex flex-col">
                <span className="text-purple-400 font-bold tracking-widest">KNOWLEDGE NETWORK</span>
                <span className="text-[7px] text-slate-400 tracking-wider">4 DOMAINS SYNCED</span>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-between items-end w-full">
            {/* Bottom Left HUD */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-[#c59b27]/30 bg-[#090c1e]/70 backdrop-blur-md text-[9px] font-display shadow-lg pointer-events-auto"
            >
              <Lock size={13} className="text-[#c59b27]" />
              <div className="flex flex-col">
                <span className="text-[#c59b27] font-bold tracking-widest">SECURE CHANNEL</span>
                <span className="text-[7px] text-slate-400 tracking-wider">ENCRYPTION: SHIELD-V9</span>
              </div>
            </motion.div>

            {/* Bottom Right HUD */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-emerald-500/30 bg-[#090c1e]/70 backdrop-blur-md text-[9px] font-display shadow-lg pointer-events-auto"
            >
              <Terminal size={13} className="text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-emerald-400 font-bold tracking-widest">EXPLORATION READY</span>
                <span className="text-[7px] text-slate-400 tracking-wider">CLEARANCE: LEVEL 5</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          MAIN HERO CONTAINER (PERFECTLY CENTERED HORIZONTALLY & VERTICALLY)
          ============================================================ */}
      <main className="relative z-20 flex-1 w-full max-w-3xl mx-auto px-6 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center text-center self-center my-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center gap-6 w-full mx-auto"
        >
          {/* Top Security Protocol Badge */}
          <motion.div
            variants={staggerChild}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c59b27]/30 bg-[#c59b27]/10 text-[#c59b27] text-[10px] sm:text-xs font-display tracking-[0.22em] uppercase font-bold shadow-sm"
          >
            <Radio size={13} className="animate-pulse" />
            S.H.I.E.L.D. PROTOCOL VERIFIED
          </motion.div>

          {/* Centered S.H.I.E.L.D. Logo Card */}
          <motion.div
            variants={staggerChild}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#c59b27]/40 flex items-center justify-center bg-[#0d0d1a] my-1"
            style={{
              boxShadow: '0 0 35px rgba(197, 155, 39, 0.3), inset 0 2px 6px rgba(255,255,255,0.1)',
            }}
          >
            <Shield size={38} className="text-[#c59b27]" />
          </motion.div>

          {/* S.H.I.E.L.D. Main Title (Centered, Responsive & Completely Visible) */}
          <motion.h1
            variants={staggerChild}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.2em] font-extrabold uppercase text-white leading-none text-center w-full"
            style={{
              textShadow: '0 0 40px rgba(0, 180, 255, 0.35), 0 4px 20px rgba(0,0,0,0.9)',
            }}
          >
            S.H.I.E.L.D.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerChild}
            className="font-display text-xs sm:text-sm md:text-base text-[#c59b27] font-bold tracking-[0.18em] uppercase leading-relaxed max-w-2xl text-center mx-auto"
          >
            STEM HUB FOR INTERACTIVE EXPLORATION, LEARNING & DISCOVERY
          </motion.p>

          {/* Quote / Tagline Box */}
          <motion.div
            variants={staggerChild}
            className="font-display text-sm sm:text-base md:text-lg text-[#7aa8cc] italic font-semibold py-2.5 px-6 rounded-lg border-y border-[#c59b27]/30 bg-slate-900/50 backdrop-blur-md max-w-xl text-center mx-auto"
          >
            "Learn STEM. Complete missions. Shape the future."
          </motion.div>

          {/* Description Paragraph */}
          <motion.p
            variants={staggerChild}
            className="font-body text-xs sm:text-sm md:text-base text-slate-300 tracking-wide max-w-lg leading-relaxed text-center mx-auto"
          >
            A fun interactive world where Science, Technology, Engineering, and Math come alive!
          </motion.p>

          {/* Four STEM Domain Preview Chips (Centered Horizontal Group) */}
          <motion.div 
            variants={staggerChild}
            className="flex flex-wrap justify-center items-center gap-3 w-full max-w-xl pt-2 mx-auto"
          >
            {[
              { name: 'SCIENCE', code: 'SCI-01', icon: Atom, color: 'text-cyan-400', border: 'border-cyan-500/30' },
              { name: 'TECHNOLOGY', code: 'TECH-02', icon: Cpu, color: 'text-purple-400', border: 'border-purple-500/30' },
              { name: 'ENGINEERING', code: 'ENG-03', icon: Compass, color: 'text-amber-400', border: 'border-amber-500/30' },
              { name: 'MATH', code: 'MATH-04', icon: Binary, color: 'text-emerald-400', border: 'border-emerald-500/30' },
            ].map((domain) => (
              <div 
                key={domain.name}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border ${domain.border} bg-[#090c22]/80 backdrop-blur-md shadow-sm`}
              >
                <domain.icon size={15} className={domain.color} />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-display font-bold tracking-wider text-slate-100">{domain.name}</span>
                  <span className="text-[8px] font-display text-slate-500">{domain.code}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action CTA Buttons (Centered Horizontal Group) */}
          <motion.div
            variants={staggerChild}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto mx-auto"
          >
            {/* START ADVENTURE (Primary CTA) */}
            <button
              onClick={handleStartAdventure}
              className="relative group w-full sm:w-auto px-9 py-4 rounded-xl text-xs md:text-sm font-display tracking-[0.2em] uppercase text-white font-bold transition-all duration-300 shadow-[0_0_30px_rgba(197,155,39,0.4)] hover:shadow-[0_0_45px_rgba(197,155,39,0.65)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-3 overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #9e3855, #c59b27)',
              }}
            >
              {/* Button shine sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              <span className="relative z-10">{t('actions.startLearning', 'Start Adventure')}</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* DISCOVER S.H.I.E.L.D. (Secondary CTA) */}
            <button
              onClick={handleDiscoverShield}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs md:text-sm font-display tracking-[0.2em] uppercase text-slate-200 font-bold transition-all duration-300 border border-[#c59b27]/40 bg-slate-900/70 backdrop-blur-md hover:bg-[#c59b27]/15 hover:border-[#c59b27]/70 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 shadow-lg"
            >
              Discover S.H.I.E.L.D.
              <Sparkles size={15} className="text-[#c59b27]" />
            </button>
          </motion.div>
        </motion.div>
      </main>

      <footer className="relative z-30 w-full px-6 py-3.5 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-cyan-500/10 backdrop-blur-md bg-[#030308]/60 text-[9px] md:text-[10px] shrink-0">
        <div className="flex items-center gap-2 text-slate-400 font-display tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>S.H.I.E.L.D. SECURE TERMINAL · {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 font-display tracking-widest uppercase text-[8px]">
          <span>GRID // 0X8F</span>
          <span>•</span>
          <span className="text-cyan-400/80">SPATIAL HUD ONLINE</span>
          <span>•</span>
          <span>CLEARANCE: LEVEL 5</span>
        </div>
      </footer>
    </div>
  );
};



