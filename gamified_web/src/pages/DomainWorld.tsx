// ============================================================
// STEM Adventure Platform â€” DomainWorld Component
// Phase 8 Update
//
// Unified codebase driving all four STEM domain worlds.
// Contains fully playable Stage 1, 2, 3, and 4 interactive games:
//  - Science: Laser Resonance, Variables control, Crystal Healing, Core Fusion
//  - Technology: 3x3 Drone Grid, 4x4 coordinate grids, Debugger swap, loops REPEAT
//  - Engineering: Truss load balance, Multi-span truss, Stress correction, Wind Anchors
//  - Mathematics: Triangular series, Fibonacci, Scale balances, Locking ciphers
// Incorporates hint tiers, adaptive difficulty, recommendations, and portal dialogue events.
// ============================================================

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  X,
  Play,
  CheckCircle,
  Lock,
  ChevronRight,
  HelpCircle,
  Cpu,
  FlaskConical,
  Wrench,
  Sigma,
  Sparkles,
} from 'lucide-react';

// â”€â”€ Shared components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { CharacterReveal } from '../components/story/CharacterReveal';
import { CinematicDialoguePanel } from '../components/story/CinematicDialoguePanel';
import { Modal } from '../components/ui/Modal';

// â”€â”€ State & Context â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { useGameState } from '../context/GameStateContext';
import { STEM_DOMAINS } from '../data/domains';
import { audioSynth } from '../utils/audio';
import type { DialogueLine } from '../types';
import {
  SCIENCE_COMPLETED_DIALOGUE,
  TECHNOLOGY_COMPLETED_DIALOGUE,
  ENGINEERING_COMPLETED_DIALOGUE,
  MATHEMATICS_COMPLETED_DIALOGUE,
  FOURTH_STONE_HOOK_DIALOGUE,
} from '../data/dialogue';

const getDomainCompletionDialogue = (domainId: string) => {
  switch (domainId) {
    case 'science': return SCIENCE_COMPLETED_DIALOGUE;
    case 'technology': return TECHNOLOGY_COMPLETED_DIALOGUE;
    case 'engineering': return ENGINEERING_COMPLETED_DIALOGUE;
    case 'mathematics': return MATHEMATICS_COMPLETED_DIALOGUE;
    default: return SCIENCE_COMPLETED_DIALOGUE;
  }
};

import { MathematicsWorld } from './MathematicsWorld';
import { ScienceWorld } from './ScienceWorld';
import { TechnologyWorld } from './TechnologyWorld';
import { EngineeringWorld } from './EngineeringWorld';

export const DomainWorld: React.FC = () => {
  const { state, navigateTo, dispatch } = useGameState();
  const activeDomainId = state.currentDomainId ?? 'science';

  if (activeDomainId === 'science') {
    return <ScienceWorld />;
  }
  if (activeDomainId === 'technology') {
    return <TechnologyWorld />;
  }
  if (activeDomainId === 'engineering') {
    return <EngineeringWorld />;
  }
  if (activeDomainId === 'mathematics') {
    return <MathematicsWorld />;
  }

  // Get active domain data
  const domain = STEM_DOMAINS.find((d) => d.id === activeDomainId) ?? STEM_DOMAINS[0];
  const isFirstVisit = !(state.visitedDomains || []).includes(activeDomainId);

  // Calculate domain progress percentage
  const completedCount = domain.stages.filter((s) => state.completedStageIds.includes(s.id)).length;
  const progressPercent = Math.round((completedCount / domain.stages.length) * 100);

  // Scene/UI layout state
  const [revealStage, setRevealStage] = useState<'intro' | 'map' | 'gameplay' | 'completion-ceremony'>(
    isFirstVisit ? 'intro' : 'map'
  );
  const [activeStageId, setActiveGameplayStageId] = useState<string | null>(null);
  const [selectedStageIdForPreview, setSelectedStageIdForPreview] = useState<string | null>(null);
  const [muted, setMuted] = useState(() => audioSynth.getMuted());

  // Game lifecycle: start screen vs active gameplay vs result screen
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSuccess, setGameSuccess] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);

  // Adaptive gameplay states
  const [attempts, setAttempts] = useState(1);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintLevel, setHintLevel] = useState<1 | 2 | 3>(1);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [gameScore, setGameScore] = useState(100);
  const [showHintMsg, setShowHintMsg] = useState(false);

  // Adaptive difficulty system (EASY vs MEDIUM vs HARD)
  const [activeDifficulty, setActiveDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('EASY');

  // Time tracker for gameplay
  const gameStartTimeRef = useRef<number>(0);
  const [completionTimeSecs, setCompletionTimeSecs] = useState(0);

  // Feedbacks
  const [feedbackType, setFeedbackType] = useState<'none' | 'success' | 'warning' | 'error'>('none');
  const [feedbackText, setFeedbackText] = useState('');

  // Future-Self portal events overlay
  const [activePortalDialogue, setActivePortalDialogue] = useState<DialogueLine | null>(null);

  // Completion Ceremony States
  const [completionStep, setCompletionStep] = useState<'core-init' | 'portal-open' | 'dialogue' | 'stone-materialize' | 'stone-claimed' | 'reflection' | 'closed'>('core-init');
  const [ceremonyDialogueIdx, setCeremonyDialogueIdx] = useState(0);
  const [reflectionOption, setReflectionOption] = useState<string>('');

  const currentStage = domain.stages.find((s) => s.id === activeStageId);

  const handleCompleteIntro = () => {
    dispatch({ type: 'MARK_DOMAIN_VISITED', domainId: activeDomainId });
    setRevealStage('map');
  };

  const handleToggleMute = () => {
    const isNowMuted = audioSynth.toggleMute();
    setMuted(isNowMuted);
  };

  const handleReturnToHub = () => {
    dispatch({ type: 'EXIT_DOMAIN' });
    navigateTo('MAIN_INTERFACE');
  };

  const getStageStatus = (stageId: string, index: number) => {
    if (state.completedStageIds.includes(stageId)) {
      return 'COMPLETED';
    }
    if (index === 0) {
      return 'AVAILABLE';
    }
    const prevStage = domain.stages[index - 1];
    if (prevStage && state.completedStageIds.includes(prevStage.id)) {
      return 'AVAILABLE';
    }
    return 'LOCKED';
  };

  const mapNodesCoords = [
    { x: 16, y: 55 },
    { x: 38, y: 32 },
    { x: 62, y: 55 },
    { x: 84, y: 32 },
  ];

  // ------------------------------------------------------------
  // MINI-GAME STATE: SCIENCE
  // ------------------------------------------------------------
  // Stage 1: Laser Resonance
  const [sciWavelength, setSciWavelength] = useState<'Red' | 'Green' | 'Blue'>('Red');
  const [sciPulse, setSciPulse] = useState<1 | 2 | 4 | 8>(1);
  const [sciTemp, setSciTemp] = useState(15);
  const [sciResonanceActive, setSciResonanceActive] = useState(false);

  // Stage 2: Scientific Variables (Pressure, Catalyst, Heat)
  const [sciPressure, setSciPressure] = useState(20);
  const [sciCatalyst, setSciCatalyst] = useState(2);
  const [sciHeat, setSciHeat] = useState(150);

  // Stage 3: Mystery Experiment (pH and wavelength healing)
  const [sciPH, setSciPH] = useState(7);

  // Stage 4: Science Challenge (Integrated reactor)
  const [sciFusionPulse, setSciFusionPulse] = useState(1);

  // ------------------------------------------------------------
  // MINI-GAME STATE: TECHNOLOGY
  // ------------------------------------------------------------
  type TechCommand = 'FORWARD' | 'LEFT' | 'RIGHT' | 'REPEAT_2';
  type DroneDir = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
  const [techProgram, setTechProgram] = useState<TechCommand[]>([]);
  const [droneX, setDroneX] = useState(0);
  const [droneY, setDroneY] = useState(0);
  const [droneDir, setDroneDir] = useState<DroneDir>('EAST');
  const [droneRunning, setDroneRunning] = useState(false);
  const [droneCrash, setDroneCrash] = useState(false);
  const [dronePathSteps, setDronePathSteps] = useState<{x: number, y: number}[]>([]);

  // Stage grid coordinates based on active stages
  const getTechObstacles = () => {
    if (activeStageId === 'tech-02' && activeDifficulty === 'HARD') {
      return [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 2 }];
    }
    if (activeStageId === 'tech-02') {
      return [{ x: 1, y: 1 }, { x: 2, y: 2 }];
    }
    if (activeStageId === 'tech-03' || activeStageId === 'tech-04') {
      return [{ x: 1, y: 0 }, { x: 2, y: 2 }];
    }
    return [{ x: 0, y: 1 }]; // tech-01
  };

  const getGridSize = () => {
    return (activeStageId === 'tech-01') ? 3 : 4;
  };

  const getGoalCoord = () => {
    return (activeStageId === 'tech-01') ? { x: 2, y: 2 } : { x: 3, y: 3 };
  };

  // ------------------------------------------------------------
  // MINI-GAME STATE: ENGINEERING
  // ------------------------------------------------------------
  type EngBeam = 'EMPTY' | 'WOOD' | 'STEEL' | 'CABLE';
  const [engLeftSpan, setEngLeftSpan] = useState<EngBeam>('EMPTY');
  const [engCenterSpan, setEngCenterSpan] = useState<EngBeam>('EMPTY');
  const [engMidLeftSpan, setEngMidLeftSpan] = useState<EngBeam>('EMPTY');
  const [engMidRightSpan, setEngMidRightSpan] = useState<EngBeam>('EMPTY');
  const [engRightSpan, setEngRightSpan] = useState<EngBeam>('EMPTY');
  const [engTesting, setEngTesting] = useState(false);
  const [engCarriagePos, setEngCarriagePos] = useState(-30);
  const [engCollapsed, setEngCollapsed] = useState(false);

  const BEAMS_DATA: Record<EngBeam, { name: string; cost: number; strength: number }> = {
    EMPTY: { name: 'Empty', cost: 0, strength: 0 },
    WOOD:  { name: 'Wood Beam', cost: 100, strength: 1 },
    STEEL: { name: 'Steel Truss', cost: 200, strength: 5 },
    CABLE: { name: 'Carbon Cable', cost: 300, strength: 8 },
  };

  // ------------------------------------------------------------
  // MINI-GAME STATE: MATHEMATICS
  // ------------------------------------------------------------
  const [mathAnswer, setMathAnswer] = useState<string>('');
  const [mathRule, setMathRule] = useState<string>('');

  // Dual locking inputs
  const [mathLockA, setMathLockA] = useState<string>('');
  const [mathLockB, setMathLockB] = useState<string>('');

  // ------------------------------------------------------------
  // Sound Controllers
  // ------------------------------------------------------------
  const playHoverSound = () => {
    if (muted) return;
    try {
      const audioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (audioCtx) {
        const ctx = new audioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        gain.gain.setValueAtTime(0.003, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }
    } catch {}
  };

  const playNodeClickSound = () => {
    if (muted) return;
    try {
      const audioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (audioCtx) {
        const ctx = new audioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.012, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {}
  };

  const handleHintQuery = () => {
    setHintsUsed((prev) => prev + 1);
    setGameScore((prev) => Math.max(50, prev - 10));
    setShowHintMsg(true);
  };

  // ------------------------------------------------------------
  // Narrative Intro Dialogue
  // ------------------------------------------------------------
  const introDialogue: DialogueLine = {
    id: `intro-${domain.id}`,
    speakerId: 'young-man',
    speakerName: 'Morales',
    text:
      domain.id === 'science'
        ? 'Every discovery begins with a question. Observe the world, experiment with its mysteries, and uncover the science hidden within it.'
        : domain.id === 'technology'
        ? 'Technology transforms ideas into possibilities. Learn to think like a creator, understand systems, and build the future.'
        : domain.id === 'engineering'
        ? 'Every great creation begins with a problem. Design, build, test, and improve your way toward a solution.'
        : 'Behind every pattern is a hidden rule. Use logic, numbers, and reasoning to reveal the structure of the world.',
    emotion: 'neutral',
  };

  // ------------------------------------------------------------
  // Adaptive Recommendations Engine
  // ------------------------------------------------------------
  const getRecommendationText = () => {
    const score = getMasteryScoreName();
    if (score === 'BEGINNING' || score === 'DEVELOPING') {
      return `PRACTICE RECOMMENDED: Review compound equations or coordinate paths to establish a stronger score baseline.`;
    }
    return `CHALLENGE COMPLETED: You have fully mastered the concepts of this stage. Advance to the next adventure checkpoint.`;
  };

  const getMasteryScoreName = () => {
    if (attempts === 1 && hintsUsed === 0) return 'MASTERED';
    if (attempts <= 2 && hintsUsed <= 1) return 'PROFICIENT';
    if (attempts <= 3 && hintsUsed <= 2) return 'DEVELOPING';
    return 'BEGINNING';
  };

  // ------------------------------------------------------------
  // STAGE INITIALIZERS
  // ------------------------------------------------------------
  const handleStartGameplay = (stageId: string) => {
    setActiveGameplayStageId(stageId);
    setSelectedStageIdForPreview(null);
    setGameStarted(true);
    setGameSuccess(false);
    setShowResultScreen(false);
    setAttempts(1);
    setHintsUsed(0);
    setHintLevel(1);
    setIncorrectAnswers(0);
    setGameScore(100);
    setShowHintMsg(false);
    setFeedbackType('none');
    setFeedbackText('');
    gameStartTimeRef.current = Date.now();

    // Determine initial adaptive difficulty based on historical performances
    const historicalStats = state.stagePerformance?.[stageId];
    if (historicalStats && historicalStats.score >= 85) {
      setActiveDifficulty('HARD');
    } else if (historicalStats && historicalStats.score <= 60) {
      setActiveDifficulty('EASY');
    } else {
      setActiveDifficulty('MEDIUM');
    }

    // Reset Science variables
    setSciWavelength('Red');
    setSciPulse(1);
    setSciTemp(15);
    setSciResonanceActive(false);
    setSciPressure(20);
    setSciCatalyst(2);
    setSciHeat(150);
    setSciPH(7);
    setSciFusionPulse(1);

    // Reset Tech variables
    setTechProgram([]);
    setDroneX(0);
    setDroneY(0);
    setDroneDir('EAST');
    setDroneRunning(false);
    setDroneCrash(false);
    setDronePathSteps([]);

    // Debugging stage pre-filled values
    if (stageId === 'tech-03') {
      setTechProgram(['FORWARD', 'RIGHT', 'FORWARD', 'LEFT', 'FORWARD']);
    }

    // Reset Engineering Spans
    setEngLeftSpan('EMPTY');
    setEngMidLeftSpan('EMPTY');
    setEngMidRightSpan('EMPTY');
    setEngRightSpan('EMPTY');
    setEngTesting(false);
    setEngCarriagePos(-30);
    setEngCollapsed(false);

    if (stageId === 'eng-03') {
      // Buckles structure preset
      setEngLeftSpan('WOOD');
      setEngMidLeftSpan('WOOD');
      setEngMidRightSpan('WOOD');
      setEngRightSpan('WOOD');
    }

    // Reset Mathematics inputs
    setMathAnswer('');
    setMathRule('');
    setMathLockA('');
    setMathLockB('');

    // Trigger Future-Self dialog before stage 4 begins
    if (stageId.endsWith('04')) {
      if (!muted) {
        audioSynth.playPortalOpen();
      }
      setActivePortalDialogue({
        id: `portal-before-stage-4`,
        speakerId: 'future-self',
        speakerName: 'Future Morales',
        text: 'This is the final core checkpoint of this STEM pillar, Morales. The dimensional readings are highly unstable. Stay focused and apply everything you have learned.',
        emotion: 'serious',
      });
    }
  };

  // ------------------------------------------------------------
  // GAMEPLAY RUNNERS & VALIDATION LOGIC
  // ------------------------------------------------------------

  // Science Game Run
  const handleScienceExperiment = () => {
    setSciResonanceActive(true);
    setFeedbackType('none');

    setTimeout(() => {
      let isSuccess = false;
      let failureReason = '';

      if (activeStageId === 'sci-01') {
        // Stage 1
        if (sciWavelength === 'Green' && sciPulse === 4 && sciTemp >= 20 && sciTemp <= 40) {
          isSuccess = true;
        } else if (sciWavelength !== 'Green') {
          failureReason = 'Chlorophyll chloroplasts do not react to this wavelength. Green wavelength is required.';
        } else if (sciPulse !== 4) {
          failureReason = 'Resonance rate is out of sync. Set pulse frequency to exactly 4Hz.';
        } else {
          failureReason = 'Thermal limit exceeded! Keep temperature within the 20Â°C - 40Â°C range.';
        }
      } else if (activeStageId === 'sci-02') {
        // Stage 2: Variables
        const balance = sciPressure * sciCatalyst;
        const heatGoal = activeDifficulty === 'HARD' ? (sciPressure * 5) : 250;
        
        if (balance === 40 && Math.abs(sciHeat - heatGoal) <= 30) {
          isSuccess = true;
        } else if (balance !== 40) {
          failureReason = `Molecular balancing ratio is out of range. Target Pressure * Catalyst must equal 40 (current: ${balance}).`;
        } else {
          failureReason = `Thermal compound core is unstable. Keep heat target close to ${heatGoal}K (current: ${sciHeat}K).`;
        }
      } else if (activeStageId === 'sci-03') {
        // Stage 3: Mystery Crystal pH (pH=8, wavelength=Blue)
        if (sciPH === 8 && sciWavelength === 'Blue') {
          isSuccess = true;
        } else if (sciPH !== 8) {
          failureReason = 'Crystal structure buckles. Lab reports state pH acidity levels must be slightly basic (pH=8).';
        } else {
          failureReason = 'Light energy frequency mismatch. Select the Blue wavelength range to cure crystal cracks.';
        }
      } else if (activeStageId === 'sci-04') {
        // Stage 4: Reactor Challenge (Wavelength=Blue, Pulse=8Hz, Temp=30, Pressure=50, Heat=350, Catalyst=4)
        if (
          sciWavelength === 'Blue' &&
          sciFusionPulse === 8 &&
          sciTemp === 30 &&
          sciPressure === 50 &&
          sciHeat === 350 &&
          sciCatalyst === 4
        ) {
          isSuccess = true;
        } else {
          failureReason = 'Core containment fusion alignment is misaligned. Rebalance pressures and wavelengths to active targets.';
        }
      }

      setSciResonanceActive(false);

      if (isSuccess) {
        setGameSuccess(true);
        setFeedbackType('success');
        setFeedbackText('Experiment successful! The atomic composition has locked into a stable molecular configuration.');
      } else {
        setAttempts((prev) => prev + 1);
        setIncorrectAnswers((prev) => prev + 1);
        setGameScore((prev) => Math.max(50, prev - 12));
        setFeedbackType('error');
        setFeedbackText(failureReason);
      }
    }, 1800);
  };

  // Technology Game Run
  const handleTechnologyRun = () => {
    if (techProgram.length === 0) return;
    setDroneRunning(true);
    setDroneCrash(false);
    setFeedbackType('none');

    let curX = 0;
    let curY = 0;
    let curDir: DroneDir = 'EAST';
    const path: { x: number; y: number }[] = [{ x: 0, y: 0 }];
    const obstacles = getTechObstacles();
    const size = getGridSize();
    const goal = getGoalCoord();

    // Loop expand block
    let expandedProgram: TechCommand[] = [];
    for (let i = 0; i < techProgram.length; i++) {
      if (techProgram[i] === 'REPEAT_2' && i + 1 < techProgram.length) {
        expandedProgram.push(techProgram[i + 1]);
        expandedProgram.push(techProgram[i + 1]);
        i++;
      } else {
        expandedProgram.push(techProgram[i]);
      }
    }

    let commandIdx = 0;

    const interval = setInterval(() => {
      if (commandIdx >= expandedProgram.length) {
        clearInterval(interval);
        setDroneRunning(false);

        if (curX === goal.x && curY === goal.y) {
          setGameSuccess(true);
          setFeedbackType('success');
          setFeedbackText('Drone arrived at target coordinates successfully! Sequential path compiled.');
        } else {
          setAttempts((prev) => prev + 1);
          setIncorrectAnswers((prev) => prev + 1);
          setGameScore((prev) => Math.max(50, prev - 15));
          setFeedbackType('warning');
          setFeedbackText(`Drone path terminated. Stopped at (${curX}, ${curY}). Re-route program to Goal (${goal.x}, ${goal.y}).`);
        }
        return;
      }

      const cmd = expandedProgram[commandIdx];
      if (cmd === 'FORWARD') {
        if (curDir === 'EAST') curX += 1;
        else if (curDir === 'WEST') curX -= 1;
        else if (curDir === 'SOUTH') curY += 1;
        else if (curDir === 'NORTH') curY -= 1;
      } else if (cmd === 'LEFT') {
        if (curDir === 'EAST') curDir = 'NORTH';
        else if (curDir === 'NORTH') curDir = 'WEST';
        else if (curDir === 'WEST') curDir = 'SOUTH';
        else if (curDir === 'SOUTH') curDir = 'EAST';
      } else if (cmd === 'RIGHT') {
        if (curDir === 'EAST') curDir = 'SOUTH';
        else if (curDir === 'SOUTH') curDir = 'WEST';
        else if (curDir === 'WEST') curDir = 'NORTH';
        else if (curDir === 'NORTH') curDir = 'EAST';
      }

      setDroneX(curX);
      setDroneY(curY);
      setDroneDir(curDir);
      path.push({ x: curX, y: curY });
      setDronePathSteps([...path]);

      const hitObstacle = obstacles.some((obs) => obs.x === curX && obs.y === curY);
      const hitBounds = curX < 0 || curX >= size || curY < 0 || curY >= size;

      if (hitObstacle || hitBounds) {
        clearInterval(interval);
        setDroneRunning(false);
        setDroneCrash(true);
        setAttempts((prev) => prev + 1);
        setIncorrectAnswers((prev) => prev + 1);
        setGameScore((prev) => Math.max(50, prev - 15));
        setFeedbackType('error');
        setFeedbackText(
          hitObstacle
            ? `Drone crashed into grid barrier block at (${curX}, ${curY})! Reroute command cards.`
            : `Drone crashed into boundary grid wall at (${curX}, ${curY})!`
        );
      }

      commandIdx++;
    }, 600);
  };

  // Engineering Game Run
  const handleEngineeringTest = () => {
    const cost =
      BEAMS_DATA[engLeftSpan].cost +
      BEAMS_DATA[engMidLeftSpan].cost +
      BEAMS_DATA[engMidRightSpan].cost +
      BEAMS_DATA[engRightSpan].cost;

    const strength =
      BEAMS_DATA[engLeftSpan].strength +
      BEAMS_DATA[engMidLeftSpan].strength +
      BEAMS_DATA[engMidRightSpan].strength +
      BEAMS_DATA[engRightSpan].strength;

    if (activeStageId === 'eng-01') {
      if (engLeftSpan === 'EMPTY' || engCenterSpan === 'EMPTY' || engRightSpan === 'EMPTY') {
        setFeedbackType('warning');
        setFeedbackText('Empty slots found. Place truss beams on all connection ports.');
        return;
      }
    } else {
      if (engLeftSpan === 'EMPTY' || engMidLeftSpan === 'EMPTY' || engMidRightSpan === 'EMPTY' || engRightSpan === 'EMPTY') {
        setFeedbackType('warning');
        setFeedbackText('Empty slots found. Connect all four girder slots.');
        return;
      }
    }

    setEngTesting(true);
    setEngCollapsed(false);
    setFeedbackType('none');
    setEngCarriagePos(-30);

    const duration = 2400;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / duration);
      const pos = -30 + progress * 160;
      setEngCarriagePos(pos);

      let collapseReason = '';

      if (activeStageId === 'eng-01') {
        const costS1 = BEAMS_DATA[engLeftSpan].cost + BEAMS_DATA[engCenterSpan].cost + BEAMS_DATA[engRightSpan].cost;
        if (costS1 > 500 && pos > 20) collapseReason = `Cost limit exceeded! Budget is $500 (spent: $${costS1}).`;
        else if (BEAMS_DATA[engCenterSpan].strength < 3 && pos > 45 && pos < 75) {
          collapseReason = 'Truss failure: wood center girders collapsed under carriage stress.';
        }
      } else if (activeStageId === 'eng-02') {
        // Budget $700, carriage weight 800kg
        if (cost > 700 && pos > 20) collapseReason = `Cost limit exceeded! Budget is $700 (spent: $${cost}).`;
        else if (BEAMS_DATA[engMidLeftSpan].strength < 4 || BEAMS_DATA[engMidRightSpan].strength < 4) {
          if (pos > 35 && pos < 75) collapseReason = 'Structure collapsed! Center spans require at least Steel support.';
        }
      } else if (activeStageId === 'eng-03') {
        // Test and Improve (truck load 1000kg, budget $800)
        if (cost > 800 && pos > 20) collapseReason = `Over budget! Max cost limit is $800 (spent: $${cost}).`;
        else if (strength < 14 && pos > 40 && pos < 75) {
          collapseReason = 'Center buckling! Core load beams must utilize Steel or Cable trusses.';
        }
      } else if (activeStageId === 'eng-04') {
        // Wind anchors (2000kg load, anchor cables required, budget $800)
        if (cost > 800 && pos > 20) collapseReason = `Budget exceeded! Spent: $${cost} / $800.`;
        else if (strength < 16 && pos > 35) {
          collapseReason = 'Launch tower collapsed under load. Build stronger foundation frameworks.';
        } else if (engMidLeftSpan !== 'CABLE' && engMidRightSpan !== 'CABLE' && pos > 60) {
          collapseReason = 'Wind sheer failure! Towers require Carbon Cable anchors in the middle columns.';
        }
      }

      if (collapseReason && pos > 20) {
        clearInterval(interval);
        setEngCollapsed(true);
        setAttempts((prev) => prev + 1);
        setIncorrectAnswers((prev) => prev + 1);
        setGameScore((prev) => Math.max(50, prev - 12));
        setFeedbackType('error');
        setFeedbackText(collapseReason);
        return;
      }

      if (progress >= 1) {
        clearInterval(interval);
        setGameSuccess(true);
        setFeedbackType('success');
        setFeedbackText('Structural test passed! Bridge structure is stable.');
      }
    }, 50);
  };

  // Mathematics Game Run
  const handleMathematicsSubmit = () => {
    let isSuccess = false;
    let feedback = '';

    if (activeStageId === 'math-01') {
      if (mathAnswer === '15' && mathRule === 'RULE_TRIANGLE') {
        isSuccess = true;
      } else if (mathAnswer !== '15') {
        feedback = 'Missing value is incorrect. Arithmetic difference increments (+2, +3, +4) require next step to be +5.';
      } else {
        feedback = 'Rule is incorrect. Triangle series increments by +1 on each sequential step difference.';
      }
    } else if (activeStageId === 'math-02') {
      // Fibonacci pattern portal
      if (mathAnswer === '21' && mathRule === 'RULE_FIB') {
        isSuccess = true;
      } else if (mathAnswer !== '21') {
        feedback = 'Missing value does not match Fibonacci progression (1+1=2, 1+2=3... 8+13 = ?).';
      } else {
        feedback = 'Rule incorrect. Fibonacci values represent sum addition of previous two terms.';
      }
    } else if (activeStageId === 'math-03') {
      // Balancing weight scales
      if (mathAnswer === '3') {
        isSuccess = true;
      } else {
        feedback = 'Scale unbalance! 2 Triangles = 3 Circles. 1 Circle = 2 Squares. Triangles equal 3 Squares.';
      }
    } else if (activeStageId === 'math-04') {
      // Lock ciphers A=32, B=19, Total=51
      if (mathLockA === '32' && mathLockB === '19' && mathAnswer === '51') {
        isSuccess = true;
      } else if (mathLockA !== '32' || mathLockB !== '19') {
        feedback = 'Cylinder codes are incorrect. Solve the arithmetic and geometric ciphers separately.';
      } else {
        feedback = 'Cipher sum does not match A + B.';
      }
    }

    if (isSuccess) {
      setGameSuccess(true);
      setFeedbackType('success');
      setFeedbackText('Pattern verified! Coordinates alignment is balanced.');
    } else {
      setAttempts((prev) => prev + 1);
      setIncorrectAnswers((prev) => prev + 1);
      setGameScore((prev) => Math.max(50, prev - 14));
      setFeedbackType('error');
      setFeedbackText(feedback || 'Incorrect calculation. Check sequence steps and rules.');
    }
  };

  // Continue to result screen on success
  const handleSuccessResolution = () => {
    const elapsed = Math.round((Date.now() - gameStartTimeRef.current) / 1000);
    setCompletionTimeSecs(elapsed);
    
    // Save completion
    if (currentStage) {
      dispatch({ type: 'COMPLETE_STAGE', stageId: currentStage.id });
      dispatch({
        type: 'RECORD_STAGE_PERFORMANCE',
        stageId: currentStage.id,
        performance: {
          attempts,
          score: gameScore,
          difficulty: activeDifficulty,
          incorrectAnswers,
          hintsUsed,
          completionTime: elapsed,
        },
      });

      // Portal Dialogue triggers after Stage 1, Stage 2, or Stage 4 completes
      if (activeStageId === 'sci-01' || activeStageId === 'tech-01' || activeStageId === 'eng-01' || activeStageId === 'math-01') {
        if (!muted) audioSynth.playPortalOpen();
        setActivePortalDialogue({
          id: `portal-after-stage-1`,
          speakerId: 'future-self',
          speakerName: 'Future Morales',
          text: 'Excellent, Morales. Your first core resonance is active. Remember: orders govern technological networks. Master them.',
          emotion: 'hopeful',
        });
      } else if (activeStageId === 'sci-02' || activeStageId === 'tech-02' || activeStageId === 'eng-02' || activeStageId === 'math-02') {
        if (!muted) audioSynth.playPortalOpen();
        setActivePortalDialogue({
          id: `portal-after-stage-2`,
          speakerId: 'future-self',
          speakerName: 'Future Morales',
          text: 'You are adapting quickly, Morales. But the timeline is shifting. Work hard; structural balance requires iterative testing.',
          emotion: 'hopeful',
        });
      } else if (activeStageId?.endsWith('04')) {
        const isStoneCollected = state.player.collectedStones.includes(domain.stoneId);
        if (!isStoneCollected) {
          setRevealStage('completion-ceremony');
          setCompletionStep('core-init');
          setCeremonyDialogueIdx(0);
        } else {
          setShowResultScreen(true);
        }
      } else {
        setShowResultScreen(true);
      }
    } else {
      setShowResultScreen(true);
    }
  };

  const handleCloseResultScreen = () => {
    setGameStarted(false);
    setActiveGameplayStageId(null);
    setRevealStage('map');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '100vh',
        overflow: 'hidden',
        background:
          domain.id === 'science'
            ? 'radial-gradient(circle at 50% 60%, #02121a 0%, #01060a 75%, #000000 100%)'
            : domain.id === 'technology'
            ? 'radial-gradient(circle at 50% 60%, #0a011a 0%, #03000b 75%, #000000 100%)'
            : domain.id === 'engineering'
            ? 'radial-gradient(circle at 50% 60%, #150901 0%, #090300 75%, #000000 100%)'
            : 'radial-gradient(circle at 50% 60%, #01130a 0%, #000704 75%, #000000 100%)',
      }}
    >
      {/* â”€â”€ Layer 0: Particle Environmental Backdrop â”€â”€ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        {domain.id === 'science' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[450px] h-[450px] border border-cyan-500/10 rounded-full animate-spin" style={{ animationDuration: '24s' }} />
            <div className="w-[300px] h-[120px] border border-cyan-500/8 rounded-full absolute rotate-45 animate-pulse" />
          </div>
        )}
        {domain.id === 'technology' && (
          <div className="absolute inset-0 grid grid-cols-6 opacity-30">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-purple-500/10 h-full relative">
                <div
                  className="w-1.5 h-12 bg-gradient-to-b from-purple-500 to-transparent absolute rounded"
                  style={{
                    animation: 'scroll-down 4s linear infinite',
                    animationDelay: `${i * 0.7}s`,
                    top: '-50px',
                  }}
                />
              </div>
            ))}
            <style>{`
              @keyframes scroll-down {
                0% { transform: translateY(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(110vh); opacity: 0; }
              }
            `}</style>
          </div>
        )}
        {domain.id === 'engineering' && (
          <div className="absolute inset-0 opacity-15">
            <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,149,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,149,0,0.06) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          </div>
        )}
        {domain.id === 'mathematics' && (
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,255,136,0.08) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          </div>
        )}
      </div>

      {/* â”€â”€ Layer 1: Hub Return HUD â”€â”€ */}
      {revealStage !== 'gameplay' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            zIndex: 100,
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            onClick={handleReturnToHub}
            style={{
              background: 'rgba(5,5,18,0.72)',
              border: `1px solid ${domain.color}35`,
              borderRadius: '8px',
              padding: '6px 14px',
              color: domain.color,
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
              boxShadow: `0 0 10px ${domain.glowColor}`,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${domain.color}15`;
              e.currentTarget.style.borderColor = domain.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(5,5,18,0.72)';
              e.currentTarget.style.borderColor = `${domain.color}35`;
            }}
          >
            â† Return to Hub
          </button>
          
          <button
            onClick={handleToggleMute}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(5,5,18,0.72)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: muted ? 'rgba(255,255,255,0.3)' : domain.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </motion.div>
      )}

      {/* â”€â”€ Layer 2: Main Stages Switchboard â”€â”€ */}
      <AnimatePresence mode="wait">
        
        {/* STAGE A: Cinematic Domain Story Introduction */}
        {revealStage === 'intro' && (
          <motion.div
            key="domain-intro-flow"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-between"
          >
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  color: domain.color,
                  filter: `drop-shadow(0 0 15px ${domain.color}60)`,
                }}
              >
                {domain.id === 'science' && <FlaskConical size={110} strokeWidth={1} />}
                {domain.id === 'technology' && <Cpu size={110} strokeWidth={1} />}
                {domain.id === 'engineering' && <Wrench size={110} strokeWidth={1} />}
                {domain.id === 'mathematics' && <Sigma size={110} strokeWidth={1} />}
              </motion.div>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'clamp(120px, 18vw, 240px)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <CharacterReveal phase="revealed" />
            </div>

            <CinematicDialoguePanel
              line={introDialogue}
              isVisible={true}
              onAdvance={handleCompleteIntro}
              lineIndex={0}
              totalLines={1}
            />
          </motion.div>
        )}

        {/* STAGE B: Serpentine path progression map */}
        {revealStage === 'map' && (
          <motion.div
            key="domain-map-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0 flex flex-col justify-center items-center px-6"
            style={{ zIndex: 10 }}
          >
            {/* Domain Progress Board Header */}
            <div className="text-center mb-8 max-w-[480px]">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.22em',
                  color: domain.color,
                  textTransform: 'uppercase',
                  textShadow: `0 0 8px ${domain.glowColor}`,
                }}
              >
                Learning Path
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  color: '#ffffff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                  marginBottom: '12px',
                }}
              >
                {domain.name} World
              </h1>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-white/5 border border-white/10 overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      borderRadius: '4px',
                      background: domain.color,
                      boxShadow: `0 0 8px ${domain.color}`,
                    }}
                  />
                </div>
                <span className="font-display text-[10px] text-white/50 tracking-wider">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Serpentine trail layout */}
            <div className="relative w-full max-w-[800px] aspect-[800/380] mb-8">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 16 55 Q 27 25 38 32 T 62 55 T 84 32"
                  fill="none"
                  stroke={`rgba(255,255,255,0.06)`}
                  strokeWidth="2.5"
                />
                <motion.path
                  d="M 16 55 Q 27 25 38 32 T 62 55 T 84 32"
                  fill="none"
                  stroke={domain.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6, 6"
                  animate={{ strokeDashoffset: -60 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="opacity-30"
                />
              </svg>

              {/* Serpentine Nodes */}
              {domain.stages.map((stage, idx) => {
                const status = getStageStatus(stage.id, idx);
                const isLocked = status === 'LOCKED';
                const isCompleted = status === 'COMPLETED';
                const isAvailable = status === 'AVAILABLE';
                const coord = mapNodesCoords[idx];

                return (
                  <div
                    key={stage.id}
                    className="absolute"
                    style={{
                      left: `${coord.x}%`,
                      top: `${coord.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <button
                      onClick={() => {
                        if (!isLocked) {
                          playNodeClickSound();
                          setSelectedStageIdForPreview(stage.id);
                        }
                      }}
                      style={{
                        width: 'clamp(54px, 12vw, 76px)',
                        height: 'clamp(54px, 12vw, 76px)',
                        borderRadius: '50%',
                        background: isCompleted
                          ? `${domain.color}15`
                          : isAvailable
                          ? 'rgba(5, 5, 20, 0.9)'
                          : 'rgba(20, 20, 30, 0.6)',
                        border: `1.5px solid ${
                          isCompleted ? domain.color : isAvailable ? domain.color : 'rgba(255,255,255,0.15)'
                        }`,
                        boxShadow: isAvailable
                          ? `0 0 15px ${domain.glowColor}`
                          : 'none',
                        cursor: isLocked ? 'default' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isLocked ? 'rgba(255,255,255,0.2)' : '#ffffff',
                        position: 'relative',
                        transition: 'all 0.35s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isLocked) {
                          e.currentTarget.style.transform = 'scale(1.12)';
                          e.currentTarget.style.boxShadow = `0 0 25px ${domain.color}`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLocked) {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = isAvailable ? `0 0 15px ${domain.glowColor}` : 'none';
                        }
                      }}
                    >
                      <span className="font-display text-[10px] opacity-45 uppercase mb-0.5">
                        Stage {idx + 1}
                      </span>
                      
                      {isLocked && <Lock size={12} />}
                      {isCompleted && <CheckCircle size={14} className="text-emerald-400 mt-0.5" />}
                      {isAvailable && <Play size={12} fill="currentColor" className="ml-0.5 mt-0.5" />}
                      
                      {isAvailable && (
                        <div
                          className="absolute -top-6 px-2 py-0.5 rounded text-[8px] tracking-wider uppercase font-display"
                          style={{
                            background: domain.color,
                            color: '#000000',
                            fontWeight: 'bold',
                            boxShadow: `0 0 8px ${domain.color}`,
                          }}
                        >
                          Active
                        </div>
                      )}
                    </button>

                    <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                      <span
                        className="font-display text-[9px] uppercase tracking-wider block"
                        style={{ color: isLocked ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.85)' }}
                      >
                        {stage.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
        {/* STAGE C: Game-like interactive gameplay */}
        {revealStage === 'gameplay' && currentStage && (
          <motion.div
            key="domain-gameplay-flow"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col justify-between"
            style={{ zIndex: 100 }}
          >
            {/* Gameplay Start Screen Cover */}
            {!gameStarted ? (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-6"
                style={{ background: 'rgba(3,3,10,0.95)', zIndex: 200 }}
              >
                <div
                  style={{
                    background: 'rgba(10,10,25,0.85)',
                    border: `1.5px solid ${domain.color}35`,
                    borderRadius: '16px',
                    padding: '32px 24px',
                    width: '100%',
                    maxWidth: '460px',
                    textAlign: 'center',
                    boxShadow: `0 0 30px ${domain.glowColor}`,
                  }}
                >
                  <span className="font-display text-[10px] tracking-widest uppercase block" style={{ color: domain.color }}>
                    {domain.name} World · Stage {currentStage.id.split('-')[1]}
                  </span>
                  <h2 className="font-display text-2xl text-white uppercase tracking-wider mt-1 mb-2">
                    {currentStage.title}
                  </h2>
                  <div
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.6rem',
                      color: 'rgba(255,255,255,0.4)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '2px 10px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      marginBottom: '20px',
                    }}
                  >
                    Difficulty: {activeDifficulty}
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed max-w-sm mx-auto mb-6">
                    {currentStage.description}
                  </p>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-left mb-8 space-y-2">
                    <span className="text-[9px] uppercase tracking-wider text-white/40 font-display block">Learning Objective</span>
                    <p className="text-xs text-white/90 leading-relaxed font-body">
                      {currentStage.learningObjective}
                    </p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setRevealStage('map')}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        color: 'rgba(255,255,255,0.6)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Back to Map
                    </button>
                    <button
                      onClick={() => handleStartGameplay(currentStage.id)}
                      style={{
                        background: domain.color,
                        border: `1px solid ${domain.color}`,
                        borderRadius: '8px',
                        padding: '10px 24px',
                        color: '#000000',
                        fontWeight: 'bold',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: `0 0 15px ${domain.glowColor}`,
                      }}
                    >
                      Start Challenge
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* HUD Header */}
                <div
                  className="flex justify-between items-center px-6 py-4"
                  style={{
                    background: 'rgba(5,5,15,0.92)',
                    borderBottom: `1px solid ${domain.color}25`,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div>
                    <span className="font-display text-[9px] tracking-widest uppercase block" style={{ color: domain.color }}>
                      {domain.name} World · Stage {currentStage.id.split('-')[1]}
                    </span>
                    <h2 className="font-display text-sm text-white uppercase tracking-wider mt-0.5">
                      {currentStage.title}
                    </h2>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="text-right">
                      <span className="text-[8px] uppercase tracking-widest text-white/30 block">Score</span>
                      <span className="font-display text-[10px] text-cyan-400 block">{gameScore} / 100</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] uppercase tracking-widest text-white/30 block">Difficulty</span>
                      <span className="font-display text-[10px] text-cyan-400 block">{activeDifficulty}</span>
                    </div>
                    <button
                      onClick={() => setGameStarted(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        padding: '4px',
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Central Workspace: Instruction Box + Interactive Board */}
                <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
                  
                  {/* Left instruction box */}
                  <div className="w-full md:w-80 bg-black/45 border-r border-white/5 p-6 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-6">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-white/40 font-display block">Concept Focus</span>
                        <span className="font-display text-white text-xs uppercase tracking-wider mt-1 block">â—ˆ {currentStage.concept}</span>
                      </div>
                      
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-white/40 font-display block">Instructions</span>
                        
                        {/* Science stages */}
                        {domain.id === 'science' && activeStageId === 'sci-01' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Set Frequency to **Green**, rate to exactly **4Hz**, and adjust temperature slider between **20Â°C and 40Â°C**.
                          </p>
                        )}
                        {domain.id === 'science' && activeStageId === 'sci-02' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Configure Pressure and Catalyst ratio. Easy rule: `Pressure * Catalyst = 40` (e.g. Pressure 20, Catalyst 2%). Maintain heat close to {activeDifficulty === 'HARD' ? (sciPressure * 5) : 250}K.
                          </p>
                        )}
                        {domain.id === 'science' && activeStageId === 'sci-03' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Investigate crystal healing pH. Shift temperature and select pH basicity (pH=8) and Blue wavelength.
                          </p>
                        )}
                        {domain.id === 'science' && activeStageId === 'sci-04' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Reactor fusion challenge! Wavelength=Blue, Pulse=8Hz, Temperature=30Â°C, Pressure=50, Catalyst=4, Heat=350.
                          </p>
                        )}

                        {/* Technology stages */}
                        {domain.id === 'technology' && activeStageId === 'tech-01' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Guide the drone from **Start (0,0)** to **Goal (2,2)**. Walls at (0,1).
                          </p>
                        )}
                        {domain.id === 'technology' && activeStageId === 'tech-02' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Longer path grid from **Start (0,0)** to **Goal (3,3)**. Walls block direct coordinate paths.
                          </p>
                        )}
                        {domain.id === 'technology' && activeStageId === 'tech-03' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            The initial loaded program sequence crashes. Rearrange commands to route the drone to Goal (3,3).
                          </p>
                        )}
                        {domain.id === 'technology' && activeStageId === 'tech-04' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Grid contains repeat blockers. Use the `REPEAT_2` block card to save steps and reach Goal (3,3).
                          </p>
                        )}

                        {/* Engineering stages */}
                        {domain.id === 'engineering' && activeStageId === 'eng-01' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Bridge builder! Load is 500kg. Build within $500 budget limit. Wood=$100, Steel=$200, Cable=$300.
                          </p>
                        )}
                        {domain.id === 'engineering' && activeStageId === 'eng-02' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Extended bridge requires 4 slots. Carriage weight is 800kg. Budget cap is $700. Mid sections need steel reinforcements.
                          </p>
                        )}
                        {domain.id === 'engineering' && activeStageId === 'eng-03' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            The wooden spans buckle under 1000kg load. Replace center girders with Steel or Carbon Cable to stabilize. Limit is $800.
                          </p>
                        )}
                        {domain.id === 'engineering' && activeStageId === 'eng-04' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Build columns for wind anchors launchpad. Required column strength: 16. Mid sections must use Carbon Cable anchors. Budget: $800.
                          </p>
                        )}

                        {/* Mathematics stages */}
                        {domain.id === 'mathematics' && activeStageId === 'math-01' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Analyze triangular progression: **1 â†’ 3 â†’ 6 â†’ 10 â†’ ?**. Deduce value and select rule.
                          </p>
                        )}
                        {domain.id === 'mathematics' && activeStageId === 'math-02' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Analyze Fibonacci series: **1 â†’ 1 â†’ 2 â†’ 3 â†’ 5 â†’ 8 â†’ 13 â†’ ?**. Deduce next index and select golden summation rule.
                          </p>
                        )}
                        {domain.id === 'mathematics' && activeStageId === 'math-03' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Weight balance: *â€œ2 Triangles = 3 Circles. 1 Circle = 2 Squares. How many Squares balance 1 Triangle?â€*
                          </p>
                        )}
                        {domain.id === 'mathematics' && activeStageId === 'math-04' && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5">
                            Arithmetic & Geometric Lock A & B ciphers. Find terms for A (2â†’4â†’8â†’16â†’?) and B (3â†’7â†’11â†’15â†’?), and enter their sum.
                          </p>
                        )}

                      </div>

                      <div className="pt-4 border-t border-white/5 space-y-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/40">Attempts:</span>
                          <span className="font-display text-white">{attempts}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-2">
                      <button
                        onClick={() => {
                          handleHintQuery();
                          setHintLevel((prev) => (prev < 3 ? (prev + 1) as any : 3));
                        }}
                        className="w-full flex items-center justify-center gap-2 text-xs py-2 rounded font-display tracking-wider uppercase border border-cyan-400/20 text-cyan-400 bg-cyan-400/5 hover:bg-cyan-400/12 transition-all cursor-pointer"
                      >
                        <HelpCircle size={13} />
                        Get Hint (Tier {hintLevel})
                      </button>

                      <AnimatePresence>
                        {showHintMsg && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="p-2.5 rounded bg-cyan-400/5 border border-cyan-400/15 text-[10px] text-cyan-300 leading-relaxed relative"
                          >
                            <button
                              onClick={() => setShowHintMsg(false)}
                              className="absolute top-1.5 right-1.5 text-white/30 hover:text-white/60 cursor-pointer"
                            >
                              <X size={10} />
                            </button>
                            <strong>Clue {hintLevel}:</strong>{' '}
                            {domain.id === 'science' && activeStageId === 'sci-01' && (
                              hintLevel === 1 ? 'Frequency wavelength must be set to Green.' : hintLevel === 2 ? 'Green frequency excites at temperate thresholds. Heat Temperature core needs exactly 30Â°C.' : 'Set Wavelength to Green, Pulse to 4, and Temperature to 30Â°C.'
                            )}
                            {domain.id === 'science' && activeStageId === 'sci-02' && (
                              hintLevel === 1 ? 'Choose pressure and catalyst values that multiply to exactly 40.' : hintLevel === 2 ? 'Try setting Pressure to 20, Catalyst to 2%, and Heat close to 250K.' : `Easy configuration is Pressure 20, Catalyst 2, and Heat ${activeDifficulty === 'HARD' ? 100 : 250}.`
                            )}
                            {domain.id === 'science' && activeStageId === 'sci-03' && (
                              hintLevel === 1 ? 'Select Blue Wavelength.' : hintLevel === 2 ? 'Lab reports state pH must reside at exactly 8.0.' : 'Slide pH to 8 and choose Blue wavelength.'
                            )}
                            {domain.id === 'science' && activeStageId === 'sci-04' && (
                              hintLevel === 1 ? 'Wavelength must be Blue and pulse frequency set to 8Hz.' : hintLevel === 2 ? 'Set Temperature to 30 and Pressure to 50.' : 'Wavelength=Blue, Pulse=8, Temperature=30, Pressure=50, Catalyst=4, Heat=350.'
                            )}

                            {domain.id === 'technology' && activeStageId === 'tech-01' && (
                              hintLevel === 1 ? 'Turn right first to face SOUTH.' : hintLevel === 2 ? 'Path is: Right, Forward, Left, Forward, Forward, Right, Forward.' : 'Turn Right, Forward, Turn Left, Forward, Forward, Turn Right, Forward.'
                            )}
                            {domain.id === 'technology' && activeStageId === 'tech-02' && (
                              hintLevel === 1 ? 'Direct lines are blocked. Path requires routing around obstacles.' : hintLevel === 2 ? 'Try going SOUTH then EAST: Right, Forward, Forward, Forward, Left, Forward, Forward, Forward.' : 'Turn Right, Forward, Forward, Forward, Turn Left, Forward, Forward, Forward.'
                            )}
                            {domain.id === 'technology' && activeStageId === 'tech-03' && (
                              hintLevel === 1 ? 'Loaded program goes straight into obstacles. Swap steps.' : hintLevel === 2 ? 'Remove the buggy LEFT commands or swap them for right turns.' : 'Correct program: Right, Forward, Left, Forward, Forward, Right, Forward.'
                            )}
                            {domain.id === 'technology' && activeStageId === 'tech-04' && (
                              hintLevel === 1 ? 'Repeat command card doubles the next action.' : hintLevel === 2 ? 'Use REPEAT_2 to move Forward twice.' : 'Program: Right, Forward, REPEAT_2, Forward, Left, REPEAT_2, Forward.'
                            )}

                            {domain.id === 'engineering' && activeStageId === 'eng-01' && (
                              hintLevel === 1 ? 'Wood beams are cheaper but weaker.' : hintLevel === 2 ? 'Use Steel trusses on Left and Right spans, and Wood in Center.' : 'Left=Steel, Center=Wood, Right=Steel. Cost is $500.'
                            )}
                            {domain.id === 'engineering' && activeStageId === 'eng-02' && (
                              hintLevel === 1 ? 'Span is wider. Center column support needs Steel.' : hintLevel === 2 ? 'Left=Steel, MidLeft=Steel, MidRight=Steel, Right=Wood. Total cost = $700.' : 'Set Left, Mid-Left, and Mid-Right to Steel, and Right to Wood.'
                            )}
                            {domain.id === 'engineering' && activeStageId === 'eng-03' && (
                              hintLevel === 1 ? 'The truck weighs 1000kg. Replace wooden center structures.' : hintLevel === 2 ? 'Left=Wood, Mid-Left=Steel, Mid-Right=Steel, Right=Wood. Total cost = $600.' : 'Replace middle spans with Steel or Carbon Cable to carry 1000kg load.'
                            )}
                            {domain.id === 'engineering' && activeStageId === 'eng-04' && (
                              hintLevel === 1 ? 'Launcher load is 2000kg. Anchor columns require high strength.' : hintLevel === 2 ? 'Left=Steel, Mid-Left=Cable, Mid-Right=Cable, Right=Wood. Cost is $800.' : 'Set Mid-Left and Mid-Right anchors to Carbon Cable columns.'
                            )}

                            {domain.id === 'mathematics' && activeStageId === 'math-01' && (
                              hintLevel === 1 ? 'Identify differences between numbers.' : hintLevel === 2 ? 'Increments are +2, +3, +4. Next term is +5.' : 'Answer is 15. Rule is Triangles (+2, +3, +4, +5 successively).'
                            )}
                            {domain.id === 'mathematics' && activeStageId === 'math-02' && (
                              hintLevel === 1 ? 'Fibonacci series summation logic applies.' : hintLevel === 2 ? '8 + 13 = 21.' : 'Select answer 21 and choose Fibonacci Rule.'
                            )}
                            {domain.id === 'mathematics' && activeStageId === 'math-03' && (
                              hintLevel === 1 ? 'If 1 Circle = 2 Squares, then 3 Circles = 6 Squares.' : hintLevel === 2 ? 'Since 2 Triangles = 3 Circles, then 2 Triangles = 6 Squares.' : '1 Triangle is equal to 3 Squares. Choose 3.'
                            )}
                            {domain.id === 'mathematics' && activeStageId === 'math-04' && (
                              hintLevel === 1 ? 'Find next term in geometric (2,4,8,16->32) and arithmetic (3,7,11,15->19) series.' : hintLevel === 2 ? 'Cylinder code A=32, B=19.' : 'Code A=32, B=19. Sum is 51.'
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right pane: Interactive game boards */}
                  <div className="flex-1 flex flex-col justify-between p-6 bg-black/15 relative overflow-y-auto">
                    <div className="flex-1 flex items-center justify-center py-4">
                      <div
                        style={{
                          background: 'rgba(5,5,15,0.78)',
                          border: `1.5px solid ${domain.color}35`,
                          boxShadow: `0 0 20px ${domain.glowColor}`,
                          borderRadius: '16px',
                          width: '100%',
                          maxWidth: '520px',
                          padding: '24px',
                          position: 'relative',
                        }}
                      >
                        
                        {/* â”€â”€ SCIENCE GAMES PANEL â”€â”€ */}
                        {domain.id === 'science' && (
                          <div className="space-y-6 text-center">
                            
                            {/* Wavelength Laser visual */}
                            <div className="flex justify-center relative py-4">
                              <div className="w-24 h-24 rounded-full border border-cyan-500/15 flex items-center justify-center relative bg-cyan-950/20">
                                <div
                                  className="w-6 h-6 rounded-full bg-cyan-400 shadow-[0_0_12px_#00e5ff] animate-pulse"
                                  style={{
                                    backgroundColor: sciWavelength === 'Red' ? '#ff3b30' : sciWavelength === 'Green' ? '#34c759' : '#007aff',
                                    boxShadow: `0 0 15px ${sciWavelength === 'Red' ? '#ff3b30' : sciWavelength === 'Green' ? '#34c759' : '#007aff'}`,
                                  }}
                                />
                                {sciResonanceActive && (
                                  <motion.div
                                    animate={{ scale: [1, 2, 1], opacity: [0.3, 0.8, 0.3] }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                    className="absolute inset-0 rounded-full border-2 border-emerald-400"
                                  />
                                )}
                              </div>
                              
                              {sciResonanceActive && (
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                  <line
                                    x1="10%" y1="50%" x2="50%" y2="50%"
                                    stroke={sciWavelength === 'Red' ? '#ff3b30' : sciWavelength === 'Green' ? '#34c759' : '#007aff'}
                                    strokeWidth="3.5"
                                    strokeDasharray="4, 4"
                                  />
                                </svg>
                              )}
                            </div>

                            {/* Controls for Wavelength & Pulse (Visible in Stage 1, 3, 4) */}
                            {(activeStageId === 'sci-01' || activeStageId === 'sci-03' || activeStageId === 'sci-04') && (
                              <div className="grid grid-cols-2 gap-4 text-left">
                                <div>
                                  <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1.5 font-display">Frequency Wavelength</label>
                                  <div className="flex gap-2">
                                    {(['Red', 'Green', 'Blue'] as const).map((wl) => (
                                      <button
                                        key={wl}
                                        onClick={() => { playHoverSound(); setSciWavelength(wl); }}
                                        style={{
                                          padding: '4px 10px',
                                          borderRadius: '4px',
                                          fontSize: '0.62rem',
                                          fontFamily: 'var(--font-display)',
                                          background: sciWavelength === wl ? domain.color : 'rgba(255,255,255,0.05)',
                                          border: `1.5px solid ${sciWavelength === wl ? domain.color : 'rgba(255,255,255,0.15)'}`,
                                          color: sciWavelength === wl ? '#000000' : 'rgba(255,255,255,0.7)',
                                          cursor: 'pointer',
                                          transition: 'all 0.2s',
                                        }}
                                      >
                                        {wl}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {activeStageId !== 'sci-03' && (
                                  <div>
                                    <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1.5 font-display">Pulse Rate Laser</label>
                                    <div className="flex gap-1.5">
                                      {([1, 2, 4, 8] as const).map((pl) => (
                                        <button
                                          key={pl}
                                          onClick={() => {
                                            playHoverSound();
                                            if (activeStageId === 'sci-04') setSciFusionPulse(pl);
                                            else setSciPulse(pl);
                                          }}
                                          style={{
                                            width: '28px',
                                            height: '24px',
                                            borderRadius: '4px',
                                            fontSize: '0.62rem',
                                            fontFamily: 'var(--font-display)',
                                            background: (activeStageId === 'sci-04' ? sciFusionPulse === pl : sciPulse === pl) ? domain.color : 'rgba(255,255,255,0.05)',
                                            border: `1.5px solid ${(activeStageId === 'sci-04' ? sciFusionPulse === pl : sciPulse === pl) ? domain.color : 'rgba(255,255,255,0.15)'}`,
                                            color: (activeStageId === 'sci-04' ? sciFusionPulse === pl : sciPulse === pl) ? '#000000' : 'rgba(255,255,255,0.7)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                          }}
                                        >
                                          {pl}H
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Controls for Variables & pressure/heat (Visible in Stage 2, 4) */}
                            {(activeStageId === 'sci-02' || activeStageId === 'sci-04') && (
                              <div className="grid grid-cols-2 gap-4 text-left border-t border-white/5 pt-4">
                                <div>
                                  <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1.5 font-display">Pressure (atm): {sciPressure}</label>
                                  <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="5"
                                    value={sciPressure}
                                    onChange={(e) => setSciPressure(parseInt(e.target.value))}
                                    className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded cursor-pointer"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1.5 font-display">Catalyst ratio: {sciCatalyst}%</label>
                                  <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="1"
                                    value={sciCatalyst}
                                    onChange={(e) => setSciCatalyst(parseInt(e.target.value))}
                                    className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded cursor-pointer"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Temperature controls */}
                            {(activeStageId === 'sci-01' || activeStageId === 'sci-04') && (
                              <div className="text-left pt-2 border-t border-white/5">
                                <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-2 font-display">
                                  Cellular Temperature Lock: {sciTemp}Â°C
                                </label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={sciTemp}
                                  onChange={(e) => setSciTemp(parseInt(e.target.value))}
                                  className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded cursor-pointer"
                                />
                              </div>
                            )}

                            {/* Reactor Heat controls */}
                            {(activeStageId === 'sci-02' || activeStageId === 'sci-04') && (
                              <div className="text-left pt-2">
                                <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-2 font-display">
                                  Fusion Thermal Core Heat: {sciHeat} K
                                </label>
                                <input
                                  type="range"
                                  min="100"
                                  max="500"
                                  step="10"
                                  value={sciHeat}
                                  onChange={(e) => setSciHeat(parseInt(e.target.value))}
                                  className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded cursor-pointer"
                                />
                              </div>
                            )}

                            {/* pH controls for Stage 3 */}
                            {activeStageId === 'sci-03' && (
                              <div className="text-left pt-2 border-t border-white/5">
                                <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-2 font-display">
                                  Compound Acidic/Basic pH scale: pH {sciPH}
                                </label>
                                <input
                                  type="range"
                                  min="1"
                                  max="14"
                                  step="1"
                                  value={sciPH}
                                  onChange={(e) => setSciPH(parseInt(e.target.value))}
                                  className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded cursor-pointer"
                                />
                              </div>
                            )}

                            <button
                              onClick={handleScienceExperiment}
                              disabled={sciResonanceActive || gameSuccess}
                              className="w-full mt-4 font-display text-xs tracking-wider uppercase font-bold py-2.5 rounded text-black transition-all shadow"
                              style={{
                                background: domain.color,
                                border: `1.5px solid ${domain.color}`,
                                cursor: sciResonanceActive || gameSuccess ? 'default' : 'pointer',
                                opacity: sciResonanceActive || gameSuccess ? 0.5 : 1,
                              }}
                            >
                              {sciResonanceActive ? 'Experiment Running...' : 'Execute Lab Reaction'}
                            </button>

                          </div>
                        )}

                        {/* â”€â”€ TECHNOLOGY GAMES PANEL â”€â”€ */}
                        {domain.id === 'technology' && (
                          <div className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              
                              {/* Drone Grid */}
                              <div className="flex-1 flex items-center justify-center">
                                <div
                                  className="grid gap-2 border border-purple-500/20 p-2 rounded-lg bg-purple-950/5 relative"
                                  style={{
                                    gridTemplateColumns: `repeat(${getGridSize()}, minmax(0, 1fr))`,
                                  }}
                                >
                                  {[...Array(getGridSize() * getGridSize())].map((_, idx) => {
                                    const size = getGridSize();
                                    const y = Math.floor(idx / size);
                                    const x = idx % size;
                                    const obstacles = getTechObstacles();
                                    const isObstacle = obstacles.some((obs) => obs.x === x && obs.y === y);
                                    const goal = getGoalCoord();
                                    const isGoal = x === goal.x && y === goal.y;
                                    const hasDrone = droneX === x && droneY === y;
                                    const isPathTrail = dronePathSteps.some((step) => step.x === x && step.y === y) && !hasDrone;

                                    return (
                                      <div
                                        key={idx}
                                        className="w-12 h-12 rounded-md flex items-center justify-center text-[9px] font-display relative"
                                        style={{
                                          background: isObstacle
                                            ? 'rgba(239, 68, 68, 0.12)'
                                            : isGoal
                                            ? 'rgba(16, 185, 129, 0.12)'
                                            : 'rgba(255,255,255,0.02)',
                                          border: isObstacle
                                            ? '1.5px solid rgba(239, 68, 68, 0.4)'
                                            : isGoal
                                            ? '1.5px solid rgba(16, 185, 129, 0.4)'
                                            : '1px solid rgba(255,255,255,0.06)',
                                        }}
                                      >
                                        {isObstacle && <span className="text-red-500 font-bold">WALL</span>}
                                        {isGoal && !hasDrone && <span className="text-emerald-400 animate-pulse">GOAL</span>}
                                        {x === 0 && y === 0 && !hasDrone && <span className="text-white/20">START</span>}
                                        {isPathTrail && <div className="w-2.5 h-2.5 rounded-full bg-purple-400/40 animate-pulse absolute" />}
                                        
                                        {/* Drone Piece */}
                                        {hasDrone && (
                                          <motion.div
                                            layoutId="drone"
                                            animate={{
                                              rotate:
                                                droneDir === 'EAST'
                                                  ? 0
                                                  : droneDir === 'SOUTH'
                                                  ? 90
                                                  : droneDir === 'WEST'
                                                  ? 180
                                                  : 270,
                                            }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                            className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/40 ${
                                              droneCrash
                                                ? 'bg-red-600 shadow-[0_0_12px_#ef4444]'
                                                : 'bg-purple-500 shadow-[0_0_12px_#7b2fff]'
                                            }`}
                                          >
                                            <span className="text-[10px] font-bold">â–²</span>
                                          </motion.div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Sequence Code builder */}
                              <div className="w-full md:w-48 flex flex-col gap-2">
                                <span className="text-[9px] uppercase tracking-wider text-white/50 font-display block">Program steps</span>
                                <div className="h-32 border border-white/10 rounded bg-black/45 p-2 overflow-y-auto flex flex-col gap-1.5">
                                  {techProgram.length === 0 && (
                                    <span className="text-[10px] text-white/30 italic text-center m-auto">Empty Sequence</span>
                                  )}
                                  {techProgram.map((cmd, i) => (
                                    <div key={i} className="flex justify-between items-center text-[9px] bg-white/5 px-2 py-1 rounded border border-white/5">
                                      <span className="text-purple-400 font-display">Step {i + 1}: {cmd}</span>
                                      <button
                                        onClick={() => {
                                          playHoverSound();
                                          setTechProgram((prev) => prev.filter((_, idx) => idx !== i));
                                        }}
                                        className="text-white/40 hover:text-white/90 cursor-pointer"
                                      >
                                        <X size={10} />
                                      </button>
                                    </div>
                                  ))}
                                </div>

                                {/* Command Cards */}
                                <div className="grid grid-cols-2 gap-1.5">
                                  {[
                                    { cmd: 'FORWARD' as const, label: 'Move Forward' },
                                    { cmd: 'LEFT' as const, label: 'Turn Left' },
                                    { cmd: 'RIGHT' as const, label: 'Turn Right' },
                                    ...(activeStageId === 'tech-04'
                                      ? [{ cmd: 'REPEAT_2' as const, label: 'Repeat 2x' }]
                                      : []),
                                  ].map((b) => (
                                    <button
                                      key={b.cmd}
                                      onClick={() => {
                                        playHoverSound();
                                        if (techProgram.length < 8) {
                                          setTechProgram((prev) => [...prev, b.cmd]);
                                        }
                                      }}
                                      style={{
                                        fontSize: '0.52rem',
                                        padding: '5px',
                                        borderRadius: '4px',
                                        fontFamily: 'var(--font-display)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: '#ffffff',
                                        background: 'rgba(255,255,255,0.05)',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {b.label}
                                    </button>
                                  ))}
                                </div>

                                <button
                                  onClick={() => { playHoverSound(); setTechProgram([]); }}
                                  style={{
                                    fontSize: '0.6rem',
                                    fontFamily: 'var(--font-display)',
                                    color: 'rgba(255,255,255,0.4)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '4px',
                                  }}
                                >
                                  Clear Program
                                </button>
                              </div>

                            </div>

                            <button
                              onClick={handleTechnologyRun}
                              disabled={techProgram.length === 0 || droneRunning || gameSuccess}
                              style={{
                                width: '100%',
                                marginTop: '16px',
                                background: domain.color,
                                border: `1.5px solid ${domain.color}`,
                                borderRadius: '8px',
                                padding: '12px',
                                color: '#000000',
                                fontWeight: 'bold',
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.72rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                cursor: techProgram.length === 0 || droneRunning || gameSuccess ? 'default' : 'pointer',
                                opacity: techProgram.length === 0 || droneRunning || gameSuccess ? 0.5 : 1,
                                transition: 'all 0.25s ease',
                              }}
                            >
                              {droneRunning ? 'Executing Instructions...' : 'Run Commands'}
                            </button>
                          </div>
                        )}

                        {/* â”€â”€ ENGINEERING GAMES PANEL â”€â”€ */}
                        {domain.id === 'engineering' && (
                          <div className="space-y-6">
                            
                            {/* Bridge visualization panel */}
                            <div className="py-4 h-36 bg-black/45 rounded-lg relative overflow-hidden flex items-end justify-center">
                              <div className="absolute left-0 bottom-0 w-[20%] h-12 bg-white/10 border-t border-r border-white/20 rounded-tr" />
                              <div className="absolute right-0 bottom-0 w-[20%] h-12 bg-white/10 border-t border-l border-white/20 rounded-tl" />

                              {/* 3 slot spans (Stage 1) vs 4 slot spans (Stage 2, 3, 4) */}
                              {activeStageId === 'eng-01' ? (
                                <div className="absolute bottom-6 left-[20%] right-[20%] h-6 grid grid-cols-3 gap-2 px-1">
                                  {[
                                    { span: engLeftSpan, setSpan: setEngLeftSpan, name: 'Left' },
                                    { span: engCenterSpan, setSpan: setEngCenterSpan, name: 'Center' },
                                    { span: engRightSpan, setSpan: setEngRightSpan, name: 'Right' },
                                  ].map((col, index) => {
                                    const toggleBeam = () => {
                                      if (engTesting) return;
                                      playHoverSound();
                                      const sequence: EngBeam[] = ['EMPTY', 'WOOD', 'STEEL', 'CABLE'];
                                      const nextIdx = (sequence.indexOf(col.span) + 1) % sequence.length;
                                      col.setSpan(sequence[nextIdx]);
                                    };
                                    const details = BEAMS_DATA[col.span];
                                    return (
                                      <button
                                        key={index}
                                        onClick={toggleBeam}
                                        disabled={engTesting}
                                        style={{
                                          height: '14px',
                                          borderRadius: '3px',
                                          background: col.span === 'EMPTY' ? 'rgba(255,255,255,0.03)' : col.span === 'WOOD' ? 'brown' : col.span === 'STEEL' ? '#ff9500' : '#ff5533',
                                          border: `1px solid ${col.span === 'EMPTY' ? 'rgba(255,255,255,0.2)' : '#ff9500'}`,
                                          color: '#ffffff',
                                          fontSize: '0.45rem',
                                          cursor: 'pointer',
                                          width: '100%',
                                        }}
                                      >
                                        {col.span === 'EMPTY' ? `Slot ${col.name}` : details.name.split(' ')[0]}
                                      </button>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="absolute bottom-6 left-[20%] right-[20%] h-6 grid grid-cols-4 gap-1.5 px-1">
                                  {[
                                    { span: engLeftSpan, setSpan: setEngLeftSpan, name: 'L' },
                                    { span: engMidLeftSpan, setSpan: setEngMidLeftSpan, name: 'ML' },
                                    { span: engMidRightSpan, setSpan: setEngMidRightSpan, name: 'MR' },
                                    { span: engRightSpan, setSpan: setEngRightSpan, name: 'R' },
                                  ].map((col, index) => {
                                    const toggleBeam = () => {
                                      if (engTesting) return;
                                      playHoverSound();
                                      const sequence: EngBeam[] = ['EMPTY', 'WOOD', 'STEEL', 'CABLE'];
                                      const nextIdx = (sequence.indexOf(col.span) + 1) % sequence.length;
                                      col.setSpan(sequence[nextIdx]);
                                    };
                                    const details = BEAMS_DATA[col.span];
                                    return (
                                      <button
                                        key={index}
                                        onClick={toggleBeam}
                                        disabled={engTesting}
                                        style={{
                                          height: '14px',
                                          borderRadius: '3px',
                                          background: col.span === 'EMPTY' ? 'rgba(255,255,255,0.03)' : col.span === 'WOOD' ? 'brown' : col.span === 'STEEL' ? '#ff9500' : '#ff5533',
                                          border: `1px solid ${col.span === 'EMPTY' ? 'rgba(255,255,255,0.2)' : '#ff9500'}`,
                                          color: '#ffffff',
                                          fontSize: '0.42rem',
                                          cursor: 'pointer',
                                          width: '100%',
                                        }}
                                      >
                                        {col.span === 'EMPTY' ? col.name : details.name.split(' ')[0]}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}

                              {/* Rolling load Carriage */}
                              {engTesting && (
                                <motion.div
                                  style={{
                                    position: 'absolute',
                                    bottom: engCollapsed ? '10px' : '20px',
                                    left: `${engCarriagePos}%`,
                                    transform: 'translateX(-50%)',
                                    zIndex: 30,
                                    color: engCollapsed ? '#ef4444' : '#ff9500',
                                    transition: engCollapsed ? 'bottom 0.4s ease-in, color 0.2s' : 'none',
                                  }}
                                >
                                  <div className="w-8 h-5 bg-white border border-white/40 rounded flex items-center justify-center font-display text-[7px] text-black font-bold">
                                    {activeStageId === 'eng-01' ? '500kg' : activeStageId === 'eng-02' ? '800kg' : activeStageId === 'eng-03' ? '1000kg' : '2000kg'}
                                  </div>
                                </motion.div>
                              )}

                            </div>

                            {/* Cost check HUD */}
                            <div className="grid grid-cols-2 gap-4 text-xs font-display text-left border-t border-white/5 pt-4">
                              <div>
                                <span className="text-white/40 block text-[9px] uppercase">Budget spent</span>
                                <span
                                  className="font-bold text-sm block mt-0.5"
                                  style={{
                                    color:
                                      (BEAMS_DATA[engLeftSpan].cost +
                                        BEAMS_DATA[engMidLeftSpan].cost +
                                        BEAMS_DATA[engMidRightSpan].cost +
                                        BEAMS_DATA[engRightSpan].cost) >
                                      (activeStageId === 'eng-01' ? 500 : activeStageId === 'eng-02' ? 700 : 800)
                                        ? '#ef4444'
                                        : '#ffffff',
                                  }}
                                >
                                  $
                                  {BEAMS_DATA[engLeftSpan].cost +
                                    (activeStageId === 'eng-01' ? BEAMS_DATA[engCenterSpan].cost : BEAMS_DATA[engMidLeftSpan].cost) +
                                    (activeStageId === 'eng-01' ? 0 : BEAMS_DATA[engMidRightSpan].cost) +
                                    BEAMS_DATA[engRightSpan].cost}{' '}
                                  / ${activeStageId === 'eng-01' ? 500 : activeStageId === 'eng-02' ? 700 : 800}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={handleEngineeringTest}
                              disabled={engTesting || gameSuccess}
                              style={{
                                width: '100%',
                                background: domain.color,
                                border: `1.5px solid ${domain.color}`,
                                borderRadius: '8px',
                                padding: '12px',
                                color: '#000000',
                                fontWeight: 'bold',
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.72rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                cursor: engTesting || gameSuccess ? 'default' : 'pointer',
                                opacity: engTesting || gameSuccess ? 0.5 : 1,
                              }}
                            >
                              {engTesting ? 'Testing bridge truss...' : 'Test structure'}
                            </button>

                          </div>
                        )}

                        {/* â”€â”€ MATHEMATICS GAMES PANEL â”€â”€ */}
                        {domain.id === 'mathematics' && (
                          <div className="space-y-6 text-left">
                            
                            {/* Stage 1: Triangular */}
                            {activeStageId === 'math-01' && (
                              <div className="py-4 h-24 border border-green-500/10 rounded-lg bg-black/45 flex flex-col items-center justify-center">
                                <div className="flex gap-4 items-center">
                                  {['1', '3', '6', '10', '?'].map((val, idx) => (
                                    <React.Fragment key={idx}>
                                      <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center font-display text-white text-base">
                                        {val}
                                      </div>
                                      {idx < 4 && <ChevronRight size={14} className="text-white/20" />}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Stage 2: Fibonacci progression */}
                            {activeStageId === 'math-02' && (
                              <div className="py-4 h-24 border border-green-500/10 rounded-lg bg-black/45 flex flex-col items-center justify-center">
                                <div className="flex gap-3 items-center">
                                  {['1', '1', '2', '3', '5', '8', '13', '?'].map((val, idx) => (
                                    <React.Fragment key={idx}>
                                      <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center font-display text-white text-sm">
                                        {val}
                                      </div>
                                      {idx < 7 && <ChevronRight size={10} className="text-white/10" />}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Stage 3: Scales */}
                            {activeStageId === 'math-03' && (
                              <div className="py-4 h-24 border border-green-500/10 rounded-lg bg-black/45 flex flex-col items-center justify-center text-center">
                                <span className="text-[10px] text-green-300 font-display block uppercase mb-1">Scale balance constraints</span>
                                <span className="text-[11px] text-white/80 font-body block">
                                  2 Triangles = 3 Circles<br />
                                  1 Circle = 2 Squares
                                </span>
                              </div>
                            )}

                            {/* Stage 4: Locking ciphers */}
                            {activeStageId === 'math-04' && (
                              <div className="py-4 border border-green-500/10 rounded-lg bg-black/45 p-3 space-y-2">
                                <div className="flex justify-between text-[10px] font-body text-white/70">
                                  <span>Cylinder A: Geometric (2â†’4â†’8â†’16â†’?)</span>
                                  <span>Cylinder B: Arithmetic (3â†’7â†’11â†’15â†’?)</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                  <input
                                    type="text"
                                    placeholder="Value A"
                                    value={mathLockA}
                                    onChange={(e) => setMathLockA(e.target.value)}
                                    className="bg-black border border-white/10 rounded p-1.5 text-xs text-white text-center font-display"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Value B"
                                    value={mathLockB}
                                    onChange={(e) => setMathLockB(e.target.value)}
                                    className="bg-black border border-white/10 rounded p-1.5 text-xs text-white text-center font-display"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Standard inputs for stages */}
                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                              <div>
                                <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1.5 font-display">
                                  {activeStageId === 'math-04' ? 'Enter sum cipher (A + B)' : 'Choose missing (?) value'}
                                </label>
                                {activeStageId === 'math-03' || activeStageId === 'math-04' ? (
                                  <input
                                    type="text"
                                    placeholder="Enter number"
                                    value={mathAnswer}
                                    onChange={(e) => setMathAnswer(e.target.value)}
                                    className="w-full bg-black border border-white/15 rounded p-2 text-xs text-white font-display"
                                  />
                                ) : (
                                  <select
                                    value={mathAnswer}
                                    onChange={(e) => { playHoverSound(); setMathAnswer(e.target.value); }}
                                    className="w-full bg-black border border-white/15 rounded p-2 text-xs text-white"
                                  >
                                    <option value="">Select Value</option>
                                    <option value="12">12</option>
                                    <option value="15">15</option>
                                    <option value="21">21</option>
                                    <option value="24">24</option>
                                  </select>
                                )}
                              </div>

                              {activeStageId !== 'math-03' && activeStageId !== 'math-04' && (
                                <div>
                                  <label className="text-[9px] uppercase tracking-wider text-white/50 block mb-1.5 font-display">Sequence progression rule</label>
                                  <select
                                    value={mathRule}
                                    onChange={(e) => { playHoverSound(); setMathRule(e.target.value); }}
                                    className="w-full bg-black border border-white/15 rounded p-2 text-xs text-white"
                                  >
                                    <option value="">Select Logic</option>
                                    <option value="RULE_ADD">Double previous values</option>
                                    <option value="RULE_TRIANGLE">Add +2, +3, +4, +5 successively</option>
                                    <option value="RULE_FIB">Sum value of previous two terms</option>
                                  </select>
                                </div>
                              )}
                            </div>

                            <button
                              onClick={handleMathematicsSubmit}
                              disabled={gameSuccess}
                              className="w-full mt-4 font-display text-xs tracking-wider uppercase font-bold py-2.5 rounded text-black transition-all shadow"
                              style={{
                                background: domain.color,
                                border: `1.5px solid ${domain.color}`,
                                cursor: gameSuccess ? 'default' : 'pointer',
                                opacity: gameSuccess ? 0.5 : 1,
                              }}
                            >
                              Submit Formula
                            </button>
                          </div>
                        )}

                        {/* Interactive Feedback Overlay Panels */}
                        <AnimatePresence>
                          {feedbackType !== 'none' && (
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-4 p-3 rounded-lg border flex gap-3 text-left relative z-10"
                              style={{
                                background:
                                  feedbackType === 'success'
                                    ? 'rgba(16, 185, 129, 0.08)'
                                    : feedbackType === 'error'
                                    ? 'rgba(239, 68, 68, 0.08)'
                                    : 'rgba(255, 149, 0, 0.08)',
                                borderColor:
                                  feedbackType === 'success'
                                    ? 'rgba(16, 185, 129, 0.4)'
                                    : feedbackType === 'error'
                                    ? 'rgba(239, 68, 68, 0.4)'
                                    : 'rgba(255, 149, 0, 0.4)',
                              }}
                            >
                              <div className="flex gap-2">
                                <div className="text-left">
                                  <span
                                    className="font-display text-[9px] uppercase tracking-wider block font-bold"
                                    style={{
                                      color:
                                        feedbackType === 'success'
                                          ? '#10b981'
                                          : feedbackType === 'error'
                                          ? '#ef4444'
                                          : '#ff9500',
                                    }}
                                  >
                                    {feedbackType === 'success' ? 'Solution Verified!' : 'Verification Failure'}
                                  </span>
                                  <p className="text-[10px] text-white/80 leading-relaxed mt-1">
                                    {feedbackText}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    </div>

                    {/* Result triggers */}
                    {gameSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 mt-4"
                      >
                        <div className="text-center md:text-left">
                          <span className="text-[8px] uppercase tracking-wider text-emerald-400 block font-display">â—ˆ Core Synced</span>
                          <span className="text-[10px] text-white/60 block mt-0.5">Success conditions verified. Click continue.</span>
                        </div>
                        <button
                          onClick={handleSuccessResolution}
                          className="w-full md:w-auto px-6 py-2 rounded text-xs tracking-wider font-display uppercase font-bold cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black shadow-md"
                        >
                          Show Results
                        </button>
                      </motion.div>
                    )}

                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* â”€â”€ Stage Description Preview Modal â”€â”€ */}
      {selectedStageIdForPreview && (() => {
        const previewStage = domain.stages.find((s) => s.id === selectedStageIdForPreview);
        if (!previewStage) return null;
        return (
          <Modal
            isOpen={true}
            onClose={() => setSelectedStageIdForPreview(null)}
            title={`Stage Overview`}
            accentColor={domain.color}
          >
            <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }} className="space-y-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-white/40 block font-display">Stage Title</span>
                <span className="font-display text-white text-base tracking-wider uppercase block mt-1">{previewStage.title}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-white/40 block font-display">Description</span>
                <p className="text-white/70 leading-relaxed text-xs mt-1.5">{previewStage.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">Estimated Time</span>
                  <span className="font-display text-xs text-white block mt-0.5">{previewStage.estimatedTime}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">Difficulty</span>
                  <span className="font-display text-xs text-white block mt-0.5">{previewStage.difficulty}</span>
                </div>
              </div>

              <div className="pt-3">
                <span className="text-[9px] uppercase tracking-widest text-white/40 block">Learning Objective</span>
                <p className="text-white/60 leading-relaxed text-xs mt-1">{previewStage.learningObjective}</p>
              </div>

              <div className="flex justify-end gap-2 pt-6">
                <button
                  onClick={() => setSelectedStageIdForPreview(null)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.65rem',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => handleStartGameplay(previewStage.id)}
                  style={{
                    background: domain.color,
                    border: `1px solid ${domain.color}`,
                    borderRadius: '6px',
                    padding: '6px 16px',
                    color: '#000000',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: `0 0 10px ${domain.glowColor}`,
                  }}
                >
                  Start Challenge
                </button>
              </div>
            </div>
          </Modal>
        );
      })()}

      {/* â”€â”€ Challenge Cleared Success Modal Overlay â”€â”€ */}
      <AnimatePresence>
        {showResultScreen && currentStage && (
          <div
            className="fixed inset-0 flex items-center justify-center z-[150] px-4"
            style={{ background: 'rgba(2,2,8,0.85)', backdropFilter: 'blur(6px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'rgba(10,10,25,0.95)',
                border: '1px solid #10b981',
                boxShadow: '0 0 30px rgba(16,185,129,0.3)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '400px',
                padding: '30px 24px',
                textAlign: 'center',
              }}
            >
              <div className="w-16 h-16 rounded-full border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-4 bg-emerald-400/10">
                <Sparkles size={32} />
              </div>
              <h3 className="font-display text-white text-lg tracking-widest uppercase mb-1">
                Challenge Completed!
              </h3>
              <span className="text-[10px] text-emerald-400 font-display tracking-widest uppercase">
                Stage {currentStage.id.split('-')[1]} Completed
              </span>

              {/* Performance Summary Metrics */}
              <div className="mt-6 border-t border-b border-white/5 py-4 grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Attempts</span>
                  <span className="font-display text-xs text-white block mt-0.5">{attempts}</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Score</span>
                  <span className="font-display text-xs text-white block mt-0.5">{gameScore} / 100</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Hints Used</span>
                  <span className="font-display text-xs text-white block mt-0.5">{hintsUsed}</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Mastery Level</span>
                  <span className="font-display text-xs text-cyan-400 block mt-0.5">{getMasteryScoreName()}</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Duration</span>
                  <span className="font-display text-xs text-white block mt-0.5">{completionTimeSecs}s</span>
                </div>
              </div>

              {/* Adaptive Recommendation Panel */}
              <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded text-left space-y-1">
                <span className="text-[8px] text-white/40 uppercase font-display block">System Recommendation</span>
                <p className="text-[10px] text-white/70 leading-relaxed font-body">
                  {getRecommendationText()}
                </p>
              </div>

              {/* Notice when the 4th stage completes */}
              {currentStage.id.endsWith('04') && (
                <div className="mt-4 p-3 bg-cyan-400/5 border border-cyan-400/20 rounded-lg text-[10px] text-cyan-300 leading-relaxed text-left">
                  <strong>Path Completed!</strong> You have successfully finished the {domain.name} world map. The corresponding stone will be ready to claim in the upcoming finale.
                </div>
              )}

              <button
                onClick={handleCloseResultScreen}
                className="w-full mt-8 py-2.5 rounded font-display text-xs tracking-widest uppercase font-bold cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black shadow-md hover:shadow-lg transition-all"
              >
                Continue
              </button>
            </motion.div>
          </div>
        )}

        {/* STAGE D: Domain Completion Story Ceremony (Phase 9) */}
        {revealStage === 'completion-ceremony' && (
          <motion.div
            key="domain-completion-ceremony"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/95 overflow-y-auto"
            style={{ zIndex: 250 }}
          >
            {/* Ambient gravity hum */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${domain.color}15 0%, transparent 70%)`
                }}
              />
            </div>

            {/* CEREMONY STEP 1: Domain Core Activation */}
            {completionStep === 'core-init' && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-8 max-w-md z-10"
              >
                <div>
                  <span className="font-display text-[10px] tracking-widest uppercase" style={{ color: domain.color }}>
                    â—ˆ Integration Phase â—ˆ
                  </span>
                  <h2 className="font-display text-2xl text-white uppercase tracking-wider mt-2">
                    Universal {domain.name} Core
                  </h2>
                </div>

                {/* Animated Domain Core Graphic */}
                <div className="h-48 flex items-center justify-center relative">
                  {domain.id === 'science' && (
                    <div className="relative w-36 h-36 border border-cyan-400/20 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
                      <div className="absolute w-20 h-20 border border-dashed border-cyan-400/40 rounded-full" />
                      <div className="absolute w-8 h-8 rounded-full bg-cyan-400 shadow-[0_0_20px_#00e5ff] animate-pulse" />
                    </div>
                  )}
                  {domain.id === 'technology' && (
                    <div className="w-36 h-36 border border-purple-500/20 rounded-lg flex flex-col justify-between p-3 bg-purple-950/5 relative">
                      <div className="flex justify-between w-full h-1 border-b border-purple-500/30 grid grid-cols-6 divide-x divide-purple-500/20">
                        <div /><div /><div /><div /><div /><div />
                      </div>
                      <div className="w-10 h-10 border border-purple-500/40 rounded bg-purple-950/20 shadow-[0_0_15px_#7b2fff] m-auto flex items-center justify-center font-display text-[8px] text-purple-300">
                        CPU
                      </div>
                      <div className="flex justify-between w-full h-1 border-t border-purple-500/30 grid grid-cols-6 divide-x divide-purple-500/20">
                        <div /><div /><div /><div /><div /><div />
                      </div>
                    </div>
                  )}
                  {domain.id === 'engineering' && (
                    <div className="w-36 h-36 flex items-center justify-center relative">
                      <div className="w-20 h-20 border-2 border-dashed border-orange-500/40 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '12s' }}>
                        <div className="w-8 h-8 border border-orange-500/20 rounded-full" />
                      </div>
                      <div className="absolute w-12 h-12 border-2 border-dotted border-orange-500/30 rounded-full" />
                    </div>
                  )}
                  {domain.id === 'mathematics' && (
                    <div className="w-36 h-36 flex items-center justify-center relative">
                      <div className="w-20 h-20 border border-green-500/30 rounded flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
                        <div className="w-14 h-14 border border-green-500/20 transform rotate-45" />
                      </div>
                      <div className="absolute w-10 h-10 rounded bg-green-500/20 shadow-[0_0_15px_#00ff88]" />
                    </div>
                  )}
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-left">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 font-display block">System Status</span>
                  <p className="text-xs text-white/80 leading-relaxed font-body mt-1">
                    Containment field synchronized. The core is stable. The Tesseract requires terminal alignment to manifest the reward stone.
                  </p>
                </div>

                <button
                  onClick={() => {
                    playNodeClickSound();
                    setCompletionStep('portal-open');
                    setTimeout(() => {
                      if (!muted) audioSynth.playPortalOpen();
                      setCompletionStep('dialogue');
                    }, 2000);
                  }}
                  className="w-full py-3 rounded font-display text-xs tracking-widest uppercase font-bold cursor-pointer text-black hover:scale-102 transition-all shadow-lg"
                  style={{
                    background: domain.color,
                    boxShadow: `0 0 15px ${domain.glowColor}`,
                  }}
                >
                  Initiate Core Sync
                </button>
              </motion.div>
            )}

            {/* CEREMONY STEP 2: Portal Opening Overlay */}
            {completionStep === 'portal-open' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-6 max-w-md z-10"
              >
                <div className="w-24 h-24 rounded-full border border-cyan-400/20 flex items-center justify-center mx-auto relative animate-spin">
                  <div className="w-16 h-16 rounded-full border border-dashed border-cyan-400/40" />
                </div>
                <span className="font-display text-xs text-cyan-400 tracking-widest uppercase block animate-pulse">
                  â—ˆ Temporal Portal opening... â—ˆ
                </span>
              </motion.div>
            )}

            {/* CEREMONY STEP 3: Dialogue with Future Self */}
            {completionStep === 'dialogue' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col justify-end"
              >
                {/* Hologram spotlight */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{
                      opacity: [0.15, 0.45, 0.15],
                      scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{ duration: 4.0, repeat: Infinity }}
                    className="w-[280px] h-[280px] rounded-full border border-cyan-400/30 flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 35px rgba(0, 229, 255, 0.25)',
                    }}
                  >
                    <div className="w-20 h-20 rounded-full border border-cyan-400/10" />
                  </motion.div>
                </div>

                {/* Portal character model */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[180px] pointer-events-none">
                  <CharacterReveal phase="revealed" />
                </div>

                {/* completion dialogue logic selector */}
                {(() => {
                  const compDialogue = getDomainCompletionDialogue(domain.id);
                  const currentLine = compDialogue[ceremonyDialogueIdx] || compDialogue[0];
                  return (
                    <CinematicDialoguePanel
                      line={currentLine}
                      isVisible={true}
                      onAdvance={() => {
                        const lines = getDomainCompletionDialogue(domain.id);
                        if (ceremonyDialogueIdx + 1 < lines.length) {
                          setCeremonyDialogueIdx(prev => prev + 1);
                        } else {
                          setCompletionStep('stone-materialize');
                        }
                      }}
                      lineIndex={ceremonyDialogueIdx}
                      totalLines={compDialogue.length}
                    />
                  );
                })()}
              </motion.div>
            )}

            {/* CEREMONY STEP 4: Stone Materialization */}
            {completionStep === 'stone-materialize' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-8 max-w-sm z-10"
              >
                <div>
                  <span className="font-display text-[9px] tracking-widest uppercase block" style={{ color: domain.color }}>
                    â—ˆ Core Condensation â—ˆ
                  </span>
                  <h3 className="font-display text-white text-lg tracking-widest uppercase mt-1">
                    Manifesting Stone
                  </h3>
                </div>

                {/* Stone Visual Design (Ancient/Futuristic artifacts) */}
                <div className="h-44 flex items-center justify-center relative">
                  <motion.div
                    animate={{
                      rotateY: 360,
                      y: [0, -8, 0],
                    }}
                    transition={{
                      rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
                      y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: domain.id === 'technology' ? '12px' : '50%',
                      background: domain.color,
                      border: `2px solid ${domain.color}`,
                      boxShadow: `0 0 25px ${domain.glowColor}, inset 0 0 15px rgba(255,255,255,0.4)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-display)',
                      color: '#ffffff',
                    }}
                  >
                    â˜…
                  </motion.div>
                  <div className="absolute w-28 h-28 border border-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-left space-y-1">
                  <span className="text-[8px] uppercase tracking-wider text-white/40 block">Artifact Description</span>
                  <p className="text-xs text-white/70 leading-relaxed font-body">
                    {domain.id === 'science' ? 'A crystalline octahedron shard pulsing with Science discovery energy.'
                     : domain.id === 'technology' ? 'A circuit matrix core humming with Technology system logic.'
                     : domain.id === 'engineering' ? 'A hexagonal gear-prism structural block resisting collapse.'
                     : 'A green dodecahedron inscribed with Mathematics Axiom vectors.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (!muted) audioSynth.playTesseractWake();
                    
                    // Dispatch stone collection to reducer!
                    dispatch({
                      type: 'COLLECT_STONE',
                      stoneId: domain.stoneId,
                      domainId: domain.id,
                    });

                    // Lock Moralestones dialogue index and advance
                    setCeremonyDialogueIdx(0);
                    setCompletionStep('stone-claimed');
                  }}
                  className="w-full py-3 rounded font-display text-xs tracking-widest uppercase font-bold cursor-pointer text-black hover:scale-102 transition-all shadow"
                  style={{
                    background: domain.color,
                    boxShadow: `0 0 15px ${domain.glowColor}`,
                  }}
                >
                  Claim Reward Stone
                </button>
              </motion.div>
            )}

            {/* CEREMONY STEP 5: Claimed & Final Warning dialog */}
            {completionStep === 'stone-claimed' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col justify-end"
              >
                {/* Visual backdrop of Tesseract reaction pulse */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 2.5, 1], opacity: [0.1, 0.45, 0.1] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="w-64 h-64 rounded-full border-2 border-dashed flex items-center justify-center"
                    style={{
                      borderColor: domain.color,
                      boxShadow: `0 0 45px ${domain.glowColor}`,
                    }}
                  >
                    <span className="text-[12px] uppercase font-display text-white/40">Tesseract Core Locked</span>
                  </motion.div>
                </div>

                {/* Portal character model */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[180px] pointer-events-none">
                  <CharacterReveal phase="revealed" />
                </div>

                {/* dialogue hook selection */}
                {(() => {
                  // Count includes current collected stones list
                  const totalStonesHeld = state.player.collectedStones.length;
                  const isFourthStone = totalStonesHeld >= 4;

                  const dialogueLine: DialogueLine = isFourthStone
                    ? FOURTH_STONE_HOOK_DIALOGUE[ceremonyDialogueIdx]
                    : {
                        id: 'stone-c-post',
                        speakerId: 'future-self',
                        speakerName: 'Future Morales',
                        text: `One path has been completed, Morales. ${4 - totalStonesHeld} remain. The Tesseract is beginning to awaken. Keep moving.`,
                        emotion: 'serious',
                      };

                  return (
                    <CinematicDialoguePanel
                      line={dialogueLine}
                      isVisible={true}
                      onAdvance={() => {
                        if (isFourthStone && ceremonyDialogueIdx + 1 < FOURTH_STONE_HOOK_DIALOGUE.length) {
                          setCeremonyDialogueIdx(prev => prev + 1);
                        } else {
                          setCompletionStep('reflection');
                        }
                      }}
                      lineIndex={ceremonyDialogueIdx}
                      totalLines={isFourthStone ? FOURTH_STONE_HOOK_DIALOGUE.length : 1}
                    />
                  );
                })()}
              </motion.div>
            )}

            {/* CEREMONY STEP 6: Learning Summary + Reflection choice */}
            {completionStep === 'reflection' && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-[440px] bg-black/60 border border-white/10 rounded-2xl p-6 text-left space-y-6 z-10 shadow-2xl relative animate-fade-in"
              >
                <div className="text-center">
                  <span className="font-display text-[9px] tracking-widest uppercase block" style={{ color: domain.color }}>
                    Journey Complete
                  </span>
                  <h3 className="font-display text-white text-base tracking-widest uppercase mt-1">
                    {domain.name} World Mastered
                  </h3>
                </div>

                {/* Summarized Focus concepts */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-[8px] uppercase tracking-wider text-white/40 block font-display">Core Concepts Explored</span>
                  <p className="text-xs text-white/80 leading-relaxed font-body mt-1.5">
                    {domain.id === 'science' ? 'â—ˆ Observation  â—ˆ Controlled Variables  â—ˆ Deductive reasoning'
                     : domain.id === 'technology' ? 'â—ˆ Algorithmic Sequence  â—ˆ Error correction  â—ˆ Loop Repetitions'
                     : domain.id === 'engineering' ? 'â—ˆ Load girder trusses  â—ˆ Torque stress  â—ˆ Structural anchors'
                     : 'â—ˆ Progression differences  â—ˆ Golden ratio  â—ˆ Matrix cipher lock'}
                  </p>
                </div>

                {/* Adaptive score check summary */}
                <div className="grid grid-cols-2 gap-4 text-xs font-display">
                  <div>
                    <span className="text-[8px] text-white/40 block uppercase">Completeness</span>
                    <span className="text-white block mt-0.5">Stages: 4 / 4 solved</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-white/40 block uppercase">Mastery level</span>
                    <span className="text-cyan-400 block mt-0.5">{getMasteryScoreName()}</span>
                  </div>
                </div>

                {/* Personal Reflection Survey Choice */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <span className="text-[8px] uppercase tracking-wider text-white/40 font-display block">Personal Learning Reflection</span>
                  <div className="space-y-1.5 pt-1">
                    {[
                      'I understood this well.',
                      'I need more practice.',
                      'I want a harder challenge.',
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2.5 p-2 bg-white/5 hover:bg-white/8 rounded border border-white/5 cursor-pointer transition-all"
                      >
                        <input
                          type="radio"
                          name="reflection"
                          value={option}
                          checked={reflectionOption === option}
                          onChange={(e) => {
                            playHoverSound();
                            setReflectionOption(e.target.value);
                            localStorage.setItem('stem_reflection_' + domain.id, e.target.value);
                          }}
                          className="accent-cyan-400"
                        />
                        <span className="text-[10px] text-white/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* System Adaptive suggestion box */}
                <div className="p-3 bg-white/5 border border-white/10 rounded">
                  <span className="text-[8px] text-white/40 uppercase font-display block">Adaptive Recommendation</span>
                  <p className="text-[9px] text-white/60 leading-relaxed font-body mt-1">
                    {state.player.collectedStones.length >= 4 
                      ? 'ALL FOUR STONES COLLECTED. Return to the main hub. The final portal coordinates are active.'
                      : 'Recommendation: Proceed to the next locked gates in the main chamber platform.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    playNodeClickSound();
                    
                    // Exit the world and return to central Hub!
                    dispatch({ type: 'EXIT_DOMAIN' });
                    navigateTo('MAIN_INTERFACE');
                  }}
                  disabled={!reflectionOption}
                  className="w-full py-2.5 rounded font-display text-xs tracking-widest uppercase font-bold cursor-pointer text-black transition-all shadow"
                  style={{
                    background: reflectionOption ? domain.color : 'rgba(255,255,255,0.05)',
                    color: reflectionOption ? '#000000' : 'rgba(255,255,255,0.3)',
                    cursor: reflectionOption ? 'pointer' : 'default',
                    opacity: reflectionOption ? 1 : 0.4,
                  }}
                >
                  Return to Main Interface
                </button>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* â”€â”€ Future-Self portal guidance dialogue event overlay â”€â”€ */}
      <AnimatePresence>
        {activePortalDialogue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex flex-col justify-end"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(5,5,25,0.78) 0%, rgba(0,0,0,0.92) 80%)',
            }}
          >
            {/* Hologram spotlight */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{
                  opacity: [0.15, 0.45, 0.15],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 4.0, repeat: Infinity }}
                className="w-[280px] h-[280px] rounded-full border border-cyan-400/30 flex items-center justify-center"
                style={{
                  boxShadow: '0 0 35px rgba(0, 229, 255, 0.25)',
                }}
              >
                <FlaskConical size={76} className="text-cyan-400 opacity-20 animate-pulse" />
              </motion.div>
            </div>

            {/* Portal character model */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[180px] pointer-events-none">
              <CharacterReveal phase="revealed" />
            </div>

            <CinematicDialoguePanel
              line={activePortalDialogue}
              isVisible={true}
              onAdvance={() => {
                setActivePortalDialogue(null);
                // Redirect straight to result panel on completed actions
                if (gameSuccess) {
                  setShowResultScreen(true);
                }
              }}
              lineIndex={0}
              totalLines={1}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
