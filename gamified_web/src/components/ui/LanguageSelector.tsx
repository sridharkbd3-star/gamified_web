import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type SupportedLanguageCode } from '../../i18n';
import { audioSynth } from '../../utils/audio';

interface LanguageSelectorProps {
  className?: string;
  compactOnMobile?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  compactOnMobile = true,
}) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCode = (i18n.language || 'en').substring(0, 2) as SupportedLanguageCode;
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentCode) || SUPPORTED_LANGUAGES[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {}
  };

  const handleSelectLanguage = (code: SupportedLanguageCode) => {
    if (code !== currentCode) {
      i18n.changeLanguage(code);
      playTone(650);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    playTone(450);
  };

  return (
    <div ref={containerRef} className={`relative inline-block text-left z-50 ${className}`}>
      {/* Trigger button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label="Select Language"
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-cyan-500/30 bg-[#080d1a]/80 hover:bg-[#0f172a]/90 hover:border-cyan-400/60 text-cyan-300 font-display text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.15)]"
      >
        <Globe size={15} className="text-cyan-400 animate-pulse" />
        <span className={compactOnMobile ? 'hidden sm:inline-block font-bold' : 'font-bold'}>
          {currentLang.nativeName.toUpperCase()}
        </span>
        <span className="text-[10px] text-cyan-500 ml-0.5">{isOpen ? '▲' : '▼'}</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-52 rounded-2xl border border-cyan-500/30 bg-[#050914]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,229,255,0.2)] overflow-hidden z-50"
          >
            {/* Menu Header */}
            <div className="px-4 py-3 border-b border-cyan-500/15 bg-cyan-500/5 flex items-center gap-2 text-cyan-400 font-display text-[11px] font-bold tracking-widest uppercase">
              <Globe size={13} />
              <span>{t('languages.selectLanguage', 'SELECT LANGUAGE')}</span>
            </div>

            {/* Language Options List */}
            <div className="py-1.5 flex flex-col">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentCode;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full px-4 py-2.5 flex items-center justify-between text-left transition-all duration-150 cursor-pointer font-display text-xs tracking-wider ${
                      isSelected
                        ? 'bg-cyan-500/15 text-cyan-300 font-bold border-l-2 border-cyan-400'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 flex items-center justify-center font-bold text-cyan-400">
                        {isSelected ? <Check size={14} className="text-cyan-400" /> : null}
                      </span>
                      <span>{lang.nativeName}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">
                      {lang.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
