export interface SciGameData {
  // Pattern / Sequence Completion
  sequence?: (number | string)[];
  nextNumberCorrect?: number;
  sequenceOptions?: number[];
  
  // Multiple choice (patternGame reused)
  options?: string[];
  correctOption?: string;

  // Equation solving
  equation?: string;
  variableToSolve?: string;
  correctValue?: number;
  equationOptions?: number[];

  // Drag and Drop / Resource Allocation
  itemsToAllocate?: { name: string; requiredRatio: number; totalToDistribute: number }[];
  correctAllocation?: Record<string, number>;

  // Coordinate Navigation
  gridSize?: number;
  startPoint?: [number, number];
  targetPoint?: [number, number];
  obstacles?: [number, number][];

  // Logic Game
  logicPremise?: string;
  logicOptions?: string[];
  logicAnswer?: string;

  // Optimization
  optionsToChoose?: { name: string; cost: number; benefit: number; efficiency: number }[];
  optimalChoiceName?: string;

  // Boss multi-part
  phases?: {
    phaseNumber: number;
    title: string;
    description: string;
    gameMechanic: string;
    gameData: SciGameData;
    instruction: string;
  }[];
}

export interface SciLevel {
  id: string; // e.g. 'sci-1-1'
  domain: 'science';
  stage: number; // 1-4
  levelNumber: number; // 1-10
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
  gameData: SciGameData;
}

export const SCIENCE_LEVELS: SciLevel[] = [
  // STAGE 1 — DISCOVER (Levels 1-10)
  {
    id: 'sci-1-1',
    domain: 'science',
    stage: 1,
    levelNumber: 1,
    missionTitle: 'THE MYSTERIOUS LAB',
    story: 'A strange substance appeared in the lab.',
    primaryConcept: 'Observation',
    secondaryConcepts: ['Matter', 'States of matter'],
    learningObjective: 'Classify a substance by its properties.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Classify the substance.',
    successCondition: 'Identify the state of matter correctly.',
    hint: 'Think about objects that have a fixed shape.',
    feedbackIncorrect: 'Incorrect! Remember, only one state of matter has a fixed shape.',
    xpReward: 50,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A new substance is found. It is hard, has a fixed shape, and cannot be poured. What state of matter is it?',
      logicOptions: ['Solid', 'Liquid', 'Gas'],
      logicAnswer: 'Solid'
    }
  },
  {
    id: 'sci-1-2',
    domain: 'science',
    stage: 1,
    levelNumber: 2,
    missionTitle: 'THE BROKEN SENSOR',
    story: 'We need to measure the temperature, but the automated sensor is broken!',
    primaryConcept: 'Measurement',
    secondaryConcepts: ['Instruments'],
    learningObjective: 'Choose the correct instrument for measuring temperature.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Select the right tool.',
    successCondition: 'Choose the correct instrument.',
    hint: 'Thermo means heat.',
    feedbackIncorrect: 'That instrument measures something else. Try again!',
    xpReward: 50,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A scientist needs to measure the temperature of a liquid. Which instrument should they use?',
      logicOptions: ['Ruler', 'Thermometer', 'Balance Scale', 'Measuring Cup'],
      logicAnswer: 'Thermometer'
    }
  },
  {
    id: 'sci-1-3',
    domain: 'science',
    stage: 1,
    levelNumber: 3,
    missionTitle: 'THE ICE CHAMBER',
    story: 'The temperature is rising 10 degrees per minute in a chamber, causing ice to melt.',
    primaryConcept: 'States of matter',
    secondaryConcepts: ['Heat', 'Measurement'],
    learningObjective: 'Understand pattern of temperature change.',
    difficulty: 'EASY',
    gameMechanic: 'PatternGame',
    missionObjective: 'Predict the next temperature.',
    successCondition: 'Select the correct temperature.',
    hint: 'Add 10 to the last number.',
    feedbackIncorrect: 'Check the pattern again. It goes up by 10 each time.',
    xpReward: 60,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [0, 10, 20, 30, '?'],
      nextNumberCorrect: 40,
      sequenceOptions: [35, 40, 45, 50]
    }
  },
  {
    id: 'sci-1-4',
    domain: 'science',
    stage: 1,
    levelNumber: 4,
    missionTitle: 'THE INVISIBLE GAS',
    story: 'We are experimenting with air pressure in sealed containers.',
    primaryConcept: 'Gases',
    secondaryConcepts: ['Properties of gases', 'Pressure'],
    learningObjective: 'Understand that gases can be compressed.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine what happens to pushed air.',
    successCondition: 'Select the correct behavior of the gas.',
    hint: 'Gases can be squeezed into smaller spaces.',
    feedbackIncorrect: 'Unlike liquids, gases can be squeezed into smaller spaces.',
    xpReward: 60,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'You push the plunger of a sealed syringe. The air inside gets...',
      logicOptions: ['Bigger', 'Compressed (squeezed smaller)', 'Disappears', 'Turns liquid'],
      logicAnswer: 'Compressed (squeezed smaller)'
    }
  },
  {
    id: 'sci-1-5',
    domain: 'science',
    stage: 1,
    levelNumber: 5,
    missionTitle: 'THE LIGHT PATH',
    story: 'Guide the laser beam using mirrors to activate the sensor.',
    primaryConcept: 'Light',
    secondaryConcepts: ['Reflection'],
    learningObjective: 'Navigate a path based on reflection concepts.',
    difficulty: 'MEDIUM',
    gameMechanic: 'CoordinateGame',
    missionObjective: 'Reach the target avoiding obstacles.',
    successCondition: 'Successfully guide the laser.',
    hint: 'Avoid the obstacle at [1,0].',
    feedbackIncorrect: 'You hit an obstacle or went out of bounds!',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      gridSize: 3,
      startPoint: [0, 0],
      targetPoint: [2, 2],
      obstacles: [[1, 0]]
    }
  },
  {
    id: 'sci-1-6',
    domain: 'science',
    stage: 1,
    levelNumber: 6,
    missionTitle: 'THE SOUND SIGNAL',
    story: 'We are counting sound vibration bounces off walls in the echo chamber.',
    primaryConcept: 'Sound',
    secondaryConcepts: ['Vibration'],
    learningObjective: 'Identify the pattern in sound bounces.',
    difficulty: 'MEDIUM',
    gameMechanic: 'PatternGame',
    missionObjective: 'Find the next number of bounces.',
    successCondition: 'Identify the correct sequence number.',
    hint: 'The numbers are increasing by 1.',
    feedbackIncorrect: 'Just count up by 1!',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [1, 2, 3, '?'],
      nextNumberCorrect: 4,
      sequenceOptions: [3, 4, 5, 6]
    }
  },
  {
    id: 'sci-1-7',
    domain: 'science',
    stage: 1,
    levelNumber: 7,
    missionTitle: 'THE HEAT CHAMBER',
    story: 'Allocate heat units to different materials based on their thermal properties.',
    primaryConcept: 'Heat',
    secondaryConcepts: ['Heat transfer', 'Fractions'],
    learningObjective: 'Distribute units according to fractions.',
    difficulty: 'HARD',
    gameMechanic: 'DragDropGame',
    missionObjective: 'Allocate 12 heat units.',
    successCondition: 'Distribute the correct amount of heat to each material.',
    hint: 'Half of 12 is 6, a third of 12 is 4...',
    feedbackIncorrect: 'Calculate the fractions of 12 for each material!',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      itemsToAllocate: [
        { name: 'Metal (1/2)', requiredRatio: 0.5, totalToDistribute: 12 },
        { name: 'Water (1/3)', requiredRatio: 0.333, totalToDistribute: 12 },
        { name: 'Wood (1/6)', requiredRatio: 0.166, totalToDistribute: 12 }
      ],
      correctAllocation: { 'Metal (1/2)': 6, 'Water (1/3)': 4, 'Wood (1/6)': 2 }
    }
  },
  {
    id: 'sci-1-8',
    domain: 'science',
    stage: 1,
    levelNumber: 8,
    missionTitle: 'THE MAGNETIC LOCK',
    story: 'The lock will only open if you select a magnetic material.',
    primaryConcept: 'Magnetism',
    secondaryConcepts: ['Materials'],
    learningObjective: 'Identify magnetic materials.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Choose the magnetic object.',
    successCondition: 'Select the correct magnetic object.',
    hint: 'Certain metals like iron are magnetic.',
    feedbackIncorrect: 'Only certain metals are attracted to magnets.',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Which of these materials is attracted to a magnet?',
      logicOptions: ['Plastic spoon', 'Iron nail', 'Glass cup', 'Rubber band'],
      logicAnswer: 'Iron nail'
    }
  },
  {
    id: 'sci-1-9',
    domain: 'science',
    stage: 1,
    levelNumber: 9,
    missionTitle: 'THE FORCE TEST',
    story: 'A heavy box needs 15N of net force to move. Calculate the forces.',
    primaryConcept: 'Forces',
    secondaryConcepts: ['Push, pull and friction', 'Equations'],
    learningObjective: 'Calculate net force considering friction.',
    difficulty: 'HARD',
    gameMechanic: 'EquationGame',
    missionObjective: 'Solve for the net force.',
    successCondition: 'Provide the correct net force.',
    hint: 'Subtract 5 from 20.',
    feedbackIncorrect: '20 minus 5 is not that number.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'Force = 20 - X (friction). If X = 5, what is the net Force?',
      variableToSolve: 'Force',
      correctValue: 15,
      equationOptions: [10, 13, 15, 25]
    }
  },
  {
    id: 'sci-1-10',
    domain: 'science',
    stage: 1,
    levelNumber: 10,
    missionTitle: 'THE LABORATORY CRISIS',
    story: 'A massive crisis has struck the lab! Use all your knowledge to stabilize the facility.',
    primaryConcept: 'Comprehensive Stage 1',
    secondaryConcepts: ['States of matter', 'Heat transfer', 'Magnetism'],
    learningObjective: 'Apply concepts of matter, heat, and magnetism.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all 4 phases to stabilize the lab.',
    successCondition: 'Pass all phases.',
    hint: 'Recall everything you learned about matter, heat, and magnets.',
    feedbackIncorrect: 'You failed a phase. Try again!',
    xpReward: 300,
    isBoss: true,
    stageFragmentReward: 'Science Fragment 1',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Steam Leak',
          description: 'Identify the state of matter of the steam.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the correct state of matter.',
          gameData: {
            logicPremise: 'What state of matter is steam from boiling water?',
            logicOptions: ['Solid', 'Liquid', 'Gas', 'Plasma'],
            logicAnswer: 'Gas'
          }
        },
        {
          phaseNumber: 2,
          title: 'Thermal Repair',
          description: 'Choose a good conductor to fix the cooling unit.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the good conductor of heat.',
          gameData: {
            logicPremise: 'Which material is a good conductor of heat?',
            logicOptions: ['Wood', 'Plastic', 'Metal', 'Rubber'],
            logicAnswer: 'Metal'
          }
        },
        {
          phaseNumber: 3,
          title: 'Temperature Spike',
          description: 'Heat is rising in the lab rapidly!',
          gameMechanic: 'PatternGame',
          instruction: 'Predict the next temperature reading.',
          gameData: {
            sequence: [5, 10, 15, '?'],
            nextNumberCorrect: 20,
            sequenceOptions: [18, 19, 20, 25]
          }
        },
        {
          phaseNumber: 4,
          title: 'Magnetic Containment',
          description: 'The magnets are acting up. Why?',
          gameMechanic: 'LogicGame',
          instruction: 'Explain why the magnets repel.',
          gameData: {
            logicPremise: 'A magnet repels another magnet. Why?',
            logicOptions: ['They are different metals', 'Same poles facing each other', 'One is heavier', 'They have no charge'],
            logicAnswer: 'Same poles facing each other'
          }
        }
      ]
    }
  },

  // STAGE 2 — UNDERSTAND (Levels 11-20)
  {
    id: 'sci-2-1',
    domain: 'science',
    stage: 2,
    levelNumber: 11,
    missionTitle: 'THE RUNAWAY ROBOT',
    story: 'A robot is heading toward a wall! Navigate it to safety.',
    primaryConcept: 'Motion',
    secondaryConcepts: ['Navigation', 'Coordinates'],
    learningObjective: 'Navigate a grid avoiding obstacles.',
    difficulty: 'MEDIUM',
    gameMechanic: 'CoordinateGame',
    missionObjective: 'Guide the robot to the target.',
    successCondition: 'Reach the target avoiding obstacles.',
    hint: 'Watch out for the obstacles at [1,1] and [2,0].',
    feedbackIncorrect: 'The robot crashed! Try a different path.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      gridSize: 4,
      startPoint: [0, 0],
      targetPoint: [3, 2],
      obstacles: [[1, 1], [2, 0]]
    }
  },
  {
    id: 'sci-2-2',
    domain: 'science',
    stage: 2,
    levelNumber: 12,
    missionTitle: 'THE FRICTION TRACK',
    story: 'We need to slide the rescue sled quickly. Pick the surface with the least friction.',
    primaryConcept: 'Friction',
    secondaryConcepts: ['Motion', 'Forces'],
    learningObjective: 'Identify the surface with the least friction.',
    difficulty: 'EASY',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Choose the optimal surface for sliding.',
    successCondition: 'Select the surface with the least friction.',
    hint: 'Which surface is the most slippery?',
    feedbackIncorrect: 'That surface has too much friction!',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'Ice', cost: 0, benefit: 9, efficiency: 9 },
        { name: 'Sand', cost: 0, benefit: 3, efficiency: 3 },
        { name: 'Rubber mat', cost: 0, benefit: 1, efficiency: 1 }
      ],
      optimalChoiceName: 'Ice'
    }
  },
  {
    id: 'sci-2-3',
    domain: 'science',
    stage: 2,
    levelNumber: 13,
    missionTitle: 'THE ENERGY CORE',
    story: 'The energy core requires a specific type of energy to function.',
    primaryConcept: 'Energy',
    secondaryConcepts: ['Forms of energy'],
    learningObjective: 'Identify kinetic energy.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the type of energy in a moving object.',
    successCondition: 'Select the correct energy type.',
    hint: 'Energy of motion is called...',
    feedbackIncorrect: 'Kinetic energy is the energy of movement.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A ball rolling down a hill has which type of energy?',
      logicOptions: ['Chemical', 'Kinetic', 'Sound', 'Nuclear'],
      logicAnswer: 'Kinetic'
    }
  },
  {
    id: 'sci-2-4',
    domain: 'science',
    stage: 2,
    levelNumber: 14,
    missionTitle: 'THE CIRCUIT ROOM',
    story: 'The lights are out! We need to fix the electrical circuit.',
    primaryConcept: 'Electricity',
    secondaryConcepts: ['Simple circuits'],
    learningObjective: 'Understand requirements for a functioning circuit.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify what is needed for electricity to flow.',
    successCondition: 'Select the correct components of a circuit.',
    hint: 'Electricity needs a continuous path.',
    feedbackIncorrect: 'A circuit needs a complete, unbroken loop and a power source.',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'What must a circuit have to let electricity flow?',
      logicOptions: ['A battery and a gap', 'A complete loop with a battery', 'Only a wire', 'Two batteries'],
      logicAnswer: 'A complete loop with a battery'
    }
  },
  {
    id: 'sci-2-5',
    domain: 'science',
    stage: 2,
    levelNumber: 15,
    missionTitle: 'THE CONDUCTOR TEST',
    story: 'Sort these 6 materials into Conductors and Insulators to repair the grid.',
    primaryConcept: 'Electricity',
    secondaryConcepts: ['Conductors', 'Insulators'],
    learningObjective: 'Categorize materials as conductors or insulators.',
    difficulty: 'HARD',
    gameMechanic: 'DragDropGame',
    missionObjective: 'Sort 6 items correctly.',
    successCondition: 'Allocate exactly 3 items to each category.',
    hint: 'Metals are usually conductors.',
    feedbackIncorrect: 'Make sure you put 3 items in Conductors and 3 in Insulators!',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      itemsToAllocate: [
        { name: 'Conductors', requiredRatio: 0.5, totalToDistribute: 6 },
        { name: 'Insulators', requiredRatio: 0.5, totalToDistribute: 6 }
      ],
      correctAllocation: { 'Conductors': 3, 'Insulators': 3 }
    }
  },
  {
    id: 'sci-2-6',
    domain: 'science',
    stage: 2,
    levelNumber: 16,
    missionTitle: 'THE DENSITY MYSTERY',
    story: 'We are testing mystery objects in water tanks.',
    primaryConcept: 'Density',
    secondaryConcepts: ['Buoyancy'],
    learningObjective: 'Understand the relationship between density and sinking.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Deduce the object\'s density.',
    successCondition: 'Identify that the object is more dense than water.',
    hint: 'Things that are heavier for their size than water will sink.',
    feedbackIncorrect: 'If it sinks, it is more dense than the liquid it is in.',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'An object sinks in water. What does this tell us about its density compared to water?',
      logicOptions: ['Less dense than water', 'Same density as water', 'More dense than water', 'Has no density'],
      logicAnswer: 'More dense than water'
    }
  },
  {
    id: 'sci-2-7',
    domain: 'science',
    stage: 2,
    levelNumber: 17,
    missionTitle: 'THE CHEMICAL CHANGE',
    story: 'Analyze what happens when paper is burned.',
    primaryConcept: 'Chemical changes',
    secondaryConcepts: ['Physical vs chemical'],
    learningObjective: 'Differentiate between physical and chemical changes.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the type of change.',
    successCondition: 'Select "Chemical".',
    hint: 'Can you turn ash back into paper?',
    feedbackIncorrect: 'When a new substance is formed and it cannot be easily reversed, it is a chemical change.',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Burning paper is a __ change because it cannot be reversed.',
      logicOptions: ['Physical', 'Chemical', 'Magnetic', 'Electrical'],
      logicAnswer: 'Chemical'
    }
  },
  {
    id: 'sci-2-8',
    domain: 'science',
    stage: 2,
    levelNumber: 18,
    missionTitle: 'THE SECRET SOLUTION',
    story: 'Test the pH of the secret solution to find out what it is.',
    primaryConcept: 'Acids and bases',
    secondaryConcepts: ['pH scale'],
    learningObjective: 'Interpret the pH scale.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine properties based on pH.',
    successCondition: 'Identify that pH 2 is a strong acid.',
    hint: 'Lower pH numbers (below 7) are acidic.',
    feedbackIncorrect: 'pH 2 is very low, making it a strong acid.',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Lemon juice has a pH of 2. This means it is...',
      logicOptions: ['Neutral', 'A strong acid', 'A weak base', 'A strong base'],
      logicAnswer: 'A strong acid'
    }
  },
  {
    id: 'sci-2-9',
    domain: 'science',
    stage: 2,
    levelNumber: 19,
    missionTitle: 'THE ENERGY TRANSFER',
    story: 'Map out the energy transformations for different devices.',
    primaryConcept: 'Energy',
    secondaryConcepts: ['Energy transformations'],
    learningObjective: 'Identify how energy changes form.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the output energy of a solar panel.',
    successCondition: 'Select electrical energy.',
    hint: 'Solar panels power our homes.',
    feedbackIncorrect: 'Solar panels turn light from the sun into electricity.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A solar panel converts solar energy into what?',
      logicOptions: ['Heat', 'Sound', 'Electrical energy', 'Kinetic energy'],
      logicAnswer: 'Electrical energy'
    }
  },
  {
    id: 'sci-2-10',
    domain: 'science',
    stage: 2,
    levelNumber: 20,
    missionTitle: 'THE POWER STATION FAILURE',
    story: 'The main power station has completely failed. You must restore it!',
    primaryConcept: 'Comprehensive Stage 2',
    secondaryConcepts: ['Energy', 'Circuits', 'Forces', 'Chemical changes'],
    learningObjective: 'Apply concepts of electricity, energy, and motion.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all 4 phases to restore power.',
    successCondition: 'Pass all phases.',
    hint: 'Remember what makes circuits work and how to calculate speed.',
    feedbackIncorrect: 'You failed a phase. Try again!',
    xpReward: 350,
    isBoss: true,
    stageFragmentReward: 'Science Fragment 2',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Circuit Check',
          description: 'Identify the requirement for electricity to flow.',
          gameMechanic: 'LogicGame',
          instruction: 'Select what makes a circuit work.',
          gameData: {
            logicPremise: 'What makes electricity flow in a circuit?',
            logicOptions: ['A gap', 'A complete loop', 'Only a bulb', 'Friction'],
            logicAnswer: 'A complete loop'
          }
        },
        {
          phaseNumber: 2,
          title: 'Wire Repair',
          description: 'Pick the right material to fix the wire.',
          gameMechanic: 'LogicGame',
          instruction: 'Select a conductor.',
          gameData: {
            logicPremise: 'Which is a conductor?',
            logicOptions: ['Rubber', 'Wood', 'Copper wire', 'Plastic'],
            logicAnswer: 'Copper wire'
          }
        },
        {
          phaseNumber: 3,
          title: 'Battery Depletion',
          description: 'A backup battery died.',
          gameMechanic: 'LogicGame',
          instruction: 'Identify the energy type in a battery.',
          gameData: {
            logicPremise: 'A battery runs out. What type of energy ran out?',
            logicOptions: ['Kinetic', 'Sound', 'Chemical (stored)', 'Nuclear'],
            logicAnswer: 'Chemical (stored)'
          }
        },
        {
          phaseNumber: 4,
          title: 'Generator Speed',
          description: 'Calculate the speed of the turbine.',
          gameMechanic: 'EquationGame',
          instruction: 'Solve for Speed.',
          gameData: {
            equation: 'Speed = Distance / Time. Distance = 60m, Time = 3s. Speed = ?',
            variableToSolve: 'Speed',
            correctValue: 20,
            equationOptions: [15, 18, 20, 30]
          }
        }
      ]
    }
  },

  // STAGE 3 — LIFE & EARTH (Levels 21-30)
  {
    id: 'sci-3-1',
    domain: 'science',
    stage: 3,
    levelNumber: 21,
    missionTitle: 'THE TINY WORLD',
    story: 'Explore the microscopic world of cells.',
    primaryConcept: 'Cells',
    secondaryConcepts: ['Biology'],
    learningObjective: 'Identify the nucleus as the control center of a cell.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the control centre of a cell.',
    successCondition: 'Select the correct organelle.',
    hint: 'It sounds like "new clear us".',
    feedbackIncorrect: 'The nucleus acts as the brain or control centre of the cell.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'What is the control centre of a cell called?',
      logicOptions: ['Cell wall', 'Nucleus', 'Chloroplast', 'Mitochondria'],
      logicAnswer: 'Nucleus'
    }
  },
  {
    id: 'sci-3-2',
    domain: 'science',
    stage: 3,
    levelNumber: 22,
    missionTitle: 'THE HUMAN MACHINE',
    story: 'Investigate how the human body works.',
    primaryConcept: 'Human body',
    secondaryConcepts: ['Body systems'],
    learningObjective: 'Identify the function of the heart.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the organ that pumps blood.',
    successCondition: 'Select the correct organ.',
    hint: 'It beats continuously in your chest.',
    feedbackIncorrect: 'The heart is the muscle responsible for pumping blood.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Which organ pumps blood through the body?',
      logicOptions: ['Lungs', 'Brain', 'Heart', 'Kidney'],
      logicAnswer: 'Heart'
    }
  },
  {
    id: 'sci-3-3',
    domain: 'science',
    stage: 3,
    levelNumber: 23,
    missionTitle: 'THE PLANT POWER LAB',
    story: 'Help plants make their own food.',
    primaryConcept: 'Plants',
    secondaryConcepts: ['Photosynthesis'],
    learningObjective: 'Identify what plants need for photosynthesis.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the missing ingredient for photosynthesis.',
    successCondition: 'Select Carbon dioxide.',
    hint: 'It is a gas that humans breathe out.',
    feedbackIncorrect: 'Plants need sunlight, water, and carbon dioxide.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Plants use sunlight, water and __ to make food.',
      logicOptions: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
      logicAnswer: 'Carbon dioxide'
    }
  },
  {
    id: 'sci-3-4',
    domain: 'science',
    stage: 3,
    levelNumber: 24,
    missionTitle: 'THE FOOD CHAIN',
    story: 'Analyze the impact of a missing species in a food chain.',
    primaryConcept: 'Food chains',
    secondaryConcepts: ['Ecosystems'],
    learningObjective: 'Understand the interconnectedness of food chains.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the consequence of missing rabbits.',
    successCondition: 'Select the correct outcome.',
    hint: 'What eats rabbits? What do rabbits eat?',
    feedbackIncorrect: 'Without rabbits, foxes have no food (so they decrease), and grass is not eaten (so it increases).',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'In a food chain: Grass → Rabbit → Fox. What happens if all rabbits disappear?',
      logicOptions: ['Grass decreases, fox increases', 'Grass increases, fox decreases', 'Nothing changes', 'Fox multiplies rapidly'],
      logicAnswer: 'Grass increases, fox decreases'
    }
  },
  {
    id: 'sci-3-5',
    domain: 'science',
    stage: 3,
    levelNumber: 25,
    missionTitle: 'THE BALANCED ECOSYSTEM',
    story: 'Discover the role of decomposers in our world.',
    primaryConcept: 'Ecosystems',
    secondaryConcepts: ['Decomposers'],
    learningObjective: 'Understand the role of decomposers.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the role of decomposers.',
    successCondition: 'Select the correct function.',
    hint: 'They clean up nature.',
    feedbackIncorrect: 'Decomposers break down dead plants and animals.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'What do decomposers do in an ecosystem?',
      logicOptions: ['Make their own food', 'Hunt other animals', 'Break down dead organisms', 'Produce oxygen only'],
      logicAnswer: 'Break down dead organisms'
    }
  },
  {
    id: 'sci-3-6',
    domain: 'science',
    stage: 3,
    levelNumber: 26,
    missionTitle: 'THE WATER JOURNEY',
    story: 'Track the journey of water through its cycle.',
    primaryConcept: 'Water cycle',
    secondaryConcepts: ['Earth science'],
    learningObjective: 'Identify the process of condensation.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the name of the process.',
    successCondition: 'Select Condensation.',
    hint: 'Look at the word root for "condense".',
    feedbackIncorrect: 'When gas cools and turns back into a liquid, it is called condensation.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Water vapour rises, cools, and turns back into water droplets. This is called...',
      logicOptions: ['Evaporation', 'Condensation', 'Precipitation', 'Transpiration'],
      logicAnswer: 'Condensation'
    }
  },
  {
    id: 'sci-3-7',
    domain: 'science',
    stage: 3,
    levelNumber: 27,
    missionTitle: 'THE WEATHER STATION',
    story: 'Daily temperature is increasing. Predict the next reading.',
    primaryConcept: 'Weather',
    secondaryConcepts: ['Data analysis'],
    learningObjective: 'Predict temperature trends.',
    difficulty: 'EASY',
    gameMechanic: 'PatternGame',
    missionObjective: 'Predict the next temperature.',
    successCondition: 'Select the correct temperature.',
    hint: 'The temperature goes up by 2°C each time.',
    feedbackIncorrect: 'Add 2 to the last number.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [16, 18, 20, 22, '?'],
      nextNumberCorrect: 24,
      sequenceOptions: [22, 23, 24, 26]
    }
  },
  {
    id: 'sci-3-8',
    domain: 'science',
    stage: 3,
    levelNumber: 28,
    missionTitle: 'THE PLANET UNDER PRESSURE',
    story: 'Select the most sustainable energy source for a new city.',
    primaryConcept: 'Natural resources',
    secondaryConcepts: ['Sustainability', 'Energy'],
    learningObjective: 'Identify sustainable energy sources.',
    difficulty: 'MEDIUM',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Choose the most sustainable energy source.',
    successCondition: 'Select Solar Power.',
    hint: 'Which source is renewable?',
    feedbackIncorrect: 'Solar power is a renewable and sustainable resource.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'Solar Power', cost: 100, benefit: 100, efficiency: 9 },
        { name: 'Coal', cost: 50, benefit: 60, efficiency: 3 },
        { name: 'Oil', cost: 60, benefit: 55, efficiency: 2 }
      ],
      optimalChoiceName: 'Solar Power'
    }
  },
  {
    id: 'sci-3-9',
    domain: 'science',
    stage: 3,
    levelNumber: 29,
    missionTitle: 'THE GREEN CITY',
    story: 'Help the city implement policies to protect the environment.',
    primaryConcept: 'Environmental protection',
    secondaryConcepts: ['Pollution'],
    learningObjective: 'Identify actions that reduce plastic pollution.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Choose the action that reduces plastic pollution.',
    successCondition: 'Select the correct action.',
    hint: 'Think about reducing waste at the source.',
    feedbackIncorrect: 'Reducing the use of single-use plastics is the best way to cut down on plastic pollution.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Which action MOST reduces plastic pollution?',
      logicOptions: ['Using more cars', 'Reducing single-use plastic', 'Burning waste', 'Using more water'],
      logicAnswer: 'Reducing single-use plastic'
    }
  },
  {
    id: 'sci-3-10',
    domain: 'science',
    stage: 3,
    levelNumber: 30,
    missionTitle: 'THE ENVIRONMENTAL CRISIS',
    story: 'An ecological disaster is unfolding! Use your knowledge of life and earth sciences to save the region.',
    primaryConcept: 'Comprehensive Stage 3',
    secondaryConcepts: ['Cells', 'Water cycle', 'Sustainability'],
    learningObjective: 'Apply integrated knowledge of earth and life sciences.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all 4 phases to stop the crisis.',
    successCondition: 'Pass all phases.',
    hint: 'Recall facts about plants, the ozone layer, the water cycle, and eco-friendly choices.',
    feedbackIncorrect: 'You failed a phase. Try again!',
    xpReward: 400,
    isBoss: true,
    stageFragmentReward: 'Science Fragment 3',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Plant Rescue',
          description: 'Identify how plants capture sunlight.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the correct organelle.',
          gameData: {
            logicPremise: 'Which part of a plant cell captures sunlight?',
            logicOptions: ['Nucleus', 'Cell wall', 'Chloroplast', 'Vacuole'],
            logicAnswer: 'Chloroplast'
          }
        },
        {
          phaseNumber: 2,
          title: 'Ozone Depletion',
          description: 'Understand the danger of a damaged ozone layer.',
          gameMechanic: 'LogicGame',
          instruction: 'Select what the ozone layer protects us from.',
          gameData: {
            logicPremise: 'What does the ozone layer protect us from?',
            logicOptions: ['Rain', 'UV rays', 'Wind', 'Sound'],
            logicAnswer: 'UV rays'
          }
        },
        {
          phaseNumber: 3,
          title: 'Water Cycle Tracking',
          description: 'Track where evaporated water goes.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the next step in the cycle.',
          gameData: {
            logicPremise: 'In the water cycle, water evaporates from the ocean. Where does it go first?',
            logicOptions: ['Into the ground', 'Into rivers', 'Into the atmosphere', 'Into plants'],
            logicAnswer: 'Into the atmosphere'
          }
        },
        {
          phaseNumber: 4,
          title: 'Sustainable Transport',
          description: 'Choose the best vehicle for evacuation.',
          gameMechanic: 'OptimizationGame',
          instruction: 'Select the most eco-friendly option.',
          gameData: {
            optionsToChoose: [
              { name: 'Electric Bus', cost: 0, benefit: 9, efficiency: 9 },
              { name: 'Petrol Car', cost: 0, benefit: 4, efficiency: 4 },
              { name: 'Diesel Truck', cost: 0, benefit: 2, efficiency: 2 }
            ],
            optimalChoiceName: 'Electric Bus'
          }
        }
      ]
    }
  },

  // STAGE 4 — MASTERY (Levels 31-40)
  {
    id: 'sci-4-1',
    domain: 'science',
    stage: 4,
    levelNumber: 31,
    missionTitle: 'THE UNKNOWN EXPERIMENT',
    story: 'You are designing a new experiment. What is the very first thing you must do?',
    primaryConcept: 'Scientific method',
    secondaryConcepts: ['Experiments'],
    learningObjective: 'Identify the first step of the scientific method.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Choose the first step.',
    successCondition: 'Select "Ask a question".',
    hint: 'Before you can find an answer, you must have a...',
    feedbackIncorrect: 'Every experiment starts with a question.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'The first step of the scientific method is...',
      logicOptions: ['Experiment', 'Draw conclusions', 'Ask a question', 'Record results'],
      logicAnswer: 'Ask a question'
    }
  },
  {
    id: 'sci-4-2',
    domain: 'science',
    stage: 4,
    levelNumber: 32,
    missionTitle: 'THE FAIR TEST',
    story: 'To ensure our results are valid, we must conduct a fair test.',
    primaryConcept: 'Scientific method',
    secondaryConcepts: ['Variables'],
    learningObjective: 'Understand the role of controlled variables.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify what must stay the same.',
    successCondition: 'Select "The controlled variables".',
    hint: 'We "control" these to make the test fair.',
    feedbackIncorrect: 'Controlled variables must remain constant for a fair test.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'In a fair test, what must stay the same?',
      logicOptions: ['The dependent variable', 'The independent variable', 'The controlled variables', 'The conclusion'],
      logicAnswer: 'The controlled variables'
    }
  },
  {
    id: 'sci-4-3',
    domain: 'science',
    stage: 4,
    levelNumber: 33,
    missionTitle: 'THE DATA LAB',
    story: 'Analyze the results from the latest experiment.',
    primaryConcept: 'Data',
    secondaryConcepts: ['Graphs', 'Patterns'],
    learningObjective: 'Identify the pattern in the data.',
    difficulty: 'EASY',
    gameMechanic: 'PatternGame',
    missionObjective: 'Predict the next data point.',
    successCondition: 'Select the correct number.',
    hint: 'The numbers are increasing by 10.',
    feedbackIncorrect: 'Add 10 to the last data point.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [10, 20, 30, 40, '?'],
      nextNumberCorrect: 50,
      sequenceOptions: [45, 50, 55, 60]
    }
  },
  {
    id: 'sci-4-4',
    domain: 'science',
    stage: 4,
    levelNumber: 34,
    missionTitle: 'THE ENERGY NETWORK',
    story: 'Manage the city\'s energy grid using wind turbines.',
    primaryConcept: 'Energy',
    secondaryConcepts: ['Energy transformations'],
    learningObjective: 'Identify the output energy of a wind turbine.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the energy transformation.',
    successCondition: 'Select "Electrical energy".',
    hint: 'Turbines generate this to power homes.',
    feedbackIncorrect: 'Wind turbines convert kinetic wind energy into electrical energy.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A wind turbine converts wind energy into...',
      logicOptions: ['Heat', 'Sound', 'Electrical energy', 'Chemical energy'],
      logicAnswer: 'Electrical energy'
    }
  },
  {
    id: 'sci-4-5',
    domain: 'science',
    stage: 4,
    levelNumber: 35,
    missionTitle: 'THE FORCE CHALLENGE',
    story: 'Balance the forces to keep the structure stable.',
    primaryConcept: 'Forces',
    secondaryConcepts: ['Balanced and unbalanced'],
    learningObjective: 'Calculate the force needed to achieve a net force of 0.',
    difficulty: 'HARD',
    gameMechanic: 'EquationGame',
    missionObjective: 'Solve for the missing force.',
    successCondition: 'Provide the correct value.',
    hint: 'If 30 minus X is 0, what is X?',
    feedbackIncorrect: 'To balance the 30N force, you need an equal and opposite 30N force.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'Net Force = 30 - X. If result is 0 (balanced), X = ?',
      variableToSolve: 'X',
      correctValue: 30,
      equationOptions: [25, 28, 30, 35]
    }
  },
  {
    id: 'sci-4-6',
    domain: 'science',
    stage: 4,
    levelNumber: 36,
    missionTitle: 'THE HUMAN BODY EMERGENCY',
    story: 'A patient is having trouble breathing. Identify the affected system.',
    primaryConcept: 'Biology',
    secondaryConcepts: ['Body systems'],
    learningObjective: 'Identify the respiratory system.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Select the correct body system.',
    successCondition: 'Select "Respiratory".',
    hint: 'Respiration is another word for breathing.',
    feedbackIncorrect: 'The respiratory system includes the lungs and is responsible for breathing.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A person cannot breathe properly. Which system is affected?',
      logicOptions: ['Digestive', 'Nervous', 'Respiratory', 'Circulatory'],
      logicAnswer: 'Respiratory'
    }
  },
  {
    id: 'sci-4-7',
    domain: 'science',
    stage: 4,
    levelNumber: 37,
    missionTitle: 'THE ECOSYSTEM DETECTIVE',
    story: 'Investigate why deforestation is causing less rainfall.',
    primaryConcept: 'Ecosystems',
    secondaryConcepts: ['Cause and effect', 'Water cycle'],
    learningObjective: 'Understand the role of trees in the water cycle.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the cause.',
    successCondition: 'Select the transpiration option.',
    hint: 'Trees release water vapor through a process called transpiration.',
    feedbackIncorrect: 'Trees "sweat" water vapor into the air through transpiration, which contributes to rainfall.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Deforestation causes a decrease in rainfall. Why?',
      logicOptions: ['Trees produce rain directly', 'Trees absorb rainfall', 'Trees release water vapour into air (transpiration)', 'Trees block wind'],
      logicAnswer: 'Trees release water vapour into air (transpiration)'
    }
  },
  {
    id: 'sci-4-8',
    domain: 'science',
    stage: 4,
    levelNumber: 38,
    missionTitle: 'THE CLIMATE CONTROL ROOM',
    story: 'Analyze the gases causing global temperatures to rise.',
    primaryConcept: 'Climate',
    secondaryConcepts: ['Climate change'],
    learningObjective: 'Identify the main greenhouse gas.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the greenhouse gas.',
    successCondition: 'Select "Carbon dioxide".',
    hint: 'It is a gas produced by burning fossil fuels.',
    feedbackIncorrect: 'Carbon dioxide is the main gas contributing to the greenhouse effect.',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Which gas is the main cause of the greenhouse effect?',
      logicOptions: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
      logicAnswer: 'Carbon dioxide'
    }
  },
  {
    id: 'sci-4-9',
    domain: 'science',
    stage: 4,
    levelNumber: 39,
    missionTitle: 'THE SCIENTIST FINAL PUZZLE',
    story: 'Determine the role of temperature in your plant experiment.',
    primaryConcept: 'Scientific method',
    secondaryConcepts: ['Variables'],
    learningObjective: 'Identify the independent variable.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the type of variable.',
    successCondition: 'Select "Independent variable".',
    hint: 'The variable "I" change is the "Independent" variable.',
    feedbackIncorrect: 'The variable that the scientist purposely changes is the independent variable.',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A scientist changes only the temperature in an experiment testing plant growth. Temperature is the...',
      logicOptions: ['Controlled variable', 'Dependent variable', 'Independent variable', 'Conclusion'],
      logicAnswer: 'Independent variable'
    }
  },
  {
    id: 'sci-4-10',
    domain: 'science',
    stage: 4,
    levelNumber: 40,
    missionTitle: 'THE FUTURE CITY CRISIS',
    story: 'The ultimate test! Use all your scientific mastery to save the Future City from complete collapse.',
    primaryConcept: 'Comprehensive Stage 4',
    secondaryConcepts: ['Scientific method', 'Cycles', 'Equations', 'Biodiversity'],
    learningObjective: 'Master integrated science concepts.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all 4 phases to save the city.',
    successCondition: 'Pass all phases.',
    hint: 'Apply your full mastery of science.',
    feedbackIncorrect: 'You failed a phase. Try again!',
    xpReward: 500,
    isBoss: true,
    stageFragmentReward: 'Science Fragment 4',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Method Protocol',
          description: 'Establish the correct scientific protocol.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the correct order.',
          gameData: {
            logicPremise: 'What is the correct order of the scientific method?',
            logicOptions: [
              'Experiment→Question→Hypothesis→Results',
              'Question→Hypothesis→Experiment→Results→Conclusion',
              'Results→Question→Experiment→Hypothesis',
              'Hypothesis→Question→Results→Experiment'
            ],
            logicAnswer: 'Question→Hypothesis→Experiment→Results→Conclusion'
          }
        },
        {
          phaseNumber: 2,
          title: 'Atmospheric Balance',
          description: 'Identify the natural cycle managing CO2.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the correct cycle.',
          gameData: {
            logicPremise: 'A city releases CO2. Plants in a nearby forest absorb it. This is an example of...',
            logicOptions: ['Water cycle', 'Carbon cycle', 'Nitrogen cycle', 'Oxygen cycle'],
            logicAnswer: 'Carbon cycle'
          }
        },
        {
          phaseNumber: 3,
          title: 'Power Output',
          description: 'Calculate the necessary power for the shields.',
          gameMechanic: 'EquationGame',
          instruction: 'Solve for Power.',
          gameData: {
            equation: 'Power = Work / Time. Work = 200J, Time = 4s. Power = ?',
            variableToSolve: 'Power',
            correctValue: 50,
            equationOptions: [40, 45, 50, 60]
          }
        },
        {
          phaseNumber: 4,
          title: 'Urban Ecology',
          description: 'Implement a plan to save local wildlife.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the best action for biodiversity.',
          gameData: {
            logicPremise: 'Which action best protects biodiversity in a city?',
            logicOptions: [
              'Build more roads',
              'Plant native trees and create green corridors',
              'Remove all rivers',
              'Increase building height'
            ],
            logicAnswer: 'Plant native trees and create green corridors'
          }
        }
      ]
    }
  }
];

export const getLevelsByStage = (stage: number) => SCIENCE_LEVELS.filter(l => l.stage === stage);
