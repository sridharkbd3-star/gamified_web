export interface TechGameData {
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
    gameData: TechGameData;
    instruction: string;
  }[];
}

export interface TechLevel {
  id: string; // 'tech-1-1' through 'tech-4-10'
  domain: 'technology';
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
  gameData: TechGameData;
}

export const TECHNOLOGY_LEVELS: TechLevel[] = [
  // STAGE 1
  {
    id: 'tech-1-1',
    domain: 'technology',
    stage: 1,
    levelNumber: 1,
    missionTitle: 'MEET THE MACHINE',
    story: 'A broken computer in the command centre needs identifying its core part to get back online.',
    primaryConcept: 'Computer basics',
    secondaryConcepts: ['Hardware'],
    learningObjective: 'Identify the central processing unit of a computer.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify which part of a computer processes instructions.',
    successCondition: 'Select the CPU.',
    hint: 'It acts like the brain of the computer.',
    feedbackIncorrect: 'Not quite! Think about the "brain" that processes everything.',
    xpReward: 50,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Which part of a computer processes all the instructions?',
      logicOptions: ['Monitor', 'Keyboard', 'CPU (Central Processing Unit)', 'Speaker'],
      logicAnswer: 'CPU (Central Processing Unit)'
    }
  },
  {
    id: 'tech-1-2',
    domain: 'technology',
    stage: 1,
    levelNumber: 2,
    missionTitle: 'THE BINARY LOCK',
    story: 'A high-tech security door is locked with a binary code. Convert it to enter!',
    primaryConcept: 'Binary numbers',
    secondaryConcepts: ['Number Systems'],
    learningObjective: 'Understand how to convert simple binary numbers to decimal.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Translate the binary number 1010 to a decimal number.',
    successCondition: 'Select the correct decimal value.',
    hint: '1010 in binary is: 1×8 + 0×4 + 1×2 + 0×1 = 10.',
    feedbackIncorrect: 'Try using the place values 8, 4, 2, and 1!',
    xpReward: 50,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'The binary number 1010 equals what in decimal?',
      logicOptions: ['8', '10', '12', '14'],
      logicAnswer: '10'
    }
  },
  {
    id: 'tech-1-3',
    domain: 'technology',
    stage: 1,
    levelNumber: 3,
    missionTitle: 'THE LOGIC GATE',
    story: 'The circuits are disconnected. You must understand logic gates to fix them.',
    primaryConcept: 'Logic gates',
    secondaryConcepts: ['AND gate'],
    learningObjective: 'Understand how an AND logic gate functions.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the condition for an AND gate to output 1.',
    successCondition: 'Select the correct condition.',
    hint: 'AND means both conditions must be true.',
    feedbackIncorrect: 'For an AND gate, everything must be true at the same time.',
    xpReward: 60,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'An AND gate gives output 1 only when...',
      logicOptions: ['Both inputs are 1', 'At least one input is 1', 'Both inputs are 0', 'One input is 0'],
      logicAnswer: 'Both inputs are 1'
    }
  },
  {
    id: 'tech-1-4',
    domain: 'technology',
    stage: 1,
    levelNumber: 4,
    missionTitle: 'THE INPUT ROOM',
    story: 'Sort out the equipment room by identifying which devices send signals into the computer.',
    primaryConcept: 'Input/output',
    secondaryConcepts: ['Hardware'],
    learningObjective: 'Distinguish between input and output devices.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Classify the keyboard correctly as input or output.',
    successCondition: 'Identify the keyboard as an input device.',
    hint: 'Does a keyboard send data into the computer or show it to you?',
    feedbackIncorrect: 'A keyboard sends signals IN to the computer.',
    xpReward: 60,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A keyboard is an example of a __ device.',
      logicOptions: ['Output', 'Processing', 'Input', 'Storage'],
      logicAnswer: 'Input'
    }
  },
  {
    id: 'tech-1-5',
    domain: 'technology',
    stage: 1,
    levelNumber: 5,
    missionTitle: 'THE SENSOR LAB',
    story: 'The automatic doors in the lab are malfunctioning. Help identify the right sensor for the job.',
    primaryConcept: 'Sensors',
    secondaryConcepts: ['Automation'],
    learningObjective: 'Understand the application of motion sensors.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the sensor used for an automatic door.',
    successCondition: 'Select the correct sensor type.',
    hint: 'It senses when something is moving.',
    feedbackIncorrect: 'Think about what happens when you walk towards a door - you are moving!',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'An automatic door opens when you walk near it. Which sensor does it use?',
      logicOptions: ['Temperature sensor', 'Motion sensor', 'Light sensor', 'Sound sensor'],
      logicAnswer: 'Motion sensor'
    }
  },
  {
    id: 'tech-1-6',
    domain: 'technology',
    stage: 1,
    levelNumber: 6,
    missionTitle: 'THE FIRST PROGRAM',
    story: 'A little helper robot needs your guidance to navigate around an obstacle.',
    primaryConcept: 'Programming basics',
    secondaryConcepts: ['Coordinates', 'Sequencing'],
    learningObjective: 'Program a basic path to avoid obstacles.',
    difficulty: 'MEDIUM',
    gameMechanic: 'CoordinateGame',
    missionObjective: 'Program the robot to move from the start to the target safely.',
    successCondition: 'Reach the target coordinate without hitting the obstacle.',
    hint: 'Avoid the obstacle at (1, 1).',
    feedbackIncorrect: 'Watch out for the obstacle! Plan your path carefully.',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      gridSize: 3,
      startPoint: [0, 0],
      targetPoint: [2, 2],
      obstacles: [[1, 1]]
    }
  },
  {
    id: 'tech-1-7',
    domain: 'technology',
    stage: 1,
    levelNumber: 7,
    missionTitle: 'THE DECISION ROBOT',
    story: 'The robot is running low on battery. Help it make a smart choice using a condition.',
    primaryConcept: 'Conditions',
    secondaryConcepts: ['IF/ELSE'],
    learningObjective: 'Understand basic IF/ELSE logic statements.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Complete the IF statement for a low battery scenario.',
    successCondition: 'Select the safest conditional action.',
    hint: 'What should you do with an electronic device when its battery is low?',
    feedbackIncorrect: 'If the battery is dying, it needs to be charged!',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'IF the battery is below 20%, the robot should __ ELSE it should continue.',
      logicOptions: ['Shutdown and charge', 'Move faster', 'Turn off sensors', 'Increase speed'],
      logicAnswer: 'Shutdown and charge'
    }
  },
  {
    id: 'tech-1-8',
    domain: 'technology',
    stage: 1,
    levelNumber: 8,
    missionTitle: 'THE REPEAT MACHINE',
    story: 'A factory robot performs the same action over and over. Calculate its total progress!',
    primaryConcept: 'Loops',
    secondaryConcepts: ['Iteration'],
    learningObjective: 'Understand the concept of looping and multiplication.',
    difficulty: 'MEDIUM',
    gameMechanic: 'PatternGame',
    missionObjective: 'Find the final distance after the loop repeats 4 times.',
    successCondition: 'Determine the correct next number in the pattern.',
    hint: 'The pattern increases by 3 each time.',
    feedbackIncorrect: 'Add 3 to the previous number to find the answer.',
    xpReward: 70,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [3, 6, 9, '?'],
      nextNumberCorrect: 12,
      sequenceOptions: [10, 11, 12, 15]
    }
  },
  {
    id: 'tech-1-9',
    domain: 'technology',
    stage: 1,
    levelNumber: 9,
    missionTitle: 'THE BROKEN CODE',
    story: 'Oh no! The calculator program is malfunctioning. Put on your detective hat to find the bug.',
    primaryConcept: 'Debugging',
    secondaryConcepts: ['Data types'],
    learningObjective: 'Identify a common programming error involving strings and numbers.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Figure out why 5 + 3 is resulting in 53.',
    successCondition: 'Identify the string concatenation bug.',
    hint: 'When numbers are treated as words (strings), adding them just sticks them together!',
    feedbackIncorrect: 'The program isn\'t doing math, it\'s just squishing the text together.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A program adds 5+3 but outputs 53 instead of 8. What is the bug?',
      logicOptions: ['Wrong variable name', 'Numbers treated as text (string) instead of numbers', 'Missing loop', 'Wrong sensor'],
      logicAnswer: 'Numbers treated as text (string) instead of numbers'
    }
  },
  {
    id: 'tech-1-10',
    domain: 'technology',
    stage: 1,
    levelNumber: 10,
    missionTitle: 'ROBOT RESCUE',
    story: 'The central systems are failing! Fix the computers, solve the logic gates, and rescue the robot to restore the base.',
    primaryConcept: 'Computer basics',
    secondaryConcepts: ['Loops', 'Logic gates', 'Sequencing'],
    learningObjective: 'Demonstrate mastery of basic computer systems, logic gates, and programming.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all 4 challenges to rescue the robot.',
    successCondition: 'Pass all boss phases.',
    hint: 'Remember what CPU stands for, how OR gates work, and navigate safely.',
    feedbackIncorrect: 'Review the basics of computing and logic before trying again!',
    xpReward: 300,
    isBoss: true,
    stageFragmentReward: 'Technology Fragment 1',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'System check',
          description: 'Identify the core processor.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the correct full form.',
          gameData: {
            logicPremise: 'What does CPU stand for?',
            logicOptions: ['Central Power Unit', 'Central Processing Unit', 'Computer Processing Unit', 'Circuit Power Unit'],
            logicAnswer: 'Central Processing Unit'
          }
        },
        {
          phaseNumber: 2,
          title: 'Logic Fix',
          description: 'Fix the broken logic gate.',
          gameMechanic: 'LogicGame',
          instruction: 'Determine the output of the OR gate.',
          gameData: {
            logicPremise: 'What does an OR gate output when both inputs are 0?',
            logicOptions: ['1', '0', '2', 'Depends'],
            logicAnswer: '0'
          }
        },
        {
          phaseNumber: 3,
          title: 'Rescue Path',
          description: 'Guide the robot past the debris.',
          gameMechanic: 'CoordinateGame',
          instruction: 'Navigate from (0,0) to (2,1).',
          gameData: {
            gridSize: 3,
            startPoint: [0, 0],
            targetPoint: [2, 1],
            obstacles: [[1, 0]]
          }
        },
        {
          phaseNumber: 4,
          title: 'Loop Analysis',
          description: 'Analyze the system loop.',
          gameMechanic: 'LogicGame',
          instruction: 'Identify the type of loop.',
          gameData: {
            logicPremise: 'A loop runs 5 times printing numbers 1,2,3,4,5. What type of loop is this?',
            logicOptions: ['While loop', 'For loop counting 1 to 5', 'If statement', 'Function'],
            logicAnswer: 'For loop counting 1 to 5'
          }
        }
      ]
    }
  },

  // STAGE 2
  {
    id: 'tech-2-1',
    domain: 'technology',
    stage: 2,
    levelNumber: 1,
    missionTitle: 'THE MEMORY CHIP',
    story: 'We need to store a new score on the memory chip, but it already has some data inside.',
    primaryConcept: 'Variables',
    secondaryConcepts: ['Data Storage'],
    learningObjective: 'Understand how variables store and update values.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Determine the final value of the variable.',
    successCondition: 'Select the updated value.',
    hint: 'Start with 10, then add 5 to it.',
    feedbackIncorrect: 'Variables can change! Add 5 to the current score.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A variable stores a value. If score = 10 and we add 5, score becomes...',
      logicOptions: ['5', '10', '15', '50'],
      logicAnswer: '15'
    }
  },
  {
    id: 'tech-2-2',
    domain: 'technology',
    stage: 2,
    levelNumber: 2,
    missionTitle: 'THE SECURITY DOOR',
    story: 'A double-security door requires a valid card AND a correct PIN. Someone is trying to enter...',
    primaryConcept: 'Complex logic',
    secondaryConcepts: ['Boolean logic'],
    learningObjective: 'Evaluate a logical AND statement with mixed true/false conditions.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Decide if the door should open.',
    successCondition: 'Determine that access is denied.',
    hint: 'AND means both things must be correct. If one is wrong, it fails.',
    feedbackIncorrect: 'Because the PIN is wrong, the AND condition is not met.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Access is granted if: (Card = Valid) AND (PIN = Correct). Card is valid but PIN is wrong. Is access granted?',
      logicOptions: ['Yes', 'No', 'Only sometimes', 'Need more info'],
      logicAnswer: 'No'
    }
  },
  {
    id: 'tech-2-3',
    domain: 'technology',
    stage: 2,
    levelNumber: 3,
    missionTitle: 'THE ROBOT FACTORY',
    story: 'A highly efficient robot factory doubles its production each cycle. Predict its next output!',
    primaryConcept: 'Iteration',
    secondaryConcepts: ['Algorithms'],
    learningObjective: 'Recognize an exponential sequence pattern.',
    difficulty: 'MEDIUM',
    gameMechanic: 'PatternGame',
    missionObjective: 'Find the next number in the doubling sequence.',
    successCondition: 'Identify the next value in the pattern.',
    hint: 'Multiply the previous number by 2.',
    feedbackIncorrect: 'Double the number 8 to find the answer.',
    xpReward: 80,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [1, 2, 4, 8, '?'],
      nextNumberCorrect: 16,
      sequenceOptions: [12, 14, 16, 20]
    }
  },
  {
    id: 'tech-2-4',
    domain: 'technology',
    stage: 2,
    levelNumber: 4,
    missionTitle: 'THE COMMAND CENTER',
    story: 'You created a special points function for the arcade machines, but it needs to calculate total points.',
    primaryConcept: 'Functions',
    secondaryConcepts: ['Arithmetic'],
    learningObjective: 'Understand how calling a function multiple times repeats an operation.',
    difficulty: 'MEDIUM',
    gameMechanic: 'EquationGame',
    missionObjective: 'Solve the equation for calling the function 3 times.',
    successCondition: 'Calculate the total points added.',
    hint: 'Multiply 3 by 10.',
    feedbackIncorrect: 'If you get 10 points 3 times, how much is that in total?',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'Total = 3 × 10',
      correctValue: 30,
      equationOptions: [10, 20, 30, 33]
    }
  },
  {
    id: 'tech-2-5',
    domain: 'technology',
    stage: 2,
    levelNumber: 5,
    missionTitle: 'THE DATA VAULT',
    story: 'The data vault stores information in different boxes depending on what kind of data it is.',
    primaryConcept: 'Data',
    secondaryConcepts: ['Data Types'],
    learningObjective: 'Identify the Boolean data type.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify which data type can only be True or False.',
    successCondition: 'Select Boolean.',
    hint: 'It is named after George Boole, who invented this kind of logic.',
    feedbackIncorrect: 'Strings are words, Integers are whole numbers. Try again!',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Which data type stores the value True or False?',
      logicOptions: ['Integer', 'String', 'Boolean', 'Float'],
      logicAnswer: 'Boolean'
    }
  },
  {
    id: 'tech-2-6',
    domain: 'technology',
    stage: 2,
    levelNumber: 6,
    missionTitle: 'THE SMART SENSOR',
    story: 'The factory temperature is rising! The safety systems rely on your sensor programming.',
    primaryConcept: 'Sensors',
    secondaryConcepts: ['Conditions'],
    learningObjective: 'Apply condition logic to sensor readings.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Decide if the alarm should trigger based on the temperature reading.',
    successCondition: 'Correctly evaluate the threshold condition.',
    hint: '45°C is greater than 40°C.',
    feedbackIncorrect: 'If the threshold is 40 and the reading is 45, it is too hot!',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A temperature sensor reads 45°C. The alarm triggers above 40°C. Should the alarm sound?',
      logicOptions: ['No, temperature is fine', 'Yes, it exceeds the threshold', 'Only if confirmed twice', 'Only at night'],
      logicAnswer: 'Yes, it exceeds the threshold'
    }
  },
  {
    id: 'tech-2-7',
    domain: 'technology',
    stage: 2,
    levelNumber: 7,
    missionTitle: 'THE CONNECTED CITY',
    story: 'Information needs to travel across the city network, but it needs someone to point it in the right direction.',
    primaryConcept: 'Networking',
    secondaryConcepts: ['Hardware'],
    learningObjective: 'Understand the basic function of a network router.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the role of a router in a network.',
    successCondition: 'Select the correct function of a router.',
    hint: 'Think about the name: a router gives things a ROUTE to follow.',
    feedbackIncorrect: 'A router acts like a traffic cop for data on the internet.',
    xpReward: 90,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'What does a router do in a network?',
      logicOptions: ['Stores data permanently', 'Directs data packets to their destination', 'Converts analog to digital', 'Encrypts all data'],
      logicAnswer: 'Directs data packets to their destination'
    }
  },
  {
    id: 'tech-2-8',
    domain: 'technology',
    stage: 2,
    levelNumber: 8,
    missionTitle: 'THE CYBER LOCK',
    story: 'Hackers are trying to guess passwords! Help the citizens choose the strongest lock.',
    primaryConcept: 'Cybersecurity basics',
    secondaryConcepts: ['Passwords'],
    learningObjective: 'Identify the characteristics of a strong, secure password.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Choose the most secure password from the options.',
    successCondition: 'Select the password with mixed characters.',
    hint: 'A strong password uses uppercase, lowercase, numbers, and special symbols.',
    feedbackIncorrect: 'Avoid common words and simple sequences. Look for random characters!',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Which password is MOST secure?',
      logicOptions: ['password123', 'myname2010', 'Xk!9#mP2', '12345678'],
      logicAnswer: 'Xk!9#mP2'
    }
  },
  {
    id: 'tech-2-9',
    domain: 'technology',
    stage: 2,
    levelNumber: 9,
    missionTitle: 'THE AUTO FACTORY',
    story: 'You have a budget to buy a new automation robot. Which one gets the most work done efficiently?',
    primaryConcept: 'Automation',
    secondaryConcepts: ['Optimization'],
    learningObjective: 'Evaluate and optimize choices based on cost and efficiency metrics.',
    difficulty: 'HARD',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Select the most efficient robot for the factory.',
    successCondition: 'Choose the optimal robot.',
    hint: 'Look for the one with the highest benefit and efficiency for the same cost.',
    feedbackIncorrect: 'Compare the efficiency ratings to find the best choice!',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'Robot A', cost: 100, benefit: 100, efficiency: 8 },
        { name: 'Robot B', cost: 100, benefit: 70, efficiency: 5 },
        { name: 'Robot C', cost: 100, benefit: 50, efficiency: 3 }
      ],
      optimalChoiceName: 'Robot A'
    }
  },
  {
    id: 'tech-2-10',
    domain: 'technology',
    stage: 2,
    levelNumber: 10,
    missionTitle: 'AUTONOMOUS RESCUE SYSTEM',
    story: 'A massive fire broke out in the automated sector! Use variables, complex logic, and precise navigation to deploy the rescue systems.',
    primaryConcept: 'Integrated logic',
    secondaryConcepts: ['Variables', 'Automation', 'Boolean logic'],
    learningObjective: 'Demonstrate understanding of variables, nested logic, and spatial navigation.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all 4 challenges to extinguish the fire.',
    successCondition: 'Pass all boss phases.',
    hint: 'Carefully read the logic statements and double-check your math.',
    feedbackIncorrect: 'Review variables and complex logic before trying again!',
    xpReward: 350,
    isBoss: true,
    stageFragmentReward: 'Technology Fragment 2',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Score Update',
          description: 'Calculate the new variable value.',
          gameMechanic: 'LogicGame',
          instruction: 'Find the final score.',
          gameData: {
            logicPremise: 'score = 50. We run: score = score + 25. New value?',
            logicOptions: ['25', '50', '75', '100'],
            logicAnswer: '75'
          }
        },
        {
          phaseNumber: 2,
          title: 'Sprinkler Logic',
          description: 'Evaluate the fire safety logic.',
          gameMechanic: 'LogicGame',
          instruction: 'Does the sprinkler activate?',
          gameData: {
            logicPremise: 'If (fire_detected = True) AND (sprinkler_on = False): Activate sprinkler. Fire detected but sprinkler is already on. Does it activate again?',
            logicOptions: ['Yes', 'No', 'Always activates', 'Depends on fire size'],
            logicAnswer: 'No'
          }
        },
        {
          phaseNumber: 3,
          title: 'Rescue Drone',
          description: 'Navigate the rescue drone through the smoke.',
          gameMechanic: 'CoordinateGame',
          instruction: 'Guide drone from (0,0) to (3,2).',
          gameData: {
            gridSize: 4,
            startPoint: [0, 0],
            targetPoint: [3, 2],
            obstacles: [[1, 1], [2, 0]]
          }
        },
        {
          phaseNumber: 4,
          title: 'Factory Output',
          description: 'Calculate the drone production rate.',
          gameMechanic: 'EquationGame',
          instruction: 'Solve for the total boxes packed.',
          gameData: {
            equation: 'Boxes = 20 × 5',
            correctValue: 100,
            equationOptions: [50, 75, 100, 120]
          }
        }
      ]
    }
  },

  // STAGE 3
  {
    id: 'tech-3-1',
    domain: 'technology',
    stage: 3,
    levelNumber: 1,
    missionTitle: 'THE ALGORITHM PATH',
    story: 'We need to write down exactly how the robot should make a sandwich, step by step.',
    primaryConcept: 'Algorithms',
    secondaryConcepts: ['Problem Solving'],
    learningObjective: 'Define what an algorithm is in computer science.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the correct definition of an algorithm.',
    successCondition: 'Select the definition describing a step-by-step process.',
    hint: 'It is like a recipe for a computer to follow.',
    feedbackIncorrect: 'An algorithm is a set of instructions, not a physical object.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'What is an algorithm?',
      logicOptions: ['A type of computer', 'A step-by-step set of instructions to solve a problem', 'A hardware component', 'A type of data'],
      logicAnswer: 'A step-by-step set of instructions to solve a problem'
    }
  },
  {
    id: 'tech-3-2',
    domain: 'technology',
    stage: 3,
    levelNumber: 2,
    missionTitle: 'THE DATA DETECTIVE',
    story: 'Database pressure readings are steadily dropping over time. Predict the next reading to avoid a failure!',
    primaryConcept: 'Data processing',
    secondaryConcepts: ['Sequencing'],
    learningObjective: 'Identify a decreasing numerical pattern representing data.',
    difficulty: 'MEDIUM',
    gameMechanic: 'PatternGame',
    missionObjective: 'Predict the next database reading in the pattern.',
    successCondition: 'Determine the correct next number.',
    hint: 'The numbers are decreasing by 10 each time.',
    feedbackIncorrect: 'Subtract 10 from 70 to find the answer.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [100, 90, 80, 70, '?'],
      nextNumberCorrect: 60,
      sequenceOptions: [55, 60, 65, 70]
    }
  },
  {
    id: 'tech-3-3',
    domain: 'technology',
    stage: 3,
    levelNumber: 3,
    missionTitle: 'THE LEARNING MACHINE',
    story: 'The new computer was shown thousands of pictures of cats, and now it knows what a cat looks like!',
    primaryConcept: 'AI basics',
    secondaryConcepts: ['Machine Learning'],
    learningObjective: 'Understand the basic concept of machine learning.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the technology used when a computer learns from data.',
    successCondition: 'Select Machine Learning.',
    hint: 'The computer is "learning" from the pictures, like a machine!',
    feedbackIncorrect: 'When an AI is trained on lots of data, it is called Machine Learning.',
    xpReward: 100,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'An AI has seen 1000 pictures of cats and learned to recognize them. This is called...',
      logicOptions: ['Programming', 'Machine learning', 'Hacking', 'Automation'],
      logicAnswer: 'Machine learning'
    }
  },
  {
    id: 'tech-3-4',
    domain: 'technology',
    stage: 3,
    levelNumber: 4,
    missionTitle: 'THE VISION SYSTEM',
    story: 'Self-driving cars need to "see" the world around them using cameras and software.',
    primaryConcept: 'Computer vision',
    secondaryConcepts: ['AI'],
    learningObjective: 'Identify computer vision as the technology that lets machines interpret images.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the technology used by cars to detect pedestrians.',
    successCondition: 'Select Computer vision.',
    hint: 'It gives the computer a sense of "vision".',
    feedbackIncorrect: 'Cameras provide the image, and "Computer vision" processes what it sees.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A self-driving car uses cameras to detect pedestrians. This is an example of...',
      logicOptions: ['GPS navigation', 'Computer vision', 'Sound processing', 'Manual control'],
      logicAnswer: 'Computer vision'
    }
  },
  {
    id: 'tech-3-5',
    domain: 'technology',
    stage: 3,
    levelNumber: 5,
    missionTitle: 'THE VOICE ASSISTANT',
    story: 'When you ask a smart speaker for the weather, it has to translate your voice into text it can understand.',
    primaryConcept: 'Speech technology',
    secondaryConcepts: ['AI'],
    learningObjective: 'Understand the role of speech-to-text technology.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the process of converting voice to text.',
    successCondition: 'Select Speech-to-text.',
    hint: 'It is literally changing speech into text.',
    feedbackIncorrect: 'Turning voice into words is called Speech-to-text or Speech recognition.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A voice assistant listens to your words and converts them to text. This is called...',
      logicOptions: ['Image recognition', 'Speech-to-text (speech recognition)', 'Encryption', 'Binary coding'],
      logicAnswer: 'Speech-to-text (speech recognition)'
    }
  },
  {
    id: 'tech-3-6',
    domain: 'technology',
    stage: 3,
    levelNumber: 6,
    missionTitle: 'THE SMART HOME',
    story: 'Your fridge, toaster, and lights are all connected to the internet. Welcome to the future!',
    primaryConcept: 'IoT',
    secondaryConcepts: ['Networking'],
    learningObjective: 'Define the acronym IoT.',
    difficulty: 'EASY',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify what IoT stands for.',
    successCondition: 'Select Internet of Things.',
    hint: 'It connects everyday "Things" to the internet.',
    feedbackIncorrect: 'IoT means putting everyday Things on the Internet.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'What does IoT stand for?',
      logicOptions: ['Internet of Technology', 'Internet of Things', 'Input Output Terminal', 'Integrated Online Terminal'],
      logicAnswer: 'Internet of Things'
    }
  },
  {
    id: 'tech-3-7',
    domain: 'technology',
    stage: 3,
    levelNumber: 7,
    missionTitle: 'THE CYBER DEFENSE',
    story: 'Someone sent a tricky email trying to steal passwords. Help identify this type of attack!',
    primaryConcept: 'Cybersecurity',
    secondaryConcepts: ['Social Engineering'],
    learningObjective: 'Identify a phishing attack.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Name the attack where fake emails are used to steal information.',
    successCondition: 'Select Phishing.',
    hint: 'They are "fishing" for your information using a fake bait.',
    feedbackIncorrect: 'This common email scam is called Phishing.',
    xpReward: 110,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A hacker sends a fake email pretending to be your bank. This attack is called...',
      logicOptions: ['Malware', 'Firewall', 'Phishing', 'Encryption'],
      logicAnswer: 'Phishing'
    }
  },
  {
    id: 'tech-3-8',
    domain: 'technology',
    stage: 3,
    levelNumber: 8,
    missionTitle: 'THE CLOUD NETWORK',
    story: 'You saved a photo on your computer and opened it on your tablet. Where did it go in between?',
    primaryConcept: 'Cloud computing',
    secondaryConcepts: ['Data Storage'],
    learningObjective: 'Understand the concept of cloud storage.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the technology that allows accessing files from anywhere.',
    successCondition: 'Select Cloud storage.',
    hint: 'It\'s stored on the internet, often referred to as a fluffy thing in the sky.',
    feedbackIncorrect: 'Saving files on the internet is known as Cloud storage.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'You save a file on Google Drive and access it from your phone. This is an example of...',
      logicOptions: ['Local storage', 'USB storage', 'Cloud storage', 'RAM storage'],
      logicAnswer: 'Cloud storage'
    }
  },
  {
    id: 'tech-3-9',
    domain: 'technology',
    stage: 3,
    levelNumber: 9,
    missionTitle: 'THE INTELLIGENT SYSTEM',
    story: 'We are designing a new chatbot for the school. Which AI system provides the best smart responses?',
    primaryConcept: 'AI decision making',
    secondaryConcepts: ['Optimization'],
    learningObjective: 'Evaluate different AI models based on efficiency and benefit.',
    difficulty: 'HARD',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Select the most optimal AI system.',
    successCondition: 'Choose the Machine Learning AI.',
    hint: 'Pick the option with the highest benefit and efficiency.',
    feedbackIncorrect: 'Machine Learning offers the highest capabilities here.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'Rule-based AI', cost: 0, benefit: 5, efficiency: 5 },
        { name: 'Machine Learning AI', cost: 0, benefit: 9, efficiency: 9 },
        { name: 'Random Guessing', cost: 0, benefit: 1, efficiency: 1 }
      ],
      optimalChoiceName: 'Machine Learning AI'
    }
  },
  {
    id: 'tech-3-10',
    domain: 'technology',
    stage: 3,
    levelNumber: 10,
    missionTitle: 'DIGITAL CITY CRISIS',
    story: 'A massive glitch has hit the digital city! Use algorithms, AI knowledge, navigation, and cybersecurity to restore order.',
    primaryConcept: 'Advanced computing',
    secondaryConcepts: ['Algorithms', 'AI', 'Cybersecurity'],
    learningObjective: 'Demonstrate mastery of algorithms, AI concepts, and cybersecurity principles.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete all 4 challenges to save the digital city.',
    successCondition: 'Pass all boss phases.',
    hint: 'Think through step-by-step processes and how AI handles new data.',
    feedbackIncorrect: 'Review the fundamentals of AI, algorithms, and security!',
    xpReward: 400,
    isBoss: true,
    stageFragmentReward: 'Technology Fragment 3',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Safe Path Algorithm',
          description: 'Sort the steps to cross the road.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the correct step-by-step algorithm.',
          gameData: {
            logicPremise: 'Sort these steps in order: [Run, Start, Stop, Check]. What is a correct algorithm to cross a road safely?',
            logicOptions: ['Run→Check→Stop→Start', 'Look both ways→Wait for clear→Walk across→Stop at other side', 'Stop→Run→Check→Start', 'Walk→Look→Stop→Run'],
            logicAnswer: 'Look both ways→Wait for clear→Walk across→Stop at other side'
          }
        },
        {
          phaseNumber: 2,
          title: 'AI Testing',
          description: 'Evaluate the AI\'s performance on new images.',
          gameMechanic: 'LogicGame',
          instruction: 'Identify the AI testing concept.',
          gameData: {
            logicPremise: 'An AI is trained with 10,000 images of dogs. It is then tested on new dog images it has never seen. This tests the AI\'s...',
            logicOptions: ['Training accuracy', 'Generalization (ability to recognize new data)', 'Memory storage', 'Battery life'],
            logicAnswer: 'Generalization (ability to recognize new data)'
          }
        },
        {
          phaseNumber: 3,
          title: 'Cyber Drone',
          description: 'Navigate the drone around corrupted sectors.',
          gameMechanic: 'CoordinateGame',
          instruction: 'Guide drone from (0,0) to (3,3).',
          gameData: {
            gridSize: 4,
            startPoint: [0, 0],
            targetPoint: [3, 3],
            obstacles: [[1, 2], [2, 1]]
          }
        },
        {
          phaseNumber: 4,
          title: 'Data Protection',
          description: 'Secure the city\'s data files.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the data scrambling method.',
          gameData: {
            logicPremise: 'Which cybersecurity measure protects data by scrambling it?',
            logicOptions: ['Phishing', 'Firewall', 'Encryption', 'Virus'],
            logicAnswer: 'Encryption'
          }
        }
      ]
    }
  },

  // STAGE 4
  {
    id: 'tech-4-1',
    domain: 'technology',
    stage: 4,
    levelNumber: 1,
    missionTitle: 'THE MASTER ALGORITHM',
    story: 'We have a huge phonebook and need to find a name quickly. We will use a famous search algorithm!',
    primaryConcept: 'Integrated algorithms',
    secondaryConcepts: ['Searching'],
    learningObjective: 'Understand how a binary search algorithm works.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the process used in a binary search.',
    successCondition: 'Select the method that divides the list in half.',
    hint: 'Binary means two. It splits the remaining list into two halves each time.',
    feedbackIncorrect: 'Binary search splits the sorted list in half to find things incredibly fast.',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Binary search finds a value in a sorted list. It works by...',
      logicOptions: ['Checking every item one by one', 'Dividing the list in half repeatedly', 'Sorting the list randomly', 'Starting from the end'],
      logicAnswer: 'Dividing the list in half repeatedly'
    }
  },
  {
    id: 'tech-4-2',
    domain: 'technology',
    stage: 4,
    levelNumber: 2,
    missionTitle: 'THE DATA CRISIS',
    story: 'Data packets are being lost during a massive download, halving in size each second. Find the pattern!',
    primaryConcept: 'Large-scale data',
    secondaryConcepts: ['Sequencing', 'Binary'],
    learningObjective: 'Recognize a decreasing powers-of-two sequence.',
    difficulty: 'HARD',
    gameMechanic: 'PatternGame',
    missionObjective: 'Determine the next number of data packets.',
    successCondition: 'Identify the next value in the halving sequence.',
    hint: 'Divide the previous number by 2.',
    feedbackIncorrect: 'Half of 32 is your answer!',
    xpReward: 120,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      sequence: [256, 128, 64, 32, '?'],
      nextNumberCorrect: 16,
      sequenceOptions: [8, 16, 24, 32]
    }
  },
  {
    id: 'tech-4-3',
    domain: 'technology',
    stage: 4,
    levelNumber: 3,
    missionTitle: 'THE AI DETECTIVE',
    story: 'Your email inbox automatically hides junk mail. What kind of AI task is this?',
    primaryConcept: 'AI classification',
    secondaryConcepts: ['Machine Learning'],
    learningObjective: 'Identify binary classification as sorting data into two distinct categories.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Name the AI process used for spam filtering.',
    successCondition: 'Select Binary classification.',
    hint: 'It is sorting emails into exactly TWO groups.',
    feedbackIncorrect: 'Because there are two choices (spam or not), it is binary classification.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'An AI classifies emails as SPAM or NOT SPAM. This is an example of...',
      logicOptions: ['Data storage', 'Binary classification', 'Cloud computing', 'Encryption'],
      logicAnswer: 'Binary classification'
    }
  },
  {
    id: 'tech-4-4',
    domain: 'technology',
    stage: 4,
    levelNumber: 4,
    missionTitle: 'THE SMART FACTORY',
    story: 'We need to meet a huge shipping order! Calculate how long it will take our robots to pack the boxes.',
    primaryConcept: 'Automation',
    secondaryConcepts: ['Mathematics', 'Equations'],
    learningObjective: 'Solve an equation related to parallel automated work rates.',
    difficulty: 'HARD',
    gameMechanic: 'EquationGame',
    missionObjective: 'Calculate the total hours needed for the robots to finish packing.',
    successCondition: 'Solve the time calculation correctly.',
    hint: 'First find out how many boxes 3 robots pack in 1 hour (3 × 50 = 150).',
    feedbackIncorrect: 'Divide 300 by the combined rate of 150 boxes per hour.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      equation: 'If 1 robot packs 50 boxes/hour, how many hours for 3 robots to pack 300 boxes? Hours = 300 / (3 × 50)',
      correctValue: 2,
      equationOptions: [1, 2, 3, 5]
    }
  },
  {
    id: 'tech-4-5',
    domain: 'technology',
    stage: 4,
    levelNumber: 5,
    missionTitle: 'THE CONNECTED WORLD',
    story: 'Imagine waking up and finding fresh milk delivered because your fridge ordered it. Magic? No, technology!',
    primaryConcept: 'IoT systems',
    secondaryConcepts: ['Automation'],
    learningObjective: 'Identify IoT as the enabler for complex smart home automation.',
    difficulty: 'MEDIUM',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify the technology that allows devices to act automatically over the internet.',
    successCondition: 'Select IoT with automated ordering.',
    hint: 'The fridge is a "Thing" connected to the "Internet".',
    feedbackIncorrect: 'This uses the Internet of Things (IoT) to place the order automatically.',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'A smart fridge detects low milk and automatically orders more. Which technology makes this possible?',
      logicOptions: ['Manual programming only', 'IoT with automated ordering', 'Basic sensors only', 'Cloud backup'],
      logicAnswer: 'IoT with automated ordering'
    }
  },
  {
    id: 'tech-4-6',
    domain: 'technology',
    stage: 4,
    levelNumber: 6,
    missionTitle: 'THE DIGITAL FORTRESS',
    story: 'A dangerous ransomware virus is spreading, threatening to lock everyone\'s files! Prepare our best defense.',
    primaryConcept: 'Cybersecurity',
    secondaryConcepts: ['System Defense'],
    learningObjective: 'Identify the most effective strategy against data-locking attacks.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Choose the best defense against ransomware.',
    successCondition: 'Select backups and antivirus.',
    hint: 'If they lock your current files, what would you need to restore them?',
    feedbackIncorrect: 'Backing up your data means you won\'t lose it if it gets locked!',
    xpReward: 130,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: 'Which is the BEST defense against ransomware attacks?',
      logicOptions: ['Using the same password everywhere', 'Regular data backups and strong antivirus', 'Ignoring suspicious emails', 'Turning off the firewall'],
      logicAnswer: 'Regular data backups and strong antivirus'
    }
  },
  {
    id: 'tech-4-7',
    domain: 'technology',
    stage: 4,
    levelNumber: 7,
    missionTitle: 'THE INTELLIGENT ROBOT',
    story: 'Navigate the highly advanced AI robot through a complex and dangerous testing facility.',
    primaryConcept: 'AI + robotics',
    secondaryConcepts: ['Navigation', 'Coordinates'],
    learningObjective: 'Program a complex path avoiding multiple hazards.',
    difficulty: 'HARD',
    gameMechanic: 'CoordinateGame',
    missionObjective: 'Guide the AI robot safely to the end of the facility.',
    successCondition: 'Reach the target avoiding all obstacles.',
    hint: 'Take your time and map out a route around the three hazards.',
    feedbackIncorrect: 'Watch out for the obstacles! Plan a step-by-step route.',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      gridSize: 4,
      startPoint: [0, 0],
      targetPoint: [3, 3],
      obstacles: [[0, 2], [2, 2], [1, 3]]
    }
  },
  {
    id: 'tech-4-8',
    domain: 'technology',
    stage: 4,
    levelNumber: 8,
    missionTitle: 'THE FUTURE NETWORK',
    story: 'Phones keep getting faster internet speeds. How does the new 5G network manage to send data so quickly?',
    primaryConcept: 'Integrated networks',
    secondaryConcepts: ['Communication'],
    learningObjective: 'Understand the basic physical difference that enables faster wireless networks.',
    difficulty: 'HARD',
    gameMechanic: 'LogicGame',
    missionObjective: 'Identify why 5G is faster than older networks.',
    successCondition: 'Select Higher frequency radio waves.',
    hint: 'Higher frequencies can carry more information in the same amount of time.',
    feedbackIncorrect: '5G uses much higher frequency radio waves to transmit data faster.',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      logicPremise: '5G networks are faster than 4G because they use...',
      logicOptions: ['Longer radio waves', 'Higher frequency radio waves', 'Bluetooth signals only', 'Fibre optic cables in phones'],
      logicAnswer: 'Higher frequency radio waves'
    }
  },
  {
    id: 'tech-4-9',
    domain: 'technology',
    stage: 4,
    levelNumber: 9,
    missionTitle: 'THE DIGITAL COMMAND CENTER',
    story: 'You are tasked with designing the ultimate smart city infrastructure. Choose the best combination of technologies.',
    primaryConcept: 'Integrated systems',
    secondaryConcepts: ['System Design'],
    learningObjective: 'Evaluate and select the most advanced and comprehensive system integration.',
    difficulty: 'HARD',
    gameMechanic: 'OptimizationGame',
    missionObjective: 'Select the most effective system design for a modern smart city.',
    successCondition: 'Choose the integrated AI + IoT + Cloud option.',
    hint: 'Combining all three major technologies gives the best result.',
    feedbackIncorrect: 'Look for the option that combines multiple advanced technologies for maximum benefit.',
    xpReward: 140,
    isBoss: false,
    stageFragmentReward: null,
    gameData: {
      optionsToChoose: [
        { name: 'AI + IoT + Cloud', cost: 0, benefit: 10, efficiency: 10 },
        { name: 'Manual + Basic sensors', cost: 0, benefit: 4, efficiency: 4 },
        { name: 'AI only', cost: 0, benefit: 7, efficiency: 7 }
      ],
      optimalChoiceName: 'AI + IoT + Cloud'
    }
  },
  {
    id: 'tech-4-10',
    domain: 'technology',
    stage: 4,
    levelNumber: 10,
    missionTitle: 'THE DIGITAL FUTURE CRISIS',
    story: 'The ultimate digital challenge! A rogue system is threatening the smart city. Combine everything you know about algorithms, IoT, navigation, and cybersecurity to save the future!',
    primaryConcept: 'Mastery of Technology',
    secondaryConcepts: ['Algorithms', 'IoT', 'Cybersecurity', 'Navigation'],
    learningObjective: 'Demonstrate total mastery of complex technological concepts and problem-solving.',
    difficulty: 'HARD',
    gameMechanic: 'BossGame',
    missionObjective: 'Complete the final 4 challenges to become a Technology Hero.',
    successCondition: 'Pass all final boss phases.',
    hint: 'Think carefully about sorting, system backups, and strong layered security.',
    feedbackIncorrect: 'You are so close! Review your advanced concepts and try again!',
    xpReward: 500,
    isBoss: true,
    stageFragmentReward: 'Technology Fragment 4',
    gameData: {
      phases: [
        {
          phaseNumber: 1,
          title: 'Sorting Algorithm',
          description: 'Fix the chaotic data stream.',
          gameMechanic: 'LogicGame',
          instruction: 'Identify the smallest number in the set.',
          gameData: {
            logicPremise: 'A sorting algorithm arranges numbers from smallest to largest. Arrange: [5, 2, 8, 1]. What comes first?',
            logicOptions: ['5', '2', '8', '1'],
            logicAnswer: '1'
          }
        },
        {
          phaseNumber: 2,
          title: 'IoT Backup',
          description: 'Establish a backup for the failed smart traffic system.',
          gameMechanic: 'LogicGame',
          instruction: 'Select the safest backup plan.',
          gameData: {
            logicPremise: 'A smart city uses IoT sensors to manage traffic lights. If all sensors fail simultaneously, what is the BEST backup plan?',
            logicOptions: ['Turn off all lights', 'Switch to manual traffic control', 'Remove all traffic lights', 'Use AI only'],
            logicAnswer: 'Switch to manual traffic control'
          }
        },
        {
          phaseNumber: 3,
          title: 'Master Navigation',
          description: 'Bypass the corrupted sectors of the city core.',
          gameMechanic: 'CoordinateGame',
          instruction: 'Navigate perfectly from (0,0) to (3,2).',
          gameData: {
            gridSize: 4,
            startPoint: [0, 0],
            targetPoint: [3, 2],
            obstacles: [[1, 0], [2, 2], [0, 2]]
          }
        },
        {
          phaseNumber: 4,
          title: 'Ultimate Defense',
          description: 'Secure the national database against future attacks.',
          gameMechanic: 'LogicGame',
          instruction: 'Choose the most comprehensive security setup.',
          gameData: {
            logicPremise: 'Which combination gives the BEST cybersecurity for a national database?',
            logicOptions: ['One strong password', 'Encryption + multi-factor authentication + regular backups', 'Public access + no firewall', 'Firewall only'],
            logicAnswer: 'Encryption + multi-factor authentication + regular backups'
          }
        }
      ]
    }
  }
];

export const getLevelsByStage = (stage: number) => TECHNOLOGY_LEVELS.filter(l => l.stage === stage);
