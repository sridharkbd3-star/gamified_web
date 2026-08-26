// ============================================================
// Tesseract STEM Hero — Demo Mode Overlay
// Hackathon demonstration tool.
//
// Simulates complete game progression using the REAL game
// dispatch actions — same state updates as normal gameplay.
// ============================================================

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Film, RotateCcw, Trophy } from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import type { DomainId, StoneId } from '../../types';

// ----------------------------------------------------------
// DEMO DATA MAP — all domains, stages, level IDs, XP
// ----------------------------------------------------------

interface DemoLevel {
  id: string;
  isBoss: boolean;
  xp: number;
}

interface DemoStage {
  stageKey: string;   // e.g. 'math-01'
  stageTitle: string;
  fragment: string;
  levels: DemoLevel[];
  xpBonus: number;    // boss bonus
}

interface DemoDomain {
  domainId: DomainId;
  stoneId: StoneId;
  name: string;
  stoneName: string;
  color: string;
  glowColor: string;
  icon: string;
  stages: DemoStage[];
}

const makeMathLevels = (stage: number): DemoLevel[] =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `math-${stage}-${i + 1}`,
    isBoss: i === 9,
    xp: i === 9 ? 200 : 50,
  }));

const DEMO_DOMAINS: DemoDomain[] = [
  {
    domainId: 'mathematics',
    stoneId: 'mathematics-stone',
    name: 'Mathematics',
    stoneName: 'The Axiom Stone',
    color: '#00ff88',
    glowColor: 'rgba(0,255,136,0.5)',
    icon: '∑',
    stages: [
      { stageKey: 'math-01', stageTitle: 'Pattern Awakening', fragment: 'Fragment I — Sequence Core', levels: makeMathLevels(1), xpBonus: 300 },
      { stageKey: 'math-02', stageTitle: 'Pattern Explorer', fragment: 'Fragment II — Equation Prism', levels: makeMathLevels(2), xpBonus: 400 },
      { stageKey: 'math-03', stageTitle: 'Logic Challenge', fragment: 'Fragment III — Logic Lattice', levels: makeMathLevels(3), xpBonus: 500 },
      { stageKey: 'math-04', stageTitle: 'Mathematical Portal', fragment: 'Fragment IV — Axiom Crystal', levels: makeMathLevels(4), xpBonus: 600 },
    ],
  },
  {
    domainId: 'science',
    stoneId: 'science-stone',
    name: 'Science',
    stoneName: 'The Luminal Stone',
    color: '#00e5ff',
    glowColor: 'rgba(0,229,255,0.5)',
    icon: '⚗',
    stages: [
      { stageKey: 'sci-01', stageTitle: 'First Discovery', fragment: 'Fragment I — Observation Core', levels: Array.from({length:10},(_,i)=>({id:`sci-1-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 300 },
      { stageKey: 'sci-02', stageTitle: 'Scientific Variables', fragment: 'Fragment II — Variable Lens', levels: Array.from({length:10},(_,i)=>({id:`sci-2-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 400 },
      { stageKey: 'sci-03', stageTitle: 'Mystery Experiment', fragment: 'Fragment III — Deduction Shard', levels: Array.from({length:10},(_,i)=>({id:`sci-3-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 500 },
      { stageKey: 'sci-04', stageTitle: 'Science Challenge', fragment: 'Fragment IV — Luminal Apex', levels: Array.from({length:10},(_,i)=>({id:`sci-4-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 600 },
    ],
  },
  {
    domainId: 'technology',
    stoneId: 'technology-stone',
    name: 'Technology',
    stoneName: 'The Circuit Stone',
    color: '#7b2fff',
    glowColor: 'rgba(123,47,255,0.5)',
    icon: '⚙',
    stages: [
      { stageKey: 'tech-01', stageTitle: 'Digital Spark', fragment: 'Fragment I — Binary Seed', levels: Array.from({length:10},(_,i)=>({id:`tech-1-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 300 },
      { stageKey: 'tech-02', stageTitle: 'Sequence Mission', fragment: 'Fragment II — Logic Core', levels: Array.from({length:10},(_,i)=>({id:`tech-2-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 400 },
      { stageKey: 'tech-03', stageTitle: 'Debug the System', fragment: 'Fragment III — Debug Node', levels: Array.from({length:10},(_,i)=>({id:`tech-3-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 500 },
      { stageKey: 'tech-04', stageTitle: 'Code the Mission', fragment: 'Fragment IV — Circuit Apex', levels: Array.from({length:10},(_,i)=>({id:`tech-4-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 600 },
    ],
  },
  {
    domainId: 'engineering',
    stoneId: 'engineering-stone',
    name: 'Engineering',
    stoneName: 'The Forge Stone',
    color: '#ff9500',
    glowColor: 'rgba(255,149,0,0.5)',
    icon: '🔧',
    stages: [
      { stageKey: 'eng-01', stageTitle: 'Build Your Idea', fragment: 'Fragment I — Truss Seed', levels: Array.from({length:10},(_,i)=>({id:`eng-1-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 300 },
      { stageKey: 'eng-02', stageTitle: 'Structure Challenge', fragment: 'Fragment II — Span Shard', levels: Array.from({length:10},(_,i)=>({id:`eng-2-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 400 },
      { stageKey: 'eng-03', stageTitle: 'Test and Improve', fragment: 'Fragment III — Stress Core', levels: Array.from({length:10},(_,i)=>({id:`eng-3-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 500 },
      { stageKey: 'eng-04', stageTitle: 'Engineering Mission', fragment: 'Fragment IV — Forge Apex', levels: Array.from({length:10},(_,i)=>({id:`eng-4-${i+1}`,isBoss:i===9,xp:i===9?200:50})), xpBonus: 600 },
    ],
  },
];

// ----------------------------------------------------------
// DEMO STATE TYPES
// ----------------------------------------------------------
type DemoSpeed = 'fast' | 'cinematic';

type DemoPhase =
  | 'menu'
  | 'running-stage'
  | 'fragment'
  | 'stone-formation'
  | 'domain-complete'
  | 'all-domains-complete'
  | 'reset-confirm';

interface RunningState {
  domainIdx: number;
  stageIdx: number;
  levelIdx: number;
  completedLevels: boolean[];
  completedStages: boolean[];
}

// ----------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------
interface DemoModeOverlayProps {
  onClose: () => void;
}

export const DemoModeOverlay: React.FC<DemoModeOverlayProps> = ({ onClose }) => {
  const { state, dispatch } = useGameState();

  const [speed, setSpeed] = useState<DemoSpeed>('cinematic');
  const [phase, setPhase] = useState<DemoPhase>('menu');
  const [running, setRunning] = useState<RunningState | null>(null);
  const [currentFragment, setCurrentFragment] = useState('');
  const [currentDomainData, setCurrentDomainData] = useState<DemoDomain | null>(null);
  const [stonesCompleted, setStonesCompleted] = useState<DomainId[]>([]);
  const cancelRef = useRef(false);

  const delay = useCallback((ms: number) =>
    new Promise<void>((resolve) => {
      const t = setTimeout(resolve, ms);
      const check = setInterval(() => {
        if (cancelRef.current) { clearTimeout(t); clearInterval(check); resolve(); }
      }, 50);
      setTimeout(() => clearInterval(check), ms + 100);
    }),
  []);

  const fastMs = (cinematic: number) => speed === 'fast' ? Math.min(cinematic * 0.15, 120) : cinematic;

  // ── Run a single stage simulation ──────────────────────────
  const runStage = useCallback(async (
    _domain: DemoDomain,
    stage: DemoStage,
    domainIdx: number,
    stageIdx: number,
    prevCompletedLevels: boolean[],
    prevCompletedStages: boolean[],
  ) => {
    const completedLevels = [...prevCompletedLevels];
    const completedStages = [...prevCompletedStages];

    setRunning({ domainIdx, stageIdx, levelIdx: -1, completedLevels, completedStages });
    setPhase('running-stage');

    for (let li = 0; li < stage.levels.length; li++) {
      if (cancelRef.current) return { completedLevels, completedStages };
      const lvl = stage.levels[li];

      // Dispatch real level completion
      dispatch({ type: 'COMPLETE_STAGE', stageId: lvl.id });
      const currentXp = state.player.xp || 0;
      dispatch({ type: 'UPDATE_PLAYER', updates: { xp: currentXp + lvl.xp + li * 5 } });

      completedLevels[li] = true;
      setRunning({ domainIdx, stageIdx, levelIdx: li, completedLevels: [...completedLevels], completedStages: [...completedStages] });

      await delay(fastMs(lvl.isBoss ? 900 : 280));
    }

    // Dispatch real stage key completion
    dispatch({ type: 'COMPLETE_STAGE', stageId: stage.stageKey });
    dispatch({ type: 'UPDATE_PLAYER', updates: { xp: (state.player.xp || 0) + stage.xpBonus } });
    completedStages[stageIdx] = true;
    setRunning({ domainIdx, stageIdx, levelIdx: 9, completedLevels: [...completedLevels], completedStages: [...completedStages] });

    await delay(fastMs(600));

    // Show fragment
    setCurrentFragment(stage.fragment);
    setPhase('fragment');
    await delay(fastMs(2200));

    return { completedLevels, completedStages };
  }, [dispatch, state.player.xp, delay, speed]);

  // ── Run a full domain simulation ───────────────────────────
  const runDomain = useCallback(async (domain: DemoDomain, domainIdx: number) => {
    if (cancelRef.current) return;
    setCurrentDomainData(domain);

    let completedLevels = Array(10).fill(false);
    let completedStages = Array(4).fill(false);

    for (let si = 0; si < domain.stages.length; si++) {
      if (cancelRef.current) return;
      const result = await runStage(domain, domain.stages[si], domainIdx, si, completedLevels, completedStages);
      completedLevels = Array(10).fill(false); // reset per-stage for display
      completedStages = result.completedStages;
    }

    // Stone formation
    setPhase('stone-formation');
    dispatch({ type: 'COLLECT_STONE', stoneId: domain.stoneId, domainId: domain.domainId });
    await delay(fastMs(3500));

    // Domain complete
    setPhase('domain-complete');
    setStonesCompleted(prev => [...prev, domain.domainId]);
    await delay(fastMs(2500));
  }, [runStage, dispatch, delay, speed]);

  // ── Complete current domain only ───────────────────────────
  const handleCompleteDomain = useCallback(async (domain: DemoDomain) => {
    cancelRef.current = false;
    await runDomain(domain, DEMO_DOMAINS.indexOf(domain));
    setPhase('menu');
    setCurrentDomainData(null);
    setRunning(null);
  }, [runDomain]);

  // ── Complete ALL domains ────────────────────────────────────
  const handleCompleteAll = useCallback(async () => {
    cancelRef.current = false;
    for (let di = 0; di < DEMO_DOMAINS.length; di++) {
      if (cancelRef.current) break;
      await runDomain(DEMO_DOMAINS[di], di);
    }
    if (!cancelRef.current) {
      setPhase('all-domains-complete');
    }
  }, [runDomain]);

  // ── Complete current Math stage (for demo from inside Math world) ─
  // Reserved for future use

  // ── Reset ───────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
    setStonesCompleted([]);
    setPhase('menu');
    setRunning(null);
    setCurrentDomainData(null);
  }, [dispatch]);

  const handleCancel = () => {
    cancelRef.current = true;
    setPhase('menu');
    setRunning(null);
    setCurrentDomainData(null);
  };

  // Helper: check if domain already complete in real state
  const isDomainComplete = (d: DemoDomain) =>
    state.player.collectedStones.includes(d.stoneId);

  const completedCount = DEMO_DOMAINS.filter(d => isDomainComplete(d)).length;

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <AnimatePresence>
      <motion.div
        key="demo-overlay-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
      >
        {/* ── MENU ─────────────────────────────────────────── */}
        {phase === 'menu' && (
          <motion.div
            key="demo-menu"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            className="relative w-full max-w-lg bg-[#06060e] border border-amber-500/30 rounded-3xl p-8 shadow-2xl"
          >
            {/* DEMO badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-[9px] tracking-[0.3em] text-amber-400 font-bold uppercase">
              ⚡ HACKATHON DEMO MODE
            </div>

            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-200 hover:border-slate-600 cursor-pointer transition-all">
              <X size={14} />
            </button>

            <div className="text-center mb-6 mt-2">
              <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">Demo Mode</h2>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed max-w-sm mx-auto">
                Simulate successful game progression for judges.<br />
                Uses the <span className="text-amber-400 font-bold">real game state</span> — progress is actually saved.
              </p>
            </div>

            {/* Stone progress overview */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {DEMO_DOMAINS.map(d => {
                const done = isDomainComplete(d);
                return (
                  <div key={d.domainId} className={`flex flex-col items-center gap-1 p-2 rounded-xl border ${done ? 'border-opacity-40 bg-opacity-10' : 'border-slate-800 bg-slate-950/30'}`}
                    style={done ? { borderColor: d.color, backgroundColor: d.color + '10' } : {}}>
                    <span className="text-2xl">{done ? '🪨' : '🔒'}</span>
                    <span className="text-[7px] font-display font-bold uppercase tracking-widest" style={{ color: done ? d.color : '#475569' }}>
                      {d.name.slice(0, 4)}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-[9px] text-slate-600 uppercase tracking-widest font-bold mb-5">
              {completedCount} / 4 Stones Collected
            </p>

            {/* Speed selector */}
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setSpeed('cinematic')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[10px] font-display font-bold uppercase tracking-wider cursor-pointer transition-all ${speed === 'cinematic' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-slate-800 bg-transparent text-slate-500 hover:border-slate-700'}`}
              >
                <Film size={12} /> Cinematic
              </button>
              <button
                onClick={() => setSpeed('fast')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[10px] font-display font-bold uppercase tracking-wider cursor-pointer transition-all ${speed === 'fast' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-slate-800 bg-transparent text-slate-500 hover:border-slate-700'}`}
              >
                <Zap size={12} /> Fast
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {/* Complete individual domains */}
              <div className="grid grid-cols-2 gap-2">
                {DEMO_DOMAINS.map(d => (
                  <button
                    key={d.domainId}
                    onClick={() => handleCompleteDomain(d)}
                    disabled={isDomainComplete(d)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[9px] font-display font-bold uppercase tracking-wider cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={isDomainComplete(d)
                      ? { borderColor: d.color + '40', backgroundColor: d.color + '08', color: d.color }
                      : { borderColor: '#1e293b', backgroundColor: 'transparent', color: '#94a3b8' }}
                    onMouseEnter={e => !isDomainComplete(d) && (e.currentTarget.style.borderColor = d.color + '60')}
                    onMouseLeave={e => !isDomainComplete(d) && (e.currentTarget.style.borderColor = '#1e293b')}
                  >
                    <span className="text-base">{isDomainComplete(d) ? '✅' : d.icon}</span>
                    Complete {d.name}
                  </button>
                ))}
              </div>

              {/* Complete ALL */}
              <button
                onClick={handleCompleteAll}
                disabled={completedCount === 4}
                className="w-full py-4 rounded-xl border border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-display text-xs font-bold tracking-widest uppercase cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              >
                {completedCount === 4 ? '✅ All Domains Complete' : '⚡ Complete ALL Domains'}
              </button>

              {/* Enter Final Chamber */}
              {completedCount === 4 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => { onClose(); dispatch({ type: 'NAVIGATE_TO_SCENE', scene: 'FINAL_PATH' }); }}
                  className="w-full py-4 rounded-xl border border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-display text-xs font-bold tracking-widest uppercase cursor-pointer transition-all shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                >
                  🏛️ Enter Final Chamber
                </motion.button>
              )}

              {/* Reset */}
              <button
                onClick={() => setPhase('reset-confirm')}
                className="w-full py-2.5 rounded-xl border border-red-900/40 bg-transparent hover:bg-red-950/20 text-red-600 hover:text-red-400 font-display text-[9px] font-bold tracking-widest uppercase cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={10} /> Reset Demo Progress
              </button>
            </div>
          </motion.div>
        )}

        {/* ── RUNNING STAGE ────────────────────────────────── */}
        {phase === 'running-stage' && running && currentDomainData && (
          <StageRunningPanel
            domain={currentDomainData}
            stage={currentDomainData.stages[running.stageIdx]}
            stageIdx={running.stageIdx}
            levelIdx={running.levelIdx}
            completedLevels={running.completedLevels}
            completedStages={running.completedStages}
            speed={speed}
            onCancel={handleCancel}
          />
        )}

        {/* ── FRAGMENT ACQUIRED ─────────────────────────────── */}
        {phase === 'fragment' && currentDomainData && (
          <FragmentPanel fragment={currentFragment} domain={currentDomainData} />
        )}

        {/* ── STONE FORMATION ──────────────────────────────── */}
        {phase === 'stone-formation' && currentDomainData && (
          <StoneFormationPanel domain={currentDomainData} />
        )}

        {/* ── DOMAIN COMPLETE ──────────────────────────────── */}
        {phase === 'domain-complete' && currentDomainData && (
          <DomainCompletePanel domain={currentDomainData} stonesCompleted={stonesCompleted} />
        )}

        {/* ── ALL DOMAINS COMPLETE ─────────────────────────── */}
        {phase === 'all-domains-complete' && (
          <AllDomainsCompletePanel
            onEnterFinalChamber={() => {
              onClose();
              dispatch({ type: 'NAVIGATE_TO_SCENE', scene: 'FINAL_PATH' });
            }}
            onClose={() => { setPhase('menu'); }}
          />
        )}

        {/* ── RESET CONFIRM ────────────────────────────────── */}
        {phase === 'reset-confirm' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-[#0a0005] border border-red-900/40 rounded-2xl p-8 flex flex-col items-center gap-5 text-center"
          >
            <div className="w-14 h-14 rounded-2xl border border-red-500/30 bg-red-950/20 flex items-center justify-center text-2xl">⚠️</div>
            <div>
              <h3 className="font-display text-base font-bold text-white tracking-wider">Reset Demo Progress?</h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                This will erase all game progress and return to the starting state. This cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button onClick={() => setPhase('menu')} className="flex-1 py-3 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 text-[9px] font-display font-bold uppercase tracking-wider cursor-pointer transition-all">
                Cancel
              </button>
              <button onClick={handleReset} className="flex-1 py-3 rounded-xl border border-red-600 bg-red-950/30 text-red-400 hover:bg-red-950/50 text-[9px] font-display font-bold uppercase tracking-wider cursor-pointer transition-all">
                Reset Everything
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// ----------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------

/** Animated stage progression panel */
const StageRunningPanel: React.FC<{
  domain: DemoDomain;
  stage: DemoStage;
  stageIdx: number;
  levelIdx: number;
  completedLevels: boolean[];
  completedStages: boolean[];
  speed: DemoSpeed;
  onCancel: () => void;
}> = ({ domain, stage, stageIdx, levelIdx, completedLevels, completedStages, onCancel }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-md bg-[#06060e] border rounded-3xl p-7 shadow-2xl"
    style={{ borderColor: domain.color + '30' }}
  >
    {/* Domain header */}
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl border flex items-center justify-center text-xl font-bold"
        style={{ borderColor: domain.color + '50', backgroundColor: domain.color + '15', color: domain.color }}>
        {domain.icon}
      </div>
      <div>
        <span className="text-[7px] font-display uppercase tracking-widest font-bold" style={{ color: domain.color }}>
          {domain.name} · STAGE {stageIdx + 1} OF 4
        </span>
        <p className="text-xs font-display font-bold text-white">{stage.stageTitle}</p>
      </div>
    </div>

    {/* Completed stages pills */}
    <div className="flex gap-1.5 mb-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex-1 h-1.5 rounded-full"
          style={{ backgroundColor: completedStages[i] ? domain.color : '#1e293b' }} />
      ))}
    </div>

    {/* Level grid */}
    <div className="grid grid-cols-5 gap-2 mb-5">
      {Array.from({ length: 10 }).map((_, i) => {
        const done = completedLevels[i];
        const current = i === levelIdx;
        const isBoss = i === 9;
        return (
          <motion.div
            key={i}
            animate={current ? { scale: [1, 1.15, 1], boxShadow: [`0 0 0 transparent`, `0 0 12px ${domain.color}`, `0 0 0 transparent`] } : {}}
            transition={{ duration: 0.4, repeat: current ? Infinity : 0 }}
            className="aspect-square rounded-xl flex flex-col items-center justify-center border text-[8px] font-display font-bold"
            style={{
              borderColor: done ? domain.color : current ? domain.color + '80' : '#1e293b',
              backgroundColor: done ? domain.color + '20' : current ? domain.color + '10' : '#0a0a18',
              color: done || current ? domain.color : '#334155',
            }}
          >
            <span>{isBoss ? '★' : i + 1}</span>
            {done && <span className="text-[6px]">✓</span>}
          </motion.div>
        );
      })}
    </div>

    {/* Current level label */}
    <div className="text-center mb-4">
      {levelIdx >= 0 && levelIdx < 10 ? (
        <motion.p
          key={levelIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-display font-bold tracking-wider"
          style={{ color: domain.color }}
        >
          {levelIdx === 9 ? '⚔️ BOSS LEVEL — STAGE COMPLETE' : `LEVEL ${String(levelIdx + 1).padStart(2, '0')} COMPLETE ✓`}
        </motion.p>
      ) : (
        <p className="text-[10px] font-display text-slate-500 uppercase tracking-wider">Initializing...</p>
      )}
    </div>

    <button onClick={onCancel} className="w-full py-2 rounded-xl border border-slate-800 text-slate-600 hover:text-slate-400 text-[8px] font-display uppercase tracking-widest cursor-pointer transition-all">
      Cancel Demo
    </button>
  </motion.div>
);

/** Fragment acquired card */
const FragmentPanel: React.FC<{ fragment: string; domain: DemoDomain }> = ({ fragment, domain }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', bounce: 0.5 }}
    className="flex flex-col items-center text-center gap-5 max-w-xs"
  >
    <motion.div
      animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="w-24 h-24 rounded-3xl border-2 flex items-center justify-center text-5xl"
      style={{
        borderColor: domain.color,
        backgroundColor: domain.color + '15',
        boxShadow: `0 0 40px ${domain.glowColor}`,
      }}
    >
      🧩
    </motion.div>
    <div>
      <p className="text-[9px] font-display uppercase tracking-widest font-bold mb-1" style={{ color: domain.color }}>
        FRAGMENT ACQUIRED
      </p>
      <h3 className="font-display text-xl font-bold text-white">{fragment}</h3>
    </div>
    <div className="px-5 py-2 rounded-full border font-display text-sm font-bold" style={{ borderColor: domain.color + '40', color: domain.color, backgroundColor: domain.color + '08' }}>
      +500 XP STAGE BONUS
    </div>
  </motion.div>
);

/** Stone formation cinematic */
const StoneFormationPanel: React.FC<{ domain: DemoDomain }> = ({ domain }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center text-center gap-6 max-w-sm"
  >
    <p className="text-[9px] font-display uppercase tracking-[0.3em] font-bold" style={{ color: domain.color }}>
      ◈ STONE FORMATION ◈
    </p>

    {/* 4 fragments converging */}
    <div className="relative w-48 h-48">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{
            x: i % 2 === 0 ? -60 : 60,
            y: i < 2 ? -60 : 60,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.3, duration: 0.7, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center text-2xl border"
          style={{
            borderColor: domain.color + '60',
            backgroundColor: domain.color + '20',
            boxShadow: `0 0 16px ${domain.glowColor}`,
          }}
        >
          🧩
        </motion.div>
      ))}

      {/* Central stone appears */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, type: 'spring', bounce: 0.6 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-4xl z-10"
        style={{
          borderColor: domain.color,
          backgroundColor: domain.color + '20',
          boxShadow: `0 0 50px ${domain.glowColor}, 0 0 100px ${domain.glowColor}`,
        }}
      >
        🪨
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2 }}
      className="text-center"
    >
      <p className="text-[8px] font-display uppercase tracking-widest font-bold mb-1" style={{ color: domain.color }}>
        DOMAIN STONE FORMED
      </p>
      <h3 className="font-display text-2xl font-bold text-white tracking-wider">{domain.stoneName}</h3>
    </motion.div>

    {/* Energy rings */}
    {[1, 2, 3].map(i => (
      <motion.div
        key={i}
        initial={{ scale: 0.5, opacity: 0.8 }}
        animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
        transition={{ duration: 1.5, delay: 1.4 + i * 0.2, repeat: Infinity, repeatDelay: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border pointer-events-none"
        style={{ borderColor: domain.color }}
      />
    ))}
  </motion.div>
);

/** Domain complete banner */
const DomainCompletePanel: React.FC<{ domain: DemoDomain; stonesCompleted: DomainId[] }> = ({ domain, stonesCompleted }) => (
  <motion.div
    initial={{ scale: 0.85, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', bounce: 0.4 }}
    className="flex flex-col items-center text-center gap-5 max-w-xs"
  >
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-28 h-28 rounded-3xl border-2 flex items-center justify-center text-6xl"
      style={{
        borderColor: domain.color,
        backgroundColor: domain.color + '15',
        boxShadow: `0 0 60px ${domain.glowColor}`,
      }}
    >
      🪨
    </motion.div>
    <div>
      <p className="text-[9px] font-display uppercase tracking-[0.3em] font-bold mb-1" style={{ color: domain.color }}>DOMAIN MASTERED</p>
      <h2 className="font-display text-3xl font-extrabold text-white tracking-wider uppercase">{domain.name}</h2>
      <p className="text-sm text-slate-400 mt-1">{domain.stoneName}</p>
    </div>
    <div className="flex gap-2">
      {DEMO_DOMAINS.map(d => (
        <div key={d.domainId}
          className="w-8 h-8 rounded-lg border flex items-center justify-center text-base"
          style={{
            borderColor: stonesCompleted.includes(d.domainId) ? d.color : '#1e293b',
            backgroundColor: stonesCompleted.includes(d.domainId) ? d.color + '15' : 'transparent',
          }}>
          {stonesCompleted.includes(d.domainId) ? '🪨' : '🔒'}
        </div>
      ))}
    </div>
    <p className="text-[9px] font-display text-slate-500 uppercase tracking-widest font-bold">
      {stonesCompleted.length} / 4 Stones Collected
    </p>
  </motion.div>
);

/** All four domains complete */
const AllDomainsCompletePanel: React.FC<{
  onEnterFinalChamber: () => void;
  onClose: () => void;
}> = ({ onEnterFinalChamber, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center text-center gap-6 max-w-sm w-full"
  >
    {/* Tesseract glow */}
    <motion.div
      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="text-7xl"
    >
      🔷
    </motion.div>

    <div>
      <p className="text-[9px] font-display uppercase tracking-[0.4em] text-purple-400 font-bold mb-2">ALL FOUR STONES COLLECTED</p>
      <h2 className="font-display text-4xl font-extrabold text-white tracking-wider">TESSERACT<br />AWAKENS</h2>
    </div>

    {/* 4 stones grid */}
    <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
      {DEMO_DOMAINS.map(d => (
        <motion.div
          key={d.domainId}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: DEMO_DOMAINS.indexOf(d) * 0.15 }}
          className="flex items-center gap-3 p-3 rounded-2xl border"
          style={{ borderColor: d.color + '40', backgroundColor: d.color + '08' }}
        >
          <span className="text-2xl">🪨</span>
          <div className="text-left">
            <span className="text-[7px] font-display font-bold uppercase tracking-widest block" style={{ color: d.color }}>{d.name}</span>
            <span className="text-[8px] text-slate-400">{d.stoneName}</span>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="flex flex-col gap-3 w-full">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onEnterFinalChamber}
        className="w-full py-4 rounded-2xl border border-purple-500 bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 font-display text-sm font-bold tracking-widest uppercase cursor-pointer shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2"
      >
        <Trophy size={16} /> Enter The Final Chamber
      </motion.button>
      <button onClick={onClose} className="text-[9px] text-slate-600 hover:text-slate-400 uppercase tracking-widest font-display cursor-pointer transition-all">
        Return to Hub
      </button>
    </div>
  </motion.div>
);

/** Small DEMO indicator badge — shown globally when demo mode was triggered */
export const DemoModeBadge: React.FC = () => (
  <div className="fixed bottom-4 left-4 z-[500] px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-[7px] font-display font-bold uppercase tracking-[0.2em] text-amber-500 pointer-events-none">
    ⚡ DEMO MODE
  </div>
);
