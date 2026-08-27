// ============================================================
// S.H.I.E.L.D. Platform — MissionCharacterDisplay Component
// Reusable Full-Body Character Display across all STEM domains & missions
// ============================================================

import React from 'react';

interface MissionCharacterDisplayProps {
  src: string;
  alt?: string;
  themeColor?: string;
  variant?: 'briefing' | 'gameplay';
  onlineLabel?: string;
}

export const MissionCharacterDisplay: React.FC<MissionCharacterDisplayProps> = ({
  src,
  alt = 'Agent Morales',
  themeColor = '#00e5ff',
  variant = 'briefing',
  onlineLabel = 'MORALES · ONLINE',
}) => {
  const isBriefing = variant === 'briefing';
  const maxHeight = isBriefing ? '380px' : '320px';
  const minHeight = isBriefing ? '260px' : '220px';

  return (
    <div
      className="relative rounded-2xl overflow-hidden border-2 shadow-2xl bg-[#030308]/90 flex items-center justify-center p-2.5 transition-all duration-300 w-full"
      style={{
        borderColor: `${themeColor}45`,
        boxShadow: `0 0 35px ${themeColor}18`,
        minHeight,
      }}
    >
      {/* Subtle Scanline Texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.25) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Online Status Badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 px-3 py-1 rounded-lg border border-white/10 shadow-sm">
        <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: themeColor }} />
        <span className="text-xs font-mono font-bold tracking-wider" style={{ color: themeColor }}>
          {onlineLabel}
        </span>
      </div>

      {/* Full Body Character Image - 100% visible, object-contain, head to shoes visible */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-all duration-500 relative z-1"
        style={{
          maxHeight,
          objectPosition: 'center center',
          filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.8))',
        }}
      />
    </div>
  );
};
