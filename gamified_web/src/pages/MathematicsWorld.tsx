import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sigma,
  CheckCircle,
  Lock,
  Award,
  Lightbulb,
  ArrowLeft,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Info,
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
import { MATHEMATICS_LEVELS, getLevelsByStage } from '../data/mathematicsLevels';
import type { MathLevel } from '../data/mathematicsLevels';
import { audioSynth } from '../utils/audio';

// ── ENVIRONMENT LOOKUPS BY STAGE ──────────────────────────
const getMissionEnvironment = (level: MathLevel) => {
  if (level.stage === 1) {
    return {
      name: "Power Grid Station",
      themeColor: "#00ff88",
      bgColor: "#020804",
      bgClass: "bg-stage1",
      icon: "⚡",
      stageTag: "STAGE 1 — FOUNDATIONS",
      ambientSpots: (
        <>
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#00ff88]/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-900/5 blur-[200px] pointer-events-none" />
        </>
      ),
      environmentalDecoration: (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
          <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" style={{ animationDelay: '0.8s' }} />
        </div>
      ),
      missionSuccessText: "⚡ POWER RESTORED!",
      missionSuccessSubtext: "The city's power is back online!"
    };
  } else if (level.stage === 2) {
    return {
      name: "Cybernet Mainframe",
      themeColor: "#b026ff",
      bgColor: "#06010a",
      bgClass: "bg-stage2",
      icon: "💾",
      stageTag: "STAGE 2 — REASONING",
      ambientSpots: (
        <>
          <div className="absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#b026ff]/5 blur-[120px] pointer-events-none" />
        </>
      ),
      environmentalDecoration: (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(176,38,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-[#b026ff] animate-ping" />
          <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-purple-500 animate-ping" style={{ animationDelay: '0.8s' }} />
        </div>
      ),
      missionSuccessText: "💾 SYSTEM UNLOCKED!",
      missionSuccessSubtext: "The mainframe is online!"
    };
  } else if (level.stage === 3) {
    return {
      name: "Reactor Defense Core",
      themeColor: "#ff9500",
      bgColor: "#080400",
      bgClass: "bg-stage3",
      icon: "⚙️",
      stageTag: "STAGE 3 — APPLICATION",
      ambientSpots: (
        <>
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#ff9500]/5 blur-[120px] pointer-events-none" />
        </>
      ),
      environmentalDecoration: (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,149,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,149,0,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-amber-500/10 rounded-full animate-spin" style={{ animationDuration: '40s' }} />
        </div>
      ),
      missionSuccessText: "⚙️ REACTOR STABLE!",
      missionSuccessSubtext: "The defence systems are online!"
    };
  } else {
    return {
      name: "Command Console Override",
      themeColor: "#ff3b30",
      bgColor: "#0a0101",
      bgClass: "bg-stage4",
      icon: "🚨",
      stageTag: "STAGE 4 — MASTERY",
      ambientSpots: (
        <>
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#ff3b30]/5 blur-[120px] pointer-events-none" />
        </>
      ),
      environmentalDecoration: (
        <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,59,48,0.06) 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-xl h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-pulse" />
        </div>
      ),
      missionSuccessText: "🚨 COMMAND SECURED!",
      missionSuccessSubtext: "The override is complete!"
    };
  }
};

// ── STUDENT-FRIENDLY LEVEL TEXTS ────────────────────────
const getSimplifiedLevelTexts = (level: MathLevel) => {
  switch (level.id) {
    case 'math-1-1':
      return {
        briefingTitle: "THE POWER OUTAGE",
        briefingStory: "🚨 EMERGENCY!\n\nThe city's power system has completely stopped working.\n\nThe power machine uses a number pattern to run safely. We need to find the missing number to turn it back on!",
        story: "The power machine is losing energy! Look at the numbers it uses:",
        objective: "Find the missing number in the pattern and turn the power back on!",
        questionLabel: "What number comes next?",
        conceptEx: "Look at the numbers:\n\n3 → 6 → 9 → 12 → ?\n\nEach number goes up by 3!\n\nSo we just need to add 3 to the last number.",
        hintText: "Look at the gap between the numbers. Each step adds 3. What do you get if you add 3 to 12?",
        feedbackIncorrect: "Almost! Let's look again.\n\n3 → 6 is +3\n6 → 9 is +3\n9 → 12 is +3\n\nWhat do we get when we add 3 to 12?",
        characterDialogue: "The city is going dark! We need to find the missing number in the power machine's pattern. You've got this!",
        hintDialogue: "Listen up! Look at how much the number changes each time. Add that same amount to the last number!",
        successDialogue: "YES! The power is back! You found the pattern — nice work, hero!"
      };
    case 'math-1-2':
      return {
        briefingTitle: "CALIBRATE THE VALVES",
        briefingStory: "🔧 WARNING!\n\nSteam pressure is building up in the water pipes.\n\nWe need to find the right number to open the safety valve before things get worse!",
        story: "The valve control system needs a number to unlock safely.",
        objective: "Find the value of X that makes the equation true and save the pipes!",
        questionLabel: "What is the value of X?",
        conceptEx: "Look at the equation:\n\nX + 7 = 15\n\nThink of it like a balance scale. To find X, subtract 7 from 15:\n\n15 - 7 = ?",
        hintText: "If we take away 7 from both sides of the scale, we find X. What is 15 minus 7?",
        feedbackIncorrect: "Not quite. Think: what number plus 7 equals 15? Try subtracting 7 from 15.",
        characterDialogue: "The pressure is rising! We need to solve this equation to open the safety valve. Find the value of X!",
        hintDialogue: "Think of the equals sign as a balance scale. Whatever you do to one side, do to the other!",
        successDialogue: "The valves are open! Great solving — you kept the system safe!"
      };
    case 'math-1-3':
      return {
        briefingTitle: "DISTRIBUTE MEDICAL SUPPLIES",
        briefingStory: "📦 URGENT!\n\nFood and medical supplies have arrived at our base.\n\nWe must share them fairly between three shelter houses using the correct fractions!",
        story: "12 medicine crates need to be shared between 3 shelters.",
        objective: "Give each shelter the right number of crates using the fractions shown.",
        questionLabel: "How many crates does each shelter get?",
        conceptEx: "We have 12 crates to share:\n\n• Shelter A gets half (1/2):\n  12 ÷ 2 = 6 crates\n\n• Shelter B gets one-third (1/3):\n  12 ÷ 3 = 4 crates\n\n• Shelter C gets one-sixth (1/6):\n  12 ÷ 6 = 2 crates",
        hintText: "To find half of 12, divide by 2. To find one-third of 12, divide by 3. To find one-sixth of 12, divide by 6.",
        feedbackIncorrect: "Almost! Make sure Shelter A has 6 crates, Shelter B has 4 crates, and Shelter C has 2 crates.",
        characterDialogue: "Supplies are in! We need to divide them fairly. Each shelter gets a different fraction of the total. Let's get this right!",
        hintDialogue: "Remember: a fraction like 1/2 means divide by 2. A fraction like 1/3 means divide by 3!",
        successDialogue: "Perfect distribution! All shelters are supplied. You nailed those fractions!"
      };
    case 'math-1-4':
      return {
        briefingTitle: "FLOOD SENSOR RECOVERY",
        briefingStory: "🤖 ALERT!\n\nA flood sensor is stuck in a dangerous flooded area.\n\nGuide our rescue drone through the safe grid paths to reach it — avoid the red warning zones!",
        story: "Our rescue drone needs to reach the flood sensor safely.",
        objective: "Use the direction buttons to move the drone from (0,0) to (2,1). Watch out for the red zones!",
        questionLabel: "Guide the drone to safety!",
        conceptEx: "Grid coordinates work like this:\n\n(X, Y) — X is how far right, Y is how far up.\n\nStart: (0,0)\nTarget: (2,1)\n\nMove 2 steps right, then 1 step up!",
        hintText: "Start at (0,0). Move right to (1,0) and (2,0), then move up to (2,1) to avoid the warning zone at (1,1).",
        feedbackIncorrect: "The drone went off course! Look at the coordinates and try navigating around the warning zone.",
        characterDialogue: "The sensor is stranded! Use the direction controls to guide the drone along a safe path to (2,1).",
        hintDialogue: "Go right twice first, then up once. That way you avoid the red danger zone at (1,1)!",
        successDialogue: "Sensor rescued! Excellent navigation — you read the grid perfectly!"
      };
    case 'math-1-5':
      return {
        briefingTitle: "VAULT PASSCODE",
        briefingStory: "🔒 SECURITY ALERT!\n\nThe vault holding our clean water batteries is locked with a secret passcode.\n\nThe passcode follows a special number pattern — can you crack it?",
        story: "The vault uses a secret number pattern as its passcode.",
        objective: "Find the next number in the pattern and unlock the vault!",
        questionLabel: "What is the next number?",
        conceptEx: "Look at the pattern:\n\n1, 1, 2, 3, 5, 8, 13, ?\n\nEach number = the two numbers before it added together!\n\n5 + 8 = 13\n8 + 13 = ?",
        hintText: "Look at the last two numbers: 8 and 13. Add them together to find the secret passcode!",
        feedbackIncorrect: "Lock failed! Try adding the last two numbers together: 8 + 13.",
        characterDialogue: "The vault is sealed tight! This pattern is the key. Each number is made by adding the two before it. Can you find the next one?",
        hintDialogue: "In this special pattern, every number equals the sum of the two numbers before it. What is 8 + 13?",
        successDialogue: "VAULT OPEN! You cracked the Fibonacci code. The batteries are safe!"
      };
    case 'math-1-6':
      return {
        briefingTitle: "STRUCTURAL STABILIZER",
        briefingStory: "🏗️ DANGER!\n\nAn underground shelter ceiling is starting to crack!\n\nWe need to fit a triangular support bracket — but first, we need to find its missing angle!",
        story: "The shelter ceiling needs a triangular bracket to hold it up.",
        objective: "Find the missing third angle of the triangle so the bracket fits perfectly.",
        questionLabel: "What is the missing angle?",
        conceptEx: "Important rule:\n\nAll three angles in a triangle always add up to 180°!\n\nWe know two angles: 45° and 65°\n\n45 + 65 = 110\n180 - 110 = ?",
        hintText: "The two known angles are 45° and 65°. Add them together (110°), then subtract from 180°.",
        feedbackIncorrect: "The bracket doesn't fit! Remember: 45 + 65 = 110. Subtract 110 from 180 to find the missing angle.",
        characterDialogue: "The ceiling is unstable! We need the exact angle for the support bracket. Remember — all angles in a triangle add up to 180 degrees!",
        hintDialogue: "Add the two angles you know: 45 + 65 = 110. Then subtract from 180 to find the missing one!",
        successDialogue: "The bracket fits! Perfect geometry — the shelter is safe now!"
      };
    case 'math-1-7':
      return {
        briefingTitle: "THE FUEL RUN",
        briefingStory: "🚚 MISSION CRITICAL!\n\nOur base is running low on fuel. Three supply routes are available.\n\nWe need to pick the route that gives us the MOST fuel for our credits!",
        story: "Three routes lead to fuel supplies. We need the best value for our credits.",
        objective: "Compare the routes and pick the one that gives the most fuel per credit spent.",
        questionLabel: "Which route is the best value?",
        conceptEx: "To find the best route, divide the fuel amount by the credits cost:\n\n• Route A: 30 ÷ 20 = 1.5 barrels per credit\n• Route B: 40 ÷ 20 = 2.0 barrels per credit\n• Route C: 50 ÷ 20 = 2.5 barrels per credit\n\nHigher rate = better value!",
        hintText: "Calculate the rate for each route: Route A = 1.5, Route B = 2.0, Route C = 2.5. Which gives you the most fuel per credit?",
        feedbackIncorrect: "That route isn't the most efficient. Route C gives 2.5 barrels for every credit — the best deal!",
        characterDialogue: "We're low on fuel! Compare all three routes and pick the one that gives us the most fuel for our credits. Smart spending is key!",
        hintDialogue: "Divide the fuel amount by the credits for each route. The one with the highest number is the best deal!",
        successDialogue: "Smart choice! Route C was the best value. The base is fuelled up and ready!"
      };
    case 'math-1-8':
      return {
        briefingTitle: "PRESSURE RELIEF ORDER",
        briefingStory: "🚨 OVERHEATING!\n\nThree emergency boilers are getting too hot!\n\nWe need to arrange them from heaviest to lightest to safely release the pressure.",
        story: "Three boilers need to be arranged by weight to release pressure safely.",
        objective: "Put the boilers in order from heaviest to lightest based on the clues.",
        questionLabel: "What is the correct order?",
        conceptEx: "The clues tell us:\n\n• Boiler A is heavier than Boiler B\n• Boiler B is heavier than Boiler C\n\nSo the order from heaviest to lightest is:\n\nA → B → C",
        hintText: "Since A is heavier than B, and B is heavier than C, Boiler A is heaviest, B is middle, and C is lightest.",
        feedbackIncorrect: "Pressure still unbalanced! The correct order from heaviest to lightest is: A, B, C.",
        characterDialogue: "The boilers are overheating! Use the weight clues to arrange them in the right order and release the pressure safely!",
        hintDialogue: "If A > B and B > C, then A is heaviest. Think about what that means for the order!",
        successDialogue: "Pressure released! Perfect ordering — you understood the weight relationships!"
      };
    case 'math-1-9':
      return {
        briefingTitle: "CHOOSE THE SAFE GENERATOR",
        briefingStory: "⚡ POWER NEEDED!\n\nWe need to connect a backup generator to keep communications running.\n\nBut which generator is the SAFEST to use?",
        story: "Three generators are available. We need the one least likely to fail.",
        objective: "Pick the generator with the lowest chance of breaking down.",
        questionLabel: "Which generator is safest?",
        conceptEx: "Compare the failure rates:\n\n• Generator 1: 5% fail rate (LOW — safest!)\n• Generator 2: 12% fail rate (medium)\n• Generator 3: 18% fail rate (HIGH — risky!)\n\nLower percentage = safer choice!",
        hintText: "Choose the option with the smallest failure percentage. Lower risk means it's less likely to break down.",
        feedbackIncorrect: "That generator has a higher chance of breaking! Choose Generator 1 — it only has a 5% failure risk.",
        characterDialogue: "We need backup power now! But picking the wrong generator could cause a blackout. Check the failure rates and pick the safest one!",
        hintDialogue: "A lower percentage means less risk of failure. Which generator has the smallest fail rate?",
        successDialogue: "Safe choice! Generator 1 is running perfectly. Communications are back online!"
      };
    case 'math-1-10':
      return {
        briefingTitle: "THE STAGE 1 BOSS: DAM CRISIS",
        briefingStory: "🌊 STAGE BOSS!\n\nThe city's water dam is overflowing — this is a four-phase emergency!\n\nUse everything you've learned in Stage 1 to save the evacuation outpost and earn the first Mathematics Stone Fragment!",
        story: "The dam is overflowing! Solve all 4 crisis phases to save the city.",
        objective: "Complete all 4 phases to stop the flood and claim the Mathematics Stone Fragment!",
        questionLabel: "Ready for the boss challenge?",
        conceptEx: "You'll use all your Stage 1 skills:\n\n• Phase 1: Guide the probe on a grid\n• Phase 2: Solve an equation (find X)\n• Phase 3: Divide power units fairly\n• Phase 4: Pick the safest option\n\nYou've practiced all of these — you've got this!",
        hintText: "Phase 1: guide probe to (2,2). Phase 2: solve X + 5 = 12. Phase 3: divide 10 power units equally. Phase 4: select the lowest fail risk.",
        feedbackIncorrect: "Keep going! Review the coordinates, equations, and probability choices. You're almost there!",
        characterDialogue: "This is the big one! Four phases stand between us and saving the city. Use everything you've learned. I believe in you!",
        hintDialogue: "Each phase tests a different skill you've already mastered. Take them one at a time and you'll get through!",
        successDialogue: "INCREDIBLE! You stopped the flood! The Mathematics Stone Fragment is yours!"
      };
    default:
      // General fallbacks for higher stages
      {
        let story = level.story
          .replace(/frequency sequence/gi, "number pattern")
          .replace(/arithmetic sequence frequency/gi, "number pattern rule")
          .replace(/auxiliary generator/gi, "backup core")
          .replace(/portal core/gi, "energy machine")
          .replace(/logical constraints/gi, "math rules")
          .replace(/parameters/gi, "details")
          .replace(/analyze/gi, "check")
          .replace(/verify/gi, "test");

        let objective = level.missionObjective
          .replace(/Determine the missing number/gi, "Find the missing number")
          .replace(/Determine the value of variable X/gi, "Find the value of X");

        const missionNum = String(level.levelNumber).padStart(2, '0');
        return {
          briefingTitle: level.missionTitle.split(' — ')[1] || level.missionTitle,
          briefingStory: `${story}`,
          story,
          objective,
          questionLabel: "What is your answer?",
          conceptEx: level.learningObjective,
          hintText: level.hint,
          feedbackIncorrect: level.feedbackIncorrect,
          characterDialogue: `Mission ${missionNum} briefing: ${story}`,
          hintDialogue: level.hint,
          successDialogue: `Great work! You completed ${level.primaryConcept}!`
        };
      }
  }
};

export const MathematicsWorld: React.FC = () => {
  const { state, dispatch, navigateTo } = useGameState();
  const { t } = useTranslation();
  
  const handleReturnToHub = () => {
    dispatch({ type: 'EXIT_DOMAIN' });
    navigateTo('MAIN_INTERFACE');
  };

  // UI Navigation modes: 'domain-map' | 'stage-levels' | 'gameplay'
  const [viewMode, setViewMode] = useState<'domain-map' | 'stage-levels' | 'gameplay'>('domain-map');
  const [selectedStageNum, setSelectedStageNum] = useState<number>(1);
  const [activeLevel, setActiveLevel] = useState<MathLevel | null>(null);
  const currentLevel = activeLevel ? getLocalizedLevel(activeLevel, t) : null;
  const [missionStarted, setMissionStarted] = useState(false);
  const [muted, setMuted] = useState(() => audioSynth.getMuted());
  const [showDemoOverlay, setShowDemoOverlay] = useState(false);
  
  const handleToggleMute = () => {
    const isNowMuted = audioSynth.toggleMute();
    setMuted(isNowMuted);
  };

  // Gameplay specific states
  const [attempts, setAttempts] = useState(1);
  const [_hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [allocationState, setAllocationState] = useState<Record<string, number>>({});
  const [coordinatePath, setCoordinatePath] = useState<[number, number][]>([]);
  const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>([0, 0]);
  const [coordinateMovesList, setCoordinateMovesList] = useState<string[]>([]);
  const [_droneCrashed, setDroneCrashed] = useState(false);
  
  // Boss state
  const [bossPhaseIdx, setBossPhaseIdx] = useState<number>(0);
  const [bossCompletedPhases, setBossCompletedPhases] = useState<boolean[]>([false, false, false, false]);

  // Feedback states
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  
  // Completion ceremony cinematic overlay
  const [showCeremony, setShowCeremony] = useState(false);
  const [earnedFragment, setEarnedFragment] = useState<string>('');

  // XP animation state
  const [showXpPop, setShowXpPop] = useState(false);

  // -------------------------------------------------------------
  // DICTIONARY CALCULATORS
  // -------------------------------------------------------------
  const mathLevelsCount = MATHEMATICS_LEVELS.length;
  const completedMathLevels = MATHEMATICS_LEVELS.filter(l => state.completedStageIds.includes(l.id));
  const overallMathProgress = Math.round((completedMathLevels.length / mathLevelsCount) * 100);

  const isStageCompleted = (stageNum: number) => {
    return state.completedStageIds.includes(`math-${stageNum}-10`);
  };

  const isStageUnlocked = (stageNum: number) => {
    if (stageNum === 1) return true;
    return isStageCompleted(stageNum - 1);
  };

  const isLevelUnlocked = (level: MathLevel) => {
    if (!isStageUnlocked(level.stage)) return false;
    if (level.levelNumber === 1) return true;
    const prevLevelId = `math-${level.stage}-${level.levelNumber - 1}`;
    return state.completedStageIds.includes(prevLevelId);
  };

  const handleEnterStage = (stageNum: number) => {
    setSelectedStageNum(stageNum);
    setViewMode('stage-levels');
    playTone(300, 0.1, 'sine');
  };

  const handleEnterLevel = (level: MathLevel) => {
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
      const initialAlloc: Record<string, number> = {};
      level.gameData.itemsToAllocate?.forEach(item => {
        initialAlloc[item.name] = 0;
      });
      setAllocationState(initialAlloc);
    } else if (level.gameMechanic === 'CoordinateGame') {
      const start = level.gameData.startPoint || [0, 0];
      setCurrentCoordinate(start as [number, number]);
      setCoordinatePath([start as [number, number]]);
      setCoordinateMovesList([]);
    } else if (level.gameMechanic === 'BossGame') {
      setBossPhaseIdx(0);
      setBossCompletedPhases([false, false, false, false]);
      const p1 = level.gameData.phases?.[0];
      if (p1 && (p1.gameMechanic === 'CoordinateGame')) {
        const start = p1.gameData.startPoint || [0, 0];
        setCurrentCoordinate(start as [number, number]);
        setCoordinatePath([start as [number, number]]);
        setCoordinateMovesList([]);
      } else if (p1 && (p1.gameMechanic === 'DragDropGame' || p1.gameMechanic === 'ResourceAllocationGame')) {
        const initialAlloc: Record<string, number> = {};
        p1.gameData.itemsToAllocate?.forEach(item => {
          initialAlloc[item.name] = 0;
        });
        setAllocationState(initialAlloc);
      }
    }
    
    playTone(400, 0.1, 'sine');
  };

  // -------------------------------------------------------------
  // SOUND EFFECTS
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // VERIFICATION LOGIC FOR INDIVIDUAL MINI GAMES
  // -------------------------------------------------------------
  const handleVerifyAnswer = () => {
    if (!activeLevel) return;

    let correct = false;
    let explanation = '';

    if (activeLevel.gameMechanic === 'PatternGame') {
      if (selectedOption === activeLevel.gameData.nextNumberCorrect) {
        correct = true;
      } else {
        explanation = activeLevel.feedbackIncorrect;
      }
    } else if (activeLevel.gameMechanic === 'EquationGame') {
      const val = parseInt(inputValue) || selectedOption;
      if (val === activeLevel.gameData.correctValue) {
        correct = true;
      } else {
        explanation = activeLevel.feedbackIncorrect;
      }
    } else if (activeLevel.gameMechanic === 'DragDropGame' || activeLevel.gameMechanic === 'ResourceAllocationGame') {
      const correctAlloc = activeLevel.gameData.correctAllocation || {};
      let matches = true;
      Object.keys(correctAlloc).forEach(key => {
        if (allocationState[key] !== correctAlloc[key]) {
          matches = false;
        }
      });
      if (matches) {
        correct = true;
      } else {
        explanation = activeLevel.feedbackIncorrect;
      }
    } else if (activeLevel.gameMechanic === 'CoordinateGame') {
      const target = activeLevel.gameData.targetPoint || [0, 0];
      if (currentCoordinate[0] === target[0] && currentCoordinate[1] === target[1]) {
        correct = true;
      } else {
        explanation = activeLevel.feedbackIncorrect;
      }
    } else if (activeLevel.gameMechanic === 'GeometryGame') {
      if (selectedOption === activeLevel.gameData.geometryAnswer) {
        correct = true;
      } else {
        explanation = activeLevel.feedbackIncorrect;
      }
    } else if (activeLevel.gameMechanic === 'LogicGame') {
      if (selectedOption === activeLevel.gameData.logicAnswer) {
        correct = true;
      } else {
        explanation = activeLevel.feedbackIncorrect;
      }
    } else if (activeLevel.gameMechanic === 'OptimizationGame') {
      if (selectedOption === activeLevel.gameData.optimalChoiceName) {
        correct = true;
      } else {
        explanation = activeLevel.feedbackIncorrect;
      }
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
      setFeedbackText(explanation || 'Not quite — look at the numbers and try again!');
      setAttempts(a => a + 1);
      playTone(180, 0.4, 'triangle');
      setShowFeedback(true);
    }
  };

  // -------------------------------------------------------------
  // VERIFICATION FOR BOSS PHASES
  // -------------------------------------------------------------
  const handleVerifyBossPhase = () => {
    if (!activeLevel || !activeLevel.gameData.phases) return;
    const phases = activeLevel.gameData.phases;
    const phase = phases[bossPhaseIdx];
    if (!phase) return;
    let correct = false;
    let explanation = '';

    if (phase.gameMechanic === 'CoordinateGame') {
      const target = phase.gameData.targetPoint || [0, 0];
      if (currentCoordinate[0] === target[0] && currentCoordinate[1] === target[1]) {
        correct = true;
      } else {
        explanation = 'The drone missed the target. Check the grid and try navigating there again.';
      }
    } else if (phase.gameMechanic === 'EquationGame') {
      const val = parseInt(inputValue) || selectedOption;
      if (val === phase.gameData.correctValue) {
        correct = true;
      } else {
        explanation = `Not quite! Look at the equation: ${phase.gameData.equation}. Find the value that makes it balance.`;
      }
    } else if (phase.gameMechanic === 'DragDropGame' || phase.gameMechanic === 'ResourceAllocationGame') {
      const correctAlloc = phase.gameData.correctAllocation || {};
      let matches = true;
      Object.keys(correctAlloc).forEach(key => {
        if (allocationState[key] !== correctAlloc[key]) {
          matches = false;
        }
      });
      if (matches) {
        correct = true;
      } else {
        explanation = 'The distribution is off. Review the fractions and try again.';
      }
    } else if (phase.gameMechanic === 'LogicGame') {
      if (selectedOption === phase.gameData.logicAnswer) {
        correct = true;
      } else {
        explanation = 'Wrong choice. Think about the clues and try again.';
      }
    } else if (phase.gameMechanic === 'GeometryGame') {
      if (selectedOption === phase.gameData.geometryAnswer) {
        correct = true;
      } else {
        explanation = 'The angle is wrong. Remember: all angles in a triangle add up to 180°.';
      }
    } else if (phase.gameMechanic === 'OptimizationGame') {
      if (selectedOption === phase.gameData.optimalChoiceName) {
        correct = true;
      } else {
        explanation = 'Not the best choice. Calculate the rate for each option and pick the highest one.';
      }
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
        if (nextPhase) {
          if (nextPhase.gameMechanic === 'CoordinateGame') {
            const start = nextPhase.gameData.startPoint || [0, 0];
            setCurrentCoordinate(start as [number, number]);
            setCoordinatePath([start as [number, number]]);
            setCoordinateMovesList([]);
          } else if (nextPhase.gameMechanic === 'DragDropGame' || nextPhase.gameMechanic === 'ResourceAllocationGame') {
            const initialAlloc: Record<string, number> = {};
            nextPhase.gameData.itemsToAllocate?.forEach(item => {
              initialAlloc[item.name] = 0;
            });
            setAllocationState(initialAlloc);
          }
        }
      } else {
        setIsCorrect(true);
        setFeedbackText('All 4 phases complete! The flood is stopped — you saved the city!');
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
    
    const currentXp = state.player.xp || 0;
    const newXp = currentXp + activeLevel.xpReward;
    dispatch({ type: 'UPDATE_PLAYER', updates: { xp: newXp } });

    if (activeLevel.isBoss && activeLevel.stageFragmentReward) {
      const stageKey = `math-0${activeLevel.stage}`;
      dispatch({ type: 'COMPLETE_STAGE', stageId: stageKey });
      setEarnedFragment(activeLevel.stageFragmentReward);
      setShowCeremony(true);
      
      if (activeLevel.stage === 4) {
        dispatch({
          type: 'COLLECT_STONE',
          stoneId: 'mathematics-stone',
          domainId: 'mathematics'
        });
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

  // -------------------------------------------------------------
  // COORDINATE GAME NAVIGATION CONTROLS
  // -------------------------------------------------------------
  const handleMoveCoordinate = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT', obstacles: [number, number][], gridSize: number) => {
    let [x, y] = currentCoordinate;
    if (dir === 'UP' && y < gridSize - 1) y += 1;
    if (dir === 'DOWN' && y > 0) y -= 1;
    if (dir === 'LEFT' && x > 0) x -= 1;
    if (dir === 'RIGHT' && x < gridSize - 1) x += 1;

    const hitObstacle = obstacles.some(obs => obs[0] === x && obs[1] === y);
    if (hitObstacle) {
      setDroneCrashed(true);
      playTone(150, 0.5, 'triangle');
      const start = activeLevel?.gameData.startPoint || [0, 0];
      setCurrentCoordinate(start as [number, number]);
      setCoordinatePath([start as [number, number]]);
      setCoordinateMovesList([]);
      setTimeout(() => setDroneCrashed(false), 2000);
      return;
    }

    setCurrentCoordinate([x, y]);
    setCoordinatePath([...coordinatePath, [x, y]]);
    setCoordinateMovesList([...coordinateMovesList, dir]);
    playTone(500, 0.05, 'sine');
  };

  // -------------------------------------------------------------
  // COMPONENT RENDERING
  // -------------------------------------------------------------
  return (
    <div 
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-100 select-none"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #03030a 0%, #010105 100%)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Grid overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[90px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-[90px] pointer-events-none" style={{ zIndex: 1 }} />

      {/* Header bar */}
      <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between border-b border-emerald-500/10 bg-[#020208]/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 shadow-sm">
            <Sigma size={18} className="text-[#00ff88]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm tracking-[0.2em] font-bold text-slate-100 leading-none">MATHEMATICS</span>
            <span className="text-[10px] tracking-widest text-[#00ff88] uppercase mt-0.5">TESSERACT STEM HERO</span>
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
            <span className="text-xs tracking-wider text-slate-500 uppercase leading-none">Progress</span>
            <span className="font-display text-sm text-[#00ff88] mt-0.5 font-bold">
              {completedMathLevels.length} / 40 ({overallMathProgress}%)
            </span>
          </div>
          
          <button 
            onClick={handleToggleMute}
            className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center bg-[#0d0d1a] text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <button 
            onClick={() => {
              if (viewMode === 'gameplay') {
                setViewMode('stage-levels');
                setActiveLevel(null);
              } else if (viewMode === 'stage-levels') {
                setViewMode('domain-map');
              } else {
                handleReturnToHub();
              }
            }} 
            className="px-4 py-2 rounded-lg border border-slate-800 bg-[#0d0d1a] hover:border-slate-700 text-xs font-display tracking-widest uppercase text-slate-300 font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft size={13} /> Back
          </button>
        </div>
      </header>

      {/* Main content router */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* ========================================================= */}
          {/* VIEW: MATHEMATICS DOMAIN MAP SCREEN                        */}
          {/* ========================================================= */}
          {viewMode === 'domain-map' && (
            <motion.div
              key="domain-map"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full flex flex-col lg:flex-row gap-8 items-center lg:items-stretch py-4"
            >
              {/* Left Column: Mathematics Stone Materialization Card */}
              <div className="w-full lg:w-5/12 flex flex-col justify-between p-6 rounded-2xl border border-emerald-500/10 bg-[#080812]/80 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <span className="font-display text-xs tracking-widest text-[#00ff88] uppercase block mb-1">{t('stageMap.centralRelic', 'Central Relic')}</span>
                  <h2 className="font-display text-xl tracking-wider text-slate-100 uppercase">{t('stones.mathematicsStone', 'The Axiom Stone')}</h2>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">{t('stageMap.mathDesc', 'Master arithmetic, geometry, algebra, and mathematical ciphers. Complete all 4 Stage Bosses to unlock the Mathematics Stone!')}</p>
                </div>

                {/* The Stone Visual hologram */}
                <div className="my-8 flex justify-center items-center relative py-6">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-44 h-44 rounded-full border border-emerald-500/15 border-dashed"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-36 h-36 rounded-full border border-[#00ff88]/10 border-dotted"
                  />

                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                      <path d="M 50,50 L 50,15 A 35,35 0 0,0 15,50 Z" fill={isStageCompleted(1) ? 'url(#activeGlow)' : '#0f0f22'} stroke="#00ff88" strokeWidth="1" className={isStageCompleted(1) ? 'animate-pulse' : 'opacity-40'} />
                      <path d="M 50,50 L 85,50 A 35,35 0 0,0 50,15 Z" fill={isStageCompleted(2) ? 'url(#activeGlow)' : '#0f0f22'} stroke="#00ff88" strokeWidth="1" className={isStageCompleted(2) ? 'animate-pulse' : 'opacity-40'} />
                      <path d="M 50,50 L 50,85 A 35,35 0 0,0 85,50 Z" fill={isStageCompleted(3) ? 'url(#activeGlow)' : '#0f0f22'} stroke="#00ff88" strokeWidth="1" className={isStageCompleted(3) ? 'animate-pulse' : 'opacity-40'} />
                      <path d="M 50,50 L 15,50 A 35,35 0 0,0 50,85 Z" fill={isStageCompleted(4) ? 'url(#activeGlow)' : '#0f0f22'} stroke="#00ff88" strokeWidth="1" className={isStageCompleted(4) ? 'animate-pulse' : 'opacity-40'} />
                      <defs>
                        <radialGradient id="activeGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#006633" stopOpacity="0.4" />
                        </radialGradient>
                      </defs>
                    </svg>
                    <div className="z-10 w-10 h-10 rounded-full bg-black/80 border border-emerald-500/40 flex items-center justify-center shadow-lg">
                      <Sigma size={16} className="text-[#00ff88]" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800/40 pt-4 flex justify-between items-center text-sm text-slate-500">
                  <span>{t('stageMap.fragmentsAcquired', 'Fragments Acquired')}:</span>
                  <span className="font-display text-[#00ff88] font-bold">
                    {[1,2,3,4].filter(num => isStageCompleted(num)).length} / 4 {t('stageMap.secured', 'SECURED')}
                  </span>
                </div>
              </div>

              {/* Right Column: Stages Grid */}
              <div className="w-full lg:w-7/12 flex flex-col gap-4">
                {[
                  {
                    num: 1,
                    title: `${t('stageMap.stage', 'STAGE')} 1 — ${t('stageMap.discover', 'DISCOVER')}`,
                    desc: t('stageMap.mathDesc1', 'Master number patterns, spatial geometry, basic equations, fractions, decimals, and measurement.'),
                    locked: false,
                  },
                  {
                    num: 2,
                    title: `${t('stageMap.stage', 'STAGE')} 2 — ${t('stageMap.understand', 'UNDERSTAND')}`,
                    desc: t('stageMap.mathDesc2', 'Explore algebra, ratios, proportions, coordinate geometry, statistics, and probability.'),
                    locked: !isStageUnlocked(2),
                  },
                  {
                    num: 3,
                    title: `${t('stageMap.stage', 'STAGE')} 3 — ${t('stageMap.lifeEarth', 'ADVANCED')}`,
                    desc: t('stageMap.mathDesc3', 'Master advanced algebra, trigonometry, geometric proofs, functions, exponents, and scale balance equations.'),
                    locked: !isStageUnlocked(3),
                  },
                  {
                    num: 4,
                    title: `${t('stageMap.stage', 'STAGE')} 4 — ${t('stageMap.mastery', 'MASTERY')}`,
                    desc: t('stageMap.mathDesc4', 'Master calculus concepts, matrices, cryptography, complex ciphers, and multi-variable logic matrices.'),
                    locked: !isStageUnlocked(4),
                  }
                ].map(st => {
                  const completed = isStageCompleted(st.num);
                  return (
                    <div 
                      key={st.num}
                      className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                        completed
                          ? 'border-emerald-500/20 bg-emerald-500/5'
                          : st.locked
                          ? 'border-slate-800 bg-[#040409]/40 opacity-55'
                          : 'border-emerald-500/20 bg-[#080812]/80 hover:border-emerald-500/40 hover:bg-[#0c0c1b]/80'
                      }`}
                    >
                      <div className="max-w-[420px]">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-xs tracking-wider font-semibold text-[#00ff88] uppercase">
                            {t('stageMap.stage', 'STAGE')} {st.num}
                          </span>
                          {completed && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-display text-xs font-bold tracking-widest uppercase">
                              ✓ {t('stageMap.completed', 'Completed')}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-base tracking-wider text-slate-100 uppercase mt-0.5">
                          {st.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-end gap-2 justify-between shrink-0">
                        {st.locked ? (
                          <div className="flex items-center gap-1.5 text-slate-500 font-display text-xs tracking-widest uppercase">
                            <Lock size={14} /> {t('stageMap.locked', 'LOCKED')}
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEnterStage(st.num)}
                            className="px-5 py-2.5 rounded-xl border border-emerald-500 bg-[#00ff88]/10 text-[#00ff88] font-display text-xs font-bold tracking-widest uppercase hover:bg-[#00ff88]/20 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,255,136,0.1)] hover:shadow-[0_0_15px_rgba(0,255,136,0.25)]"
                          >
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

          {/* ========================================================= */}
          {/* VIEW: STAGE LEVEL GRID SCREEN                             */}
          {/* ========================================================= */}
          {viewMode === 'stage-levels' && (
            <motion.div
              key="stage-levels"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl py-4 flex flex-col items-center"
            >
              <div className="text-center mb-8 max-w-xl">
                <span className="font-display text-xs tracking-widest text-[#00ff88] uppercase block mb-1">
                  {t('stageMap.stage', 'STAGE')} {selectedStageNum}
                </span>
                <h1 className="font-display text-3xl tracking-wider text-white uppercase">
                  {selectedStageNum === 1 && t('stageMap.discover', 'DISCOVER')}
                  {selectedStageNum === 2 && t('stageMap.understand', 'UNDERSTAND')}
                  {selectedStageNum === 3 && t('stageMap.lifeEarth', 'ADVANCED')}
                  {selectedStageNum === 4 && t('stageMap.mastery', 'MASTERY')}
                </h1>
                <p className="text-sm text-slate-400 mt-2">
                  {t('stageMap.completeMissionsPrompt', 'Complete each mission in order. Boss unlocks after all 9 missions!')}
                </p>
              </div>

              {/* Levels grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full mb-10">
                {getLevelsByStage(selectedStageNum).map(rawLevel => {
                  const level = getLocalizedLevel(rawLevel, t);
                  const completed = state.completedStageIds.includes(level.id);
                  const unlocked = isLevelUnlocked(level);
                  const isActive = unlocked && !completed;

                  return (
                    <button
                      key={level.id}
                      disabled={!unlocked}
                      onClick={() => handleEnterLevel(level)}
                      className={`aspect-square p-4 rounded-xl border flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden ${
                        completed
                          ? 'border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/10'
                          : isActive
                          ? 'border-[#00ff88] bg-[#00ff88]/5 hover:bg-[#00ff88]/10 shadow-[0_0_15px_rgba(0,255,136,0.15)] animate-pulse'
                          : 'border-slate-800 bg-[#040409]/60 opacity-40 cursor-default'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
                      )}

                      <div className="flex justify-between items-center w-full">
                        <span className="font-display text-xs font-bold text-slate-500 tracking-wider">
                          LV {level.levelNumber}
                        </span>
                        {completed ? (
                          <CheckCircle size={14} className="text-emerald-400" />
                        ) : level.isBoss ? (
                          <Award size={14} className="text-[#00ff88] animate-bounce" />
                        ) : !unlocked ? (
                          <Lock size={12} className="text-slate-600" />
                        ) : null}
                      </div>

                      <div>
                        <h4 className="font-display text-xs font-bold text-slate-200 tracking-wider uppercase line-clamp-2">
                          {level.missionTitle.split(' — ')[1] || level.missionTitle}
                        </h4>
                        <span className="text-xs text-slate-400 mt-1 block uppercase tracking-widest font-semibold">
                          +{level.xpReward} XP
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="w-full p-4 rounded-xl border border-slate-800 bg-[#06060c]/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-[#00ff88]" />
                  <span className="text-slate-400 text-sm">
                    {isStageCompleted(selectedStageNum) ? t('stageMap.stageCompleteFragment', '✓ Stage complete — Fragment secured!') : t('stageMap.completeMissionsForBoss', 'Complete all missions to unlock the Stage Boss.')}
                  </span>
                </div>
                <button
                  onClick={() => setViewMode('domain-map')}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 font-display text-xs tracking-widest uppercase hover:bg-white/5 transition-all cursor-pointer"
                >
                  {t('stageMap.backToStages', 'Back to Stages')}
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* VIEW: REUSABLE MISSIONENGINE FOR PLAYABLE LEVELS          */}
          {/* ========================================================= */}
          {viewMode === 'gameplay' && activeLevel && (
            <motion.div
              key="gameplay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              {(() => {
                const texts = getSimplifiedLevelTexts(currentLevel || activeLevel);
                const env = getMissionEnvironment(activeLevel);
                const stageLevels = MATHEMATICS_LEVELS.filter(l => l.stage === activeLevel.stage);
                const currentHP = attempts <= 1 ? 3 : attempts === 2 ? 2 : 1;

                /* ────────────────────────────────────────────────
                   MISSION BRIEFING SCREEN (cinematic pre-game)
                ──────────────────────────────────────────────── */
                if (!missionStarted) {
                  return (
                    <div
                      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
                      style={{ background: `radial-gradient(ellipse at 60% 40%, ${env.themeColor}08 0%, #010105 70%)` }}
                    >
                      {env.environmentalDecoration}
                      {env.ambientSpots}

                      {/* Briefing top bar */}
                      <div className="relative z-20 w-full px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/30 backdrop-blur-sm shrink-0">
                        <button
                          onClick={() => { setViewMode('stage-levels'); setActiveLevel(null); }}
                          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-all cursor-pointer text-sm font-display tracking-wider uppercase"
                        >
                          <ArrowLeft size={16} /> Back to missions
                        </button>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 tracking-widest uppercase font-display">{env.stageTag}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-600" />
                          <span className="text-xs text-[#00ff88] tracking-widest uppercase font-display font-bold">MISSION {String(activeLevel.levelNumber).padStart(2, '0')}</span>
                        </div>
                        <div className="font-display text-sm text-amber-400 font-bold">
                          ⚡ {state.player.xp ?? 0} XP
                        </div>
                      </div>

                      {/* Briefing main content */}
                      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">

                        {/* LEFT — Character / Story Panel */}
                        <div className="lg:w-5/12 flex flex-col justify-between p-8 lg:p-10 border-r border-white/5 bg-black/20">
                          {/* Character badge */}
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_8px_#00ff88]" />
                            <span className="text-xs text-[#00ff88] font-display tracking-widest uppercase font-bold">COMMS — ACTIVE</span>
                          </div>

                          {/* Character portrait area */}
                          <div className="flex-1 flex flex-col justify-center gap-6">
                            <MissionCharacterDisplay
                              src="/miles-character.jpg"
                              alt="Agent Morales"
                              themeColor={env.themeColor}
                              variant="briefing"
                              onlineLabel="MORALES · ONLINE"
                            />

                            {/* Story dialogue bubble */}
                            <div className="relative p-5 rounded-2xl border bg-black/40 backdrop-blur-sm"
                              style={{ borderColor: `${env.themeColor}20` }}>
                              <div className="absolute -top-2.5 left-6 w-5 h-5 rotate-45 bg-[#030306] border-l border-t"
                                style={{ borderColor: `${env.themeColor}20` }} />
                              <p className="text-base text-slate-200 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                                {texts.briefingStory.split('\n\n').map((para, i) => (
                                  <span key={i}>
                                    {i > 0 && <><br /><br /></>}
                                    {para}
                                  </span>
                                ))}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT — Mission Details + Launch */}
                        <div className="lg:w-7/12 flex flex-col justify-center p-8 lg:p-12 gap-8">
                          {/* Mission tag */}
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shadow-lg"
                                style={{ borderColor: `${env.themeColor}50`, background: `${env.themeColor}10`, boxShadow: `0 0 20px ${env.themeColor}20` }}>
                                {env.icon}
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 tracking-widest uppercase font-display">Stage {activeLevel.stage} · Mission {String(activeLevel.levelNumber).padStart(2, '0')}</p>
                                <h1 className="font-display text-4xl font-extrabold tracking-wide text-white mt-0.5" style={{ textShadow: `0 0 30px ${env.themeColor}40` }}>
                                  {texts.briefingTitle}
                                </h1>
                              </div>
                            </div>
                          </div>

                          {/* Mission details grid */}
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

                          {/* XP reward + difficulty */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10">
                              <Zap size={18} className="text-amber-400" />
                              <span className="font-display text-xl text-amber-400 font-extrabold">+{activeLevel.xpReward} XP</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50">
                              <span className="text-sm text-slate-400 font-display tracking-wider uppercase">Difficulty:</span>
                              <span className={`text-sm font-bold font-display tracking-wider ${
                                activeLevel.difficulty === 'EASY' ? 'text-emerald-400' 
                                : activeLevel.difficulty === 'MEDIUM' ? 'text-amber-400' 
                                : 'text-red-400'
                              }`}>{activeLevel.difficulty}</span>
                            </div>
                          </div>

                          {/* Start mission button */}
                          <div className="flex flex-col gap-3">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => { setMissionStarted(true); playTone(520, 0.15, 'sine'); }}
                              className="w-full py-5 rounded-2xl border-2 font-display text-xl font-extrabold tracking-widest uppercase transition-all cursor-pointer"
                              style={{
                                borderColor: env.themeColor,
                                background: `linear-gradient(135deg, ${env.themeColor}20 0%, ${env.themeColor}05 100%)`,
                                color: env.themeColor,
                                boxShadow: `0 0 30px ${env.themeColor}25`
                              }}
                            >
                              {env.icon} START MISSION
                            </motion.button>
                            <button
                              onClick={() => { setViewMode('stage-levels'); setActiveLevel(null); }}
                              className="text-sm tracking-widest text-slate-600 hover:text-slate-400 uppercase transition-all underline cursor-pointer text-center"
                            >
                              Return to Stage Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                /* ────────────────────────────────────────────────
                   FULL-SCREEN GAME VIEWPORT
                ──────────────────────────────────────────────── */
                return (
                  <div
                    className="fixed inset-0 z-50 flex flex-col w-full h-screen overflow-hidden text-slate-100"
                    style={{ background: `radial-gradient(ellipse at 50% 30%, ${env.themeColor}06 0%, #02020a 60%)` }}
                  >
                    {env.environmentalDecoration}
                    {env.ambientSpots}

                    {/* ═══ TOP HUD ═══ */}
                    <header className="relative z-20 w-full h-16 px-5 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md shrink-0">
                      {/* Left: Back + mission info */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => { setViewMode('stage-levels'); setActiveLevel(null); setMissionStarted(false); playTone(300, 0.1, 'sine'); }}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 hover:bg-slate-700/50 text-sm text-slate-300 font-display tracking-wider uppercase transition-all cursor-pointer"
                        >
                          <ArrowLeft size={15} /> Back
                        </button>
                        <div className="w-px h-6 bg-slate-700" />
                        <div className="flex flex-col">
                          <span className="font-display text-sm font-bold text-white leading-none tracking-wider">
                            MATHEMATICS · STAGE {activeLevel.stage}
                          </span>
                          <span className="text-xs tracking-widest text-[#00ff88] leading-none mt-0.5 font-bold uppercase">
                            MISSION {String(activeLevel.levelNumber).padStart(2, '0')} — {texts.briefingTitle}
                          </span>
                        </div>
                      </div>

                      {/* Center: Stage progress dots */}
                      <div className="hidden md:flex items-center gap-1.5 bg-black/30 px-4 py-2 rounded-full border border-white/5">
                        <span className="font-display text-xs tracking-widest text-slate-500 uppercase mr-2 font-bold">Progress:</span>
                        {stageLevels.map(l => {
                          const isCurrent = l.id === activeLevel.id;
                          const isDone = state.completedStageIds.includes(l.id);
                          return (
                            <div
                              key={l.id}
                              title={`Mission ${l.levelNumber}`}
                              className={`rounded-full flex items-center justify-center font-display font-bold transition-all ${
                                isCurrent
                                  ? 'w-7 h-7 text-xs text-black shadow-lg'
                                  : isDone
                                  ? 'w-5 h-5 text-[9px]'
                                  : 'w-4 h-4 text-[8px]'
                              }`}
                              style={{
                                background: isCurrent ? env.themeColor : isDone ? `${env.themeColor}30` : '#1a1a2e',
                                border: isCurrent ? `2px solid ${env.themeColor}` : isDone ? `1px solid ${env.themeColor}50` : '1px solid #2a2a3e',
                                boxShadow: isCurrent ? `0 0 10px ${env.themeColor}60` : 'none',
                                color: isCurrent ? '#000' : isDone ? env.themeColor : '#4a4a6a'
                              }}
                            >
                              {l.levelNumber === 10 ? '★' : l.levelNumber}
                            </div>
                          );
                        })}
                      </div>

                      {/* Right: HP + XP + Sound */}
                      <div className="flex items-center gap-3">
                        {/* HP hearts */}
                        <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-red-900/30">
                          <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-display mr-1">HP</span>
                          <span className="text-base">{currentHP >= 1 ? '❤️' : '🖤'}</span>
                          <span className="text-base">{currentHP >= 2 ? '❤️' : '🖤'}</span>
                          <span className="text-base">{currentHP >= 3 ? '❤️' : '🖤'}</span>
                        </div>
                        {/* XP counter */}
                        <div className="font-display text-sm text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                          <Zap size={14} className="text-amber-400" />
                          {state.player.xp ?? 0} XP
                        </div>
                        <button onClick={handleToggleMute} className="w-9 h-9 rounded-lg border border-slate-700 flex items-center justify-center bg-slate-800/50 text-slate-400 hover:text-slate-200 cursor-pointer transition-all">
                          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                        </button>
                      </div>
                    </header>

                    {/* ═══ THREE-COLUMN WORKSPACE ═══ */}
                    <div
                      className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
                      style={{ height: 'calc(100vh - 64px)' }}
                    >

                      {/* ─── LEFT PANEL — Character + Dialogue ─── */}
                      <div className="lg:col-span-3 border-r border-white/5 bg-black/30 backdrop-blur-sm flex flex-col p-5 gap-5 overflow-y-auto">
                        
                        {/* Character portrait */}
                        <MissionCharacterDisplay
                          src={showHint ? '/future-self.jpg' : '/miles-character.jpg'}
                          alt="Agent Morales"
                          themeColor={env.themeColor}
                          variant="gameplay"
                          onlineLabel={showHint ? 'FUTURE MORALES · COMMS' : 'MORALES · ONLINE'}
                        />

                        {/* Audio waveform */}
                        <div className="flex items-center gap-0.5 justify-center h-6 px-2">
                          {[...Array(14)].map((_, i) => (
                            <div key={i}
                              className="flex-1 rounded-full transition-all"
                              style={{
                                height: showFeedback ? `${6 + Math.abs(Math.sin(i * 0.7)) * 14}px` : '3px',
                                background: isCorrect && showFeedback ? '#00ff88' : showFeedback ? '#ef4444' : env.themeColor,
                                transitionDelay: `${i * 30}ms`,
                                opacity: showFeedback ? 0.8 : 0.3
                              }}
                            />
                          ))}
                        </div>

                        {/* Dialogue bubble */}
                        <div className="flex-1 flex flex-col gap-3">
                          <div className="relative p-4 rounded-2xl border bg-black/40"
                            style={{ borderColor: `${env.themeColor}20`, minHeight: '120px' }}>
                            <div className="absolute -top-2.5 left-5 w-5 h-5 rotate-45 bg-[#030306] border-l border-t"
                              style={{ borderColor: `${env.themeColor}20` }} />
                            <p className="text-sm text-slate-200 leading-relaxed">
                              {showFeedback
                                ? (isCorrect
                                  ? `"${(texts as any).successDialogue || 'Excellent work, agent! That\'s the correct answer!'}"` 
                                  : `"${(texts as any).feedbackIncorrect || texts.feedbackIncorrect}"`)
                                : showHint
                                ? `"${(texts as any).hintDialogue || texts.hintText}"`
                                : `"${(texts as any).characterDialogue || texts.story}"`}
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

                      {/* ─── CENTER PANEL — Mission Environment + Game ─── */}
                      <div className="lg:col-span-6 flex flex-col gap-4 p-5 overflow-y-auto">

                        {/* Environment status bar */}
                        <div className="flex items-center justify-between p-3 rounded-xl border bg-black/40"
                          style={{ borderColor: `${env.themeColor}20` }}>
                          <div className="flex items-center gap-2.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${showFeedback && isCorrect ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}
                              style={{ boxShadow: showFeedback && isCorrect ? '0 0 8px #4ade80' : '0 0 8px #fbbf24' }} />
                            <span className="text-sm font-display font-bold uppercase tracking-wider text-slate-200">
                              {showFeedback && isCorrect ? `${env.missionSuccessText}` : `🚨 ${env.name} — NEEDS YOUR HELP!`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-display text-slate-500 uppercase font-bold">Power Level</span>
                            <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: env.themeColor }}
                                animate={{ width: showFeedback && isCorrect ? '100%' : '28%' }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* PUZZLE TERMINAL */}
                        <div className="flex-1 flex flex-col justify-center items-center rounded-2xl border-2 p-6 gap-6 relative overflow-hidden"
                          style={{
                            borderColor: `${env.themeColor}25`,
                            background: `radial-gradient(ellipse at 50% 0%, ${env.themeColor}06 0%, #020209 70%)`
                          }}>
                          
                          {/* Terminal header glow line */}
                          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                            style={{ background: `linear-gradient(90deg, transparent, ${env.themeColor}60, transparent)` }} />

                          {/* PatternGame */}
                          {activeLevel.gameMechanic === 'PatternGame' && activeLevel.gameData.sequence && (
                            <div className="flex flex-col items-center gap-6 w-full">
                              <div className="text-center">
                                <p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Power Machine Pattern</p>
                                <p className="text-lg text-slate-300">{texts.story}</p>
                              </div>
                              {/* Sequence display */}
                              <div className="flex gap-3 items-center flex-wrap justify-center">
                                {activeLevel.gameData.sequence.map((term, i, arr) => (
                                  <React.Fragment key={i}>
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-display text-3xl border-2 font-extrabold shadow-lg ${
                                      term === '?'
                                        ? 'animate-pulse'
                                        : 'border-slate-700 bg-slate-900/80 text-slate-100'
                                    }`}
                                      style={term === '?' ? {
                                        borderColor: env.themeColor,
                                        color: env.themeColor,
                                        background: `${env.themeColor}10`,
                                        boxShadow: `0 0 20px ${env.themeColor}30`
                                      } : {}}>
                                      {term}
                                    </div>
                                    {i < arr.length - 1 && (
                                      <div className="text-slate-600 text-xl font-bold">→</div>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                              {/* Concept teaching */}
                              <div className="w-full p-4 rounded-xl border border-white/5 bg-white/3 text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                                {texts.conceptEx}
                              </div>
                            </div>
                          )}

                          {/* EquationGame */}
                          {activeLevel.gameMechanic === 'EquationGame' && (
                            <div className="flex flex-col items-center gap-6 w-full">
                              <div className="text-center">
                                <p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Equation to Solve</p>
                                <p className="text-base text-slate-300">{texts.story}</p>
                              </div>
                              <div className="px-10 py-6 rounded-2xl border-2 font-display text-5xl tracking-widest font-extrabold text-center shadow-inner"
                                style={{
                                  borderColor: `${env.themeColor}35`,
                                  background: `${env.themeColor}08`,
                                  color: env.themeColor,
                                  textShadow: `0 0 20px ${env.themeColor}50`
                                }}>
                                {activeLevel.gameData.equation}
                              </div>
                              <div className="w-full p-4 rounded-xl border border-white/5 bg-white/3 text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                                {texts.conceptEx}
                              </div>
                            </div>
                          )}

                          {/* GeometryGame */}
                          {activeLevel.gameMechanic === 'GeometryGame' && (
                            <div className="flex flex-col items-center gap-6 w-full">
                              <div className="text-center">
                                <p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Geometry Challenge</p>
                                <p className="text-base text-slate-300">{texts.story}</p>
                              </div>
                              {activeLevel.gameData.geometryType === 'triangle' ? (
                                <div className="p-4 rounded-2xl border border-white/5 bg-black/40">
                                  <svg width="260" height="160" viewBox="0 0 260 160" className="overflow-visible"
                                    style={{ filter: `drop-shadow(0 0 12px ${env.themeColor}40)` }}>
                                    <polygon points="130,16 24,144 236,144" fill="none" stroke={env.themeColor} strokeWidth="2.5" strokeLinejoin="round" />
                                    {/* Glow effect */}
                                    <polygon points="130,16 24,144 236,144" fill={`${env.themeColor}06`} />
                                    <text x="130" y="44" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">?°</text>
                                    <text x="44" y="138" fill="#94a3b8" fontSize="15" fontWeight="bold" textAnchor="middle">45°</text>
                                    <text x="216" y="138" fill="#94a3b8" fontSize="15" fontWeight="bold" textAnchor="middle">65°</text>
                                  </svg>
                                </div>
                              ) : (
                                <div className="p-5 rounded-2xl border border-white/5 bg-black/40 text-base font-display text-slate-200 text-center">
                                  {activeLevel.gameData.geometryQuestion}
                                </div>
                              )}
                              <div className="w-full p-4 rounded-xl border border-white/5 bg-white/3 text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                                {texts.conceptEx}
                              </div>
                            </div>
                          )}

                          {/* CoordinateGame */}
                          {activeLevel.gameMechanic === 'CoordinateGame' && (
                            <div className="flex flex-col items-center gap-5 w-full">
                              <div className="text-center">
                                <p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Grid Navigation</p>
                                <p className="text-base text-slate-300">{texts.story}</p>
                              </div>
                              <div className="flex flex-col items-center gap-4">
                                {/* Grid */}
                                <div
                                  className="grid border-2 border-white/10 p-2 rounded-2xl bg-black/60"
                                  style={{ gridTemplateColumns: `repeat(${activeLevel.gameData.gridSize || 3}, 64px)`, gap: '5px' }}
                                >
                                  {Array.from({ length: activeLevel.gameData.gridSize || 3 }).map((_, colIdx) => {
                                    const gs = activeLevel.gameData.gridSize || 3;
                                    const y = gs - 1 - colIdx;
                                    return Array.from({ length: gs }).map((_, x) => {
                                      const isDrone = currentCoordinate[0] === x && currentCoordinate[1] === y;
                                      const tp = activeLevel.gameData.targetPoint || [0, 0];
                                      const isTarget = tp[0] === x && tp[1] === y;
                                      const isObs = activeLevel.gameData.obstacles?.some((o: number[]) => o[0] === x && o[1] === y);
                                      return (
                                        <div key={`${x}-${y}`}
                                          className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-display font-bold border transition-all`}
                                          style={{
                                            background: isDrone ? `${env.themeColor}20` : isTarget ? '#10b98115' : isObs ? '#ef444415' : '#08080f',
                                            borderColor: isDrone ? env.themeColor : isTarget ? '#10b981' : isObs ? '#ef4444' : '#1e1e2e',
                                            boxShadow: isDrone ? `0 0 15px ${env.themeColor}50` : isTarget ? '0 0 10px #10b98130' : 'none'
                                          }}>
                                          <span className="text-xl">{isDrone ? '🤖' : isTarget ? '📍' : isObs ? '⚠️' : ''}</span>
                                          <span className="text-[9px] text-slate-500 mt-0.5">{x},{y}</span>
                                        </div>
                                      );
                                    });
                                  })}
                                </div>
                                {/* D-pad controls */}
                                <div className="flex flex-col items-center gap-2">
                                  <p className="text-xs text-slate-500 uppercase tracking-widest font-display">Move the drone</p>
                                  <div className="grid grid-cols-3 gap-2 w-36">
                                    <div />
                                    <button onClick={() => handleMoveCoordinate('UP', activeLevel.gameData.obstacles || [], activeLevel.gameData.gridSize || 3)}
                                      className="w-10 h-10 border-2 border-slate-700 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 text-lg cursor-pointer hover:border-slate-500 hover:bg-slate-700 transition-all active:scale-95">▲</button>
                                    <div />
                                    <button onClick={() => handleMoveCoordinate('LEFT', activeLevel.gameData.obstacles || [], activeLevel.gameData.gridSize || 3)}
                                      className="w-10 h-10 border-2 border-slate-700 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 text-lg cursor-pointer hover:border-slate-500 hover:bg-slate-700 transition-all active:scale-95">◀</button>
                                    <div className="w-10 h-10 flex items-center justify-center text-xs text-slate-500 font-display font-bold">NAV</div>
                                    <button onClick={() => handleMoveCoordinate('RIGHT', activeLevel.gameData.obstacles || [], activeLevel.gameData.gridSize || 3)}
                                      className="w-10 h-10 border-2 border-slate-700 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 text-lg cursor-pointer hover:border-slate-500 hover:bg-slate-700 transition-all active:scale-95">▶</button>
                                    <div />
                                    <button onClick={() => handleMoveCoordinate('DOWN', activeLevel.gameData.obstacles || [], activeLevel.gameData.gridSize || 3)}
                                      className="w-10 h-10 border-2 border-slate-700 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 text-lg cursor-pointer hover:border-slate-500 hover:bg-slate-700 transition-all active:scale-95">▼</button>
                                    <div />
                                  </div>
                                  <p className="text-xs text-slate-600 font-display">Position: ({currentCoordinate[0]}, {currentCoordinate[1]}) | Target: ({(activeLevel.gameData.targetPoint || [0,0])[0]}, {(activeLevel.gameData.targetPoint || [0,0])[1]})</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ResourceAllocationGame / DragDropGame */}
                          {(activeLevel.gameMechanic === 'ResourceAllocationGame' || activeLevel.gameMechanic === 'DragDropGame') && (
                            <div className="flex flex-col gap-5 w-full max-w-md">
                              <div className="text-center">
                                <p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Resource Distribution</p>
                                <p className="text-base text-slate-300">{texts.story}</p>
                              </div>
                              <div className="p-4 rounded-xl border border-white/5 bg-white/3 text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                                {texts.conceptEx}
                              </div>
                              <div className="flex flex-col gap-3">
                                {activeLevel.gameData.itemsToAllocate?.map(item => (
                                  <div key={item.name} className="p-4 rounded-xl border border-white/5 bg-black/40 flex items-center justify-between gap-4">
                                    <span className="font-display text-sm text-slate-200 font-bold">{item.name}</span>
                                    <div className="flex items-center gap-3">
                                      <button onClick={() => { const c = allocationState[item.name] || 0; if (c > 0) setAllocationState({ ...allocationState, [item.name]: c - 1 }); }}
                                        className="w-10 h-10 border-2 border-slate-700 bg-slate-800 rounded-xl flex items-center justify-center text-slate-300 hover:border-slate-500 cursor-pointer transition-all">
                                        <Minus size={16} /></button>
                                      <span className="font-display text-2xl font-extrabold w-12 text-center" style={{ color: env.themeColor }}>
                                        {allocationState[item.name] || 0}
                                      </span>
                                      <button onClick={() => { const c = allocationState[item.name] || 0; if (c < item.totalToDistribute) setAllocationState({ ...allocationState, [item.name]: c + 1 }); }}
                                        className="w-10 h-10 border-2 border-slate-700 bg-slate-800 rounded-xl flex items-center justify-center text-slate-300 hover:border-slate-500 cursor-pointer transition-all">
                                        <Plus size={16} /></button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* LogicGame */}
                          {activeLevel.gameMechanic === 'LogicGame' && (
                            <div className="flex flex-col gap-5 w-full max-w-lg">
                              <div className="text-center">
                                <p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Logic Puzzle</p>
                                <p className="text-base text-slate-300">{texts.story}</p>
                              </div>
                              <div className="p-5 rounded-2xl border border-white/5 bg-black/40 text-base text-slate-200 leading-relaxed">
                                {activeLevel.gameData.logicPremise}
                              </div>
                              <div className="p-4 rounded-xl border border-white/5 bg-white/3 text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                                {texts.conceptEx}
                              </div>
                            </div>
                          )}

                          {/* OptimizationGame */}
                          {activeLevel.gameMechanic === 'OptimizationGame' && activeLevel.gameData.optionsToChoose && (
                            <div className="flex flex-col gap-5 w-full max-w-lg">
                              <div className="text-center">
                                <p className="text-xs text-slate-500 font-display tracking-widest uppercase font-bold mb-2">Choose the Best Option</p>
                                <p className="text-base text-slate-300">{texts.story}</p>
                              </div>
                              <div className="p-4 rounded-xl border border-white/5 bg-white/3 text-sm text-slate-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                                {texts.conceptEx}
                              </div>
                              <div className="flex flex-col gap-3">
                                {activeLevel.gameData.optionsToChoose.map(opt => (
                                  <button key={opt.name}
                                    onClick={() => { setSelectedOption(opt.name); playTone(450, 0.08, 'sine'); }}
                                    className="p-4 rounded-xl border-2 text-left text-sm font-display flex justify-between items-center cursor-pointer transition-all"
                                    style={{
                                      borderColor: selectedOption === opt.name ? env.themeColor : '#1e1e2e',
                                      background: selectedOption === opt.name ? `${env.themeColor}10` : '#08080f',
                                      color: selectedOption === opt.name ? env.themeColor : '#cbd5e1',
                                      boxShadow: selectedOption === opt.name ? `0 0 15px ${env.themeColor}20` : 'none'
                                    }}>
                                    <span className="font-bold">{opt.name}</span>
                                    <span className="text-xs opacity-60">Rate: {opt.efficiency}×</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* BossGame */}
                          {activeLevel.gameMechanic === 'BossGame' && activeLevel.gameData.phases && (() => {
                            const phases = activeLevel.gameData.phases;
                            const cp = phases[bossPhaseIdx];
                            if (!cp) return null;
                            const cpd = cp.gameData || {};
                            const phaseNames = ['START THE POWER CORE', 'ROUTE THE ENERGY', 'POWER THE CITY', 'SAVE THE CITY'];
                            return (
                              <div className="flex flex-col gap-5 w-full">
                                {/* Boss phase header */}
                                <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20 bg-red-950/10">
                                  <div>
                                    <p className="text-xs text-red-400 font-display uppercase tracking-widest font-bold">BOSS BATTLE</p>
                                    <p className="text-lg font-bold text-white mt-0.5">PHASE {bossPhaseIdx + 1} — {phaseNames[bossPhaseIdx] || `PHASE ${bossPhaseIdx + 1}`}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    {(phases as any[]).map((_: any, i: number) => (
                                      <div key={i} className="flex flex-col items-center gap-1">
                                        <div className={`w-10 h-2 rounded-full transition-all ${
                                          bossCompletedPhases[i] ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' 
                                          : i === bossPhaseIdx ? 'bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]' 
                                          : 'bg-slate-800'
                                        }`} />
                                        <span className="text-[9px] text-slate-600 font-display">{i + 1}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-sm text-slate-200 leading-relaxed">{cp.instruction}</div>

                                {/* Boss phase game mechanics */}
                                {cp.gameMechanic === 'CoordinateGame' && (
                                  <div className="flex justify-center">
                                    <div className="flex flex-col items-center gap-3">
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
                                              <div key={`${x}-${y}`}
                                                className="w-12 h-12 rounded-lg flex flex-col items-center justify-center font-display border transition-all"
                                                style={{
                                                  background: isDrone ? `${env.themeColor}20` : isTgt ? '#10b98115' : isObs ? '#ef444415' : '#08080f',
                                                  borderColor: isDrone ? env.themeColor : isTgt ? '#10b981' : isObs ? '#ef4444' : '#1e1e2e'
                                                }}>
                                                <span className="text-base">{isDrone ? '🤖' : isTgt ? '📍' : isObs ? '⚠️' : ''}</span>
                                                <span className="text-[8px] text-slate-600">{x},{y}</span>
                                              </div>
                                            );
                                          });
                                        })}
                                      </div>
                                      <div className="grid grid-cols-3 gap-1.5 w-32">
                                        <div /><button onClick={() => handleMoveCoordinate('UP', cpd.obstacles || [], cpd.gridSize || 3)}
                                          className="w-9 h-9 border border-slate-700 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 cursor-pointer hover:border-slate-500">▲</button><div />
                                        <button onClick={() => handleMoveCoordinate('LEFT', cpd.obstacles || [], cpd.gridSize || 3)}
                                          className="w-9 h-9 border border-slate-700 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 cursor-pointer hover:border-slate-500">◀</button>
                                        <div className="w-9 h-9 flex items-center justify-center text-[8px] text-slate-500 font-display">NAV</div>
                                        <button onClick={() => handleMoveCoordinate('RIGHT', cpd.obstacles || [], cpd.gridSize || 3)}
                                          className="w-9 h-9 border border-slate-700 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 cursor-pointer hover:border-slate-500">▶</button>
                                        <div /><button onClick={() => handleMoveCoordinate('DOWN', cpd.obstacles || [], cpd.gridSize || 3)}
                                          className="w-9 h-9 border border-slate-700 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 cursor-pointer hover:border-slate-500">▼</button><div />
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {cp.gameMechanic === 'EquationGame' && (
                                  <div className="flex flex-col items-center gap-4">
                                    <div className="px-8 py-5 rounded-2xl border-2 font-display text-4xl text-center font-extrabold"
                                      style={{ borderColor: `${env.themeColor}35`, color: env.themeColor, background: `${env.themeColor}08` }}>
                                      {cpd.equation}
                                    </div>
                                    {cpd.equationOptions && (
                                      <div className="grid grid-cols-2 gap-3 w-full">
                                        {(cpd.equationOptions as any[]).map((opt: any) => (
                                          <button key={opt} onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                            className="py-4 rounded-xl border-2 font-display text-2xl font-bold cursor-pointer transition-all"
                                            style={{
                                              borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e',
                                              background: selectedOption === opt ? `${env.themeColor}15` : '#08080f',
                                              color: selectedOption === opt ? env.themeColor : '#e2e8f0'
                                            }}>
                                            {opt}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                    {!cpd.equationOptions && (
                                      <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Enter value…"
                                        className="w-full py-4 px-6 rounded-2xl border-2 border-slate-800 bg-slate-900 text-slate-100 font-display text-2xl text-center focus:outline-none transition-all"
                                        style={{ focusBorderColor: env.themeColor } as any} />
                                    )}
                                  </div>
                                )}
                                {(cp.gameMechanic === 'ResourceAllocationGame' || cp.gameMechanic === 'DragDropGame') && (
                                  <div className="flex flex-col gap-3">
                                    {cpd.itemsToAllocate?.map((item: any) => (
                                      <div key={item.name} className="p-3.5 rounded-xl border border-white/5 bg-black/40 flex items-center justify-between">
                                        <span className="font-display text-sm text-slate-200 font-bold">{item.name}</span>
                                        <div className="flex items-center gap-3">
                                          <button onClick={() => { const c = allocationState[item.name] || 0; if (c > 0) setAllocationState({ ...allocationState, [item.name]: c - 1 }); }}
                                            className="w-9 h-9 border border-slate-700 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:border-slate-500 cursor-pointer"><Minus size={14} /></button>
                                          <span className="font-display text-xl font-extrabold w-10 text-center" style={{ color: env.themeColor }}>{allocationState[item.name] || 0}</span>
                                          <button onClick={() => { const c = allocationState[item.name] || 0; if (c < item.totalToDistribute) setAllocationState({ ...allocationState, [item.name]: c + 1 }); }}
                                            className="w-9 h-9 border border-slate-700 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:border-slate-500 cursor-pointer"><Plus size={14} /></button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {cp.gameMechanic === 'LogicGame' && (
                                  <div className="flex flex-col gap-3">
                                    <p className="text-sm text-slate-400 text-center">{cpd.logicPremise}</p>
                                    {cpd.logicOptions?.map((opt: string) => (
                                      <button key={opt} onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                        className="py-3 px-4 rounded-xl border-2 font-display text-sm text-left cursor-pointer transition-all"
                                        style={{
                                          borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e',
                                          background: selectedOption === opt ? `${env.themeColor}10` : '#08080f',
                                          color: selectedOption === opt ? env.themeColor : '#cbd5e1'
                                        }}>
                                        {opt}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })()}

                          {/* Bottom glow line */}
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
                            style={{ background: `linear-gradient(90deg, transparent, ${env.themeColor}40, transparent)` }} />
                        </div>

                        {/* ANSWER CHOICES for option-based games */}
                        {(activeLevel.gameMechanic === 'PatternGame' && activeLevel.gameData.sequenceOptions) && (
                          <div className="grid grid-cols-2 gap-4">
                            <p className="col-span-2 text-center text-sm text-slate-400 font-display uppercase tracking-widest">{texts.questionLabel}</p>
                            {activeLevel.gameData.sequenceOptions.map(opt => (
                              <motion.button key={opt}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                className="h-24 rounded-2xl border-2 font-display text-4xl font-extrabold cursor-pointer transition-all"
                                style={{
                                  borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e',
                                  background: selectedOption === opt ? `${env.themeColor}15` : '#06060e',
                                  color: selectedOption === opt ? env.themeColor : '#e2e8f0',
                                  boxShadow: selectedOption === opt ? `0 0 25px ${env.themeColor}30` : 'none'
                                }}>
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        )}

                        {(activeLevel.gameMechanic === 'EquationGame' && activeLevel.gameData.equationOptions) && (
                          <div className="grid grid-cols-2 gap-4">
                            <p className="col-span-2 text-center text-sm text-slate-400 font-display uppercase tracking-widest">{texts.questionLabel}</p>
                            {activeLevel.gameData.equationOptions.map(opt => (
                              <motion.button key={opt}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                className="h-24 rounded-2xl border-2 font-display text-4xl font-extrabold cursor-pointer transition-all"
                                style={{
                                  borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e',
                                  background: selectedOption === opt ? `${env.themeColor}15` : '#06060e',
                                  color: selectedOption === opt ? env.themeColor : '#e2e8f0',
                                  boxShadow: selectedOption === opt ? `0 0 25px ${env.themeColor}30` : 'none'
                                }}>
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        )}

                        {(activeLevel.gameMechanic === 'EquationGame' && !activeLevel.gameData.equationOptions) && (
                          <div>
                            <p className="text-center text-sm text-slate-400 font-display uppercase tracking-widest mb-3">{texts.questionLabel}</p>
                            <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)}
                              placeholder={`Enter ${activeLevel.gameData.variableToSolve || 'value'}…`}
                              className="w-full py-5 px-6 rounded-2xl border-2 border-slate-800 bg-slate-900/80 text-slate-100 font-display text-3xl text-center focus:outline-none transition-all"
                              style={{ '--tw-ring-color': env.themeColor } as any} />
                          </div>
                        )}

                        {(activeLevel.gameMechanic === 'GeometryGame' && activeLevel.gameData.geometryOptions) && (
                          <div className="grid grid-cols-2 gap-4">
                            <p className="col-span-2 text-center text-sm text-slate-400 font-display uppercase tracking-widest">{texts.questionLabel}</p>
                            {activeLevel.gameData.geometryOptions.map(opt => (
                              <motion.button key={opt}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                className="h-24 rounded-2xl border-2 font-display text-3xl font-extrabold cursor-pointer transition-all"
                                style={{
                                  borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e',
                                  background: selectedOption === opt ? `${env.themeColor}15` : '#06060e',
                                  color: selectedOption === opt ? env.themeColor : '#e2e8f0',
                                  boxShadow: selectedOption === opt ? `0 0 25px ${env.themeColor}30` : 'none'
                                }}>
                                {opt}°
                              </motion.button>
                            ))}
                          </div>
                        )}

                        {(activeLevel.gameMechanic === 'LogicGame' && activeLevel.gameData.logicOptions) && (
                          <div className="flex flex-col gap-3">
                            <p className="text-center text-sm text-slate-400 font-display uppercase tracking-widest">{texts.questionLabel}</p>
                            {activeLevel.gameData.logicOptions.map(opt => (
                              <motion.button key={opt}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => { setSelectedOption(opt); playTone(450, 0.08, 'sine'); }}
                                className="h-20 rounded-2xl border-2 font-display text-base font-bold cursor-pointer transition-all text-left px-6"
                                style={{
                                  borderColor: selectedOption === opt ? env.themeColor : '#1e1e2e',
                                  background: selectedOption === opt ? `${env.themeColor}15` : '#06060e',
                                  color: selectedOption === opt ? env.themeColor : '#e2e8f0',
                                  boxShadow: selectedOption === opt ? `0 0 25px ${env.themeColor}25` : 'none'
                                }}>
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        )}

                      </div>

                      {/* ─── RIGHT PANEL — Objectives, Hint, Submit ─── */}
                      <div className="lg:col-span-3 border-l border-white/5 bg-black/30 backdrop-blur-sm flex flex-col p-4 gap-4 overflow-y-auto">

                        {/* 1. MISSION GOAL */}
                        <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 shadow-sm shrink-0">
                          <span className="font-display text-[11px] tracking-widest text-slate-400 uppercase block mb-1 font-bold">🎯 Mission Goal</span>
                          <p className="text-xs text-slate-100 font-semibold leading-relaxed">{texts.objective}</p>
                        </div>

                        {/* 2. SHIELD AI ASSISTANT */}
                        <div className="flex-1 min-h-[220px]">
                          <ShieldAIChatbot
                            domainId="mathematics"
                            domainName="Mathematics"
                            themeColor={env.themeColor}
                            stage={activeLevel.stage}
                            missionNumber={activeLevel.levelNumber}
                            missionTitle={texts.briefingTitle}
                            primaryConcept={activeLevel.primaryConcept}
                            objective={texts.objective}
                            questionText={texts.story || texts.questionLabel}
                            submittedAnswer={inputValue || selectedOption || null}
                            isCorrect={showFeedback ? isCorrect : null}
                            onTriggerHint={() => setShowHint(true)}
                            variant="desktop"
                          />
                        </div>

                        {/* 3. NEED A HINT? SECTION */}
                        <div className="border-t border-white/10 pt-3 shrink-0">
                          <button 
                            onClick={() => { setShowHint(!showHint); if (!showHint) { setHintsUsed(h => h + 1); playTone(700, 0.15, 'sine'); } }}
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
                                style={{ whiteSpace: 'pre-line' }}
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
                              style={{
                                borderColor: env.themeColor,
                                background: `${env.themeColor}15`,
                                color: env.themeColor,
                                boxShadow: `0 0 15px ${env.themeColor}20`
                              }}>
                              ✓ CHECK MY ANSWER
                            </motion.button>
                          )}
                        </div>

                      </div>
                    </div>

                    {/* ═══ MISSION COMPLETE OVERLAY ═══ */}
                    <AnimatePresence>
                      {showFeedback && isCorrect && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-[60] flex flex-col items-center justify-center p-8"
                          style={{ background: `radial-gradient(ellipse at 50% 40%, ${env.themeColor}12 0%, rgba(2,2,8,0.97) 70%)`, backdropFilter: 'blur(16px)' }}
                        >
                          {/* Animated rings */}
                          <motion.div
                            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute w-72 h-72 rounded-full pointer-events-none border"
                            style={{ borderColor: `${env.themeColor}30` }}
                          />
                          <motion.div
                            animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                            className="absolute w-96 h-96 rounded-full pointer-events-none border"
                            style={{ borderColor: `${env.themeColor}15` }}
                          />

                          <motion.div
                            initial={{ scale: 0.6, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: 'spring', bounce: 0.45, delay: 0.1 }}
                            className="flex flex-col items-center text-center gap-6 max-w-md relative z-10"
                          >
                            {/* Big icon */}
                            <motion.div
                              animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl shadow-2xl border-2"
                              style={{
                                borderColor: env.themeColor,
                                background: `${env.themeColor}15`,
                                boxShadow: `0 0 60px ${env.themeColor}40`
                              }}>
                              {env.icon}
                            </motion.div>

                            {/* Mission result */}
                            <div>
                              <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="font-display text-xs tracking-[0.3em] uppercase font-bold mb-2"
                                style={{ color: env.themeColor }}>
                                MISSION COMPLETE
                              </motion.p>
                              <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="font-display text-4xl font-extrabold tracking-wide text-white"
                                style={{ textShadow: `0 0 30px ${env.themeColor}50` }}>
                                {env.missionSuccessText}
                              </motion.h2>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.55 }}
                                className="text-base text-slate-400 mt-2">
                                {env.missionSuccessSubtext}
                              </motion.p>
                            </div>

                            {/* Concept mastered */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.65 }}
                              className="px-6 py-4 rounded-2xl border w-full"
                              style={{ borderColor: `${env.themeColor}25`, background: `${env.themeColor}08` }}>
                              <div className="flex items-center gap-3 justify-center">
                                <Star size={18} style={{ color: env.themeColor }} />
                                <div className="text-center">
                                  <p className="text-xs text-slate-500 tracking-widest uppercase font-display">Concept Mastered</p>
                                  <p className="text-lg font-bold text-white mt-0.5">{activeLevel.primaryConcept}</p>
                                </div>
                                <Star size={18} style={{ color: env.themeColor }} />
                              </div>
                            </motion.div>

                            {/* XP reward */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8 }}
                              className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-amber-500/30 bg-amber-500/10">
                              <Zap size={24} className="text-amber-400" />
                              <span className="font-display text-3xl text-amber-400 font-extrabold">+{activeLevel.xpReward} XP</span>
                            </motion.div>

                            {/* Floating XP pop animation */}
                            <AnimatePresence>
                              {showXpPop && (
                                <motion.div
                                  initial={{ opacity: 1, y: 0 }}
                                  animate={{ opacity: 0, y: -60 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 2, ease: 'easeOut' }}
                                  className="absolute font-display text-2xl font-extrabold text-amber-400 pointer-events-none"
                                  style={{ top: '40%', textShadow: '0 0 20px #fbbf24' }}>
                                  ⚡ +{activeLevel.xpReward} XP
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Next mission button */}
                            <motion.button
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1 }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={handleContinueNext}
                              className="px-12 py-5 rounded-2xl border-2 font-display text-xl font-extrabold tracking-widest uppercase transition-all cursor-pointer"
                              style={{
                                borderColor: env.themeColor,
                                background: `${env.themeColor}20`,
                                color: env.themeColor,
                                boxShadow: `0 0 30px ${env.themeColor}30`
                              }}>
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

      {/* ========================================================= */}
      {/* CINEMATIC CEREMONY OVERLAY: TESSERACT FRAGMENT ACQUIRED   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showCeremony && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-6 bg-black/97 backdrop-blur-xl"
          >
            {/* Spinning background geometric portal circles */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-80 h-80 rounded-full border border-emerald-500/10 border-dashed pointer-events-none"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute w-64 h-64 rounded-full border border-[#00ff88]/8 border-dotted pointer-events-none"
            />
            <motion.div 
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-96 h-96 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)' }}
            />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.3 }}
              className="flex flex-col items-center text-center max-w-sm z-10 gap-6"
            >
              {/* Rotating stone fragment */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-[#00ff88] rounded-2xl flex items-center justify-center shadow-[0_0_60px_rgba(0,255,136,0.6)]"
              >
                <Sigma size={42} className="text-black" strokeWidth={2.5} />
              </motion.div>

              <div>
                <span className="font-display text-xs tracking-[0.3em] text-[#00ff88] uppercase block mb-2">
                  ⚡ Tesseract Sync Activated ⚡
                </span>
                <h2 className="font-display text-2xl tracking-widest text-white uppercase font-extrabold">
                  {earnedFragment} Secured!
                </h2>
              </div>

              <div className="w-16 h-0.5 bg-[#00ff88] rounded-full" />
              
              <div className="flex items-center gap-3">
                {[1,2,3,4].map(n => (
                  <div key={n} className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border-2"
                      style={{
                        borderColor: isStageCompleted(n) ? '#00ff88' : '#1e1e2e',
                        background: isStageCompleted(n) ? 'rgba(0,255,136,0.15)' : '#06060e',
                        boxShadow: isStageCompleted(n) ? '0 0 15px rgba(0,255,136,0.4)' : 'none'
                      }}>
                      {isStageCompleted(n) ? <Shield size={18} className="text-[#00ff88]" /> : <Lock size={16} className="text-slate-600" />}
                    </div>
                    <span className="text-xs text-slate-500 font-display">STG {n}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">
                You've mastered the foundations of mathematics and earned a Stone Fragment. The Mathematics Stone is taking shape!
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCloseCeremony}
                className="px-10 py-4 rounded-2xl border-2 border-[#00ff88] bg-[#00ff88]/15 hover:bg-[#00ff88]/25 text-[#00ff88] font-display text-base font-extrabold tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(0,255,136,0.3)] cursor-pointer"
              >
                ⚡ Continue Adventure
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer bar */}
      <footer className="relative z-10 w-full px-6 py-3 flex justify-between items-center text-xs text-slate-600 border-t border-white/5 bg-black/20">
        <span>S.H.I.E.L.D. · MATHEMATICS DOMAIN</span>
        <span>Tesseract STEM Hero</span>
      </footer>

      {showDemoOverlay && <DemoModeOverlay onClose={() => setShowDemoOverlay(false)} />}
    </div>
  );
};
export default MathematicsWorld;
