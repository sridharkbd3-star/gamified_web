// ============================================================
// S.H.I.E.L.D. Platform — Pre-Login & Settings Language Selection Screen
// Futuristic Full-Screen Tesseract STEM Language Selector
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type SupportedLanguageCode } from '../../i18n/index.ts';
import { audioSynth } from '../../utils/audio.ts';

interface LanguageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
  isInitialSelection?: boolean;
}

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  isInitialSelection = false,
}) => {
  const { i18n } = useTranslation();
  const currentLangCode = (i18n.language || 'en').substring(0, 2) as SupportedLanguageCode;
  const [tempSelectedLang, setTempSelectedLang] = useState<SupportedLanguageCode>(currentLangCode);

  if (!isOpen) return null;

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
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {}
  };

  const handleSelect = (code: SupportedLanguageCode) => {
    setTempSelectedLang(code);
    playTone(550);
  };

  const handleConfirm = () => {
    i18n.changeLanguage(tempSelectedLang);
    playTone(700);
    if (onContinue) {
      onContinue();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl select-none overflow-y-auto"
      >
        {/* Background Glowing Grid & Ambient Lights */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00e5ff]/10 blur-[130px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-[130px]" />
        </div>

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl rounded-3xl border border-cyan-500/30 bg-[#060814]/95 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.25)] flex flex-col items-center text-center gap-6 z-10"
        >
          {/* Header Shield Emblem */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl border-2 border-cyan-400/60 bg-cyan-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              <Globe size={28} className="text-cyan-300 animate-pulse" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-widest text-white uppercase mt-2" style={{ textShadow: '0 0 20px rgba(0,229,255,0.5)' }}>
              CHOOSE YOUR LANGUAGE
            </h2>
            <p className="text-xs sm:text-sm text-cyan-200/80 font-body">
              Choose the language for your STEM adventure.
            </p>
          </div>

          {/* 4 Large Attractive Grid Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full my-2">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = tempSelectedLang === lang.code;
              return (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(lang.code)}
                  className={`relative p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-[0_0_25px_rgba(0,229,255,0.35)]'
                      : 'border-white/10 bg-black/40 text-slate-300 hover:border-cyan-500/40 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-3xl shrink-0">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-display text-sm font-extrabold tracking-wider uppercase text-white">
                        {lang.nativeName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-display tracking-widest uppercase">
                        {lang.name}
                      </span>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'border-cyan-400 bg-cyan-400 text-black' : 'border-slate-700 bg-transparent'
                  }`}>
                    {isSelected && <Check size={14} className="stroke-[3]" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Continue Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirm}
              className="w-full py-4 rounded-2xl border-2 border-cyan-400 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-display text-sm font-extrabold tracking-[0.2em] uppercase cursor-pointer transition-all shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2"
            >
              <span>CONTINUE</span>
              <ArrowRight size={16} />
            </motion.button>

            {!isInitialSelection && (
              <button
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl border border-white/10 text-slate-400 hover:text-white font-display text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                CANCEL
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
