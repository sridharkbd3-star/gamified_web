// ============================================================
// S.H.I.E.L.D. Platform — Secure Access (Login Screen)
// Dual Role (STUDENT | TEACHER) Spatial UI Login Page
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ArrowLeft,
  User as UserIcon,
  UserCheck,
  Key,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Zap,
  Radio,
} from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { INITIAL_GAME_STATE } from '../context/GameStateContext';
import { saveUserGameState, saveSessionEmail } from '../utils/gameStorage';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { staggerContainer, staggerChild } from '../animations/variants';
import type { UserRole, DomainId, StoneId } from '../types';

export const SignInScreen: React.FC = () => {
  const { navigateTo, dispatch } = useGameState();
  const { t } = useTranslation();

  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  // Execute login sequence and transition according to role
  const triggerSuccessfulLogin = (inputName: string, role: UserRole = activeRole) => {
    const cleanName = inputName.trim() || (role === 'teacher' ? 'Dr. Agent Sterling' : 'Cadet Explorer');
    setLoginSuccess(cleanName);
    setIsSubmitting(true);

    setTimeout(() => {
      const emailDomain = role === 'teacher' ? 'shield-faculty.gov' : 'shield.gov';
      const email = `${cleanName.toLowerCase().replace(/\s+/g, '.')}@${emailDomain}`;

      const newProgressState = role === 'teacher' ? {
        ...INITIAL_GAME_STATE,
        currentUserEmail: email,
        userRole: 'teacher' as const,
        currentScene: 'TEACHER_DASHBOARD' as const,
        hasSeenIntroStory: true,
        player: {
          ...INITIAL_GAME_STATE.player,
          name: cleanName,
          level: 99,
          overallProgress: 100,
          completedDomains: ['science', 'technology', 'engineering', 'mathematics'] as DomainId[],
          collectedStones: ['science-stone', 'technology-stone', 'engineering-stone', 'mathematics-stone'] as StoneId[],
        },
      } : {
        ...INITIAL_GAME_STATE,
        currentUserEmail: email,
        userRole: 'student' as const,
        currentScene: 'INTRO' as const,
        hasSeenIntroStory: false,
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
        role,
        progressState: newProgressState,
      });

      if (role === 'teacher') {
        navigateTo('TEACHER_DASHBOARD');
      } else {
        navigateTo('INTRO');
      }
    }, 1300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const trimmedName = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedName || !trimmedPass) {
      setValidationError(
        activeRole === 'teacher'
          ? 'TEACHER ID & PASSWORD REQUIRED — ENTER CREDENTIALS'
          : 'STUDENT ID REQUIRED — ENTER YOUR ACCESS CREDENTIALS'
      );
      return;
    }

    triggerSuccessfulLogin(trimmedName);
  };

  const handleDemoMode = () => {
    setValidationError('');
    if (activeRole === 'teacher') {
      triggerSuccessfulLogin('PROFESSOR XAVIER', 'teacher');
    } else {
      triggerSuccessfulLogin('AIDEN', 'student');
    }
  };

  const handleBackToLanding = () => {
    navigateTo('LANDING');
  };

  return (
    <div
      className="relative w-full min-h-screen min-h-[100dvh] h-full flex flex-col items-center justify-between overflow-x-hidden overflow-y-auto text-slate-200 select-none bg-[#030308]"
      style={{
        background: activeRole === 'teacher'
          ? 'radial-gradient(circle at 50% 45%, #0f0d2c 0%, #050516 60%, #020206 100%)'
          : 'radial-gradient(circle at 50% 45%, #0d1232 0%, #050614 60%, #020206 100%)',
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
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full blur-[150px] pointer-events-none animate-pulse ${
          activeRole === 'teacher' ? 'bg-purple-600/15' : 'bg-cyan-500/10'
        }`}
        style={{ animationDuration: '6s' }}
      />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      {/* Floating Spatial Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${activeRole === 'teacher' ? 'bg-purple-300' : 'bg-cyan-300'}`}
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              boxShadow: activeRole === 'teacher' ? '0 0 8px rgba(123, 47, 255, 0.8)' : '0 0 8px rgba(0, 212, 255, 0.8)',
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
              {activeRole === 'teacher' ? 'TEACHER COMMAND PORTAL' : 'SECURE PLAYER ACCESS'}
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
          MAIN HERO LOGIN CARD (CENTERED LAYOUT WITH DUAL ROLE SELECTOR)
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
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center bg-[#0d0d1a] ${
                activeRole === 'teacher'
                  ? 'border-purple-500/50 shadow-[0_0_25px_rgba(123,47,255,0.35)]'
                  : 'border-[#c59b27]/40 shadow-[0_0_25px_rgba(197,155,39,0.25)]'
              }`}
            >
              <Shield size={30} className={activeRole === 'teacher' ? 'text-purple-400' : 'text-[#c59b27]'} />
            </div>

            <h1
              className="font-display text-3xl sm:text-4xl tracking-[0.22em] font-extrabold uppercase text-white leading-none mt-1"
              style={{
                textShadow: activeRole === 'teacher' ? '0 0 30px rgba(123, 47, 255, 0.45)' : '0 0 30px rgba(0, 180, 255, 0.35)',
              }}
            >
              S.H.I.E.L.D.
            </h1>

            <p className={`font-display text-xs sm:text-sm font-bold tracking-[0.2em] uppercase ${activeRole === 'teacher' ? 'text-purple-400' : 'text-[#c59b27]'}`}>
              {activeRole === 'teacher' ? 'TEACHER ACCESS COMMAND PORTAL' : 'SECURE PLAYER ACCESS'}
            </p>
          </motion.div>

          {/* Main Futuristic Login Card */}
          <motion.div
            variants={staggerChild}
            className={`relative w-full rounded-2xl border bg-[#090c22]/85 backdrop-blur-xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5 overflow-hidden transition-all duration-300 ${
              activeRole === 'teacher'
                ? 'border-purple-500/35 shadow-[0_0_40px_rgba(123,47,255,0.2)]'
                : 'border-cyan-500/30 shadow-[0_0_40px_rgba(0,180,255,0.15)]'
            }`}
          >
            {/* Card Top Border Light Beam */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-80 ${
              activeRole === 'teacher' ? 'text-purple-400' : 'text-cyan-400'
            }`} />

            {/* Futuristic Corner Accents */}
            <div className={`absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 ${activeRole === 'teacher' ? 'border-purple-400' : 'border-cyan-400'}`} />
            <div className={`absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 ${activeRole === 'teacher' ? 'border-purple-400' : 'border-cyan-400'}`} />
            <div className={`absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 ${activeRole === 'teacher' ? 'border-purple-400' : 'border-cyan-400'}`} />
            <div className={`absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 ${activeRole === 'teacher' ? 'border-purple-400' : 'border-cyan-400'}`} />

            {/* Login Success HUD Overlay */}
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
                      {activeRole === 'teacher' ? 'INSTRUCTOR' : 'PLAYER'}: {loginSuccess}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-[10px] font-display text-cyan-400 tracking-widest animate-pulse uppercase">
                    <Radio size={11} />
                    {activeRole === 'teacher' ? 'INITIALIZING COMMAND CENTER...' : 'INITIALIZING JOURNEY...'}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ============================================================
                ROLE SELECTOR SWITCH: [ STUDENT ]   [ TEACHER ]
                ============================================================ */}
            <div className="flex items-center justify-center p-1 rounded-xl bg-[#040614] border border-cyan-500/25 w-full">
              <button
                type="button"
                onClick={() => {
                  setActiveRole('student');
                  setValidationError('');
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-display font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeRole === 'student'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,180,255,0.25)]'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                <UserIcon size={14} />
                <span>{t('auth.student', 'STUDENT')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveRole('teacher');
                  setValidationError('');
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-display font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeRole === 'teacher'
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-400/50 shadow-[0_0_15px_rgba(123,47,255,0.3)]'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                <UserCheck size={14} />
                <span>{t('auth.teacher', 'TEACHER')}</span>
              </button>
            </div>

            {/* Card Section Header */}
            <div className="flex flex-col items-center gap-1">
              <h2 className="font-display text-base sm:text-lg tracking-[0.25em] font-extrabold text-white uppercase">
                {activeRole === 'teacher' ? t('auth.teacherLogin', 'TEACHER LOGIN') : t('auth.studentLogin', 'STUDENT LOGIN')}
              </h2>
              <span className="text-[9px] font-display tracking-[0.18em] text-slate-400 uppercase font-semibold">
                {activeRole === 'teacher'
                  ? 'ENTER CREDENTIALS TO ACCESS TEACHER PORTAL'
                  : t('auth.enterYourName', 'ENTER YOUR NAME')}
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
              {/* Field 1: USERNAME / EMAIL */}
              <div className="flex flex-col gap-1.5">
                <label className={`font-display text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-between ${
                  activeRole === 'teacher' ? 'text-purple-300' : 'text-cyan-400'
                }`}>
                  <span>{activeRole === 'teacher' ? 'TEACHER ID / EMAIL' : t('auth.usernameLabel', 'STUDENT ID / EMAIL')}</span>
                  <span className="text-[8px] text-slate-500 font-normal">REQ *</span>
                </label>
                <div className="relative">
                  {activeRole === 'teacher' ? (
                    <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                  ) : (
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                  )}
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder={activeRole === 'teacher' ? 'e.g. PROFESSOR XAVIER' : 'e.g. AIDEN'}
                    aria-label={activeRole === 'teacher' ? 'TEACHER ID / EMAIL' : t('auth.usernameLabel', 'STUDENT ID / EMAIL')}
                    className={`w-full pl-10 pr-4 py-3 text-xs font-body border rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none transition-all ${
                      activeRole === 'teacher'
                        ? 'border-purple-500/30 focus:border-purple-400 focus:shadow-[0_0_12px_rgba(123,47,255,0.3)]'
                        : 'border-cyan-500/25 focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,180,255,0.25)]'
                    }`}
                  />
                </div>
              </div>

              {/* Field 2: PASSWORD */}
              <div className="flex flex-col gap-1.5">
                <label className={`font-display text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-between ${
                  activeRole === 'teacher' ? 'text-purple-300' : 'text-cyan-400'
                }`}>
                  <span>{t('auth.passwordLabel', 'PASSWORD')}</span>
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
                    className={`w-full pl-10 pr-4 py-3 text-xs font-body border rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none transition-all ${
                      activeRole === 'teacher'
                        ? 'border-purple-500/30 focus:border-purple-400 focus:shadow-[0_0_12px_rgba(123,47,255,0.3)]'
                        : 'border-cyan-500/25 focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,180,255,0.25)]'
                    }`}
                  />
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group w-full mt-2 py-3.5 rounded-xl text-xs sm:text-sm font-display tracking-[0.2em] uppercase text-white font-bold transition-all duration-300 shadow-[0_0_25px_rgba(197,155,39,0.35)] hover:shadow-[0_0_35px_rgba(197,155,39,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 overflow-hidden"
                style={{
                  background: activeRole === 'teacher'
                    ? 'linear-gradient(90deg, #6b21a8, #7b2fff, #00e5ff)'
                    : 'linear-gradient(90deg, #9e3855, #c59b27)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">
                  {t('auth.continue', t('auth.login', 'LOG IN →'))}
                </span>
              </button>

              {/* Secondary Option */}
              <div className="flex justify-center items-center pt-1 text-[10px] font-display text-slate-400">
                <span>NEW {activeRole === 'teacher' ? 'FACULTY' : 'PLAYER'}?</span>
                <button
                  type="button"
                  onClick={() => navigateTo('SIGN_UP')}
                  className={`ml-1.5 font-bold tracking-wider hover:underline cursor-pointer bg-none border-none uppercase ${
                    activeRole === 'teacher' ? 'text-purple-400 hover:text-purple-300' : 'text-cyan-400 hover:text-cyan-300'
                  }`}
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

              {/* DEMO MODE */}
              <button
                type="button"
                onClick={handleDemoMode}
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl text-[10px] sm:text-xs font-display tracking-[0.2em] uppercase text-amber-300 font-bold transition-all bg-amber-950/20 hover:bg-amber-900/35 border border-amber-500/40 hover:border-amber-400 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={13} className="text-amber-400" />
                <span>DEMO MODE ({activeRole.toUpperCase()})</span>
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
