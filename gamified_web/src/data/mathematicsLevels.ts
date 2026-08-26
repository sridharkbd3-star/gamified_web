// ============================================================
// Tesseract: The STEM Hero — Mathematics Domain Levels Data
// Contains all 40 levels (4 stages × 10 levels)
// ============================================================

export interface MathGameData {
  // Equation solving
  equation?: string;
  variableToSolve?: string;
  correctValue?: number;
  equationOptions?: number[];

  // Drag and Drop / Resource Allocation
  itemsToAllocate?: { name: string; requiredRatio: number; totalToDistribute: number }[];
  targetRatios?: Record<string, number>;
  correctAllocation?: Record<string, number>;

  // Pattern / Sequence Completion
  sequence?: (number | string)[];
  nextNumberCorrect?: number;
  sequenceOptions?: number[];

  // Graph interpretation
  graphData?: { x: number; y: number; label?: string }[];
  graphQuestion?: string;
  graphOptions?: string[];
  graphAnswer?: string;

  // Coordinate Navigation
  gridSize?: number;
  startPoint?: [number, number];
  targetPoint?: [number, number];
  obstacles?: [number, number][];
  correctMoves?: string[]; // e.g. ["FORWARD", "RIGHT"]

  // Geometry
  geometryType?: 'triangle' | 'circle' | 'cylinder' | 'pyramid';
  givenValues?: Record<string, number>;
  targetFormula?: string;
  geometryQuestion?: string;
  geometryOptions?: number[];
  geometryAnswer?: number;

  // Logic Game
  logicType?: 'weights' | 'ordering' | 'gates' | 'venn' | 'probability';
  logicPremise?: string;
  logicOptions?: string[];
  logicAnswer?: string;

  // Optimization
  optionsToChoose?: { name: string; cost: number; benefit: number; efficiency: number }[];
  optimalChoiceName?: string;

  // Boss multi-part components
  phases?: {
    phaseNumber: number;
    title: string;
    description: string;
    gameMechanic: string;
    gameData: MathGameData;
    instruction: string;
  }[];
}

export interface MathLevel {
  id: string; // e.g. "math-stage1-1"
  domain: 'mathematics';
  stage: number; // 1, 2, 3, 4
  levelNumber: number; // 1-10
  missionTitle: string;
  story: string;
  primaryConcept: string;
  secondaryConcepts: string[];
  learningObjective: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  gameMechanic:
    | 'EquationGame'
    | 'DragDropGame'
    | 'ResourceAllocationGame'
    | 'PatternGame'
    | 'GraphGame'
    | 'CoordinateGame'
    | 'GeometryGame'
    | 'LogicGame'
    | 'OptimizationGame'
    | 'BossGame';
  missionObjective: string;
  successCondition: string;
  hint: string;
  feedbackIncorrect: string;
  xpReward: number;
  isBoss: boolean;
  stageFragmentReward: string | null;
  gameData: MathGameData;
}

export const MATHEMATICS_LEVELS: MathLevel[] = [
  // ==========================================
  // STAGE 1 — FOUNDATIONS (Levels 1–10)
  // ==========================================
  {
    id: 'math-1-1',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 1,
    missionTitle: 'MISSION 01 — THE POWER GRID TRIGGER',
    story: 'An EMP blackout has locked the backup solar grids. To boot up the auxiliary generator, match the arithmetic sequence frequency pulsating from the portal core.',
    primaryConcept: 'Arithmetic Sequences',
    secondaryConcepts: ['Pattern Recognition', 'Arithmetic Addition'],
    learningObjective: 'Identify and extend linear sequences by adding constant increments.',
    difficulty: 'EASY',
    gameMechanic: 'PatternGame',
    missionObjective: 'Determine the missing number to complete the frequency sequence: 3, 6, 9, 12, ...',
    successCondition: 'Correctly input 15 to complete the progression pattern.',
    hint: 'Look at the gap between each adjacent number. How much is added each time? Apply that same addition to 12.',
    feedbackIncorrect: 'Incorrect sequence frequency. Each stage adds exactly 3. Try adding 3 to the last term (12).',
    xpReward: 50,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [3, 6, 9, 12, '?'],
      nextNumberCorrect: 15,
      sequenceOptions: [13, 14, 15, 18]
    }
  },
  {
    id: 'math-1-2',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 2,
    missionTitle: 'MISSION 02 — CALIBRATE THE VALVES',
    story: 'Steam pressure is rising in the hydraulic sub-station. To stabilize the venting valve, solve the balancing equation for the pressure regulator.',
    primaryConcept: 'Simple Linear Equations',
    secondaryConcepts: ['Algebraic Equivalence', 'Subtraction'],
    learningObjective: 'Isolate a single variable in a one-step additive equation.',
    difficulty: 'EASY',
    gameMechanic: 'EquationGame',
    missionObjective: 'Determine the value of variable X in the stabilizer loop: X + 7 = 15.',
    successCondition: 'Isolate variable X to discover X = 8.',
    hint: 'To solve for X, subtract 7 from both sides of the equation. What is 15 minus 7?',
    feedbackIncorrect: 'Balancing failure. Make sure to subtract 7 from 15 to isolate the stabilizer level.',
    xpReward: 50,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'X + 7 = 15',
      variableToSolve: 'X',
      correctValue: 8,
      equationOptions: [6, 7, 8, 22]
    }
  },
  {
    id: 'math-1-3',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 3,
    missionTitle: 'MISSION 03 — DISTRIBUTE MEDICAL SUPPLIES',
    story: 'Three emergency response shelters require antibiotic medical rations. Drag and allocate the 12 ration packs into the proportional buckets: Shelter A (1/2), Shelter B (1/3), and Shelter C (1/6).',
    primaryConcept: 'Fractional Proportions',
    secondaryConcepts: ['Division', 'Proportional Distribution'],
    learningObjective: 'Apply fractional operators to split integer resources.',
    difficulty: 'EASY',
    gameMechanic: 'DragDropGame',
    missionObjective: 'Distribute 12 medicine crates: half to Shelter A, one-third to Shelter B, and one-sixth to Shelter C.',
    successCondition: 'Allocate exactly 6 crates to A, 4 to B, and 2 to C.',
    hint: 'Find 1/2 of 12 (12 divided by 2), then 1/3 of 12 (12 divided by 3), and finally 1/6 of 12 (12 divided by 6).',
    feedbackIncorrect: 'Improper distribution. 1/2 of 12 is 6, 1/3 of 12 is 4, and 1/6 of 12 is 2. Re-allocate crates accordingly.',
    xpReward: 60,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      itemsToAllocate: [
        { name: 'Shelter A (1/2)', requiredRatio: 0.5, totalToDistribute: 12 },
        { name: 'Shelter B (1/3)', requiredRatio: 0.333, totalToDistribute: 12 },
        { name: 'Shelter C (1/6)', requiredRatio: 0.167, totalToDistribute: 12 }
      ],
      correctAllocation: {
        'Shelter A (1/2)': 6,
        'Shelter B (1/3)': 4,
        'Shelter C (1/6)': 2
      }
    }
  },
  {
    id: 'math-1-4',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 4,
    missionTitle: 'MISSION 04 — FLOOD SENSOR RECOVERY',
    story: 'A flood sensor is stranded in a flooded coordinate sector. Guide a remote rescue drone through grid obstacles to the sensor coordinate.',
    primaryConcept: 'Cartesian Coordinates',
    secondaryConcepts: ['Grid Navigation', 'Path Mapping'],
    learningObjective: 'Navigate coordinates on a 2D grid from origin to destination.',
    difficulty: 'EASY',
    gameMechanic: 'CoordinateGame',
    missionObjective: 'Guide the drone from start point (0,0) to target point (2,1) avoiding obstacle grids.',
    successCondition: 'Reach the coordinates (2,1) successfully.',
    hint: 'To get from (0,0) to (2,1), you must move 2 cells right (X axis) and 1 cell up (Y axis).',
    feedbackIncorrect: 'Drone strayed from path or crashed into debris. Reposition coordinates and try again.',
    xpReward: 60,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      gridSize: 3,
      startPoint: [0, 0],
      targetPoint: [2, 1],
      obstacles: [[1, 1]]
    }
  },
  {
    id: 'math-1-5',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 5,
    missionTitle: 'MISSION 05 — DETONATOR OVERRIDE',
    story: 'A locked vault containing water purifier batteries is armed with a security cipher. Complete the Fibonacci passcode to override the vault alarm.',
    primaryConcept: 'Fibonacci Sequences',
    secondaryConcepts: ['Integer Additions', 'Recurrence Relations'],
    learningObjective: 'Calculate Fibonacci sequence values by adding preceding terms.',
    difficulty: 'EASY',
    gameMechanic: 'PatternGame',
    missionObjective: 'Discover the next value in the detent override loop: 1, 1, 2, 3, 5, 8, 13, ...',
    successCondition: 'Enter 21 to solve the cipher lock.',
    hint: 'The next number in this sequence is found by adding the two numbers before it: 8 + 13.',
    feedbackIncorrect: 'Vault security rejected code. Sum the two previous terms (8 + 13) to crack the encryption.',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [1, 1, 2, 3, 5, 8, 13, '?'],
      nextNumberCorrect: 21,
      sequenceOptions: [18, 20, 21, 25]
    }
  },
  {
    id: 'math-1-6',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 6,
    missionTitle: 'MISSION 06 — STRUCTURAL STABILIZER',
    story: 'A structural support beam under the shelter is failing. To stabilize the triangular wedge frame, calculate the missing internal angle of the load-bearing steel triangle.',
    primaryConcept: 'Angles of a Triangle',
    secondaryConcepts: ['Geometry', 'Subtracting from 180'],
    learningObjective: 'Verify that the sum of angles in a triangle is always 180 degrees.',
    difficulty: 'EASY',
    gameMechanic: 'GeometryGame',
    missionObjective: 'Find the third angle of a steel bracket frame when two angles measure 45° and 65°.',
    successCondition: 'Enter 70° to balance the structural triangle.',
    hint: 'All internal angles of a triangle add up to 180 degrees. Add 45 and 65, then subtract the result from 180.',
    feedbackIncorrect: 'Angle mismatch. Sum (45 + 65) is 110. Subtract 110 from 180 to discover the balanced angle.',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      geometryType: 'triangle',
      givenValues: { angle1: 45, angle2: 65 },
      geometryQuestion: 'What is the missing angle in degrees to complete 180°?',
      geometryOptions: [60, 70, 80, 90],
      geometryAnswer: 70
    }
  },
  {
    id: 'math-1-7',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 7,
    missionTitle: 'MISSION 07 — THE FUEL EXPEDITION',
    story: 'The outpost needs fuel from distant oil dumps. Choose the most optimal supply route by comparing the cost efficiency of fuel units delivered per credit spent.',
    primaryConcept: 'Unit Rate Optimization',
    secondaryConcepts: ['Division', 'Cost Benefit'],
    learningObjective: 'Compare rates to find the highest output per unit cost.',
    difficulty: 'EASY',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Select Route C which yields 2.5 barrels/credit compared to Route A (1.5) and Route B (2.0).',
    successCondition: 'Select Route C as the most efficient choice.',
    hint: 'Divide the fuel barrels delivered by the credits cost for each route. Choose the one with the highest result.',
    feedbackIncorrect: 'Inefficient route selected. Calculate: Route A (30/20 = 1.5), Route B (40/20 = 2.0), Route C (50/20 = 2.5). Select Route C.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'Route A (30 barrels for 20 cr)', cost: 20, benefit: 30, efficiency: 1.5 },
        { name: 'Route B (40 barrels for 20 cr)', cost: 20, benefit: 40, efficiency: 2.0 },
        { name: 'Route C (50 barrels for 20 cr)', cost: 20, benefit: 50, efficiency: 2.5 }
      ],
      optimalChoiceName: 'Route C (50 barrels for 20 cr)'
    }
  },
  {
    id: 'math-1-8',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 8,
    missionTitle: 'MISSION 08 — PRESSURE RELIEF ORDER',
    story: 'Three emergency boilers are overheating. Arrange them by weight load to relieve pressure. Boilers logic: Boiler A is heavier than B. Boiler B is heavier than C.',
    primaryConcept: 'Transitive Relations',
    secondaryConcepts: ['Ordering', 'Inequalities'],
    learningObjective: 'Apply transitive properties of inequalities to construct ordered sets.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Arrange the boilers from heaviest to lightest based on: A > B and B > C.',
    successCondition: 'Order the boilers correctly: A, B, C.',
    hint: 'If A is heavier than B, and B is heavier than C, then A must also be heavier than C. The order is Heaviest = A, Middle = B, Lightest = C.',
    feedbackIncorrect: 'Mismatched order. Apply transitive law: since A > B and B > C, then the order is A, B, C.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicType: 'ordering',
      logicPremise: 'Arrange Boilers A, B, C from heaviest to lightest: A > B, B > C.',
      logicOptions: ['A, B, C', 'B, A, C', 'C, B, A', 'A, C, B'],
      logicAnswer: 'A, B, C'
    }
  },
  {
    id: 'math-1-9',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 9,
    missionTitle: 'MISSION 09 — POWER GRID RELIABILITY',
    story: 'Three emergency generators are available, but they have different failure probabilities. Select the generator that is statistically the most reliable.',
    primaryConcept: 'Basic Probability',
    secondaryConcepts: ['Percentages', 'Risk Assessment'],
    learningObjective: 'Compare probability rates to minimize likelihood of system failures.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Select Generator 1 (5% failure probability) as it is more reliable than Generator 2 (12%) or Generator 3 (18%).',
    successCondition: 'Correctly select Generator 1.',
    hint: 'The most reliable generator has the lowest probability of failure. Compare 5%, 12%, and 18%.',
    feedbackIncorrect: 'Failure. Select the generator with the lowest chance of failing (5%).',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicType: 'probability',
      logicPremise: 'Select the most reliable generator: Gen 1 (5% fail), Gen 2 (12% fail), Gen 3 (18% fail).',
      logicOptions: ['Generator 1', 'Generator 2', 'Generator 3'],
      logicAnswer: 'Generator 1'
    }
  },
  {
    id: 'math-1-10',
    domain: 'mathematics',
    stage: 1,
    levelNumber: 10,
    missionTitle: 'STAGE 1 BOSS — THE DAM RESCUE CRISIS',
    story: 'A structural breach at the Sector 4 Dam is threatening the civilian evacuation outpost. You must guide a rescue probe, balance turbine valve pressures, partition power grid sections, and select the final release valves before the dam overflows.',
    primaryConcept: 'Foundational Synthesis',
    secondaryConcepts: ['Arithmetic Sequences', 'Linear Equations', 'Fractions', 'Coordinates'],
    learningObjective: 'Synthesize Stage 1 foundations to resolve a multi-stage civil engineering emergency.',
    difficulty: 'MEDIUM',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all 4 crisis resolution phases using coordinate pathing, linear equation solving, fraction divisions, and final rate analysis.',
    successCondition: 'Solve all four phases successfully to acquire the first Mathematics Fragment.',
    hint: 'Combine coordinate grid navigation, variable balancing (X + 5 = 12), ration sharing (1/2 of 10), and unit rate sorting to beat the boss.',
    feedbackIncorrect: 'Dam crisis critical failure. Re-verify coordinate moves, valve equations, and proportions.',
    xpReward: 350,
    isBoss: true,
    stageFragmentReward: 'Mathematics Fragment 1',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Navigate the Repair Probe',
          description: 'Navigate the rescue probe from start coordinate (0,0) to target sensor (2,2) avoiding debris (1,1).',
          gameMechanic: 'CoordinateGame',
          instruction: 'Move the probe to destination (2,2).',
          gameData: {
            gridSize: 3,
            startPoint: [0, 0],
            targetPoint: [2, 2],
            obstacles: [[1, 1]]
          }
        },
        {
          phaseNumber: 2,
          title: 'Regulate Pressure Valve A',
          description: 'Solve the valve balance variable: X + 5 = 12.',
          gameMechanic: 'EquationGame',
          instruction: 'Find the pressure valve value X.',
          gameData: {
            equation: 'X + 5 = 12',
            variableToSolve: 'X',
            correctValue: 7,
            equationOptions: [5, 6, 7, 17]
          }
        },
        {
          phaseNumber: 3,
          title: 'Allocate Auxiliary Power Grid',
          description: 'Allocate 10 emergency power blocks to: Pump Alpha (1/2) and Pump Beta (1/2).',
          gameMechanic: 'DragDropGame',
          instruction: 'Distribute 10 blocks equally.',
          gameData: {
            itemsToAllocate: [
              { name: 'Pump Alpha (1/2)', requiredRatio: 0.5, totalToDistribute: 10 },
              { name: 'Pump Beta (1/2)', requiredRatio: 0.5, totalToDistribute: 10 }
            ],
            correctAllocation: {
              'Pump Alpha (1/2)': 5,
              'Pump Beta (1/2)': 5
            }
          }
        },
        {
          phaseNumber: 4,
          title: 'Select Safest Release Spillway',
          description: 'Select the spillway with the lowest failure risk: Spillway A (10% fail), Spillway B (2% fail), Spillway C (15% fail).',
          gameMechanic: 'LogicGame',
          instruction: 'Select the optimal spillway option.',
          gameData: {
            logicType: 'probability',
            logicPremise: 'Select the lowest fail probability spillway.',
            logicOptions: ['Spillway A', 'Spillway B', 'Spillway C'],
            logicAnswer: 'Spillway B'
          }
        }
      ]
    }
  },

  // ==========================================
  // STAGE 2 — REASONING (Levels 11–20)
  // ==========================================
  {
    id: 'math-2-1',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 1,
    missionTitle: 'MISSION 11 — DUAL VALVE HANDSHAKE',
    story: 'A high-voltage power router is locked. You must find the calibration parameters X and Y that solve the simultaneous routing balance.',
    primaryConcept: 'Systems of Linear Equations',
    secondaryConcepts: ['Simultaneous Equations', 'Algebraic Substitution'],
    learningObjective: 'Solve a system of two linear equations with two variables.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Solve the system: X + Y = 10, X - Y = 2. Find the value of X.',
    successCondition: 'Enter X = 6.',
    hint: 'Add the two equations together: (X + Y) + (X - Y) = 10 + 2, which gives 2X = 12. Solve for X.',
    feedbackIncorrect: 'Signal routing failed. 2X = 12, so X must equal 6.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'X + Y = 10, X - Y = 2',
      variableToSolve: 'X',
      correctValue: 6,
      equationOptions: [4, 5, 6, 8]
    }
  },
  {
    id: 'math-2-2',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 2,
    missionTitle: 'MISSION 12 — HAZARD COORDINATE ROUTING',
    story: 'A communications dish is damaged. Guide the repair probe through a larger 5x5 grid avoiding radiation grids to reaches the target.',
    primaryConcept: 'Manhattan Grid Distance',
    secondaryConcepts: ['Grid Navigation', 'Obstacle Avoidance'],
    learningObjective: 'Calculate grid distance pathing avoiding constrained coordinates.',
    difficulty: 'MEDIUM',
    gameMechanic: 'CoordinateGame',
    missionObjective: 'Guide the probe from (0,0) to target coordinate (3,3) avoiding obstacles.',
    successCondition: 'Navigate the probe to (3,3) safely.',
    hint: 'Move along clear cells. Make sure to bypass obstacle nodes at (1,1) and (2,2).',
    feedbackIncorrect: 'Drone damaged by radiation. Plan a path bypassing coordinates (1,1) and (2,2).',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      gridSize: 5,
      startPoint: [0, 0],
      targetPoint: [3, 3],
      obstacles: [[1, 1], [2, 2]]
    }
  },
  {
    id: 'math-2-3',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 3,
    missionTitle: 'MISSION 13 — SOLAR GRID CAPACITORS',
    story: 'Auxiliary solar cells must transfer exactly 3/5 of their energy reserve to prevent grid overload. Convert this fractional load into a percentage.',
    primaryConcept: 'Fractions to Percentages',
    secondaryConcepts: ['Ratios', 'Decimals'],
    learningObjective: 'Convert common fractions into percentages.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Convert 3/5 to a percentage.',
    successCondition: 'Enter 60 to signify 60%.',
    hint: 'To convert a fraction to a percentage, multiply it by 100. (3 / 5) * 100 = 60.',
    feedbackIncorrect: 'Overload. 3 divided by 5 is 0.6. Multiply 0.6 by 100 to get 60%.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: '3/5 = ? %',
      variableToSolve: '%',
      correctValue: 60,
      equationOptions: [35, 50, 60, 75]
    }
  },
  {
    id: 'math-2-4',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 4,
    missionTitle: 'MISSION 14 — BALANCING THE WEIGHT CORES',
    story: 'An automatic logistics crane needs counterweight balancing values. Logistical code: 3 circles balance 1 triangle. If 1 triangle and 2 circles equal 10kg, what does a single circle weigh?',
    primaryConcept: 'System Substitutions',
    secondaryConcepts: ['Visual Equations', 'Algebra'],
    learningObjective: 'Substitute variables in algebraic equations using logical constraints.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the weight of a circle. (T = 3C, T + 2C = 10).',
    successCondition: 'Enter Circle = 2 kg.',
    hint: 'Substitute T with 3C in the second equation: 3C + 2C = 10, which means 5C = 10.',
    feedbackIncorrect: 'Boiler unbalanced. 5 circles equal 10kg, so one circle weighs 2kg.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicType: 'weights',
      logicPremise: '3 Circles (C) = 1 Triangle (T). T + 2C = 10 kg. What does 1 Circle weigh?',
      logicOptions: ['1 kg', '2 kg', '3 kg', '4 kg'],
      logicAnswer: '2 kg'
    }
  },
  {
    id: 'math-2-5',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 5,
    missionTitle: 'MISSION 15 — COOLANT TEMPERATURE LOGS',
    story: 'The mainframe cooling logs show fluctuating temperatures. Analyze the graph coordinate logs to find the peak hour when temperatures peaked.',
    primaryConcept: 'Graph Maxima Analysis',
    secondaryConcepts: ['Data Interpretation', 'Coordinates'],
    learningObjective: 'Identify maximum points on linear coordinates plots.',
    difficulty: 'MEDIUM',
    gameMechanic: 'GraphGame',
    missionObjective: 'Read the temperature peak coordinates graph to isolate the time (X axis) of peak heat.',
    successCondition: 'Identify Hour 4 (Temp 90C) as the peak point.',
    hint: 'Look for the highest Y coordinate value on the temperature curve. What is the corresponding X value?',
    feedbackIncorrect: 'Incorrect peak analysis. The highest temperature node (90C) lies at Hour 4.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      graphData: [
        { x: 1, y: 40, label: 'Hour 1 (40°C)' },
        { x: 2, y: 55, label: 'Hour 2 (55°C)' },
        { x: 3, y: 70, label: 'Hour 3 (70°C)' },
        { x: 4, y: 90, label: 'Hour 4 (90°C)' },
        { x: 5, y: 65, label: 'Hour 5 (65°C)' }
      ],
      graphQuestion: 'Which hour has the maximum coolant temperature?',
      graphOptions: ['Hour 2', 'Hour 3', 'Hour 4', 'Hour 5'],
      graphAnswer: 'Hour 4'
    }
  },
  {
    id: 'math-2-6',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 6,
    missionTitle: 'MISSION 16 — DECRYPT THE VAULT CYLINDER',
    story: 'The safehouse bunker requires a sequence password that increases exponentially with a growing gap: 2, 4, 8, 14, 22, ...',
    primaryConcept: 'Quadratic Sequences',
    secondaryConcepts: ['Sequence Differences', 'Second Difference Constant'],
    learningObjective: 'Identify non-linear sequences with constant second differences.',
    difficulty: 'MEDIUM',
    gameMechanic: 'PatternGame',
    missionObjective: 'Find the next term in the sequence: 2, 4, 8, 14, 22, ...',
    successCondition: 'Input 32 to override the bunker cylinder.',
    hint: 'Look at the differences between the numbers: 2, 4, 6, 8. The differences increase by 2 each step. What is the next difference?',
    feedbackIncorrect: 'Calibration failed. The differences are +2, +4, +6, +8. The next difference is +10. 22 + 10 = 32.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [2, 4, 8, 14, 22, '?'],
      nextNumberCorrect: 32,
      sequenceOptions: [30, 32, 34, 36]
    }
  },
  {
    id: 'math-2-7',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 7,
    missionTitle: 'MISSION 17 — OPTIMAL OUTPOST ENCLOSURE',
    story: 'To safeguard resources, construct a rectangular fence with a perimeter of 24 meters. Determine the dimensions that maximize the enclosed area.',
    primaryConcept: 'Area Optimization',
    secondaryConcepts: ['Perimeter and Area', 'Quadratic Vertex'],
    learningObjective: 'Understand that a square maximizes area for a fixed rectangular perimeter.',
    difficulty: 'MEDIUM',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Select the dimensions that enclose the largest area: 6m × 6m (36 sq m).',
    successCondition: 'Select the 6m × 6m configuration.',
    hint: 'Area = length × width. For a perimeter of 24, length + width must equal 12. Compare areas: 4×8=32, 5×7=35, 6×6=36.',
    feedbackIncorrect: 'Sub-optimal area. A square (6m × 6m) yields the maximum possible area of 36 square meters.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: '4m x 8m (32 sq m)', cost: 24, benefit: 32, efficiency: 1.33 },
        { name: '5m x 7m (35 sq m)', cost: 24, benefit: 35, efficiency: 1.45 },
        { name: '6m x 6m (36 sq m)', cost: 24, benefit: 36, efficiency: 1.5 }
      ],
      optimalChoiceName: '6m x 6m (36 sq m)'
    }
  },
  {
    id: 'math-2-8',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 8,
    missionTitle: 'MISSION 18 — PROTOCOL COMPILATION ORDER',
    story: 'A defense mainframe requires system files compiled in exact sequence. Logic instructions: File B must execute after A. File C must execute before A. File D executes last.',
    primaryConcept: 'Strict Orders',
    secondaryConcepts: ['Logical Deduction', 'Transitive Sorting'],
    learningObjective: 'Reconstruct linear orderings from relative relational clauses.',
    difficulty: 'MEDIUM',
    gameMechanic: 'DragDropGame',
    missionObjective: 'Arrange the sequence nodes: File C, File A, File B, File D.',
    successCondition: 'Place the files in correct order: C, A, B, D.',
    hint: 'C comes before A, and B comes after A. This gives C, A, B. D is last, so the complete order is C, A, B, D.',
    feedbackIncorrect: 'Mainframe registry rejected order. Re-read: C executes before A, B executes after A, D executes last.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      itemsToAllocate: [
        { name: 'File C', requiredRatio: 1, totalToDistribute: 4 },
        { name: 'File A', requiredRatio: 2, totalToDistribute: 4 },
        { name: 'File B', requiredRatio: 3, totalToDistribute: 4 },
        { name: 'File D', requiredRatio: 4, totalToDistribute: 4 }
      ],
      correctAllocation: {
        'File C': 1,
        'File A': 2,
        'File B': 3,
        'File D': 4
      }
    }
  },
  {
    id: 'math-2-9',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 9,
    missionTitle: 'MISSION 19 — PERSONNEL MATRIX OVERLAP',
    story: 'Out of 30 S.H.I.E.L.D. technicians, 18 know coding, 12 know networking, and 5 know both. Find how many know coding only.',
    primaryConcept: 'Venn Diagrams & Sets',
    secondaryConcepts: ['Sets', 'Subtraction'],
    learningObjective: 'Calculate subset sizes by subtracting intersections from parent sets.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Calculate coding-only technicians: Coding (18) minus Both (5).',
    successCondition: 'Enter 13 coding-only technicians.',
    hint: 'To find those who know coding only, subtract the intersection (5) from the total coding technicians (18).',
    feedbackIncorrect: 'Calculations failed. 18 total coders minus 5 who do both leaves 13 coding-only technicians.',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: '18 - 5 = ?',
      variableToSolve: 'Technicians',
      correctValue: 13,
      equationOptions: [7, 12, 13, 25]
    }
  },
  {
    id: 'math-2-10',
    domain: 'mathematics',
    stage: 2,
    levelNumber: 10,
    missionTitle: 'STAGE 2 BOSS — MAIN INFRASTRUCTURE RECOVERY',
    story: 'The central power matrix has crashed. Stabilize the mainframe system by resolving simultaneous energy grids, locating coordinate heat hotspots, converting storage percentages, and ordering system files.',
    primaryConcept: 'Reasoning Synthesis',
    secondaryConcepts: ['Systems of Equations', 'Coordinate Navigation', 'Percentages', 'Ordering Logic'],
    learningObjective: 'Integrate logical reasoning and algebraic balancing under high stakes.',
    difficulty: 'MEDIUM',
    gameMechanic: 'BossGame',
    missionObjective: 'Resolve simultaneous grids, map coordinate targets, convert storage decimals, and sort system files.',
    successCondition: 'Execute all 4 phases successfully to unlock Stage 3.',
    hint: 'Use simultaneous equations (X+Y=12, X-Y=4), coordinates routing (3,2), storage conversions (4/5 to 80%), and ordering logic (File 1, 2, 3).',
    feedbackIncorrect: 'Infrastructure breakdown. Check simultaneous balances and coordinate drift nodes.',
    xpReward: 400,
    isBoss: true,
    stageFragmentReward: 'Mathematics Fragment 2',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Resolve Simultaneous Grids',
          description: 'Solve the grid load values: X + Y = 12, X - Y = 4. What is the value of X?',
          gameMechanic: 'EquationGame',
          instruction: 'Find variable X.',
          gameData: {
            equation: 'X + Y = 12, X - Y = 4',
            variableToSolve: 'X',
            correctValue: 8,
            equationOptions: [4, 6, 8, 16]
          }
        },
        {
          phaseNumber: 2,
          title: 'Locate Mainframe Hotspot',
          description: 'Guide the repair probe through grid obstacles to mainframe hotspot coordinate (3,2).',
          gameMechanic: 'CoordinateGame',
          instruction: 'Reach coordinate (3,2).',
          gameData: {
            gridSize: 4,
            startPoint: [0, 0],
            targetPoint: [3, 2],
            obstacles: [[1, 1], [2, 2]]
          }
        },
        {
          phaseNumber: 3,
          title: 'Balance Energy Reserves',
          description: 'Convert 4/5 of energy storage into a percentage value.',
          gameMechanic: 'EquationGame',
          instruction: 'Convert fraction to percentage.',
          gameData: {
            equation: '4/5 = ? %',
            variableToSolve: '%',
            correctValue: 80,
            equationOptions: [40, 50, 80, 90]
          }
        },
        {
          phaseNumber: 4,
          title: 'Sort Backup File Registry',
          description: 'Arrange Files A, B, C based on logic: File C runs after B, File A runs first.',
          gameMechanic: 'LogicGame',
          instruction: 'Select correct execution sequence.',
          gameData: {
            logicType: 'ordering',
            logicPremise: 'File A runs first, File C runs after B. Order them.',
            logicOptions: ['A, B, C', 'B, A, C', 'C, B, A', 'A, C, B'],
            logicAnswer: 'A, B, C'
          }
        }
      ]
    }
  },

  // ==========================================
  // STAGE 3 — APPLICATION (Levels 21–30)
  // ==========================================
  {
    id: 'math-3-1',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 1,
    missionTitle: 'MISSION 21 — EMERGENCY RESOURCE SPLIT',
    story: 'A logistics convoy needs emergency funds allocated proportionally. Divide a $1000 supply fund among three outposts (A, B, C) in a 5:3:2 ratio.',
    primaryConcept: 'Proportional Resource Allocation',
    secondaryConcepts: ['Ratios', 'Division'],
    learningObjective: 'Calculate resource shares based on multi-part ratio splits.',
    difficulty: 'MEDIUM',
    gameMechanic: 'ResourceAllocationGame',
    missionObjective: 'Distribute $1000 in a 5:3:2 ratio. Find the amount for Outpost A.',
    successCondition: 'Enter $500 for Outpost A.',
    hint: 'Total ratio parts: 5 + 3 + 2 = 10 parts. Divide $1000 by 10 to get $100 per part. Outpost A gets 5 parts: 5 × 100.',
    feedbackIncorrect: 'Invalid funding split. A gets 5/10 ($500), B gets 3/10 ($300), C gets 2/10 ($200).',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      itemsToAllocate: [
        { name: 'Outpost A (5 parts)', requiredRatio: 0.5, totalToDistribute: 1000 },
        { name: 'Outpost B (3 parts)', requiredRatio: 0.3, totalToDistribute: 1000 },
        { name: 'Outpost C (2 parts)', requiredRatio: 0.2, totalToDistribute: 1000 }
      ],
      correctAllocation: {
        'Outpost A (5 parts)': 500,
        'Outpost B (3 parts)': 300,
        'Outpost C (2 parts)': 200
      }
    }
  },
  {
    id: 'math-3-2',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 2,
    missionTitle: 'MISSION 22 — ATMOSPHERIC FORECASTING',
    story: 'Air pollution registers 400 parts-per-million. Assuming a linear decrease of 15% after scrubber installation, calculate next year’s target parts-per-million levels.',
    primaryConcept: 'Percentage Decreases',
    secondaryConcepts: ['Data Projection', 'Estimation'],
    learningObjective: 'Compute percentage decreases on numeric parameters.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Find the resulting value: 400 minus 15% of 400.',
    successCondition: 'Enter 340 parts-per-million.',
    hint: 'Calculate 15% of 400: 0.15 × 400 = 60. Subtract 60 from 400.',
    feedbackIncorrect: 'Grid projection failed. 15% of 400 is 60. 400 - 60 = 340.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: '400 - (15% of 400) = ?',
      variableToSolve: 'PPM',
      correctValue: 340,
      equationOptions: [320, 340, 360, 385]
    }
  },
  {
    id: 'math-3-3',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 3,
    missionTitle: 'MISSION 23 — SECURITY SYSTEM DETECTOR',
    story: 'Stabilize a logic gateway to support auxiliary shields. The logic gate outputs true if both inputs A and B are true, but A is false. Choose the correct gate to bypass.',
    primaryConcept: 'Boolean Logic Gates',
    secondaryConcepts: ['Logic Gates', 'Truth Tables'],
    learningObjective: 'Understand logic operators AND, OR, and NOT.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify which operator (AND vs OR) outputs TRUE when Input A is FALSE and Input B is TRUE.',
    successCondition: 'Select the OR gate.',
    hint: 'An AND gate requires both inputs to be true. An OR gate outputs true if at least one input is true.',
    feedbackIncorrect: 'Breach detected. Since A is false and B is true, only an OR gate will output true.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicType: 'gates',
      logicPremise: 'Input A is FALSE, Input B is TRUE. Which logic gate outputs TRUE?',
      logicOptions: ['AND Gate', 'OR Gate', 'NOT A Gate', 'XOR Gate'],
      logicAnswer: 'OR Gate'
    }
  },
  {
    id: 'math-3-4',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 4,
    missionTitle: 'MISSION 24 — DISPATCH RADAR COORDINATES',
    story: 'A distress beacon is detected. To send a search helicopter, calculate the direct line-of-sight distance if the beacon is located 6 km North and 8 km East.',
    primaryConcept: 'Pythagorean Theorem',
    secondaryConcepts: ['Geometry', 'Right-angled triangles'],
    learningObjective: 'Apply Pythagorean theorem (A^2 + B^2 = C^2) to compute diagonal lengths.',
    difficulty: 'MEDIUM',
    gameMechanic: 'GeometryGame',
    missionObjective: 'Compute the diagonal distance C where A = 6 and B = 8.',
    successCondition: 'Enter 10 km.',
    hint: 'Use A^2 + B^2 = C^2. 6^2 + 8^2 = 36 + 64 = 100. The square root of 100 is 10.',
    feedbackIncorrect: 'Vector mismatch. 6^2 is 36, 8^2 is 64. Sum is 100. Square root is 10 km.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      geometryType: 'triangle',
      givenValues: { legA: 6, legB: 8 },
      geometryQuestion: 'Calculate hypotenuse C using Pythagorean theorem.',
      geometryOptions: [9, 10, 12, 14],
      geometryAnswer: 10
    }
  },
  {
    id: 'math-3-5',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 5,
    missionTitle: 'MISSION 25 — BACKUP POWER PROBABILITY',
    story: 'Emergency mainframe grids run two backup lines. If Line 1 has a 20% failure rate, and independent Line 2 has a 10% failure rate, what is the probability that both fail?',
    primaryConcept: 'Independent Probability',
    secondaryConcepts: ['Decimals', 'Probability Products'],
    learningObjective: 'Calculate combined probability of independent compound events.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Calculate failure rate when both fail: 0.20 × 0.10.',
    successCondition: 'Enter 0.02 (2% probability).',
    hint: 'Multiply the two individual failure probabilities: 20% (0.2) times 10% (0.1).',
    feedbackIncorrect: 'Signal lost. Multiply independent probabilities: 0.20 × 0.10 = 0.02 (2%).',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicType: 'probability',
      logicPremise: 'Independent lines fail rates: Line 1 (20% fail), Line 2 (10% fail). What is the probability that BOTH fail?',
      logicOptions: ['0.02', '0.10', '0.20', '0.30'],
      logicAnswer: '0.02'
    }
  },
  {
    id: 'math-3-6',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 6,
    missionTitle: 'MISSION 26 — CYLINDER WATER TANKS',
    story: 'The shelter water reserves must hold at least 150 cubic meters. Verify the volume of a cylindrical water tank with radius R = 3m and height H = 6m. (Use Pi = 3.14).',
    primaryConcept: 'Volume of a Cylinder',
    secondaryConcepts: ['Geometry', 'Area of Circle'],
    learningObjective: 'Calculate the volume of cylinders using Pi * R^2 * H.',
    difficulty: 'MEDIUM',
    gameMechanic: 'GeometryGame',
    missionObjective: 'Find the volume in cubic meters: V = 3.14 × 3^2 × 6.',
    successCondition: 'Enter 169.56 (or round to 170).',
    hint: 'First find the base area: Pi × R^2 = 3.14 × 9 = 28.26. Then multiply by height (6): 28.26 × 6 = 169.56.',
    feedbackIncorrect: 'Volume calibration failed. R^2 is 9. Base area is 28.26. Volume is 28.26 × 6 = 169.56 cubic meters.',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      geometryType: 'cylinder',
      givenValues: { radius: 3, height: 6 },
      geometryQuestion: 'What is the volume in cubic meters (Pi = 3.14)?',
      geometryOptions: [150, 160, 170, 180],
      geometryAnswer: 170
    }
  },
  {
    id: 'math-3-7',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 7,
    missionTitle: 'MISSION 27 — CARGO SHIPPING ROUTE',
    story: 'Emergency vaccines must be shipped. You have cargo drones A (holds 10 units, costs 1 credit/trip) and B (holds 15 units, costs 2 credits/trip). Minimize cost to ship 100 units.',
    primaryConcept: 'Linear Programming & Optimization',
    secondaryConcepts: ['Cost Minimization', 'Constraints'],
    learningObjective: 'Solve basic optimization systems to minimize trip costs.',
    difficulty: 'MEDIUM',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Find the lowest cost configuration to deliver 100 units. Drone A: 10 trips (100 units, 10 credits). Drone B: 7 trips (105 units, 14 credits).',
    successCondition: 'Select 10 trips of Drone A.',
    hint: 'Compare costs: 10 trips of Drone A costs 10 credits. 7 trips of Drone B costs 14 credits. Choose the cheaper route.',
    feedbackIncorrect: 'High cost path. 10 trips of Drone A costs exactly 10 credits, which is the most optimal.',
    xpReward: 150,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: '10 trips of Drone A (cost 10 cr)', cost: 10, benefit: 100, efficiency: 1.0 },
        { name: '7 trips of Drone B (cost 14 cr)', cost: 14, benefit: 105, efficiency: 0.75 },
        { name: '5 trips of A + 4 of B (cost 13 cr)', cost: 13, benefit: 110, efficiency: 0.84 }
      ],
      optimalChoiceName: '10 trips of Drone A (cost 10 cr)'
    }
  },
  {
    id: 'math-3-8',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 8,
    missionTitle: 'MISSION 28 — CONCRETE STRUCTURAL RATIO',
    story: 'To reinforce a structural shelter wall, mix concrete (cement, sand, gravel) in a 1:2:4 ratio. Find the amount of gravel needed for 70 kg of concrete total.',
    primaryConcept: 'Multi-part Ratios',
    secondaryConcepts: ['Arithmetic Scaling', 'Fractions'],
    learningObjective: 'Scale multi-part proportions to meet total weight requirements.',
    difficulty: 'MEDIUM',
    gameMechanic: 'DragDropGame',
    missionObjective: 'Calculate gravel share: Gravel makes up 4 parts of the 1+2+4 = 7 parts total. Find (4/7) of 70.',
    successCondition: 'Enter 40 kg.',
    hint: 'Add ratio parts: 1 + 2 + 4 = 7 parts. 70 kg divided by 7 parts is 10 kg per part. Gravel has 4 parts: 4 × 10 kg.',
    feedbackIncorrect: 'Mix collapse. 4 parts of gravel equals exactly 40 kg.',
    xpReward: 150,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      itemsToAllocate: [
        { name: 'Cement (1 part)', requiredRatio: 0.143, totalToDistribute: 70 },
        { name: 'Sand (2 parts)', requiredRatio: 0.286, totalToDistribute: 70 },
        { name: 'Gravel (4 parts)', requiredRatio: 0.571, totalToDistribute: 70 }
      ],
      correctAllocation: {
        'Cement (1 part)': 10,
        'Sand (2 parts)': 20,
        'Gravel (4 parts)': 40
      }
    }
  },
  {
    id: 'math-3-9',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 9,
    missionTitle: 'MISSION 29 — SIGNAL ROUTER MATRIX',
    story: 'Calibrate the weighted average strength of a router. Tower A has strength 80 (weight 0.6), Tower B has strength 90 (weight 0.4). Find the weighted average.',
    primaryConcept: 'Weighted Averages',
    secondaryConcepts: ['Averages', 'Multiplication'],
    learningObjective: 'Compute weighted averages by combining values and relative weights.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Compute: (80 × 0.6) + (90 × 0.4).',
    successCondition: 'Enter 84.',
    hint: 'Multiply each value by its weight: 80 × 0.6 = 48, and 90 × 0.4 = 36. Add them: 48 + 36.',
    feedbackIncorrect: 'Calibration failed. (80 × 0.6) + (90 × 0.4) = 48 + 36 = 84.',
    xpReward: 160,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: '(80 x 0.6) + (90 x 0.4) = ?',
      variableToSolve: 'Signal',
      correctValue: 84,
      equationOptions: [80, 84, 85, 90]
    }
  },
  {
    id: 'math-3-10',
    domain: 'mathematics',
    stage: 3,
    levelNumber: 10,
    missionTitle: 'STAGE 3 BOSS — REGIONAL GRID RESTORATION',
    story: 'A massive storm has severed regional power nodes. Reconnect grids using Pythagorean vectors, partition backup resources, calculate cylinder coolant flow volumes, and map independent failure safety paths.',
    primaryConcept: 'Application Synthesis',
    secondaryConcepts: ['Pythagorean Geometry', 'Proportional Budgets', 'Cylinder Volumes', 'Probabilities'],
    learningObjective: 'Integrate advanced geometric volumes, Pythagorean pathings, and risk analysis in an active disaster scenario.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Connect grid coordinates, allocate proportional budgets, verify tank volumes, and choose failure routes.',
    successCondition: 'Solve all four phases to secure the third Mathematics Fragment.',
    hint: 'Use Pythagorean theorems (A=9, B=12 -> C=15), resource ratios (3:2 split of $500), cylinder volumes (Pi*2^2*10 = 125.6), and independent failure rates (0.1 * 0.1 = 0.01).',
    feedbackIncorrect: 'Disaster recovery failed. Re-calculate grid lines, budget weights, and tank volumes.',
    xpReward: 450,
    isBoss: true,
    stageFragmentReward: 'Mathematics Fragment 3',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Establish Tower Vectors',
          description: 'Find diagonal grid cable length between towers spaced 9 km North and 12 km East.',
          gameMechanic: 'GeometryGame',
          instruction: 'Calculate hypotenuse length.',
          gameData: {
            geometryType: 'triangle',
            givenValues: { legA: 9, legB: 12 },
            geometryQuestion: 'Calculate cable length C using Pythagorean theorem.',
            geometryOptions: [13, 14, 15, 16],
            geometryAnswer: 15
          }
        },
        {
          phaseNumber: 2,
          title: 'Distribute Resource Budgets',
          description: 'Split $500 backup budget between Division A (3 parts) and Division B (2 parts) of a 3:2 ratio.',
          gameMechanic: 'ResourceAllocationGame',
          instruction: 'Allocate share to Division A.',
          gameData: {
            itemsToAllocate: [
              { name: 'Division A (3 parts)', requiredRatio: 0.6, totalToDistribute: 500 },
              { name: 'Division B (2 parts)', requiredRatio: 0.4, totalToDistribute: 500 }
            ],
            correctAllocation: {
              'Division A (3 parts)': 300,
              'Division B (2 parts)': 200
            }
          }
        },
        {
          phaseNumber: 3,
          title: 'Measure Coolant Water Cylinders',
          description: 'Find volume in cubic meters of a cylindrical tank: Radius = 2m, Height = 10m. (Pi = 3.14).',
          gameMechanic: 'GeometryGame',
          instruction: 'Calculate volume.',
          gameData: {
            geometryType: 'cylinder',
            givenValues: { radius: 2, height: 10 },
            geometryQuestion: 'What is the volume in cubic meters (Pi = 3.14)?',
            geometryOptions: [120, 125.6, 126, 130],
            geometryAnswer: 126
          }
        },
        {
          phaseNumber: 4,
          title: 'Verify Independent Path Failures',
          description: 'Find fail probability of dual lines: Line A has 10% failure, Line B has 10% failure.',
          gameMechanic: 'LogicGame',
          instruction: 'Find probability that both fail.',
          gameData: {
            logicType: 'probability',
            logicPremise: 'Independent fail rates: Line A (10% fail), Line B (10% fail). What is the probability that BOTH fail?',
            logicOptions: ['0.01', '0.10', '0.20', '0.02'],
            logicAnswer: '0.01'
          }
        }
      ]
    }
  },

  // ==========================================
  // STAGE 4 — MASTERY (Levels 31–40)
  // ==========================================
  {
    id: 'math-4-1',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 1,
    missionTitle: 'MISSION 31 — SYSTEM SHIELD EFFICIENCY',
    story: 'Main solar panels are warping. Deflection stress is modeled by: S(x) = x^2 - 8x + 20. Find the stabilizer point x that minimizes deflection.',
    primaryConcept: 'Quadratic Optimization',
    secondaryConcepts: ['Finding Vertex', 'Derivatives'],
    learningObjective: 'Calculate the minimum/maximum of quadratic equations.',
    difficulty: 'HARD',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Determine the value x that minimizes S(x) = x^2 - 8x + 20.',
    successCondition: 'Select x = 4.',
    hint: 'For quadratic ax^2 + bx + c, the minimum lies at x = -b / 2a. Here, a = 1, b = -8. -(-8) / (2 * 1) = 8 / 2.',
    feedbackIncorrect: 'Over-deflection collapse. Minimum point lies at x = -b / 2a = 8 / 2 = 4.',
    xpReward: 150,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'Stabilizer coordinate x = 2', cost: 8, benefit: 8, efficiency: 1.0 },
        { name: 'Stabilizer coordinate x = 4', cost: 4, benefit: 16, efficiency: 4.0 },
        { name: 'Stabilizer coordinate x = 6', cost: 8, benefit: 8, efficiency: 1.0 }
      ],
      optimalChoiceName: 'Stabilizer coordinate x = 4'
    }
  },
  {
    id: 'math-4-2',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 2,
    missionTitle: 'MISSION 32 — HELICOPTER WIND VECTORS',
    story: 'Navigate a search chopper through high winds. Wind vector is [2, -1], helicopter engine vector is [3, 4]. Calculate the resulting direction vector.',
    primaryConcept: 'Vector Addition',
    secondaryConcepts: ['Cartesian Coordinates', 'Navigation'],
    learningObjective: 'Add corresponding components of 2D vectors.',
    difficulty: 'HARD',
    gameMechanic: 'CoordinateGame',
    missionObjective: 'Compute the resulting vector: [2+3, -1+4].',
    successCondition: 'Navigate the probe to coordinates (5,3).',
    hint: 'Add the X values together (2 + 3) to get the new X coordinate, and the Y values together (-1 + 4) to get the new Y coordinate.',
    feedbackIncorrect: 'Chopper lost in wind shear. Add vectors: [2+3, -1+4] = [5, 3].',
    xpReward: 150,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      gridSize: 6,
      startPoint: [0, 0],
      targetPoint: [5, 3],
      obstacles: [[2, 2], [3, 1]]
    }
  },
  {
    id: 'math-4-3',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 3,
    missionTitle: 'MISSION 33 — RADIOACTIVE ISOTOPE DECAY',
    story: 'A toxic compound decays exponentially at a rate of 50% per hour. If initial radiation is 800 units, find the radiation level remaining after 3 hours.',
    primaryConcept: 'Exponential Decay Models',
    secondaryConcepts: ['Multiplication', 'Exponents'],
    learningObjective: 'Formulate and evaluate exponential decay systems.',
    difficulty: 'HARD',
    gameMechanic: 'EquationGame',
    missionObjective: 'Compute: 800 × (0.5)^3.',
    successCondition: 'Enter 100 units.',
    hint: 'Each hour, the radiation is cut in half. Start with 800. Hour 1: 400. Hour 2: 200. Hour 3: ?',
    feedbackIncorrect: 'Radiation leakage. 800 cut in half three times: 800 -> 400 -> 200 -> 100.',
    xpReward: 160,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: '800 x (0.5)^3 = ?',
      variableToSolve: 'Radiation',
      correctValue: 100,
      equationOptions: [50, 100, 200, 300]
    }
  },
  {
    id: 'math-4-4',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 4,
    missionTitle: 'MISSION 34 — TRI-VARIABLE SYSTEM LOCK',
    story: 'The safehouse reactor calibration uses three flow variables. Calibration values: x + y + z = 6, y + z = 5, z = 3. Find the value of x.',
    primaryConcept: 'Tri-variable Linear Systems',
    secondaryConcepts: ['Back Substitution', 'Algebra'],
    learningObjective: 'Solve multi-variable linear systems using sequential substitution.',
    difficulty: 'HARD',
    gameMechanic: 'EquationGame',
    missionObjective: 'Determine the value of variable x.',
    successCondition: 'Enter x = 1.',
    hint: 'If y + z = 5, substitute this group directly into the first equation: x + (y + z) = 6, which becomes x + 5 = 6.',
    feedbackIncorrect: 'Calibration failed. Substitute (y+z=5) into (x + y + z = 6) to find x = 1.',
    xpReward: 160,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'x + y + z = 6, y + z = 5, z = 3',
      variableToSolve: 'x',
      correctValue: 1,
      equationOptions: [1, 2, 3, 5]
    }
  },
  {
    id: 'math-4-5',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 5,
    missionTitle: 'MISSION 35 — FLUID DISCHARGE SLOPES',
    story: 'A ruptured pipe is discharging chemical pollutants. Graph readings show coordinates: Minute 2 (volume 10L), Minute 5 (volume 25L). Calculate the rate of flow (slope).',
    primaryConcept: 'Slope and Rate of Change',
    secondaryConcepts: ['Linear Slopes', 'Coordinate Rates'],
    learningObjective: 'Calculate coordinate gradients using (Y2 - Y1) / (X2 - X1).',
    difficulty: 'HARD',
    gameMechanic: 'GraphGame',
    missionObjective: 'Compute the slope: (25 - 10) / (5 - 2).',
    successCondition: 'Enter 5 liters per minute.',
    hint: 'Slope formula: (change in Y) divided by (change in X). Change in Y is 25 - 10 = 15. Change in X is 5 - 2 = 3. Divide 15 by 3.',
    feedbackIncorrect: 'Flow overflow. Rate of change is 15 / 3 = 5 liters per minute.',
    xpReward: 170,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      graphData: [
        { x: 2, y: 10, label: 'Minute 2 (10L)' },
        { x: 3, y: 15, label: 'Minute 3 (15L)' },
        { x: 4, y: 20, label: 'Minute 4 (20L)' },
        { x: 5, y: 25, label: 'Minute 5 (25L)' }
      ],
      graphQuestion: 'Calculate the rate of change (slope) from Minute 2 to Minute 5.',
      graphOptions: ['3 L/min', '4 L/min', '5 L/min', '6 L/min'],
      graphAnswer: '5 L/min'
    }
  },
  {
    id: 'math-4-6',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 6,
    missionTitle: 'MISSION 36 — SOLAR COLLECTOR ANGLE',
    story: 'To direct maximum power to the shield array, calibrate the mirror angle of elevation to a tower. The distance to tower is 40 meters, and tower height is 40 meters. Find angle of elevation θ.',
    primaryConcept: 'Trigonometric Ratios',
    secondaryConcepts: ['Trigonometry', 'Angle of Elevation'],
    learningObjective: 'Understand trigonometric tangent ratios (tan θ = opposite / adjacent).',
    difficulty: 'HARD',
    gameMechanic: 'GeometryGame',
    missionObjective: 'Solve for angle θ: tan θ = 40 / 40 = 1.',
    successCondition: 'Enter θ = 45°.',
    hint: 'The ratio is Opposite / Adjacent = 40 / 40 = 1. What angle has a tangent of 1? (Recall that tan 45° = 1).',
    feedbackIncorrect: 'Mirror misaligned. Opposite and adjacent are equal (40m), meaning the angle of elevation is exactly 45 degrees.',
    xpReward: 170,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      geometryType: 'triangle',
      givenValues: { adjacent: 40, opposite: 40 },
      geometryQuestion: 'What is the angle of elevation in degrees (tan θ = 1)?',
      geometryOptions: [30, 45, 60, 90],
      geometryAnswer: 45
    }
  },
  {
    id: 'math-4-7',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 7,
    missionTitle: 'MISSION 37 — VECTOR SIGNAL MATRIX',
    story: 'Calibrate the signal transmitter network by decoding the resulting matrix multiplication parameter. Solve the transformation offset: (2 × x) + (3 × 4) = 22. Find x.',
    primaryConcept: 'Matrix Combinations',
    secondaryConcepts: ['Algebraic Equations', 'Multiplications'],
    learningObjective: 'Perform dot-product math components in linear matrices.',
    difficulty: 'HARD',
    gameMechanic: 'PatternGame',
    missionObjective: 'Solve the equation: 2x + 12 = 22.',
    successCondition: 'Enter x = 5.',
    hint: 'Subtract 12 from both sides to get 2x = 10. Then divide by 2.',
    feedbackIncorrect: 'Network matrix failed. 2x = 10, so x is equal to 5.',
    xpReward: 180,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [2, 'x', '+', 12, '=', 22],
      nextNumberCorrect: 5,
      sequenceOptions: [3, 4, 5, 6]
    }
  },
  {
    id: 'math-4-8',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 8,
    missionTitle: 'MISSION 38 — LOGIC GATE DECRYPTOR',
    story: 'A complex security firewall blocks access to auxiliary files. Cryptographic logical expression: (A OR B) AND (NOT C) must yield TRUE. Given A is TRUE, B is FALSE, find C.',
    primaryConcept: 'Compound Logical Expressions',
    secondaryConcepts: ['Boolean Algebra', 'Firewalls'],
    learningObjective: 'Analyze truth values of multi-part compound logic equations.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Find the boolean state of C (TRUE or FALSE) so that (A OR B) AND (NOT C) is TRUE.',
    successCondition: 'Enter C = FALSE.',
    hint: 'Since A is true, (A OR B) is true. For the whole statement to be true, (NOT C) must also be true. Therefore, C must be false.',
    feedbackIncorrect: 'Firewall lockout. If C is true, NOT C is false, which breaks the equation. C must be FALSE.',
    xpReward: 180,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicType: 'gates',
      logicPremise: 'Expression: (A OR B) AND (NOT C) must be TRUE. If A = TRUE, B = FALSE, what must C be?',
      logicOptions: ['TRUE', 'FALSE'],
      logicAnswer: 'FALSE'
    }
  },
  {
    id: 'math-4-9',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 9,
    missionTitle: 'MISSION 39 — COMPOUND RESOURCE FORECAST',
    story: 'Emergency shelter reserve supply yields 100 tons initially and compounds at a growth rate of 10% per year. Calculate the supply tons after 2 years.',
    primaryConcept: 'Compound Growth Models',
    secondaryConcepts: ['Percentages', 'Exponents'],
    learningObjective: 'Evaluate compound growth curves using P * (1 + r)^t.',
    difficulty: 'HARD',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Compute: 100 × (1.10)^2.',
    successCondition: 'Select 121 tons.',
    hint: 'Calculate Year 1: 100 + 10% = 110. Calculate Year 2: 110 + 10% of 110 = 110 + 11.',
    feedbackIncorrect: 'Outpost deficit. 1.10 squared is 1.21. 100 × 1.21 = 121 tons.',
    xpReward: 190,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: '110 metric tons', cost: 1, benefit: 110, efficiency: 1.1 },
        { name: '120 metric tons', cost: 1, benefit: 120, efficiency: 1.2 },
        { name: '121 metric tons', cost: 1, benefit: 121, efficiency: 1.21 }
      ],
      optimalChoiceName: '121 metric tons'
    }
  },
  {
    id: 'math-4-10',
    domain: 'mathematics',
    stage: 4,
    levelNumber: 10,
    missionTitle: 'STAGE 4 BOSS — COLLAPSING CORE RECOVERY',
    story: 'The central Tesseract power core is collapsing! Stabilize the core by solving stress minimization equations, adding coordinate vectors, containing exponential decay particles, and aiming the final mirror collectors.',
    primaryConcept: 'Mastery Synthesis',
    secondaryConcepts: ['Quadratic Optimization', 'Vector Navigation', 'Exponential Containment', 'Trig Mirror Alignment'],
    learningObjective: 'Integrate advanced calculus, vector algebra, and geometry concepts to complete the Tesseract recovery sequence.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all 4 critical recovery phases under extreme narrative stakes.',
    successCondition: 'Solve all four phases successfully to claim the final Mathematics Fragment and assemble the Mathematics Stone.',
    hint: 'Calculate quadratic minimum (x=4), vector coordinates addition ([2+3, 1+2] = [5,3]), exponential decay (800*0.5^3 = 100), and trig mirror tangents (40/40 -> 45 degrees).',
    feedbackIncorrect: 'Tesseract collapse. Re-evaluate vector additions, quadratic minima, and mirror angles.',
    xpReward: 500,
    isBoss: true,
    stageFragmentReward: 'Mathematics Fragment 4',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Stabilize Deflection Girders',
          description: 'Minimize girder deflection stress given by: S(x) = x^2 - 8x + 20.',
          gameMechanic: 'OptimizationGame',
          instruction: 'Select optimal stabilizer coordinate x.',
          gameData: {
            optionsToChoose: [
              { name: 'Coordinate x = 2', cost: 8, benefit: 8, efficiency: 1.0 },
              { name: 'Coordinate x = 4', cost: 4, benefit: 16, efficiency: 4.0 },
              { name: 'Coordinate x = 6', cost: 8, benefit: 8, efficiency: 1.0 }
            ],
            optimalChoiceName: 'Coordinate x = 4'
          }
        },
        {
          phaseNumber: 2,
          title: 'Aim Drift Vectors',
          description: 'Add drift vector [2, 1] and engine vector [3, 2] to find target grid coordinates.',
          gameMechanic: 'CoordinateGame',
          instruction: 'Reach vector coordinate (5,3).',
          gameData: {
            gridSize: 6,
            startPoint: [0, 0],
            targetPoint: [5, 3],
            obstacles: [[2, 2], [3, 1]]
          }
        },
        {
          phaseNumber: 3,
          title: 'Contain Exponential Decay Particles',
          description: 'Initial particles: 800. Half-life decay rate: 50% per hour. Calculate particles remaining after 3 hours.',
          gameMechanic: 'EquationGame',
          instruction: 'Find remaining particles.',
          gameData: {
            equation: '800 x (0.5)^3 = ?',
            variableToSolve: 'Particles',
            correctValue: 100,
            equationOptions: [50, 100, 200, 300]
          }
        },
        {
          phaseNumber: 4,
          title: 'Calibrate Trigonometric Refraction Mirrors',
          description: 'Collector mirror distance = 40m, opposite target height = 40m. Find angle of elevation.',
          gameMechanic: 'GeometryGame',
          instruction: 'Set refraction angle θ (degrees).',
          gameData: {
            geometryType: 'triangle',
            givenValues: { adjacent: 40, opposite: 40 },
            geometryQuestion: 'What is the angle of elevation in degrees (tan θ = 1)?',
            geometryOptions: [30, 45, 60, 90],
            geometryAnswer: 45
          }
        }
      ]
    }
  }
];

export function getMathLevelById(id: string): MathLevel | undefined {
  return MATHEMATICS_LEVELS.find((l) => l.id === id);
}

export function getLevelsByStage(stageNum: number): MathLevel[] {
  return MATHEMATICS_LEVELS.filter((l) => l.stage === stageNum);
}
