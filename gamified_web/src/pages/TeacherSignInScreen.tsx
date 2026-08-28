// ============================================================
// S.H.I.E.L.D. Platform — Teacher Access (Teacher Login Screen)
// Futuristic S.H.I.E.L.D. Universe Teacher Portal Login Page with Google OAuth
// ============================================================

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Shield,
  ArrowLeft,
  UserCheck,
  Key,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Zap,
  Radio,
  Lock,
  Activity,
  Loader2,
} from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { INITIAL_GAME_STATE } from '../context/GameStateContext';
import { saveUserGameState, saveSessionEmail } from '../utils/gameStorage';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { staggerContainer, staggerChild } from '../animations/variants';
import { authenticateWithGoogle } from '../utils/googleAuth';
import type { DomainId, StoneId } from '../types';

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#EA4335"
      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.6 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.5 8.9 5 12 5z"
    />
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
    />
    <path
      fill="#FBBC05"
      d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.3C.6 9.3 0 11.6 0 14s.6 4.7 1.6 6.7l3.7-2.9c-.6-.8-1-1.9-1-3z"
    />
    <path
      fill="#34A853"
      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.5-6.7-5.3L1.6 16C3.5 19.8 7.4 22.4 12 23z"
    />
  </svg>
);

export const TeacherSignInScreen: React.FC = () => {
  const { navigateTo, dispatch } = useGameState();

  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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

  // Execute teacher login sequence
  const triggerSuccessfulLogin = (instructorName: string, customEmail?: string) => {
    const cleanName = instructorName.trim() || 'Dr. Agent Sterling';
    setLoginSuccess(cleanName);
    setIsSubmitting(true);

    setTimeout(() => {
      const email = customEmail || `${cleanName.toLowerCase().replace(/\s+/g, '.')}@shield-faculty.gov`;

      const newProgressState = {
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
      };

      saveUserGameState(email, newProgressState);
      saveSessionEmail(email);

      dispatch({
        type: 'LOGIN_USER',
        email,
        role: 'teacher',
        progressState: newProgressState,
      });

      navigateTo('TEACHER_DASHBOARD');
    }, 1600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const trimmedId = teacherId.trim();
    const trimmedPass = password.trim();

    if (!trimmedId || !trimmedPass) {
      setValidationError('TEACHER ID AND PASSWORD REQUIRED — ENTER CREDENTIALS');
      return;
    }

    triggerSuccessfulLogin(trimmedId);
  };

  const handleGoogleLogin = async () => {
    setValidationError('');
    setIsGoogleLoading(true);

    try {
      const res = await authenticateWithGoogle('teacher');
      if (res.success && res.user) {
        triggerSuccessfulLogin(res.user.name, res.user.email);
      } else {
        setValidationError(res.message || 'TEACHER ACCESS REQUIRES AUTHORIZATION. PLEASE CONTACT THE S.H.I.E.L.D. ADMINISTRATOR.');
      }
    } catch (err) {
      console.error('[Teacher Google Auth Error]:', err);
      setValidationError('AUTHENTICATION FAILED. PLEASE TRY AGAIN.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleDemoMode = () => {
    setValidationError('');
    triggerSuccessfulLogin('PROFESSOR XAVIER');
  };

  const handleBackToEntry = () => {
    navigateTo('LANDING');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen min-h-[100dvh] h-full flex flex-col items-center justify-between overflow-x-hidden overflow-y-auto text-slate-200 select-none bg-[#030308]"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #0f0d2c 0%, #050516 60%, #020206 100%)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(123, 47, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2.5)',
          transformOrigin: 'top center',
        }}
      />

      {/* Glow Effects */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full bg-purple-600/15 blur-[150px] pointer-events-none animate-pulse"
        style={{ animationDuration: '6s' }}
      />

      {/* HEADER BAR */}
      <header className="relative z-30 w-full px-6 py-4 md:px-10 flex items-center justify-between backdrop-blur-md bg-[#030308]/40 border-b border-purple-500/20 shrink-0">
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={handleBackToEntry}>
          <div className="relative w-9 h-9 rounded-lg border border-purple-500/50 flex items-center justify-center bg-[#0d0d1a] shadow-[0_0_15px_rgba(123,47,255,0.3)]">
            <Shield size={18} className="text-purple-400" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs md:text-sm tracking-[0.25em] font-bold text-slate-100 leading-none">
              S.H.I.E.L.D.
            </span>
            <span className="text-[8px] tracking-[0.2em] text-purple-400 font-display font-bold uppercase mt-1">
              TEACHER ACCESS
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-purple-950/20 backdrop-blur-sm text-[9px] font-display tracking-widest text-cyan-300">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AUTHENTICATION GATEWAY ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5 text-amber-400/90 font-bold">
            <Zap size={10} />
            ENCRYPTION: LEVEL 5
          </span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={handleBackToEntry}
            className="px-3.5 py-1.5 rounded-lg border border-slate-800 bg-[#0d0d1a] hover:border-purple-500/40 hover:text-purple-300 text-[10px] md:text-xs font-display tracking-widest uppercase text-slate-400 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft size={12} />
            <span className="hidden sm:inline">Return</span>
          </button>
        </div>
      </header>

      {/* 3D Spatial Wireframe Background */}
      <motion.div
        style={{ x: layer1X, y: layer1Y, rotateX: spatialRotateX, rotateY: spatialRotateY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 overflow-hidden"
      >
        <div
          className="w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] rounded-full border border-purple-500/15 absolute animate-spin"
          style={{
            animationDuration: '40s',
            borderStyle: 'dashed',
            boxShadow: '0 0 50px rgba(123, 47, 255, 0.08)',
          }}
        />

        <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
          <div className="flex justify-between items-start w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-[#090c1e]/70 backdrop-blur-md text-[9px] font-display"
            >
              <Activity size={12} className="text-purple-400 animate-pulse" />
              <span className="text-purple-300 font-bold tracking-widest">FACULTY PORTAL ACTIVE</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-[#090c1e]/70 backdrop-blur-md text-[9px] font-display"
            >
              <Lock size={12} className="text-cyan-400" />
              <span className="text-cyan-300 font-bold tracking-widest">INSTRUCTOR CLEARANCE REQ</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* MAIN HERO CARD */}
      <main className="relative z-20 flex-1 w-full max-w-lg mx-auto px-4 sm:px-6 py-6 md:py-10 flex flex-col items-center justify-center text-center self-center my-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center gap-5"
        >
          <motion.div variants={staggerChild} className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-2xl border border-purple-500/50 flex items-center justify-center bg-[#0d0d1a] shadow-[0_0_25px_rgba(123,47,255,0.35)]"
            >
              <Shield size={30} className="text-purple-400" />
            </div>

            <h1
              className="font-display text-3xl sm:text-4xl tracking-[0.22em] font-extrabold uppercase text-white leading-none mt-1"
              style={{ textShadow: '0 0 30px rgba(123, 47, 255, 0.45)' }}
            >
              S.H.I.E.L.D.
            </h1>

            <p className="font-display text-xs sm:text-sm text-purple-400 font-bold tracking-[0.2em] uppercase">
              TEACHER ACCESS
            </p>
          </motion.div>

          <motion.div
            variants={staggerChild}
            className="relative w-full rounded-2xl border border-purple-500/35 bg-[#090c22]/85 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_40px_rgba(123,47,255,0.2)] flex flex-col gap-5 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-80" />

            <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-purple-400" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-purple-400" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-purple-400" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-purple-400" />

            {/* Success Overlay */}
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
                      FACULTY ACCESS GRANTED
                    </span>
                    <span className="font-display text-xs tracking-widest text-cyan-300 font-semibold uppercase">
                      INSTRUCTOR: {loginSuccess}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-[10px] font-display text-purple-300 tracking-widest animate-pulse uppercase">
                    <Radio size={11} />
                    INITIALIZING TEACHER PORTAL...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-center gap-1">
              <h2 className="font-display text-base sm:text-lg tracking-[0.25em] font-extrabold text-white uppercase">
                TEACHER LOGIN
              </h2>
              <span className="text-[9px] font-display tracking-[0.16em] text-slate-400 uppercase font-semibold">
                ENTER CREDENTIALS TO ACCESS TEACHER PORTAL
              </span>
            </div>

            {/* Validation Banner */}
            <AnimatePresence>
              {validationError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="px-3.5 py-2.5 rounded-xl border border-amber-500/40 bg-amber-950/40 text-amber-300 font-display text-[10px] tracking-wider uppercase font-semibold flex items-center justify-center gap-2 shadow-sm text-left"
                >
                  <AlertTriangle size={15} className="text-amber-400 shrink-0" />
                  <span>{validationError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left w-full">
              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] tracking-[0.2em] uppercase font-bold text-purple-300 flex items-center justify-between">
                  <span>TEACHER ID / USERNAME</span>
                  <span className="text-[8px] text-slate-500 font-normal">REQ *</span>
                </label>
                <div className="relative">
                  <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                  <input
                    type="text"
                    value={teacherId}
                    onChange={(e) => {
                      setTeacherId(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="Enter Teacher ID or Username"
                    aria-label="TEACHER ID / USERNAME"
                    className="w-full pl-10 pr-4 py-3 text-xs font-body border border-purple-500/30 rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_12px_rgba(123,47,255,0.3)] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display text-[10px] tracking-[0.2em] uppercase font-bold text-purple-300 flex items-center justify-between">
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
                    placeholder="Enter Password"
                    aria-label="PASSWORD"
                    className="w-full pl-10 pr-4 py-3 text-xs font-body border border-purple-500/30 rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_12px_rgba(123,47,255,0.3)] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isGoogleLoading}
                className="relative group w-full mt-1 py-3.5 rounded-xl text-xs sm:text-sm font-display tracking-[0.2em] uppercase text-white font-bold transition-all duration-300 shadow-[0_0_25px_rgba(123,47,255,0.35)] hover:shadow-[0_0_35px_rgba(123,47,255,0.6)] hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #6b21a8, #7b2fff, #00e5ff)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">ENTER TEACHER PORTAL →</span>
              </button>

              <div className="relative flex items-center justify-center my-1.5">
                <div className="w-full border-t border-purple-500/20" />
                <span className="absolute bg-[#090c22] px-3 text-[8px] font-display tracking-widest text-slate-500 uppercase">
                  OR
                </span>
              </div>

              {/* GOOGLE OAUTH BUTTON */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting || isGoogleLoading}
                className="w-full py-3 rounded-xl text-xs font-display font-bold tracking-[0.18em] uppercase transition-all duration-300 border border-purple-500/40 bg-[#0c0924] hover:bg-purple-900/30 text-purple-200 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(123,47,255,0.35)] flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin text-purple-400" />
                    <span>VERIFYING FACULTY AUTHORIZATION...</span>
                  </>
                ) : (
                  <>
                    <GoogleIcon />
                    <span>CONTINUE WITH GOOGLE</span>
                  </>
                )}
              </button>

              <div className="flex justify-center items-center pt-1 text-[10px] font-display text-slate-400">
                <span>NEW TEACHER?</span>
                <button
                  type="button"
                  onClick={() => navigateTo('SIGN_UP')}
                  className="ml-1.5 text-purple-400 hover:text-purple-300 font-bold tracking-wider hover:underline cursor-pointer bg-none border-none uppercase"
                >
                  CREATE TEACHER PROFILE
                </button>
              </div>

              <button
                type="button"
                onClick={handleDemoMode}
                disabled={isSubmitting || isGoogleLoading}
                className="w-full py-2.5 rounded-xl text-[10px] sm:text-xs font-display tracking-[0.2em] uppercase text-amber-300 font-bold transition-all bg-amber-950/20 hover:bg-amber-900/35 border border-amber-500/40 hover:border-amber-400 shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <Sparkles size={13} className="text-amber-400" />
                <span>DEMO MODE</span>
              </button>
            </form>
          </motion.div>

          <motion.div variants={staggerChild} className="pt-1">
            <button
              type="button"
              onClick={handleBackToEntry}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-display tracking-[0.18em] uppercase text-slate-400 hover:text-purple-300 transition-colors cursor-pointer border border-transparent hover:border-purple-500/20 bg-none"
            >
              <ArrowLeft size={13} />
              <span>RETURN TO ENTRY</span>
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-30 w-full px-6 py-3 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-purple-500/20 backdrop-blur-md bg-[#030308]/60 text-[9px] md:text-[10px] shrink-0">
        <div className="flex items-center gap-2 text-slate-400 font-display tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span>S.H.I.E.L.D. FACULTY ACCESS TERMINAL · {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 font-display tracking-widest uppercase text-[8px]">
          <span>CLEARANCE: INSTRUCTOR</span>
          <span>•</span>
          <span className="text-purple-400/90">AUTHENTICATION ACTIVE</span>
        </div>
      </footer>
    </div>
  );
};

export default TeacherSignInScreen;
