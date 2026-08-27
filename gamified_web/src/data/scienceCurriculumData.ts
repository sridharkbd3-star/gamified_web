// ============================================================
// S.H.I.E.L.D. Platform — Science Curriculum Multilingual Data
// Complete 40 Levels, 4 Stages, 4 Bosses, 4 Fragments & Science Stone
// Languages: English (en), Tamil (ta), Hindi (hi), Malayalam (ml)
// ============================================================

export interface LevelTranslation {
  missionTitle: string;
  story: string;
  primaryConcept: string;
  learningObjective: string;
  missionObjective: string;
  hint: string;
  feedbackIncorrect: string;
  logicPremise?: string;
  logicOptions?: string[];
  logicAnswer?: string;
  options?: string[];
  correctOption?: string;
  phases?: {
    title: string;
    description: string;
    instruction: string;
    logicPremise?: string;
    logicOptions?: string[];
    logicAnswer?: string;
  }[];
}

export interface StageTranslation {
  title: string;
  subtitle: string;
  desc: string;
  concept: string;
  learningObjective: string;
  reward: string;
}

export interface DomainTranslation {
  title: string;
  subtitle: string;
  intro: string;
  stages: Record<string, StageTranslation>;
  levels: Record<string, LevelTranslation>;
  fragments: {
    f1: string;
    f2: string;
    f3: string;
    f4: string;
    acquired: string;
    desc: string;
  };
  stone: {
    title: string;
    acquired: string;
    desc: string;
  };
  achievements: {
    initiate: { title: string; desc: string };
    physics: { title: string; desc: string };
    chemistry: { title: string; desc: string };
    biology: { title: string; desc: string };
    master: { title: string; desc: string };
  };
}

export const scienceCurriculumData: Record<'en' | 'ta' | 'hi' | 'ml', DomainTranslation> = {
  en: {
    title: "SCIENCE DOMAIN",
    subtitle: "Natural World & Scientific Discovery",
    intro: "Explore biology, chemistry, and physics to master the fundamental laws of the natural universe.",
    stages: {
      'stage-1': {
        title: "STAGE 1 — DISCOVER",
        subtitle: "Foundations of Science",
        desc: "Observe natural forces, measure physical quantities, and identify states of matter.",
        concept: "Matter & Measurements",
        learningObjective: "Understand states of matter, heat transfer, light, sound, and forces.",
        reward: "Science Fragment 1"
      },
      'stage-2': {
        title: "STAGE 2 — UNDERSTAND",
        subtitle: "Energy & Systems",
        desc: "Explore friction, energy forms, electrical circuits, density, and chemical changes.",
        concept: "Energy & Matter Systems",
        learningObjective: "Analyze motion, circuit conductivity, pH balance, and energy transformations.",
        reward: "Science Fragment 2"
      },
      'stage-3': {
        title: "STAGE 3 — LIFE & EARTH",
        subtitle: "Ecosystems & Life Science",
        desc: "Investigate cells, organ systems, photosynthesis, food chains, and the water cycle.",
        concept: "Living Systems & Earth",
        learningObjective: "Master biological functions, ecological balance, and environmental protection.",
        reward: "Science Fragment 3"
      },
      'stage-4': {
        title: "STAGE 4 — MASTERY",
        subtitle: "Scientific Method & Mastery",
        desc: "Apply the scientific method, variable controls, data modeling, and environmental crisis control.",
        concept: "Scientific Inquiry & Core Mastery",
        learningObjective: "Integrate multi-variable experiments and restore ecosystem equilibrium.",
        reward: "Science Fragment 4 & Science Stone"
      }
    },
    levels: {
      'sci-1-1': {
        missionTitle: "THE MYSTERIOUS LAB",
        story: "A strange substance appeared in the lab.",
        primaryConcept: "Observation",
        learningObjective: "Classify a substance by its properties.",
        missionObjective: "Classify the substance.",
        hint: "Think about objects that have a fixed shape.",
        feedbackIncorrect: "Incorrect! Remember, only one state of matter has a fixed shape.",
        logicPremise: "A new substance is found. It is hard, has a fixed shape, and cannot be poured. What state of matter is it?",
        logicOptions: ["Solid", "Liquid", "Gas"],
        logicAnswer: "Solid"
      },
      'sci-1-2': {
        missionTitle: "THE BROKEN SENSOR",
        story: "We need to measure the temperature, but the automated sensor is broken!",
        primaryConcept: "Measurement",
        learningObjective: "Choose the correct instrument for measuring temperature.",
        missionObjective: "Select the right tool.",
        hint: "Thermo means heat.",
        feedbackIncorrect: "That instrument measures something else. Try again!",
        logicPremise: "A scientist needs to measure the temperature of a liquid. Which instrument should they use?",
        logicOptions: ["Ruler", "Thermometer", "Balance Scale", "Measuring Cup"],
        logicAnswer: "Thermometer"
      },
      'sci-1-3': {
        missionTitle: "THE ICE CHAMBER",
        story: "The temperature is rising 10 degrees per minute in a chamber, causing ice to melt.",
        primaryConcept: "States of matter",
        learningObjective: "Understand pattern of temperature change.",
        missionObjective: "Predict the next temperature.",
        hint: "Add 10 to the last number.",
        feedbackIncorrect: "Check the pattern again. It goes up by 10 each time."
      },
      'sci-1-4': {
        missionTitle: "THE INVISIBLE GAS",
        story: "We are experimenting with air pressure in sealed containers.",
        primaryConcept: "Gases",
        learningObjective: "Understand that gases can be compressed.",
        missionObjective: "Determine what happens to pushed air.",
        hint: "Gases can be squeezed into smaller spaces.",
        feedbackIncorrect: "Unlike liquids, gases can be squeezed into smaller spaces.",
        logicPremise: "You push the plunger of a sealed syringe. The air inside gets...",
        logicOptions: ["Bigger", "Compressed (squeezed smaller)", "Disappears", "Turns liquid"],
        logicAnswer: "Compressed (squeezed smaller)"
      },
      'sci-1-5': {
        missionTitle: "THE LIGHT PATH",
        story: "Guide the laser beam using mirrors to activate the sensor.",
        primaryConcept: "Light Reflection",
        learningObjective: "Navigate a path based on reflection concepts.",
        missionObjective: "Reach the target avoiding obstacles.",
        hint: "Avoid the obstacle at [1,0].",
        feedbackIncorrect: "You hit an obstacle or went out of bounds!"
      },
      'sci-1-6': {
        missionTitle: "THE SOUND SIGNAL",
        story: "We are counting sound vibration bounces off walls in the echo chamber.",
        primaryConcept: "Sound Vibrations",
        learningObjective: "Identify the pattern in sound bounces.",
        missionObjective: "Find the next number of bounces.",
        hint: "The numbers are increasing by 1.",
        feedbackIncorrect: "Just count up by 1!"
      },
      'sci-1-7': {
        missionTitle: "THE HEAT CHAMBER",
        story: "Allocate heat units to different materials based on their thermal properties.",
        primaryConcept: "Heat Transfer",
        learningObjective: "Distribute units according to fractions.",
        missionObjective: "Allocate 12 heat units.",
        hint: "Half of 12 is 6, a third of 12 is 4...",
        feedbackIncorrect: "Calculate the fractions of 12 for each material!"
      },
      'sci-1-8': {
        missionTitle: "THE MAGNETIC LOCK",
        story: "The lock will only open if you select a magnetic material.",
        primaryConcept: "Magnetism",
        learningObjective: "Identify magnetic materials.",
        missionObjective: "Choose the magnetic object.",
        hint: "Certain metals like iron are magnetic.",
        feedbackIncorrect: "Only certain metals are attracted to magnets.",
        logicPremise: "Which of these materials is attracted to a magnet?",
        logicOptions: ["Plastic spoon", "Iron nail", "Glass cup", "Rubber band"],
        logicAnswer: "Iron nail"
      },
      'sci-1-9': {
        missionTitle: "THE FORCE TEST",
        story: "A heavy box needs 15N of net force to move. Calculate the forces.",
        primaryConcept: "Forces",
        learningObjective: "Calculate net force considering friction.",
        missionObjective: "Solve for the net force.",
        hint: "Subtract 5 from 20.",
        feedbackIncorrect: "20 minus 5 is not that number."
      },
      'sci-1-10': {
        missionTitle: "STAGE 1 BOSS — DISCOVERY LAB MASTERY",
        story: "Master all foundations of matter, heat, and magnetism to secure the Discovery Lab!",
        primaryConcept: "Comprehensive Science Stage 1",
        learningObjective: "Apply concepts of matter, heat, and magnetism.",
        missionObjective: "Complete all 4 phases to stabilize the lab.",
        hint: "Recall everything you learned about matter, heat, and magnets.",
        feedbackIncorrect: "You failed a phase. Try again!",
        phases: [
          {
            title: "Steam Leak",
            description: "Identify the state of matter of steam.",
            instruction: "Select the correct state of matter.",
            logicPremise: "What state of matter is steam from boiling water?",
            logicOptions: ["Solid", "Liquid", "Gas", "Plasma"],
            logicAnswer: "Gas"
          },
          {
            title: "Thermal Repair",
            description: "Choose a good conductor to fix the cooling unit.",
            instruction: "Select the good conductor of heat.",
            logicPremise: "Which material is a good conductor of heat?",
            logicOptions: ["Wood", "Plastic", "Metal", "Rubber"],
            logicAnswer: "Metal"
          },
          {
            title: "Temperature Spike",
            description: "Heat is rising in the lab rapidly!",
            instruction: "Predict the next temperature reading."
          },
          {
            title: "Magnetic Containment",
            description: "Explain why the magnets repel.",
            instruction: "Select the correct magnetic rule.",
            logicPremise: "A magnet repels another magnet. Why?",
            logicOptions: ["They are different metals", "Same poles facing each other", "One is heavier", "They have no charge"],
            logicAnswer: "Same poles facing each other"
          }
        ]
      },
      'sci-2-1': {
        missionTitle: "THE RUNAWAY ROBOT",
        story: "A robot is heading toward a wall! Navigate it to safety.",
        primaryConcept: "Motion & Coordinates",
        learningObjective: "Navigate a grid avoiding obstacles.",
        missionObjective: "Guide the robot to the target.",
        hint: "Watch out for obstacles at [1,1] and [2,0].",
        feedbackIncorrect: "The robot crashed! Try a different path."
      },
      'sci-2-2': {
        missionTitle: "THE FRICTION TRACK",
        story: "We need to slide the rescue sled quickly. Pick the surface with the least friction.",
        primaryConcept: "Friction",
        learningObjective: "Identify the surface with the least friction.",
        missionObjective: "Choose the optimal surface for sliding.",
        hint: "Which surface is the most slippery?",
        feedbackIncorrect: "That surface has too much friction!"
      },
      'sci-2-3': {
        missionTitle: "THE ENERGY CORE",
        story: "The energy core requires a specific type of energy to function.",
        primaryConcept: "Energy Forms",
        learningObjective: "Identify kinetic energy.",
        missionObjective: "Identify the type of energy in a moving object.",
        hint: "Energy of motion is called...",
        feedbackIncorrect: "Kinetic energy is the energy of movement.",
        logicPremise: "A ball rolling down a hill has which type of energy?",
        logicOptions: ["Chemical", "Kinetic", "Sound", "Nuclear"],
        logicAnswer: "Kinetic"
      },
      'sci-2-4': {
        missionTitle: "THE CIRCUIT ROOM",
        story: "The lights are out! We need to fix the electrical circuit.",
        primaryConcept: "Electricity & Circuits",
        learningObjective: "Understand requirements for a functioning circuit.",
        missionObjective: "Identify what is needed for electricity to flow.",
        hint: "Electricity needs a continuous path.",
        feedbackIncorrect: "A circuit needs a complete, unbroken loop and a power source.",
        logicPremise: "What must a circuit have to let electricity flow?",
        logicOptions: ["A battery and a gap", "A complete loop with a battery", "Only a wire", "Two batteries"],
        logicAnswer: "A complete loop with a battery"
      },
      'sci-2-5': {
        missionTitle: "THE CONDUCTOR TEST",
        story: "Sort these 6 materials into Conductors and Insulators to repair the grid.",
        primaryConcept: "Conductors & Insulators",
        learningObjective: "Categorize materials as conductors or insulators.",
        missionObjective: "Sort 6 items correctly.",
        hint: "Metals are usually conductors.",
        feedbackIncorrect: "Make sure you put 3 items in Conductors and 3 in Insulators!"
      },
      'sci-2-6': {
        missionTitle: "THE DENSITY MYSTERY",
        story: "We are testing mystery objects in water tanks.",
        primaryConcept: "Density & Buoyancy",
        learningObjective: "Understand the relationship between density and sinking.",
        missionObjective: "Deduce the object's density.",
        hint: "Things that are heavier for their size than water will sink.",
        feedbackIncorrect: "If it sinks, it is more dense than the liquid it is in.",
        logicPremise: "An object sinks in water. What does this tell us about its density compared to water?",
        logicOptions: ["Less dense than water", "Same density as water", "More dense than water", "Has no density"],
        logicAnswer: "More dense than water"
      },
      'sci-2-7': {
        missionTitle: "THE CHEMICAL CHANGE",
        story: "Analyze what happens when paper is burned.",
        primaryConcept: "Chemical Changes",
        learningObjective: "Differentiate between physical and chemical changes.",
        missionObjective: "Identify the type of change.",
        hint: "Can you turn ash back into paper?",
        feedbackIncorrect: "When a new substance is formed and it cannot be easily reversed, it is a chemical change.",
        logicPremise: "Burning paper is a __ change because it cannot be reversed.",
        logicOptions: ["Physical", "Chemical", "Magnetic", "Electrical"],
        logicAnswer: "Chemical"
      },
      'sci-2-8': {
        missionTitle: "THE SECRET SOLUTION",
        story: "Test the pH of the secret solution to find out what it is.",
        primaryConcept: "Acids & Bases",
        learningObjective: "Interpret the pH scale.",
        missionObjective: "Determine properties based on pH.",
        hint: "Lower pH numbers (below 7) are acidic.",
        feedbackIncorrect: "pH 2 is very low, making it a strong acid.",
        logicPremise: "Lemon juice has a pH of 2. This means it is...",
        logicOptions: ["Neutral", "A strong acid", "A weak base", "A strong base"],
        logicAnswer: "A strong acid"
      },
      'sci-2-9': {
        missionTitle: "THE ENERGY TRANSFER",
        story: "Map out the energy transformations for different devices.",
        primaryConcept: "Energy Transformations",
        learningObjective: "Identify how energy changes form.",
        missionObjective: "Identify the output energy of a solar panel.",
        hint: "Solar panels power our homes.",
        feedbackIncorrect: "Solar panels turn light from the sun into electricity.",
        logicPremise: "A solar panel converts light energy into...",
        logicOptions: ["Sound energy", "Electrical energy", "Heat energy only", "Nuclear energy"],
        logicAnswer: "Electrical energy"
      },
      'sci-2-10': {
        missionTitle: "STAGE 2 BOSS — ENERGY STATION MASTERY",
        story: "Restore power to the Energy Research Station by solving key energy and circuit challenges!",
        primaryConcept: "Comprehensive Science Stage 2",
        learningObjective: "Apply circuits, conductors, and energy formulas.",
        missionObjective: "Complete all 4 phases to restore power.",
        hint: "Remember what makes circuits work and how to calculate speed.",
        feedbackIncorrect: "You failed a phase. Try again!",
        phases: [
          {
            title: "Circuit Check",
            description: "Identify the requirement for electricity to flow.",
            instruction: "Select what makes a circuit work.",
            logicPremise: "What makes electricity flow in a circuit?",
            logicOptions: ["A gap", "A complete loop", "Only a bulb", "Friction"],
            logicAnswer: "A complete loop"
          },
          {
            title: "Wire Repair",
            description: "Pick the right material to fix the wire.",
            instruction: "Select a conductor.",
            logicPremise: "Which is a conductor?",
            logicOptions: ["Rubber", "Wood", "Copper wire", "Plastic"],
            logicAnswer: "Copper wire"
          },
          {
            title: "Battery Depletion",
            description: "A backup battery died.",
            instruction: "Identify the energy type in a battery.",
            logicPremise: "A battery runs out. What type of energy ran out?",
            logicOptions: ["Kinetic", "Sound", "Chemical (stored)", "Nuclear"],
            logicAnswer: "Chemical (stored)"
          },
          {
            title: "Generator Speed",
            description: "Calculate the speed of the turbine.",
            instruction: "Solve for Speed."
          }
        ]
      },
      'sci-3-1': {
        missionTitle: "THE TINY WORLD",
        story: "Explore the microscopic world of cells.",
        primaryConcept: "Cell Structure",
        learningObjective: "Identify the nucleus as the control center of a cell.",
        missionObjective: "Identify the control centre of a cell.",
        hint: "It acts as the brain of the cell.",
        feedbackIncorrect: "The nucleus acts as the brain or control centre of the cell.",
        logicPremise: "What is the control centre of a cell called?",
        logicOptions: ["Cell wall", "Nucleus", "Chloroplast", "Mitochondria"],
        logicAnswer: "Nucleus"
      },
      'sci-3-2': {
        missionTitle: "THE HUMAN MACHINE",
        story: "Investigate how the human body works.",
        primaryConcept: "Human Body Systems",
        learningObjective: "Identify the function of the heart.",
        missionObjective: "Identify the organ that pumps blood.",
        hint: "It beats continuously in your chest.",
        feedbackIncorrect: "The heart is the muscle responsible for pumping blood.",
        logicPremise: "Which organ pumps blood through the body?",
        logicOptions: ["Lungs", "Brain", "Heart", "Kidney"],
        logicAnswer: "Heart"
      },
      'sci-3-3': {
        missionTitle: "THE PLANT POWER LAB",
        story: "Help plants make their own food.",
        primaryConcept: "Photosynthesis",
        learningObjective: "Identify what plants need for photosynthesis.",
        missionObjective: "Identify the missing ingredient for photosynthesis.",
        hint: "It is a gas that humans breathe out.",
        feedbackIncorrect: "Plants need sunlight, water, and carbon dioxide.",
        logicPremise: "Plants use sunlight, water and __ to make food.",
        logicOptions: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        logicAnswer: "Carbon dioxide"
      },
      'sci-3-4': {
        missionTitle: "THE FOOD CHAIN",
        story: "Analyze the impact of a missing species in a food chain.",
        primaryConcept: "Food Chains & Ecosystems",
        learningObjective: "Understand the interconnectedness of food chains.",
        missionObjective: "Determine the consequence of missing rabbits.",
        hint: "What eats rabbits? What do rabbits eat?",
        feedbackIncorrect: "Without rabbits, foxes have no food (so they decrease), and grass is not eaten (so it increases).",
        logicPremise: "In a food chain: Grass → Rabbit → Fox. What happens if all rabbits disappear?",
        logicOptions: ["Grass decreases, fox increases", "Grass increases, fox decreases", "Nothing changes", "Fox multiplies rapidly"],
        logicAnswer: "Grass increases, fox decreases"
      },
      'sci-3-5': {
        missionTitle: "THE BALANCED ECOSYSTEM",
        story: "Discover the role of decomposers in our world.",
        primaryConcept: "Decomposers",
        learningObjective: "Understand the role of decomposers.",
        missionObjective: "Identify the role of decomposers.",
        hint: "They clean up nature.",
        feedbackIncorrect: "Decomposers break down dead plants and animals.",
        logicPremise: "What do decomposers do in an ecosystem?",
        logicOptions: ["Make their own food", "Hunt other animals", "Break down dead organisms", "Produce oxygen only"],
        logicAnswer: "Break down dead organisms"
      },
      'sci-3-6': {
        missionTitle: "THE WATER JOURNEY",
        story: "Track the journey of water through its cycle.",
        primaryConcept: "Water Cycle",
        learningObjective: "Identify the process of condensation.",
        missionObjective: "Identify the name of the process.",
        hint: "Water vapor cools into clouds.",
        feedbackIncorrect: "When gas cools and turns back into a liquid, it is called condensation.",
        logicPremise: "Water vapour rises, cools, and turns back into water droplets. This is called...",
        logicOptions: ["Evaporation", "Condensation", "Precipitation", "Transpiration"],
        logicAnswer: "Condensation"
      },
      'sci-3-7': {
        missionTitle: "THE WEATHER STATION",
        story: "Daily temperature is increasing. Predict the next reading.",
        primaryConcept: "Weather Data Analysis",
        learningObjective: "Predict temperature trends.",
        missionObjective: "Predict the next temperature.",
        hint: "The temperature goes up by 2°C each time.",
        feedbackIncorrect: "Add 2 to the last number."
      },
      'sci-3-8': {
        missionTitle: "THE PLANET UNDER PRESSURE",
        story: "Select the most sustainable energy source for a new city.",
        primaryConcept: "Sustainable Resources",
        learningObjective: "Identify sustainable energy sources.",
        missionObjective: "Choose the most sustainable energy source.",
        hint: "Which source is renewable?",
        feedbackIncorrect: "Solar power is a renewable and sustainable resource."
      },
      'sci-3-9': {
        missionTitle: "THE GREEN CITY",
        story: "Help the city implement policies to protect the environment.",
        primaryConcept: "Environmental Protection",
        learningObjective: "Identify actions that reduce plastic pollution.",
        missionObjective: "Choose the action that reduces plastic pollution.",
        hint: "Think about reducing waste at the source.",
        feedbackIncorrect: "Reducing the use of single-use plastics is the best way to cut down on plastic pollution.",
        logicPremise: "Which action MOST reduces plastic pollution?",
        logicOptions: ["Using more cars", "Reducing single-use plastic", "Burning waste", "Using more water"],
        logicAnswer: "Reducing single-use plastic"
      },
      'sci-3-10': {
        missionTitle: "STAGE 3 BOSS — ECOSYSTEM CRISIS MASTERY",
        story: "Stop the ecological disaster using your knowledge of plant cells, ozone, water cycle, and eco-friendly choices!",
        primaryConcept: "Comprehensive Science Stage 3",
        learningObjective: "Apply integrated knowledge of earth and life sciences.",
        missionObjective: "Complete all 4 phases to stop the crisis.",
        hint: "Recall facts about plants, the ozone layer, the water cycle, and eco-friendly choices.",
        feedbackIncorrect: "You failed a phase. Try again!",
        phases: [
          {
            title: "Plant Rescue",
            description: "Identify how plants capture sunlight.",
            instruction: "Select the correct organelle.",
            logicPremise: "Which part of a plant cell captures sunlight?",
            logicOptions: ["Nucleus", "Cell wall", "Chloroplast", "Vacuole"],
            logicAnswer: "Chloroplast"
          },
          {
            title: "Ozone Depletion",
            description: "Understand the danger of a damaged ozone layer.",
            instruction: "Select what the ozone layer protects us from.",
            logicPremise: "What does the ozone layer protect us from?",
            logicOptions: ["Rain", "UV rays", "Wind", "Sound"],
            logicAnswer: "UV rays"
          },
          {
            title: "Water Cycle Flow",
            description: "Identify the process where water enters clouds.",
            instruction: "Select the correct process."
          },
          {
            title: "Clean Transportation",
            description: "Choose the most eco-friendly transport option.",
            instruction: "Select the green transport option."
          }
        ]
      },
      'sci-4-1': {
        missionTitle: "THE UNKNOWN EXPERIMENT",
        story: "You are designing a new experiment. What is the very first thing you must do?",
        primaryConcept: "Scientific Method",
        learningObjective: "Identify the first step of the scientific method.",
        missionObjective: "Choose the first step.",
        hint: "Before you can find an answer, you must have a...",
        feedbackIncorrect: "Every experiment starts with a question.",
        logicPremise: "The first step of the scientific method is...",
        logicOptions: ["Experiment", "Draw conclusions", "Ask a question", "Record results"],
        logicAnswer: "Ask a question"
      },
      'sci-4-2': {
        missionTitle: "THE FAIR TEST",
        story: "To ensure our results are valid, we must conduct a fair test.",
        primaryConcept: "Controlled Variables",
        learningObjective: "Understand the role of controlled variables.",
        missionObjective: "Identify what must stay the same.",
        hint: "We 'control' these to make the test fair.",
        feedbackIncorrect: "Controlled variables must remain constant for a fair test.",
        logicPremise: "In a fair test, what must stay the same?",
        logicOptions: ["The dependent variable", "The independent variable", "The controlled variables", "The conclusion"],
        logicAnswer: "The controlled variables"
      },
      'sci-4-3': {
        missionTitle: "THE DATA LAB",
        story: "Analyze the results from the latest experiment.",
        primaryConcept: "Data Analysis",
        learningObjective: "Identify the pattern in the data.",
        missionObjective: "Predict the next data point.",
        hint: "The numbers are increasing by 10.",
        feedbackIncorrect: "Add 10 to the last data point."
      },
      'sci-4-4': {
        missionTitle: "THE ENERGY NETWORK",
        story: "Manage the city's energy grid using wind turbines.",
        primaryConcept: "Wind Energy Transformation",
        learningObjective: "Identify the output energy of a wind turbine.",
        missionObjective: "Identify the energy transformation.",
        hint: "Turbines generate this to power homes.",
        feedbackIncorrect: "Wind turbines convert kinetic wind energy into electrical energy.",
        logicPremise: "A wind turbine converts wind energy into...",
        logicOptions: ["Heat", "Sound", "Electrical energy", "Chemical energy"],
        logicAnswer: "Electrical energy"
      },
      'sci-4-5': {
        missionTitle: "THE FORCE CHALLENGE",
        story: "Balance the forces to keep the structure stable.",
        primaryConcept: "Net Force Equilibrium",
        learningObjective: "Calculate the force needed to achieve a net force of 0.",
        missionObjective: "Solve for the missing force.",
        hint: "If 30 minus X is 0, what is X?",
        feedbackIncorrect: "To balance the 30N force, you need an equal and opposite 30N force."
      },
      'sci-4-6': {
        missionTitle: "THE HUMAN BODY EMERGENCY",
        story: "A patient is having trouble breathing. Identify the affected system.",
        primaryConcept: "Respiratory System",
        learningObjective: "Identify the respiratory system.",
        missionObjective: "Select the correct body system.",
        hint: "Respiration is another word for breathing.",
        feedbackIncorrect: "The respiratory system includes the lungs and is responsible for breathing.",
        logicPremise: "A person cannot breathe properly. Which system is affected?",
        logicOptions: ["Digestive", "Nervous", "Respiratory", "Circulatory"],
        logicAnswer: "Respiratory"
      },
      'sci-4-7': {
        missionTitle: "THE ECOSYSTEM DETECTIVE",
        story: "Investigate why deforestation is causing less rainfall.",
        primaryConcept: "Transpiration & Water Cycle",
        learningObjective: "Understand the role of trees in the water cycle.",
        missionObjective: "Identify the cause.",
        hint: "Trees release water vapor through a process called transpiration.",
        feedbackIncorrect: "Trees 'sweat' water vapor into the air through transpiration, which contributes to rainfall.",
        logicPremise: "Deforestation causes a decrease in rainfall. Why?",
        logicOptions: ["Trees produce rain directly", "Trees absorb rainfall", "Trees release water vapour into air (transpiration)", "Trees block wind"],
        logicAnswer: "Trees release water vapour into air (transpiration)"
      },
      'sci-4-8': {
        missionTitle: "THE CLIMATE CONTROL ROOM",
        story: "Analyze the gases causing global temperatures to rise.",
        primaryConcept: "Greenhouse Effect",
        learningObjective: "Identify the main greenhouse gas.",
        missionObjective: "Identify the greenhouse gas.",
        hint: "It is a gas produced by burning fossil fuels.",
        feedbackIncorrect: "Carbon dioxide is the main gas contributing to the greenhouse effect.",
        logicPremise: "Which gas is the main cause of the greenhouse effect?",
        logicOptions: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        logicAnswer: "Carbon dioxide"
      },
      'sci-4-9': {
        missionTitle: "THE SCIENTIST FINAL PUZZLE",
        story: "Determine the role of temperature in your plant experiment.",
        primaryConcept: "Independent Variable",
        learningObjective: "Identify the independent variable.",
        missionObjective: "Identify the type of variable.",
        hint: "The variable 'I' change is the 'Independent' variable.",
        feedbackIncorrect: "The variable that the scientist purposely changes is the independent variable.",
        logicPremise: "A scientist changes only the temperature in an experiment testing plant growth. Temperature is the...",
        logicOptions: ["Controlled variable", "Dependent variable", "Independent variable", "Conclusion"],
        logicAnswer: "Independent variable"
      },
      'sci-4-10': {
        missionTitle: "STAGE 4 BOSS — FUTURE CITY CRISIS MASTERY",
        story: "The ultimate test! Use all your scientific mastery to save the Future City from complete collapse.",
        primaryConcept: "Comprehensive Science Stage 4 Mastery",
        learningObjective: "Master integrated science concepts.",
        missionObjective: "Complete all 4 phases to save the city.",
        hint: "Apply your full mastery of science.",
        feedbackIncorrect: "You failed a phase. Try again!",
        phases: [
          {
            title: "Method Protocol",
            description: "Establish the correct scientific protocol.",
            instruction: "Select the correct order.",
            logicPremise: "What is the correct order of the scientific method?",
            logicOptions: [
              "Experiment→Question→Hypothesis→Results",
              "Question→Hypothesis→Experiment→Results→Conclusion",
              "Results→Question→Experiment→Hypothesis",
              "Hypothesis→Question→Results→Experiment"
            ],
            logicAnswer: "Question→Hypothesis→Experiment→Results→Conclusion"
          },
          {
            title: "Atmospheric Balance",
            description: "Identify the natural cycle managing CO2.",
            instruction: "Select the correct cycle.",
            logicPremise: "A city releases CO2. Plants in a nearby forest absorb it. This is an example of...",
            logicOptions: ["Water cycle", "Carbon cycle", "Nitrogen cycle", "Oxygen cycle"],
            logicAnswer: "Carbon cycle"
          },
          {
            title: "Power Output",
            description: "Calculate the necessary power for the shields.",
            instruction: "Solve for Power."
          },
          {
            title: "Urban Ecology",
            description: "Implement a plan to save local wildlife.",
            instruction: "Select the best action for biodiversity.",
            logicPremise: "Which action best protects biodiversity in a city?",
            logicOptions: [
              "Build more roads",
              "Plant native trees and create green corridors",
              "Remove all rivers",
              "Increase building height"
            ],
            logicAnswer: "Plant native trees and create green corridors"
          }
        ]
      }
    },
    fragments: {
      f1: "Science Fragment 1",
      f2: "Science Fragment 2",
      f3: "Science Fragment 3",
      f4: "Science Fragment 4",
      acquired: "SCIENCE FRAGMENT ACQUIRED!",
      desc: "You earned a piece of the Science Stone."
    },
    stone: {
      title: "SCIENCE STONE",
      acquired: "SCIENCE STONE ACQUIRED!",
      desc: "You have mastered the Science path and unlocked the secrets of the universe."
    },
    achievements: {
      initiate: { title: "SCIENCE INITIATE", desc: "Completed Stage 1 of the Science Domain." },
      physics: { title: "PHYSICS PIONEER", desc: "Mastered motion, forces, and physical laws." },
      chemistry: { title: "CHEMISTRY EXPLORER", desc: "Mastered states of matter, reactions, and pH." },
      biology: { title: "BIOLOGY DISCOVERER", desc: "Mastered cells, human systems, and ecology." },
      master: { title: "SCIENCE MASTER", desc: "Completed all 40 Science levels and assembled the Science Stone!" }
    }
  },

  ta: {
    title: "அறிவியல் பிரிவு",
    subtitle: "இயற்கை உலகம் மற்றும் அறிவியல் கண்டுபிடிப்புகள்",
    intro: "இயற்கைப் பிரபஞ்சத்தின் அடிப்படை விதிகளைப் புரிந்துகொள்ள உயிரியல், வேதியியல் மற்றும் இயற்பியலை ஆராயுங்கள்.",
    stages: {
      'stage-1': {
        title: "நிலை 1 — கண்டுபிடி",
        subtitle: "அறிவியல் அடிப்படைகள்",
        desc: "இயற்கை விசைகளைக் கவனித்து, இயற்பியல் அளவுகளை அளவிட்டு, பருப்பொருளின் நிலைகளைக் கண்டறியவும்.",
        concept: "பருப்பொருள் & அளவீடுகள்",
        learningObjective: "பருப்பொருளின் நிலைகள், வெப்பப் பரிமாற்றம், ஒளி, ஒலி மற்றும் விசைகளைப் புரிந்துகொள்ளுதல்.",
        reward: "அறிவியல் துண்டு 1"
      },
      'stage-2': {
        title: "நிலை 2 — புரிந்துகொள்",
        subtitle: "ஆற்றல் & அமைப்புகள்",
        desc: "உராய்வு, ஆற்றல் வடிவங்கள், மின் சுற்றுகள், அடர்த்தி மற்றும் வேதியியல் மாற்றங்களை ஆராயுங்கள்.",
        concept: "ஆற்றல் & பருப்பொருள் அமைப்புகள்",
        learningObjective: "இயக்கம், மின் கடத்துத்திறன், pH சமநிலை மற்றும் ஆற்றல் மாற்றங்களை பகுப்பாய்வு செய்தல்.",
        reward: "அறிவியல் துண்டு 2"
      },
      'stage-3': {
        title: "நிலை 3 — உயிரினங்கள் & பூமி",
        subtitle: "சுற்றுச்சூழல் & உயிர் அறிவியல்",
        desc: "செல்கள், மனித உடல் அமைப்புகள், ஒளிச்சேர்க்கை, உணவுச் சங்கிலிகள் மற்றும் நீர் சுழற்சியை ஆராயுங்கள்.",
        concept: "உயிர் அமைப்புகள் & பூமி",
        learningObjective: "உயிரியல் செயல்பாடுகள், சுற்றுச்சூழல் சமநிலை மற்றும் சுற்றுச்சூழல் பாதுகாப்பை மாஸ்டர் செய்தல்.",
        reward: "அறிவியல் துண்டு 3"
      },
      'stage-4': {
        title: "நிலை 4 — மாஸ்டரி",
        subtitle: "அறிவியல் முறை & மாஸ்டரி",
        desc: "அறிவியல் முறை, மாறிகளின் கட்டுப்பாடுகள், தரவு மாதிரி மற்றும் சுற்றுச்சூழல் சவால்களைத் தீர்த்தல்.",
        concept: "அறிவியல் ஆராய்ச்சி & முதன்மை மாஸ்டரி",
        learningObjective: "பல மாறிகள் கொண்ட சோதனைகளை ஒருங்கிணைத்து சுற்றுச்சூழல் சமநிலையை மீட்டமைத்தல்.",
        reward: "அறிவியல் துண்டு 4 & அறிவியல் கல்"
      }
    },
    levels: {
      'sci-1-1': {
        missionTitle: "மர்ம ஆய்வகம்",
        story: "ஆய்வகத்தில் ஒரு விசித்திரமான பொருள் தோன்றியது.",
        primaryConcept: "கண்காணிப்பு",
        learningObjective: "பண்புகளின் அடிப்படையில் பருப்பொருளை வகைப்படுத்துங்கள்.",
        missionObjective: "பொருளை வகைப்படுத்துங்கள்.",
        hint: "நிலையான வடிவம் கொண்ட பொருட்களைப் பற்றி யோசியுங்கள்.",
        feedbackIncorrect: "தவறு! பருப்பொருளின் ஒரு நிலை மட்டுமே நிலையான வடிவம் கொண்டது.",
        logicPremise: "ஒரு புதிய பொருள் கண்டறியப்பட்டது. அது கடினமானது, நிலையான வடிவம் கொண்டது, ஊற்ற முடியாது. அது எந்த நிலை?",
        logicOptions: ["திண்மம்", "திரவம்", "வாயு"],
        logicAnswer: "திண்மம்"
      },
      'sci-1-2': {
        missionTitle: "உடைந்த உணரி",
        story: "வெப்பநிலையை அளவிட வேண்டும், ஆனால் தானியங்கி உணரி உடைந்துவிட்டது!",
        primaryConcept: "அளவீடு",
        learningObjective: "வெப்பநிலையை அளவிட சரியான கருவியைத் தேர்ந்தெடுக்கவும்.",
        missionObjective: "சரியான கருவியைத் தேர்ந்தெடுக்கவும்.",
        hint: "தெர்மோ என்றால் வெப்பம்.",
        feedbackIncorrect: "அந்தக் கருவி வேறு ஒன்றை அளவிடுகிறது. மீண்டும் முயற்சிக்கவும்!",
        logicPremise: "ஒரு ஆய்வாளர் திரவத்தின் வெப்பநிலையை அளவிட வேண்டும். அவர் எந்தக் கருவியைப் பயன்படுத்த வேண்டும்?",
        logicOptions: ["அளவுகோல்", "வெப்பமானி", "தராசு", "அளவைக் கோப்பை"],
        logicAnswer: "வெப்பமானி"
      },
      'sci-1-3': {
        missionTitle: "பனிக் கூடம்",
        story: "அறையில் வெப்பநிலை நிமிடத்திற்கு 10 டிகிரி உயர்கிறது, இதனால் பனி உருகுகிறது.",
        primaryConcept: "பருப்பொருளின் நிலைகள்",
        learningObjective: "வெப்பநிலை மாற்றத்தின் அமைப்பைப் புரிந்துகொள்ளுங்கள்.",
        missionObjective: "அடுத்த வெப்பநிலையைக் கணிக்கவும்.",
        hint: "கடைசி எண்ணுடன் 10 கூட்டவும்.",
        feedbackIncorrect: "அமைப்பை மீண்டும் சரிபார்க்கவும். இது ஒவ்வொரு முறையும் 10 அதிகரிக்கிறது."
      },
      'sci-1-4': {
        missionTitle: "அருவ வாயு",
        story: "மூடப்பட்ட கொள்கலன்களில் காற்று அழுத்தத்தை சோதிக்கிறோம்.",
        primaryConcept: "வாயுக்கள்",
        learningObjective: "வாயுக்களை அமுக்க முடியும் என்பதைப் புரிந்துகொள்ளுங்கள்.",
        missionObjective: "அழுத்தப்பட்ட காற்றுக்கு என்ன நடக்கிறது என்பதைத் தீர்மானிக்கவும்.",
        hint: "வாயுக்களை சிறிய இடங்களில் அமுக்க முடியும்.",
        feedbackIncorrect: "திரவங்களைப் போலன்றி, வாயுக்களை சிறிய இடங்களில் அமுக்க முடியும்.",
        logicPremise: "மூடப்பட்ட ஊசியின் பிஸ்டனை அழுத்தும்போது உள்ளே உள்ள காற்று...",
        logicOptions: ["பெரிதாகும்", "அமுக்கப்படும் (சிறிதாகும்)", "மறைந்துவிடும்", "திரவமாகும்"],
        logicAnswer: "அமுக்கப்படும் (சிறிதாகும்)"
      },
      'sci-1-5': {
        missionTitle: "ஒளிப் பாதை",
        story: "உணரியை செயல்படுத்த ஆடிகளைப் பயன்படுத்தி லேசர் கற்றையை வழிகாட்டவும்.",
        primaryConcept: "ஒளி எதிரொளிப்பு",
        learningObjective: "எதிரொளிப்பு விதிகளின் அடிப்படையில் பாதையைக் கண்டறியவும்.",
        missionObjective: "தடைகளைத் தவிர்த்து இலக்கை அடையுங்கள்.",
        hint: "[1,0] இல் உள்ள தடையைத் தவிர்க்கவும்.",
        feedbackIncorrect: "நீங்கள் ஒரு தடையை மோதினீர்கள் அல்லது எல்லை தாண்டினீர்கள்!"
      },
      'sci-1-6': {
        missionTitle: "ஒலிச் சமிக்ஞை",
        story: "எதிரொலி அறையில் சுவர்களில் ஒலி அதிர்வுகள் எதிரொளிப்பதை எண்ணுகிறோம்.",
        primaryConcept: "ஒலி அதிர்வுகள்",
        learningObjective: "ஒலி அதிர்வுகளின் அமைப்பைக் கண்டறியவும்.",
        missionObjective: "அடுத்த எதிரொளிப்பு எண்ணிக்கையைக் கண்டறியவும்.",
        hint: "எண்கள் 1 வீதம் அதிகரிக்கின்றன.",
        feedbackIncorrect: "1 கூட்டி எண்ணுங்கள்!"
      },
      'sci-1-7': {
        missionTitle: "வெப்ப அறை",
        story: "வெப்பப் பண்புகளின் அடிப்படையில் பல்வேறு பொருட்களுக்கு வெப்ப அலகுகளைப் பகிருங்கள்.",
        primaryConcept: "வெப்பப் பரிமாற்றம்",
        learningObjective: "பின்னங்களின்படி அலகுகளைப் பங்கீடு செய்யுங்கள்.",
        missionObjective: "12 வெப்ப அலகுகளைப் பகிருங்கள்.",
        hint: "12 இல் பாதி 6, மூன்றில் ஒரு பங்கு 4...",
        feedbackIncorrect: "ஒவ்வொரு பொருளுக்கும் 12 இன் பின்னங்களைக் கணக்கிடுங்கள்!"
      },
      'sci-1-8': {
        missionTitle: "காந்தப் பூட்டு",
        story: "காந்தப் பொருளைத் தேர்ந்தெடுத்தால் மட்டுமே பூட்டு திறக்கும்.",
        primaryConcept: "காந்தவியல்",
        learningObjective: "காந்தப் பொருட்களை அடையாளம் காணவும்.",
        missionObjective: "காந்தப் பொருளைத் தேர்ந்தெடுக்கவும்.",
        hint: "இரும்பு போன்ற சில உலோகங்கள் காந்தத் தன்மை கொண்டவை.",
        feedbackIncorrect: "சில உலோகங்கள் மட்டுமே காந்தத்தால் ஈர்க்கப்படுகின்றன.",
        logicPremise: "இவற்றில் எந்தப் பொருள் காந்தத்தால் ஈர்க்கப்படுகிறது?",
        logicOptions: ["நெகிழி கரண்டி", "இரும்பு ஆணி", "கண்ணாடி கோப்பை", "ரப்பர் பட்டை"],
        logicAnswer: "இரும்பு ஆணி"
      },
      'sci-1-9': {
        missionTitle: "விசைச் சோதனை",
        story: "ஒரு கனமான பெட்டியை நகர்த்த 15N நிகர விசை தேவைப்படுகிறது.",
        primaryConcept: "விசைகள்",
        learningObjective: "உராய்வைக் கருத்தில் கொண்டு நிகர விசையைக் கணக்கிடுங்கள்.",
        missionObjective: "நிகர விசையைக் கணக்கிடுங்கள்.",
        hint: "20 இலிருந்து 5 ஐக் கழிக்கவும்.",
        feedbackIncorrect: "20 கழித்தல் 5 அந்த எண் அல்ல."
      },
      'sci-1-10': {
        missionTitle: "நிலை 1 பாஸ் — கண்டுபிடிப்பு ஆய்வக மாஸ்டரி",
        story: "கண்டுபிடிப்பு ஆய்வகத்தைப் பாதுகாக்க பருப்பொருள், வெப்பம் மற்றும் காந்தவியலின் அனைத்து அடிப்படைகளையும் மாஸ்டர் செய்யுங்கள்!",
        primaryConcept: "அறிவியல் நிலை 1 மாஸ்டரி",
        learningObjective: "பருப்பொருள், வெப்பம் மற்றும் காந்தவியல் கோட்பாடுகளைப் பயன்படுத்துங்கள்.",
        missionObjective: "ஆய்வகத்தை நிலைநிறுத்த அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "பருப்பொருள், வெப்பம் மற்றும் காந்தங்கள் பற்றி கற்ற அனைத்தையும் நினைவில் கொள்க.",
        feedbackIncorrect: "ஒரு கட்டத்தில் தோல்வியடைந்தீர்கள். மீண்டும் முயற்சிக்கவும்!",
        phases: [
          {
            title: "நீராவி கசிவு",
            description: "நீராவியின் பருப்பொருள் நிலையைக் கண்டறியவும்.",
            instruction: "சரியான பருப்பொருள் நிலையைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "கொதிக்கும் நீரிலிருந்து வரும் நீராவி எந்த நிலை?",
            logicOptions: ["திண்மம்", "திரவம்", "வாயு", "பிளாஸ்மா"],
            logicAnswer: "வாயு"
          },
          {
            title: "வெப்ப பழுதுபார்ப்பு",
            description: "குளிரூட்டும் பிரிவைச் சரிசெய்ய நல்ல கடத்தியைத் தேர்ந்தெடுக்கவும்.",
            instruction: "நல்ல வெப்பக் கடத்தியைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "எந்தப் பொருள் வெப்பத்தின் நல்ல கடத்தி?",
            logicOptions: ["மரம்", "நெகிழி", "உலோகம்", "ரப்பர்"],
            logicAnswer: "உலோகம்"
          },
          {
            title: "வெப்பநிலை உயர்வு",
            description: "ஆய்வகத்தில் வெப்பநிலை வேகமாக உயர்கிறது!",
            instruction: "அடுத்த வெப்பநிலை அளவீட்டைக் கணிக்கவும்."
          },
          {
            title: "காந்தக் கட்டுப்பாடு",
            description: "காந்தங்கள் ஏன் விலகுகின்றன என்பதை விளக்குங்கள்.",
            instruction: "சரியான காந்த விதியைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "ஒரு காந்தம் மற்றொரு காந்தத்தை விலக்குகிறது. ஏன்?",
            logicOptions: ["அவை வேறுபட்ட உலோகங்கள்", "ஒரே துருவங்கள் ஒன்றையொன்று எதிர்கொள்கின்றன", "ஒன்று கனமானது", "அவற்றுக்கு மின்னூட்டம் இல்லை"],
            logicAnswer: "ஒரே துருவங்கள் ஒன்றையொன்று எதிர்கொள்கின்றன"
          }
        ]
      },
      'sci-2-1': {
        missionTitle: "தப்பி ஓடிய ரோபோ",
        story: "ஒரு ரோபோ சுவரை நோக்கிச் செல்கிறது! அதைப் பாதுகாப்பாக வழிகாட்டவும்.",
        primaryConcept: "இயக்கம் & ஆயத்தொலைவுகள்",
        learningObjective: "தடைகளைத் தவிர்த்து கட்டத்தில் வழிகாட்டவும்.",
        missionObjective: "ரோபோவை இலக்கிற்கு வழிகாட்டவும்.",
        hint: "[1,1] மற்றும் [2,0] இல் உள்ள தடைகளைக் கவனியுங்கள்.",
        feedbackIncorrect: "ரோபோ மோதியது! வேறு பாதையை முயற்சிக்கவும்."
      },
      'sci-2-2': {
        missionTitle: "உராய்வுப் பாதை",
        story: "மீட்பு வண்டியை வேகமாக நகர்த்த வேண்டும். குறைந்த உராய்வு கொண்ட மேற்பரப்பைத் தேர்ந்தெடுக்கவும்.",
        primaryConcept: "உராய்வு",
        learningObjective: "குறைந்த உராய்வு கொண்ட மேற்பரப்பைக் கண்டறியவும்.",
        missionObjective: "சறுக்குவதற்கு சிறந்த மேற்பரப்பைத் தேர்ந்தெடுக்கவும்.",
        hint: "எந்த மேற்பரப்பு மிகவும் வழவழப்பானது?",
        feedbackIncorrect: "அந்த மேற்பரப்பில் அதிக உராய்வு உள்ளது!"
      },
      'sci-2-3': {
        missionTitle: "ஆற்றல் மையம்",
        story: "ஆற்றல் மையம் செயல்பட குறிப்பிட்ட வகை ஆற்றல் தேவைப்படுகிறது.",
        primaryConcept: "ஆற்றல் வடிவங்கள்",
        learningObjective: "இயக்க ஆற்றலை அடையாளம் காணவும்.",
        missionObjective: "நகரும் பொருளின் ஆற்றல் வகையைக் கண்டறியவும்.",
        hint: "இயக்கத்தின் ஆற்றல் இவ்வாறு அழைக்கப்படுகிறது...",
        feedbackIncorrect: "இயக்க ஆற்றல் என்பது நகர்வின் ஆற்றலாகும்.",
        logicPremise: "மலையிலிருந்து உருண்டு வரும் பந்து எந்த வகை ஆற்றலைக் கொண்டுள்ளது?",
        logicOptions: ["வேதியியல்", "இயக்க ஆற்றல்", "ஒலி", "அணு ஆற்றல்"],
        logicAnswer: "இயக்க ஆற்றல்"
      },
      'sci-2-4': {
        missionTitle: "மின் சுற்று அறை",
        story: "மின் விளக்குகள் அணைந்துவிட்டன! மின் சுற்றைச் சரிசெய்ய வேண்டும்.",
        primaryConcept: "மின்சாரம் & சுற்றுகள்",
        learningObjective: "செயல்படும் மின் சுற்றின் தேவைகளைப் புரிந்துகொள்ளுங்கள்.",
        missionObjective: "மின்சாரம் பாயத் தேவையானதைக் கண்டறியவும்.",
        hint: "மின்சாரத்திற்கு தொடர்ச்சியான பாதை தேவை.",
        feedbackIncorrect: "ஒரு மின் சுற்றுக்கு முழுமையான unbroken வளையமும் பேட்டரியும் தேவை.",
        logicPremise: "மின்சாரம் பாய ஒரு மின் சுற்றில் என்ன இருக்க வேண்டும்?",
        logicOptions: ["பேட்டரி மற்றும் இடைவெளி", "பேட்டரியுடன் கூடிய முழுமையான வளையம்", "கம்பி மட்டுமே", "இரண்டு பேட்டரிகள்"],
        logicAnswer: "பேட்டரியுடன் கூடிய முழுமையான வளையம்"
      },
      'sci-2-5': {
        missionTitle: "கடத்தி சோதனை",
        story: "மின் வலைப்பின்னலைச் சரிசெய்ய இந்த 6 பொருட்களைக் கடத்திகள் மற்றும் மின்கடத்தாப் பொருட்களாகப் பிரிக்கவும்.",
        primaryConcept: "கடத்திகள் & மின்கடத்தாப் பொருட்கள்",
        learningObjective: "பொருட்களைக் கடத்திகள் அல்லது மின்கடத்தாப் பொருட்களாக வகைப்படுத்துங்கள்.",
        missionObjective: "6 பொருட்களைச் சரியாகப் பிரிக்கவும்.",
        hint: "உலோகங்கள் பொதுவாக கடத்திகளாகும்.",
        feedbackIncorrect: "கடத்திகளில் 3 பொருட்கள் மற்றும் மின்கடத்தாப் பொருட்களில் 3 பொருட்கள் வைப்பதை உறுதிசெய்யவும்!"
      },
      'sci-2-6': {
        missionTitle: "அடர்த்தி மர்மம்",
        story: "நீர் தொட்டிகளில் மர்மப் பொருட்களைச் சோதிக்கிறோம்.",
        primaryConcept: "அடர்த்தி & மிதப்புத்தன்மை",
        learningObjective: "அடர்த்திக்கும் மூழ்குவதற்கும் உள்ள தொடர்பைப் புரிந்துகொள்ளுங்கள்.",
        missionObjective: "பொருளின் அடர்த்தியைக் கண்டறியவும்.",
        hint: "நீரை விட அதிக எடையுள்ள பொருட்கள் மூழ்கும்.",
        feedbackIncorrect: "அது மூழ்கினால், அது இருக்கும் திரவத்தை விட அதிக அடர்த்தி கொண்டது.",
        logicPremise: "ஒரு பொருள் நீரில் மூழ்குகிறது. நீருடன் ஒப்பிடும்போது இதன் அடர்த்தி பற்றி இது என்ன கூறுகிறது?",
        logicOptions: ["நீரை விட குறைந்த அடர்த்தி", "நீரின் அதே அடர்த்தி", "நீரை விட அதிக அடர்த்தி", "அடர்த்தி இல்லை"],
        logicAnswer: "நீரை விட அதிக அடர்த்தி"
      },
      'sci-2-7': {
        missionTitle: "வேதியியல் மாற்றம்",
        story: "காகிதம் எரியும்போது என்ன நடக்கிறது என்பதை பகுப்பாய்வு செய்யுங்கள்.",
        primaryConcept: "வேதியியல் மாற்றங்கள்",
        learningObjective: "இயற்பியல் மற்றும் வேதியியல் மாற்றங்களை வேறுபடுத்துங்கள்.",
        missionObjective: "மாற்றத்தின் வகையைக் கண்டறியவும்.",
        hint: "சாம்பலை மீண்டும் காகிதமாக மாற்ற முடியுமா?",
        feedbackIncorrect: "ஒரு புதிய பொருள் உருவாக்கப்பட்டு அதை எளிதில் மாற்ற முடியாது என்றால், அது ஒரு வேதியியல் மாற்றமாகும்.",
        logicPremise: "காகிதத்தை எரிப்பது ஒரு __ மாற்றமாகும், ஏனெனில் அதை மாற்ற முடியாது.",
        logicOptions: ["இயற்பியல்", "வேதியியல்", "காந்த", "மின்"],
        logicAnswer: "வேதியியல்"
      },
      'sci-2-8': {
        missionTitle: "ரகசியக் கரைசல்",
        story: "ரகசியக் கரைசல் என்னவென்று கண்டறிய அதன் pH ஐச் சோதிக்கவும்.",
        primaryConcept: "அமிலங்கள் & காரங்ள்",
        learningObjective: "pH அளவுகோலை விளக்குங்கள்.",
        missionObjective: "pH இன் அடிப்படையில் பண்புகளைத் தீர்மானிக்கவும்.",
        hint: "குறைந்த pH எண்கள் (7 க்கு கீழே) அமிலத்தன்மை கொண்டவை.",
        feedbackIncorrect: "pH 2 மிகவும் குறைவு, இது ஒரு வலுவான அமிலமாகும்.",
        logicPremise: "எலுமிச்சை சாறின் pH 2 ஆகும். இதன் பொருள் அது...",
        logicOptions: ["நடுநிலை", "வலுவான அமிலம்", "பலவீனமான காரம்", "வலுவான காரம்"],
        logicAnswer: "வலுவான அமிலம்"
      },
      'sci-2-9': {
        missionTitle: "ஆற்றல் பரிமாற்றம்",
        story: "பல்வேறு சாதனங்களுக்கான ஆற்றல் மாற்றங்களை வரைபடமாக்குங்கள்.",
        primaryConcept: "ஆற்றல் மாற்றங்கள்",
        learningObjective: "ஆற்றல் எவ்வாறு வடிவம் மாறுகிறது என்பதைக் கண்டறியவும்.",
        missionObjective: "சூரிய பேனலின் வெளியீட்டு ஆற்றலைக் கண்டறியவும்.",
        hint: "சூரிய பேனல்கள் நம் வீடுகளுக்கு மின்சாரம் அளிக்கின்றன.",
        feedbackIncorrect: "சூரிய பேனல்கள் சூரிய ஒளியை மின்சாரமாக மாற்றுகின்றன.",
        logicPremise: "ஒரு சூரிய பேனல் ஒளி ஆற்றலை... ஆக மாற்றுகிறது.",
        logicOptions: ["ஒலி ஆற்றல்", "மின் ஆற்றல்", "வெப்ப ஆற்றல் மட்டுமே", "அணு ஆற்றல்"],
        logicAnswer: "மின் ஆற்றல்"
      },
      'sci-2-10': {
        missionTitle: "நிலை 2 பாஸ் — ஆற்றல் நிலைய மாஸ்டரி",
        story: "முக்கிய ஆற்றல் மற்றும் மின் சுற்று சவால்களைத் தீர்த்து ஆற்றல் ஆராய்ச்சி நிலையத்திற்கு மின்சாரத்தை மீட்டெடுக்கவும்!",
        primaryConcept: "அறிவியல் நிலை 2 மாஸ்டரி",
        learningObjective: "மின் சுற்றுகள், கடத்திகள் மற்றும் ஆற்றல் சூத்திரங்களைப் பயன்படுத்துங்கள்.",
        missionObjective: "மின்சாரத்தை மீட்டெடுக்க அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "மின் சுற்றுகள் எவ்வாறு செயல்படுகின்றன என்பதையும் வேகத்தைக் கணக்கிடுவதையும் நினைவில் கொள்க.",
        feedbackIncorrect: "ஒரு கட்டத்தில் தோல்வியடைந்தீர்கள். மீண்டும் முயற்சிக்கவும்!",
        phases: [
          {
            title: "மின் சுற்று சரிபார்ப்பு",
            description: "மின்சாரம் பாயத் தேவையானதைக் கண்டறியவும்.",
            instruction: "மின் சுற்று செயல்படுவதைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "மின் சுற்றில் மின்சாரம் பாய வைப்பது எது?",
            logicOptions: ["இடைவெளி", "முழுமையான வளையம்", "பல்ப் மட்டுமே", "உராய்வு"],
            logicAnswer: "முழுமையான வளையம்"
          },
          {
            title: "கம்பி பழுதுபார்ப்பு",
            description: "கம்பியைச் சரிசெய்ய சரியான பொருளைத் தேர்ந்தெடுக்கவும்.",
            instruction: "ஒரு கடத்தியைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "எது ஒரு கடத்தி?",
            logicOptions: ["ரப்பர்", "மரம்", "செப்பு கம்பி", "நெகிழி"],
            logicAnswer: "செப்பு கம்பி"
          },
          {
            title: "பேட்டரி இழப்பு",
            description: "காப்புப் பிரதி பேட்டரி தீர்ந்துவிட்டது.",
            instruction: "பேட்டரியில் உள்ள ஆற்றல் வகையைக் கண்டறியவும்.",
            logicPremise: "பேட்டரி தீர்ந்துவிட்டது. எந்த வகை ஆற்றல் தீர்ந்தது?",
            logicOptions: ["இயக்க ஆற்றல்", "ஒலி", "வேதியியல் (சேமிக்கப்பட்ட)", "அணு"],
            logicAnswer: "வேதியியல் (சேமிக்கப்பட்ட)"
          },
          {
            title: "ஜெனரேட்டர் வேகம்",
            description: "டர்பைனின் வேகத்தைக் கணக்கிடுங்கள்.",
            instruction: "வேகத்தைக் கணக்கிடுங்கள்."
          }
        ]
      },
      'sci-3-1': {
        missionTitle: "நுண்ணிய உலகம்",
        story: "செல்களின் நுண்ணிய உலகத்தை ஆராயுங்கள்.",
        primaryConcept: "செல் அமைப்பு",
        learningObjective: "உட்கருவை செல்லின் கட்டுப்பாட்டு மையமாக அடையாளம் காணவும்.",
        missionObjective: "செல்லின் கட்டுப்பாட்டு மையத்தைக் கண்டறியவும்.",
        hint: "இது செல்லின் மூளையாக செயல்படுகிறது.",
        feedbackIncorrect: "உட்கரு செல்லின் மூளை அல்லது கட்டுப்பாட்டு மையமாக செயல்படுகிறது.",
        logicPremise: "செல்லின் கட்டுப்பாட்டு மையம் எவ்வாறு அழைக்கப்படுகிறது?",
        logicOptions: ["செல் சுவர்", "உட்கரு", "பசுங்கணிகம்", "மைட்டோகாண்ட்ரியா"],
        logicAnswer: "உட்கரு"
      },
      'sci-3-2': {
        missionTitle: "மனித இயந்திரம்",
        story: "மனித உடல் எவ்வாறு இயங்குகிறது என்பதை ஆராயுங்கள்.",
        primaryConcept: "மனித உடல் அமைப்புகள்",
        learningObjective: "இதயத்தின் செயல்பாட்டைக் கண்டறியவும்.",
        missionObjective: "இரத்தத்தை பம்ப் செய்யும் உறுப்பைக் கண்டறியவும்.",
        hint: "இது உங்கள் நெஞ்சில் தொடர்ந்து துடிக்கிறது.",
        feedbackIncorrect: "இதயம் இரத்தத்தை பம்ப் செய்வதற்கு பொறுப்பான தசை ஆகும்.",
        logicPremise: "உடல் முழுவதும் இரத்தத்தை பம்ப் செய்யும் உறுப்பு எது?",
        logicOptions: ["நுரையீரல்", "மூளை", "இதயம்", "சிறுநீரகம்"],
        logicAnswer: "இதயம்"
      },
      'sci-3-3': {
        missionTitle: "தாவர ஆற்றல் ஆய்வகம்",
        story: "தாவரங்கள் தங்கள் சொந்த உணவைத் தயாரிக்க உதவுங்கள்.",
        primaryConcept: "ஒளிச்சேர்க்கை",
        learningObjective: "ஒளிச்சேர்க்கைக்கு தாவரங்களுக்கு என்ன தேவை என்பதைக் கண்டறியவும்.",
        missionObjective: "ஒளிச்சேர்க்கைக்கு விடுபட்ட காரணியைக் கண்டறியவும்.",
        hint: "இது மனிதர்கள் வெளிவிடும் ஒரு வாயு ஆகும்.",
        feedbackIncorrect: "தாவரங்களுக்கு சூரிய ஒளி, நீர் மற்றும் கார்பன் டை ஆக்சைடு தேவை.",
        logicPremise: "தாவரங்கள் உணவு தயாரிக்க சூரிய ஒளி, நீர் மற்றும் __ ஐப் பயன்படுத்துகின்றன.",
        logicOptions: ["ஆக்ஸிஜன்", "கார்பன் டை ஆக்சைடு", "நைட்ரஜன்", "ஹைட்ரஜன்"],
        logicAnswer: "கார்பன் டை ஆக்சைடு"
      },
      'sci-3-4': {
        missionTitle: "உணவுச் சங்கிலி",
        story: "உணவுச் சங்கிலியில் ஒரு உயிரினம் விடுபடுவதன் தாக்கத்தை பகுப்பாய்வு செய்யுங்கள்.",
        primaryConcept: "உணவுச் சங்கிலிகள் & சுற்றுச்சூழல்",
        learningObjective: "உணவுச் சங்கிலிகளின் பரஸ்பர தொடர்பைப் புரிந்துகொள்ளுங்கள்.",
        missionObjective: "முயல்கள் விடுபடுவதன் விளைவைத் தீர்மானிக்கவும்.",
        hint: "முயல்களை எது சாப்பிடுகிறது? முயல்கள் எதைச் சாப்பிடுகின்றன?",
        feedbackIncorrect: "முயல்கள் இல்லை என்றால், நரிகளுக்கு உணவு இருக்காது (எனவே குறையும்), புல் சாப்பிடப்படாது (எனவே அதிகரிக்கும்).",
        logicPremise: "ஒரு உணவுச் சங்கிலியில்: புல் → முயல் → நரி. அனைத்து முயல்களும் மறைந்தால் என்ன நடக்கும்?",
        logicOptions: ["புல் குறைகிறது, நரி அதிகரிக்கிறது", "புல் அதிகரிக்கிறது, நரி குறைகிறது", "எதுவும் மாறாது", "நரி வேகமாகப் பெருகும்"],
        logicAnswer: "புல் அதிகரிக்கிறது, நரி குறைகிறது"
      },
      'sci-3-5': {
        missionTitle: "சீரான சுற்றுச்சூழல்",
        story: "நமது உலகில் சிதைப்பவைகளின் பங்கைக் கண்டறியவும்.",
        primaryConcept: "சிதைப்பவைகள்",
        learningObjective: "சிதைப்பவைகளின் பங்கைப் புரிந்துகொள்ளுங்கள்.",
        missionObjective: "சிதைப்பவைகளின் பங்கைக் கண்டறியவும்.",
        hint: "அவை இயற்கையைச் சுத்தம் செய்கின்றன.",
        feedbackIncorrect: "சிதைப்பவைகள் இறந்த தாவரங்கள் மற்றும் விலங்குகளை மக்கச் செய்கின்றன.",
        logicPremise: "ஒரு சுற்றுச்சூழலில் சிதைப்பவைகள் என்ன செய்கின்றன?",
        logicOptions: ["சொந்த உணவைத் தயாரிக்கின்றன", "பிற விலங்குகளை வேட்டையாடுகின்றன", "இறந்த உயிரினங்களை மக்கச் செய்கின்றன", "ஆக்ஸிஜனை மட்டுமே உற்பத்தி செய்கின்றன"],
        logicAnswer: "இறந்த உயிரினங்களை மக்கச் செய்கின்றன"
      },
      'sci-3-6': {
        missionTitle: "நீர் பயணம்",
        story: "நீரின் சுழற்சிப் பயணத்தைக் கண்காணிக்கவும்.",
        primaryConcept: "நீர் சுழற்சி",
        learningObjective: "சுருங்குதல் செயல்முறையைக் கண்டறியவும்.",
        missionObjective: "செயல்முறையின் பெயரைக் கண்டறியவும்.",
        hint: "நீராவி குளிர்ந்து மேகங்களாக மாறுகிறது.",
        feedbackIncorrect: "வாயு குளிர்ந்து மீண்டும் திரவமாக மாறும்போது, அது சுருங்குதல் எனப்படும்.",
        logicPremise: "நீராவி உயர்ந்து, குளிர்ந்து, மீண்டும் நீர் துளிகளாக மாறுகிறது. இது... எனப்படும்.",
        logicOptions: ["ஆவியாதல்", "சுருங்குதல்", "மழைப்பொழிவு", "நீராவிப்போக்கு"],
        logicAnswer: "சுருங்குதல்"
      },
      'sci-3-7': {
        missionTitle: "வானிலை நிலையம்",
        story: "தினசரி வெப்பநிலை உயர்கிறது. அடுத்த அளவீட்டைக் கணிக்கவும்.",
        primaryConcept: "வானிலை தரவு பகுப்பாய்வு",
        learningObjective: "வெப்பநிலை போக்குகளைக் கணிக்கவும்.",
        missionObjective: "அடுத்த வெப்பநிலையைக் கணிக்கவும்.",
        hint: "வெப்பநிலை ஒவ்வொரு முறையும் 2°C உயர்கிறது.",
        feedbackIncorrect: "கடைசி எண்ணுடன் 2 ஐக் கூட்டவும்."
      },
      'sci-3-8': {
        missionTitle: "அழுத்தத்தில் உள்ள கோள்",
        story: "ஒரு புதிய நகரத்திற்கு மிகவும் நிலையான ஆற்றல் மூலத்தைத் தேர்ந்தெடுக்கவும்.",
        primaryConcept: "நிலையான வளங்கள்",
        learningObjective: "நிலையான ஆற்றல் மூலங்களை அடையாளம் காணவும்.",
        missionObjective: "மிகவும் நிலையான ஆற்றல் மூலத்தைத் தேர்ந்தெடுக்கவும்.",
        hint: "எந்த மூலம் புதுப்பிக்கத்தக்கது?",
        feedbackIncorrect: "சூரிய மின்சாரம் ஒரு புதுப்பிக்கத்தக்க மற்றும் நிலையான வளமாகும்."
      },
      'sci-3-9': {
        missionTitle: "பசுமை நகரம்",
        story: "சுற்றுச்சூழலைப் பாதுகாக்க நகரம் கொள்கைகளை அமல்படுத்த உதவுங்கள்.",
        primaryConcept: "சுற்றுச்சூழல் பாதுகாப்பு",
        learningObjective: "நெகிழி மாசுபாட்டைக் குறைக்கும் நடவடிக்கைகளைக் கண்டறியவும்.",
        missionObjective: "நெகிழி மாசுபாட்டைக் குறைக்கும் நடவடிக்கையைத் தேர்ந்தெடுக்கவும்.",
        hint: "மூலத்திலேயே கழிவுகளைக் குறைப்பதைப் பற்றி யோசியுங்கள்.",
        feedbackIncorrect: "ஒருமுறை மட்டுமே பயன்படுத்தும் நெகிழிகளைக் குறைப்பதே மாசுபாட்டைக் குறைக்க சிறந்த வழியாகும்.",
        logicPremise: "எந்த நடவடிக்கை நெகிழி மாசுபாட்டை மிகவும் குறைக்கிறது?",
        logicOptions: ["அதிக கார்களைப் பயன்படுத்துவது", "ஒருமுறை பயன்படுத்தும் நெகிழியைக் குறைப்பது", "கழிவுகளை எரிப்பது", "அதிக நீரைப் பயன்படுத்துவது"],
        logicAnswer: "ஒருமுறை பயன்படுத்தும் நெகிழியைக் குறைப்பது"
      },
      'sci-3-10': {
        missionTitle: "நிலை 3 பாஸ் — சுற்றுச்சூழல் சவால் மாஸ்டரி",
        story: "தாவர செல்கள், ஓசோன், நீர் சுழற்சி மற்றும் பசுமைத் தேர்வுகள் பற்றிய அறிவைப் பயன்படுத்தி சுற்றுச்சூழல் பேரழிவை நிறுத்துங்கள்!",
        primaryConcept: "அறிவியல் நிலை 3 மாஸ்டரி",
        learningObjective: "பூமி மற்றும் உயிர் அறிவியல் அறிவை ஒருங்கிணைத்துப் பயன்படுத்துங்கள்.",
        missionObjective: "சவாலை நிறுத்த அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "தாவரங்கள், ஓசோன் படலம், நீர் சுழற்சி பற்றிய தகவல்களை நினைவுகூருங்கள்.",
        feedbackIncorrect: "ஒரு கட்டத்தில் தோல்வியடைந்தீர்கள். மீண்டும் முயற்சிக்கவும்!",
        phases: [
          {
            title: "தாவர மீட்பு",
            description: "தாவரங்கள் சூரிய ஒளியை எவ்வாறு கிரகிக்கின்றன என்பதைக் கண்டறியவும்.",
            instruction: "சரியான உறுப்பைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "தாவர செல்லின் எந்தப் பகுதி சூரிய ஒளியை கிரகிக்கிறது?",
            logicOptions: ["உட்கரு", "செல் சுவர்", "பசுங்கணிகம்", "வாக்கியூல்"],
            logicAnswer: "பசுங்கணிகம்"
          },
          {
            title: "ஓசோன் சிதைவு",
            description: "சேதமடைந்த ஓசோன் படலத்தின் ஆபத்தைப் புரிந்து கொள்ளுங்கள்.",
            instruction: "ஓசோன் படலம் எதிலிருந்து நம்மைப் பாதுகாக்கிறது என்பதைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "ஓசோன் படலம் எதிலிருந்து நம்மைப் பாதுகாக்கிறது?",
            logicOptions: ["மழை", "புறஊதாக் கதிர்கள்", "காற்று", "ஒலி"],
            logicAnswer: "புறஊதாக் கதிர்கள்"
          },
          {
            title: "நீர் சுழற்சி ஓட்டம்",
            description: "நீர் மேகங்களில் சேரும் செயல்முறையைக் கண்டறியவும்.",
            instruction: "சரியான செயல்முறையைத் தேர்ந்தெடுக்கவும்."
          },
          {
            title: "தூய்மையான போக்குவரத்து",
            description: "மிகவும் சுற்றுச்சூழல் உகந்த போக்குவரத்து விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
            instruction: "பசுமைப் போக்குவரத்து விருப்பத்தைத் தேர்ந்தெடுக்கவும்."
          }
        ]
      },
      'sci-4-1': {
        missionTitle: "தெரியாத சோதனை",
        story: "நீங்கள் ஒரு புதிய சோதனையை வடிவமைக்கிறீர்கள். நீங்கள் செய்ய வேண்டிய முதல் விஷயம் என்ன?",
        primaryConcept: "அறிவியல் முறை",
        learningObjective: "அறிவியல் முறையின் முதல் படியைக் கண்டறியவும்.",
        missionObjective: "முதல் படியைத் தேர்ந்தெடுக்கவும்.",
        hint: "பதிலைக் கண்டுபிடிப்பதற்கு முன் உங்களிடம் இருக்க வேண்டும்...",
        feedbackIncorrect: "ஒவ்வொரு சோதனையும் ஒரு கேள்வியுடன் தொடங்குகிறது.",
        logicPremise: "அறிவியல் முறையின் முதல் படி...",
        logicOptions: ["சோதனை செய்வது", "முடிவுகளை எடுப்பது", "கேள்வி கேட்பது", "முடிவுகளைப் பதிவிடுவது"],
        logicAnswer: "கேள்வி கேட்பது"
      },
      'sci-4-2': {
        missionTitle: "நியாயமான சோதனை",
        story: "நமது முடிவுகள் செல்லுபடியாகும் என்பதை உறுதிப்படுத்த நியாயமான சோதனையை நடத்த வேண்டும்.",
        primaryConcept: "கட்டுப்படுத்தப்பட்ட மாறிகள்",
        learningObjective: "கட்டுப்படுத்தப்பட்ட மாறிகளின் பங்கைப் புரிந்துகொள்ளுங்கள்.",
        missionObjective: "எது மாறாமல் இருக்க வேண்டும் என்பதைக் கண்டறியவும்.",
        hint: "சோதனையை நியாயமாக்க இவற்றை நாம் 'கட்டுப்படுத்துகிறோம்'.",
        feedbackIncorrect: "நியாயமான சோதனைக்குக் கட்டுப்படுத்தப்பட்ட மாறிகள் மாறாமல் இருக்க வேண்டும்.",
        logicPremise: "ஒரு நியாயமான சோதனையில் எது மாறாமல் இருக்க வேண்டும்?",
        logicOptions: ["சார்பு மாறி", "சார்பற்ற மாறி", "கட்டுப்படுத்தப்பட்ட மாறிகள்", "முடிவு"],
        logicAnswer: "கட்டுப்படுத்தப்பட்ட மாறிகள்"
      },
      'sci-4-3': {
        missionTitle: "தரவு ஆய்வகம்",
        story: "சமீபத்திய சோதனையின் முடிவுகளை பகுப்பாய்வு செய்யுங்கள்.",
        primaryConcept: "தரவு பகுப்பாய்வு",
        learningObjective: "தரவில் உள்ள அமைப்பைக் கண்டறியவும்.",
        missionObjective: "அடுத்த தரவுப் புள்ளியைக் கணிக்கவும்.",
        hint: "எண்கள் 10 வீதம் அதிகரிக்கின்றன.",
        feedbackIncorrect: "கடைசி தரவுப் புள்ளியுடன் 10 ஐக் கூட்டவும்."
      },
      'sci-4-4': {
        missionTitle: "ஆற்றல் வலைப்பின்னல்",
        story: "காற்றாலைகளைப் பயன்படுத்தி நகரத்தின் ஆற்றல் வலைப்பின்னலை நிர்வகிக்கவும்.",
        primaryConcept: "காற்று ஆற்றல் மாற்றம்",
        learningObjective: "காற்றாலையின் வெளியீட்டு ஆற்றலைக் கண்டறியவும்.",
        missionObjective: "ஆற்றல் மாற்றத்தைக் கண்டறியவும்.",
        hint: "வீடுகளுக்கு மின்சாரம் அளிக்க காற்றாலைகள் இதை உருவாக்குகின்றன.",
        feedbackIncorrect: "காற்றாலைகள் காற்றின் இயக்க ஆற்றலை மின் ஆற்றலாக மாற்றுகின்றன.",
        logicPremise: "ஒரு காற்றாலை காற்று ஆற்றலை... ஆக மாற்றுகிறது.",
        logicOptions: ["வெப்பம்", "ஒலி", "மின் ஆற்றல்", "வேதியியல் ஆற்றல்"],
        logicAnswer: "மின் ஆற்றல்"
      },
      'sci-4-5': {
        missionTitle: "விசைச் சவால்",
        story: "அமைப்பை நிலையாக வைத்திருக்க விசைகளைச் சமநிலைப்படுத்துங்கள்.",
        primaryConcept: "நிகர விசை சமநிலை",
        learningObjective: "0 நிகர விசையைப் பெறத் தேவையான விசையைக் கணக்கிடுங்கள்.",
        missionObjective: "விடுபட்ட விசையைக் கணக்கிடுங்கள்.",
        hint: "30 கழித்தல் X என்பது 0 என்றால், X என்ன?",
        feedbackIncorrect: "30N விசையைச் சமநிலைப்படுத்த, சமமான மற்றும் எதிர் 30N விசை தேவை."
      },
      'sci-4-6': {
        missionTitle: "மனித உடல் அவசரநிலை",
        story: "ஒரு நோயாளிக்கு மூச்சு விடுவதில் சிரமம் உள்ளது. பாதிக்கப்பட்ட அமைப்பைக் கண்டறியவும்.",
        primaryConcept: "சுவாச மண்டலம்",
        learningObjective: "சுவாச மண்டலத்தைக் கண்டறியவும்.",
        missionObjective: "சரியான உடல் அமைப்பைத் தேர்ந்தெடுக்கவும்.",
        hint: "சுவாசம் என்பது மூச்சு விடுதலின் மற்றொரு சொல்.",
        feedbackIncorrect: "சுவாச மண்டலம் நுரையீரலை உள்ளடக்கியது மற்றும் மூச்சு விடுவதற்குப் பொறுப்பாகும்.",
        logicPremise: "ஒருவரால் சரியாக மூச்சு விட முடியவில்லை. எந்த மண்டலம் பாதிக்கப்பட்டுள்ளது?",
        logicOptions: ["செரிமான மண்டலம்", "நரம்பு மண்டலம்", "சுவாச மண்டலம்", "இரத்த ஓட்ட மண்டலம்"],
        logicAnswer: "சுவாச மண்டலம்"
      },
      'sci-4-7': {
        missionTitle: "சுற்றுச்சூழல் துப்பறியும் நபர்",
        story: "காடழிப்பு ஏன் குறைவான மழைப்பொழிவை ஏற்படுத்துகிறது என்பதை ஆராயுங்கள்.",
        primaryConcept: "நீராவிப்போக்கு & நீர் சுழற்சி",
        learningObjective: "நீர் சுழற்சியில் மரங்களின் பங்கைப் புரிந்துகொள்ளுங்கள்.",
        missionObjective: "காரணத்தைக் கண்டறியவும்.",
        hint: "மரங்கள் நீராவிப்போக்கு மூலம் நீராவியை வெளியிடுகின்றன.",
        feedbackIncorrect: "மரங்கள் நீராவிப்போக்கு மூலம் காற்றில் நீராவியை வெளியிடுகின்றன, இது மழைக்கு பங்களிக்கிறது.",
        logicPremise: "காடழிப்பு மழைப்பொழிவு குறையக் காரணமாகிறது. ஏன்?",
        logicOptions: ["மரங்கள் நேரடியாக மழையை உருவாக்குகின்றன", "மரங்கள் மழையை உறிஞ்சுகின்றன", "மரங்கள் காற்றில் நீராவியை வெளியிடுகின்றன (நீராவிப்போக்கு)", "மரங்கள் காற்றைத் தடுக்கின்றன"],
        logicAnswer: "மரங்கள் காற்றில் நீராவியை வெளியிடுகின்றன (நீராவிப்போக்கு)"
      },
      'sci-4-8': {
        missionTitle: "காலநிலை கட்டுப்பாட்டு அறை",
        story: "உலகளாவிய வெப்பநிலை உயரக் காரணமான வாயுக்களை பகுப்பாய்வு செய்யுங்கள்.",
        primaryConcept: "பசுமைக்குடில் விளைவு",
        learningObjective: "முக்கிய பசுமைக்குடில் வாயுவைக் கண்டறியவும்.",
        missionObjective: "பசுமைக்குடில் வாயுவைக் கண்டறியவும்.",
        hint: "இது புதைபடிவ எரிபொருட்களை எரிப்பதால் உருவாகும் வாயு.",
        feedbackIncorrect: "கார்பன் டை ஆக்சைடு பசுமைக்குடில் விளைவுக்குப் பங்களிக்கும் முக்கிய வாயுவாகும்.",
        logicPremise: "பசுமைக்குடில் விளைவுக்கு முக்கிய காரணமான வாயு எது?",
        logicOptions: ["ஆக்ஸிஜன்", "நைட்ரஜன்", "கார்பன் டை ஆக்சைடு", "ஹைட்ரஜன்"],
        logicAnswer: "கார்பன் டை ஆக்சைடு"
      },
      'sci-4-9': {
        missionTitle: "ஆய்வாளரின் இறுதி புதிர்",
        story: "உங்கள் தாவர சோதனையில் வெப்பநிலையின் பங்கைத் தீர்மானிக்கவும்.",
        primaryConcept: "சார்பற்ற மாறி",
        learningObjective: "சார்பற்ற மாறியைக் கண்டறியவும்.",
        missionObjective: "மாறியின் வகையைக் கண்டறியவும்.",
        hint: "'நான்' மாற்றும் மாறி 'சார்பற்ற' மாறி ஆகும்.",
        feedbackIncorrect: "ஆய்வாளர் வேண்டும் என்றே மாற்றும் மாறி சார்பற்ற மாறி ஆகும்.",
        logicPremise: "ஒரு ஆய்வாளர் தாவர வளர்ச்சியைச் சோதிக்கும் சோதனையில் வெப்பநிலையை மட்டுமே மாற்றுகிறார். வெப்பநிலை என்பது...",
        logicOptions: ["கட்டுப்படுத்தப்பட்ட மாறி", "சார்பு மாறி", "சார்பற்ற மாறி", "முடிவு"],
        logicAnswer: "சார்பற்ற மாறி"
      },
      'sci-4-10': {
        missionTitle: "நிலை 4 பாஸ் — எதிர்கால நகர நெருக்கடி மாஸ்டரி",
        story: "இறுதிச் சோதனை! எதிர்கால நகரத்தை முழுமையான சரிவிலிருந்து காப்பாற்ற உங்கள் அனைத்து அறிவியல் மாஸ்டரியையும் பயன்படுத்துங்கள்.",
        primaryConcept: "அறிவியல் நிலை 4 முதன்மை மாஸ்டரி",
        learningObjective: "ஒருங்கிணைந்த அறிவியல் கோட்பாடுகளை மாஸ்டர் செய்யுங்கள்.",
        missionObjective: "நகரத்தைக் காப்பாற்ற அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "அறிவியலின் முழு மாஸ்டரியையும் பயன்படுத்துங்கள்.",
        feedbackIncorrect: "ஒரு கட்டத்தில் தோல்வியடைந்தீர்கள். மீண்டும் முயற்சிக்கவும்!",
        phases: [
          {
            title: "முறை நெறிமுறை",
            description: "சரியான அறிவியல் நெறிமுறையை நிறுவுங்கள்.",
            instruction: "சரியான வரிசையைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "அறிவியல் முறையின் சரியான வரிசை எது?",
            logicOptions: [
              "சோதனை→கேள்வி→கருதுகோள்→முடிவுகள்",
              "கேள்வி→கருதுகோள்→சோதனை→முடிவுகள்→முடிவுரை",
              "முடிவுகள்→கேள்வி→சோதனை→கருதுகோள்",
              "கருதுகோள்→கேள்வி→முடிவுகள்→சோதனை"
            ],
            logicAnswer: "கேள்வி→கருதுகோள்→சோதனை→முடிவுகள்→முடிவுரை"
          },
          {
            title: "வளிமண்டல சமநிலை",
            description: "CO2 ஐ நிர்வகிக்கும் இயற்கை சுழற்சியைக் கண்டறியவும்.",
            instruction: "சரியான சுழற்சியைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "ஒரு நகரம் CO2 ஐ வெளியிடுகிறது. அருகில் உள்ள காட்டில் உள்ள தாவரங்கள் அதை உறிஞ்சுகின்றன. இது எதற்கு ஒரு எடுத்துகாட்டு?",
            logicOptions: ["நீர் சுழற்சி", "கார்பன் சுழற்சி", "நைட்ரஜன் சுழற்சி", "ஆக்ஸிஜன் சுழற்சி"],
            logicAnswer: "கார்பன் சுழற்சி"
          },
          {
            title: "ஆற்றல் வெளியீடு",
            description: "கேடயங்களுக்குத் தேவையான ஆற்றலைக் கணக்கிடுங்கள்.",
            instruction: "ஆற்றலைக் கணக்கிடுங்கள்."
          },
          {
            title: "நகர்ப்புற சூழலியல்",
            description: "உள்ளூர் வனவிலங்குகளைக் காப்பாற்ற திட்டத்தைச் செயல்படுத்துங்கள்.",
            instruction: "பல்லுயிர் பெருக்கத்திற்கு சிறந்த நடவடிக்கையைத் தேர்ந்தெடுக்கவும்.",
            logicPremise: "ஒரு நகரத்தில் பல்லுயிர் பெருக்கத்தை சிறப்பாகப் பாதுகாக்கும் நடவடிக்கை எது?",
            logicOptions: [
              "அதிக சாலைகளை அமைப்பது",
              "உள்நாட்டு மரங்களை நட்டு பசுமைப் பாதைகளை உருவாக்குவது",
              "அனைத்து ஆறுகளையும் அகற்றுவது",
              "கட்டிடங்களின் உயரத்தை அதிகரிப்பது"
            ],
            logicAnswer: "உள்நாட்டு மரங்களை நட்டு பசுமைப் பாதைகளை உருவாக்குவது"
          }
        ]
      }
    },
    fragments: {
      f1: "அறிவியல் துண்டு 1",
      f2: "அறிவியல் துண்டு 2",
      f3: "அறிவியல் துண்டு 3",
      f4: "அறிவியல் துண்டு 4",
      acquired: "அறிவியல் கல் துண்டு பெறப்பட்டது!",
      desc: "அறிவியல் கல்லின் ஒரு துண்டை பெற்றுள்ளாய்."
    },
    stone: {
      title: "அறிவியல் கல்",
      acquired: "அறிவியல் கல் பெறப்பட்டது!",
      desc: "நீ அறிவியல் பாதையை மாஸ்டர் செய்து பிரபஞ்சத்தின் ரகசியங்களைத் திறந்துவிட்டாய்."
    },
    achievements: {
      initiate: { title: "அறிவியல் தொடக்க வீரர்", desc: "அறிவியல் பிரிவின் நிலை 1 ஐ முடித்தார்." },
      physics: { title: "இயற்பியல் முன்னோடி", desc: "இயக்கம், விசைகள் மற்றும் இயற்பியல் விதிகளை மாஸ்டர் செய்தார்." },
      chemistry: { title: "வேதியியல் ஆய்வாளர்", desc: "பருப்பொருளின் நிலைகள், வினைகள் மற்றும் pH ஐ மாஸ்டர் செய்தார்." },
      biology: { title: "உயிரியல் கண்டுபிடிப்பாளர்", desc: "செல்கள், மனித அமைப்புகள் மற்றும் சூழலியலை மாஸ்டர் செய்தார்." },
      master: { title: "அறிவியல் மாஸ்டர்", desc: "அனைத்து 40 அறிவியல் நிலைகளையும் முடித்து அறிவியல் கல்லை இணைத்தார்!" }
    }
  },

  hi: {
    title: "विज्ञान क्षेत्र",
    subtitle: "प्राकृतिक दुनिया और वैज्ञानिक खोज",
    intro: "प्राकृतिक ब्रह्मांड के मूलभूत नियमों को समझने के लिए जीव विज्ञान, रसायन विज्ञान और भौतिकी का अन्वेषण करें।",
    stages: {
      'stage-1': {
        title: "स्टेज 1 — खोज",
        subtitle: "विज्ञान के आधार",
        desc: "प्राकृतिक बलों का अवलोकन करें, भौतिक मात्राओं को मापें और पदार्थ की अवस्थाओं को पहचानें।",
        concept: "पदार्थ और मापन",
        learningObjective: "पदार्थ की अवस्थाओं, ऊष्मा स्थानांतरण, प्रकाश, ध्वनि और बलों को समझें।",
        reward: "विज्ञान टुकड़ा 1"
      },
      'stage-2': {
        title: "स्टेज 2 — समझें",
        subtitle: "ऊर्जा और प्रणालियां",
        desc: "घर्षण, ऊर्जा रूपों, विद्युत परिपथों, घनत्व और रासायनिक परिवर्तनों का अन्वेषण करें।",
        concept: "ऊर्जा और पदार्थ प्रणालियां",
        learningObjective: "गति, परिपथ चालकता, pH संतुलन और ऊर्जा परिवर्तनों का विश्लेषण करें।",
        reward: "विज्ञान टुकड़ा 2"
      },
      'stage-3': {
        title: "स्टेज 3 — जीवन और पृथ्वी",
        subtitle: "पारिस्थितिकी तंत्र और जीवन विज्ञान",
        desc: "कोशिकाओं, अंग प्रणालियों, प्रकाश संश्लेषण, खाद्य श्रृंखलाओं और जल चक्र की जांच करें।",
        concept: "जीवित प्रणालियां और पृथ्वी",
        learningObjective: "जैविक कार्यों, पारिस्थितिक संतुलन और पर्यावरण संरक्षण में महारत हासिल करें।",
        reward: "विज्ञान टुकड़ा 3"
      },
      'stage-4': {
        title: "स्टेज 4 — महारत",
        subtitle: "वैज्ञानिक विधि और महारत",
        desc: "वैज्ञानिक विधि, चर नियंत्रण, डेटा मॉडलिंग और पर्यावरणीय संकट नियंत्रण लागू करें।",
        concept: "वैज्ञानिक जांच और कोर महारत",
        learningObjective: "बहु-चर प्रयोगों को एकीकृत करें और पारिस्थितिक संतुलन बहाल करें।",
        reward: "विज्ञान टुकड़ा 4 और विज्ञान पत्थर"
      }
    },
    levels: {
      'sci-1-1': {
        missionTitle: "रहस्यमयी प्रयोगशाला",
        story: "प्रयोगशाला में एक अजीब पदार्थ दिखाई दिया।",
        primaryConcept: "अवलोकन",
        learningObjective: "गुणों के आधार पर पदार्थ का वर्गीकरण करें।",
        missionObjective: "पदार्थ का वर्गीकरण करें।",
        hint: "उन वस्तुओं के बारे में सोचें जिनका निश्चित आकार होता है।",
        feedbackIncorrect: "गलत! याद रखें, पदार्थ की केवल एक अवस्था का निश्चित आकार होता है।",
        logicPremise: "एक नया पदार्थ मिला है। यह कठोर है, इसका निश्चित आकार है, और इसे डाला नहीं जा सकता। यह कौन सी अवस्था है?",
        logicOptions: ["ठोस", "द्रव", "गैस"],
        logicAnswer: "ठोस"
      },
      'sci-1-2': {
        missionTitle: "टूटा हुआ सेंसर",
        story: "हमें तापमान मापना है, लेकिन स्वचालित सेंसर टूट गया है!",
        primaryConcept: "मापन",
        learningObjective: "तापमान मापने के लिए सही उपकरण चुनें।",
        missionObjective: "सही उपकरण चुनें।",
        hint: "थर्मो का अर्थ है ऊष्मा।",
        feedbackIncorrect: "वह उपकरण कुछ और मापता है। पुनः प्रयास करें!",
        logicPremise: "एक वैज्ञानिक को द्रव का तापमान मापना है। उसे किस उपकरण का उपयोग करना चाहिए?",
        logicOptions: ["पैमाना", "थर्मामीटर", "तराजू", "मापक कप"],
        logicAnswer: "थर्मामीटर"
      },
      'sci-1-3': {
        missionTitle: "बर्फ कक्ष",
        story: "कक्ष में तापमान प्रति मिनट 10 डिग्री बढ़ रहा है, जिससे बर्फ पिघल रही है।",
        primaryConcept: "पदार्थ की अवस्थाएं",
        learningObjective: "तापमान परिवर्तन का पैटर्न समझें।",
        missionObjective: "अगले तापमान का अनुमान लगाएं।",
        hint: "अंतिम संख्या में 10 जोड़ें।",
        feedbackIncorrect: "पैटर्न की पुनः जांच करें। यह हर बार 10 बढ़ता है।"
      },
      'sci-1-4': {
        missionTitle: "अदृश्य गैस",
        story: "हम सीलबंद कंटेनरों में हवा के दबाव का प्रयोग कर रहे हैं।",
        primaryConcept: "गैस",
        learningObjective: "समझें कि गैसों को संपीडित किया जा सकता है।",
        missionObjective: "दबाई गई हवा का क्या होता है, यह निर्धारित करें।",
        hint: "गैसों को छोटे स्थानों में दबाया जा सकता है।",
        feedbackIncorrect: "द्रवों के विपरीत, गैसों को छोटे स्थानों में दबाया जा सकता है।",
        logicPremise: "आप एक बंद सिरिंज के प्लंजर को दबाते हैं। अंदर की हवा...",
        logicOptions: ["बड़ी होती है", "संपीडित होती है (छोटी होती है)", "गायब होती है", "द्रव बनती है"],
        logicAnswer: "संपीडित होती है (छोटी होती है)"
      },
      'sci-1-5': {
        missionTitle: "प्रकाश पथ",
        story: "सेंसर को सक्रिय करने के लिए दर्पणों का उपयोग करके लेजर बीम को गाइड करें।",
        primaryConcept: "प्रकाश परावर्तन",
        learningObjective: "परावर्तन सिद्धांतों के आधार पर पथ को नेविगेट करें।",
        missionObjective: "बाधाओं से बचकर लक्ष्य तक पहुंचें।",
        hint: "[1,0] पर बाधा से बचें।",
        feedbackIncorrect: "आप किसी बाधा से टकरा गए या सीमा से बाहर चले गए!"
      },
      'sci-1-6': {
        missionTitle: "ध्वनि संकेत",
        story: "हम इको कक्ष में दीवारों से टकराने वाले ध्वनि कंपनों की गिनती कर रहे हैं।",
        primaryConcept: "ध्वनि कंपन",
        learningObjective: "ध्वनि उछाल में पैटर्न की पहचान करें।",
        missionObjective: "अगली उछाल संख्या खोजें।",
        hint: "संख्याएं 1 बढ़ रही हैं।",
        feedbackIncorrect: "बस 1 जोड़कर गिनें!"
      },
      'sci-1-7': {
        missionTitle: "ऊष्मा कक्ष",
        story: "विभिन्न सामग्रियों को उनके तापीय गुणों के आधार पर ऊष्मा इकाइयां आवंटित करें।",
        primaryConcept: "ऊष्मा स्थानांतरण",
        learningObjective: "भिन्नों के अनुसार इकाइयों का वितरण करें।",
        missionObjective: "12 ऊष्मा इकाइयां आवंटित करें।",
        hint: "12 का आधा 6 है, एक तिहाई 4 है...",
        feedbackIncorrect: "प्रत्येक सामग्री के लिए 12 के भिन्नों की गणना करें!"
      },
      'sci-1-8': {
        missionTitle: "चुंबकीय ताला",
        story: "यदि आप चुंबकीय सामग्री चुनते हैं तभी ताला खुलेगा।",
        primaryConcept: "चुंबकत्व",
        learningObjective: "चुंबकीय सामग्रियों की पहचान करें।",
        missionObjective: "चुंबकीय वस्तु चुनें।",
        hint: "लोहे जैसी कुछ धातुएं चुंबकीय होती हैं।",
        feedbackIncorrect: "केवल कुछ धातुएं ही चुंबक की ओर आकर्षित होती हैं।",
        logicPremise: "इनमें से कौन सी सामग्री चुंबक की ओर आकर्षित होती है?",
        logicOptions: ["प्लास्टिक चम्मच", "लोहे की कील", "कांच का कप", "रबर बैंड"],
        logicAnswer: "लोहे की कील"
      },
      'sci-1-9': {
        missionTitle: "बल परीक्षण",
        story: "एक भारी बॉक्स को हिलाने के लिए 15N के कुल बल की आवश्यकता होती है।",
        primaryConcept: "बल",
        learningObjective: "घर्षण को ध्यान में रखते हुए कुल बल की गणना करें।",
        missionObjective: "कुल बल हल करें।",
        hint: "20 में से 5 घटाएं।",
        feedbackIncorrect: "20 घटा 5 वह संख्या नहीं है।"
      },
      'sci-1-10': {
        missionTitle: "स्टेज 1 बॉस — खोज प्रयोगशाला महारत",
        story: "प्रयोगशाला को सुरक्षित करने के लिए पदार्थ, ऊष्मा और चुंबकत्व के सभी आधारों में महारत हासिल करें!",
        primaryConcept: "व्यापक विज्ञान स्टेज 1 महारत",
        learningObjective: "पदार्थ, ऊष्मा और चुंबकत्व की अवधारणाओं को लागू करें।",
        missionObjective: "प्रयोगशाला को स्थिर करने के लिए सभी 4 चरणों को पूरा करें।",
        hint: "पदार्थ, ऊष्मा और चुंबक के बारे में सीखी गई हर बात याद करें।",
        feedbackIncorrect: "आप एक चरण में असफल हो गए। पुनः प्रयास करें!",
        phases: [
          {
            title: "भाप रिसाव",
            description: "भाप की पदार्थ अवस्था पहचानें।",
            instruction: "सही पदार्थ अवस्था चुनें।",
            logicPremise: "उबलते पानी से निकलने वाली भाप कौन सी अवस्था है?",
            logicOptions: ["ठोस", "द्रव", "गैस", "प्लाज्मा"],
            logicAnswer: "गैस"
          },
          {
            title: "तापीय मरम्मत",
            description: "कूलिंग यूनिट को ठीक करने के लिए एक अच्छा चालक चुनें।",
            instruction: "ऊष्मा का अच्छा चालक चुनें।",
            logicPremise: "कौन सी सामग्री ऊष्मा की अच्छी चालक है?",
            logicOptions: ["लकड़ी", "प्लास्टिक", "धातु", "रबर"],
            logicAnswer: "धातु"
          },
          {
            title: "तापमान वृद्धि",
            description: "प्रयोगशाला में तापमान तेजी से बढ़ रहा है!",
            instruction: "अगली तापमान रीडिंग का अनुमान लगाएं।"
          },
          {
            title: "चुंबकीय रोकथाम",
            description: "बताएं कि चुंबक क्यों प्रतिकर्षित होते हैं।",
            instruction: "सही चुंबकीय नियम चुनें।",
            logicPremise: "एक चुंबक दूसरे चुंबक को प्रतिकर्षित करता है। क्यों?",
            logicOptions: ["वे अलग धातुएं हैं", "समान ध्रुव एक दूसरे के सामने हैं", "एक भारी है", "उन पर कोई आवेश नहीं है"],
            logicAnswer: "समान ध्रुव एक दूसरे के सामने हैं"
          }
        ]
      },
      'sci-2-1': {
        missionTitle: "भागा हुआ रोबोट",
        story: "एक रोबोट दीवार की ओर बढ़ रहा है! इसे सुरक्षित स्थान पर नेविगेट करें।",
        primaryConcept: "गति और निर्देशांक",
        learningObjective: "बाधाओं से बचकर ग्रिड को नेविगेट करें।",
        missionObjective: "रोबोट को लक्ष्य तक ले जाएं।",
        hint: "[1,1] और [2,0] पर बाधाओं से सावधान रहें।",
        feedbackIncorrect: "रोबोट दुर्घटनाग्रस्त हो गया! दूसरा रास्ता आज़माएं।"
      },
      'sci-2-2': {
        missionTitle: "घर्षण ट्रैक",
        story: "हमें बचाव स्लेज को जल्दी खिसकाना है। सबसे कम घर्षण वाली सतह चुनें।",
        primaryConcept: "घर्षण",
        learningObjective: "सबसे कम घर्षण वाली सतह की पहचान करें।",
        missionObjective: "फिसलने के लिए इष्टतम सतह चुनें।",
        hint: "कौन सी सतह सबसे फिसलन भरी है?",
        feedbackIncorrect: "उस सतह पर बहुत अधिक घर्षण है!"
      },
      'sci-2-3': {
        missionTitle: "ऊर्जा कोर",
        story: "ऊर्जा कोर को काम करने के लिए एक विशिष्ट प्रकार की ऊर्जा की आवश्यकता होती है।",
        primaryConcept: "ऊर्जा रूप",
        learningObjective: "गतिज ऊर्जा की पहचान करें।",
        missionObjective: "गतिमान वस्तु में ऊर्जा के प्रकार की पहचान करें।",
        hint: "गति की ऊर्जा कहलाती है...",
        feedbackIncorrect: "गतिज ऊर्जा गति की ऊर्जा है।",
        logicPremise: "पहाड़ी से नीचे लुढ़कती गेंद में किस प्रकार की ऊर्जा होती है?",
        logicOptions: ["रासायनिक", "गतिज ऊर्जा", "ध्वनि", "परमाणु"],
        logicAnswer: "गतिज ऊर्जा"
      },
      'sci-2-4': {
        missionTitle: "सर्किट कक्ष",
        story: "लाइट चली गई है! हमें विद्युत परिपथ को ठीक करना होगा।",
        primaryConcept: "बिजली और सर्किट",
        learningObjective: "काम करने वाले सर्किट की आवश्यकताओं को समझें।",
        missionObjective: "पहचानें कि बिजली बहने के लिए क्या आवश्यक है।",
        hint: "बिजली को एक निरंतर पथ की आवश्यकता होती है।",
        feedbackIncorrect: "एक परिपथ को एक पूर्ण लूप और बिजली स्रोत की आवश्यकता होती है।",
        logicPremise: "बिजली बहने के लिए सर्किट में क्या होना चाहिए?",
        logicOptions: ["एक बैटरी और एक अंतर", "बैटरी के साथ एक पूर्ण लूप", "केवल एक तार", "दो बैटरी"],
        logicAnswer: "बैटरी के साथ एक पूर्ण लूप"
      },
      'sci-2-5': {
        missionTitle: "चालक परीक्षण",
        story: "ग्रिड की मरम्मत के लिए इन 6 सामग्रियों को चालकों और इंसुलेटरों में छांटें।",
        primaryConcept: "चालक और इंसुलेटर",
        learningObjective: "सामग्रियों को चालक या इंसुलेटर के रूप में वर्गीकृत करें।",
        missionObjective: "6 वस्तुओं को सही ढंग से छांटें।",
        hint: "धातुएं आमतौर पर चालक होती हैं।",
        feedbackIncorrect: "सुनिश्चित करें कि आपने 3 वस्तुएं चालकों में और 3 इंसुलेटरों में रखी हैं!"
      },
      'sci-2-6': {
        missionTitle: "घनत्व रहस्य",
        story: "हम पानी की टंकियों में रहस्यमयी वस्तुओं का परीक्षण कर रहे हैं।",
        primaryConcept: "घनत्व और उत्प्लावकता",
        learningObjective: "घनत्व और डूबने के बीच संबंध को समझें।",
        missionObjective: "वस्तु के घनत्व का निष्कर्ष निकालें।",
        hint: "जो चीजें पानी से भारी होती हैं वे डूब जाती हैं।",
        feedbackIncorrect: "यदि यह डूबती है, तो यह द्रव से अधिक घनी है।",
        logicPremise: "एक वस्तु पानी में डूब जाती है। पानी की तुलना में इसके घनत्व के बारे में यह क्या बताता है?",
        logicOptions: ["पानी से कम घना", "पानी जैसा समान घनत्व", "पानी से अधिक घना", "कोई घनत्व नहीं"],
        logicAnswer: "पानी से अधिक घना"
      },
      'sci-2-7': {
        missionTitle: "रासायनिक परिवर्तन",
        story: "कागज जलने पर क्या होता है, इसका विश्लेषण करें।",
        primaryConcept: "रासायनिक परिवर्तन",
        learningObjective: "भौतिक और रासायनिक परिवर्तनों में अंतर करें।",
        missionObjective: "परिवर्तन के प्रकार की पहचान करें।",
        hint: "क्या आप राख को वापस कागज बना सकते हैं?",
        feedbackIncorrect: "जब कोई नया पदार्थ बनता है और उसे आसानी से उलटा नहीं जा सकता, तो वह रासायनिक परिवर्तन है।",
        logicPremise: "कागज जलाना एक __ परिवर्तन है क्योंकि इसे बदला नहीं जा सकता।",
        logicOptions: ["भौतिक", "रासायनिक", "चुंबकीय", "विद्युत"],
        logicAnswer: "रासायनिक"
      },
      'sci-2-8': {
        missionTitle: "गुप्त घोल",
        story: "गुप्त घोल का pH परीक्षण करके पता लगाएं कि यह क्या है।",
        primaryConcept: "अम्ल और क्षार",
        learningObjective: "pH स्केल की व्याख्या करें।",
        missionObjective: "pH के आधार पर गुणों का निर्धारण करें।",
        hint: "कम pH संख्याएं (7 से नीचे) अम्लीय होती हैं।",
        feedbackIncorrect: "pH 2 बहुत कम है, जो इसे एक प्रबल अम्ल बनाता है।",
        logicPremise: "नींबू के रस का pH 2 होता है। इसका मतलब है कि यह...",
        logicOptions: ["उदासीन", "एक प्रबल अम्ल", "एक दुर्बल क्षार", "एक प्रबल क्षार"],
        logicAnswer: "एक प्रबल अम्ल"
      },
      'sci-2-9': {
        missionTitle: "ऊर्जा स्थानांतरण",
        story: "विभिन्न उपकरणों के लिए ऊर्जा परिवर्तनों का नक्शा बनाएं।",
        primaryConcept: "ऊर्जा रूपांतरण",
        learningObjective: "पहचानें कि ऊर्जा रूप कैसे बदलती है।",
        missionObjective: "सौर पैनल की आउटपुट ऊर्जा की पहचान करें।",
        hint: "सौर पैनल हमारे घरों को रोशन करते हैं।",
        feedbackIncorrect: "सौर पैनल सूर्य के प्रकाश को बिजली में बदलते हैं।",
        logicPremise: "एक सौर पैनल प्रकाश ऊर्जा को... में बदलता है।",
        logicOptions: ["ध्वनि ऊर्जा", "विद्युत ऊर्जा", "केवल ऊष्मा ऊर्जा", "परमाणु ऊर्जा"],
        logicAnswer: "विद्युत ऊर्जा"
      },
      'sci-2-10': {
        missionTitle: "स्टेज 2 बॉस — ऊर्जा स्टेशन महारत",
        story: "प्रमुख ऊर्जा और सर्किट चुनौतियों को हल करके ऊर्जा अनुसंधान स्टेशन की बिजली बहाल करें!",
        primaryConcept: "व्यापक विज्ञान स्टेज 2 महारत",
        learningObjective: "सर्किट, चालक और ऊर्जा सूत्रों को लागू करें।",
        missionObjective: "बिजली बहाल करने के लिए सभी 4 चरणों को पूरा करें।",
        hint: "याद रखें कि सर्किट कैसे काम करते हैं और गति की गणना कैसे की जाती है।",
        feedbackIncorrect: "आप एक चरण में असफल हो गए। पुनः प्रयास करें!",
        phases: [
          {
            title: "सर्किट जांच",
            description: "बिजली बहने की आवश्यकता पहचानें।",
            instruction: "चुनें कि सर्किट कैसे काम करता है।",
            logicPremise: "सर्किट में बिजली कैसे बहती है?",
            logicOptions: ["एक अंतर", "एक पूर्ण लूप", "केवल बल्ब", "घर्षण"],
            logicAnswer: "एक पूर्ण लूप"
          },
          {
            title: "तार मरम्मत",
            description: "तार ठीक करने के लिए सही सामग्री चुनें।",
            instruction: "एक चालक चुनें।",
            logicPremise: "कौन सा चालक है?",
            logicOptions: ["रबर", "लकड़ी", "तांबे का तार", "प्लास्टिक"],
            logicAnswer: "तांबे का तार"
          },
          {
            title: "बैटरी समाप्त",
            description: "बैकअप बैटरी समाप्त हो गई।",
            instruction: "बैटरी में ऊर्जा प्रकार की पहचान करें।",
            logicPremise: "बैटरी खत्म हो गई। किस प्रकार की ऊर्जा खत्म हुई?",
            logicOptions: ["गतिज", "ध्वनि", "रासायनिक (संचित)", "परमाणु"],
            logicAnswer: "रासायनिक (संचित)"
          },
          {
            title: "जनरेटर गति",
            description: "टर्बाइन की गति की गणना करें।",
            instruction: "गति हल करें।"
          }
        ]
      },
      'sci-3-1': {
        missionTitle: "सूक्ष्म दुनिया",
        story: "कोशिकाओं की सूक्ष्म दुनिया का अन्वेषण करें।",
        primaryConcept: "कोशिका संरचना",
        learningObjective: "केंद्रक को कोशिका के नियंत्रण केंद्र के रूप में पहचानें।",
        missionObjective: "कोशिका के नियंत्रण केंद्र की पहचान करें।",
        hint: "यह कोशिका के मस्तिष्क के रूप में कार्य करता है।",
        feedbackIncorrect: "केंद्रक कोशिका के मस्तिष्क या नियंत्रण केंद्र के रूप में कार्य करता है।",
        logicPremise: "कोशिका के नियंत्रण केंद्र को क्या कहा जाता है?",
        logicOptions: ["कोशिका भित्ति", "केंद्रक", "क्लोरोप्लास्ट", "माइटोकॉन्ड्रिया"],
        logicAnswer: "केंद्रक"
      },
      'sci-3-2': {
        missionTitle: "मानव मशीन",
        story: "जांच करें कि मानव शरीर कैसे काम करता है।",
        primaryConcept: "मानव शरीर प्रणालियां",
        learningObjective: "हृदय के कार्य की पहचान करें।",
        missionObjective: "रक्त पंप करने वाले अंग की पहचान करें।",
        hint: "यह आपकी छाती में लगातार धड़कता है।",
        feedbackIncorrect: "हृदय रक्त पंप करने के लिए जिम्मेदार मांसपेशी है।",
        logicPremise: "शरीर में रक्त कौन सा अंग पंप करता है?",
        logicOptions: ["फेफड़े", "मस्तिष्क", "हृदय", "गुर्दा"],
        logicAnswer: "हृदय"
      },
      'sci-3-3': {
        missionTitle: "पौधा ऊर्जा लैब",
        story: "पौधों को अपना भोजन बनाने में मदद करें।",
        primaryConcept: "प्रकाश संश्लेषण",
        learningObjective: "पहचानें कि पौधों को प्रकाश संश्लेषण के लिए क्या चाहिए।",
        missionObjective: "प्रकाश संश्लेषण के लिए गायब घटक की पहचान करें।",
        hint: "यह एक गैस है जिसे मनुष्य बाहर छोड़ते हैं।",
        feedbackIncorrect: "पौधों को सूर्य के प्रकाश, पानी और कार्बन डाइऑक्साइड की आवश्यकता होती है।",
        logicPremise: "पौधे भोजन बनाने के लिए सूर्य के प्रकाश, पानी और __ का उपयोग करते हैं।",
        logicOptions: ["ऑक्सीजन", "कार्बन डाइऑक्साइड", "नाइट्रोजन", "हाइड्रोजन"],
        logicAnswer: "कार्बन डाइऑक्साइड"
      },
      'sci-3-4': {
        missionTitle: "खाद्य श्रृंखला",
        story: "खाद्य श्रृंखला में किसी प्रजाति के गायब होने के प्रभाव का विश्लेषण करें।",
        primaryConcept: "खाद्य श्रृंखलाएं और पारिस्थितिकी",
        learningObjective: "खाद्य श्रृंखलाओं के अंतरसंबंध को समझें।",
        missionObjective: "खरगोशों के गायब होने का परिणाम निर्धारित करें।",
        hint: "खरगोश क्या खाते हैं? खरगोशों को कौन खाता है?",
        feedbackIncorrect: "खरगोशों के बिना लोमड़ियों के पास भोजन नहीं होता (कम होती हैं), और घास नहीं खाई जाती (बढ़ती है)।",
        logicPremise: "एक खाद्य श्रृंखला में: घास → खरगोश → लोमड़ी। यदि सभी खरगोश गायब हो जाएं तो क्या होगा?",
        logicOptions: ["घास घटती है, लोमड़ी बढ़ती है", "घास बढ़ती है, लोमड़ी घटती है", "कुछ नहीं बदलता", "लोमड़ी तेजी से बढ़ती है"],
        logicAnswer: "घास बढ़ती है, लोमड़ी घटती है"
      },
      'sci-3-5': {
        missionTitle: "संतुलित पारिस्थितिकी तंत्र",
        story: "हमारी दुनिया में अपघटकों की भूमिका की खोज करें।",
        primaryConcept: "अपघटक",
        learningObjective: "अपघटकों की भूमिका को समझें।",
        missionObjective: "अपघटकों की भूमिका की पहचान करें।",
        hint: "वे प्रकृति की सफाई करते हैं।",
        feedbackIncorrect: "अपघटक मृत पौधों और जानवरों को तोड़ते हैं।",
        logicPremise: "पारिस्थितिकी तंत्र में अपघटक क्या करते हैं?",
        logicOptions: ["अपना भोजन स्वयं बनाते हैं", "अन्य जानवरों का शिकार करते हैं", "मृत जीवों को विघटित करते हैं", "केवल ऑक्सीजन बनाते हैं"],
        logicAnswer: "मृत जीवों को विघटित करते हैं"
      },
      'sci-3-6': {
        missionTitle: "जल यात्रा",
        story: "जल चक्र के माध्यम से पानी की यात्रा को ट्रैक करें।",
        primaryConcept: "जल चक्र",
        learningObjective: "संघनन की प्रक्रिया की पहचान करें।",
        missionObjective: "प्रक्रिया का नाम पहचानें।",
        hint: "जलवाष्प ठंडा होकर बादलों में बदलता है।",
        feedbackIncorrect: "जब गैस ठंडी होकर वापस द्रव बनती है, तो इसे संघनन कहते हैं।",
        logicPremise: "जलवाष्प ऊपर उठता है, ठंडा होता है और वापस पानी की बूंदों में बदल जाता है। इसे... कहा जाता है।",
        logicOptions: ["वाष्पीकरण", "संघनन", "वर्षण", "वाष्पोत्सर्जन"],
        logicAnswer: "संघनन"
      },
      'sci-3-7': {
        missionTitle: "मौसम स्टेशन",
        story: "दैनिक तापमान बढ़ रहा है। अगली रीडिंग का अनुमान लगाएं।",
        primaryConcept: "मौसम डेटा विश्लेषण",
        learningObjective: "तापमान के रुझान का अनुमान लगाएं।",
        missionObjective: "अगले तापमान का अनुमान लगाएं।",
        hint: "तापमान हर बार 2°C बढ़ता है।",
        feedbackIncorrect: "अंतिम संख्या में 2 जोड़ें।"
      },
      'sci-3-8': {
        missionTitle: "दबाव में ग्रह",
        story: "एक नए शहर के लिए सबसे टिकाऊ ऊर्जा स्रोत चुनें।",
        primaryConcept: "टिकाऊ संसाधन",
        learningObjective: "टिकाऊ ऊर्जा स्रोतों की पहचान करें।",
        missionObjective: "सबसे टिकाऊ ऊर्जा स्रोत चुनें।",
        hint: "कौन सा स्रोत नवीकरणीय है?",
        feedbackIncorrect: "सौर ऊर्जा एक नवीकरणीय और टिकाऊ संसाधन है।"
      },
      'sci-3-9': {
        missionTitle: "हरित शहर",
        story: "पर्यावरण की रक्षा के लिए शहर को नीतियां लागू करने में मदद करें।",
        primaryConcept: "पर्यावरण संरक्षण",
        learningObjective: "प्लास्टिक प्रदूषण को कम करने वाले कार्यों की पहचान करें।",
        missionObjective: "प्लास्टिक प्रदूषण कम करने वाला कार्य चुनें।",
        hint: "स्रोत पर कचरा कम करने के बारे में सोचें।",
        feedbackIncorrect: "एकल-उपयोग प्लास्टिक का उपयोग कम करना प्लास्टिक प्रदूषण घटाने का सबसे अच्छा तरीका है।",
        logicPremise: "कौन सा कार्य प्लास्टिक प्रदूषण को सबसे अधिक कम करता है?",
        logicOptions: ["अधिक कारों का उपयोग", "एकल-उपयोग प्लास्टिक कम करना", "कचरा जलाना", "अधिक पानी का उपयोग"],
        logicAnswer: "एकल-उपयोग प्लास्टिक कम करना"
      },
      'sci-3-10': {
        missionTitle: "स्टेज 3 बॉस — पारिस्थितिकी संकट महारत",
        story: "पादप कोशिकाओं, ओजोन, जल चक्र और पर्यावरण-अनुकूल विकल्पों के ज्ञान का उपयोग करके पारिस्थितिक आपदा को रोकें!",
        primaryConcept: "व्यापक विज्ञान स्टेज 3 महारत",
        learningObjective: "पृथ्वी और जीवन विज्ञान के एकीकृत ज्ञान को लागू करें।",
        missionObjective: "संकट रोकने के लिए सभी 4 चरणों को पूरा करें।",
        hint: "पौधों, ओजोन परत, जल चक्र के बारे में तथ्य याद करें।",
        feedbackIncorrect: "आप एक चरण में असफल हो गए। पुनः प्रयास करें!",
        phases: [
          {
            title: "पौधा बचाव",
            description: "पहचानें कि पौधे सूर्य का प्रकाश कैसे ग्रहण करते हैं।",
            instruction: "सही अंगक चुनें।",
            logicPremise: "पादप कोशिका का कौन सा भाग सूर्य का प्रकाश ग्रहण करता है?",
            logicOptions: ["केंद्रक", "कोशिका भित्ति", "क्लोरोप्लास्ट", "रसधानी"],
            logicAnswer: "क्लोरोप्लास्ट"
          },
          {
            title: "ओजोन क्षरण",
            description: "क्षतिग्रस्त ओजोन परत के खतरे को समझें।",
            instruction: "चुनें कि ओजोन परत हमें किससे बचाती है।",
            logicPremise: "ओजोन परत हमें किससे बचाती है?",
            logicOptions: ["बारिश", "यूवी किरणें", "हवा", "ध्वनि"],
            logicAnswer: "यूवी किरणें"
          },
          {
            title: "जल चक्र प्रवाह",
            description: "उस प्रक्रिया की पहचान करें जहां पानी बादलों में प्रवेश करता है।",
            instruction: "सही प्रक्रिया चुनें।"
          },
          {
            title: "स्वच्छ परिवहन",
            description: "सबसे पर्यावरण-अनुकूल परिवहन विकल्प चुनें।",
            instruction: "हरित परिवहन विकल्प चुनें।"
          }
        ]
      },
      'sci-4-1': {
        missionTitle: "अज्ञात प्रयोग",
        story: "आप एक नया प्रयोग तैयार कर रहे हैं। सबसे पहली चीज़ जो आपको करनी चाहिए वह क्या है?",
        primaryConcept: "वैज्ञानिक विधि",
        learningObjective: "वैज्ञानिक विधि के पहले चरण की पहचान करें।",
        missionObjective: "पहला चरण चुनें।",
        hint: "उत्तर खोजने से पहले आपके पास होना चाहिए...",
        feedbackIncorrect: "प्रत्येक प्रयोग एक प्रश्न से शुरू होता है।",
        logicPremise: "वैज्ञानिक विधि का पहला चरण है...",
        logicOptions: ["प्रयोग करना", "निष्कर्ष निकालना", "प्रश्न पूछना", "परिणाम रिकॉर्ड करना"],
        logicAnswer: "प्रश्न पूछना"
      },
      'sci-4-2': {
        missionTitle: "निष्पक्ष परीक्षण",
        story: "यह सुनिश्चित करने के लिए कि हमारे परिणाम मान्य हैं, हमें एक निष्पक्ष परीक्षण करना होगा।",
        primaryConcept: "नियंत्रित चर",
        learningObjective: "नियंत्रित चरों की भूमिका को समझें।",
        missionObjective: "पहचानें कि क्या समान रहना चाहिए।",
        hint: "परीक्षण को निष्पक्ष बनाने के लिए हम इन्हें 'नियंत्रित' करते हैं।",
        feedbackIncorrect: "निष्पक्ष परीक्षण के लिए नियंत्रित चर स्थिर रहने चाहिए।",
        logicPremise: "निष्पक्ष परीक्षण में क्या समान रहना चाहिए?",
        logicOptions: ["आश्रित चर", "स्वतंत्र चर", "नियंत्रित चर", "निष्कर्ष"],
        logicAnswer: "नियंत्रित चर"
      },
      'sci-4-3': {
        missionTitle: "डेटा लैब",
        story: "नवीनतम प्रयोग के परिणामों का विश्लेषण करें।",
        primaryConcept: "डेटा विश्लेषण",
        learningObjective: "डेटा में पैटर्न की पहचान करें।",
        missionObjective: "अगले डेटा बिंदु का अनुमान लगाएं।",
        hint: "संख्याएं 10 बढ़ रही हैं।",
        feedbackIncorrect: "अंतिम डेटा बिंदु में 10 जोड़ें।"
      },
      'sci-4-4': {
        missionTitle: "ऊर्जा नेटवर्क",
        story: "पवन टर्बाइनों का उपयोग करके शहर के ऊर्जा ग्रिड का प्रबंधन करें।",
        primaryConcept: "पवन ऊर्जा रूपांतरण",
        learningObjective: "पवन टर्बाइन की आउटपुट ऊर्जा की पहचान करें।",
        missionObjective: "ऊर्जा रूपांतरण की पहचान करें।",
        hint: "टर्बाइन घरों को रोशन करने के लिए इसे उत्पन्न करते हैं।",
        feedbackIncorrect: "पवन टर्बाइन गतिज पवन ऊर्जा को विद्युत ऊर्जा में बदलते हैं।",
        logicPremise: "एक पवन टर्बाइन पवन ऊर्जा को... में बदलता है।",
        logicOptions: ["ऊष्मा", "ध्वनि", "विद्युत ऊर्जा", "रासायनिक ऊर्जा"],
        logicAnswer: "विद्युत ऊर्जा"
      },
      'sci-4-5': {
        missionTitle: "बल चुनौती",
        story: "संरचना को स्थिर रखने के लिए बलों को संतुलित करें।",
        primaryConcept: "कुल बल संतुलन",
        learningObjective: "0 का कुल बल प्राप्त करने के लिए आवश्यक बल की गणना करें।",
        missionObjective: "गाएब बल को हल करें।",
        hint: "यदि 30 घटा X 0 है, तो X क्या है?",
        feedbackIncorrect: "30N बल को संतुलित करने के लिए, आपको एक समान और विपरीत 30N बल की आवश्यकता होती है।"
      },
      'sci-4-6': {
        missionTitle: "मानव शरीर आपातकाल",
        story: "एक मरीज को सांस लेने में तकलीफ हो रही है। प्रभावित प्रणाली की पहचान करें।",
        primaryConcept: "श्वसन प्रणाली",
        learningObjective: "श्वसन प्रणाली की पहचान करें।",
        missionObjective: "सही शरीर प्रणाली चुनें।",
        hint: "श्वसन सांस लेने का ही दूसरा नाम है।",
        feedbackIncorrect: "श्वसन प्रणाली में फेफड़े शामिल हैं और यह सांस लेने के लिए जिम्मेदार है।",
        logicPremise: "एक व्यक्ति ठीक से सांस नहीं ले पा रहा है। कौन सी प्रणाली प्रभावित है?",
        logicOptions: ["पाचन", "तंत्रिका", "श्वसन", "रक्त परिसंचरण"],
        logicAnswer: "श्वसन"
      },
      'sci-4-7': {
        missionTitle: "पारिस्थितिकी जासूस",
        story: "जांच करें कि वनों की कटाई से कम बारिश क्यों हो रही है।",
        primaryConcept: "वाष्पोत्सर्जन और जल चक्र",
        learningObjective: "जल चक्र में पेड़ों की भूमिका को समझें।",
        missionObjective: "कारण की पहचान करें।",
        hint: "पेड़ वाष्पोत्सर्जन नामक प्रक्रिया के माध्यम से जलवाष्प छोड़ते हैं।",
        feedbackIncorrect: "पेड़ वाष्पोत्सर्जन के माध्यम से हवा में जलवाष्प छोड़ते हैं, जो बारिश में योगदान देता है।",
        logicPremise: "वनों की कटाई से बारिश में कमी आती है। क्यों?",
        logicOptions: ["पेड़ सीधे बारिश करते हैं", "पेड़ बारिश अवशोषित करते हैं", "पेड़ हवा में जलवाष्प छोड़ते हैं (वाष्पोत्सर्जन)", "पेड़ हवा रोकते हैं"],
        logicAnswer: "पेड़ हवा में जलवाष्प छोड़ते हैं (वाष्पोत्सर्जन)"
      },
      'sci-4-8': {
        missionTitle: "जलवायु नियंत्रण कक्ष",
        story: "वैश्विक तापमान में वृद्धि का कारण बनने वाली गैसों का विश्लेषण करें।",
        primaryConcept: "ग्रीनहाउस प्रभाव",
        learningObjective: "मुख्य ग्रीनहाउस गैस की पहचान करें।",
        missionObjective: "ग्रीनहाउस गैस की पहचान करें।",
        hint: "यह जीवाश्म ईंधन जलाने से निकलने वाली गैस है।",
        feedbackIncorrect: "कार्बन डाइऑक्साइड ग्रीनहाउस प्रभाव में योगदान देने वाली मुख्य गैस है।",
        logicPremise: "कौन सी गैस ग्रीनहाउस प्रभाव का मुख्य कारण है?",
        logicOptions: ["ऑक्सीजन", "नाइट्रोजन", "कार्बन डाइऑक्साइड", "हाइड्रोजन"],
        logicAnswer: "कार्बन डाइऑक्साइड"
      },
      'sci-4-9': {
        missionTitle: "वैज्ञानिक की अंतिम पहेली",
        story: "अपने पौधे के प्रयोग में तापमान की भूमिका निर्धारित करें।",
        primaryConcept: "स्वतंत्र चर",
        learningObjective: "स्वतंत्र चर की पहचान करें।",
        missionObjective: "चर के प्रकार की पहचान करें।",
        hint: "जो चर 'मैं' बदलता हूं वह 'स्वतंत्र' चर है।",
        feedbackIncorrect: "वैज्ञानिक उद्देश्यपूर्वक जिस चर को बदलता है वह स्वतंत्र चर है।",
        logicPremise: "एक वैज्ञानिक पौधे की वृद्धि का परीक्षण करने वाले प्रयोग में केवल तापमान बदलता है। तापमान... है।",
        logicOptions: ["नियंत्रित चर", "आश्रित चर", "स्वतंत्र चर", "निष्कर्ष"],
        logicAnswer: "स्वतंत्र चर"
      },
      'sci-4-10': {
        missionTitle: "स्टेज 4 बॉस — भविष्य शहर संकट महारत",
        story: "अंतिम परीक्षा! भविष्य के शहर को पूर्ण विनाश से बचाने के लिए अपनी सभी वैज्ञानिक महारत का उपयोग करें।",
        primaryConcept: "व्यापक विज्ञान स्टेज 4 महारत",
        learningObjective: "एकीकृत विज्ञान अवधारणाओं में महारत हासिल करें।",
        missionObjective: "शहर को बचाने के लिए सभी 4 चरणों को पूरा करें।",
        hint: "विज्ञान की अपनी पूरी महारत लागू करें।",
        feedbackIncorrect: "आप एक चरण में असफल हो गए। पुनः प्रयास करें!",
        phases: [
          {
            title: "विधि प्रोटोकॉल",
            description: "सही वैज्ञानिक प्रोटोकॉल स्थापित करें।",
            instruction: "सही क्रम चुनें।",
            logicPremise: "वैज्ञानिक विधि का सही क्रम क्या है?",
            logicOptions: [
              "प्रयोग→प्रश्न→परिकल्पना→परिणाम",
              "प्रश्न→परिकल्पना→प्रयोग→परिणाम→निष्कर्ष",
              "परिणाम→प्रश्न→प्रयोग→परिकल्पना",
              "परिकल्पना→प्रश्न→परिणाम→प्रयोग"
            ],
            logicAnswer: "प्रश्न→परिकल्पना→प्रयोग→परिणाम→निष्कर्ष"
          },
          {
            title: "वायुमंडलीय संतुलन",
            description: "CO2 को प्रबंधित करने वाले प्राकृतिक चक्र की पहचान करें।",
            instruction: "सही चक्र चुनें।",
            logicPremise: "एक शहर CO2 छोड़ता है। पास के जंगल के पौधे इसे अवशोषित करते हैं। यह किसका उदाहरण है?",
            logicOptions: ["जल चक्र", "कार्बन चक्र", "नाइट्रोजन चक्र", "ऑक्सीजन चक्र"],
            logicAnswer: "कार्बन चक्र"
          },
          {
            title: "शक्ति आउटपुट",
            description: "शील्ड्स के लिए आवश्यक शक्ति की गणना करें।",
            instruction: "शक्ति हल करें।"
          },
          {
            title: "शहरी पारिस्थितिकी",
            description: "स्थानीय वन्यजीवों को बचाने की योजना लागू करें।",
            instruction: "जैव विविधता के लिए सर्वोत्तम कार्य चुनें।",
            logicPremise: "शहर में जैव विविधता की सबसे अच्छी रक्षा कौन सा कार्य करता है?",
            logicOptions: [
              "अधिक सड़कें बनाना",
              "देशी पेड़ लगाना और हरित गलियारे बनाना",
              "सभी नदियों को हटाना",
              "इमारत की ऊंचाई बढ़ाना"
            ],
            logicAnswer: "देशी पेड़ लगाना और हरित गलियारे बनाना"
          }
        ]
      }
    },
    fragments: {
      f1: "विज्ञान टुकड़ा 1",
      f2: "विज्ञान टुकड़ा 2",
      f3: "विज्ञान टुकड़ा 3",
      f4: "विज्ञान टुकड़ा 4",
      acquired: "विज्ञान पत्थर का टुकड़ा प्राप्त हुआ!",
      desc: "आपने विज्ञान पत्थर का एक टुकड़ा अर्जित किया है।"
    },
    stone: {
      title: "विज्ञान पत्थर",
      acquired: "विज्ञान पत्थर प्राप्त हुआ!",
      desc: "आपने विज्ञान के मार्ग में महारत हासिल कर ली है और ब्रह्मांड के रहस्यों को खोल दिया है।"
    },
    achievements: {
      initiate: { title: "विज्ञान नवागंतुक", desc: "विज्ञान क्षेत्र का स्टेज 1 पूरा किया।" },
      physics: { title: "भौतिकी अग्रणी", desc: "गति, बलों और भौतिक नियमों में महारत हासिल की।" },
      chemistry: { title: "रसायन अन्वेषक", desc: "पदार्थ की अवस्थाओं, अभिक्रियाओं और pH में महारत हासिल की।" },
      biology: { title: "जीव विज्ञान खोजकर्ता", desc: "कोशिकाओं, मानव प्रणालियों और पारिस्थितिकी में महारत हासिल की।" },
      master: { title: "विज्ञान मास्टरी", desc: "सभी 40 विज्ञान स्तरों को पूरा किया और विज्ञान पत्थर को असेंबल किया!" }
    }
  },

  ml: {
    title: "സയൻസ് വിഭാഗം",
    subtitle: "പ്രകൃതി ലോകവും ശാസ്ത്ര കണ്ടെത്തലുകളും",
    intro: "പ്രകൃതി പ്രപഞ്ചത്തിന്റെ അടിസ്ഥാന നിയമങ്ങൾ മനസ്സിലാക്കാൻ ബയോളജി, കെമിസ്ട്രി, ഫിസിക്സ് എന്നിവ പര്യവേക്ഷണം ചെയ്യുക.",
    stages: {
      'stage-1': {
        title: "സ്റ്റേജ് 1 — കണ്ടെത്തുക",
        subtitle: "ശാസ്ത്ര തത്വങ്ങൾ",
        desc: "പ്രകൃതി ശക്തികളെ നിരീക്ഷിക്കുക, ഭൗതിക അളവുകൾ അളക്കുക, പദാർത്ഥത്തിന്റെ അവസ്ഥകൾ തിരിച്ചറിയുക.",
        concept: "പദാർത്ഥവും അളവുകളും",
        learningObjective: "പദാർത്ഥത്തിന്റെ അവസ്ഥകൾ, താപ കൈമാറ്റം, പ്രകാശം, ശബ്ദം, ബലങ്ങൾ എന്നിവ മനസ്സിലാക്കുക.",
        reward: "സയൻസ് കഷ്ണം 1"
      },
      'stage-2': {
        title: "സ്റ്റേജ് 2 — മനസ്സിലാക്കുക",
        subtitle: "ഊർജ്ജവും വ്യവസ്ഥകളും",
        desc: "ഘർഷണം, ഊർജ്ജ രൂപങ്ങൾ, ഇലക്ട്രിക്കൽ സർക്യൂട്ടുകൾ, സാന്ദ്രത, രാസമാറ്റങ്ങൾ എന്നിവ അന്വേഷിക്കുക.",
        concept: "ഊർജ്ജവും പദാർത്ഥ വ്യവസ്ഥകളും",
        learningObjective: "ചലനം, സർക്യൂട്ട് ചാലകത, pH സമീകരണം, ഊർജ്ജ മാറ്റങ്ങൾ എന്നിവ വിശകലനം ചെയ്യുക.",
        reward: "സയൻസ് കഷ്ണം 2"
      },
      'stage-3': {
        title: "സ്റ്റേജ് 3 — ജീവനും ഭൂമിയും",
        subtitle: "പാരിസ്ഥിതിക വ്യവസ്ഥകളും ജീവശാസ്ത്രവും",
        desc: "കോശങ്ങൾ, അവയവ വ്യവസ്ഥകൾ, പ്രകാശസംശ്ലേഷണം, ഭക്ഷ്യ ശൃംഖലകൾ, ജലചക്രം എന്നിവ പഠിക്കുക.",
        concept: "ജീവ വ്യവസ്ഥകളും ഭൂമിയും",
        learningObjective: "ജീവശാസ്ത്രപരമായ ധർമ്മങ്ങൾ, പാരിസ്ഥിതിക സമീകരണം, പരിസ്ഥിതി സംരക്ഷണം എന്നിവയിൽ പ്രാവീണ്യം നേടുക.",
        reward: "സയൻസ് കഷ്ണം 3"
      },
      'stage-4': {
        title: "സ്റ്റേജ് 4 — മാസ്റ്ററി",
        subtitle: "ശാസ്ത്രീയ രീതിയും മാസ്റ്ററിയും",
        desc: "ശാസ്ത്രീയ രീതി, വേരിയബിൾ നിയന്ത്രണങ്ങൾ, ഡാറ്റാ മോഡലിംഗ്, പാരിസ്ഥിതിക പ്രതിസന്ധി നിയന്ത്രണം എന്നിവ പ്രയോഗിക്കുക.",
        concept: "ശാസ്ത്രീയ അന്വേഷണവും കോർ മാസ്റ്ററിയും",
        learningObjective: "ബഹു-വേരിയബിൾ പരീക്ഷണങ്ങൾ സംയോജിപ്പിച്ച് പാരിസ്ഥിതിക സമീകരണം വീണ്ടെടുക്കുക.",
        reward: "സയൻസ് കഷ്ണം 4 & സയൻസ് സ്റ്റോൺ"
      }
    },
    levels: {
      'sci-1-1': {
        missionTitle: "രഹസ്യ പരീക്ഷണശാല",
        story: "ലാബിൽ ഒരു വിചിത്രമായ വസ്തു പ്രത്യക്ഷപ്പെട്ടു.",
        primaryConcept: "നിരീക്ഷണം",
        learningObjective: "സവിശേഷതകളുടെ അടിസ്ഥാനത്തിൽ വസ്തുക്കളെ തരംതിരിക്കൂ.",
        missionObjective: "വസ്തുവിനെ തരംതിരിക്കൂ.",
        hint: "നിശ്ചിത രൂപമുള്ള വസ്തുക്കളെക്കുറിച്ച് ചിന്തിക്കുക.",
        feedbackIncorrect: "തെറ്റാണ്! പദാർത്ഥത്തിന്റെ ഒരു അവസ്ഥയ്ക്ക് മാത്രമേ നിശ്ചിത രൂപമുള്ളൂ.",
        logicPremise: "ഒരു പുതിയ വസ്തു കണ്ടെത്തി. ഇത് കടുപ്പമുള്ളതാണ്, നിശ്ചിത രൂപമുണ്ട്, ഒഴിക്കാൻ കഴിയില്ല. ഇത് ഏത് അവസ്ഥയാണ്?",
        logicOptions: ["ഖരം", "ദ്രാവകം", "വാതകം"],
        logicAnswer: "ഖരം"
      },
      'sci-1-2': {
        missionTitle: "തകരാറിലായ സെൻസർ",
        story: "താപനില അളക്കണം, പക്ഷേ ഓട്ടോമേറ്റഡ് സെൻസർ തകരാറിലാണ്!",
        primaryConcept: "അളവ്",
        learningObjective: "താപനില അളക്കാൻ ശരിയായ ഉപകരണം തിരഞ്ഞെടുക്കുക.",
        missionObjective: "ശരിയായ ഉപകരണം തിരഞ്ഞെടുക്കുക.",
        hint: "തെർമോ എന്നാൽ ചൂട്.",
        feedbackIncorrect: "ആ ഉപകരണം മറ്റൊന്നാണ് അളക്കുന്നത്. വീണ്ടും ശ്രമിക്കൂ!",
        logicPremise: "ഒരു ശാസ്ത്രജ്ഞന് ദ്രാവകത്തിന്റെ താപനില അളക്കണം. ഏത് ഉപകരണമാണ് ഉപയോഗിക്കേണ്ടത്?",
        logicOptions: ["സ്കെയിൽ", "തെർമോമീറ്റർ", "തരാസ്", "മെഷറിംഗ് കപ്പ്"],
        logicAnswer: "തെർമോമീറ്റർ"
      },
      'sci-1-3': {
        missionTitle: "മഞ്ഞ് അറ",
        story: "അറയിലെ താപനില മിനിറ്റിൽ 10 ഡിഗ്രി ഉയരുന്നു, മഞ്ഞ് ഉരുകുന്നു.",
        primaryConcept: "പദാർത്ഥത്തിന്റെ അവസ്ഥകൾ",
        learningObjective: "താപനില മാറ്റത്തിന്റെ പാറ്റേൺ മനസ്സിലാക്കുക.",
        missionObjective: "അടുത്ത താപനില പ്രവചിക്കുക.",
        hint: "അവസാന സംഖ്യയോട് 10 കൂട്ടുക.",
        feedbackIncorrect: "പാറ്റേൺ വീണ്ടും പരിശോധിക്കുക. ഇത് ഓരോ തവണയും 10 കൂടുന്നു."
      },
      'sci-1-4': {
        missionTitle: "അദൃശ്യ വാതകം",
        story: "അടച്ച പാത്രങ്ങളിൽ വായു മർദ്ദം ഞങ്ങൾ പരീക്ഷിക്കുകയാണ്.",
        primaryConcept: "വാതകങ്ങൾ",
        learningObjective: "വാതകങ്ങളെ സംങ്കോചിപ്പിക്കാമെന്ന് മനസ്സിലാക്കുക.",
        missionObjective: "മർദ്ദിച്ച വായുവിന് എന്ത് സംഭവിക്കുന്നു എന്ന് കണ്ടെത്തുക.",
        hint: "വാതകങ്ങളെ ചെറിയ സ്ഥലങ്ങളിലേക്ക് ഞെരുക്കാം.",
        feedbackIncorrect: "ദ്രാവകങ്ങളിൽ നിന്ന് വ്യത്യസ്തമായി, വാതകങ്ങളെ ചെറിയ സ്ഥലങ്ങളിലേക്ക് ഞെരുക്കാം.",
        logicPremise: "അടച്ച സിറിഞ്ചിന്റെ പ്ലഞ്ചർ തള്ളുമ്പോൾ ഉള്ളിലെ വായു...",
        logicOptions: ["വലുതാകുന്നു", "സങ്കോചിക്കുന്നു (ചെറുതാകുന്നു)", "അദൃശ്യമാകുന്നു", "ദ്രാവകമാകുന്നു"],
        logicAnswer: "സങ്കോചിക്കുന്നു (ചെറുതാകുന്നു)"
      },
      'sci-1-5': {
        missionTitle: "പ്രകാശ പാത",
        story: "സെൻസർ പ്രവർത്തിപ്പിക്കാൻ കണ്ണാടികൾ ഉപയോഗിച്ച് ലേസർ ബിം വഴിതിരിച്ചുവിടുക.",
        primaryConcept: "പ്രകാശ പ്രതിഫലനം",
        learningObjective: "പ്രതിഫലന തത്വങ്ങൾ അനുസരിച്ച് പാത കണ്ടെത്തുക.",
        missionObjective: "തടസ്സങ്ങൾ ഒഴിവാക്കി ലക്ഷ്യത്തിലെത്തുക.",
        hint: "[1,0] ലെ തടസ്സം ഒഴിവാക്കുക.",
        feedbackIncorrect: "നിങ്ങൾ തടസ്സത്തിൽ തട്ടി അല്ലെങ്കിൽ പരിധിക്ക് പുറത്തുപോയി!"
      },
      'sci-1-6': {
        missionTitle: "ശബ്ദ സിഗ്നൽ",
        story: "എക്കോ ചേമ്പറിൽ ചുവരുകളിൽ തട്ടുന്ന ശബ്ദ കമ്പനങ്ങൾ ഞങ്ങൾ എണ്ണുകയാണ്.",
        primaryConcept: "ശബ്ദ കമ്പനങ്ങൾ",
        learningObjective: "ശബ്ദ കമ്പന പാറ്റേൺ തിരിച്ചറിയുക.",
        missionObjective: "അടുത്ത നമ്പർ കണ്ടെത്തുക.",
        hint: "സംഖ്യകൾ 1 വീതം കൂടുന്നു.",
        feedbackIncorrect: "1 കൂട്ടി എണ്ണൂ!"
      },
      'sci-1-7': {
        missionTitle: "താപ അറ",
        story: "താപ സവിശേഷതകൾക്കനുസരിച്ച് വിവിധ വസ്തുക്കൾക്ക് താപ യൂണിറ്റുകൾ വിഭജിക്കുക.",
        primaryConcept: "താപ കൈമാറ്റം",
        learningObjective: "ഭിന്നസംഖ്യകൾക്കനുസരിച്ച് വിഭജിക്കുക.",
        missionObjective: "12 താപ യൂണിറ്റുകൾ നൽകുക.",
        hint: "12 ന്റെ പകുതി 6, മൂന്നിലൊന്ന് 4...",
        feedbackIncorrect: "ഓരോ വസ്തുവിനും 12 ന്റെ ഭിന്നസംഖ്യകൾ കണക്കാക്കുക!"
      },
      'sci-1-8': {
        missionTitle: "കാന്തിക പൂട്ട്",
        story: "കാന്തിക വസ്തു തിരഞ്ഞെടുത്താൽ മാത്രമേ പൂട്ട് തുറക്കൂ.",
        primaryConcept: "കാന്തികത",
        learningObjective: "കാന്തിക വസ്തുക്കൾ തിരിച്ചറിയുക.",
        missionObjective: "കാന്തിക വസ്തു തിരഞ്ഞെടുക്കുക.",
        hint: "ഇരുമ്പ് പോലുള്ള ചില ലോഹങ്ങൾ കാന്തികമാണ്.",
        feedbackIncorrect: "ചില ലോഹങ്ങൾ മാത്രമേ കാന്തത്തിലേക്ക് ആകർഷിക്കപ്പെടൂ.",
        logicPremise: "ഇവയിൽ ഏത് വസ്തുവാണ് കാന്തത്തിലേക്ക് ആകർഷിക്കപ്പെടുന്നത്?",
        logicOptions: ["പ്ലാസ്റ്റിക് സ്പൂൺ", "ഇരുമ്പ് ആണി", "ഗ്ലാസ് കപ്പ്", "റബ്ബർ ബാൻഡ്"],
        logicAnswer: "ഇരുമ്പ് ആണി"
      },
      'sci-1-9': {
        missionTitle: "ബല പരിശോധന",
        story: "ഒരു ഭാരമേറിയ ബോക്സ് നീക്കാൻ 15N അറ്റ ബലം ആവശ്യമാണ്.",
        primaryConcept: "ബലങ്ങൾ",
        learningObjective: "ഘർഷണം കണക്കിലെടുത്ത് അറ്റ ബലം കണക്കാക്കുക.",
        missionObjective: "അറ്റ ബലം കണ്ടെത്തുക.",
        hint: "20 ൽ നിന്ന് 5 കുറയ്ക്കുക.",
        feedbackIncorrect: "20 ൽ നിന്ന് 5 കുറച്ചാൽ ആ സംഖ്യയല്ല."
      },
      'sci-1-10': {
        missionTitle: "സ്റ്റേജ് 1 ബോസ് — ഡിസ്കവറി ലാബ് മാസ്റ്ററി",
        story: "ഡിസ്കവറി ലാബ് സുരക്ഷിതമാക്കാൻ പദാർത്ഥം, താപം, കാന്തികത എന്നിവയുടെ എല്ലാ അടിസ്ഥാന തത്വങ്ങളിലും പ്രാവീണ്യം നേടുക!",
        primaryConcept: "സയൻസ് സ്റ്റേജ് 1 മാസ്റ്ററി",
        learningObjective: "പദാർത്ഥം, താപം, കാന്തികത എന്നിവയുടെ തത്വങ്ങൾ പ്രയോഗിക്കുക.",
        missionObjective: "ലാബ് സുരക്ഷിതമാക്കാൻ 4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "പദാർത്ഥത്തെക്കുറിച്ചും താപത്തെക്കുറിച്ചും കാന്തങ്ങളെക്കുറിച്ചും പഠിച്ചതെല്ലാം ഓർക്കുക.",
        feedbackIncorrect: "നിങ്ങൾ ഒരു ഘട്ടത്തിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          {
            title: "ആവി ചോർച്ച",
            description: "ആവിയുടെ അവസ്ഥ തിരിച്ചറിയുക.",
            instruction: "ശരിയായ പദാർത്ഥ അവസ്ഥ തിരഞ്ഞെടുക്കുക.",
            logicPremise: "തിളയ്ക്കുന്ന വെള്ളത്തിൽ നിന്നുള്ള ആവി ഏത് അവസ്ഥയാണ്?",
            logicOptions: ["ഖരം", "ദ്രാവകം", "വാതകം", "പ്ലാസ്മ"],
            logicAnswer: "വാതകം"
          },
          {
            title: "താപ അറ്റകുറ്റപ്പണി",
            description: "കൂളിംഗ് യൂണിറ്റ് നന്നാക്കാൻ നല്ല ചാലകം തിരഞ്ഞെടുക്കുക.",
            instruction: "നല്ല താപ ചാലകം തിരഞ്ഞെടുക്കുക.",
            logicPremise: "ഏത് വസ്തുവാണ് താപത്തിന്റെ നല്ല ചാലകം?",
            logicOptions: ["മരം", "പ്ലാസ്റ്റിക്", "ലോഹം", "റബ്ബർ"],
            logicAnswer: "ലോഹം"
          },
          {
            title: "താപനില വർദ്ധനവ്",
            description: "ലാബിലെ താപനില വേഗത്തിൽ ഉയരുന്നു!",
            instruction: "അടുത്ത താപനില പ്രവചിക്കുക."
          },
          {
            title: "കാന്തിക തടസ്സം",
            description: "കാന്തങ്ങൾ എന്തിനാണ് വികർഷിക്കുന്നത് എന്ന് വിശദീകരിക്കുക.",
            instruction: "ശരിയായ കാന്തിക നിയമം തിരഞ്ഞെടുക്കുക.",
            logicPremise: "ഒരു കാന്തം മറ്റൊരു കാന്തത്തെ വികർഷിക്കുന്നു. എന്തുകൊണ്ട്?",
            logicOptions: ["അവ വ്യത്യസ്ത ലോഹങ്ങളാണ്", "ഒരേ ധ്രുവങ്ങൾ അഭിമുഖീകരിക്കുന്നു", "ഒന്നിന് ഭാരം കൂടുതലാണ്", "ചാർജ്ജ് ഇല്ല"],
            logicAnswer: "ഒരേ ധ്രുവങ്ങൾ അഭിമുഖീകരിക്കുന്നു"
          }
        ]
      },
      'sci-2-1': {
        missionTitle: "ഓടിപ്പോയ റോബോട്ട്",
        story: "ഒരു റോബോട്ട് ചുവരിലേക്ക് നീങ്ങുന്നു! അതിനെ സുരക്ഷിതമായി നയിക്കുക.",
        primaryConcept: "ചലനവും കോഓർഡിനേറ്റുകളും",
        learningObjective: "തടസ്സങ്ങൾ ഒഴിവാക്കി ഗ്രിഡ് നയിക്കുക.",
        missionObjective: "റോബോട്ടിനെ ലക്ഷ്യത്തിലേക്ക് നയിക്കുക.",
        hint: "[1,1], [2,0] ലെ തടസ്സങ്ങൾ ശ്രദ്ധിക്കുക.",
        feedbackIncorrect: "റോബോട്ട് ഇടിച്ചു! മറ്റൊരു പാത ശ്രമിക്കൂ."
      },
      'sci-2-2': {
        missionTitle: "ഘർഷണ ട്രാക്ക്",
        story: "റെസ്ക്യൂ സ്ലെഡ് വേഗത്തിൽ നീക്കണം. ഏറ്റവും കുറഞ്ഞ ഘർഷണമുള്ള പ്രതലം തിരഞ്ഞെടുക്കുക.",
        primaryConcept: "ഘർഷണം",
        learningObjective: "ഏറ്റവും കുറഞ്ഞ ഘർഷണമുള്ള പ്രതലം കണ്ടെത്തുക.",
        missionObjective: "നീങ്ങാൻ അനുയോജ്യമായ പ്രതലം തിരഞ്ഞെടുക്കുക.",
        hint: "ഏത് പ്രതലമാണ് ഏറ്റവും മിനുസമുള്ളത്?",
        feedbackIncorrect: "ആ പ്രതലത്തിൽ ഘർഷണം കൂടുതലാണ്!"
      },
      'sci-2-3': {
        missionTitle: "ഊർജ്ജ കോർ",
        story: "ഊർജ്ജ കോറിന് പ്രവർത്തിക്കാൻ പ്രത്യേക തരം ഊർജ്ജം ആവശ്യമാണ്.",
        primaryConcept: "ഊർജ്ജ രൂപങ്ങൾ",
        learningObjective: "ഗതികോർജ്ജം തിരിച്ചറിയുക.",
        missionObjective: "ചലിക്കുന്ന വസ്തുവിലെ ഊർജ്ജ തരം കണ്ടെത്തുക.",
        hint: "ചലനത്തിന്റെ ഊർജ്ജം വിളിക്കപ്പെടുന്നത്...",
        feedbackIncorrect: "ഗതികോർജ്ജം എന്നാൽ ചലനത്തിന്റെ ഊർജ്ജമാണ്.",
        logicPremise: "കുന്നിൻ മുകളിൽ നിന്ന് ഉരുളുന്ന പന്തിൽ ഏത് തരം ഊർജ്ജമുണ്ട്?",
        logicOptions: ["രാസ ഊർജ്ജം", "ഗതികോർജ്ജം", "ശബ്ദം", "ആറ്റോമിക്"],
        logicAnswer: "ഗതികോർജ്ജം"
      },
      'sci-2-4': {
        missionTitle: "സർക്യൂട്ട് മുറി",
        story: "ലൈറ്റുകൾ അണഞ്ഞു! ഇലക്ട്രിക്കൽ സർക്യൂട്ട് നന്നാക്കണം.",
        primaryConcept: "വൈദ്യുതിയും സർക്യൂട്ടുകളും",
        learningObjective: "പ്രവർത്തിക്കുന്ന സർക്യൂട്ടിന്റെ ആവശ്യകതകൾ മനസ്സിലാക്കുക.",
        missionObjective: "വൈദ്യുതി പ്രവഹിക്കാൻ വേണ്ടത് കണ്ടെത്തുക.",
        hint: "വൈദ്യുതിക്ക് തുടർച്ചയായ പാത വേണം.",
        feedbackIncorrect: "സർക്യൂട്ടിന് പൂർണ്ണമായ ലൂപ്പും ബാറ്ററി പോലെയുള്ള പവർ ഉറവിടവും വേണം.",
        logicPremise: "വൈദ്യുതി പ്രവഹിക്കാൻ സർക്യൂട്ടിൽ എന്ത് വേണം?",
        logicOptions: ["ബാറ്ററിയും വിടവും", "ബാറ്ററിയുള്ള പൂർണ്ണ ലൂപ്പ്", "വയർ മാത്രം", "രണ്ട് ബാറ്ററികൾ"],
        logicAnswer: "ബാറ്ററിയുള്ള പൂർണ്ണ ലൂപ്പ്"
      },
      'sci-2-5': {
        missionTitle: "ചാലക പരിശോധന",
        story: "ഗ്രിഡ് നന്നാക്കാൻ ഈ 6 വസ്തുക്കളെ ചാലകങ്ങളും ഇൻസുലേറ്ററുകളുമായി തരംതിരിക്കുക.",
        primaryConcept: "ചാലകങ്ങളും ഇൻസുലേറ്ററുകളും",
        learningObjective: "വസ്തുക്കളെ തരംതിരിക്കുക.",
        missionObjective: "6 വസ്തുക്കളെ ശരിയായി തരംതിരിക്കുക.",
        hint: "ലോഹങ്ങൾ സാധാരണയായി ചാലകങ്ങളാണ്.",
        feedbackIncorrect: "ചാലകങ്ങളിൽ 3 വസ്തുക്കളും ഇൻസുലേറ്ററുകളിൽ 3 വസ്തുക്കളും വയ്ക്കുക!"
      },
      'sci-2-6': {
        missionTitle: "സാന്ദ്രതാ രഹസ്യം",
        story: "വാട്ടർ ടാങ്കുകളിൽ രഹസ്യ വസ്തുക്കൾ ഞങ്ങൾ പരിശോധിക്കുകയാണ്.",
        primaryConcept: "സാന്ദ്രതയും പ്ലവക്ഷമതയും",
        learningObjective: "സാന്ദ്രതയും താഴുന്നതും തമ്മിലുള്ള ബന്ധം മനസ്സിലാക്കുക.",
        missionObjective: "വസ്തുവിന്റെ സാന്ദ്രത കണ്ടെത്തുക.",
        hint: "വെള്ളത്തേക്കാൾ ഭാരമുള്ള വസ്തുക്കൾ താഴേക്ക് പോകും.",
        feedbackIncorrect: "ഇത് താഴുകയാണെങ്കിൽ, ദ്രാവകത്തേക്കാൾ സാന്ദ്രത കൂടുതലാണ്.",
        logicPremise: "ഒരു വസ്തു വെള്ളത്തിൽ താഴുന്നു. വെള്ളവുമായി താരതമ്യപ്പെടുത്തുമ്പോൾ ഇതിന്റെ സാന്ദ്രത എന്താണ്?",
        logicOptions: ["വെള്ളത്തേക്കാൾ കുറവ്", "വെള്ളത്തിന്റെ അതേ സാന്ദ്രത", "വെള്ളത്തേക്കാൾ കൂടുതൽ", "സാന്ദ്രതയില്ല"],
        logicAnswer: "വെള്ളത്തേക്കാൾ കൂടുതൽ"
      },
      'sci-2-7': {
        missionTitle: "രാസമാറ്റം",
        story: "കടലാസ് കത്തുമ്പോൾ എന്ത് സംഭവിക്കുന്നു എന്ന് പഠിക്കുക.",
        primaryConcept: "രാസമാറ്റങ്ങൾ",
        learningObjective: "ഭൗതിക, രാസമാറ്റങ്ങൾ വേർതിരിക്കുക.",
        missionObjective: "മാറ്റത്തിന്റെ തരം കണ്ടെത്തുക.",
        hint: "ചാരത്തെ തിരികെ കടലാസാക്കാൻ കഴിയുമോ?",
        feedbackIncorrect: "ഒരു പുതിയ വസ്തു രൂപപ്പെടുകയും അത് തിരിച്ചാക്കാൻ കഴിയാതിരിക്കുകയും ചെയ്യുമ്പോൾ അത് രാസമാറ്റമാണ്.",
        logicPremise: "കടലാസ് കത്തിക്കുന്നത് ഒരു __ മാറ്റമാണ്, കാരണം അത് തിരിച്ചാക്കാൻ കഴിയില്ല.",
        logicOptions: ["ഭൗതിക", "രാസമാറ്റം", "കാന്തികം", "വൈദ്യുതി"],
        logicAnswer: "രാസമാറ്റം"
      },
      'sci-2-8': {
        missionTitle: "രഹസ്യ ലായനി",
        story: "രഹസ്യ ലായനി എന്താണെന്ന് കണ്ടെത്താൻ ഇതിന്റെ pH പരിശോധിക്കുക.",
        primaryConcept: "ആസിഡുകളും ബേസുകളും",
        learningObjective: "pH സ്കെയിൽ മനസ്സിലാക്കുക.",
        missionObjective: "pH അടിസ്ഥാനമാക്കി സവിശേഷതകൾ കണ്ടെത്തുക.",
        hint: "7 ൽ താഴെയുള്ള pH ആസിഡാണ്.",
        feedbackIncorrect: "pH 2 വളരെ കുറവാണ്, അതിനാൽ ഇത് ശക്തമായ ആസിഡാണ്.",
        logicPremise: "നാരങ്ങാനീരിന്റെ pH 2 ആണ്. ഇതിനർത്ഥം ഇത്...",
        logicOptions: ["ന്യൂട്രൽ", "ശക്തമായ ആസിഡ്", "ദുർബല ബേസ്", "ശക്തമായ ബേസ്"],
        logicAnswer: "ശക്തമായ ആസിഡ്"
      },
      'sci-2-9': {
        missionTitle: "ഊർജ്ജ കൈമാറ്റം",
        story: "വിവിധ ഉപകരണങ്ങളുടെ ഊർജ്ജ മാറ്റങ്ങൾ മാപ്പ് ചെയ്യുക.",
        primaryConcept: "ഊർജ്ജ മാറ്റങ്ങൾ",
        learningObjective: "ഊർജ്ജം എങ്ങനെ രൂപം മാറുന്നു എന്ന് കണ്ടെത്തുക.",
        missionObjective: "സോളാർ പാനലിന്റെ ഔട്ട്പുട്ട് ഊർജ്ജം കണ്ടെത്തുക.",
        hint: "സോളാർ പാനലുകൾ വീടുകൾക്ക് വൈദ്യുതി നൽകുന്നു.",
        feedbackIncorrect: "സോളാർ പാനലുകൾ സൂര്യപ്രകാശത്തെ വൈദ്യുതിയാക്കി മാറ്റുന്നു.",
        logicPremise: "സോളാർ പാനൽ പ്രകാശ ഊർജ്ജത്തെ... ആക്കി മാറ്റുന്നു.",
        logicOptions: ["ശബ്ദ ഊർജ്ജം", "വൈദ്യുതോർജ്ജം", "താപോർജ്ജം മാത്രം", "ആറ്റോമിക്"],
        logicAnswer: "വൈദ്യുതോർജ്ജം"
      },
      'sci-2-10': {
        missionTitle: "സ്റ്റേജ് 2 ബോസ് — എനർജി സ്റ്റേഷൻ മാസ്റ്ററി",
        story: "ഊർജ്ജ പരീക്ഷണശാലയിൽ പവർ പുനഃസ്ഥാപിക്കാൻ പ്രധാന ഊർജ്ജ സങ്കീർണ്ണതകൾ പരിഹരിക്കുക!",
        primaryConcept: "സയൻസ് സ്റ്റേജ് 2 മാസ്റ്ററി",
        learningObjective: "സർക്യൂട്ടുകൾ, ചാലകങ്ങൾ, ഊർജ്ജ സൂത്രവാക്യങ്ങൾ എന്നിവ പ്രയോഗിക്കുക.",
        missionObjective: "പവർ പുനഃസ്ഥാപിക്കാൻ 4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "സർക്യൂട്ടുകൾ എങ്ങനെ പ്രവർത്തിക്കുന്നു എന്നും വേഗത എങ്ങനെ കണക്കാക്കാമെന്നും ഓർക്കുക.",
        feedbackIncorrect: "നിങ്ങൾ ഒരു ഘട്ടത്തിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          {
            title: "സർക്യൂട്ട് പരിശോധന",
            description: "വൈദ്യുതി പ്രവഹിക്കാൻ വേണ്ടത് കണ്ടെത്തുക.",
            instruction: "സർക്യൂട്ട് പ്രവർത്തിക്കാൻ വേണ്ടത് തിരഞ്ഞെടുക്കുക.",
            logicPremise: "സർക്യൂട്ടിൽ വൈദ്യുതി പ്രവഹിപ്പിക്കുന്നത് എന്താണ്?",
            logicOptions: ["വിടവ്", "പൂർണ്ണ ലൂപ്പ്", "ബൾബ് മാത്രം", "ഘർഷണം"],
            logicAnswer: "പൂർണ്ണ ലൂപ്പ്"
          },
          {
            title: "വയർ നന്നാക്കൽ",
            description: "വയർ നന്നാക്കാൻ ശരിയായ വസ്തു തിരഞ്ഞെടുക്കുക.",
            instruction: "ചാലകം തിരഞ്ഞെടുക്കുക.",
            logicPremise: "ഏതാണ് ചാലകം?",
            logicOptions: ["റബ്ബർ", "മരം", "ചെമ്പ് വയർ", "പ്ലാസ്റ്റിക്"],
            logicAnswer: "ചെമ്പ് വയർ"
          },
          {
            title: "ബാറ്ററി തീർന്നു",
            description: "ബാക്കപ്പ് ബാറ്ററി തീർന്നു.",
            instruction: "ബാറ്ററിയിലെ ഊർജ്ജ തരം കണ്ടെത്തുക.",
            logicPremise: "ബാറ്ററി തീർന്നു. ഏത് തരം ഊർജ്ജമാണ് തീർന്നത്?",
            logicOptions: ["ഗതികോർജ്ജം", "ശബ്ദം", "രാസ ഊർജ്ജം", "ആറ്റോമിക്"],
            logicAnswer: "രാസ ഊർജ്ജം"
          },
          {
            title: "ജനറേറ്റർ വേഗത",
            description: "ടർബൈന്റെ വേഗത കണക്കാക്കുക.",
            instruction: "വേഗത കണ്ടെത്തുക."
          }
        ]
      },
      'sci-3-1': {
        missionTitle: "സൂക്ഷ്മ ലോകം",
        story: "കോശങ്ങളുടെ സൂക്ഷ്മ ലോകം പര്യവേക്ഷണം ചെയ്യുക.",
        primaryConcept: "കോശ ഘടന",
        learningObjective: "ന്യൂക്ലിയസിനെ കോശത്തിന്റെ നിയന്ത്രണ കേന്ദ്രമായി തിരിച്ചറിയുക.",
        missionObjective: "കോശത്തിന്റെ നിയന്ത്രണ കേന്ദ്രം കണ്ടെത്തുക.",
        hint: "ഇത് കോശത്തിന്റെ തലച്ചോറായി പ്രവർത്തിക്കുന്നു.",
        feedbackIncorrect: "ന്യൂക്ലിയസ് കോശത്തിന്റെ തലച്ചോറായി പ്രവർത്തിക്കുന്നു.",
        logicPremise: "കോശത്തിന്റെ നിയന്ത്രണ കേന്ദ്രം എന്താണ് വിളിക്കപ്പെടുന്നത്?",
        logicOptions: ["കോശ ഭിത്തി", "ന്യൂക്ലിയസ്", "ഹരിതകണം", "മൈറ്റോകോൺഡ്രിയ"],
        logicAnswer: "ന്യൂക്ലിയസ്"
      },
      'sci-3-2': {
        missionTitle: "മനുഷ്യ യന്ത്രം",
        story: "മനുഷ്യശരീരം എങ്ങനെ പ്രവർത്തിക്കുന്നു എന്ന് പഠിക്കുക.",
        primaryConcept: "മനുഷ്യശരീര വ്യവസ്ഥകൾ",
        learningObjective: "ഹൃദയത്തിന്റെ ധർമ്മം തിരിച്ചറിയുക.",
        missionObjective: "രക്തം പമ്പ് ചെയ്യുന്ന അവയവം കണ്ടെത്തുക.",
        hint: "ഇത് നെഞ്ചിൽ തുടർച്ചയായി മിടിക്കുന്നു.",
        feedbackIncorrect: "രക്തം പമ്പ് ചെയ്യുന്നതിന് ഉത്തരവാദിയായ പേശിയാണ് ഹൃദയം.",
        logicPremise: "ശരീരത്തിൽ രക്തം പമ്പ് ചെയ്യുന്ന അവയവം ഏതാണ്?",
        logicOptions: ["ശ്വാസകോശം", "തലച്ചോർ", "ഹൃദയം", "വൃക്ക"],
        logicAnswer: "ഹൃദയം"
      },
      'sci-3-3': {
        missionTitle: "സസ്യ ഊർജ്ജ ലാബ്",
        story: "സസ്യങ്ങൾക്ക് സ്വന്തമായി ആഹാരം ഉണ്ടാക്കാൻ സഹായിക്കുക.",
        primaryConcept: "പ്രകാശസംശ്ലേഷണം",
        learningObjective: "പ്രകാശസംശ്ലേഷണത്തിന് വേണ്ടത് കണ്ടെത്തുക.",
        missionObjective: "വിട്ടുപോയ ഘടകം കണ്ടെത്തുക.",
        hint: "മനുഷ്യർ പുറത്തുവിടുന്ന വാതകമാണിത്.",
        feedbackIncorrect: "സസ്യങ്ങൾക്ക് സൂര്യപ്രകാശം, വെള്ളം, കാർബൺ ഡൈ ഓക്സൈഡ് എന്നിവ വേണം.",
        logicPremise: "സസ്യങ്ങൾ ആഹാരം ഉണ്ടാക്കാൻ സൂര്യപ്രകാശം, വെള്ളം, __ എന്നിവ ഉപയോഗിക്കുന്നു.",
        logicOptions: ["ഓക്സിജൻ", "കാർബൺ ഡൈ ഓക്സൈഡ്", "നൈട്രജൻ", "ഹൈഡ്രജൻ"],
        logicAnswer: "കാർബൺ ഡൈ ഓക്സൈഡ്"
      },
      'sci-3-4': {
        missionTitle: "ഭക്ഷ്യ ശൃംഖല",
        story: "ഭക്ഷ്യ ശൃംഖലയിൽ ഒരു ജീവി കുറയുന്നതിന്റെ പ്രഭാവം പഠിക്കുക.",
        primaryConcept: "ഭക്ഷ്യ ശൃംഖലകളും പരിസ്ഥിതിയും",
        learningObjective: "ഭക്ഷ്യ ശൃംഖലകളുടെ ബന്ധം മനസ്സിലാക്കുക.",
        missionObjective: "മുയലുകൾ ഇല്ലാതായാലുള്ള ഫലം കണ്ടെത്തുക.",
        hint: "മുയലുകളെ തിന്നുന്നത് എന്താണ്? മുയലുകൾ തിന്നുന്നത് എന്താണ്?",
        feedbackIncorrect: "മുയലുകൾ ഇല്ലെങ്കിൽ കുറുക്കന്മാർക്ക് ആഹാരമില്ല (കുറയുന്നു), പുല്ല് തിന്നപ്പെടില്ല (കൂടുന്നു).",
        logicPremise: "ഭക്ഷ്യ ശൃംഖലയിൽ: പുല്ല് → മുയൽ → കുറുക്കൻ. എല്ലാ മുയലുകളും ഇല്ലാതായാൽ എന്ത് സംഭവിക്കും?",
        logicOptions: ["പുല്ല് കുറയുന്നു, കുറുക്കൻ കൂടുന്നു", "പുല്ല് കൂടുന്നു, കുറുക്കൻ കുറയുന്നു", "മാറ്റമില്ല", "കുറുക്കൻ പെരുകുന്നു"],
        logicAnswer: "പുല്ല് കൂടുന്നു, കുറുക്കൻ കുറയുന്നു"
      },
      'sci-3-5': {
        missionTitle: "സമീകൃത പരിസ്ഥിതി",
        story: "വിഘടകരുടെ പങ്ക് കണ്ടെത്തുക.",
        primaryConcept: "വിഘടകർ",
        learningObjective: "വിഘടകരുടെ പങ്ക് മനസ്സിലാക്കുക.",
        missionObjective: "വിഘടകരുടെ ധർമ്മം കണ്ടെത്തുക.",
        hint: "അവർ പ്രകൃതിയെ ശുദ്ധമാക്കുന്നു.",
        feedbackIncorrect: "വിഘടകർ ചത്ത ജീവികളെ മണ്ണാക്കി മാറ്റുന്നു.",
        logicPremise: "പരിസ്ഥിതി വ്യവസ്ഥയിൽ വിഘടകർ എന്ത് ചെയ്യുന്നു?",
        logicOptions: ["സ്വന്തമായി ആഹാരം ഉണ്ടാക്കുന്നു", "മറ്റ് ജീവികളെ വേട്ടയാടുന്നു", "ചത്ത ജീവികളെ അഴുകിക്കുന്നു", "ഓക്സിജൻ മാത്രം നൽകുന്നു"],
        logicAnswer: "ചത്ത ജീവികളെ അഴുകിക്കുന്നു"
      },
      'sci-3-6': {
        missionTitle: "ജല യാത്ര",
        story: "ജലചക്രത്തിലൂടെയുള്ള ജലത്തിന്റെ യാത്ര ട്രാക്ക് ചെയ്യുക.",
        primaryConcept: "ജലചക്രം",
        learningObjective: "സാന്ദ്രീകരണ പ്രക്രിയ കണ്ടെത്തുക.",
        missionObjective: "പ്രക്രിയയുടെ പേര് കണ്ടെത്തുക.",
        hint: "നീരാവി തണുത്ത് മേഘങ്ങളാകുന്നു.",
        feedbackIncorrect: "വാതകം തണുത്ത് ദ്രാവകമാകുമ്പോൾ അതിനെ സാന്ദ്രീകരണം എന്ന് വിളിക്കുന്നു.",
        logicPremise: "നീരാവി ഉയർന്ന്, തണുത്ത്, ജലത്തുള്ളികളാകുന്നു. ഇതിനെ... എന്ന് വിളിക്കുന്നു.",
        logicOptions: ["ബാഷ്പീകരണം", "സാന്ദ്രീകരണം", "വർഷണം", "സ്വേദനം"],
        logicAnswer: "സാന്ദ്രീകരണം"
      },
      'sci-3-7': {
        missionTitle: "കാലാവസ്ഥാ സ്റ്റേഷൻ",
        story: "ദിവസേനയുള്ള താപനില കൂടുന്നു. അടുത്തത് പ്രവചിക്കുക.",
        primaryConcept: "കാലാവസ്ഥാ വിശകലനം",
        learningObjective: "താപനില പ്രവചിക്കുക.",
        missionObjective: "അടുത്ത താപനില കണ്ടെത്തുക.",
        hint: "ഓരോ തവണയും 2°C കൂടുന്നു.",
        feedbackIncorrect: "അവസാന സംഖ്യയോട് 2 കൂട്ടുക."
      },
      'sci-3-8': {
        missionTitle: "മർദ്ദത്തിലുള്ള ഗ്രഹം",
        story: "പുതിയ നഗരത്തിനായി ഏറ്റവും അനുയോജ്യമായ ഊർജ്ജ സ്രോതസ്സ് തിരഞ്ഞെടുക്കുക.",
        primaryConcept: "സുസ്ഥിര സ്രോതസ്സുകൾ",
        learningObjective: "സുസ്ഥിര ഊർജ്ജ സ്രോതസ്സുകൾ കണ്ടെത്തുക.",
        missionObjective: "ഏറ്റവും സുസ്ഥിര ഊർജ്ജ സ്രോതസ്സ് തിരഞ്ഞെടുക്കുക.",
        hint: "ഏത് സ്രോതസ്സാണ് പുനഃസ്ഥാപിക്കാവുന്നത്?",
        feedbackIncorrect: "സൗരോർജ്ജം പുനഃസ്ഥാപിക്കാവുന്ന സുസ്ഥിര സ്രോതസ്സാണ്."
      },
      'sci-3-9': {
        missionTitle: "ഹരിത നഗരം",
        story: "പരിസ്ഥിതി സംരക്ഷിക്കാൻ നഗരത്തെ സഹായിക്കുക.",
        primaryConcept: "പരിസ്ഥിതി സംരക്ഷണം",
        learningObjective: "പ്ലാസ്റ്റിക് മലിനീകരണം കുറയ്ക്കുന്ന വഴികൾ കണ്ടെത്തുക.",
        missionObjective: "പ്ലാസ്റ്റിക് മലിനീകരണം കുറയ്ക്കുന്ന വഴി തിരഞ്ഞെടുക്കുക.",
        hint: "മാലിന്യം ഉറവിടത്തിൽ കുറയ്ക്കുക.",
        feedbackIncorrect: "ഒറ്റത്തവണ ഉപയോഗിക്കുന്ന പ്ലാസ്റ്റിക് കുറയ്ക്കുന്നതാണ് ഏറ്റവും നല്ല വഴി.",
        logicPremise: "ഏത് നടപടിയാണ് പ്ലാസ്റ്റിക് മലിനീകരണം ഏറ്റവും കൂടുതൽ കുറയ്ക്കുന്നത്?",
        logicOptions: ["കൂടുതൽ കാറുകൾ ഉപയോഗിക്കുക", "ഒറ്റത്തവണ പ്ലാസ്റ്റിക് കുറയ്ക്കുക", "മാലിന്യം കത്തിക്കുക", "കൂടുതൽ വെള്ളം ഉപയോഗിക്കുക"],
        logicAnswer: "ഒറ്റത്തവണ പ്ലാസ്റ്റിക് കുറയ്ക്കുക"
      },
      'sci-3-10': {
        missionTitle: "സ്റ്റേജ് 3 ബോസ് — പരിസ്ഥിതി മാസ്റ്ററി",
        story: "സസ്യകോശങ്ങൾ, ഓസോൺ, ജലചക്രം എന്നിവയെക്കുറിച്ചുള്ള അറിവ് ഉപയോഗിച്ച് പരിസ്ഥിതി തകർച്ച തടയുക!",
        primaryConcept: "സയൻസ് സ്റ്റേജ് 3 മാസ്റ്ററി",
        learningObjective: "ഭൂമി, ജീവശാസ്ത്ര അറിവുകൾ സംയോജിപ്പിക്കുക.",
        missionObjective: "ദുരന്തം തടയാൻ 4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "സസ്യങ്ങൾ, ഓസോൺ പാളി, ജലചക്രം എന്നിവയെക്കുറിച്ചുള്ള വിവരങ്ങൾ ഓർക്കുക.",
        feedbackIncorrect: "നിങ്ങൾ ഒരു ഘട്ടത്തിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          {
            title: "സസ്യ രക്ഷ",
            description: "സസ്യങ്ങൾ സൂര്യപ്രകാശം സ്വീകരിക്കുന്നത് എങ്ങനെ എന്ന് കണ്ടെത്തുക.",
            instruction: "ശരിയായ ഭാഗം തിരഞ്ഞെടുക്കുക.",
            logicPremise: "സസ്യകോശത്തിലെ ഏത് ഭാഗമാണ് സൂര്യപ്രകാശം സ്വീകരിക്കുന്നത്?",
            logicOptions: ["ന്യൂക്ലിയസ്", "കോശ ഭിത്തി", "ഹരിതകണം", "വാക്യോൾ"],
            logicAnswer: "ഹരിതകണം"
          },
          {
            title: "ഓസോൺ ക്ഷയം",
            description: "ഓസോൺ പാളിയിലെ വിള്ളലിന്റെ അപകടം മനസ്സിലാക്കുക.",
            instruction: "ഓസോൺ പാളി നമ്മെ എന്തിൽ നിന്നാണ് സംരക്ഷിക്കുന്നത് എന്ന് തിരഞ്ഞെടുക്കുക.",
            logicPremise: "ഓസോൺ പാളി നമ്മെ എന്തിൽ നിന്നാണ് സംരക്ഷിക്കുന്നത്?",
            logicOptions: ["മഴ", "യുവി രശ്മികൾ", "കാറ്റ്", "ശബ്ദം"],
            logicAnswer: "യുവി രശ്മികൾ"
          },
          {
            title: "ജലചക്ര പ്രവാഹം",
            description: "വെള്ളം മേഘങ്ങളിൽ എത്തുന്ന പ്രക്രിയ കണ്ടെത്തുക.",
            instruction: "ശരിയായ പ്രക്രിയ തിരഞ്ഞെടുക്കുക."
          },
          {
            title: "ശുചിത്വ ഗതാഗതം",
            description: "ഏറ്റവും പരിസ്ഥിതി സൗഹൃദ ഗതാഗതം തിരഞ്ഞെടുക്കുക.",
            instruction: "ഹരിത ഗതാഗതം തിരഞ്ഞെടുക്കുക."
          }
        ]
      },
      'sci-4-1': {
        missionTitle: "അജ്ഞാത പരീക്ഷണം",
        story: "നിങ്ങൾ ഒരു പുതിയ പരീക്ഷണം നടത്തുകയാണ്. ആദ്യം ചെയ്യേണ്ടത് എന്താണ്?",
        primaryConcept: "ശാസ്ത്രീയ രീതി",
        learningObjective: "ശാസ്ത്രീയ രീതിയുടെ ആദ്യ ഘട്ടം കണ്ടെത്തുക.",
        missionObjective: "ആദ്യ ഘട്ടം തിരഞ്ഞെടുക്കുക.",
        hint: "ഉത്തരം കണ്ടെത്തുന്നതിന് മുൻപ് നിങ്ങൾക്ക് ഒരു... വേണം.",
        feedbackIncorrect: "എല്ലാ പരീക്ഷണങ്ങളും ഒരു ചോദ്യത്തിൽ നിന്നാണ് തുടങ്ങുന്നത്.",
        logicPremise: "ശാസ്ത്രീയ രീതിയുടെ ആദ്യ ഘട്ടം എന്താണ്?",
        logicOptions: ["പരീക്ഷണം നടത്തുക", "നിഗമനത്തിലെത്തുക", "ചോദ്യം ചോദിക്കുക", "ഫലം രേഖപ്പെടുത്തുക"],
        logicAnswer: "ചോദ്യം ചോദിക്കുക"
      },
      'sci-4-2': {
        missionTitle: "ശരിയായ പരിശോധന",
        story: "ഫലങ്ങൾ കൃത്യമാണെന്ന് ഉറപ്പാക്കാൻ ശരിയായ പരിശോധന നടത്തണം.",
        primaryConcept: "നിയന്ത്രിത വേരിയബിളുകൾ",
        learningObjective: "നിയന്ത്രിത വേരിയബിളുകളുടെ പങ്ക് മനസ്സിലാക്കുക.",
        missionObjective: "എന്താണ് മാറ്റമില്ലാതെ നിൽക്കേണ്ടത് എന്ന് കണ്ടെത്തുക.",
        hint: "പരിശോധന കൃത്യമാക്കാൻ ഇവ മാറ്റമില്ലാതെ നിർത്തുന്നു.",
        feedbackIncorrect: "ശരിയായ പരിശോധനയ്ക്ക് നിയന്ത്രിത വേരിയബിളുകൾ മാറ്റമില്ലാതെ നിൽക്കണം.",
        logicPremise: "ഒരു കൃത്യമായ പരിശോധനയിൽ എന്താണ് മാറ്റമില്ലാതെ നിൽക്കേണ്ടത്?",
        logicOptions: ["ഡിപ്പൻഡന്റ് വേരിയബിൾ", "ഇൻഡിപെൻഡന്റ് വേരിയബിൾ", "കൺട്രോൾഡ് വേരിയബിളുകൾ", "നിഗമനം"],
        logicAnswer: "കൺട്രോൾഡ് വേരിയബിളുകൾ"
      },
      'sci-4-3': {
        missionTitle: "ഡാറ്റാ ലാബ്",
        story: "അവസാന പരീക്ഷണത്തിന്റെ ഫലങ്ങൾ വിശകലനം ചെയ്യുക.",
        primaryConcept: "ഡാറ്റാ വിശകലനം",
        learningObjective: "ഡാറ്റയിലെ പാറ്റേൺ കണ്ടെത്തുക.",
        missionObjective: "അടുത്ത നമ്പർ പ്രവചിക്കുക.",
        hint: "സംഖ്യകൾ 10 വീതം കൂടുന്നു.",
        feedbackIncorrect: "അവസാന സംഖ്യയോട് 10 കൂട്ടുക."
      },
      'sci-4-4': {
        missionTitle: "ഊർജ്ജ ശൃംഖല",
        story: "വിൻഡ് മില്ലുകൾ ഉപയോഗിച്ച് നഗരത്തിലെ വൈദ്യുതി നിയന്ത്രിക്കുക.",
        primaryConcept: "കാറ്റാടി ഊർജ്ജ മാറ്റം",
        learningObjective: "വിൻഡ് മില്ലിന്റെ ഔട്ട്പുട്ട് ഊർജ്ജം കണ്ടെത്തുക.",
        missionObjective: "ഊർജ്ജ മാറ്റം കണ്ടെത്തുക.",
        hint: "വീടുകൾക്ക് നൽകാൻ വിൻഡ് മിൽ ഇത് ഉത്പാദിപ്പിക്കുന്നു.",
        feedbackIncorrect: "വിൻഡ് മില്ലുകൾ കാറ്റിന്റെ ഗതികോർജ്ജത്തെ വൈദ്യൂതോർജ്ജമാക്കുന്നു.",
        logicPremise: "വിൻഡ് മിൽ കാറ്റിന്റെ ഊർജ്ജത്തെ... ആക്കി മാറ്റുന്നു.",
        logicOptions: ["താപം", "ശബ്ദം", "വൈദ്യൂതോർജ്ജം", "രാസ ഊർജ്ജം"],
        logicAnswer: "വൈദ്യൂതോർജ്ജം"
      },
      'sci-4-5': {
        missionTitle: "ബല വെല്ലുവിളി",
        story: "നിർമ്മിതി സുരക്ഷിതമാക്കാൻ ബലങ്ങൾ സമീകരിക്കുക.",
        primaryConcept: "അറ്റ ബല സമീകരണം",
        learningObjective: "0 അറ്റ ബലം ലഭിക്കാൻ വേണ്ട ബലം കണക്കാക്കുക.",
        missionObjective: "വിട്ടുപോയ ബലം കണ്ടെത്തുക.",
        hint: "30 ൽ നിന്ന് X കുറച്ചാൽ 0 ആണെങ്കിൽ X എത്രയാണ്?",
        feedbackIncorrect: "30N ബലത്തെ സമീകരിക്കാൻ തുല്യമായ 30N ബലം എതിർദിശയിൽ വേണം."
      },
      'sci-4-6': {
        missionTitle: "മനുഷ്യശരീര അടിയന്തരാവസ്ഥ",
        story: "ഒരു രോഗിക്ക് ശ്വാസമെടുക്കാൻ ബുദ്ധിമുട്ടാണ്. ഏത് വ്യവസ്ഥയ്ക്കാണ് തകരാറ്?",
        primaryConcept: "ശ്വസന വ്യവസ്ഥ",
        learningObjective: "ശ്വസന വ്യവസ്ഥയെ തിരിച്ചറിയുക.",
        missionObjective: "ശരിയായ അവയവ വ്യവസ്ഥ തിരഞ്ഞെടുക്കുക.",
        hint: "ശ്വാസമെടുക്കലുമായി ബന്ധപ്പെട്ട വ്യവസ്ഥയാണിത്.",
        feedbackIncorrect: "ശ്വാസകോശം അടങ്ങുന്ന ശ്വസന വ്യവസ്ഥയാണ് ശ്വാസമെടുക്കാൻ സഹായിക്കുന്നത്.",
        logicPremise: "ഒരാൾക്ക് ശരിയായി ശ്വാസമെടുക്കാൻ കഴിയുന്നില്ല. ഏത് വ്യവസ്ഥയ്ക്കാണ് തകരാറ്?",
        logicOptions: ["ദഹന വ്യവസ്ഥ", "നാഡീ വ്യവസ്ഥ", "ശ്വസന വ്യവസ്ഥ", "രക്തപര്യയന വ്യവസ്ഥ"],
        logicAnswer: "ശ്വസന വ്യവസ്ഥ"
      },
      'sci-4-7': {
        missionTitle: "പരിസ്ഥിതി ഡിറ്റക്ടീവ്",
        story: "കാടുകൾ വെട്ടുന്നത് മഴ കുറയ്ക്കുന്നത് എന്തുകൊണ്ട് എന്ന് അന്വേഷിക്കുക.",
        primaryConcept: "സ്വേദനവും ജലചക്രവും",
        learningObjective: "ജലചക്രത്തിൽ മരങ്ങളുടെ പങ്ക് മനസ്സിലാക്കുക.",
        missionObjective: "കാരണം കണ്ടെത്തുക.",
        hint: "മരങ്ങൾ സ്വേദനം വഴി നീരാവി പുറത്തുവിടുന്നു.",
        feedbackIncorrect: "മരങ്ങൾ സ്വേദനം വഴി അന്തരീക്ഷത്തിലേക്ക് നീരാവി പുറത്തുവിടുന്നതാണ് മഴയ്ക്ക് കാരണം.",
        logicPremise: "കാടുകൾ വെട്ടുന്നത് മഴ കുറയ്ക്കുന്നു. എന്തുകൊണ്ട്?",
        logicOptions: ["മരങ്ങൾ നേരിട്ട് മഴയുണ്ടാക്കുന്നു", "മരങ്ങൾ മഴ വെള്ളം കുടിക്കുന്നു", "മരങ്ങൾ അന്തരീക്ഷത്തിലേക്ക് നീരാവി പുറത്തുവിടുന്നു (സ്വേദനം)", "മരങ്ങൾ കാറ്റിനെ തടയുന്നു"],
        logicAnswer: "മരങ്ങൾ അന്തരീക്ഷത്തിലേക്ക് നീരാവി പുറത്തുവിടുന്നു (സ്വേദനം)"
      },
      'sci-4-8': {
        missionTitle: "കാലാവസ്ഥാ നിയന്ത്രണ മുറി",
        story: "ഭൂമിയിലെ ചൂട് കൂട്ടുന്ന വാതകങ്ങൾ പഠിക്കുക.",
        primaryConcept: "ഹരിതഗൃഹ പ്രഭാവം",
        learningObjective: "പ്രധാന ഹരിതഗൃഹ വാതകം കണ്ടെത്തുക.",
        missionObjective: "ഹരിതഗൃഹ വാതകം കണ്ടെത്തുക.",
        hint: "ഇന്ധനങ്ങൾ കത്തിക്കുമ്പോൾ ഉണ്ടാകുന്ന വാതകമാണിത്.",
        feedbackIncorrect: "കാർബൺ ഡൈ ഓക്സൈഡ് ആണ് ചൂട് കൂട്ടുന്ന പ്രധാന വാതകം.",
        logicPremise: "ഹരിതഗൃഹ പ്രഭാവത്തിന് കാരണമാകുന്ന പ്രധാന വാതകം ഏതാണ്?",
        logicOptions: ["ഓക്സിജൻ", "നൈട്രജൻ", "കാർബൺ ഡൈ ഓക്സൈഡ്", "ഹൈഡ്രജൻ"],
        logicAnswer: "കാർബൺ ഡൈ ഓക്സൈഡ്"
      },
      'sci-4-9': {
        missionTitle: "ശാസ്ത്രജ്ഞന്റെ അവസാന പസിൽ",
        story: "പരീക്ഷണത്തിൽ താപനിലയുടെ പങ്ക് കണ്ടെത്തുക.",
        primaryConcept: "ഇൻഡിപെൻഡന്റ് വേരിയബിൾ",
        learningObjective: "ഇൻഡിപെൻഡന്റ് വേരിയബിൾ തിരിച്ചറിയുക.",
        missionObjective: "വേരിയബിൾ തരം കണ്ടെത്തുക.",
        hint: "'ഞാൻ' മാറ്റുന്ന വേരിയബിളാണ് ഇൻഡിപെൻഡന്റ് വേരിയബിൾ.",
        feedbackIncorrect: "പരീക്ഷകൻ ഉദ്ദേശപൂർവ്വം മാറ്റുന്ന വേരിയബിളാണ് ഇൻഡിപെൻഡന്റ് വേരിയബിൾ.",
        logicPremise: "ഒരു ശാസ്ത്രജ്ഞൻ താപനില മാത്രം മാറ്റി പരീക്ഷണം നടത്തുന്നു. ഇവിടെ താപനില എന്നത്...",
        logicOptions: ["കൺട്രോൾഡ് വേരിയബിൾ", "ഡിപ്പൻഡന്റ് വേരിയബിൾ", "ഇൻഡിപെൻഡന്റ് വേരിയബിൾ", "നിഗമനം"],
        logicAnswer: "ഇൻഡിപെൻഡന്റ് വേരിയബിൾ"
      },
      'sci-4-10': {
        missionTitle: "സ്റ്റേജ് 4 ബോസ് — ഫ്യൂച്ചർ സിറ്റി മാസ്റ്ററി",
        story: "അവസാന പരീക്ഷണം! ഭാവിയുടെ നഗരത്തെ പൂർണ്ണ തകർച്ചയിൽ നിന്ന് രക്ഷിക്കാൻ നിങ്ങളുടെ എല്ലാ സയൻസ് അറിവുകളും ഉപയോഗിക്കുക.",
        primaryConcept: "സയൻസ് സ്റ്റേജ് 4 സമ്പൂർണ്ണ മാസ്റ്ററി",
        learningObjective: "ശാസ്ത്ര ആശയങ്ങൾ പൂർണ്ണമായി സ്വായത്തമാക്കുക.",
        missionObjective: "നഗരത്തെ രക്ഷിക്കാൻ 4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "ശാസ്ത്രത്തിലെ നിങ്ങളുടെ സമ്പൂർണ്ണ അറിവ് പ്രയോഗിക്കുക.",
        feedbackIncorrect: "നിങ്ങൾ ഒരു ഘട്ടത്തിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          {
            title: "രീതി പ്രോട്ടോക്കോൾ",
            description: "ശരിയായ ശാസ്ത്ര രീതി ക്രമീകരിക്കുക.",
            instruction: "ശരിയായ ക്രമം തിരഞ്ഞെടുക്കുക.",
            logicPremise: "ശാസ്ത്രീയ രീതിയുടെ ശരിയായ ക്രമം ഏതാണ്?",
            logicOptions: [
              "പരീക്ഷണം→ചോദ്യം→ഹൈപ്പോതെസിസ്→ഫലം",
              "ചോദ്യം→ഹൈപ്പോതെസിസ്→പരീക്ഷണം→ഫലം→നിഗമനം",
              "ഫലം→ചോദ്യം→പരീക്ഷണം→ഹൈപ്പോതെസിസ്",
              "ഹൈപ്പോതെസിസ്→ചോദ്യം→ഫലം→പരീക്ഷണം"
            ],
            logicAnswer: "ചോദ്യം→ഹൈപ്പോതെസിസ്→പരീക്ഷണം→ഫലം→നിഗമനം"
          },
          {
            title: "അന്തരീക്ഷ സമീകരണം",
            description: "CO2 നിയന്ത്രിക്കുന്ന സ്വാഭാവിക ചക്രം കണ്ടെത്തുക.",
            instruction: "ശരിയായ ചക്രം തിരഞ്ഞെടുക്കുക.",
            logicPremise: "നഗരം CO2 പുറത്തുവിടുന്നു. വനത്തിലെ സസ്യങ്ങൾ അത് സ്വീകരിക്കുന്നു. ഇത് ഏതിന് ഉദാഹരണമാണ്?",
            logicOptions: ["ജലചക്രം", "കാർബൺ ചക്രം", "നൈട്രജൻ ചക്രം", "ഓക്സിജൻ ചക്രം"],
            logicAnswer: "കാർബൺ ചക്രം"
          },
          {
            title: "പവർ ഔട്ട്പുട്ട്",
            description: "ഷീൽഡുകൾക്ക് ആവശ്യമായ പവർ കണക്കാക്കുക.",
            instruction: "പവർ കണ്ടെത്തുക."
          },
          {
            title: "നഗര പരിസ്ഥിതി",
            description: "വന്യജീവികളെ സംരക്ഷിക്കാൻ പദ്ധതി നടപ്പിലാക്കുക.",
            instruction: "ഏറ്റവും നല്ല വഴി തിരഞ്ഞെടുക്കുക.",
            logicPremise: "നഗരത്തിൽ ജീവജാലങ്ങളെ സംരക്ഷിക്കാൻ ഏറ്റവും അനുയോജ്യമായ വഴി ഏതാണ്?",
            logicOptions: [
              "കൂടുതൽ റോഡുകൾ ഉണ്ടാക്കുക",
              "മരങ്ങൾ വെച്ചുപിടിപ്പിക്കുകയും ഹരിത പാതകൾ ഉണ്ടാക്കുകയും ചെയ്യുക",
              "എല്ലാ പുഴകളും നികത്തുക",
              "കെട്ടിടങ്ങളുടെ ഉയരം കൂട്ടുക"
            ],
            logicAnswer: "മരങ്ങൾ വെച്ചുപിടിപ്പിക്കുകയും ഹരിത പാതകൾ ഉണ്ടാക്കുകയും ചെയ്യുക"
          }
        ]
      }
    },
    fragments: {
      f1: "സയൻസ് കഷ്ണം 1",
      f2: "സയൻസ് കഷ്ണം 2",
      f3: "സയൻസ് കഷ്ണം 3",
      f4: "സയൻസ് കഷ്ണം 4",
      acquired: "സയൻസ് കഷ്ണം സ്വന്തമാക്കി!",
      desc: "നിങ്ങൾ സയൻസ് സ്റ്റോണിന്റെ ഒരു ഭാഗം സ്വന്തമാക്കി."
    },
    stone: {
      title: "സയൻസ് സ്റ്റോൺ",
      acquired: "സയൻസ് സ്റ്റോൺ സ്വന്തമാക്കി!",
      desc: "നിങ്ങൾ സയൻസ് പാതയിൽ പൂർണ്ണ മാസ്റ്ററി നേടുകയും പ്രപഞ്ചത്തിന്റെ രഹസ്യങ്ങൾ തിരിച്ചറിയുകയും ചെയ്തു."
    },
    achievements: {
      initiate: { title: "സയൻസ് തുടക്കക്കാരൻ", desc: "സയൻസ് വിഭാഗത്തിന്റെ സ്റ്റേജ് 1 പൂർത്തിയാക്കി." },
      physics: { title: "ഫിസിക്സ് മുൻഗാമി", desc: "ചലനം, ബലങ്ങൾ, ഭൗതിക നിയമങ്ങൾ എന്നിവയിൽ മാസ്റ്ററി നേടി." },
      chemistry: { title: "കെമിസ്ട്രി അന്വേഷകൻ", desc: "പദാർത്ഥ അവസ്ഥകൾ, രാസപ്രവർത്തനങ്ങൾ, pH എന്നിവയിൽ മാസ്റ്ററി നേടി." },
      biology: { title: "ബയോളജി കണ്ടെത്തൽക്കാരൻ", desc: "കോശങ്ങൾ, മനുഷ്യ വ്യവസ്ഥകൾ, പരിസ്ഥിതി എന്നിവയിൽ മാസ്റ്ററി നേടി." },
      master: { title: "സയൻസ് മാസ്റ്റർ", desc: "എല്ലാ 40 സയൻസ് ലെവലുകളും പൂർത്തിയാക്കി സയൻസ് സ്റ്റോൺ അസംബിൾ ചെയ്തു!" }
    }
  }
};
