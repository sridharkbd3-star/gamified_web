// ============================================================
// STEM Adventure Platform — CharacterReveal
// Prototype Visual Character Presentation (Morales)
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks';
import { useGameState } from '../../context/GameStateContext';

export type CharacterPhase =
  | 'hidden'
  | 'silhouette'
  | 'revealing'
  | 'revealed'
  | 'waking';

interface CharacterRevealProps {
  phase: CharacterPhase;
}

export const CharacterReveal: React.FC<CharacterRevealProps> = ({ phase }) => {
  const prefersReduced = useReducedMotion();

  let state = null;
  try {
    const context = useGameState();
    state = context.state;
  } catch {}

  const isHero = state?.player?.avatarId === 'hero';

  // Opacity of the actual character image based on phase
  const imageOpacity =
    phase === 'hidden' ? 0
    : phase === 'silhouette' ? 0.15
    : phase === 'revealing' ? 0.6
    : 0.92; // revealed / waking

  // Blue-tinted filter for silhouette → actual reveal
  const filterValue =
    phase === 'silhouette'
      ? 'brightness(0.08) saturate(0) blur(2px)'
      : phase === 'revealing'
      ? 'brightness(0.5) saturate(0.4) blur(0.5px)'
      : 'brightness(0.95) saturate(0.9)';

  // Breathing: subtle scale oscillation when waking/revealed
  const isBreathing = phase === 'revealed' || phase === 'waking';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(220px, 30vw, 440px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Energy aura behind character */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(0,120,255,0.22) 0%, transparent 70%)',
          filter: 'blur(30px)',
          borderRadius: '50%',
          zIndex: 0,
        }}
        animate={
          prefersReduced
            ? {}
            : { opacity: phase === 'hidden' ? 0 : [0.4, 0.8, 0.4] }
        }
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Silhouette glow layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/character-intro.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom center',
          filter: 'brightness(0) blur(8px) saturate(0)',
          opacity: phase === 'silhouette' ? 0.5 : 0,
          zIndex: 1,
        }}
        animate={{ opacity: phase === 'silhouette' ? 0.45 : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Main character image */}
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '133%', // 3:4 aspect ratio
          zIndex: 2,
        }}
        animate={{
          scaleY: isBreathing && !prefersReduced ? [1, 1.008, 1] : 1,
          scaleX: isBreathing && !prefersReduced ? [1, 0.998, 1] : 1,
          y: isBreathing && !prefersReduced ? [0, -4, 0] : 0,
        }}
        transition={
          isBreathing
            ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0 }
        }
      >
        <motion.img
          src="/character-intro.jpg"
          alt="Young Morales waking in a mysterious world"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            filter: filterValue,
            transition: 'filter 1.5s ease',
          }}
          animate={{ opacity: imageOpacity }}
          initial={{ opacity: 0 }}
          transition={{ duration: phase === 'silhouette' ? 2 : 1.5, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Bottom fade — blends character into the ground */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25%',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Waking indicator — subtle light burst when waking begins */}
      {phase === 'waking' && !prefersReduced && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120%',
            height: '40%',
            background: 'radial-gradient(ellipse, rgba(0,180,255,0.3) 0%, transparent 60%)',
            filter: 'blur(20px)',
            borderRadius: '50%',
            zIndex: 0,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.6, 0.2], scale: [0.5, 1.2, 1] }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      )}
      {/* Hero Suit HUD Overlays */}
      {isHero && (
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ width: '100%', height: '100%', position: 'absolute' }}>
          {/* Visor glowing lines adapted for Morales' portrait */}
          <motion.div
            animate={{ opacity: [0.6, 1.0, 0.6] }}
            transition={{ duration: 2.0, repeat: Infinity }}
            className="absolute top-[28%] left-1/2 transform -translate-x-1/2 h-[3px] bg-cyan-400 shadow-[0_0_12px_#00e5ff]"
            style={{ width: '42%' }}
          />
          {/* Visor side glowing indicators */}
          <div className="absolute top-[27.5%] left-[26%] w-[4px] h-[5px] rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
          <div className="absolute top-[27.5%] right-[26%] w-[4px] h-[5px] rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
          
          {/* Glowing chest power core */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.7, 1.0, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-[48%] left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border border-cyan-400/50 bg-cyan-950/20 flex items-center justify-center"
            style={{ boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)' }}
          >
            <div className="w-5 h-5 rounded-full border border-dashed border-cyan-400/60 animate-spin" style={{ animationDuration: '4s' }} />
          </motion.div>

          {/* Symmetrical digital shoulder plates */}
          <div className="absolute top-[38%] left-[22%] w-[10px] h-[30px] border-l-2 border-t-2 border-cyan-300/30 rounded-tl" />
          <div className="absolute top-[38%] right-[22%] w-[10px] h-[30px] border-r-2 border-t-2 border-cyan-300/30 rounded-tr" />
        </div>
      )}
    </div>
  );
};
