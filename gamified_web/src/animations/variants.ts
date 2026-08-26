// ============================================================
// STEM Adventure Platform — Framer Motion Animation Variants
// Phase 1 Foundation
//
// All reusable animation patterns live here.
// Import and use in any component instead of defining locally.
// ============================================================

import type { Variants, Transition, Easing } from 'framer-motion';

// ----------------------------------------------------------
// TIMING CONSTANTS
// Keep consistent durations across the application.
// ----------------------------------------------------------
export const TIMING = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
  cinematic: 1.2,
  float: 4.0,
  glow: 2.5,
} as const;

export const EASING = {
  smooth: [0.25, 0.46, 0.45, 0.94] as Easing,
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  bounce: { type: 'spring' as const, stiffness: 400, damping: 20 },
  cinematic: [0.16, 1, 0.3, 1] as Easing,
};

// ----------------------------------------------------------
// BASE TRANSITIONS
// ----------------------------------------------------------
export const smoothTransition: Transition = {
  duration: TIMING.normal,
  ease: EASING.smooth,
};

export const cinematicTransition: Transition = {
  duration: TIMING.cinematic,
  ease: EASING.cinematic,
};

export const slowTransition: Transition = {
  duration: TIMING.slow,
  ease: EASING.smooth,
};

// ----------------------------------------------------------
// FADE VARIANTS
// ----------------------------------------------------------
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMING.normal, ease: EASING.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: TIMING.fast, ease: EASING.smooth },
  },
};

export const fadeInSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMING.cinematic, ease: EASING.cinematic },
  },
  exit: {
    opacity: 0,
    transition: { duration: TIMING.slow, ease: EASING.smooth },
  },
};

// ----------------------------------------------------------
// SCALE VARIANTS
// ----------------------------------------------------------
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: TIMING.normal, ease: EASING.cinematic },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: TIMING.fast },
  },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: TIMING.fast },
  },
};

// ----------------------------------------------------------
// SLIDE VARIANTS
// ----------------------------------------------------------
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.slow, ease: EASING.cinematic },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: TIMING.fast },
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.slow, ease: EASING.cinematic },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: TIMING.fast },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: TIMING.slow, ease: EASING.cinematic },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: TIMING.fast },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: TIMING.slow, ease: EASING.cinematic },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: TIMING.fast },
  },
};

// ----------------------------------------------------------
// STAGGER CONTAINER + CHILD
// Use on parent + children for coordinated entry animations.
// ----------------------------------------------------------
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.slow, ease: EASING.cinematic },
  },
};

// ----------------------------------------------------------
// FLOATING ANIMATION (continuous loop)
// Apply as `animate` prop directly.
// ----------------------------------------------------------
export const floatAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: TIMING.float,
    ease: 'easeInOut' as Easing,
    repeat: Infinity,
    repeatType: 'loop' as const,
  },
};

export const floatAnimationSlow = {
  y: [0, -6, 0],
  transition: {
    duration: TIMING.float * 1.5,
    ease: 'easeInOut' as Easing,
    repeat: Infinity,
    repeatType: 'loop' as const,
  },
};

// ----------------------------------------------------------
// GLOW PULSE (continuous loop)
// ----------------------------------------------------------
export const glowPulse = {
  opacity: [0.5, 1, 0.5],
  transition: {
    duration: TIMING.glow,
    ease: 'easeInOut' as Easing,
    repeat: Infinity,
    repeatType: 'loop' as const,
  },
};

// ----------------------------------------------------------
// PAGE / SCENE TRANSITIONS
// Used by SceneTransition component.
// ----------------------------------------------------------
export const pageTransition: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: TIMING.slow, ease: EASING.cinematic },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: { duration: TIMING.normal, ease: EASING.smooth },
  },
};

export const sceneTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMING.cinematic, ease: EASING.cinematic },
  },
  exit: {
    opacity: 0,
    transition: { duration: TIMING.slow, ease: EASING.smooth },
  },
};

// ----------------------------------------------------------
// INTERACTIVE HOVER / TAP
// Apply as `whileHover` and `whileTap` props.
// ----------------------------------------------------------
export const hoverLift = {
  scale: 1.03,
  y: -2,
  transition: { duration: TIMING.fast, ease: EASING.smooth },
};

export const hoverGlow = {
  scale: 1.02,
  transition: { duration: TIMING.fast },
};

export const tapPress = {
  scale: 0.97,
  transition: { duration: TIMING.fast },
};

export const tapPressStrong = {
  scale: 0.93,
  transition: { duration: TIMING.fast },
};

// ----------------------------------------------------------
// REDUCED MOTION HELPER
// Call this to get a no-animation fallback when the user
// prefers reduced motion. Pass result as `variants`.
// ----------------------------------------------------------
export function reducedMotionVariants(): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
    exit: { opacity: 0, transition: { duration: 0.01 } },
  };
}
