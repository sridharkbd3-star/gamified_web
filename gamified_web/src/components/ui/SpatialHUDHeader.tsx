// ============================================================
// S.H.I.E.L.D. Platform — SpatialHUDHeader Component
// Command Interface Spatial Header HUD
// ============================================================

import React, { useState } from 'react';
import {
  Shield,
  ArrowLeft,
  Volume2,
  VolumeX,
  BookOpen,
  User,
  BarChart2,
  Briefcase,
  Settings,
  HelpCircle,
  Zap,
  Activity,
  Radio,
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { audioSynth } from '../../utils/audio';
import { useGameState } from '../../context/GameStateContext';

interface SpatialHUDHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  backText?: string;
  showPlayerStatus?: boolean;
  showSystemStatus?: boolean;
  onOpenModal?: (modal: 'profile' | 'progress' | 'inventory' | 'settings' | 'help') => void;
  onOpenDoubtModal?: () => void;
  onOpenDemo?: () => void;
  extraControls?: React.ReactNode;
}

export const SpatialHUDHeader: React.FC<SpatialHUDHeaderProps> = ({
  title = 'S.H.I.E.L.D.',
  subtitle = 'STEM HUB // SECURE PORTAL',
  onBack,
  backText = 'Back',
  showSystemStatus = true,
  onOpenModal,
  onOpenDoubtModal,
  onOpenDemo,
  extraControls,
}) => {
  const { dispatch, navigateTo } = useGameState();
  const [muted, setMuted] = useState(() => audioSynth.getMuted());

  const handleToggleMute = () => {
    const isNowMuted = audioSynth.toggleMute();
    setMuted(isNowMuted);
  };

  return (
    <header className="relative z-50 w-full px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-cyan-500/20 bg-[#050512]/75 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      {/* Top beam line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Left Section: Branding & Back Button */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-display text-[10px] font-bold tracking-widest uppercase transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">{backText}</span>
          </button>
        )}

        <div className="w-8 h-8 rounded-xl border border-[#c59b27]/40 bg-[#0d0d1a] flex items-center justify-center shadow-[0_0_15px_rgba(197,155,39,0.25)]">
          <Shield size={18} className="text-[#c59b27]" />
        </div>

        <div className="flex flex-col">
          <span className="font-display text-sm tracking-[0.2em] font-extrabold text-white leading-none">
            {title}
          </span>
          <span className="text-[9px] tracking-widest text-[#c59b27] font-display font-semibold uppercase mt-0.5">
            {subtitle}
          </span>
        </div>
      </div>

      {/* Center Section: System Status Indicators (Desktop) */}
      {showSystemStatus && (
        <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full border border-cyan-500/15 bg-black/40 text-[9px] font-display tracking-widest text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#00ff88]" />
            <span className="text-emerald-400 font-bold">SYSTEM ONLINE</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-1.5">
            <Activity size={11} className="text-cyan-400" />
            <span>CORE STABLE</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Radio size={11} />
            <span>FREQ: 4.8 GHz</span>
          </div>
        </div>
      )}

      {/* Right Section: System Controls */}
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <LanguageSelector />

        {/* Ask Teacher / Doubts Modal Trigger */}
        {onOpenDoubtModal && (
          <button
            onClick={onOpenDoubtModal}
            title="Ask Your Teacher / My Doubts"
            className="h-8 px-2.5 rounded-lg border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/50 text-purple-300 font-display text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(123,47,255,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>ASK TEACHER</span>
          </button>
        )}

        {/* Demo Mode trigger */}
        {onOpenDemo && (
          <button
            onClick={onOpenDemo}
            title="Hackathon Demo Mode"
            className="h-8 px-2.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-display text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-1 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.2)]"
          >
            <Zap size={12} className="animate-pulse" />
            <span className="hidden sm:inline">DEMO</span>
          </button>
        )}

        {/* Revisit Story */}
        <button
          onClick={() => {
            dispatch({ type: 'SET_STORY_RECALL_MODE', active: true });
            navigateTo('INTRO');
          }}
          title="REVISIT YOUR JOURNEY"
          className="h-8 px-2.5 rounded-lg border border-cyan-500/25 bg-[#080816] hover:bg-cyan-500/15 text-cyan-400 font-display text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-1 cursor-pointer"
        >
          <BookOpen size={12} />
          <span className="hidden sm:inline">Story</span>
        </button>

        {/* Modal Triggers */}
        {onOpenModal && (
          <>
            {[
              { key: 'profile', icon: User, label: 'Profile' },
              { key: 'progress', icon: BarChart2, label: 'Progress' },
              { key: 'inventory', icon: Briefcase, label: 'Inventory' },
              { key: 'settings', icon: Settings, label: 'Settings' },
              { key: 'help', icon: HelpCircle, label: 'Help' },
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.key}
                  onClick={() => onOpenModal(btn.key as any)}
                  title={btn.label}
                  aria-label={btn.label}
                  className="w-8 h-8 rounded-lg border border-cyan-500/20 bg-[#080816] hover:border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 flex items-center justify-center transition-all cursor-pointer"
                >
                  <Icon size={13} />
                </button>
              );
            })}
          </>
        )}

        {/* Sound Toggle */}
        <button
          onClick={handleToggleMute}
          title={muted ? 'Unmute' : 'Mute'}
          className="w-8 h-8 rounded-lg border border-cyan-500/20 bg-[#080816] text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all cursor-pointer"
        >
          {muted ? <VolumeX size={13} className="text-slate-500" /> : <Volume2 size={13} />}
        </button>

        {extraControls}
      </div>
    </header>
  );
};
