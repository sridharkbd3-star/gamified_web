// ============================================================
// S.H.I.E.L.D. Platform — Language Selection Screen
// Futuristic Full-Screen Spatial UI Language Selector
// Supports: English (en), Tamil (ta), Hindi (hi), Malayalam (ml)
// ============================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGameState } from '../context/GameStateContext';
import { type SupportedLanguageCode } from '../i18n';
import { audioSynth } from '../utils/audio';

interface LanguageSelectionScreenProps {
  onComplete?: () => void;
}

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({ onComplete }) => {
  const { i18n } = useTranslation();
  const { navigateTo, state } = useGameState();
  
  const currentCode = (i18n.language || 'en').substring(0, 2) as SupportedLanguageCode;
  const [selectedLangCode, setSelectedLangCode] = useState<SupportedLanguageCode>(currentCode);

  const playTone = (freq: number) => {
    try {
      if (audioSynth.getMuted()) return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {}
  };

  const handleCardClick = (code: SupportedLanguageCode) => {
    setSelectedLangCode(code);
    i18n.changeLanguage(code);
    playTone(600);
  };

  const handleContinue = () => {
    playTone(800);
    i18n.changeLanguage(selectedLangCode);
    try {
      localStorage.setItem('shield_language', selectedLangCode);
    } catch (e) {
      console.warn('Unable to persist language choice:', e);
    }

    if (onComplete) {
      onComplete();
    } else if (state.currentUserEmail) {
      navigateTo('MAIN_INTERFACE');
    } else {
      navigateTo('SIGN_IN');
    }
  };

  const languageCards = [
    {
      code: 'en' as SupportedLanguageCode,
      title: 'ENGLISH',
      subtitle: 'English Language',
      native: 'English',
      flag: '🇬🇧',
      accentColor: '#00e5ff',
      bgGlow: 'rgba(0, 229, 255, 0.15)',
    },
    {
      code: 'ta' as SupportedLanguageCode,
      title: 'TAMIL',
      subtitle: 'தமிழ் மொழி',
      native: 'தமிழ்',
      flag: '🇮🇳',
      accentColor: '#ff9500',
      bgGlow: 'rgba(255, 149, 0, 0.15)',
    },
    {
      code: 'hi' as SupportedLanguageCode,
      title: 'HINDI',
      subtitle: 'हिन्दी भाषा',
      native: 'हिन्दी',
      flag: '🇮🇳',
      accentColor: '#00ff88',
      bgGlow: 'rgba(0, 255, 136, 0.15)',
    },
    {
      code: 'ml' as SupportedLanguageCode,
      title: 'MALAYALAM',
      subtitle: 'മലയാളം ഭാഷ',
      native: 'മലയാളം',
      flag: '🇮🇳',
      accentColor: '#b026ff',
      bgGlow: 'rgba(176, 38, 255, 0.15)',
    },
  ];

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-between p-6 overflow-x-hidden text-slate-100 select-none bg-[#030308]"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #0c102b 0%, #040514 60%, #010206 100%)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Background Spatial Grid & Particles */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between py-4 border-b border-cyan-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-[#c59b27]/40 flex items-center justify-center bg-[#0d0d1a] shadow-[0_0_15px_rgba(197,155,39,0.25)]">
            <Shield size={20} className="text-[#c59b27]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm tracking-[0.25em] font-bold text-slate-100 uppercase">S.H.I.E.L.D. STEM HERO</span>
            <span className="text-[9px] tracking-[0.2em] text-cyan-400 uppercase">LANGUAGE CONSOLE // MULTILINGUAL Core</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-display tracking-widest text-cyan-300">
          <Globe size={15} className="animate-pulse text-cyan-400" />
          <span className="hidden sm:inline">SYSTEM LANGUAGE</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto my-auto py-8 flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-display tracking-[0.2em] uppercase font-bold shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            SELECT COMMUNICATION PROTOCOL
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-slate-100 uppercase mt-2">
            CHOOSE YOUR LANGUAGE
          </h1>
          <p className="font-body text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
            Choose the language for your STEM adventure. Your complete Mathematics curriculum will be presented in your chosen language.
          </p>
        </motion.div>

        {/* Large Language Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl px-2">
          {languageCards.map((card) => {
            const isSelected = selectedLangCode === card.code;
            return (
              <motion.button
                key={card.code}
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(card.code)}
                className={`relative group p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-between backdrop-blur-md ${
                  isSelected
                    ? 'bg-[#0a1226]/90 border-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.3)] ring-2 ring-cyan-400/50'
                    : 'bg-[#070b18]/70 border-slate-800/80 hover:border-slate-600 hover:bg-[#0c1328]/80 shadow-lg'
                }`}
              >
                {/* Background Glow on Selection */}
                {isSelected && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ background: card.bgGlow }}
                  />
                )}

                <div className="flex items-center gap-5 relative z-10">
                  <div className="text-4xl sm:text-5xl filter drop-shadow-md flex items-center justify-center w-14 h-14 rounded-xl bg-slate-900/60 border border-slate-800">
                    {card.flag}
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-slate-100 uppercase">
                      {card.native}
                    </span>
                    <span className="font-display text-xs text-slate-400 tracking-widest uppercase mt-0.5">
                      {card.title}
                    </span>
                  </div>
                </div>

                {/* Selection Checkmark Badge */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 relative z-10 ${
                    isSelected
                      ? 'bg-cyan-500 border-cyan-300 text-slate-950 shadow-[0_0_12px_rgba(0,229,255,0.6)]'
                      : 'bg-slate-900/80 border-slate-700 text-slate-600 group-hover:border-slate-500'
                  }`}
                >
                  <Check size={18} className={isSelected ? 'stroke-[3]' : ''} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm mt-4"
        >
          <button
            onClick={handleContinue}
            className="w-full py-4 px-8 rounded-xl font-display text-sm font-bold tracking-[0.2em] uppercase text-slate-950 transition-all duration-300 shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.65)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(90deg, #00e5ff, #00ff88)',
            }}
          >
            <span>CONTINUE</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto text-center py-3 border-t border-cyan-500/10 text-[10px] font-display text-slate-500 tracking-widest uppercase">
        S.H.I.E.L.D. MULTILINGUAL SYLLABUS ENGINE // ENGLISH · தமிழ் · हिन्दी · മലയാളം
      </footer>
    </div>
  );
};
