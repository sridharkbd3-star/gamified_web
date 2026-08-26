// ============================================================
// S.H.I.E.L.D. Platform — Sign Up Screen
// Prototype User Authentication — Sign Up (Two-Column Responsive Layout)
// ============================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Mail, User as UserIcon, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { INITIAL_GAME_STATE } from '../context/GameStateContext';
import { getStoredUsers, saveStoredUsers, hashPassword, saveUserGameState, saveSessionEmail } from '../utils/gameStorage';
import { CharacterReveal } from '../components/story/CharacterReveal';

import { LanguageSelector } from '../components/ui/LanguageSelector';

export const SignUpScreen: React.FC = () => {
  const { navigateTo, dispatch } = useGameState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError('Please populate all security fields.');
      return;
    }

    if (password.length < 6) {
      setError('Security passcode must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Cryptographic clearance mismatch. Passcodes do not match.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const users = getStoredUsers();
        
        // Duplicate check
        const exists = users.some((u) => u.email.toLowerCase() === trimmedEmail.toLowerCase());
        if (exists) {
          setError('Agent ID already exists in S.H.I.E.L.D. database. Please Sign In.');
          setIsSubmitting(false);
          return;
        }

        // Add user
        const newUser = {
          email: trimmedEmail,
          name: trimmedName,
          passwordHash: hashPassword(password),
        };
        saveStoredUsers([...users, newUser]);

        // Initialize progress state
        const newProgress = {
          ...INITIAL_GAME_STATE,
          player: {
            ...INITIAL_GAME_STATE.player,
            name: trimmedName,
            overallProgress: 0,
            completedDomains: [],
            collectedStones: [],
            level: 1,
          },
          currentUserEmail: trimmedEmail,
          currentScene: 'INTRO' as const,
          hasSeenIntroStory: false,
        };

        // Persist progress and session
        saveUserGameState(trimmedEmail, newProgress);
        saveSessionEmail(trimmedEmail);

        // Update state in context
        dispatch({
          type: 'LOGIN_USER',
          email: trimmedEmail,
          progressState: newProgress,
        });

        // Redirect to Intro
        navigateTo('INTRO');
      } catch (err) {
        setError('Core terminal account registration failed.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full flex items-stretch overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      
      {/* Background Star Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #05050a 0%, #0d0d1e 100%)',
          zIndex: 1,
        }}
      />

      {/* Main Responsive Grid Layout Container */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-stretch min-h-screen">
        
        {/* Left Column: Morales Character Presentation */}
        <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-between items-center p-8 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/40 min-h-[300px] md:min-h-0 select-none">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2.5 opacity-70">
              <Shield size={16} className="text-cyan-400" />
              <span className="font-display text-[9px] tracking-[0.2em] font-bold text-slate-400">Morales Enlistment Node</span>
            </div>
            <LanguageSelector />
          </div>

          <div className="flex-1 w-full relative flex items-end justify-center pb-12">
            <div className="relative w-full max-w-[280px] h-[340px] md:h-[400px]">
              <CharacterReveal phase="revealed" />
            </div>
          </div>

          <div className="w-full text-center">
            <span className="font-display text-[9px] tracking-widest text-slate-500 uppercase">
              Agent Identity Authorization Pending
            </span>
          </div>
        </div>

        {/* Right Column: Secure Access Panel Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[420px] flex flex-col gap-5 bg-[var(--glass-bg)] p-8 rounded-2xl border border-[var(--color-border)] shadow-2xl"
            style={{
              boxShadow: 'var(--shadow-panel)'
            }}
          >
            {/* Header / Branding */}
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full border border-cyan-500/20 flex items-center justify-center bg-cyan-500/5 drop-shadow-[0_0_12px_rgba(0,180,255,0.06)]">
                <Shield size={24} className="text-cyan-400" />
              </div>
              <h2 className="font-display text-base uppercase tracking-[0.25em] font-bold text-white mt-1">Agent Enlistment</h2>
              <p className="font-body text-xs text-slate-400">Register a new secure terminal to begin your STEM journey.</p>
            </div>

            {/* Error Notification */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-3 p-3 rounded border border-red-500/20 bg-red-500/5 text-red-400 font-body text-xs leading-normal"
              >
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="font-display text-[10px] uppercase tracking-widest text-cyan-400">Agent Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Morales Mitchell"
                    className="w-full pl-9 pr-4 py-2 text-xs font-body border border-slate-800 rounded bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_8px_rgba(0,180,255,0.25)] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-display text-[10px] uppercase tracking-widest text-cyan-400">Terminal Identity (Email)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent.name@shield.gov"
                    className="w-full pl-9 pr-4 py-2 text-xs font-body border border-slate-800 rounded bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_8px_rgba(0,180,255,0.25)] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-display text-[10px] uppercase tracking-widest text-cyan-400">Security Passcode</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2 text-xs font-body border border-slate-800 rounded bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_8px_rgba(0,180,255,0.25)] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-display text-[10px] uppercase tracking-widest text-cyan-400">Confirm Passcode</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2 text-xs font-body border border-slate-800 rounded bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_8px_rgba(0,180,255,0.25)] transition-all"
                  />
                </div>
              </div>

              {/* Submit Button (Blue/Purple Gradient) */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg text-xs font-display tracking-widest uppercase text-white font-bold transition-all shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-4"
                style={{
                  background: 'linear-gradient(90deg, #00b4ff 0%, #7b2fff 100%)',
                  boxShadow: 'var(--glow-primary)',
                }}
              >
                {isSubmitting ? 'Enlisting Terminal...' : 'Complete Enlistment'}
              </button>
            </form>

            {/* Footer options */}
            <div className="flex flex-col items-center gap-3 mt-4 pt-4 border-t border-slate-800 text-[10px] font-display text-slate-400">
              <div>
                Already have an authorized session?{' '}
                <button 
                  onClick={() => navigateTo('SIGN_IN')} 
                  className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-all cursor-pointer bg-none border-none"
                >
                  Sign In
                </button>
              </div>
              
              <button 
                onClick={() => navigateTo('LANDING')} 
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer bg-none border-none"
              >
                <ArrowLeft size={10} />
                Return to S.H.I.E.L.D. Entrance
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
