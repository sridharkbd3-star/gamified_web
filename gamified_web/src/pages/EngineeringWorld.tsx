import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  CheckCircle,
  Lock,
  Award,
  Lightbulb,
  ArrowLeft,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Zap,
  Star,
  Shield
} from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { DemoModeOverlay } from '../components/demo/DemoModeOverlay';
import { useTranslation } from 'react-i18next';
import { getLocalizedLevel } from '../utils/levelUtils';
import { MissionCharacterDisplay } from '../components/ui/MissionCharacterDisplay';
import { ShieldAIChatbot } from '../components/ui/ShieldAIChatbot';
import { getConceptExplanation } from '../utils/conceptExplanations';
import { ENGINEERING_LEVELS, getLevelsByStage } from '../data/engineeringLevels';
import type { EngLevel } from '../data/engineeringLevels';
import { audioSynth } from '../utils/audio';

// ── ENVIRONMENT PER STAGE ─────────────────────────────────
const getMissionEnvironment = (level: EngLevel) => {
  if (level.stage === 1) {
    return {
      name: "Engineering Workshop",
      themeColor: "#ff9500",
      icon: "⚙️",
      stageTag: "STAGE 1 — FOUNDATIONS",
      ambientSpots: (
        <>
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#ff9500]/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
        </>
      ),
      environmentalDecoration: (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,149,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,149,0,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-[#ff9500] animate-ping" />
          <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" style={{ animationDelay: '1.5s' }} />
        </div>
      ),
      missionSuccessText: "⚙️ DESIGN APPROVED!",
      missionSuccessSubtext: "Structural integrity confirmed!"
    };
  } else if (level.stage === 2) {
    return {
      name: "Mechanical Assembly Plant",
      themeColor: "#f59e0b",
      icon: "🛠️",
      stageTag: "STAGE 2 — MECHANICAL",
      ambientSpots: (
        <>
          <div className="absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full bg-[#f59e0b]/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
        </>
      ),
      environmentalDecoration: (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
        </div>
      ),
      missionSuccessText: "🛠️ MACHINE REPAIRED!",
      missionSuccessSubtext: "Mechanical system operating smoothly!"
    };
  } else if (level.stage === 3) {
    return {
      name: "Robotics Testing Facility",
      themeColor: "#e65100",
      icon: "🦾",
      stageTag: "STAGE 3 — ELECTRICAL & ROBOTICS",
      ambientSpots: (
        <>
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#e65100]/5 blur-[120px] pointer-events-none" />
        </>
      ),
      environmentalDecoration: (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(230,81,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(230,81,0,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
      ),
      missionSuccessText: "🦾 ROBOT SYSTEM READY!",
      missionSuccessSubtext: "Robotic controls active!"
    };
  } else {
    return {
      name: "Future City Design Center",
      themeColor: "#ff9500",
      icon: "🏗️",
      stageTag: "STAGE 4 — MASTERY",
      ambientSpots: (
        <>
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#ff9500]/5 blur-[120px] pointer-events-none" />
        </>
      ),
      environmentalDecoration: (
        <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,149,0,0.06) 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
        </div>
      ),
      missionSuccessText: "🏗️ ENGINEERING MASTERED!",
      missionSuccessSubtext: "Complete engineering mastery unlocked!"
    };
  }
};

// ── STUDENT-FRIENDLY LEVEL TEXTS ────────────────────────
const getSimplifiedLevelTexts = (level: EngLevel) => {
  const storyClean = level.story
    .replace(/auxiliary/gi, 'backup')
    .replace(/parameters/gi, 'settings')
    .replace(/analyze/gi, 'check')
    .replace(/verify/gi, 'test');

  const missionNum = String(level.levelNumber).padStart(2, '0');
  return {
    briefingTitle: level.missionTitle.replace(/MISSION \d+ — /, ''),
    briefingStory: storyClean,
    story: storyClean,
    objective: level.missionObjective,
    questionLabel: level.gameMechanic === 'CoordinateGame' ? 'Navigate the engineering vehicle!' : 'What is your answer?',
    conceptEx: level.learningObjective,
    hintText: level.hint,
    feedbackIncorrect: level.feedbackIncorrect,
    characterDialogue: `Mission ${missionNum}: ${storyClean}`,
    hintDialogue: level.hint,
    successDialogue: `Great work! You've mastered: ${level.primaryConcept}!`
  };
};

export const EngineeringWorld: React.FC = () => {
  const { state, dispatch, navigateTo } = useGameState();
  const { t } = useTranslation();

  const handleReturnToHub = () => {
    dispatch({ type: 'EXIT_DOMAIN' });
    navigateTo('MAIN_INTERFACE');
  };

  const [viewMode, setViewMode] = useState<'domain-map' | 'stage-levels' | 'gameplay'>('domain-map');
  const [selectedStageNum, setSelectedStageNum] = useState<number>(1);
  const [activeLevel, setActiveLevel] = useState<EngLevel | null>(null);
  const currentLevel = activeLevel ? getLocalizedLevel(activeLevel, t) : null;
  const [missionStarted, setMissionStarted] = useState(false);
  const [muted, setMuted] = useState(() => audioSynth.getMuted());
  const [showDemoOverlay, setShowDemoOverlay] = useState(false);

  const handleToggleMute = () => {
    const isNowMuted = audioSynth.toggleMute();
    setMuted(isNowMuted);
  };

  const [attempts, setAttempts] = useState(1);
  const [_hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [allocationState, setAllocationState] = useState<Record<string, number>>({});
  const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>([0, 0]);
  const [coordinatePath, setCoordinatePath] = useState<[number, number][]>([]);
  const [_droneCrashed, setDroneCrashed] = useState(false);

  const [bossPhaseIdx, setBossPhaseIdx] = useState<number>(0);
  const [bossCompletedPhases, setBossCompletedPhases] = useState<boolean[]>([false, false, false, false]);

  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showCeremony, setShowCeremony] = useState(false);
  const [earnedFragment, setEarnedFragment] = useState<string>('');
  const [showXpPop, setShowXpPop] = useState(false);

  const engLevelsCount = ENGINEERING_LEVELS.length;
  const completedEngLevels = ENGINEERING_LEVELS.filter(l => state.completedStageIds.includes(l.id));
  const overallEngProgress = Math.round((completedEngLevels.length / engLevelsCount) * 100);

  const isStageCompleted = (stageNum: number) => state.completedStageIds.includes(`eng-${stageNum}-10`);
  const isStageUnlocked = (stageNum: number) => stageNum === 1 || isStageCompleted(stageNum - 1);
  const isLevelUnlocked = (level: EngLevel) => {
    if (!isStageUnlocked(level.stage)) return false;
    if (level.levelNumber === 1) return true;
    return state.completedStageIds.includes(`eng-${level.stage}-${level.levelNumber - 1}`);
  };

  const playTone = (freq: number, duration: number, type: OscillatorType = 'sine') => {
    if (muted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  };

  const handleEnterStage = (stageNum: number) => {
    setSelectedStageNum(stageNum);
    setViewMode('stage-levels');
    playTone(300, 0.1, 'sine');
  };

  const handleEnterLevel = (level: EngLevel) => {
    setActiveLevel(level);
    setViewMode('gameplay');
    setAttempts(1);
    setHintsUsed(0);
    setShowHint(false);
    setInputValue('');
    setSelectedOption(null);
    setDroneCrashed(false);
    setShowFeedback(false);
    setMissionStarted(false);
    setShowXpPop(false);

    if (level.gameMechanic === 'ResourceAllocationGame' || level.gameMechanic === 'DragDropGame') {
      const init: Record<string, number> = {};
      level.gameData.itemsToAllocate?.forEach(item => { init[item.name] = 0; });
      setAllocationState(init);
    } else if (level.gameMechanic === 'CoordinateGame') {
      const start = level.gameData.startPoint || [0, 0];
      setCurrentCoordinate(start as [number, number]);
      setCoordinatePath([start as [number, number]]);
    } else if (level.gameMechanic === 'BossGame') {
      setBossPhaseIdx(0);
      setBossCompletedPhases([false, false, false, false]);
      const p1 = level.gameData.phases?.[0];
      if (p1?.gameMechanic === 'CoordinateGame') {
        const start = p1.gameData.startPoint || [0, 0];
        setCurrentCoordinate(start as [number, number]);
        setCoordinatePath([start as [number, number]]);
      } else if (p1?.gameMechanic === 'DragDropGame' || p1?.gameMechanic === 'ResourceAllocationGame') {
        const init: Record<string, number> = {};
        p1.gameData.itemsToAllocate?.forEach(item => { init[item.name] = 0; });
        setAllocationState(init);
      }
    }
    playTone(400, 0.1, 'sine');
  };

  const handleVerifyAnswer = () => {
    if (!activeLevel) return;
    let correct = false;
    let explanation = '';

    if (activeLevel.gameMechanic === 'PatternGame') {
      if (selectedOption === activeLevel.gameData.nextNumberCorrect) correct = true;
      else explanation = activeLevel.feedbackIncorrect;
    } else if (activeLevel.gameMechanic === 'EquationGame') {
      const val = parseInt(inputValue) || selectedOption;
      if (val === activeLevel.gameData.correctValue) correct = true;
      else explanation = activeLevel.feedbackIncorrect;
    } else if (activeLevel.gameMechanic === 'DragDropGame' || activeLevel.gameMechanic === 'ResourceAllocationGame') {
      const correctAlloc = activeLevel.gameData.correctAllocation || {};
      let matches = true;
      Object.keys(correctAlloc).forEach(k => { if (allocationState[k] !== correctAlloc[k]) matches = false; });
      if (matches) correct = true;
      else explanation = activeLevel.feedbackIncorrect;
    } else if (activeLevel.gameMechanic === 'CoordinateGame') {
      const tp = activeLevel.gameData.targetPoint || [0, 0];
      if (currentCoordinate[0] === tp[0] && currentCoordinate[1] === tp[1]) correct = true;
      else explanation = activeLevel.feedbackIncorrect;
    } else if (activeLevel.gameMechanic === 'LogicGame') {
      if (selectedOption === activeLevel.gameData.logicAnswer) correct = true;
      else explanation = activeLevel.feedbackIncorrect;
    } else if (activeLevel.gameMechanic === 'OptimizationGame') {
      if (selectedOption === activeLevel.gameData.optimalChoiceName) correct = true;
      else explanation = activeLevel.feedbackIncorrect;
    }

    if (correct) {
      setIsCorrect(true);
      setFeedbackText(`You've mastered: ${activeLevel.primaryConcept}!`);
      playTone(600, 0.3, 'sine');
      setShowFeedback(true);
      setShowXpPop(true);
      setTimeout(() => setShowXpPop(false), 2500);
    } else {
      setIsCorrect(false);
      setFeedbackText(explanation || 'Not quite — check your design calculations and try again!');
      setAttempts(a => a + 1);
      playTone(180, 0.4, 'triangle');
      setShowFeedback(true);
    }
  };

  const handleVerifyBossPhase = () => {
    if (!activeLevel?.gameData.phases) return;
    const phases = activeLevel.gameData.phases;
    const phase = phases[bossPhaseIdx];
    if (!phase) return;

    let correct = false;
    let explanation = '';

    if (phase.gameMechanic === 'CoordinateGame') {
      const tp = phase.gameData.targetPoint || [0, 0];
      if (currentCoordinate[0] === tp[0] && currentCoordinate[1] === tp[1]) correct = true;
      else explanation = 'Vehicle missed the target point. Try again!';
    } else if (phase.gameMechanic === 'EquationGame') {
      const val = parseInt(inputValue) || selectedOption;
      if (val === phase.gameData.correctValue) correct = true;
      else explanation = `Not quite! Check the calculation: ${phase.gameData.equation}`;
    } else if (phase.gameMechanic === 'LogicGame') {
      if (selectedOption === phase.gameData.logicAnswer) correct = true;
      else explanation = 'Engineering design error. Review principles and try again.';
    } else if (phase.gameMechanic === 'OptimizationGame') {
      if (selectedOption === phase.gameData.optimalChoiceName) correct = true;
      else explanation = 'Not the most optimal design choice. Try another option.';
    } else if (phase.gameMechanic === 'DragDropGame' || phase.gameMechanic === 'ResourceAllocationGame') {
      const ca = phase.gameData.correctAllocation || {};
      let ok = true;
      Object.keys(ca).forEach(k => { if (allocationState[k] !== ca[k]) ok = false; });
      if (ok) correct = true;
      else explanation = 'Load distribution is off. Adjust and try again!';
    }

    if (correct) {
      const updated = [...bossCompletedPhases];
      updated[bossPhaseIdx] = true;
      setBossCompletedPhases(updated);
      playTone(550, 0.25, 'sine');
      if (bossPhaseIdx < 3) {
        const nextIdx = bossPhaseIdx + 1;
        setBossPhaseIdx(nextIdx);
        setInputValue('');
        setSelectedOption(null);
        setDroneCrashed(false);
        const nextPhase = phases[nextIdx];
        if (nextPhase?.gameMechanic === 'CoordinateGame') {
          const s = nextPhase.gameData.startPoint || [0, 0];
          setCurrentCoordinate(s as [number, number]);
          setCoordinatePath([s as [number, number]]);
        } else if (nextPhase?.gameMechanic === 'DragDropGame' || nextPhase?.gameMechanic === 'ResourceAllocationGame') {
          const init: Record<string, number> = {};
          nextPhase.gameData.itemsToAllocate?.forEach(item => { init[item.name] = 0; });
          setAllocationState(init);
        }
      } else {
        setIsCorrect(true);
        setFeedbackText('All 4 phases complete! Engineering solution successful!');
        setShowFeedback(true);
        setShowXpPop(true);
        setTimeout(() => setShowXpPop(false), 2500);
      }
    } else {
      playTone(200, 0.35, 'sawtooth');
      alert(explanation || 'Not quite — try again!');
    }
  };

  const handleContinueNext = () => {
    if (!activeLevel) return;
    dispatch({ type: 'COMPLETE_STAGE', stageId: activeLevel.id });
    const newXp = (state.player.xp || 0) + activeLevel.xpReward;
    dispatch({ type: 'UPDATE_PLAYER', updates: { xp: newXp } });

    if (activeLevel.isBoss && activeLevel.stageFragmentReward) {
      const stageKey = `eng-0${activeLevel.stage}`;
      dispatch({ type: 'COMPLETE_STAGE', stageId: stageKey });
      setEarnedFragment(activeLevel.stageFragmentReward);
      setShowCeremony(true);
      if (activeLevel.stage === 4) {
        dispatch({ type: 'COLLECT_STONE', stoneId: 'engineering-stone', domainId: 'engineering' });
      }
    } else {
      setViewMode('stage-levels');
    }
    setActiveLevel(null);
  };

  const handleCloseCeremony = () => {
    setShowCeremony(false);
    setViewMode('domain-map');
  };

  const handleMoveCoordinate = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT', obstacles: [number, number][], gridSize: number) => {
    let [x, y] = currentCoordinate;
    if (dir === 'UP' && y < gridSize - 1) y += 1;
    if (dir === 'DOWN' && y > 0) y -= 1;
    if (dir === 'LEFT' && x > 0) x -= 1;
    if (dir === 'RIGHT' && x < gridSize - 1) x += 1;
    const hitObs = obstacles.some(obs => obs[0] === x && obs[1] === y);
    if (hitObs) {
      setDroneCrashed(true);
      playTone(150, 0.5, 'triangle');
      const start = activeLevel?.gameData.startPoint || [0, 0];
      setCurrentCoordinate(start as [number, number]);
      setCoordinatePath([start as [number, number]]);
      setTimeout(() => setDroneCrashed(false), 2000);
      return;
    }
    setCurrentCoordinate([x, y]);
    setCoordinatePath([...coordinatePath, [x, y]]);
    playTone(500, 0.05, 'sine');
  };

  // ── RENDER ──────────────────────────────────────────────
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-100 select-none"
      style={{ background: 'radial-gradient(circle at 50% 50%, #170a02 0%, #080301 100%)', fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,149,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,149,0,0.015) 1px, transparent 1px)`, backgroundSize: '24px 24px', zIndex: 1, pointerEvents: 'none' }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-[90px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#ff9500]/5 blur-[90px] pointer-events-none" style={{ zIndex: 1 }} />

      {/* Header */}
      <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between border-b border-amber-500/10 bg-[#0c0502]/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-amber-500/30 flex items-center justify-center bg-amber-500/5">
            <Wrench size={18} className="text-[#ff9500]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm tracking-[0.2em] font-bold text-slate-100 leading-none">ENGINEERING</span>
            <span className="text-[10px] tracking-widest text-[#ff9500] uppercase mt-0.5">TESSERACT STEM HERO</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <button
            onClick={() => setShowDemoOverlay(true)}
            title="Hackathon Demo Mode"
            className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-display text-[10px] font-bold tracking-widest uppercase transition-all shadow-[0_0_12px_rgba(245,158,11,0.15)] flex items-center gap-1.5 cursor-pointer"
          >
            <Zap size={12} className="text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">DEMO MODE</span>
          </button>
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs tracking-wider text-slate-500 uppercase">Progress</span>
            <span className="font-display text-sm text-[#ff9500] mt-0.5 font-bold">{completedEngLevels.length} / 40 ({overallEngProgress}%)</span>
          </div>
          <button onClick={handleToggleMute} className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center bg-[#1a0e0a] text-slate-400 hover:text-slate-200 transition-all cursor-pointer">
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button onClick={() => {
            if (viewMode === 'gameplay') { setViewMode('stage-levels'); setActiveLevel(null); }
            else if (viewMode === 'stage-levels') setViewMode('domain-map');
            else handleReturnToHub();
          }} className="px-4 py-2 rounded-lg border border-slate-800 bg-[#1a0e0a] hover:border-slate-700 text-xs font-display tracking-widest uppercase text-slate-300 transition-all cursor-pointer flex items-center gap-1.5">
            <ArrowLeft size={13} /> Back
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">

          {/* ── DOMAIN MAP ── */}
          {viewMode === 'domain-map' && (
            <motion.div key="domain-map" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              className="w-full flex flex-col lg:flex-row gap-8 items-center lg:items-stretch py-4">
              {/* Stone card */}
              <div className="w-full lg:w-5/12 flex flex-col justify-between p-6 rounded-2xl border border-amber-500/10 bg-[#170a03]/80 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <span className="font-display text-xs tracking-widest text-[#ff9500] uppercase block mb-1">{t('stageMap.centralRelic', 'Central Relic')}</span>
                  <h2 className="font-display text-xl tracking-wider text-slate-100 uppercase">{t('stones.engineeringStone', 'The Forge Stone')}</h2>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">{t('stageMap.engDesc', 'Master structural design, mechanics, electrical systems, and robotics. Complete all 4 Stage Bosses to unlock the Engineering Stone!')}</p>
                </div>
                <div className="my-8 flex justify-center items-center relative py-6">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute w-44 h-44 rounded-full border border-amber-500/15 border-dashed" />
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute w-36 h-36 rounded-full border border-[#ff9500]/10 border-dotted" />
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                      {[0, 1, 2, 3].map(i => {
                        const paths = ["M 50,50 L 50,15 A 35,35 0 0,0 15,50 Z", "M 50,50 L 85,50 A 35,35 0 0,0 50,15 Z", "M 50,50 L 50,85 A 35,35 0 0,0 85,50 Z", "M 50,50 L 15,50 A 35,35 0 0,0 50,85 Z"];
                        const completed = isStageCompleted(i + 1);
                        return <path key={i} d={paths[i]} fill={completed ? 'url(#engGlow)' : '#241003'} stroke="#ff9500" strokeWidth="1" className={completed ? 'animate-pulse' : 'opacity-40'} />;
                      })}
                      <defs>
                        <radialGradient id="engGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ff9500" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#8f4d00" stopOpacity="0.4" />
                        </radialGradient>
                      </defs>
                    </svg>
                    <div className="z-10 w-10 h-10 rounded-full bg-black/80 border border-amber-500/40 flex items-center justify-center shadow-lg">
                      <Wrench size={16} className="text-[#ff9500]" />
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-800/40 pt-4 flex justify-between items-center text-sm text-slate-500">
                  <span>{t('stageMap.fragmentsAcquired', 'Fragments Acquired')}:</span>
                  <span className="font-display text-[#ff9500] font-bold">{[1,2,3,4].filter(n => isStageCompleted(n)).length} / 4 {t('stageMap.secured', 'SECURED')}</span>
                </div>
              </div>

              {/* Stages */}
              <div className="w-full lg:w-7/12 flex flex-col gap-4">
                {[
                  { num: 1, title: `${t('stageMap.stage', 'STAGE')} 1 — ${t('stageMap.discover', 'DISCOVER')}`, desc: t('stageMap.engDesc1', 'Discover simple machines, levers, pulleys, gears, structural shapes, forces, and engineering design process.'), locked: false },
                  { num: 2, title: `${t('stageMap.stage', 'STAGE')} 2 — ${t('stageMap.understand', 'UNDERSTAND')}`, desc: t('stageMap.engDesc2', 'Design bridges, towers, mechanisms, electrical circuits, energy conversion, and material strength.'), locked: !isStageUnlocked(2) },
                  { num: 3, title: `${t('stageMap.stage', 'STAGE')} 3 — ${t('stageMap.lifeEarth', 'ADVANCED')}`, desc: t('stageMap.engDesc3', 'Build complex systems, robotics, pneumatic/hydraulic power, automation, and environmental engineering.'), locked: !isStageUnlocked(3) },
                  { num: 4, title: `${t('stageMap.stage', 'STAGE')} 4 — ${t('stageMap.mastery', 'MASTERY')}`, desc: t('stageMap.engDesc4', 'Master advanced structural engineering, aerodynamics, space launch systems, systems integration, and failure analysis.'), locked: !isStageUnlocked(4) }
                ].map(st => {
                  const completed = isStageCompleted(st.num);
                  return (
                    <div key={st.num} className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${completed ? 'border-amber-500/20 bg-amber-500/5' : st.locked ? 'border-slate-800 bg-[#0d0502]/40 opacity-55' : 'border-amber-500/20 bg-[#170a03]/80 hover:border-amber-500/40 hover:bg-[#241005]/80'}`}>
                      <div className="max-w-[420px]">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-xs tracking-wider font-semibold text-[#ff9500] uppercase">{t('stageMap.stage', 'STAGE')} {st.num}</span>
                          {completed && <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-display text-xs font-bold tracking-widest uppercase">✓ {t('stageMap.completed', 'Completed')}</span>}
                        </div>
                        <h3 className="font-display text-base tracking-wider text-slate-100 uppercase mt-0.5">{st.title}</h3>
                        <p className="text-sm text-slate-400 mt-1 leading-relaxed">{st.desc}</p>
                      </div>
                      <div className="flex sm:flex-col items-end gap-2 justify-between shrink-0">
                        {st.locked ? (
                          <div className="flex items-center gap-1.5 text-slate-500 font-display text-xs tracking-widest uppercase"><Lock size={14} /> {t('stageMap.locked', 'LOCKED')}</div>
                        ) : (
                          <button onClick={() => handleEnterStage(st.num)} className="px-5 py-2.5 rounded-xl border border-amber-500 bg-[#ff9500]/10 text-[#ff9500] font-display text-xs font-bold tracking-widest uppercase hover:bg-[#ff9500]/20 transition-all cursor-pointer shadow-[0_0_10px_rgba(255,149,0,0.1)]">
                            {t('stageMap.enterStage', 'ENTER STAGE')}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── STAGE LEVELS ── */}
          {viewMode === 'stage-levels' && (
            <motion.div key="stage-levels" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl py-4 flex flex-col items-center">
              <div className="text-center mb-8 max-w-xl">
                <span className="font-display text-xs tracking-widest text-[#ff9500] uppercase block mb-1">{t('stageMap.stage', 'STAGE')} {selectedStageNum}</span>
                <h1 className="font-display text-3xl tracking-wider text-white uppercase">
                  {selectedStageNum === 1 && t('stageMap.discover', 'DISCOVER')}{selectedStageNum === 2 && t('stageMap.understand', 'UNDERSTAND')}{selectedStageNum === 3 && t('stageMap.lifeEarth', 'ADVANCED')}{selectedStageNum === 4 && t('stageMap.mastery', 'MASTERY')}
                </h1>
                <p className="text-sm text-slate-400 mt-2">{t('stageMap.completeMissionsPrompt', 'Complete each mission in order. Boss unlocks after all 9 missions!')}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full mb-10">
                {getLevelsByStage(selectedStageNum).map(rawLevel => {
                  const level = getLocalizedLevel(rawLevel, t);
                  const completed = state.completedStageIds.includes(level.id);
                  const unlocked = isLevelUnlocked(level);
                  const isActive = unlocked && !completed;
                  return (
                    <button key={level.id} disabled={!unlocked} onClick={() => handleEnterLevel(level)}
                      className={`aspect-square p-4 rounded-xl border flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden ${completed ? 'border-amber-500/25 bg-amber-500/5 hover:bg-amber-500/10' : isActive ? 'border-[#ff9500] bg-[#ff9500]/5 hover:bg-[#ff9500]/10 shadow-[0_0_15px_rgba(255,149,0,0.15)] animate-pulse' : 'border-slate-800 bg-[#0d0502]/60 opacity-40 cursor-default'}`}>
                      <div className="flex justify-between items-center w-full">
                        <span className="font-display text-xs font-bold text-slate-500 tracking-wider">LV {level.levelNumber}</span>
                        {completed ? <CheckCircle size={14} className="text-amber-400" /> : level.isBoss ? <Award size={14} className="text-[#ff9500] animate-bounce" /> : !unlocked ? <Lock size={12} className="text-slate-600" /> : null}
                      </div>
                      <div>
                        <h4 className="font-display text-xs font-bold text-slate-200 tracking-wider uppercase line-clamp-2">{level.missionTitle.replace(/MISSION \d+ — /, '')}</h4>
                        <span className="text-xs text-slate-400 mt-1 block uppercase tracking-widest font-semibold">+{level.xpReward} XP</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="w-full p-4 rounded-xl border border-slate-800 bg-[#120803]/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-slate-400 text-sm">{isStageCompleted(selectedStageNum) ? t('stageMap.stageCompleteFragment', '✓ Stage complete — Fragment secured!') : t('stageMap.completeMissionsForBoss', 'Complete all missions to unlock the Stage Boss.')}</span>
                <button onClick={() => setViewMode('domain-map')} className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 font-display text-xs tracking-widest uppercase hover:bg-white/5 transition-all cursor-pointer">{t('stageMap.backToStages', 'Back to Stages')}</button>
              </div>
            </motion.div>
          )}

          {/* ── GAMEPLAY ── */}
          {viewMode === 'gameplay' && activeLevel && (
            <motion.div key="gameplay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50">
              {(() => {
                const texts = getSimplifiedLevelTexts(currentLevel || activeLevel);
                const env = getMissionEnvironment(activeLevel);
                const stageLevels = ENGINEERING_LEVELS.filter(l => l.stage === activeLevel.stage);
                const currentHP = attempts <= 1 ? 3 : attempts === 2 ? 2 : 1;

                /* BRIEFING SCREEN */
                if (!missionStarted) {
                  return (
                    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden"
                      style={{ background: `radial-gradient(ellipse at 60% 40%, ${env.themeColor}08 0%, #050201 70%)` }}>
                      {env.environmentalDecoration}
                      {env.ambientSpots}
                      {/* Top bar */}
                      <div className="relative z-20 w-full px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/30 backdrop-blur-sm shrink-0">
                        <button onClick={() => { setViewMode('stage-levels'); setActiveLevel(null); }} className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-all cursor-pointer text-sm font-display tracking-wider uppercase">
                          <ArrowLeft size={16} /> Back
                        </button>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 tracking-widest uppercase font-display">{env.stageTag}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-600" />
                          <span className="text-xs text-[#ff9500] tracking-widest uppercase font-display font-bold">MISSION {String(activeLevel.levelNumber).padStart(2, '0')}</span>
                        </div>
                        <div className="font-display text-sm text-amber-400 font-bold">⚡ {state.player.xp ?? 0} XP</div>
                      </div>
                      {/* Content */}
                      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
                        {/* Left - Story */}
                        <div className="lg:w-5/12 flex flex-col justify-between p-8 lg:p-10 border-r border-white/5 bg-black/20">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 rounded-full bg-[#ff9500] animate-pulse shadow-[0_0_8px_#ff9500]" />
                            <span className="text-xs text-[#ff9500] font-display tracking-widest uppercase font-bold">FORGE COMMS — ACTIVE</span>
                          </div>
                          <div className="flex-1 flex flex-col justify-center gap-6">
                            <MissionCharacterDisplay
                              src="/miles-character.jpg"
                              alt="Agent Morales"
                              themeColor={env.themeColor}
                              variant="briefing"
                              onlineLabel="MORALES · ONLINE"
                            />
                            <div className="relative p-5 rounded-2xl border bg-black/40 backdrop-blur-sm" style={{ borderColor: `${env.themeColor}20` }}>
                              <div className="absolute -top-2.5 left-6 w-5 h-5 rotate-45 bg-[#030306] border-l border-t" style={{ borderColor: `${env.themeColor}20` }} />
                              <p className="text-base text-slate-200 leading-relaxed">{texts.briefingStory}</p>
                            </div>
                          </div>
                        </div>
                        {/* Right - Mission details */}
                        <div className="lg:w-7/12 flex flex-col justify-center p-8 lg:p-12 gap-8">
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shadow-lg" style={{ borderColor: `${env.themeColor}50`, background: `${env.themeColor}10`, boxShadow: `0 0 20px ${env.themeColor}20` }}>{env.icon}</div>
                              <div>
                                <p className="text-xs text-slate-500 tracking-widest uppercase font-display">Stage {activeLevel.stage} · Mission {String(activeLevel.levelNumber).padStart(2, '0')}</p>
                                <h1 className="font-display text-4xl font-extrabold tracking-wide text-white mt-0.5" style={{ textShadow: `0 0 30px ${env.themeColor}40` }}>{texts.briefingTitle}</h1>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-white/5 bg-white/3">
                              <p className="text-xs text-slate-500 tracking-widest uppercase font-display mb-2">🎯 Your Mission</p>
                              <p className="text-base text-slate-200 leading-relaxed">{texts.objective}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-white/5 bg-white/3">
                              <p className="text-xs text-slate-500 tracking-widest uppercase font-display mb-2">📚 You'll Learn</p>
                              <p className="text-base text-slate-300 leading-relaxed">{activeLevel.primaryConcept}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10">
                              <Zap size={18} className="text-amber-400" />
                              <span className="font-display text-xl text-amber-400 font-extrabold">+{activeLevel.xpReward} XP</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50">
                              <span className="text-sm text-slate-400 font-display tracking-wider uppercase">Difficulty:</span>
                              <span className={`text-sm font-bold font-display tracking-wider ${activeLevel.difficulty === 'EASY' ? 'text-emerald-400' : activeLevel.difficulty === 'MEDIUM' ? 'text-amber-400' : 'text-red-400'}`}>{activeLevel.difficulty}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setMissionStarted(true); playTone(520, 0.15, 'sine'); }}
                              className="w-full py-5 rounded-2xl border-2 font-display text-xl font-extrabold tracking-widest uppercase transition-all cursor-pointer"
                              style={{ borderColor: env.themeColor, background: `linear-gradient(135deg, ${env.themeColor}20 0%, ${env.themeColor}05 100%)`, color: env.themeColor, boxShadow: `0 0 30px ${env.themeColor}25` }}>
                              {env.icon} START MISSION
                            </motion.button>
                            <button onClick={() => { setViewMode('stage-levels'); setActiveLevel(null); }} className="text-sm tracking-widest text-slate-600 hover:text-slate-400 uppercase transition-all underline cursor-pointer text-center">
                              Return to Stage Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                /* FULL GAMEPLAY SCREEN */
                return (
                  <div className="fixed inset-0 z-50 flex flex-col w-full h-screen overflow-hidden text-slate-100"
                    style={{ background: `radial-gradient(ellipse at 50% 30%, ${env.themeColor}06 0%, #050201 60%)` }}>
                    {env.environmentalDecoration}
                    {env.ambientSpots}

                    {/* TOP HUD */}
                    <header className="relative z-20 w-full h-16 px-5 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md shrink-0">
                      <div className="flex items-center gap-3">
                        <button onClick={() => { setViewMode('stage-levels'); setActiveLevel(null); setMissionStarted(false); }}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 hover:bg-slate-700/50 text-sm text-slate-300 font-display tracking-wider uppercase transition-all cursor-pointer">
                          <ArrowLeft size={15} /> Back
                        </button>
                        <div className="w-px h-6 bg-slate-700" />
                        <div className="flex flex-col">
                          <span className="font-display text-sm font-bold text-white leading-none tracking-wider">ENGINEERING · STAGE {activeLevel.stage}</span>
                          <span className="text-xs tracking-widest text-[#ff9500] leading-none mt-0.5 font-bold uppercase">MISSION {String(activeLevel.levelNumber).padStart(2, '0')} — {texts.briefingTitle}</span>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center gap-1.5 bg-black/30 px-4 py-2 rounded-full border border-white/5">
                        <span className="font-display text-xs tracking-widest text-slate-500 uppercase mr-2 font-bold">Progress:</span>
                        {stageLevels.map(l => {
                          const isCurrent = l.id === activeLevel.id;
                          const isDone = state.completedStageIds.includes(l.id);
                          return (
                            <div key={l.id} title={`Mission ${l.levelNumber}`}
                              className={`rounded-full flex items-center justify-center font-display font-bold transition-all ${isCurrent ? 'w-7 h-7 text-xs text-black shadow-lg' : isDone ? 'w-5 h-5 text-[9px]' : 'w-4 h-4 text-[8px]'}`}
                              style={{ background: isCurrent ? env.themeColor : isDone ? `${env.themeColor}30` : '#2e1a0a', border: isCurrent ? `2px solid ${env.themeColor}` : isDone ? `1px solid ${env.themeColor}50` : '1px solid #3e2a1a', boxShadow: isCurrent ? `0 0 10px ${env.themeColor}60` : 'none', color: isCurrent ? '#000' : isDone ? env.themeColor : '#6a4a3a' }}>
                              {l.levelNumber === 10 ? '★' : l.levelNumber}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-red-900/30">
                          <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-display mr-1">HP</span>
                          <span className="text-base">{currentHP >= 1 ? '❤️' : '🖤'}</span>
                          <span className="text-base">{currentHP >= 2 ? '❤️' : '🖤'}</span>
                          <span className="text-base">{currentHP >= 3 ? '❤️' : '🖤'}</span>
                        </div>
                        <div className="font-display text-sm text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                          <Zap size={14} className="text-amber-400" />{state.player.xp ?? 0} XP
                        </div>
                        <button onClick={handleToggleMute} className="w-9 h-9 rounded-lg border border-slate-700 flex items-center justify-center bg-slate-800/50 text-slate-400 hover:text-slate-200 cursor-pointer transition-all">
                          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                        </button>
                      </div>
                    </header>

                    {/* THREE-COLUMN WORKSPACE */}
                    <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>

                      {/* LEFT - Character */}
                      <div className="lg:col-span-3 border-r border-white/5 bg-black/30 backdrop-blur-sm flex flex-col p-5 gap-5 overflow-y-auto">
                        <MissionCharacterDisplay
                          src={showHint ? '/future-self.jpg' : '/miles-character.jpg'}
                          alt="Agent Morales"
                          themeColor={env.themeColor}
                          variant="gameplay"
                          onlineLabel={showHint ? 'FUTURE MORALES · COMMS' : 'MORALES · ONLINE'}
                        />
                        <div className="flex items-center gap-0.5 justify-center h-6 px-2">
                          {[...Array(14)].map((_, i) => (
                            <div key={i} className="flex-1 rounded-full transition-all"
                              style={{ height: showFeedback ? `${6 + Math.abs(Math.sin(i * 0.7)) * 14}px` : '3px', background: isCorrect && showFeedback ? '#ff9500' : showFeedback ? '#ef4444' : env.themeColor, transitionDelay: `${i * 30}ms`, opacity: showFeedback ? 0.8 : 0.3 }} />
                          ))}
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                          <div className="relative p-4 rounded-2xl border bg-black/40" style={{ borderColor: `${env.themeColor}20`, minHeight: '120px' }}>
                            <div className="absolute -top-2.5 left-5 w-5 h-5 rotate-45 bg-[#030306] border-l border-t" style={{ borderColor: `${env.themeColor}20` }} />
                            <p className="text-sm text-slate-200 leading-relaxed">
                              {showFeedback ? (isCorrect ? `"${texts.successDialogue}"` : `"${texts.feedbackIncorrect}"`) : showHint ? `"${texts.hintDialogue}"` : `"${texts.characterDialogue}"`}
                            </p>
                          </div>
                          <div className="p-3.5 rounded-xl border border-white/10 bg-black/40">
                            <p className="text-[10px] text-cyan-400 tracking-widest uppercase font-display mb-1 font-bold">💡 CONCEPT: {activeLevel.primaryConcept}</p>
                            <p className="text-xs text-slate-300 leading-relaxed font-body">
                              {getConceptExplanation(activeLevel.primaryConcept, activeLevel.levelNumber)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CENTER - Game Area */}
                      <div className="lg:col-span-6 flex flex-col gap-4 p-5 overflow-y-auto">
                        {/* Status bar */}
                        <div className="flex items-center justify-between p-3 rounded-xl border bg-black/40" style={{ borderColor: `${env.themeColor}20` }}>
                          <div className="flex items-center gap-2.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${showFeedback && isCorrect ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                            <span className="text-sm font-display font-bold uppercase tracking-wider text-slate-200">
                              {showFeedback && isCorrect ? env.missionSuccessText : `⚙️ ${env.name} — STRUCTURAL BUILD`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-display text-slate-500 uppercase font-bold">Load Rating</span>
                            <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                              <motion.div className="h-full rounded-full" style={{ background: env.themeColor }} animate={{ width: showFeedback && isCorrect ? '100%' : '28%' }} transition={{ duration: 1.5, ease: 'easeOut' }} />
                            </div>
                          </div>
                        </div>

                        {/* Puzzle Terminal */}
                        <div className="flex-1 flex flex-col justify-center items-center rounded-2xl border-2 p-6 gap-6 relative overflow-hidden"
                          style={{ borderColor: `${env.themeColor}25`, background: `radial-gradient(ellipse at 50% 0%, ${env.themeColor}06 0%, #050201 70%)` }}>
                          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${env.themeColor}60, transparent)` }} />

                          {/* PatternGame */}
                          {activeLevel.gameMechanic === 'PatternGame' && activeLevel.gameData.sequence && (
                            <div className="flex flex-col items-center gap-6 w-full">
                              <div className="text-center"><p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Mechanical Sequence</p><p className="text-lg text-slate-300">{texts.story}</p></div>
                              <div className="flex gap-3 items-center flex-wrap justify-center">
                                {activeLevel.gameData.sequence.map((term, i, arr) => (
                                  <React.Fragment key={i}>
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-display text-3xl border-2 font-extrabold shadow-lg ${term === '?' ? 'animate-pulse' : 'border-slate-700 bg-slate-900/80 text-slate-100'}`}
                                      style={term === '?' ? { borderColor: env.themeColor, color: env.themeColor, background: `${env.themeColor}10`, boxShadow: `0 0 20px ${env.themeColor}30` } : {}}>{term}</div>
                                    {i < arr.length - 1 && <div className="text-slate-600 text-xl font-bold">→</div>}
                                  </React.Fragment>
                                ))}
                              </div>
                              <div className="w-full p-4 rounded-xl border border-white/5 bg-white/3 text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{texts.conceptEx}</div>
                            </div>
                          )}

                          {/* EquationGame */}
                          {activeLevel.gameMechanic === 'EquationGame' && (
                            <div className="flex flex-col items-center gap-6 w-full">
                              <div className="text-center"><p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Engineering Calculation</p><p className="text-base text-slate-300">{texts.story}</p></div>
                              <div className="px-10 py-6 rounded-2xl border-2 font-display text-4xl tracking-widest font-extrabold text-center shadow-inner"
                                style={{ borderColor: `${env.themeColor}35`, background: `${env.themeColor}08`, color: env.themeColor, textShadow: `0 0 20px ${env.themeColor}50` }}>{activeLevel.gameData.equation}</div>
                              <div className="w-full p-4 rounded-xl border border-white/5 bg-white/3 text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{texts.conceptEx}</div>
                            </div>
                          )}

                          {/* LogicGame */}
                          {activeLevel.gameMechanic === 'LogicGame' && (
                            <div className="flex flex-col gap-5 w-full max-w-lg">
                              <div className="text-center"><p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Design Challenge</p></div>
                              <div className="p-5 rounded-2xl border border-white/5 bg-black/40 text-base text-slate-200 leading-relaxed">{activeLevel.gameData.logicPremise}</div>
                              <div className="p-4 rounded-xl border border-white/5 bg-white/3 text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{texts.conceptEx}</div>
                            </div>
                          )}

                          {/* OptimizationGame */}
                          {activeLevel.gameMechanic === 'OptimizationGame' && activeLevel.gameData.optionsToChoose && (
                            <div className="flex flex-col gap-5 w-full max-w-lg">
                              <div className="text-center"><p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Material / Design Choice</p><p className="text-base text-slate-300">{texts.story}</p></div>
                              <div className="flex flex-col gap-3">
                                {activeLevel.gameData.optionsToChoose.map(opt => (
                                  <button key={opt.name} onClick={() => { setSelectedOption(opt.name); playTone(450, 0.08, 'sine'); }}
                                    className="p-4 rounded-xl border-2 text-left text-sm font-display flex justify-between items-center cursor-pointer transition-all"
                                    style={{ borderColor: selectedOption === opt.name ? env.themeColor : '#1e1e2e', background: selectedOption === opt.name ? `${env.themeColor}10` : '#08080f', color: selectedOption === opt.name ? env.themeColor : '#cbd5e1', boxShadow: selectedOption === opt.name ? `0 0 15px ${env.themeColor}20` : 'none' }}>
                                    <span className="font-bold">{opt.name}</span>
                                    <span className="text-xs opacity-60">Rating: {opt.efficiency}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* DragDropGame / ResourceAllocationGame */}
                          {(activeLevel.gameMechanic === 'ResourceAllocationGame' || activeLevel.gameMechanic === 'DragDropGame') && (
                            <div className="flex flex-col gap-5 w-full max-w-md">
                              <div className="text-center"><p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Resource Allocation</p><p className="text-base text-slate-300">{texts.story}</p></div>
                              <div className="flex flex-col gap-3">
                                {activeLevel.gameData.itemsToAllocate?.map(item => (
                                  <div key={item.name} className="p-4 rounded-xl border border-white/5 bg-black/40 flex items-center justify-between gap-4">
                                    <span className="font-display text-sm text-slate-200 font-bold">{item.name}</span>
                                    <div className="flex items-center gap-3">
                                      <button onClick={() => { const c = allocationState[item.name] || 0; if (c > 0) setAllocationState({ ...allocationState, [item.name]: c - 1 }); }} className="w-10 h-10 border-2 border-slate-700 bg-slate-800 rounded-xl flex items-center justify-center text-slate-300 hover:border-slate-500 cursor-pointer"><Minus size={16} /></button>
                                      <span className="font-display text-2xl font-extrabold w-12 text-center" style={{ color: env.themeColor }}>{allocationState[item.name] || 0}</span>
                                      <button onClick={() => { const c = allocationState[item.name] || 0; if (c < item.totalToDistribute) setAllocationState({ ...allocationState, [item.name]: c + 1 }); }} className="w-10 h-10 border-2 border-slate-700 bg-slate-800 rounded-xl flex items-center justify-center text-slate-300 hover:border-slate-500 cursor-pointer"><Plus size={16} /></button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* CoordinateGame */}
                          {activeLevel.gameMechanic === 'CoordinateGame' && (
                            <div className="flex flex-col items-center gap-5 w-full">
                              <div className="text-center"><p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Vehicle Navigation Grid</p><p className="text-base text-slate-300">{texts.story}</p></div>
                              <div className="flex flex-col items-center gap-4">
                                <div className="grid border-2 border-white/10 p-2 rounded-2xl bg-black/60"
                                  style={{ gridTemplateColumns: `repeat(${activeLevel.gameData.gridSize || 3}, 64px)`, gap: '5px' }}>
                                  {Array.from({ length: activeLevel.gameData.gridSize || 3 }).map((_, ci) => {
                                    const gs = activeLevel.gameData.gridSize || 3;
                                    const y = gs - 1 - ci;
                                    return Array.from({ length: gs }).map((_, x) => {
                                      const isDrone = currentCoordinate[0] === x && currentCoordinate[1] === y;
                                      const tp = activeLevel.gameData.targetPoint || [0, 0];
                                      const isTgt = tp[0] === x && tp[1] === y;
                                      const isObs = activeLevel.gameData.obstacles?.some((o: number[]) => o[0] === x && o[1] === y);
                                      return (
                                        <div key={`${x}-${y}`} className="w-16 h-16 rounded-xl flex flex-col items-center justify-center font-display font-bold border transition-all"
                                          style={{ background: isDrone ? `${env.themeColor}20` : isTgt ? '#10b98115' : isObs ? '#ef444415' : '#08080f', borderColor: isDrone ? env.themeColor : isTgt ? '#10b981' : isObs ? '#ef4444' : '#1e1e2e', boxShadow: isDrone ? `0 0 15px ${env.themeColor}50` : 'none' }}>
                                          <span className="text-xl">{isDrone ? '⚙️' : isTgt ? '📍' : isObs ? '⚠️' : ''}</span>
                                          <span className="text-[9px] text-slate-500 mt-0.5">{x},{y}</span>
                                        </div>
                                      );
                                    });
                                  })}
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <p className="text-xs text-slate-500 uppercase tracking-widest font-display">Move vehicle</p>
                                  <div className="grid grid-cols-3 gap-2 w-36">
                                    <div />
                                    <button onClick={() => handleMoveCoordinate('UP', activeLevel.gameData.obstacles || [], activeLevel.gameData.gridSize || 3)} className="w-10 h-10 border-2 border-slate-700 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 text-lg cursor-pointer hover:border-slate-500">▲</button>
                                    <div />
                                    <button onClick={() => handleMoveCoordinate('LEFT', activeLevel.gameData.obstacles || [], activeLevel.gameData.gridSize || 3)} className="w-10 h-10 border-2 border-slate-700 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 text-lg cursor-pointer hover:border-slate-500">◀</button>
                                    <div className="w-10 h-10 flex items-center justify-center text-xs text-slate-500 font-display font-bold">NAV</div>
                                    <button onClick={() => handleMoveCoordinate('RIGHT', activeLevel.gameData.obstacles || [], activeLevel.gameData.gridSize || 3)} className="w-10 h-10 border-2 border-slate-700 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 text-lg cursor-pointer hover:border-slate-500">▶</button>
                                    <div />
                                    <button onClick={() => handleMoveCoordinate('DOWN', activeLevel.gameData.obstacles || [], activeLevel.gameData.gridSize || 3)} className="w-10 h-10 border-2 border-slate-700 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 text-lg cursor-pointer hover:border-slate-500">▼</button>
                                    <div />
                                  </div>
                                  <p className="text-xs text-slate-600 font-display">Position: ({currentCoordinate[0]}, {currentCoordinate[1]}) | Target: ({(activeLevel.gameData.targetPoint || [0,0])[0]}, {(activeLevel.gameData.targetPoint || [0,0])[1]})</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* BossGame */}
                          {activeLevel.gameMechanic === 'BossGame' && activeLevel.gameData.phases && (() => {
                            const phases = activeLevel.gameData.phases;
                            const cp = phases[bossPhaseIdx];
                            if (!cp) return null;
                            const cpd = cp.gameData || {};
                            return (
                              <div className="flex flex-col gap-5 w-full">
                                <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20 bg-red-950/10">
                                  <div>
                                    <p className="text-xs text-red-400 font-display uppercase tracking-widest font-bold">BOSS BATTLE</p>
                                    <p className="text-lg font-bold text-white mt-0.5">PHASE {bossPhaseIdx + 1} — {cp.title}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    {(phases as any[]).map((_: any, i: number) => (
                                      <div key={i} className={`w-10 h-2 rounded-full transition-all ${bossCompletedPhases[i] ? 'bg-emerald-500' : i === bossPhaseIdx ? 'bg-amber-400 animate-pulse' : 'bg-slate-800'}`} />
                                    ))}
                                  </div>
                                </div>
                                <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-sm text-slate-200 leading-relaxed">{cp.instruction}</div>
                                {cp.gameMechanic === 'LogicGame' && (
                                  <div className="flex flex-col gap-3">
                                    <p className="text-sm text-slate-400 text-center p-3 bg-black/30 rounded-xl">{cpd.logicPremise}</p>
                                    {cpd.logicOptions?.map((opt: string) => (
                                      <button key={opt} onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                        className="py-3 px-4 rounded-xl border-2 font-display text-sm text-left cursor-pointer transition-all"
                                        style={{ borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e', background: selectedOption === opt ? `${env.themeColor}10` : '#08080f', color: selectedOption === opt ? env.themeColor : '#cbd5e1' }}>
                                        {opt}
                                      </button>
                                    ))}
                                  </div>
                                )}
                                {cp.gameMechanic === 'EquationGame' && (
                                  <div className="flex flex-col items-center gap-4">
                                    <div className="px-8 py-5 rounded-2xl border-2 font-display text-4xl text-center font-extrabold" style={{ borderColor: `${env.themeColor}35`, color: env.themeColor, background: `${env.themeColor}08` }}>{cpd.equation}</div>
                                    {cpd.equationOptions && (
                                      <div className="grid grid-cols-2 gap-3 w-full">
                                        {(cpd.equationOptions as any[]).map((opt: any) => (
                                          <button key={opt} onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                            className="py-4 rounded-xl border-2 font-display text-2xl font-bold cursor-pointer transition-all"
                                            style={{ borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e', background: selectedOption === opt ? `${env.themeColor}15` : '#08080f', color: selectedOption === opt ? env.themeColor : '#e2e8f0' }}>
                                            {opt}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                                {cp.gameMechanic === 'OptimizationGame' && (
                                  <div className="flex flex-col gap-3">
                                    {cpd.optionsToChoose?.map((opt: any) => (
                                      <button key={opt.name} onClick={() => { setSelectedOption(opt.name); playTone(450, 0.08, 'sine'); }}
                                        className="p-3.5 rounded-xl border-2 font-display text-sm text-left cursor-pointer transition-all flex justify-between"
                                        style={{ borderColor: selectedOption === opt.name ? env.themeColor : '#1e1e2e', background: selectedOption === opt.name ? `${env.themeColor}10` : '#08080f', color: selectedOption === opt.name ? env.themeColor : '#cbd5e1' }}>
                                        <span>{opt.name}</span><span className="opacity-60 text-xs">Rating: {opt.efficiency}</span>
                                      </button>
                                    ))}
                                  </div>
                                )}
                                {cp.gameMechanic === 'CoordinateGame' && (
                                  <div className="flex justify-center flex-col items-center gap-3">
                                    <div className="grid border border-white/10 p-2 rounded-xl bg-black/60"
                                      style={{ gridTemplateColumns: `repeat(${cpd.gridSize || 3}, 52px)`, gap: '4px' }}>
                                      {Array.from({ length: cpd.gridSize || 3 }).map((_, ci) => {
                                        const gs = cpd.gridSize || 3;
                                        const y = gs - 1 - ci;
                                        return Array.from({ length: gs }).map((_, x) => {
                                          const isDrone = currentCoordinate[0] === x && currentCoordinate[1] === y;
                                          const tp = cpd.targetPoint || [0, 0];
                                          const isTgt = tp[0] === x && tp[1] === y;
                                          const isObs = (cpd.obstacles || []).some((o: number[]) => o[0] === x && o[1] === y);
                                          return (
                                            <div key={`${x}-${y}`} className="w-12 h-12 rounded-lg flex flex-col items-center justify-center font-display border transition-all"
                                              style={{ background: isDrone ? `${env.themeColor}20` : isTgt ? '#10b98115' : isObs ? '#ef444415' : '#08080f', borderColor: isDrone ? env.themeColor : isTgt ? '#10b981' : isObs ? '#ef4444' : '#1e1e2e' }}>
                                              <span className="text-base">{isDrone ? '⚙️' : isTgt ? '📍' : isObs ? '⚠️' : ''}</span>
                                              <span className="text-[8px] text-slate-600">{x},{y}</span>
                                            </div>
                                          );
                                        });
                                      })}
                                    </div>
                                    <div className="grid grid-cols-3 gap-1.5 w-32">
                                      <div /><button onClick={() => handleMoveCoordinate('UP', cpd.obstacles || [], cpd.gridSize || 3)} className="w-9 h-9 border border-slate-700 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 cursor-pointer hover:border-slate-500">▲</button><div />
                                      <button onClick={() => handleMoveCoordinate('LEFT', cpd.obstacles || [], cpd.gridSize || 3)} className="w-9 h-9 border border-slate-700 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 cursor-pointer hover:border-slate-500">◀</button>
                                      <div className="w-9 h-9 flex items-center justify-center text-[8px] text-slate-500 font-display">NAV</div>
                                      <button onClick={() => handleMoveCoordinate('RIGHT', cpd.obstacles || [], cpd.gridSize || 3)} className="w-9 h-9 border border-slate-700 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 cursor-pointer hover:border-slate-500">▶</button>
                                      <div /><button onClick={() => handleMoveCoordinate('DOWN', cpd.obstacles || [], cpd.gridSize || 3)} className="w-9 h-9 border border-slate-700 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 cursor-pointer hover:border-slate-500">▼</button><div />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })()}

                          <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl" style={{ background: `linear-gradient(90deg, transparent, ${env.themeColor}40, transparent)` }} />
                        </div>

                        {/* Answer choices for option-based games */}
                        {activeLevel.gameMechanic === 'PatternGame' && activeLevel.gameData.sequenceOptions && (
                          <div className="grid grid-cols-2 gap-4">
                            <p className="col-span-2 text-center text-sm text-slate-400 font-display uppercase tracking-widest">{texts.questionLabel}</p>
                            {activeLevel.gameData.sequenceOptions.map(opt => (
                              <motion.button key={opt} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                className="h-24 rounded-2xl border-2 font-display text-4xl font-extrabold cursor-pointer transition-all"
                                style={{ borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e', background: selectedOption === opt ? `${env.themeColor}15` : '#06060e', color: selectedOption === opt ? env.themeColor : '#e2e8f0', boxShadow: selectedOption === opt ? `0 0 25px ${env.themeColor}30` : 'none' }}>
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        )}
                        {activeLevel.gameMechanic === 'EquationGame' && activeLevel.gameData.equationOptions && (
                          <div className="grid grid-cols-2 gap-4">
                            <p className="col-span-2 text-center text-sm text-slate-400 font-display uppercase tracking-widest">{texts.questionLabel}</p>
                            {activeLevel.gameData.equationOptions.map(opt => (
                              <motion.button key={opt} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                className="h-24 rounded-2xl border-2 font-display text-4xl font-extrabold cursor-pointer transition-all"
                                style={{ borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e', background: selectedOption === opt ? `${env.themeColor}15` : '#06060e', color: selectedOption === opt ? env.themeColor : '#e2e8f0', boxShadow: selectedOption === opt ? `0 0 25px ${env.themeColor}30` : 'none' }}>
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        )}
                        {activeLevel.gameMechanic === 'EquationGame' && !activeLevel.gameData.equationOptions && (
                          <div><p className="text-center text-sm text-slate-400 font-display uppercase tracking-widest mb-3">{texts.questionLabel}</p>
                            <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Enter your answer…" className="w-full py-5 px-6 rounded-2xl border-2 border-slate-800 bg-slate-900/80 text-slate-100 font-display text-3xl text-center focus:outline-none transition-all" /></div>
                        )}
                        {activeLevel.gameMechanic === 'LogicGame' && activeLevel.gameData.logicOptions && (
                          <div className="flex flex-col gap-3">
                            <p className="text-center text-sm text-slate-400 font-display uppercase tracking-widest">{texts.questionLabel}</p>
                            {activeLevel.gameData.logicOptions.map(opt => (
                              <motion.button key={opt} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                                onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                className="h-20 rounded-2xl border-2 font-display text-base font-bold cursor-pointer transition-all text-left px-6"
                                style={{ borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e', background: selectedOption === opt ? `${env.themeColor}15` : '#06060e', color: selectedOption === opt ? env.themeColor : '#e2e8f0', boxShadow: selectedOption === opt ? `0 0 25px ${env.themeColor}25` : 'none' }}>
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* RIGHT - Mission Goal, Chatbot, Hint, Check Answer */}
                      <div className="lg:col-span-3 border-l border-white/5 bg-black/30 backdrop-blur-sm flex flex-col p-4 gap-4 overflow-y-auto">
                        {/* 1. MISSION GOAL */}
                        <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 shadow-sm shrink-0">
                          <span className="font-display text-[11px] tracking-widest text-slate-400 uppercase block mb-1 font-bold">🎯 Mission Goal</span>
                          <p className="text-xs text-slate-100 font-semibold leading-relaxed">{texts.objective}</p>
                        </div>

                        {/* 2. SHIELD AI ASSISTANT */}
                        <div className="flex-1 min-h-[220px]">
                          <ShieldAIChatbot
                            domainId="engineering"
                            domainName="Engineering"
                            themeColor={env.themeColor}
                            stage={activeLevel.stage}
                            missionNumber={activeLevel.levelNumber}
                            missionTitle={texts.briefingTitle}
                            primaryConcept={activeLevel.primaryConcept}
                            objective={texts.objective}
                            questionText={texts.story || texts.questionLabel}
                            submittedAnswer={selectedOption || inputValue || null}
                            isCorrect={showFeedback ? isCorrect : null}
                            onTriggerHint={() => setShowHint(true)}
                            variant="desktop"
                          />
                        </div>

                        {/* 3. NEED A HINT? SECTION */}
                        <div className="border-t border-white/10 pt-3 shrink-0">
                          <button 
                            onClick={() => { setShowHint(!showHint); if (!showHint) setHintsUsed(h => h + 1); }}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border bg-black/40 hover:bg-black/60 text-xs font-display uppercase tracking-wider cursor-pointer transition-all font-bold"
                            style={{ borderColor: showHint ? '#fbbf24' : 'rgba(255,255,255,0.1)', color: showHint ? '#fbbf24' : '#94a3b8' }}
                          >
                            <span className="flex items-center gap-2">
                              <Lightbulb size={15} className={showHint ? 'text-amber-400' : 'text-slate-400'} />
                              {showHint ? 'Hide Hint' : 'Need a Hint?'}
                            </span>
                            <span className="text-xs">{showHint ? '▲' : '▼'}</span>
                          </button>
                          <AnimatePresence>
                            {showHint && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: 'auto' }} 
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-amber-100/90 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 leading-relaxed mt-2 shadow-inner"
                              >
                                💡 {texts.hintText}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 4. CHECK MY ANSWER BUTTON */}
                        <div className="mt-auto border-t border-white/10 pt-3 flex flex-col gap-2.5 shrink-0">
                          <AnimatePresence>
                            {showFeedback && (
                              <motion.div 
                                initial={{ opacity: 0, y: 8 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -8 }}
                                className="p-3 rounded-xl border text-xs flex items-start gap-2.5 leading-relaxed"
                                style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderColor: isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)', color: isCorrect ? '#34d399' : '#f87171' }}
                              >
                                <span className="text-lg shrink-0">{isCorrect ? '✅' : '❌'}</span>
                                <div>
                                  <span className="font-display text-xs uppercase tracking-wider font-bold block mb-0.5">{isCorrect ? 'CORRECT!' : 'TRY AGAIN'}</span>
                                  <p className="text-slate-300 text-xs leading-relaxed">{feedbackText}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {showFeedback && isCorrect ? (
                            <motion.button 
                              whileHover={{ scale: 1.02 }} 
                              whileTap={{ scale: 0.98 }} 
                              onClick={handleContinueNext}
                              className="w-full py-3.5 rounded-xl border-2 font-display text-sm font-extrabold tracking-widest uppercase cursor-pointer transition-all shadow-md"
                              style={{ borderColor: '#10b981', background: 'rgba(16,185,129,0.15)', color: '#34d399', boxShadow: '0 0 20px rgba(16,185,129,0.2)' }}
                            >
                              ▶ NEXT MISSION
                            </motion.button>
                          ) : (
                            <motion.button 
                              whileHover={{ scale: 1.02 }} 
                              whileTap={{ scale: 0.98 }} 
                              onClick={activeLevel.isBoss ? handleVerifyBossPhase : handleVerifyAnswer}
                              className="w-full py-3.5 rounded-xl border-2 font-display text-sm font-extrabold tracking-widest uppercase cursor-pointer transition-all shadow-md"
                              style={{ borderColor: env.themeColor, background: `${env.themeColor}15`, color: env.themeColor, boxShadow: `0 0 15px ${env.themeColor}20` }}
                            >
                              ✓ CHECK MY ANSWER
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* MISSION COMPLETE OVERLAY */}
                    <AnimatePresence>
                      {showFeedback && isCorrect && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="absolute inset-0 z-[60] flex flex-col items-center justify-center p-8"
                          style={{ background: `radial-gradient(ellipse at 50% 40%, ${env.themeColor}12 0%, rgba(5,2,1,0.97) 70%)`, backdropFilter: 'blur(16px)' }}>
                          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute w-72 h-72 rounded-full pointer-events-none border" style={{ borderColor: `${env.themeColor}30` }} />
                          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                            className="absolute w-96 h-96 rounded-full pointer-events-none border" style={{ borderColor: `${env.themeColor}15` }} />
                          <motion.div initial={{ scale: 0.6, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.45, delay: 0.1 }}
                            className="flex flex-col items-center text-center gap-6 max-w-md relative z-10">
                            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl shadow-2xl border-2"
                              style={{ borderColor: env.themeColor, background: `${env.themeColor}15`, boxShadow: `0 0 60px ${env.themeColor}40` }}>
                              {env.icon}
                            </motion.div>
                            <div>
                              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="font-display text-xs tracking-[0.3em] uppercase font-bold mb-2" style={{ color: env.themeColor }}>MISSION COMPLETE</motion.p>
                              <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                className="font-display text-4xl font-extrabold tracking-wide text-white" style={{ textShadow: `0 0 30px ${env.themeColor}50` }}>
                                {env.missionSuccessText}
                              </motion.h2>
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="text-base text-slate-400 mt-2">{env.missionSuccessSubtext}</motion.p>
                            </div>
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65 }}
                              className="px-6 py-4 rounded-2xl border w-full" style={{ borderColor: `${env.themeColor}25`, background: `${env.themeColor}08` }}>
                              <div className="flex items-center gap-3 justify-center">
                                <Star size={18} style={{ color: env.themeColor }} />
                                <div className="text-center">
                                  <p className="text-xs text-slate-500 tracking-widest uppercase font-display">Concept Mastered</p>
                                  <p className="text-lg font-bold text-white mt-0.5">{activeLevel.primaryConcept}</p>
                                </div>
                                <Star size={18} style={{ color: env.themeColor }} />
                              </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                              className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-amber-500/30 bg-amber-500/10">
                              <Zap size={24} className="text-amber-400" />
                              <span className="font-display text-3xl text-amber-400 font-extrabold">+{activeLevel.xpReward} XP</span>
                            </motion.div>
                            <AnimatePresence>
                              {showXpPop && (
                                <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -60 }} exit={{ opacity: 0 }} transition={{ duration: 2, ease: 'easeOut' }}
                                  className="absolute font-display text-2xl font-extrabold text-amber-400 pointer-events-none" style={{ top: '40%', textShadow: '0 0 20px #fbbf24' }}>
                                  ⚡ +{activeLevel.xpReward} XP
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleContinueNext}
                              className="px-12 py-5 rounded-2xl border-2 font-display text-xl font-extrabold tracking-widest uppercase transition-all cursor-pointer"
                              style={{ borderColor: env.themeColor, background: `${env.themeColor}20`, color: env.themeColor, boxShadow: `0 0 30px ${env.themeColor}30` }}>
                              ▶ NEXT MISSION
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* CEREMONY OVERLAY */}
      <AnimatePresence>
        {showCeremony && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-6 bg-black/97 backdrop-blur-xl">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-80 h-80 rounded-full border border-amber-500/10 border-dashed pointer-events-none" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute w-64 h-64 rounded-full border border-[#ff9500]/8 border-dotted pointer-events-none" />
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.3 }}
              className="flex flex-col items-center text-center max-w-sm z-10 gap-6">
              <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 bg-gradient-to-tr from-amber-600 to-[#ff9500] rounded-2xl flex items-center justify-center shadow-[0_0_60px_rgba(255,149,0,0.6)]">
                <Wrench size={42} className="text-black" strokeWidth={2.5} />
              </motion.div>
              <div>
                <span className="font-display text-xs tracking-[0.3em] text-[#ff9500] uppercase block mb-2">⚡ Tesseract Sync Activated ⚡</span>
                <h2 className="font-display text-2xl tracking-widest text-white uppercase font-extrabold">{earnedFragment} Secured!</h2>
              </div>
              <div className="w-16 h-0.5 bg-[#ff9500] rounded-full" />
              <div className="flex items-center gap-3">
                {[1,2,3,4].map(n => (
                  <div key={n} className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border-2"
                      style={{ borderColor: isStageCompleted(n) ? '#ff9500' : '#1e1e2e', background: isStageCompleted(n) ? 'rgba(255,149,0,0.15)' : '#0f0502', boxShadow: isStageCompleted(n) ? '0 0 15px rgba(255,149,0,0.4)' : 'none' }}>
                      {isStageCompleted(n) ? <Shield size={18} className="text-[#ff9500]" /> : <Lock size={16} className="text-slate-600" />}
                    </div>
                    <span className="text-xs text-slate-500 font-display">STG {n}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">You've unlocked an Engineering Stone Fragment! Complete all 4 stages to form the Forge Stone.</p>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={handleCloseCeremony}
                className="px-10 py-4 rounded-2xl border-2 border-[#ff9500] bg-[#ff9500]/15 hover:bg-[#ff9500]/25 text-[#ff9500] font-display text-base font-extrabold tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(255,149,0,0.3)] cursor-pointer">
                ⚡ Continue Adventure
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 w-full px-6 py-3 flex justify-between items-center text-xs text-slate-600 border-t border-white/5 bg-black/20">
        <span>S.H.I.E.L.D. · ENGINEERING DOMAIN</span>
        <span>Tesseract STEM Hero</span>
      </footer>

      {showDemoOverlay && <DemoModeOverlay onClose={() => setShowDemoOverlay(false)} />}
    </div>
  );
};

export default EngineeringWorld;
