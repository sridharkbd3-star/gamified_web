export interface EngGameData {
  sequence?: (number | string)[];
  nextNumberCorrect?: number;
  sequenceOptions?: number[];
  equation?: string;
  variableToSolve?: string;
  correctValue?: number;
  equationOptions?: number[];
  itemsToAllocate?: { name: string; requiredRatio: number; totalToDistribute: number }[];
  correctAllocation?: Record<string, number>;
  gridSize?: number;
  startPoint?: [number, number];
  targetPoint?: [number, number];
  obstacles?: [number, number][];
  logicPremise?: string;
  logicOptions?: string[];
  logicAnswer?: string;
  optionsToChoose?: { name: string; cost: number; benefit: number; efficiency: number }[];
  optimalChoiceName?: string;
  phases?: {
    phaseNumber: number;
    title: string;
    description: string;
    gameMechanic: string;
    gameData: EngGameData;
    instruction: string;
  }[];
}

export interface EngLevel {
  id: string;
  domain: 'engineering';
  stage: number;
  levelNumber: number;
  missionTitle: string;
  story: string;
  primaryConcept: string;
  secondaryConcepts: string[];
  learningObjective: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  gameMechanic: 'PatternGame' | 'EquationGame' | 'DragDropGame' | 'ResourceAllocationGame' | 'CoordinateGame' | 'LogicGame' | 'OptimizationGame' | 'BossGame';
  missionObjective: string;
  successCondition: string;
  hint: string;
  feedbackIncorrect: string;
  xpReward: number;
  isBoss: boolean;
  stageFragmentReward: string | null;
  gameData: EngGameData;
}

export const ENGINEERING_LEVELS: EngLevel[] = [
  // STAGE 1 - FOUNDATIONS
  {
    id: 'eng-1-1',
    domain: 'engineering',
    stage: 1,
    levelNumber: 1,
    missionTitle: 'THE BROKEN BRIDGE',
    story: 'The bridge support has collapsed, and we need to fix it fast! Pick the strongest shape to rebuild the bridge support.',
    primaryConcept: 'Basic structures',
    secondaryConcepts: ['Shapes', 'Strength'],
    learningObjective: 'Understand which geometric shapes provide the most structural strength.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Select the strongest shape for a bridge support.',
    successCondition: 'Correctly identify the strongest structural shape.',
    hint: 'Think about a shape with three sides that distributes weight evenly.',
    feedbackIncorrect: 'Not quite! Think of a shape that cannot easily be squashed out of shape. Try the triangle!',
    xpReward: 50,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Which shape is STRONGEST for a bridge support?',
      logicOptions: ['Circle', 'Square', 'Triangle', 'Rectangle'],
      logicAnswer: 'Triangle'
    }
  },
  {
    id: 'eng-1-2',
    domain: 'engineering',
    stage: 1,
    levelNumber: 2,
    missionTitle: 'THE MATERIAL TEST',
    story: 'We are designing a new bridge, but we need the perfect material. Choose the most efficient material that offers the best strength.',
    primaryConcept: 'Material properties',
    secondaryConcepts: ['Materials', 'Efficiency'],
    learningObjective: 'Evaluate different materials based on their properties and efficiency.',
    difficulty: 'EASY',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Choose the best material for the bridge construction.',
    successCondition: 'Select the optimal material choice.',
    hint: 'Look for the material with the highest efficiency and benefit.',
    feedbackIncorrect: 'That material might not be strong enough. Check the efficiency scores!',
    xpReward: 50,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'Steel', cost: 100, benefit: 100, efficiency: 9 },
        { name: 'Wood', cost: 50, benefit: 60, efficiency: 5 },
        { name: 'Cardboard', cost: 10, benefit: 20, efficiency: 2 }
      ],
      optimalChoiceName: 'Steel'
    }
  },
  {
    id: 'eng-1-3',
    domain: 'engineering',
    stage: 1,
    levelNumber: 3,
    missionTitle: 'THE TOWER CHALLENGE',
    story: 'We are building a tall observation tower. It needs to withstand strong winds without tipping over.',
    primaryConcept: 'Stability',
    secondaryConcepts: ['Center of gravity', 'Base support'],
    learningObjective: 'Understand how the shape of a base affects structural stability.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the most stable base for a tower.',
    successCondition: 'Correctly determine the optimal base configuration for stability.',
    hint: 'A broader bottom and lower center of gravity make things harder to tip over.',
    feedbackIncorrect: 'Tall and narrow things tip easily. Think about spreading the weight out!',
    xpReward: 60,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A tower is more stable when its base is...',
      logicOptions: ['Narrow and tall', 'Wide and low to ground', 'Very thin at bottom', 'Made of circles'],
      logicAnswer: 'Wide and low to ground'
    }
  },
  {
    id: 'eng-1-4',
    domain: 'engineering',
    stage: 1,
    levelNumber: 4,
    missionTitle: 'THE LOAD TEST',
    story: 'The bridge can safely hold 200kg. There is already a 140kg cargo truck on it. Let us find out how much more weight it can take.',
    primaryConcept: 'Weight and load',
    secondaryConcepts: ['Subtraction', 'Capacity'],
    learningObjective: 'Calculate remaining load capacity.',
    difficulty: 'EASY',
    gameMechanic: 'EquationGame',
    missionObjective: 'Calculate the remaining weight capacity of the bridge.',
    successCondition: 'Solve the equation for the remaining capacity.',
    hint: 'Subtract the current load from the maximum load.',
    feedbackIncorrect: 'Check your math! Subtract 140 from 200.',
    xpReward: 60,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'Max Load = 200kg. Current load = 140kg. How much MORE weight can it take?',
      correctValue: 60,
      equationOptions: [40, 50, 60, 70]
    }
  },
  {
    id: 'eng-1-5',
    domain: 'engineering',
    stage: 1,
    levelNumber: 5,
    missionTitle: 'THE FORCE MACHINE',
    story: 'We need to move a heavy supply box across the room to the right. Apply the force correctly!',
    primaryConcept: 'Forces',
    secondaryConcepts: ['Direction', 'Push/Pull'],
    learningObjective: 'Understand the relationship between the direction of applied force and movement.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the correct direction to apply force.',
    successCondition: 'Select the correct force direction to move the box right.',
    hint: 'To move something in a certain direction, you usually push or pull it in that same direction.',
    feedbackIncorrect: 'If you want it to go right, you must push it to the right!',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'To move a heavy box to the RIGHT, you apply force in which direction?',
      logicOptions: ['Left', 'Up', 'Right', 'Down'],
      logicAnswer: 'Right'
    }
  },
  {
    id: 'eng-1-6',
    domain: 'engineering',
    stage: 1,
    levelNumber: 6,
    missionTitle: 'THE SIMPLE MACHINE',
    story: 'You find some kids playing on a playground. One of the rides is actually a great example of a simple machine!',
    primaryConcept: 'Levers',
    secondaryConcepts: ['Simple machines', 'Fulcrum'],
    learningObjective: 'Identify common examples of simple machines in everyday life.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify which simple machine a seesaw represents.',
    successCondition: 'Correctly identify the seesaw as a lever.',
    hint: 'It has a pivot point (fulcrum) in the middle with a rigid bar.',
    feedbackIncorrect: 'A seesaw doesn\'t have ropes (pulley) or round parts (wheel). It balances on a point!',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A seesaw is an example of a...',
      logicOptions: ['Pulley', 'Wedge', 'Lever', 'Wheel and axle'],
      logicAnswer: 'Lever'
    }
  },
  {
    id: 'eng-1-7',
    domain: 'engineering',
    stage: 1,
    levelNumber: 7,
    missionTitle: 'THE WHEEL SYSTEM',
    story: 'You need to transport some heavy stones. We put them in a cart with wheels to help us.',
    primaryConcept: 'Wheels and axles',
    secondaryConcepts: ['Friction', 'Work'],
    learningObjective: 'Understand how wheels reduce friction to make work easier.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine how wheels affect the effort needed to move objects.',
    successCondition: 'Correctly answer how reducing friction helps movement.',
    hint: 'Think about sliding a box versus rolling it on wheels. Which takes less effort?',
    feedbackIncorrect: 'Less friction means less resistance, making it much easier to push!',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Wheels on a cart reduce friction. This makes it __ to move.',
      logicOptions: ['Harder', 'Heavier', 'Easier', 'Slower'],
      logicAnswer: 'Easier'
    }
  },
  {
    id: 'eng-1-8',
    domain: 'engineering',
    stage: 1,
    levelNumber: 8,
    missionTitle: 'THE GEAR ROOM',
    story: 'Inside the old windmill, there are gears of all sizes. Let\'s figure out how they affect speed!',
    primaryConcept: 'Gears',
    secondaryConcepts: ['Speed ratio', 'Rotation'],
    learningObjective: 'Understand how gear size affects rotational speed.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the speed of a large gear driven by a small gear.',
    successCondition: 'Identify that the larger gear turns slower.',
    hint: 'A smaller gear has to spin many times to turn a larger gear just once.',
    feedbackIncorrect: 'The large gear takes longer to complete a full turn, so it turns slower.',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A small gear drives a large gear. The large gear turns...',
      logicOptions: ['Faster than the small gear', 'At the same speed', 'Slower than the small gear', 'In the same direction'],
      logicAnswer: 'Slower than the small gear'
    }
  },
  {
    id: 'eng-1-9',
    domain: 'engineering',
    stage: 1,
    levelNumber: 9,
    missionTitle: 'THE RESCUE DEVICE',
    story: 'We need to build a device to rescue a cat stuck in a tree, but what is our first step as engineers?',
    primaryConcept: 'Engineering design',
    secondaryConcepts: ['Process', 'Problem solving'],
    learningObjective: 'Learn the first step of the engineering design process.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the first step in engineering design.',
    successCondition: 'Correctly choose "Define the problem".',
    hint: 'Before you can find an answer, you must know what the question is.',
    feedbackIncorrect: 'Before you test or build, you must define the problem you are trying to solve!',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'The first step in the engineering design process is to...',
      logicOptions: ['Build immediately', 'Define the problem', 'Test the solution', 'Discard old designs'],
      logicAnswer: 'Define the problem'
    }
  },
  {
    id: 'eng-1-10',
    domain: 'engineering',
    stage: 1,
    levelNumber: 10,
    missionTitle: 'THE COLLAPSING BRIDGE',
    story: 'A major storm is coming, and the main town bridge is threatening to collapse! Use all your engineering skills to reinforce and save the bridge.',
    primaryConcept: 'Structures and Loads',
    secondaryConcepts: ['Materials', 'Engineering process'],
    learningObjective: 'Apply concepts of shapes, materials, loads, and the design process to save a structure.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all phases of the bridge rescue operation.',
    successCondition: 'Solve all engineering challenges correctly to save the bridge.',
    hint: 'Remember what you learned about triangles, materials, and the engineering process.',
    feedbackIncorrect: 'Review your basic engineering principles and try again!',
    xpReward: 300,
    isBoss: true,
    stageFragmentReward: 'Engineering Fragment 1',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Structural Shape',
          description: 'Identify the best shape to stabilize the bridge.',
          gameMechanic: 'LogicGame',
          instruction: 'Choose the strongest structural shape.',
          gameData: {
            logicPremise: 'Which shape distributes load most evenly in a bridge?',
            logicOptions: ['Square arch', 'Triangular truss', 'Rectangular frame', 'Circular column'],
            logicAnswer: 'Triangular truss'
          }
        },
        {
          phaseNumber: 2,
          title: 'Reinforcement Material',
          description: 'Select the best material to hold the heavy load.',
          gameMechanic: 'OptimizationGame',
          instruction: 'Pick the optimal material for tension.',
          gameData: {
            optionsToChoose: [
              { name: 'Steel cable', cost: 0, benefit: 10, efficiency: 10 },
              { name: 'Wood plank', cost: 0, benefit: 5, efficiency: 5 },
              { name: 'Rope', cost: 0, benefit: 3, efficiency: 3 }
            ],
            optimalChoiceName: 'Steel cable'
          }
        },
        {
          phaseNumber: 3,
          title: 'Load Calculation',
          description: 'Verify the bridge can handle the evacuation vehicles.',
          gameMechanic: 'EquationGame',
          instruction: 'Calculate the total load of two cars.',
          gameData: {
            equation: 'Bridge holds 500kg. Two cars of 180kg each cross. Load = 2 × 180 = ?',
            correctValue: 360,
            equationOptions: [180, 270, 360, 400]
          }
        },
        {
          phaseNumber: 4,
          title: 'Iterative Design',
          description: 'The bridge still sags slightly after testing.',
          gameMechanic: 'LogicGame',
          instruction: 'Choose the correct next step in the engineering process.',
          gameData: {
            logicPremise: 'After testing, the bridge sags. What is the BEST next step in the engineering process?',
            logicOptions: ['Abandon the project', 'Improve the design based on test results', 'Use the same design again', 'Build it taller'],
            logicAnswer: 'Improve the design based on test results'
          }
        }
      ]
    }
  },

  // STAGE 2 - MECHANICAL ENGINEERING
  {
    id: 'eng-2-1',
    domain: 'engineering',
    stage: 2,
    levelNumber: 1,
    missionTitle: 'THE GEAR MACHINE',
    story: 'We are calculating the output speed of a complex gear train. Each gear stage doubles the speed of the one before it.',
    primaryConcept: 'Gears',
    secondaryConcepts: ['Ratios', 'Speed multipliers'],
    learningObjective: 'Understand compound gear ratios and speed multiplication.',
    difficulty: 'MEDIUM',
    gameMechanic: 'PatternGame',
    missionObjective: 'Find the output speed of the final gear.',
    successCondition: 'Complete the pattern of doubling speeds.',
    hint: 'Look at the pattern: each number is multiplied by 2.',
    feedbackIncorrect: 'Try multiplying the last number by 2!',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [10, 20, 40, '?'],
      nextNumberCorrect: 80,
      sequenceOptions: [60, 70, 80, 100]
    }
  },
  {
    id: 'eng-2-2',
    domain: 'engineering',
    stage: 2,
    levelNumber: 2,
    missionTitle: 'THE LIFT SYSTEM',
    story: 'We are installing a pulley system to hoist heavy crates to the second floor.',
    primaryConcept: 'Pulleys',
    secondaryConcepts: ['Simple machines', 'Force direction'],
    learningObjective: 'Understand the function of a single fixed pulley.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify what a single fixed pulley does to force.',
    successCondition: 'Select that a fixed pulley changes the direction of force.',
    hint: 'When you pull DOWN on the rope, the load goes UP.',
    feedbackIncorrect: 'A single fixed pulley doesn\'t reduce the force needed, it just lets you pull downwards instead of lifting upwards.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A single fixed pulley...',
      logicOptions: ['Reduces the force needed', 'Changes the direction of force', 'Both reduces force and changes direction', 'Multiplies force by 3'],
      logicAnswer: 'Changes the direction of force'
    }
  },
  {
    id: 'eng-2-3',
    domain: 'engineering',
    stage: 2,
    levelNumber: 3,
    missionTitle: 'THE HEAVY LOAD',
    story: 'We need to pry a heavy 60kg boulder out of the way using a lever. Calculate the effort force needed!',
    primaryConcept: 'Levers',
    secondaryConcepts: ['Mechanical advantage', 'Equations'],
    learningObjective: 'Calculate effort force using the lever equation.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Solve for the required effort to move the load.',
    successCondition: 'Correctly calculate the effort force.',
    hint: 'Multiply 60 by 2, then divide by 6.',
    feedbackIncorrect: '60 × 2 = 120. Then 120 ÷ 6 = ?',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'Effort × Effort arm = Load × Load arm. Load = 60kg, Load arm = 2m, Effort arm = 6m. Effort = ?',
      correctValue: 20,
      equationOptions: [15, 18, 20, 30]
    }
  },
  {
    id: 'eng-2-4',
    domain: 'engineering',
    stage: 2,
    levelNumber: 4,
    missionTitle: 'THE MOVING MACHINE',
    story: 'An engine uses a spinning shaft with a cam to open and close valves.',
    primaryConcept: 'Mechanical motion',
    secondaryConcepts: ['Cams', 'Motion conversion'],
    learningObjective: 'Understand how cams convert rotary motion to reciprocating motion.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the type of motion conversion a cam performs.',
    successCondition: 'Select "Rotary to up-down (reciprocating)".',
    hint: 'As the cam spins around (rotary), it pushes a rod up and down repeatedly.',
    feedbackIncorrect: 'A cam takes a spinning motion and converts it to a repeating up-and-down or back-and-forth motion.',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A cam converts ___ motion into ___ motion.',
      logicOptions: ['Linear to rotary', 'Rotary to up-down (reciprocating)', 'Rotary to linear only', 'Up-down to diagonal'],
      logicAnswer: 'Rotary to up-down (reciprocating)'
    }
  },
  {
    id: 'eng-2-5',
    domain: 'engineering',
    stage: 2,
    levelNumber: 5,
    missionTitle: 'THE ENERGY MACHINE',
    story: 'You wind up a little toy car and let it go. It zooms across the floor!',
    primaryConcept: 'Energy transfer',
    secondaryConcepts: ['Stored energy', 'Kinetic energy'],
    learningObjective: 'Identify the types of energy transformation in a mechanical system.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the energy transfer in a wind-up toy.',
    successCondition: 'Select "Elastic (stored) to kinetic".',
    hint: 'Winding the spring stores elastic energy. Releasing it creates movement (kinetic).',
    feedbackIncorrect: 'A wind-up toy doesn\'t use electricity or chemicals. It uses a spring!',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'In a wind-up toy, energy is transferred from...',
      logicOptions: ['Electrical to kinetic', 'Chemical to electrical', 'Elastic (stored) to kinetic', 'Nuclear to heat'],
      logicAnswer: 'Elastic (stored) to kinetic'
    }
  },
  {
    id: 'eng-2-6',
    domain: 'engineering',
    stage: 2,
    levelNumber: 6,
    missionTitle: 'THE SPEED CONTROL',
    story: 'We are tuning an engine. The gear ratio is 3, and the input speed is 90 rpm. Find the output speed.',
    primaryConcept: 'Speed and gears',
    secondaryConcepts: ['Gear ratios', 'RPM'],
    learningObjective: 'Calculate output speed using input speed and gear ratio.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Calculate the output speed of the system.',
    successCondition: 'Correctly solve for the output speed.',
    hint: 'Simply divide the input speed (90) by the gear ratio (3).',
    feedbackIncorrect: 'What is 90 divided by 3?',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'Gear ratio = 3. Input speed = 90 rpm. Output speed = Input / Gear ratio = ?',
      correctValue: 30,
      equationOptions: [20, 25, 30, 45]
    }
  },
  {
    id: 'eng-2-7',
    domain: 'engineering',
    stage: 2,
    levelNumber: 7,
    missionTitle: 'THE ROBOT ARM',
    story: 'We are programming a robot arm in the factory. It uses a gear system to rotate the arm.',
    primaryConcept: 'Mechanical systems',
    secondaryConcepts: ['Rotation', 'Direct drive'],
    learningObjective: 'Understand rotational direction in simple mechanical linkages.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the direction of movement of the robot arm.',
    successCondition: 'Select that the arm moves clockwise.',
    hint: 'If a gear is directly connected to a rigid arm, they rotate together as one piece.',
    feedbackIncorrect: 'The gear and the arm are attached to the same axis, so they turn in the same direction.',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A robot arm uses a motor to rotate a gear connected to the arm. If the gear turns clockwise, the arm moves...',
      logicOptions: ['Also clockwise', 'Anti-clockwise', 'Straight up', 'Does not move'],
      logicAnswer: 'Also clockwise'
    }
  },
  {
    id: 'eng-2-8',
    domain: 'engineering',
    stage: 2,
    levelNumber: 8,
    missionTitle: 'THE MACHINE FAILURE',
    story: 'Alarms are blaring! A machine belt snapped and production has halted.',
    primaryConcept: 'Troubleshooting',
    secondaryConcepts: ['Maintenance', 'Engineering process'],
    learningObjective: 'Apply logical troubleshooting steps when a mechanical failure occurs.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the first correct action when a machine fails.',
    successCondition: 'Select "Identify the cause of the failure".',
    hint: 'Before you can fix something permanently, you need to know why it broke.',
    feedbackIncorrect: 'Replacing it right away without knowing why it broke might lead to it breaking again. Find the cause first!',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A machine belt snaps. Production stops. What is the FIRST engineering action?',
      logicOptions: ['Replace the entire machine', 'Identify the cause of the failure', 'Increase production speed', 'Add more gears'],
      logicAnswer: 'Identify the cause of the failure'
    }
  },
  {
    id: 'eng-2-9',
    domain: 'engineering',
    stage: 2,
    levelNumber: 9,
    missionTitle: 'THE BETTER DESIGN',
    story: 'We are designing a new crane for search and rescue operations. It needs to lift very heavy rubble safely.',
    primaryConcept: 'Optimization',
    secondaryConcepts: ['Mechanical advantage', 'Design choice'],
    learningObjective: 'Select the optimal mechanical system for a specific use-case.',
    difficulty: 'HARD',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Choose the best gear system for a high-load rescue crane.',
    successCondition: 'Select the high-ratio gear system.',
    hint: 'Lifting very heavy loads requires high mechanical advantage and efficiency.',
    feedbackIncorrect: 'Direct drives or manual cranks won\'t provide enough mechanical advantage to lift heavy rubble easily.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'High-ratio gear system', cost: 0, benefit: 9, efficiency: 9 },
        { name: 'Direct motor drive', cost: 0, benefit: 5, efficiency: 5 },
        { name: 'Manual crank', cost: 0, benefit: 2, efficiency: 2 }
      ],
      optimalChoiceName: 'High-ratio gear system'
    }
  },
  {
    id: 'eng-2-10',
    domain: 'engineering',
    stage: 2,
    levelNumber: 10,
    missionTitle: 'THE FACTORY MACHINE',
    story: 'The central factory machine is broken, and production has stopped! Fix the gears, pulleys, and optimization systems to get it running.',
    primaryConcept: 'Mechanical Systems',
    secondaryConcepts: ['Gears', 'Pulleys', 'Efficiency'],
    learningObjective: 'Master mechanical concepts including compound gears, pulleys, and optimization metrics.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Repair all systems of the central factory machine.',
    successCondition: 'Complete all mechanical repair phases.',
    hint: 'Use all your knowledge of gears, pulleys, and math to fix the machine.',
    feedbackIncorrect: 'The machine is still jammed! Review your mechanical engineering concepts.',
    xpReward: 350,
    isBoss: true,
    stageFragmentReward: 'Engineering Fragment 2',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Gear Calibration',
          description: 'Fix the doubling gear train.',
          gameMechanic: 'PatternGame',
          instruction: 'Find the final output speed.',
          gameData: {
            sequence: [5, 10, 20, 40, '?'],
            nextNumberCorrect: 80,
            sequenceOptions: [60, 70, 80, 100]
          }
        },
        {
          phaseNumber: 2,
          title: 'Pulley Repair',
          description: 'Calculate the effort for the new pulley system.',
          gameMechanic: 'EquationGame',
          instruction: 'Solve for the required effort.',
          gameData: {
            equation: 'Pulley system. Mechanical advantage = 4. Load = 200N. Effort needed = 200/4 = ?',
            correctValue: 50,
            equationOptions: [40, 45, 50, 60]
          }
        },
        {
          phaseNumber: 3,
          title: 'Production Analysis',
          description: 'Calculate the improvement in production speed.',
          gameMechanic: 'LogicGame',
          instruction: 'Determine the percentage improvement.',
          gameData: {
            logicPremise: 'A machine produces 100 items/hour. After optimization it produces 150. Improvement = ?',
            logicOptions: ['10%', '25%', '50%', '75%'],
            logicAnswer: '50%'
          }
        },
        {
          phaseNumber: 4,
          title: 'Final Optimization',
          description: 'Upgrade the final transport system.',
          gameMechanic: 'OptimizationGame',
          instruction: 'Select the most efficient transport method.',
          gameData: {
            optionsToChoose: [
              { name: 'Automated conveyor belt', cost: 0, benefit: 10, efficiency: 10 },
              { name: 'Manual sorting', cost: 0, benefit: 4, efficiency: 4 },
              { name: 'Semi-automated', cost: 0, benefit: 7, efficiency: 7 }
            ],
            optimalChoiceName: 'Automated conveyor belt'
          }
        }
      ]
    }
  },

  // STAGE 3 - ELECTRICAL & ROBOTIC ENGINEERING
  {
    id: 'eng-3-1',
    domain: 'engineering',
    stage: 3,
    levelNumber: 1,
    missionTitle: 'THE CIRCUIT BUILDER',
    story: 'We are wiring up a simple set of lights. Let\'s see what happens if one bulb burns out.',
    primaryConcept: 'Circuits',
    secondaryConcepts: ['Series circuits', 'Continuity'],
    learningObjective: 'Understand how a series circuit functions.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the outcome in a broken series circuit.',
    successCondition: 'Identify that breaking a series circuit stops all current.',
    hint: 'In a series circuit, there is only one path for the electricity to flow.',
    feedbackIncorrect: 'If one bulb breaks in a series circuit, the path is broken and no electricity can flow anywhere.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Two bulbs are connected in SERIES. One bulb breaks. What happens to the other?',
      logicOptions: ['Still lights up', 'Goes out too', 'Gets brighter', 'Starts flashing'],
      logicAnswer: 'Goes out too'
    }
  },
  {
    id: 'eng-3-2',
    domain: 'engineering',
    stage: 3,
    levelNumber: 2,
    missionTitle: 'THE SENSOR SYSTEM',
    story: 'The automated greenhouse needs to know when to water the plants. Which sensor should we install?',
    primaryConcept: 'Sensors',
    secondaryConcepts: ['Automation', 'Inputs'],
    learningObjective: 'Select appropriate sensors for automated environmental control.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Choose the correct sensor for detecting dry soil.',
    successCondition: 'Select the moisture sensor.',
    hint: 'You need to measure how wet or dry the soil is.',
    feedbackIncorrect: 'A temperature or light sensor won\'t tell you if the soil has enough water.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A greenhouse automatically waters plants when soil moisture is below 30%. Which sensor is needed?',
      logicOptions: ['Temperature sensor', 'Light sensor', 'Moisture sensor', 'Motion sensor'],
      logicAnswer: 'Moisture sensor'
    }
  },
  {
    id: 'eng-3-3',
    domain: 'engineering',
    stage: 3,
    levelNumber: 3,
    missionTitle: 'THE MOTOR CONTROL',
    story: 'Our remote-controlled car is stuck going forward! We need to make the DC motor spin in reverse.',
    primaryConcept: 'Motors',
    secondaryConcepts: ['Current direction', 'Polarity'],
    learningObjective: 'Understand how to reverse the rotational direction of a DC motor.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine how to reverse a DC motor.',
    successCondition: 'Select that you must reverse the current flow.',
    hint: 'The direction a DC motor spins depends on the direction the electricity flows through it.',
    feedbackIncorrect: 'Reversing the positive and negative wires reverses the current, which reverses the motor!',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'To reverse the direction of a DC motor, you...',
      logicOptions: ['Double the voltage', 'Reverse the current flow', 'Remove one wire', 'Add a gear'],
      logicAnswer: 'Reverse the current flow'
    }
  },
  {
    id: 'eng-3-4',
    domain: 'engineering',
    stage: 3,
    levelNumber: 4,
    missionTitle: 'THE AUTOMATIC DOOR',
    story: 'As you walk up to the supermarket, the doors slide open by themselves. What kind of system is this?',
    primaryConcept: 'Control systems',
    secondaryConcepts: ['Sensors', 'Feedback loops'],
    learningObjective: 'Identify examples of closed-loop control systems.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Classify the control system of an automatic door.',
    successCondition: 'Identify it as a closed-loop system.',
    hint: 'The system uses a sensor to get feedback from the environment before taking action.',
    feedbackIncorrect: 'It relies on sensor feedback (seeing a person) to act, making it a closed-loop system.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'An automatic door has a sensor that opens the door when someone approaches. This is an example of a...',
      logicOptions: ['Open-loop system', 'Closed-loop (feedback) system', 'Manual control', 'Wireless control only'],
      logicAnswer: 'Closed-loop (feedback) system'
    }
  },
  {
    id: 'eng-3-5',
    domain: 'engineering',
    stage: 3,
    levelNumber: 5,
    missionTitle: 'THE ROBOT HAND',
    story: 'You are programming a robotic arm. It has 3 joints that move together. Calculate the total rotation!',
    primaryConcept: 'Robotic mechanisms',
    secondaryConcepts: ['Angles', 'Multiplication'],
    learningObjective: 'Calculate combined angular movement in robotic joints.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Calculate the total rotation of the robot arm.',
    successCondition: 'Correctly solve the rotation equation.',
    hint: 'Multiply the number of joints by the angle each joint moves.',
    feedbackIncorrect: '3 joints times 30 degrees each... 3 × 30 = ?',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'Robot arm has 3 joints each rotating 30°. Total rotation = 3 × 30 = ?',
      correctValue: 90,
      equationOptions: [60, 80, 90, 120]
    }
  },
  {
    id: 'eng-3-6',
    domain: 'engineering',
    stage: 3,
    levelNumber: 6,
    missionTitle: 'THE POWER SYSTEM',
    story: 'We are installing solar panels on a rover. We need to calculate how much power they generate.',
    primaryConcept: 'Electrical power',
    secondaryConcepts: ['Voltage', 'Current', 'Watts'],
    learningObjective: 'Calculate electrical power using voltage and current.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Calculate the electrical power of the system.',
    successCondition: 'Correctly multiply voltage by current to find power.',
    hint: 'Power is Voltage multiplied by Current.',
    feedbackIncorrect: '12 multiplied by 3 is the answer!',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'Power = Voltage × Current. Voltage = 12V, Current = 3A. Power = ?',
      correctValue: 36,
      equationOptions: [24, 30, 36, 48]
    }
  },
  {
    id: 'eng-3-7',
    domain: 'engineering',
    stage: 3,
    levelNumber: 7,
    missionTitle: 'THE FOLLOWER ROBOT',
    story: 'Program the delivery robot to reach its charging station while avoiding the blocked paths in the warehouse.',
    primaryConcept: 'Robot navigation',
    secondaryConcepts: ['Coordinates', 'Pathfinding'],
    learningObjective: 'Navigate a robot on a coordinate grid avoiding obstacles.',
    difficulty: 'HARD',
    gameMechanic: 'CoordinateGame',
    missionObjective: 'Navigate from start to target without hitting obstacles.',
    successCondition: 'Find a clear path to (2,2).',
    hint: 'Plan your route around [0,1] and [1,2].',
    feedbackIncorrect: 'Crash! You hit an obstacle. Try a different path.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      gridSize: 3,
      startPoint: [0, 0],
      targetPoint: [2, 2],
      obstacles: [[0, 1], [1, 2]]
    }
  },
  {
    id: 'eng-3-8',
    domain: 'engineering',
    stage: 3,
    levelNumber: 8,
    missionTitle: 'THE SMART MACHINE',
    story: 'The new factory line checks every toy using a camera to ensure it\'s painted correctly.',
    primaryConcept: 'Automation',
    secondaryConcepts: ['Machine vision', 'Quality control'],
    learningObjective: 'Understand the concept of automated machine vision in manufacturing.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the type of automation used.',
    successCondition: 'Select "Automated visual inspection (machine vision)".',
    hint: 'The machine is using a camera (vision) to inspect things automatically.',
    feedbackIncorrect: 'When computers use cameras to check physical objects, it is called machine vision.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'An assembly line robot uses feedback from a camera to check product quality. This is...',
      logicOptions: ['Manual quality control', 'Automated visual inspection (machine vision)', 'Basic robotics', 'Network security'],
      logicAnswer: 'Automated visual inspection (machine vision)'
    }
  },
  {
    id: 'eng-3-9',
    domain: 'engineering',
    stage: 3,
    levelNumber: 9,
    missionTitle: 'THE RESCUE ROBOT',
    story: 'An earthquake struck! We must deploy the best robotic asset to locate survivors quickly and safely.',
    primaryConcept: 'Integrated robotics',
    secondaryConcepts: ['Optimization', 'Deployment'],
    learningObjective: 'Evaluate and select the most effective robotic system for an emergency scenario.',
    difficulty: 'HARD',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Choose the optimal robot for disaster rescue.',
    successCondition: 'Select the AI-powered rescue drone.',
    hint: 'Look for the option with the highest benefit and efficiency for navigating debris.',
    feedbackIncorrect: 'Drones can fly over dangerous rubble safely and quickly. Choose the most efficient tech!',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'AI-powered rescue drone', cost: 0, benefit: 10, efficiency: 10 },
        { name: 'Remote-controlled car', cost: 0, benefit: 5, efficiency: 5 },
        { name: 'Manual search team only', cost: 0, benefit: 3, efficiency: 3 }
      ],
      optimalChoiceName: 'AI-powered rescue drone'
    }
  },
  {
    id: 'eng-3-10',
    domain: 'engineering',
    stage: 3,
    levelNumber: 10,
    missionTitle: 'THE ROBOT RESCUE BOSS',
    story: 'A mining robot is trapped deep underground! Use your electrical and robotics knowledge to power up the backup systems and navigate it out safely.',
    primaryConcept: 'Robotics & Electricity',
    secondaryConcepts: ['Circuits', 'Navigation', 'Failsafes'],
    learningObjective: 'Synthesize knowledge of circuits, robot kinematics, navigation, and failsafes.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Rescue the trapped mining robot.',
    successCondition: 'Complete all electrical and robotics challenges to finish the rescue.',
    hint: 'Think carefully about parallel circuits and robot navigation.',
    feedbackIncorrect: 'The robot is still trapped! Review electrical and robotic principles.',
    xpReward: 400,
    isBoss: true,
    stageFragmentReward: 'Engineering Fragment 3',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Lighting Repair',
          description: 'Fix the parallel lighting circuit so the robot can see.',
          gameMechanic: 'LogicGame',
          instruction: 'Determine what happens in a parallel circuit.',
          gameData: {
            logicPremise: 'Two bulbs in PARALLEL: one breaks. What happens?',
            logicOptions: ['Both go out', 'Only the broken one goes out', 'Both get brighter', 'Circuit short-circuits'],
            logicAnswer: 'Only the broken one goes out'
          }
        },
        {
          phaseNumber: 2,
          title: 'Movement Calculation',
          description: 'Calculate the required motor steps to move the debris.',
          gameMechanic: 'EquationGame',
          instruction: 'Solve for the required motor steps.',
          gameData: {
            equation: 'Robot moves 5cm per motor step. Needs to travel 35cm. Steps needed = 35/5 = ?',
            correctValue: 7,
            equationOptions: [5, 6, 7, 10]
          }
        },
        {
          phaseNumber: 3,
          title: 'Tunnel Navigation',
          description: 'Steer the robot through the collapsed tunnel.',
          gameMechanic: 'CoordinateGame',
          instruction: 'Navigate around the tunnel obstacles.',
          gameData: {
            gridSize: 4,
            startPoint: [0, 0],
            targetPoint: [3, 2],
            obstacles: [[1, 1], [2, 0], [1, 3]]
          }
        },
        {
          phaseNumber: 4,
          title: 'Emergency Failsafe',
          description: 'The battery is critically low. Determine the correct protocol.',
          gameMechanic: 'LogicGame',
          instruction: 'Choose the correct automated failsafe action.',
          gameData: {
            logicPremise: 'A rescue robot\'s battery drops to 5%. What should the automated system do?',
            logicOptions: ['Continue the mission', 'Return to base to recharge (safe failure mode)', 'Increase speed', 'Shut down immediately'],
            logicAnswer: 'Return to base to recharge (safe failure mode)'
          }
        }
      ]
    }
  },

  // STAGE 4 - MASTERY
  {
    id: 'eng-4-1',
    domain: 'engineering',
    stage: 4,
    levelNumber: 1,
    missionTitle: 'DEFINE THE PROBLEM',
    story: 'A remote school has lost access to clean water. As a master engineer, how do you begin solving this?',
    primaryConcept: 'Engineering design process',
    secondaryConcepts: ['Problem definition'],
    learningObjective: 'Apply the first step of the engineering design process to a real-world scenario.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the crucial first step for the water project.',
    successCondition: 'Select the problem definition option.',
    hint: 'You cannot build a solution until you fully understand what the problem requires.',
    feedbackIncorrect: 'Don\'t rush to build! Always define the problem and requirements first.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A school has no clean water. The engineering design challenge starts with...',
      logicOptions: ['Building a water tank immediately', 'Defining the problem: What type of water system is needed?', 'Testing random solutions', 'Ordering materials'],
      logicAnswer: 'Defining the problem: What type of water system is needed?'
    }
  },
  {
    id: 'eng-4-2',
    domain: 'engineering',
    stage: 4,
    levelNumber: 2,
    missionTitle: 'DESIGN THE SOLUTION',
    story: 'We have defined the problem. Now, select the best technical solution for the remote school\'s water supply.',
    primaryConcept: 'Generate solutions',
    secondaryConcepts: ['Optimization', 'Sustainability'],
    learningObjective: 'Evaluate and select sustainable engineering solutions.',
    difficulty: 'HARD',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Choose the best water system technology.',
    successCondition: 'Select the Solar water pump.',
    hint: 'Look for a highly efficient and sustainable solution.',
    feedbackIncorrect: 'Diesel pumps require constant fuel delivery, and manual wells are slow. Try the solar option!',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'Solar water pump', cost: 0, benefit: 9, efficiency: 9 },
        { name: 'Manual well', cost: 0, benefit: 5, efficiency: 5 },
        { name: 'Diesel pump', cost: 0, benefit: 4, efficiency: 4 }
      ],
      optimalChoiceName: 'Solar water pump'
    }
  },
  {
    id: 'eng-4-3',
    domain: 'engineering',
    stage: 4,
    levelNumber: 3,
    missionTitle: 'BUILD THE PROTOTYPE',
    story: 'Before we install the massive water system, we are building a smaller version first. Why?',
    primaryConcept: 'Prototype',
    secondaryConcepts: ['Testing', 'Iterative design'],
    learningObjective: 'Understand the purpose and importance of prototyping in engineering.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the main purpose of an engineering prototype.',
    successCondition: 'Select that prototypes are used to test ideas.',
    hint: 'It is cheaper to find mistakes on a small test model than on the final expensive build.',
    feedbackIncorrect: 'A prototype is an early sample or model built to test a concept or process.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A prototype is built to...',
      logicOptions: ['Be the final product', 'Test ideas before building the real thing', 'Replace the real design', 'Impress clients only'],
      logicAnswer: 'Test ideas before building the real thing'
    }
  },
  {
    id: 'eng-4-4',
    domain: 'engineering',
    stage: 4,
    levelNumber: 4,
    missionTitle: 'TEST THE DESIGN',
    story: 'We are pressure testing the prototype water pipe. It failed at 120 PSI, but it needs to survive 150 PSI. Find the gap.',
    primaryConcept: 'Testing',
    secondaryConcepts: ['Data analysis', 'Performance gaps'],
    learningObjective: 'Calculate the performance gap between prototype results and target specifications.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Calculate the pressure gap that needs to be overcome.',
    successCondition: 'Correctly subtract the failure pressure from the target pressure.',
    hint: 'Subtract 120 from 150.',
    feedbackIncorrect: '150 minus 120 equals... ?',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'A water pipe prototype fails at 120 PSI. The design target is 150 PSI. Gap = 150 - 120 = ?',
      correctValue: 30,
      equationOptions: [20, 25, 30, 40]
    }
  },
  {
    id: 'eng-4-5',
    domain: 'engineering',
    stage: 4,
    levelNumber: 5,
    missionTitle: 'FIND THE FAILURE',
    story: 'A structural test bridge snapped right in the middle! As the lead engineer, identify the most likely structural cause.',
    primaryConcept: 'Troubleshooting',
    secondaryConcepts: ['Structural failure', 'Bending moments'],
    learningObjective: 'Identify common causes of structural failure in beams and bridges.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Diagnose the cause of the bridge failure at its midpoint.',
    successCondition: 'Select "Insufficient support at the midpoint".',
    hint: 'If a beam breaks in the middle, that is where the bending stress was highest.',
    feedbackIncorrect: 'The center of a bridge experiences the most bending force. If it breaks there, it lacks support!',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A bridge fails at the center. The most likely cause is...',
      logicOptions: ['Weak foundations', 'Insufficient support at the midpoint (bending moment)', 'Wrong color paint', 'Too many workers'],
      logicAnswer: 'Insufficient support at the midpoint (bending moment)'
    }
  },
  {
    id: 'eng-4-6',
    domain: 'engineering',
    stage: 4,
    levelNumber: 6,
    missionTitle: 'IMPROVE THE MACHINE',
    story: 'You are tweaking an electric engine. Every time you improve the aerodynamics, efficiency goes up by exactly 10%.',
    primaryConcept: 'Optimization',
    secondaryConcepts: ['Iteration', 'Efficiency'],
    learningObjective: 'Track cumulative improvements in an iterative engineering process.',
    difficulty: 'MEDIUM',
    gameMechanic: 'PatternGame',
    missionObjective: 'Determine the final efficiency after the improvements.',
    successCondition: 'Complete the pattern of adding 10.',
    hint: 'The pattern is adding 10 each time.',
    feedbackIncorrect: 'Just add 10 to the last number in the sequence!',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [60, 70, 80, '?'],
      nextNumberCorrect: 90,
      sequenceOptions: [82, 85, 90, 95]
    }
  },
  {
    id: 'eng-4-7',
    domain: 'engineering',
    stage: 4,
    levelNumber: 7,
    missionTitle: 'BUILD THE SMART SYSTEM',
    story: 'You are designing the logic controller for an automated farm. It must evaluate multiple conditions before acting.',
    primaryConcept: 'Integrated systems',
    secondaryConcepts: ['Logic gates', 'Control systems'],
    learningObjective: 'Understand basic logical operators (AND) in control systems.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the type of logic gate being used.',
    successCondition: 'Select "AND logic".',
    hint: 'Both conditions (dry soil AND morning time) must be true at the same time.',
    feedbackIncorrect: 'When multiple conditions must ALL be true for an action to happen, it is AND logic.',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A smart irrigation system uses soil sensors and a timer. When soil is dry AND timer says morning, water flows. This uses what logic?',
      logicOptions: ['OR logic', 'AND logic', 'NOT logic', 'XOR logic'],
      logicAnswer: 'AND logic'
    }
  },
  {
    id: 'eng-4-8',
    domain: 'engineering',
    stage: 4,
    levelNumber: 8,
    missionTitle: 'THE FUTURE VEHICLE',
    story: 'Design the transport of tomorrow! We need an efficient, high-benefit propulsion system for a new eco-city.',
    primaryConcept: 'Engineering design',
    secondaryConcepts: ['Sustainability', 'Future tech'],
    learningObjective: 'Evaluate advanced propulsion systems based on efficiency and benefit.',
    difficulty: 'HARD',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Choose the optimal propulsion system.',
    successCondition: 'Select the Hydrogen fuel cell.',
    hint: 'Choose the technology with the perfect 10s for benefit and efficiency.',
    feedbackIncorrect: 'Steam and petrol are outdated and inefficient. Look for the modern green tech!',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'Hydrogen fuel cell', cost: 0, benefit: 10, efficiency: 10 },
        { name: 'Petrol engine', cost: 0, benefit: 5, efficiency: 5 },
        { name: 'Steam engine', cost: 0, benefit: 2, efficiency: 2 }
      ],
      optimalChoiceName: 'Hydrogen fuel cell'
    }
  },
  {
    id: 'eng-4-9',
    domain: 'engineering',
    stage: 4,
    levelNumber: 9,
    missionTitle: 'THE FINAL PROTOTYPE',
    story: 'Your team has tested a prototype drone 3 times, and it keeps crashing. What is the true engineering mindset here?',
    primaryConcept: 'Complete process',
    secondaryConcepts: ['Resilience', 'Redesign'],
    learningObjective: 'Understand that persistent failure requires returning to the core design phase.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the best response to repeated prototype failure.',
    successCondition: 'Select "Return to the design stage".',
    hint: 'If small tweaks aren\'t working, you need to go back to the drawing board.',
    feedbackIncorrect: 'Don\'t give up, but don\'t just keep doing the same thing. Redesign it!',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'After improving a prototype 3 times, it still fails. The BEST next engineering step is...',
      logicOptions: ['Give up', 'Return to the design stage and rethink the approach', 'Build more prototypes exactly the same', 'Change the engineer'],
      logicAnswer: 'Return to the design stage and rethink the approach'
    }
  },
  {
    id: 'eng-4-10',
    domain: 'engineering',
    stage: 4,
    levelNumber: 10,
    missionTitle: 'THE FUTURE CITY MACHINE',
    story: 'A massive storm has crippled the futuristic eco-city! As the Master Engineer, you must restore power, recalculate energy needs, deploy repair bots, and secure the mega-bridge.',
    primaryConcept: 'Systems Engineering',
    secondaryConcepts: ['Energy', 'Safety', 'Robotics'],
    learningObjective: 'Master complex, integrated engineering problems involving energy grids, calculations, navigation, and structural safety protocols.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Save the eco-city by completing all master engineering tasks.',
    successCondition: 'Successfully solve all 4 phases of the city crisis.',
    hint: 'Use everything you have learned: sustainability, math, spatial awareness, and safety protocols.',
    feedbackIncorrect: 'The city systems are failing! Re-evaluate your engineering choices and try again.',
    xpReward: 500,
    isBoss: true,
    stageFragmentReward: 'Engineering Fragment 4',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Power Grid Restoration',
          description: 'The city needs immediate, sustainable backup power.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the best emergency power source.',
          gameData: {
            logicPremise: 'A city\'s power grid fails. Which is the MOST sustainable emergency backup?',
            logicOptions: ['Diesel generators', 'Coal plant', 'Solar + battery storage', 'Nuclear (takes years to build)'],
            logicAnswer: 'Solar + battery storage'
          }
        },
        {
          phaseNumber: 2,
          title: 'Energy Calculation',
          description: 'Calculate the total energy provided by the wind turbines.',
          gameMechanic: 'EquationGame',
          instruction: 'Solve the energy equation.',
          gameData: {
            equation: 'A wind turbine produces 2MW per hour. In 8 hours, total energy = 2×8 = ?',
            correctValue: 16,
            equationOptions: [10, 12, 14, 16]
          }
        },
        {
          phaseNumber: 3,
          title: 'Repair Bot Deployment',
          description: 'Navigate the repair bot through the flooded streets to the control center.',
          gameMechanic: 'CoordinateGame',
          instruction: 'Plot a safe course avoiding flooded zones.',
          gameData: {
            gridSize: 4,
            startPoint: [0, 0],
            targetPoint: [3, 3],
            obstacles: [[1, 0], [2, 2], [0, 2], [3, 1]]
          }
        },
        {
          phaseNumber: 4,
          title: 'Mega-Bridge Safety',
          description: 'The new mega-bridge failed a stress test. What is the protocol?',
          gameMechanic: 'LogicGame',
          instruction: 'Choose the safest engineering response to a structural failure.',
          gameData: {
            logicPremise: 'A mega-bridge project fails its load test at 60% capacity. The engineering team should...',
            logicOptions: ['Open the bridge immediately', 'Analyse failure point, redesign supports, re-test before opening', 'Reduce the weight limit and open anyway', 'Change building materials randomly'],
            logicAnswer: 'Analyse failure point, redesign supports, re-test before opening'
          }
        }
      ]
    }
  }
];

export const getLevelsByStage = (stage: number) => ENGINEERING_LEVELS.filter(l => l.stage === stage);
