// ============================================================
// S.H.I.E.L.D. Platform — Mathematics Curriculum Multilingual Data
// Complete 40 Levels, 4 Stages, 4 Bosses, 4 Fragments & Axiom Stone
// Languages: English (en), Tamil (ta), Hindi (hi), Malayalam (ml)
// ============================================================

import type { DomainTranslation } from './scienceCurriculumData';

export const mathCurriculumData: Record<'en' | 'ta' | 'hi' | 'ml', DomainTranslation> = {
  en: {
    title: "MATHEMATICS DOMAIN",
    subtitle: "Patterns, Logic & Universal Equations",
    intro: "Explore arithmetic, algebra, geometry, and logic to master the universal language of mathematics.",
    stages: {
      'stage-1': {
        title: "STAGE 1 — DISCOVER",
        subtitle: "Foundations of Mathematics",
        desc: "Master basic arithmetic sequences, one-step equations, fractional allocations, and coordinate navigation.",
        concept: "Arithmetic & Basic Algebra",
        learningObjective: "Understand sequences, equations, fractions, and grid geometry.",
        reward: "Mathematics Fragment 1"
      },
      'stage-2': {
        title: "STAGE 2 — UNDERSTAND",
        subtitle: "Equations & Ratios",
        desc: "Solve two-step linear equations, ratios, percents, perimeter, area, and logic gates.",
        concept: "Equations & Geometric Measurement",
        learningObjective: "Master multi-step algebraic isolating, ratios, and area formulas.",
        reward: "Mathematics Fragment 2"
      },
      'stage-3': {
        title: "STAGE 3 — APPLIED MATH",
        subtitle: "Statistics & Spatial Math",
        desc: "Analyze graph data, 3D volume, probability, exponents, and system optimization.",
        concept: "Data Analysis & Spatial Geometry",
        learningObjective: "Interpret coordinate models, volume formulas, and statistical trends.",
        reward: "Mathematics Fragment 3"
      },
      'stage-4': {
        title: "STAGE 4 — MASTERY",
        subtitle: "Advanced Logic & Mastery",
        desc: "Master system of equations, quadratic patterns, complex optimization, and mathematical proofs.",
        concept: "Advanced Mathematics & Core Mastery",
        learningObjective: "Integrate multi-variable equations and complete the Axiom Stone.",
        reward: "Mathematics Fragment 4 & Axiom Stone"
      }
    },
    levels: {
      'math-1-1': {
        missionTitle: "THE POWER GRID TRIGGER",
        story: "An EMP blackout has locked the backup solar grids. Match the arithmetic sequence frequency pulsating from the core.",
        primaryConcept: "Arithmetic Sequences",
        learningObjective: "Identify and extend linear sequences by adding constant increments.",
        missionObjective: "Determine the missing number to complete the frequency sequence: 3, 6, 9, 12, ...",
        hint: "Look at the gap between each adjacent number. Add 3 to the last term (12).",
        feedbackIncorrect: "Incorrect sequence frequency. Each step adds exactly 3. Try adding 3 to 12.",
        logicPremise: "Find the next number in the pattern: 3, 6, 9, 12, ?",
        logicOptions: ["13", "14", "15", "18"],
        logicAnswer: "15"
      },
      'math-1-2': {
        missionTitle: "CALIBRATE THE VALVES",
        story: "Steam pressure is rising in the hydraulic sub-station. Solve the equation for the pressure regulator.",
        primaryConcept: "Simple Linear Equations",
        learningObjective: "Isolate a single variable in a one-step additive equation.",
        missionObjective: "Determine the value of variable X in the stabilizer loop: X + 7 = 15.",
        hint: "To solve for X, subtract 7 from 15.",
        feedbackIncorrect: "Make sure to subtract 7 from 15 to isolate variable X.",
        logicPremise: "Solve for X: X + 7 = 15",
        logicOptions: ["6", "7", "8", "22"],
        logicAnswer: "8"
      },
      'math-1-3': {
        missionTitle: "DISTRIBUTE MEDICAL SUPPLIES",
        story: "Three emergency shelters require medical rations. Distribute the 12 ration packs proportionally.",
        primaryConcept: "Fractional Proportions",
        learningObjective: "Apply fractional operators to split integer resources.",
        missionObjective: "Distribute 12 medicine crates: half to Shelter A, 1/3 to Shelter B, and 1/6 to Shelter C.",
        hint: "1/2 of 12 is 6, 1/3 of 12 is 4, and 1/6 of 12 is 2.",
        feedbackIncorrect: "Improper distribution. Allocate 6 crates to A, 4 to B, and 2 to C."
      },
      'math-1-[#rem1]': {
        missionTitle: "GRID PROBE NAVIGATION",
        story: "Guide the supply drone through the energy field grid to reach coordinates [4, 3].",
        primaryConcept: "Coordinate Geometry",
        learningObjective: "Plot coordinates on a 2D Cartesian plane.",
        missionObjective: "Navigate the drone from [0,0] to [4,3].",
        hint: "Move along X (right) first, then along Y (up).",
        feedbackIncorrect: "The probe went off course. Reach X=4, Y=3!"
      },
      'math-1-5': {
        missionTitle: "GEOMETRIC SHIELD CONTAINMENT",
        story: "Calculate the perimeter of the rectangular shield barrier.",
        primaryConcept: "Perimeter Calculations",
        learningObjective: "Calculate the perimeter of a rectangle.",
        missionObjective: "Find the perimeter of a 6m by 4m rectangle.",
        hint: "Perimeter = 2 × (Length + Width).",
        feedbackIncorrect: "Add all four sides: 6 + 4 + 6 + 4 = 20m.",
        logicPremise: "What is the perimeter of a 6m long and 4m wide rectangular shield?",
        logicOptions: ["10m", "20m", "24m", "30m"],
        logicAnswer: "20m"
      },
      'math-1-6': {
        missionTitle: "BINARY DATA SIGNAL",
        story: "Convert the binary code into decimal to unlock the gate.",
        primaryConcept: "Binary System",
        learningObjective: "Convert binary numbers to decimal.",
        missionObjective: "Convert binary 101 to decimal.",
        hint: "Binary 101 = 4 + 0 + 1 = 5.",
        feedbackIncorrect: "101 in binary is 5 in decimal.",
        logicPremise: "What is binary 101 in decimal?",
        logicOptions: ["3", "4", "5", "6"],
        logicAnswer: "5"
      },
      'math-1-7': {
        missionTitle: "PERCENTAGE ENERGY CHARGE",
        story: "The battery core needs to reach 75% charge. If max capacity is 200 units, how many units are needed?",
        primaryConcept: "Percentages",
        learningObjective: "Calculate percentage of a quantity.",
        missionObjective: "Find 75% of 200.",
        hint: "75% of 200 is (75/100) × 200 = 150.",
        feedbackIncorrect: "Multiply 200 by 0.75 to get 150.",
        logicPremise: "What is 75% of 200 units?",
        logicOptions: ["100", "120", "150", "175"],
        logicAnswer: "150"
      },
      'math-1-8': {
        missionTitle: "PROBABILITY CALCULATOR",
        story: "A box contains 3 red energy cells and 7 blue energy cells. What is the probability of picking a red cell?",
        primaryConcept: "Basic Probability",
        learningObjective: "Calculate simple probabilities.",
        missionObjective: "Find the probability of selecting a red cell.",
        hint: "Probability = Red cells / Total cells.",
        feedbackIncorrect: "Total cells = 3 + 7 = 10. Probability = 3/10 = 30%.",
        logicPremise: "3 red cells and 7 blue cells. Probability of pulling a red cell?",
        logicOptions: ["3/10 (30%)", "7/10 (70%)", "1/2 (50%)", "3/7"],
        logicAnswer: "3/10 (30%)"
      },
      'math-1-9': {
        missionTitle: "EQUATION BALANCING",
        story: "Solve the balance equation: 3X + 2 = 14.",
        primaryConcept: "Two-Step Equations",
        learningObjective: "Solve two-step linear equations.",
        missionObjective: "Find X in 3X + 2 = 14.",
        hint: "Subtract 2 from 14 (gives 12), then divide by 3 (gives 4).",
        feedbackIncorrect: "3X = 12, so X = 4.",
        logicPremise: "Solve for X: 3X + 2 = 14",
        logicOptions: ["3", "4", "5", "6"],
        logicAnswer: "4"
      },
      'math-1-10': {
        missionTitle: "STAGE 1 BOSS — MATHEMATICAL FOUNDATIONS MASTERY",
        story: "Master all core foundations of arithmetic, algebra, and geometry to stabilize the central portal grid!",
        primaryConcept: "Comprehensive Mathematics Stage 1",
        learningObjective: "Apply sequences, equations, fractions, and geometry.",
        missionObjective: "Complete all 4 phases to secure the grid.",
        hint: "Recall everything you learned in Stage 1.",
        feedbackIncorrect: "You failed a phase. Try again!",
        phases: [
          {
            title: "Frequency Sequence",
            description: "Complete the sequence: 5, 10, 15, 20, ?",
            instruction: "Select the next number.",
            logicPremise: "5, 10, 15, 20, ?",
            logicOptions: ["22", "25", "30", "35"],
            logicAnswer: "25"
          },
          {
            title: "Valve Equation",
            description: "Solve: X - 8 = 12",
            instruction: "Find X.",
            logicPremise: "X - 8 = 12",
            logicOptions: ["16", "18", "20", "24"],
            logicAnswer: "20"
          },
          {
            title: "Ration Allocation",
            description: "Divide 20 units into halves.",
            instruction: "Calculate half of 20."
          },
          {
            title: "Area Barrier",
            description: "Calculate area of a 5m by 4m rectangle.",
            instruction: "Area = Length × Width.",
            logicPremise: "Area of a 5m × 4m rectangle?",
            logicOptions: ["9 m²", "18 m²", "20 m²", "25 m²"],
            logicAnswer: "20 m²"
          }
        ]
      },
      'math-2-1': { missionTitle: "ALGEBRAIC MATRIX", story: "Solve 2X + 4 = 16.", primaryConcept: "Algebraic Isolation", learningObjective: "Solve two-step linear equations.", missionObjective: "Find X.", hint: "Subtract 4 then divide by 2.", feedbackIncorrect: "2X = 12, X = 6.", logicPremise: "2X + 4 = 16. What is X?", logicOptions: ["4", "5", "6", "8"], logicAnswer: "6" },
      'math-2-2': { missionTitle: "TRIANGLE ANGLE", story: "Two angles of a triangle are 60° and 70°. Find the third angle.", primaryConcept: "Angles of a Triangle", learningObjective: "Sum of angles in a triangle is 180°.", missionObjective: "Find the third angle.", hint: "180 - (60 + 70) = 50°.", feedbackIncorrect: "Sum of angles = 180°. 180 - 130 = 50°.", logicPremise: "Third angle of triangle with 60° and 70°?", logicOptions: ["40°", "50°", "60°", "70°"], logicAnswer: "50°" },
      'math-2-3': { missionTitle: "RATIO MIXTURE", story: "Mix fuel and water in ratio 3:1. Total is 20 liters. How much fuel?", primaryConcept: "Ratios", learningObjective: "Divide a quantity by a given ratio.", missionObjective: "Find fuel volume.", hint: "Total parts = 3+1 = 4. 20/4 = 5. Fuel = 3×5 = 15.", feedbackIncorrect: "Fuel is 15 liters.", logicPremise: "Fuel:Water = 3:1. Total = 20L. Fuel = ?", logicOptions: ["10L", "12L", "15L", "16L"], logicAnswer: "15L" },
      'math-2-4': { missionTitle: "AVERAGE SPEED", story: "A vehicle travels 120 km in 2 hours. What is its average speed?", primaryConcept: "Speed & Rate", learningObjective: "Speed = Distance / Time.", missionObjective: "Find average speed.", hint: "120 divided by 2 = 60 km/h.", feedbackIncorrect: "120 / 2 = 60 km/h.", logicPremise: "Speed for 120km in 2 hours?", logicOptions: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"], logicAnswer: "60 km/h" },
      'math-2-5': { missionTitle: "EXPONENT POWER", story: "Calculate 2⁴.", primaryConcept: "Exponents", learningObjective: "Understand power of numbers.", missionObjective: "Evaluate 2⁴.", hint: "2 × 2 × 2 × 2 = 16.", feedbackIncorrect: "2⁴ = 16.", logicPremise: "What is 2⁴?", logicOptions: ["8", "12", "16", "32"], logicAnswer: "16" },
      'math-2-6': { missionTitle: "CIRCLE CIRCUMFERENCE", story: "Find radius if diameter is 14 cm.", primaryConcept: "Circle Geometry", learningObjective: "Radius = Diameter / 2.", missionObjective: "Find radius.", hint: "14 / 2 = 7 cm.", feedbackIncorrect: "Radius = 14 / 2 = 7 cm.", logicPremise: "Radius of a circle with diameter 14cm?", logicOptions: ["5cm", "6cm", "7cm", "28cm"], logicAnswer: "7cm" },
      'math-2-7': { missionTitle: "PYTHAGOREAN THEOREM", story: "A right triangle has legs 3m and 4m. Find hypotenuse.", primaryConcept: "Pythagorean Theorem", learningObjective: "a² + b² = c².", missionObjective: "Find hypotenuse c.", hint: "3² + 4² = 9 + 16 = 25. √25 = 5.", feedbackIncorrect: "Hypotenuse = 5m.", logicPremise: "Hypotenuse of legs 3 and 4?", logicOptions: ["5", "6", "7", "25"], logicAnswer: "5" },
      'math-2-8': { missionTitle: "SLOPE OF A LINE", story: "Line rises 6 units vertically for every 2 units horizontally. Find slope.", primaryConcept: "Linear Slope", learningObjective: "Slope = Rise / Run.", missionObjective: "Find slope.", hint: "6 / 2 = 3.", feedbackIncorrect: "Slope = 6 / 2 = 3.", logicPremise: "Slope for rise=6, run=2?", logicOptions: ["2", "3", "4", "12"], logicAnswer: "3" },
      'math-2-9': { missionTitle: "SIMULTANEOUS EQUATIONS", story: "X + Y = 10 and X - Y = 2. Find X.", primaryConcept: "Systems of Equations", learningObjective: "Solve linear systems.", missionObjective: "Find X.", hint: "Add equations: 2X = 12, so X = 6.", feedbackIncorrect: "2X = 12, X = 6.", logicPremise: "X + Y = 10 and X - Y = 2. X = ?", logicOptions: ["5", "6", "7", "8"], logicAnswer: "6" },
      'math-2-10': {
        missionTitle: "STAGE 2 BOSS — ALGEBRA & GEOMETRY MASTERY",
        story: "Master linear equations, ratios, and geometry to secure the Axiom Node!",
        primaryConcept: "Mathematics Stage 2 Mastery",
        learningObjective: "Apply algebra, geometry, and system calculations.",
        missionObjective: "Complete all 4 phases.",
        hint: "Recall equations and geometric theorems.",
        feedbackIncorrect: "Phase failed. Try again!",
        phases: [
          { title: "Linear Check", description: "Solve 4X = 32", instruction: "Find X.", logicPremise: "4X = 32", logicOptions: ["6", "7", "8", "9"], logicAnswer: "8" },
          { title: "Ratio Mix", description: "Ratio 2:3, total 25. Find larger part.", instruction: "Calculate larger share.", logicPremise: "Larger part of 25 in ratio 2:3?", logicOptions: ["10", "12", "15", "18"], logicAnswer: "15" },
          { title: "Right Triangle", description: "Legs 6 and 8. Find hypotenuse.", instruction: "Apply Pythagorean theorem." },
          { title: "Speed Rate", description: "180 km in 3 hours. Speed?", instruction: "Calculate speed.", logicPremise: "180km / 3h = ?", logicOptions: ["50", "60", "70", "90"], logicAnswer: "60" }
        ]
      },
      'math-3-1': { missionTitle: "DATA MEAN", story: "Find average of 4, 8, 12, 16.", primaryConcept: "Mean & Statistics", learningObjective: "Calculate average.", missionObjective: "Find mean.", hint: "(4+8+12+16)/4 = 40/4 = 10.", feedbackIncorrect: "Mean = 40 / 4 = 10.", logicPremise: "Average of 4, 8, 12, 16?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'math-3-2': { missionTitle: "DATA MEDIAN", story: "Find median of 3, 7, 9, 15, 21.", primaryConcept: "Median", learningObjective: "Find middle value.", missionObjective: "Find median.", hint: "Middle value in ordered set is 9.", feedbackIncorrect: "Median is 9.", logicPremise: "Median of 3, 7, 9, 15, 21?", logicOptions: ["7", "9", "12", "15"], logicAnswer: "9" },
      'math-3-3': { missionTitle: "CYLINDER VOLUME", story: "Base area = 10 m², height = 5 m. Find volume.", primaryConcept: "Volume", learningObjective: "Volume = Base Area × Height.", missionObjective: "Find volume.", hint: "10 × 5 = 50 m³.", feedbackIncorrect: "10 × 5 = 50 m³.", logicPremise: "Volume with base area 10m² and height 5m?", logicOptions: ["15 m³", "25 m³", "50 m³", "100 m³"], logicAnswer: "50 m³" },
      'math-3-4': { missionTitle: "QUADRATIC SQUARES", story: "Find X if X² = 49.", primaryConcept: "Square Roots", learningObjective: "Solve X² = N.", missionObjective: "Find positive X.", hint: "√49 = 7.", feedbackIncorrect: "√49 = 7.", logicPremise: "Positive X where X² = 49?", logicOptions: ["6", "7", "8", "9"], logicAnswer: "7" },
      'math-3-5': { missionTitle: "SIMPLE INTEREST", story: "Principal = $1000, Rate = 5%, Time = 2 years. Find interest.", primaryConcept: "Interest", learningObjective: "Interest = (P × R × T)/100.", missionObjective: "Find interest.", hint: "(1000 × 5 × 2)/100 = 100.", feedbackIncorrect: "Interest = $100.", logicPremise: "Interest on $1000 at 5% for 2 years?", logicOptions: ["$50", "$100", "$150", "$200"], logicAnswer: "$100" },
      'math-3-6': { missionTitle: "POLYGON ANGLES", story: "Find sum of interior angles of a pentagon (5 sides).", primaryConcept: "Polygon Geometry", learningObjective: "(n-2) × 180°.", missionObjective: "Find sum of angles.", hint: "(5-2) × 180 = 3 × 180 = 540°.", feedbackIncorrect: "(5-2) × 180 = 540°.", logicPremise: "Interior angle sum of 5-sided pentagon?", logicOptions: ["360°", "450°", "540°", "720°"], logicAnswer: "540°" },
      'math-3-7': { missionTitle: "FACTORIAL VALUES", story: "Calculate 4! (4 factorial).", primaryConcept: "Factorials", learningObjective: "4! = 4 × 3 × 2 × 1.", missionObjective: "Find 4!.", hint: "4 × 3 × 2 × 1 = 24.", feedbackIncorrect: "4! = 24.", logicPremise: "What is 4!?", logicOptions: ["12", "16", "24", "48"], logicAnswer: "24" },
      'math-3-8': { missionTitle: "COMBINATIONS", story: "How many ways to pick 2 items from 4 items?", primaryConcept: "Combinations", learningObjective: "Calculate combinations.", missionObjective: "Find C(4,2).", hint: "(4 × 3) / (2 × 1) = 6.", feedbackIncorrect: "C(4,2) = 6.", logicPremise: "Number of ways to choose 2 items from 4?", logicOptions: ["4", "6", "8", "12"], logicAnswer: "6" },
      'math-3-9': { missionTitle: "LOGARITHMIC SCALE", story: "Evaluate log₁₀(1000).", primaryConcept: "Logarithms", learningObjective: "Understand log base 10.", missionObjective: "Evaluate log₁₀(1000).", hint: "10³ = 1000, so log₁₀(1000) = 3.", feedbackIncorrect: "log₁₀(1000) = 3.", logicPremise: "What is log₁₀(1000)?", logicOptions: ["2", "3", "4", "10"], logicAnswer: "3" },
      'math-3-10': {
        missionTitle: "STAGE 3 BOSS — APPLIED MATH MASTERY",
        story: "Master statistics, volume, roots, and logarithms to protect the Axiom Vault!",
        primaryConcept: "Mathematics Stage 3 Mastery",
        learningObjective: "Apply statistics, exponents, and 3D geometry.",
        missionObjective: "Complete all 4 phases.",
        hint: "Apply data and exponent formulas.",
        feedbackIncorrect: "Phase failed. Try again!",
        phases: [
          { title: "Mean Check", description: "Average of 10, 20, 30?", instruction: "Find average.", logicPremise: "Average of 10, 20, 30?", logicOptions: ["15", "20", "25", "30"], logicAnswer: "20" },
          { title: "Square Root", description: "√81 = ?", instruction: "Find square root.", logicPremise: "√81 = ?", logicOptions: ["7", "8", "9", "10"], logicAnswer: "9" },
          { title: "Volume Calc", description: "Base 6m², height 4m.", instruction: "Calculate volume." },
          { title: "Logarithm", description: "log₁₀(100) = ?", instruction: "Find log.", logicPremise: "log₁₀(100) = ?", logicOptions: ["1", "2", "3", "4"], logicAnswer: "2" }
        ]
      },
      'math-4-1': { missionTitle: "QUADRATIC FORMULA", story: "Solve X² - 5X + 6 = 0.", primaryConcept: "Quadratic Equations", learningObjective: "Factor quadratic equations.", missionObjective: "Find roots.", hint: "(X-2)(X-3)=0, roots are 2 and 3.", feedbackIncorrect: "Roots are 2 and 3.", logicPremise: "Roots of X² - 5X + 6 = 0?", logicOptions: ["1 and 6", "2 and 3", "0 and 5", "-2 and -3"], logicAnswer: "2 and 3" },
      'math-4-2': { missionTitle: "MATRIX DETERMINANT", story: "Find determinant of 2x2 matrix [[4, 2], [1, 3]].", primaryConcept: "Matrices", learningObjective: "ad - bc.", missionObjective: "Calculate det.", hint: "(4×3) - (2×1) = 12 - 2 = 10.", feedbackIncorrect: "det = 12 - 2 = 10.", logicPremise: "det of [[4, 2], [1, 3]]?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'math-4-3': { missionTitle: "TRIGONOMETRIC SINE", story: "In a right triangle, opposite = 3, hypotenuse = 5. Find sin(θ).", primaryConcept: "Trigonometry", learningObjective: "sin = opposite / hypotenuse.", missionObjective: "Find sin(θ).", hint: "3 / 5 = 0.6.", feedbackIncorrect: "sin(θ) = 3/5 = 0.6.", logicPremise: "sin(θ) when opp=3, hyp=5?", logicOptions: ["0.5", "0.6", "0.75", "0.8"], logicAnswer: "0.6" },
      'math-4-4': { missionTitle: "DERIVATIVE RATE", story: "Find derivative of f(X) = X³ at X=2.", primaryConcept: "Calculus Derivatives", learningObjective: "f'(X) = 3X².", missionObjective: "Find f'(2).", hint: "3 × (2²) = 3 × 4 = 12.", feedbackIncorrect: "f'(2) = 12.", logicPremise: "Derivative of X³ at X=2?", logicOptions: ["6", "8", "12", "16"], logicAnswer: "12" },
      'math-4-5': { missionTitle: "INTEGRATION AREA", story: "Integrate f(X) = 2X from X=0 to X=3.", primaryConcept: "Calculus Integration", learningObjective: "∫ 2X dX = X².", missionObjective: "Evaluate ∫₀³ 2X dX.", hint: "3² - 0² = 9.", feedbackIncorrect: "∫₀³ 2X dX = 9.", logicPremise: "∫₀³ 2X dX = ?", logicOptions: ["6", "9", "12", "18"], logicAnswer: "9" },
      'math-4-6': { missionTitle: "VECTOR ADDITION", story: "Add vectors A = [3, 4] and B = [1, 2].", primaryConcept: "Vector Math", learningObjective: "Add component-wise.", missionObjective: "Find A + B.", hint: "[3+1, 4+2] = [4, 6].", feedbackIncorrect: "A + B = [4, 6].", logicPremise: "[3, 4] + [1, 2] = ?", logicOptions: ["[4, 6]", "[3, 8]", "[2, 2]", "[5, 5]"], logicAnswer: "[4, 6]" },
      'math-4-7': { missionTitle: "COMPLEX NUMBERS", story: "Multiply (2 + i)(2 - i).", primaryConcept: "Complex Numbers", learningObjective: "a² - b²i² = a² + b².", missionObjective: "Evaluate (2+i)(2-i).", hint: "4 - i² = 4 - (-1) = 5.", feedbackIncorrect: "Result = 5.", logicPremise: "Evaluate (2+i)(2-i):", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'math-4-8': { missionTitle: "GEOMETRIC PROGRESSION", story: "Find sum of infinite series 1 + 1/2 + 1/4 + 1/8 + ...", primaryConcept: "Infinite Series", learningObjective: "Sum = a / (1 - r).", missionObjective: "Find sum.", hint: "1 / (1 - 0.5) = 2.", feedbackIncorrect: "Sum = 2.", logicPremise: "Sum of 1 + 1/2 + 1/4 + ...?", logicOptions: ["1.5", "2", "2.5", "3"], logicAnswer: "2" },
      'math-4-9': { missionTitle: "OPTIMIZATION PROOF", story: "Find maximum value of f(X) = -(X - 3)² + 10.", primaryConcept: "Optimization", learningObjective: "Maximum at vertex.", missionObjective: "Find max value.", hint: "Maximum is 10 when X = 3.", feedbackIncorrect: "Maximum = 10.", logicPremise: "Max value of -(X-3)² + 10?", logicOptions: ["3", "7", "10", "13"], logicAnswer: "10" },
      'math-4-10': {
        missionTitle: "STAGE 4 BOSS — AXIOM STONE MASTERY",
        story: "The ultimate mathematical test! Use all your mastery of calculus, linear algebra, and geometry to assemble the Axiom Stone!",
        primaryConcept: "Comprehensive Mathematics Stage 4 Mastery",
        learningObjective: "Master integrated high-level mathematics.",
        missionObjective: "Complete all 4 phases to assemble the Axiom Stone.",
        hint: "Apply full mathematical integration.",
        feedbackIncorrect: "Phase failed. Try again!",
        phases: [
          { title: "Quadratic Root", description: "Roots of X² - 9 = 0", instruction: "Find positive root.", logicPremise: "Positive root of X² - 9 = 0?", logicOptions: ["2", "3", "4", "9"], logicAnswer: "3" },
          { title: "Trig Value", description: "sin(30°) = ?", instruction: "Find sin(30°).", logicPremise: "sin(30°) = ?", logicOptions: ["0.5", "0.707", "0.866", "1.0"], logicAnswer: "0.5" },
          { title: "Derivative Test", description: "Derivative of 5X at X=3.", instruction: "Calculate derivative." },
          { title: "Vector Sum", description: "[2, 3] + [4, 1] = ?", instruction: "Add vectors.", logicPremise: "[2, 3] + [4, 1] = ?", logicOptions: ["[6, 4]", "[5, 5]", "[6, 3]", "[7, 4]"], logicAnswer: "[6, 4]" }
        ]
      }
    },
    fragments: { f1: "Mathematics Fragment 1", f2: "Mathematics Fragment 2", f3: "Mathematics Fragment 3", f4: "Mathematics Fragment 4", acquired: "MATHEMATICS FRAGMENT ACQUIRED!", desc: "You earned a piece of the Axiom Stone." },
    stone: { title: "THE AXIOM STONE", acquired: "AXIOM STONE ACQUIRED!", desc: "You have mastered the Mathematics path and unlocked universal logic." },
    achievements: {
      initiate: { title: "MATHEMATICS INITIATE", desc: "Completed Stage 1 of the Mathematics Domain." },
      physics: { title: "NUMBER NAVIGATOR", desc: "Mastered sequences, equations, and arithmetic." },
      chemistry: { title: "ALGEBRA EXPLORER", desc: "Mastered linear systems, slopes, and ratios." },
      biology: { title: "GEOMETRY DISCOVERER", desc: "Mastered angles, Pythagorean theorem, and spatial models." },
      master: { title: "MATHEMATICS MASTER", desc: "Completed all 40 Mathematics levels and assembled the Axiom Stone!" }
    }
  },

  ta: {
    title: "கணிதப் பிரிவு",
    subtitle: "அமைப்புகள், தர்க்கம் & அகில சமன்பாடுகள்",
    intro: "கணிதத்தின் உலகளாவிய மொழியை மாஸ்டர் செய்ய கணிதம், இயற்கணிதம், வடிவியல் மற்றும் தர்க்கத்தை ஆராயுங்கள்.",
    stages: {
      'stage-1': { title: "நிலை 1 — கண்டுபிடி", subtitle: "கணித அடிப்படைகள்", desc: "அடிப்படை எண்கணிதத் தொடர்கள், சமன்பாடுகள், பின்னங்கள் மற்றும் ஆயத்தொலைவுகளை மாஸ்டர் செய்யுங்கள்.", concept: "எண்கணிதம் & அடிப்படை இயற்கணிதம்", learningObjective: "தொடர்கள், சமன்பாடுகள், பின்னங்கள் மற்றும் கட்ட வடிவவியலைப் புரிந்துகொள்ளுதல்.", reward: "கணிதத் துண்டு 1" },
      'stage-2': { title: "நிலை 2 — புரிந்துகொள்", subtitle: "சமன்பாடுகள் & விகிதங்கள்", desc: "இருபடிச் சமன்பாடுகள், விகிதங்கள், சதவீதங்கள், சுற்றளவு, பரப்பளவு மற்றும் தர்க்க வாயில்களைத் தீருங்கள்.", concept: "சமன்பாடுகள் & வடிவவியல் அளவீடு", learningObjective: "இயற்கணித மாறிகள், விகிதங்கள் மற்றும் பரப்பளவு சூத்திரங்களை மாஸ்டர் செய்தல்.", reward: "கணிதத் துண்டு 2" },
      'stage-3': { title: "நிலை 3 — பயன்பாட்டுக் கணிதம்", subtitle: "புள்ளியியல் & இடைவெளி கணிதம்", desc: "வரைபடத் தரவு, முப்பரிமாணக் கனஅளவு, நிகழ்தகவு, அடுக்குகள் மற்றும் அமைப்பு மேம்பாட்டை பகுப்பாய்வு செய்யுங்கள்.", concept: "தரவு பகுப்பாய்வு & வடிவவியல்", learningObjective: "ஆயத்தொலைவு மாதிரிகள், கனஅளவு சூத்திரங்கள் மற்றும் புள்ளியியல் போக்குகளை விளக்குதல்.", reward: "கணிதத் துண்டு 3" },
      'stage-4': { title: "நிலை 4 — மாஸ்டரி", subtitle: "உயர் தர்க்கம் & மாஸ்டரி", desc: "சமன்பாட்டு அமைப்புகள், இருபடி அமைப்புகள், சிக்கலான உகப்பாக்கம் மற்றும் கணித நிரூபணங்களை மாஸ்டர் செய்யுங்கள்.", concept: "உயர் கணிதம் & முதன்மை மாஸ்டரி", learningObjective: "பல மாறிகள் கொண்ட சமன்பாடுகளை ஒருங்கிணைத்து ஆக்சியம் கல்லை உருவாக்குதல்.", reward: "கணிதத் துண்டு 4 & ஆக்சியம் கல்" }
    },
    levels: {
      'math-1-1': { missionTitle: "மின் கட்ட அலைவரிசை", story: "சோலார் மின் கட்டத்தை இயக்க, போர்டல் மையத்திலிருந்து வரும் எண்கணிதத் தொடர் அலைவரிசையைப் பொருத்துங்கள்.", primaryConcept: "எண்கணிதத் தொடர்கள்", learningObjective: "நிலையான கூட்டுத் தொகையைக் கொண்டு தொடரை நீட்டிக்கவும்.", missionObjective: "தொடரை முழுமையாக்க விடுபட்ட எண்ணைக் கண்டறியவும்: 3, 6, 9, 12, ...", hint: "ஒவ்வொரு எண்ணுக்கும் இடையே உள்ள இடைவெளியைப் பாருங்கள். 12 உடன் 3 ஐக் கூட்டுங்கள்.", feedbackIncorrect: "தவறான வரிசை. ஒவ்வொரு படியிலும் 3 கூடுகிறது. 12 உடன் 3 ஐக் கூட்டுங்கள்.", logicPremise: "அடுத்த எண்ணைக் கண்டறியவும்: 3, 6, 9, 12, ?", logicOptions: ["13", "14", "15", "18"], logicAnswer: "15" },
      'math-1-2': { missionTitle: "வால்வுகளை சீரமைக்கவும்", story: "நீராவி அழுத்தம் உயர்கிறது. அழுத்த சீராக்கியின் சமன்பாட்டைத் தீர்க்கவும்.", primaryConcept: "எளிய நேரியல் சமன்பாடுகள்", learningObjective: "ஒற்றை மாறியைப் பிரித்தெடுக்கவும்.", missionObjective: "சமன்பாட்டில் X இன் மதிப்பைக் கண்டறியவும்: X + 7 = 15.", hint: "X ஐக் காண 15 இலிருந்து 7 ஐக் கழிக்கவும்.", feedbackIncorrect: "15 இலிருந்து 7 ஐக் கழிக்க நினைவில் கொள்ளுங்கள்.", logicPremise: "X + 7 = 15 எனில் X என்ன?", logicOptions: ["6", "7", "8", "22"], logicAnswer: "8" },
      'math-1-3': { missionTitle: "மருத்துவப் பொருட்கள் விநியோகம்", story: "12 மருந்துப் பொட்டலங்களை விகிதாசாரப் பக்கெட்டுகளில் பகிருங்கள்.", primaryConcept: "பின்ன விகிதங்கள்", learningObjective: "பின்னங்களைப் பயன்படுத்தி வளங்களைப் பிரிக்கவும்.", missionObjective: "12 மருந்துப் பெட்டிகளைப் பகிருங்கள்: முகாம் A (1/2), முகாம் B (1/3), முகாம் C (1/6).", hint: "12 இல் 1/2 என்பது 6, 1/3 என்பது 4, 1/6 என்பது 2.", feedbackIncorrect: "A விற்கு 6, B விற்கு 4, C விற்கு 2 அலகுகள் வழங்கப்பட வேண்டும்." },
      'math-1-[#rem1]': { missionTitle: "கட்ட ஆய்வு வழிசெலுத்தல்", story: "விநியோக ட்ரோனை [4, 3] ஆயத்தொலைவுகளுக்கு வழிகாட்டவும்.", primaryConcept: "ஆயத்தொலைவு வடிவவியல்", learningObjective: "2D தளத்தில் ஆயத்தொலைவுகளைக் குறிக்கவும்.", missionObjective: "[0,0] இலிருந்து [4,3] வரை செல்லவும்.", hint: "முதலில் X (வலது), பிறகு Y (மேலே) செல்லவும்.", feedbackIncorrect: "X=4, Y=3 ஐ அடையுங்கள்!" },
      'math-1-5': { missionTitle: "வடிவவியல் கேடயம்", story: "செவ்வகக் கேடயத்தின் சுற்றளவைக் கணக்கிடுங்கள்.", primaryConcept: "சுற்றளவு கணக்கீடு", learningObjective: "செவ்வகத்தின் சுற்றளவைக் கணக்கிடுங்கள்.", missionObjective: "6மீ × 4மீ செவ்வகத்தின் சுற்றளவைக் கண்டறியவும்.", hint: "சுற்றளவு = 2 × (நீளம் + அகலம்).", feedbackIncorrect: "அனைத்து 4 பக்கங்களையும் கூட்டுங்கள்: 6 + 4 + 6 + 4 = 20மீ.", logicPremise: "6மீ நீளமும் 4மீ அகலமும் கொண்ட செவ்வகத்தின் சுற்றளவு?", logicOptions: ["10மீ", "20மீ", "24மீ", "30மீ"], logicAnswer: "20மீ" },
      'math-1-6': { missionTitle: "இருநிலை தரவு சமிக்ஞை", story: "இருநிலை குறியீட்டை தசம எண்ணாக மாற்றவும்.", primaryConcept: "இருநிலை அமைப்பு", learningObjective: "இருநிலை எண்களை தசம எண்களாக மாற்றவும்.", missionObjective: "இருநிலை 101 ஐ தசமமாக மாற்றவும்.", hint: "இருநிலை 101 = 4 + 0 + 1 = 5.", feedbackIncorrect: "இருநிலை 101 என்பது தசமத்தில் 5 ஆகும்.", logicPremise: "இருநிலை 101 இன் தசம மதிப்பு என்ன?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'math-1-7': { missionTitle: "சதவீத ஆற்றல் சார்ஜ்", story: "பேட்டரி 75% சார்ஜ் அடைய வேண்டும். மொத்தம் 200 அலகுகள் எனில் எத்தனை அலகுகள் தேவை?", primaryConcept: "சதவீதங்கள்", learningObjective: "ஒரு அளவின் சதவீதத்தைக் கணக்கிடுங்கள்.", missionObjective: "200 இல் 75% ஐக் கண்டறியவும்.", hint: "(75/100) × 200 = 150.", feedbackIncorrect: "200 ஐ 0.75 ஆல் பெருக்குங்கள், 150 கிடைக்கும்.", logicPremise: "200 அலகுகளில் 75% எவ்வளவு?", logicOptions: ["100", "120", "150", "175"], logicAnswer: "150" },
      'math-1-8': { missionTitle: "நிகழ்தகவு கணிப்பான்", story: "ஒரு பெட்டியில் 3 சிவப்பு மற்றும் 7 நீல ஆற்றல் செல்கள் உள்ளன. சிவப்பு செல்லை எடுப்பதற்கான நிகழ்தகவு என்ன?", primaryConcept: "அடிப்படை நிகழ்தகவு", learningObjective: "எளிய நிகழ்தகவைக் கணக்கிடுங்கள்.", missionObjective: "சிவப்பு செல்லை எடுக்கும் நிகழ்தகவைக் கண்டறியவும்.", hint: "நிகழ்தகவு = சிவப்பு செல்கள் / மொத்த செல்கள்.", feedbackIncorrect: "மொத்த செல்கள் = 10. நிகழ்தகவு = 3/10 = 30%.", logicPremise: "3 சிவப்பு, 7 நீல செல்கள். சிவப்பு எடுக்கும் நிகழ்தகவு?", logicOptions: ["3/10 (30%)", "7/10 (70%)", "1/2 (50%)", "3/7"], logicAnswer: "3/10 (30%)" },
      'math-1-9': { missionTitle: "சமன்பாடு சமநிலை", story: "சமன்பாட்டைத் தீர்க்கவும்: 3X + 2 = 14.", primaryConcept: "இருபடிச் சமன்பாடுகள்", learningObjective: "இருபடி நேரியல் சமன்பாடுகளைத் தீர்க்கவும்.", missionObjective: "3X + 2 = 14 இல் X ஐக் காணவும்.", hint: "14 இலிருந்து 2 ஐக் கழிக்கவும் (12), பிறகு 3 ஆல் வகுக்கவும் (4).", feedbackIncorrect: "3X = 12, எனவே X = 4.", logicPremise: "3X + 2 = 14 எனில் X என்ன?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "4" },
      'math-1-10': {
        missionTitle: "நிலை 1 பாஸ் — கணித அடிப்படைகள் மாஸ்டரி",
        story: "போர்டல் கட்டத்தைப் பாதுகாக்க எண்கணிதம், இயற்கணிதம் மற்றும் வடிவவியலின் அனைத்து அடிப்படைகளையும் மாஸ்டர் செய்யுங்கள்!",
        primaryConcept: "கணித நிலை 1 மாஸ்டரி",
        learningObjective: "தொடர்கள், சமன்பாடுகள், பின்னங்கள் மற்றும் வடிவவியலைப் பயன்படுத்துங்கள்.",
        missionObjective: "அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "நிலை 1 இல் கற்ற அனைத்தையும் நினைவுகூருங்கள்.",
        feedbackIncorrect: "ஒரு கட்டத்தில் தோல்வியடைந்தீர்கள். மீண்டும் முயற்சிக்கவும்!",
        phases: [
          { title: "அலைவரிசைத் தொடர்", description: "தொடரை முழுமையாக்கவும்: 5, 10, 15, 20, ?", instruction: "அடுத்த எண்ணைத் தேர்ந்தெடுக்கவும்.", logicPremise: "5, 10, 15, 20, ?", logicOptions: ["22", "25", "30", "35"], logicAnswer: "25" },
          { title: "வால்வு சமன்பாடு", description: "தீர்க்கவும்: X - 8 = 12", instruction: "X ஐக் காணவும்.", logicPremise: "X - 8 = 12", logicOptions: ["16", "18", "20", "24"], logicAnswer: "20" },
          { title: "ரேஷன் பங்கீடு", description: "20 அலகுகளைப் பாதியாகப் பிரிக்கவும்.", instruction: "20 இல் பாதியைக் கணக்கிடுங்கள்." },
          { title: "பரப்பளவு கேடயம்", description: "5மீ × 4மீ செவ்வகத்தின் பரப்பளவு.", instruction: "பரப்பளவு = நீளம் × அகலம்.", logicPremise: "5மீ × 4மீ செவ்வகத்தின் பரப்பளவு?", logicOptions: ["9 சதுர மீட்டர்", "18 சதுர மீட்டர்", "20 சதுர மீட்டர்", "25 சதுர மீட்டர்"], logicAnswer: "20 சதுர மீட்டர்" }
        ]
      },
      'math-2-1': { missionTitle: "இயற்கணித மேட்ரிக்ஸ்", story: "தீர்க்கவும்: 2X + 4 = 16.", primaryConcept: "இயற்கணிதப் பிரித்தெடுத்தல்", learningObjective: "நேரியல் சமன்பாடுகளைத் தீர்க்கவும்.", missionObjective: "X ஐக் காணவும்.", hint: "4 ஐக் கழித்து 2 ஆல் வகுக்கவும்.", feedbackIncorrect: "2X = 12, X = 6.", logicPremise: "2X + 4 = 16 எனில் X என்ன?", logicOptions: ["4", "5", "6", "8"], logicAnswer: "6" },
      'math-2-2': { missionTitle: "முக்கோணக் கோணம்", story: "முக்கோணத்தின் இரு கோணங்கள் 60° மற்றும் 70°. மூன்றாவது கோணத்தைக் கண்டறியவும்.", primaryConcept: "முக்கோணக் கோணங்கள்", learningObjective: "முக்கோணத்தின் கோணங்களின் கூடுதல் 180°.", missionObjective: "மூன்றாவது கோணத்தைக் கண்டறியவும்.", hint: "180 - (60 + 70) = 50°.", feedbackIncorrect: "180 - 130 = 50°.", logicPremise: "60° மற்றும் 70° கொண்ட முக்கோணத்தின் 3வது கோணம்?", logicOptions: ["40°", "50°", "60°", "70°"], logicAnswer: "50°" },
      'math-2-3': { missionTitle: "விகிதக் கலவை", story: "எரிபொருள் மற்றும் நீரை 3:1 விகிதத்தில் கலக்கவும். மொத்தம் 20 லிட்டர். எவ்வளவு எரிபொருள்?", primaryConcept: "விகிதங்கள்", learningObjective: "கொடுக்கப்பட்ட விகிதத்தில் பிரிக்கவும்.", missionObjective: "எரிபொருள் அளவைக் கண்டறியவும்.", hint: "மொத்த பங்குகள் = 4. 20/4 = 5. எரிபொருள் = 3×5 = 15.", feedbackIncorrect: "எரிபொருள் 15 லிட்டர் ஆகும்.", logicPremise: "எரிபொருள்:நீர் = 3:1. மொத்தம் = 20L. எரிபொருள் = ?", logicOptions: ["10L", "12L", "15L", "16L"], logicAnswer: "15L" },
      'math-2-4': { missionTitle: "சராசரி வேகம்", story: "ஒரு வாகனம் 2 மணி நேரத்தில் 120 கி.மீ தூரம் செல்கிறது. அதன் சராசரி வேகம் என்ன?", primaryConcept: "வேகம் & வீதம்", learningObjective: "வேகம் = தூரம் / நேரம்.", missionObjective: "சராசரி வேகத்தைக் கண்டறியவும்.", hint: "120 / 2 = 60 கி.மீ/மணி.", feedbackIncorrect: "120 / 2 = 60 கி.மீ/மணி.", logicPremise: "2 மணி நேரத்தில் 120 கி.மீ செல்ல வேகம்?", logicOptions: ["50 கி.மீ/மணி", "60 கி.மீ/மணி", "70 கி.மீ/மணி", "80 கி.மீ/மணி"], logicAnswer: "60 கி.மீ/மணி" },
      'math-2-5': { missionTitle: "அடுக்கு எண்", story: "2⁴ இன் மதிப்பைக் கணக்கிடுங்கள்.", primaryConcept: "அடுக்குகள்", learningObjective: "அடுக்குகளின் மதிப்பைப் புரிந்துகொள்ளுங்கள்.", missionObjective: "2⁴ ஐக் கணக்கிடுங்கள்.", hint: "2 × 2 × 2 × 2 = 16.", feedbackIncorrect: "2⁴ = 16.", logicPremise: "2⁴ இன் மதிப்பு என்ன?", logicOptions: ["8", "12", "16", "32"], logicAnswer: "16" },
      'math-2-6': { missionTitle: "வட்டத்தின் சுற்றளவு", story: "விட்டம் 14 செ.மீ எனில் ஆரத்தைக் கண்டறியவும்.", primaryConcept: "வட்ட வடிவவியல்", learningObjective: "ஆரம் = விட்டம் / 2.", missionObjective: "ஆரத்தைக் கண்டறியவும்.", hint: "14 / 2 = 7 செ.மீ.", feedbackIncorrect: "ஆரம் = 14 / 2 = 7 செ.மீ.", logicPremise: "14 செ.மீ விட்டம் கொண்ட வட்டத்தின் ஆரம்?", logicOptions: ["5 செ.மீ", "6 செ.மீ", "7 செ.மீ", "28 செ.மீ"], logicAnswer: "7 செ.மீ" },
      'math-2-7': { missionTitle: "பித்தாகரஸ் தேற்றம்", story: "செங்கோண முக்கோணத்தின் பக்கங்கள் 3மீ மற்றும் 4மீ. கர்ணத்தைக் கண்டறியவும்.", primaryConcept: "பித்தாகரஸ் தேற்றம்", learningObjective: "a² + b² = c².", missionObjective: "கர்ணம் c ஐக் கண்டறியவும்.", hint: "3² + 4² = 9 + 16 = 25. √25 = 5.", feedbackIncorrect: "கர்ணம் = 5மீ.", logicPremise: "3 மற்றும் 4 பக்கங்கள் கொண்ட முக்கோணத்தின் கர்ணம்?", logicOptions: ["5", "6", "7", "25"], logicAnswer: "5" },
      'math-2-8': { missionTitle: "நேர்கோட்டின் சாய்வு", story: "ஒவ்வொரு 2 அலகுகள் கிடைமட்ட நகர்விற்கும் 6 அலகுகள் செங்குத்தாக உயர்கிறது. சாய்வைக் கண்டறியவும்.", primaryConcept: "நேரியல் சாய்வு", learningObjective: "சாய்வு = செங்குத்து உயர்வு / கிடைமட்ட நகர்வு.", missionObjective: "சாய்வைக் கண்டறியவும்.", hint: "6 / 2 = 3.", feedbackIncorrect: "சாய்வு = 6 / 2 = 3.", logicPremise: "உயர்வு=6, நகர்வு=2 எனில் சாய்வு?", logicOptions: ["2", "3", "4", "12"], logicAnswer: "3" },
      'math-2-9': { missionTitle: "ஒருங்கமை சமன்பாடுகள்", story: "X + Y = 10 மற்றும் X - Y = 2. X ஐக் காணவும்.", primaryConcept: "சமன்பாட்டு அமைப்புகள்", learningObjective: "நேரியல் அமைப்புகளைத் தீர்க்கவும்.", missionObjective: "X ஐக் காணவும்.", hint: "கூட்டவும்: 2X = 12, எனவே X = 6.", feedbackIncorrect: "2X = 12, X = 6.", logicPremise: "X + Y = 10 மற்றும் X - Y = 2 எனில் X = ?", logicOptions: ["5", "6", "7", "8"], logicAnswer: "6" },
      'math-2-10': {
        missionTitle: "நிலை 2 பாஸ் — இயற்கணிதம் & வடிவவியல் மாஸ்டரி",
        story: "இயற்கணிதச் சமன்பாடுகள், விகிதங்கள் மற்றும் வடிவவியலை மாஸ்டர் செய்யுங்கள்!",
        primaryConcept: "கணித நிலை 2 மாஸ்டரி",
        learningObjective: "இயற்கணிதம் மற்றும் வடிவவியலைப் பயன்படுத்துங்கள்.",
        missionObjective: "அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "சமன்பாடுகள் மற்றும் தேற்றங்களை நினைவில் கொள்க.",
        feedbackIncorrect: "தோல்வி. மீண்டும் முயற்சிக்கவும்!",
        phases: [
          { title: "நேரியல் சரிபார்ப்பு", description: "4X = 32 ஐத் தீர்க்கவும்", instruction: "X ஐக் காணவும்.", logicPremise: "4X = 32", logicOptions: ["6", "7", "8", "9"], logicAnswer: "8" },
          { title: "விகிதக் கலவை", description: "விகிதம் 2:3, மொத்தம் 25. பெரிய பகுதியைக் கண்டறியவும்.", instruction: "பெரிய பங்கைக் கணக்கிடுங்கள்.", logicPremise: "2:3 விகிதத்தில் 25 இன் பெரிய பகுதி?", logicOptions: ["10", "12", "15", "18"], logicAnswer: "15" },
          { title: "செங்கோண முக்கோணம்", description: "பக்கங்கள் 6 மற்றும் 8. கர்ணத்தைக் கண்டறியவும்.", instruction: "பித்தாகரஸ் தேற்றத்தைப் பயன்படுத்துங்கள்." },
          { title: "வேக வீதம்", description: "3 மணி நேரத்தில் 180 கி.மீ. வேகம்?", instruction: "வேகத்தைக் கணக்கிடுங்கள்.", logicPremise: "180 கி.மீ / 3 மணி = ?", logicOptions: ["50", "60", "70", "90"], logicAnswer: "60" }
        ]
      },
      'math-3-1': { missionTitle: "தரவுச் சராசரி", story: "4, 8, 12, 16 இன் சராசரியைக் கண்டறியவும்.", primaryConcept: "சராசரி & புள்ளியியல்", learningObjective: "சராசரியைக் கணக்கிடுங்கள்.", missionObjective: "சராசரியைக் காணவும்.", hint: "(4+8+12+16)/4 = 40/4 = 10.", feedbackIncorrect: "சராசரி = 40 / 4 = 10.", logicPremise: "4, 8, 12, 16 இன் சராசரி என்ன?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'math-3-2': { missionTitle: "தரவு இடைநிலை", story: "3, 7, 9, 15, 21 இன் இடைநிலையினைக் கண்டறியவும்.", primaryConcept: "இடைநிலை", learningObjective: "நடுப்பகுதி மதிப்பைக் கண்டறியவும்.", missionObjective: "இடைநிலையைக் காணவும்.", hint: "வரிசைப்படுத்தப்பட்ட நடுப்பகுதி மதிப்பு 9 ஆகும்.", feedbackIncorrect: "இடைநிலை 9 ஆகும்.", logicPremise: "3, 7, 9, 15, 21 இன் இடைநிலை எண் என்ன?", logicOptions: ["7", "9", "12", "15"], logicAnswer: "9" },
      'math-3-3': { missionTitle: "உருளை கனஅளவு", story: "அடிப்பரப்பு = 10 சதுர மீட்டர், உயரம் = 5 மீட்டர். கனஅளவைக் கண்டறியவும்.", primaryConcept: "கனஅளவு", learningObjective: "கனஅளவு = அடிப்பரப்பு × உயரம்.", missionObjective: "கனஅளவைக் காணவும்.", hint: "10 × 5 = 50 கன மீட்டர்.", feedbackIncorrect: "10 × 5 = 50 கன மீட்டர்.", logicPremise: "அடிப்பரப்பு 10m² மற்றும் உயரம் 5m கொண்ட உருளையின் கனஅளவு?", logicOptions: ["15 m³", "25 m³", "50 m³", "100 m³"], logicAnswer: "50 m³" },
      'math-3-4': { missionTitle: "வர்க்க மூலம்", story: "X² = 49 எனில் X ஐக் கண்டறியவும்.", primaryConcept: "வர்க்க மூலங்கள்", learningObjective: "X² = N ஐத் தீர்க்கவும்.", missionObjective: "நேர்மறை X ஐக் காணவும்.", hint: "√49 = 7.", feedbackIncorrect: "√49 = 7.", logicPremise: "X² = 49 எனில் நேர்மறை X மதிப்பு என்ன?", logicOptions: ["6", "7", "8", "9"], logicAnswer: "7" },
      'math-3-5': { missionTitle: "தனிவட்டி", story: "அசல் = ₹1000, வட்டி வீதம் = 5%, காலம் = 2 ஆண்டுகள். வட்டையைக் கண்டறியவும்.", primaryConcept: "வட்டி கணக்கீடு", learningObjective: "வட்டி = (P × R × T)/100.", missionObjective: "வட்டியைக் காணவும்.", hint: "(1000 × 5 × 2)/100 = 100.", feedbackIncorrect: "வட்டி = ₹100.", logicPremise: "₹1000 க்கு 5% வட்டி வீதத்தில் 2 ஆண்டு வட்டி?", logicOptions: ["₹50", "₹100", "₹150", "₹200"], logicAnswer: "₹100" },
      'math-3-6': { missionTitle: "கோணங்களின் கூடுதல்", story: "ஐங்கோணத்தின் (5 பக்கங்கள்) உட்கோணங்களின் கூடுதலைக் கண்டறியவும்.", primaryConcept: "பல கோண வடிவவியல்", learningObjective: "(n-2) × 180°.", missionObjective: "கூடுதலைக் காணவும்.", hint: "(5-2) × 180 = 540°.", feedbackIncorrect: "(5-2) × 180 = 540°.", logicPremise: "5 பக்கங்கள் கொண்ட ஐங்கோணத்தின் உட்கோணங்களின் கூடுதல்?", logicOptions: ["360°", "450°", "540°", "720°"], logicAnswer: "540°" },
      'math-3-7': { missionTitle: "காரணிப் பெருக்கம்", story: "4! (4 காரணிப் பெருக்கம்) ஐக் கணக்கிடுங்கள்.", primaryConcept: "காரணிப் பெருக்கம்", learningObjective: "4! = 4 × 3 × 2 × 1.", missionObjective: "4! ஐக் காணவும்.", hint: "4 × 3 × 2 × 1 = 24.", feedbackIncorrect: "4! = 24.", logicPremise: "4! இன் மதிப்பு என்ன?", logicOptions: ["12", "16", "24", "48"], logicAnswer: "24" },
      'math-3-8': { missionTitle: "சேர்க்கைகள்", story: "4 பொருட்களிலிருந்து 2 பொருட்களைத் தேர்ந்தெடுக்கும் வழிகள் எத்தனை?", primaryConcept: "சேர்க்கைகள்", learningObjective: "சேர்க்கைகளைக் கணக்கிடுங்கள்.", missionObjective: "C(4,2) ஐக் காணவும்.", hint: "(4 × 3) / (2 × 1) = 6.", feedbackIncorrect: "C(4,2) = 6.", logicPremise: "4 பொருட்களில் 2 பொருட்களைத் தேர்ந்தெடுக்கும் வழிகள்?", logicOptions: ["4", "6", "8", "12"], logicAnswer: "6" },
      'math-3-9': { missionTitle: "மடக்கை அளவுகோல்", story: "log₁₀(1000) ஐக் கணக்கிடுங்கள்.", primaryConcept: "மடக்கைகள்", learningObjective: "மடக்கையைப் புரிந்துகொள்ளுங்கள்.", missionObjective: "log₁₀(1000) ஐக் காணவும்.", hint: "10³ = 1000, எனவே log₁₀(1000) = 3.", feedbackIncorrect: "log₁₀(1000) = 3.", logicPremise: "log₁₀(1000) இன் மதிப்பு என்ன?", logicOptions: ["2", "3", "4", "10"], logicAnswer: "3" },
      'math-3-10': {
        missionTitle: "நிலை 3 பாஸ் — பயன்பாட்டுக் கணித மாஸ்டரி",
        story: "புள்ளியியல், கனஅளவு மற்றும் மடக்கைகளை மாஸ்டர் செய்யுங்கள்!",
        primaryConcept: "கணித நிலை 3 மாஸ்டரி",
        learningObjective: "புள்ளியியல் மற்றும் முப்பரிமாண வடிவவியலைப் பயன்படுத்துங்கள்.",
        missionObjective: "அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "தரவு மற்றும் அடுக்கு சூத்திரங்களைப் பயன்படுத்துங்கள்.",
        feedbackIncorrect: "தோல்வி. மீண்டும் முயற்சிக்கவும்!",
        phases: [
          { title: "சராசரி சரிபார்ப்பு", description: "10, 20, 30 இன் சராசரி?", instruction: "சராசரியைக் காணவும்.", logicPremise: "10, 20, 30 இன் சராசரி?", logicOptions: ["15", "20", "25", "30"], logicAnswer: "20" },
          { title: "வர்க்க மூலம்", description: "√81 = ?", instruction: "வர்க்க மூலத்தைக் காணவும்.", logicPremise: "√81 = ?", logicOptions: ["7", "8", "9", "10"], logicAnswer: "9" },
          { title: "கனஅளவு கணக்கீடு", description: "அடிப்பரப்பு 6m², உயரம் 4m.", instruction: "கனஅளவைக் கணக்கிடுங்கள்." },
          { title: "மடக்கை", description: "log₁₀(100) = ?", instruction: "மடக்கையைக் காணவும்.", logicPremise: "log₁₀(100) = ?", logicOptions: ["1", "2", "3", "4"], logicAnswer: "2" }
        ]
      },
      'math-4-1': { missionTitle: "இருபடிச் சமன்பாடு", story: "X² - 5X + 6 = 0 ஐத் தீர்க்கவும்.", primaryConcept: "இருபடிச் சமன்பாடுகள்", learningObjective: "இருபடிச் சமன்பாட்டைக் காரணிப்படுத்துங்கள்.", missionObjective: "மூலங்களைக் கண்டறியவும்.", hint: "(X-2)(X-3)=0, மூலங்கள் 2 மற்றும் 3.", feedbackIncorrect: "மூலங்கள் 2 மற்றும் 3.", logicPremise: "X² - 5X + 6 = 0 இன் மூலங்கள்?", logicOptions: ["1 மற்றும் 6", "2 மற்றும் 3", "0 மற்றும் 5", "-2 மற்றும் -3"], logicAnswer: "2 மற்றும் 3" },
      'math-4-2': { missionTitle: "அணிக் கோவை", story: "[[4, 2], [1, 3]] அணியின் அணிக் கோவையைக் கண்டறியவும்.", primaryConcept: "அணிகள்", learningObjective: "ad - bc ஐக் கணக்கிடுங்கள்.", missionObjective: "அணிக் கோவையைக் காணவும்.", hint: "(4×3) - (2×1) = 12 - 2 = 10.", feedbackIncorrect: "அணிக் கோவை = 10.", logicPremise: "[[4, 2], [1, 3]] இன் அணிக் கோவை?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'math-4-3': { missionTitle: "முக்கோணவியல் சைன்", story: "எதிர்ப்பக்கம் = 3, கர்ணம் = 5 எனில் sin(θ) ஐக் காணவும்.", primaryConcept: "முக்கோணவியல்", learningObjective: "sin = எதிர்ப்பக்கம் / கர்ணம்.", missionObjective: "sin(θ) ஐக் காணவும்.", hint: "3 / 5 = 0.6.", feedbackIncorrect: "sin(θ) = 3/5 = 0.6.", logicPremise: "எதிர்ப்பக்கம்=3, கர்ணம்=5 எனில் sin(θ)?", logicOptions: ["0.5", "0.6", "0.75", "0.8"], logicAnswer: "0.6" },
      'math-4-4': { missionTitle: "வகைக்கெழு வீதம்", story: "X=2 இல் f(X) = X³ இன் வகைக்கெழுவைக் கண்டறியவும்.", primaryConcept: "நுண்கணித வகைக்கெழு", learningObjective: "f'(X) = 3X².", missionObjective: "f'(2) ஐக் காணவும்.", hint: "3 × (2²) = 12.", feedbackIncorrect: "f'(2) = 12.", logicPremise: "X=2 இல் X³ இன் வகைக்கெழு என்ன?", logicOptions: ["6", "8", "12", "16"], logicAnswer: "12" },
      'math-4-5': { missionTitle: "தொகைக்கணிதப் பரப்பளவு", story: "X=0 முதல் X=3 வரை f(X) = 2X ஐத் தொகைப்படுத்துங்கள்.", primaryConcept: "தொகைக்கணிதம்", learningObjective: "∫ 2X dX = X².", missionObjective: "∫₀³ 2X dX ஐக் காணவும்.", hint: "3² - 0² = 9.", feedbackIncorrect: "∫₀³ 2X dX = 9.", logicPremise: "∫₀³ 2X dX இன் மதிப்பு என்ன?", logicOptions: ["6", "9", "12", "18"], logicAnswer: "9" },
      'math-4-6': { missionTitle: "வெக்டர் கூட்டல்", story: "வெக்டர்கள் A = [3, 4] மற்றும் B = [1, 2] ஐக் கூட்டுங்கள்.", primaryConcept: "வெக்டர் கணிதம்", learningObjective: "கூறுகளைக் கூட்டுங்கள்.", missionObjective: "A + B ஐக் காணவும்.", hint: "[3+1, 4+2] = [4, 6].", feedbackIncorrect: "A + B = [4, 6].", logicPremise: "[3, 4] + [1, 2] = ?", logicOptions: ["[4, 6]", "[3, 8]", "[2, 2]", "[5, 5]"], logicAnswer: "[4, 6]" },
      'math-4-7': { missionTitle: "சிக்கல் எண்கள்", story: "(2 + i)(2 - i) ஐப் பெருக்குங்கள்.", primaryConcept: "சிக்கல் எண்கள்", learningObjective: "a² + b².", missionObjective: "(2+i)(2-i) ஐக் காணவும்.", hint: "4 - (-1) = 5.", feedbackIncorrect: "மதிப்பு = 5.", logicPremise: "(2+i)(2-i) இன் மதிப்பு என்ன?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'math-4-8': { missionTitle: "பெருக்குத் தொடர்", story: "1 + 1/2 + 1/4 + 1/8 + ... முடிவிலித் தொடரின் கூடுதலைக் காணவும்.", primaryConcept: "முடிவிலித் தொடர்கள்", learningObjective: "கூடுதல் = a / (1 - r).", missionObjective: "கூடுதலைக் காணவும்.", hint: "1 / (1 - 0.5) = 2.", feedbackIncorrect: "கூடுதல் = 2.", logicPremise: "1 + 1/2 + 1/4 + ... தொடரின் கூடுதல்?", logicOptions: ["1.5", "2", "2.5", "3"], logicAnswer: "2" },
      'math-4-9': { missionTitle: "உகப்பாக்க நிரூபணம்", story: "f(X) = -(X - 3)² + 10 இன் பெரும மதிப்பைக் கண்டறியவும்.", primaryConcept: "உகப்பாக்கம்", learningObjective: "உச்சியில் பெரும மதிப்பு இருக்கும்.", missionObjective: "பெரும மதிப்பைக் காணவும்.", hint: "X = 3 எனில் பெரும மதிப்பு 10 ஆகும்.", feedbackIncorrect: "பெரும மதிப்பு = 10.", logicPremise: "-(X-3)² + 10 இன் பெரும மதிப்பு?", logicOptions: ["3", "7", "10", "13"], logicAnswer: "10" },
      'math-4-10': {
        missionTitle: "நிலை 4 பாஸ் — ஆக்சியம் கல் மாஸ்டரி",
        story: "இறுதி கணிதச் சோதனை! நுண்கணிதம் மற்றும் வெக்டர்களை மாஸ்டர் செய்து ஆக்சியம் கல்லை இணைக்கவும்!",
        primaryConcept: "கணித நிலை 4 முதன்மை மாஸ்டரி",
        learningObjective: "ஒருங்கிணைந்த உயர் கணிதத்தை மாஸ்டர் செய்யுங்கள்.",
        missionObjective: "அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "முழுமையான கணித அறிவைப் பயன்படுத்துங்கள்.",
        feedbackIncorrect: "தோல்வி. மீண்டும் முயற்சிக்கவும்!",
        phases: [
          { title: "இருபடி மூலம்", description: "X² - 9 = 0 இன் மூலங்கள்", instruction: "நேர்மறை மூலத்தைக் காணவும்.", logicPremise: "X² - 9 = 0 இன் நேர்மறை மூலம்?", logicOptions: ["2", "3", "4", "9"], logicAnswer: "3" },
          { title: "முக்கோணவியல் மதிப்பு", description: "sin(30°) = ?", instruction: "sin(30°) ஐக் காணவும்.", logicPremise: "sin(30°) = ?", logicOptions: ["0.5", "0.707", "0.866", "1.0"], logicAnswer: "0.5" },
          { title: "வகைக்கெழு சோதனை", description: "X=3 இல் 5X இன் வகைக்கெழு.", instruction: "வகைக்கெழுவைக் கணக்கிடுங்கள்." },
          { title: "வெக்டர் கூடுதல்", description: "[2, 3] + [4, 1] = ?", instruction: "வெக்டர்களைக் கூட்டுங்கள்.", logicPremise: "[2, 3] + [4, 1] = ?", logicOptions: ["[6, 4]", "[5, 5]", "[6, 3]", "[7, 4]"], logicAnswer: "[6, 4]" }
        ]
      }
    },
    fragments: { f1: "கணிதத் துண்டு 1", f2: "கணிதத் துண்டு 2", f3: "கணிதத் துண்டு 3", f4: "கணிதத் துண்டு 4", acquired: "கணிதக் கல் துண்டு பெறப்பட்டது!", desc: "ஆக்சியம் கல்லின் ஒரு துண்டை பெற்றுள்ளாய்." },
    stone: { title: "ஆக்சியம் கல்", acquired: "ஆக்சியம் கல் பெறப்பட்டது!", desc: "நீ கணிதப் பாதையை மாஸ்டர் செய்து அகில தர்க்கத்தைத் திறந்துவிட்டாய்." },
    achievements: {
      initiate: { title: "கணிதத் தொடக்க வீரர்", desc: "கணிதப் பிரிவின் நிலை 1 ஐ முடித்தார்." },
      physics: { title: "எண் வழிகாட்டி", desc: "தொடர்கள், சமன்பாடுகள் மற்றும் எண்கணிதத்தை மாஸ்டர் செய்தார்." },
      chemistry: { title: "இயற்கணித ஆய்வாளர்", desc: "நேரியல் அமைப்புகள் மற்றும் விகிதங்களை மாஸ்டர் செய்தார்." },
      biology: { title: "வடிவவியல் கண்டுபிடிப்பாளர்", desc: "கோணங்கள், பித்தாகரஸ் தேற்றம் மற்றும் முப்பரிமாண மாதிரிகளை மாஸ்டர் செய்தார்." },
      master: { title: "கணித மாஸ்டர்", desc: "அனைத்து 40 கணித நிலைகளையும் முடித்து ஆக்சியம் கல்லை இணைத்தார்!" }
    }
  },

  hi: {
    title: "गणित क्षेत्र",
    subtitle: "पैटर्न, तर्क और सार्वभौमिक समीकरण",
    intro: "गणित की सार्वभौमिक भाषा में महारत हासिल करने के लिए अंकगणित, बीजगणित, ज्यामिति और तर्क का अन्वेषण करें।",
    stages: {
      'stage-1': { title: "स्टेज 1 — खोज", subtitle: "गणित के आधार", desc: "मूल अंकगणितीय अनुक्रमों, एक-चरीय समीकरणों, भिन्न आवंटन और निर्देशांक नेविगेशन में महारत हासिल करें।", concept: "अंकगणित और बुनियादी बीजगणित", learningObjective: "अनुक्रमों, समीकरणों, भिन्नों और ग्रिड ज्यामिति को समझें।", reward: "गणित टुकड़ा 1" },
      'stage-2': { title: "स्टेज 2 — समझें", subtitle: "समीकरण और अनुपात", desc: "दो-चरीय रैखिक समीकरणों, अनुपातों, प्रतिशत, परिमाप, क्षेत्रफल और तर्क द्वारों को हल करें।", concept: "समीकरण और ज्यामितीय मापन", learningObjective: "बहु-चरीय बीजगणित, अनुपातों और क्षेत्रफल सूत्रों में महारत हासिल करें।", reward: "गणित टुकड़ा 2" },
      'stage-3': { title: "स्टेज 3 — व्यावहारिक गणित", subtitle: "सांख्यिकी और स्थानिक गणित", desc: "ग्राफ डेटा, 3D आयतन, प्रायिकता, घातांक और प्रणाली अनुकूलन का विश्लेषण करें।", concept: "डेटा विश्लेषण और स्थानिक ज्यामिति", learningObjective: "निर्देशांक मॉडलों, आयतन सूत्रों और सांख्यिकीय रुझानों की व्याख्या करें।", reward: "गणित टुकड़ा 3" },
      'stage-4': { title: "स्टेज 4 — महारत", subtitle: "उन्नत तर्क और महारत", desc: "समीकरण प्रणालियों, द्विघात पैटर्न, जटिल अनुकूलन और गणितीय उपपत्तियों में महारत हासिल करें।", concept: "उन्नत गणित और कोर महारत", learningObjective: "बहु-चर समीकरणों को एकीकृत करें और एक्सिओम पत्थर का निर्माण करें।", reward: "गणित टुकड़ा 4 और एक्सिओम पत्थर" }
    },
    levels: {
      'math-1-1': { missionTitle: "पावर ग्रिड ट्रिगर", story: "बैकअप सौर ग्रिड को चालू करने के लिए कोर से निकलने वाली अंकगणितीय अनुक्रम आवृत्ति का मिलान करें।", primaryConcept: "अंकगणितीय अनुक्रम", learningObjective: "समान अंतर जोड़कर रैखिक अनुक्रम को बढ़ाएं।", missionObjective: "आवृत्ति अनुक्रम पूरा करने के लिए गायब संख्या खोजें: 3, 6, 9, 12, ...", hint: "संख्याओं के बीच के अंतर को देखें। 12 में 3 जोड़ें।", feedbackIncorrect: "गलत अनुक्रम। हर बार 3 जुड़ता है। 12 में 3 जोड़ें।", logicPremise: "पैटर्न में अगली संख्या खोजें: 3, 6, 9, 12, ?", logicOptions: ["13", "14", "15", "18"], logicAnswer: "15" },
      'math-1-2': { missionTitle: "वाल्व अंशांकन", story: "भाप का दबाव बढ़ रहा है। दबाव नियामक के समीकरण को हल करें।", primaryConcept: "सरल रैखिक समीकरण", learningObjective: "एक-चरीय समीकरण में चर को अलग करें।", missionObjective: "X + 7 = 15 में चर X का मान ज्ञात करें।", hint: "X के लिए, 15 में से 7 घटाएं।", feedbackIncorrect: "15 में से 7 घटाना न भूलें।", logicPremise: "X + 7 = 15 में X हल करें", logicOptions: ["6", "7", "8", "22"], logicAnswer: "8" },
      'math-1-3': { missionTitle: "चिकित्सा आपूर्ति वितरण", story: "12 राशन पैकेटों को आनुपातिक रूप से वितरित करें: आश्रय A (1/2), आश्रय B (1/3), और आश्रय C (1/6)।", primaryConcept: "भिन्न अनुपात", learningObjective: "संसाधनों को विभाजित करने के लिए भिन्नों का उपयोग करें।", missionObjective: "12 बक्से वितरित करें: आधा A को, 1/3 B को, और 1/6 C को।", hint: "12 का 1/2 = 6, 1/3 = 4, 1/6 = 2.", feedbackIncorrect: "A को 6, B को 4, और C को 2 दें।" },
      'math-1-[#rem1]': { missionTitle: "ग्रिड जांच नेविगेशन", story: "सप्लाई ड्रोन को निर्देशांक [4, 3] तक ले जाएं।", primaryConcept: "निर्देशांक ज्यामिति", learningObjective: "2D तल पर निर्देशांक निरूपित करें।", missionObjective: "[0,0] से [4,3] तक नेविगेट करें।", hint: "पहले X (दाएं), फिर Y (ऊपर) जाएं।", feedbackIncorrect: "X=4, Y=3 तक पहुंचे!" },
      'math-1-5': { missionTitle: "ज्यामितीय शील्ड", story: "आयताकार शील्ड सीमा के परिमाप की गणना करें।", primaryConcept: "परिमाप गणना", learningObjective: "आयत का परिमाप ज्ञात करें।", missionObjective: "6m × 4m आयत का परिमाप ज्ञात करें।", hint: "परिमाप = 2 × (लंबाई + चौड़ाई)।", feedbackIncorrect: "चारों भुजाएं जोड़ें: 6 + 4 + 6 + 4 = 20m.", logicPremise: "6m लंबाई और 4m चौड़ाई वाले आयत का परिमाप?", logicOptions: ["10m", "20m", "24m", "30m"], logicAnswer: "20m" },
      'math-1-6': { missionTitle: "बाइनरी डेटा संकेत", story: "गेट खोलने के लिए बाइनरी कोड को दशमलव में बदलें।", primaryConcept: "बाइनरी प्रणाली", learningObjective: "बाइनरी को दशमलव में बदलें।", missionObjective: "बाइनरी 101 को दशमलव में बदलें।", hint: "बाइनरी 101 = 4 + 0 + 1 = 5.", feedbackIncorrect: "बाइनरी 101 दशमलव में 5 है।", logicPremise: "बाइनरी 101 का दशमलव मान क्या है?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'math-1-7': { missionTitle: "प्रतिशत ऊर्जा चार्ज", story: "बैटरी को 75% चार्ज की आवश्यकता है। कुल क्षमता 200 इकाइयां है।", primaryConcept: "प्रतिशत", learningObjective: "मात्रा का प्रतिशत ज्ञात करें।", missionObjective: "200 का 75% ज्ञात करें।", hint: "(75/100) × 200 = 150.", feedbackIncorrect: "200 को 0.75 से गुणा करें, 150 मिलेगा।", logicPremise: "200 का 75% कितना है?", logicOptions: ["100", "120", "150", "175"], logicAnswer: "150" },
      'math-1-8': { missionTitle: "प्रायिकता गणक", story: "एक बॉक्स में 3 लाल और 7 नीले ऊर्जा सेल हैं। लाल सेल चुनने की प्रायिकता?", primaryConcept: "बुनियादी प्रायिकता", learningObjective: "सरल प्रायिकता ज्ञात करें।", missionObjective: "लाल सेल की प्रायिकता ज्ञात करें।", hint: "प्रायिकता = लाल सेल / कुल सेल।", feedbackIncorrect: "कुल सेल = 10. प्रायिकता = 3/10 = 30%.", logicPremise: "3 लाल, 7 नीले सेल। लाल सेल की प्रायिकता?", logicOptions: ["3/10 (30%)", "7/10 (70%)", "1/2 (50%)", "3/7"], logicAnswer: "3/10 (30%)" },
      'math-1-9': { missionTitle: "समीकरण संतुलन", story: "समीकरण हल करें: 3X + 2 = 14.", primaryConcept: "दो-चरीय समीकरण", learningObjective: "दो-चरीय समीकरण हल करें।", missionObjective: "3X + 2 = 14 में X ज्ञात करें।", hint: "14 में से 2 घटाएं (12), फिर 3 से भाग दें (4)।", feedbackIncorrect: "3X = 12, इसलिए X = 4.", logicPremise: "3X + 2 = 14 में X क्या है?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "4" },
      'math-1-10': {
        missionTitle: "स्टेज 1 बॉस — गणित आधार महारत",
        story: "पोर्टल ग्रिड को सुरक्षित करने के लिए अंकगणित, बीजगणित और ज्यामिति में महारत हासिल करें!",
        primaryConcept: "गणित स्टेज 1 महारत",
        learningObjective: "अनुक्रमों, समीकरणों और ज्यामिति को लागू करें।",
        missionObjective: "सभी 4 चरणों को पूरा करें।",
        hint: "स्टेज 1 में सीखी गई बातें याद करें।",
        feedbackIncorrect: "चरण विफल। पुनः प्रयास करें!",
        phases: [
          { title: "आवृत्ति अनुक्रम", description: "अनुक्रम पूरा करें: 5, 10, 15, 20, ?", instruction: "अगली संख्या चुनें।", logicPremise: "5, 10, 15, 20, ?", logicOptions: ["22", "25", "30", "35"], logicAnswer: "25" },
          { title: "वाल्व समीकरण", description: "हल करें: X - 8 = 12", instruction: "X खोजें।", logicPremise: "X - 8 = 12", logicOptions: ["16", "18", "20", "24"], logicAnswer: "20" },
          { title: "राशन आवंटन", description: "20 इकाइयों को आधा करें।", instruction: "20 का आधा ज्ञात करें।" },
          { title: "क्षेत्रफल शील्ड", description: "5m × 4m आयत का क्षेत्रफल।", instruction: "क्षेत्रफल = लंबाई × चौड़ाई।", logicPremise: "5m × 4m आयत का क्षेत्रफल?", logicOptions: ["9 वर्ग मीटर", "18 वर्ग मीटर", "20 वर्ग मीटर", "25 वर्ग मीटर"], logicAnswer: "20 वर्ग मीटर" }
        ]
      },
      'math-2-1': { missionTitle: "बीजगणितीय मैट्रिक्स", story: "हल करें: 2X + 4 = 16.", primaryConcept: "बीजगणितीय अलगाव", learningObjective: "रैखिक समीकरण हल करें।", missionObjective: "X खोजें।", hint: "4 घटाएं फिर 2 से भाग दें।", feedbackIncorrect: "2X = 12, X = 6.", logicPremise: "2X + 4 = 16 में X क्या है?", logicOptions: ["4", "5", "6", "8"], logicAnswer: "6" },
      'math-2-2': { missionTitle: "त्रिभुज कोण", story: "त्रिभुज के दो कोण 60° और 70° हैं। तीसरा कोण ज्ञात करें।", primaryConcept: "त्रिभुज के कोण", learningObjective: "त्रिभुज के कोणों का योग 180° होता है।", missionObjective: "तीसरा कोण खोजें।", hint: "180 - (60 + 70) = 50°.", feedbackIncorrect: "180 - 130 = 50°.", logicPremise: "60° और 70° कोण वाले त्रिभुज का तीसरा कोण?", logicOptions: ["40°", "50°", "60°", "70°"], logicAnswer: "50°" },
      'math-2-3': { missionTitle: "अनुपात मिश्रण", story: "ईंधन और पानी को 3:1 अनुपात में मिलाएं। कुल 20 लीटर। कितना ईंधन?", primaryConcept: "अनुपात", learningObjective: "दिए गए अनुपात में विभाजित करें।", missionObjective: "ईंधन की मात्रा ज्ञात करें।", hint: "कुल भाग = 4. 20/4 = 5. ईंधन = 3×5 = 15.", feedbackIncorrect: "ईंधन 15 लीटर है।", logicPremise: "ईंधन:पानी = 3:1. कुल = 20L. ईंधन = ?", logicOptions: ["10L", "12L", "15L", "16L"], logicAnswer: "15L" },
      'math-2-4': { missionTitle: "औसत गति", story: "एक वाहन 2 घंटे में 120 किमी की दूरी तय करता है। औसत गति?", primaryConcept: "गति और दर", learningObjective: "गति = दूरी / समय।", missionObjective: "औसत गति ज्ञात करें।", hint: "120 / 2 = 60 किमी/घंटा।", feedbackIncorrect: "120 / 2 = 60 किमी/घंटा।", logicPremise: "2 घंटे में 120 किमी तय करने वाली गति?", logicOptions: ["50 किमी/घंटा", "60 किमी/घंटा", "70 किमी/घंटा", "80 किमी/घंटा"], logicAnswer: "60 किमी/घंटा" },
      'math-2-5': { missionTitle: "घातांक शक्ति", story: "2⁴ का मान ज्ञात करें।", primaryConcept: "घातांक", learningObjective: "संख्याओं की घात समझें।", missionObjective: "2⁴ ज्ञात करें।", hint: "2 × 2 × 2 × 2 = 16.", feedbackIncorrect: "2⁴ = 16.", logicPremise: "2⁴ का मान क्या है?", logicOptions: ["8", "12", "16", "32"], logicAnswer: "16" },
      'math-2-6': { missionTitle: "वृत्त की परिधि", story: "यदि व्यास 14 सेमी है तो त्रिज्या ज्ञात करें।", primaryConcept: "वृत्त ज्यामिति", learningObjective: "त्रिज्या = व्यास / 2.", missionObjective: "त्रिज्या खोजें।", hint: "14 / 2 = 7 सेमी।", feedbackIncorrect: "त्रिज्या = 14 / 2 = 7 सेमी।", logicPremise: "14 सेमी व्यास वाले वृत्त की त्रिज्या?", logicOptions: ["5 सेमी", "6 सेमी", "7 सेमी", "28 सेमी"], logicAnswer: "7 सेमी" },
      'math-2-7': { missionTitle: "पाइथागोरस प्रमेय", story: "समकोण त्रिभुज की भुजाएं 3m और 4m हैं। कर्ण ज्ञात करें।", primaryConcept: "पाइथागोरस प्रमेय", learningObjective: "a² + b² = c².", missionObjective: "कर्ण c खोजें।", hint: "3² + 4² = 9 + 16 = 25. √25 = 5.", feedbackIncorrect: "कर्ण = 5m.", logicPremise: "3 और 4 भुजाओं वाले त्रिभुज का कर्ण?", logicOptions: ["5", "6", "7", "25"], logicAnswer: "5" },
      'math-2-8': { missionTitle: "रेखा की ढाल", story: "प्रति 2 क्षैतिज इकाइयों पर रेखा 6 इकाइयां लंबवत उठती है। ढाल ज्ञात करें।", primaryConcept: "रैखिक ढाल", learningObjective: "ढाल = लंबवत उठान / क्षैतिज दूरी।", missionObjective: "ढाल खोजें।", hint: "6 / 2 = 3.", feedbackIncorrect: "ढाल = 6 / 2 = 3.", logicPremise: "उठान=6, दूरी=2 के लिए ढाल?", logicOptions: ["2", "3", "4", "12"], logicAnswer: "3" },
      'math-2-9': { missionTitle: "युगपत समीकरण", story: "X + Y = 10 और X - Y = 2. X ज्ञात करें।", primaryConcept: "समीकरण निकाय", learningObjective: "रैखिक निकाय हल करें।", missionObjective: "X खोजें।", hint: "जोड़ें: 2X = 12, इसलिए X = 6.", feedbackIncorrect: "2X = 12, X = 6.", logicPremise: "X + Y = 10 और X - Y = 2 में X = ?", logicOptions: ["5", "6", "7", "8"], logicAnswer: "6" },
      'math-2-10': {
        missionTitle: "स्टेज 2 बॉस — बीजगणित और ज्यामिति महारत",
        story: "रैखिक समीकरणों, अनुपातों और ज्यामिति में महारत हासिल करें!",
        primaryConcept: "गणित स्टेज 2 महारत",
        learningObjective: "बीजगणित और ज्यामिति लागू करें।",
        missionObjective: "सभी 4 चरणों को पूरा करें।",
        hint: "समीकरणों और प्रमेयों को याद रखें।",
        feedbackIncorrect: "चरण विफल। पुनः प्रयास करें!",
        phases: [
          { title: "रैखिक जांच", description: "4X = 32 हल करें", instruction: "X खोजें।", logicPremise: "4X = 32", logicOptions: ["6", "7", "8", "9"], logicAnswer: "8" },
          { title: "अनुपात मिश्रण", description: "अनुपात 2:3, कुल 25. बड़ा भाग खोजें।", instruction: "बड़ा भाग ज्ञात करें।", logicPremise: "2:3 अनुपात में 25 का बड़ा भाग?", logicOptions: ["10", "12", "15", "18"], logicAnswer: "15" },
          { title: "समकोण त्रिभुज", description: "भुजाएं 6 और 8. कर्ण ज्ञात करें।", instruction: "पाइथागोरस प्रमेय लागू करें।" },
          { title: "गति दर", description: "3 घंटे में 180 किमी. गति?", instruction: "गति की गणना करें।", logicPremise: "180 किमी / 3 घंटे = ?", logicOptions: ["50", "60", "70", "90"], logicAnswer: "60" }
        ]
      },
      'math-3-1': { missionTitle: "डेटा माध्य", story: "4, 8, 12, 16 का औसत ज्ञात करें।", primaryConcept: "माध्य और सांख्यिकी", learningObjective: "औसत ज्ञात करें।", missionObjective: "माध्य खोजें।", hint: "(4+8+12+16)/4 = 40/4 = 10.", feedbackIncorrect: "माध्य = 40 / 4 = 10.", logicPremise: "4, 8, 12, 16 का औसत क्या है?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'math-3-2': { missionTitle: "डेटा माध्यिका", story: "3, 7, 9, 15, 21 की माध्यिका ज्ञात करें।", primaryConcept: "माध्यिका", learningObjective: "मध्य मान ज्ञात करें।", missionObjective: "माध्यिका खोजें।", hint: "क्रमबद्ध सेट में मध्य मान 9 है।", feedbackIncorrect: "माध्यिका 9 है।", logicPremise: "3, 7, 9, 15, 21 की माध्यिका क्या है?", logicOptions: ["7", "9", "12", "15"], logicAnswer: "9" },
      'math-3-3': { missionTitle: "बेलन आयतन", story: "आधार क्षेत्रफल = 10 m², ऊंचाई = 5 m. आयतन ज्ञात करें।", primaryConcept: "आयतन", learningObjective: "आयतन = आधार क्षेत्रफल × ऊंचाई।", missionObjective: "आयतन खोजें।", hint: "10 × 5 = 50 m³.", feedbackIncorrect: "10 × 5 = 50 m³.", logicPremise: "आधार क्षेत्रफल 10m² और ऊंचाई 5m वाले बेलन का आयतन?", logicOptions: ["15 m³", "25 m³", "50 m³", "100 m³"], logicAnswer: "50 m³" },
      'math-3-4': { missionTitle: "वर्गमूल", story: "यदि X² = 49 तो X ज्ञात करें।", primaryConcept: "वर्गमूल", learningObjective: "X² = N हल करें।", missionObjective: "धनात्मक X खोजें।", hint: "√49 = 7.", feedbackIncorrect: "√49 = 7.", logicPremise: "X² = 49 में धनात्मक X मान?", logicOptions: ["6", "7", "8", "9"], logicAnswer: "7" },
      'math-3-5': { missionTitle: "साधारण ब्याज", story: "मूलधन = ₹1000, दर = 5%, समय = 2 वर्ष। ब्याज ज्ञात करें।", primaryConcept: "ब्याज गणना", learningObjective: "ब्याज = (P × R × T)/100.", missionObjective: "ब्याज खोजें।", hint: "(1000 × 5 × 2)/100 = 100.", feedbackIncorrect: "ब्याज = ₹100.", logicPremise: "₹1000 पर 5% की दर से 2 वर्ष का ब्याज?", logicOptions: ["₹50", "₹100", "₹150", "₹200"], logicAnswer: "₹100" },
      'math-3-6': { missionTitle: "बहुभुज कोण", story: "पंचभुज (5 भुजाएं) के आंतरिक कोणों का योग ज्ञात करें।", primaryConcept: "बहुभुज ज्यामिति", learningObjective: "(n-2) × 180°.", missionObjective: "कोण योग खोजें।", hint: "(5-2) × 180 = 540°.", feedbackIncorrect: "(5-2) × 180 = 540°.", logicPremise: "5 भुजाओं वाले पंचभुज के आंतरिक कोणों का योग?", logicOptions: ["360°", "450°", "540°", "720°"], logicAnswer: "540°" },
      'math-3-7': { missionTitle: "क्रमगुणित", story: "4! (4 क्रमगुणित) की गणना करें।", primaryConcept: "क्रमगुणित", learningObjective: "4! = 4 × 3 × 2 × 1.", missionObjective: "4! खोजें।", hint: "4 × 3 × 2 × 1 = 24.", feedbackIncorrect: "4! = 24.", logicPremise: "4! का मान क्या है?", logicOptions: ["12", "16", "24", "48"], logicAnswer: "24" },
      'math-3-8': { missionTitle: "संचय", story: "4 वस्तुओं में से 2 वस्तुएं चुनने के कितने तरीके हैं?", primaryConcept: "संचय", learningObjective: "संचय की गणना करें।", missionObjective: "C(4,2) खोजें।", hint: "(4 × 3) / (2 × 1) = 6.", feedbackIncorrect: "C(4,2) = 6.", logicPremise: "4 वस्तुओं में से 2 वस्तुएं चुनने के तरीके?", logicOptions: ["4", "6", "8", "12"], logicAnswer: "6" },
      'math-3-9': { missionTitle: "लघुगणक पैमाना", story: "log₁₀(1000) का मान ज्ञात करें।", primaryConcept: "लघुगणक", learningObjective: "लघुगणक समझें।", missionObjective: "log₁₀(1000) खोजें।", hint: "10³ = 1000, इसलिए log₁₀(1000) = 3.", feedbackIncorrect: "log₁₀(1000) = 3.", logicPremise: "log₁₀(1000) का मान क्या है?", logicOptions: ["2", "3", "4", "10"], logicAnswer: "3" },
      'math-3-10': {
        missionTitle: "स्टेज 3 बॉस — व्यावहारिक गणित महारत",
        story: "सांख्यिकी, आयतन और लघुगणक में महारत हासिल करें!",
        primaryConcept: "गणित स्टेज 3 महारत",
        learningObjective: "सांख्यिकी और 3D ज्यामिति लागू करें।",
        missionObjective: "सभी 4 चरणों को पूरा करें।",
        hint: "डेटा और घातांक सूत्रों का उपयोग करें।",
        feedbackIncorrect: "चरण विफल। पुनः प्रयास करें!",
        phases: [
          { title: "माध्य जांच", description: "10, 20, 30 का औसत?", instruction: "औसत खोजें।", logicPremise: "10, 20, 30 का औसत?", logicOptions: ["15", "20", "25", "30"], logicAnswer: "20" },
          { title: "वर्गमूल", description: "√81 = ?", instruction: "वर्गमूल खोजें।", logicPremise: "√81 = ?", logicOptions: ["7", "8", "9", "10"], logicAnswer: "9" },
          { title: "आयतन गणना", description: "आधार 6m², ऊंचाई 4m.", instruction: "आयतन की गणना करें।" },
          { title: "लघुगणक", description: "log₁₀(100) = ?", instruction: "लघुगणक खोजें।", logicPremise: "log₁₀(100) = ?", logicOptions: ["1", "2", "3", "4"], logicAnswer: "2" }
        ]
      },
      'math-4-1': { missionTitle: "द्विघात समीकरण", story: "X² - 5X + 6 = 0 हल करें।", primaryConcept: "द्विघात समीकरण", learningObjective: "द्विघात समीकरण का गुणनखंड करें।", missionObjective: "मूल खोजें।", hint: "(X-2)(X-3)=0, मूल 2 और 3 हैं।", feedbackIncorrect: "मूल 2 और 3 हैं।", logicPremise: "X² - 5X + 6 = 0 के मूल?", logicOptions: ["1 और 6", "2 और 3", "0 और 5", "-2 और -3"], logicAnswer: "2 और 3" },
      'math-4-2': { missionTitle: "मैट्रिक्स सारणिक", story: "[[4, 2], [1, 3]] मैट्रिक्स का सारणिक ज्ञात करें।", primaryConcept: "मैट्रिक्स", learningObjective: "ad - bc की गणना करें।", missionObjective: "सारणिक खोजें।", hint: "(4×3) - (2×1) = 12 - 2 = 10.", feedbackIncorrect: "सारणिक = 10.", logicPremise: "[[4, 2], [1, 3]] का सारणिक?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'math-4-3': { missionTitle: "त्रिकोणमितीय साइन", story: "सम्मुख = 3, कर्ण = 5. sin(θ) ज्ञात करें।", primaryConcept: "त्रिकोणमिति", learningObjective: "sin = सम्मुख / कर्ण।", missionObjective: "sin(θ) खोजें।", hint: "3 / 5 = 0.6.", feedbackIncorrect: "sin(θ) = 3/5 = 0.6.", logicPremise: "सम्मुख=3, कर्ण=5 होने पर sin(θ)?", logicOptions: ["0.5", "0.6", "0.75", "0.8"], logicAnswer: "0.6" },
      'math-4-4': { missionTitle: "अवकलज दर", story: "X=2 पर f(X) = X³ का अवकलज ज्ञात करें।", primaryConcept: "कलन अवकलज", learningObjective: "f'(X) = 3X².", missionObjective: "f'(2) खोजें।", hint: "3 × (2²) = 12.", feedbackIncorrect: "f'(2) = 12.", logicPremise: "X=2 पर X³ का अवकलज क्या है?", logicOptions: ["6", "8", "12", "16"], logicAnswer: "12" },
      'math-4-5': { missionTitle: "समाकलन क्षेत्रफल", story: "X=0 से X=3 तक f(X) = 2X का समाकलन करें।", primaryConcept: "कलन समाकलन", learningObjective: "∫ 2X dX = X².", missionObjective: "∫₀³ 2X dX ज्ञात करें।", hint: "3² - 0² = 9.", feedbackIncorrect: "∫₀³ 2X dX = 9.", logicPremise: "∫₀³ 2X dX का मान क्या है?", logicOptions: ["6", "9", "12", "18"], logicAnswer: "9" },
      'math-4-6': { missionTitle: "सदिश योग", story: "सदिश A = [3, 4] और B = [1, 2] जोड़ें।", primaryConcept: "सदिश गणित", learningObjective: "घटकों को जोड़ें।", missionObjective: "A + B खोजें।", hint: "[3+1, 4+2] = [4, 6].", feedbackIncorrect: "A + B = [4, 6].", logicPremise: "[3, 4] + [1, 2] = ?", logicOptions: ["[4, 6]", "[3, 8]", "[2, 2]", "[5, 5]"], logicAnswer: "[4, 6]" },
      'math-4-7': { missionTitle: "सम्मिश्र संख्याएं", story: "(2 + i)(2 - i) का गुणा करें।", primaryConcept: "सम्मिश्र संख्याएं", learningObjective: "a² + b².", missionObjective: "(2+i)(2-i) ज्ञात करें।", hint: "4 - (-1) = 5.", feedbackIncorrect: "मान = 5.", logicPremise: "(2+i)(2-i) का मान क्या है?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'math-4-8': { missionTitle: "गुणोत्तर श्रेणी", story: "अनंत श्रेणी 1 + 1/2 + 1/4 + 1/8 + ... का योग ज्ञात करें।", primaryConcept: "अनंत श्रेणी", learningObjective: "योग = a / (1 - r).", missionObjective: "योग खोजें।", hint: "1 / (1 - 0.5) = 2.", feedbackIncorrect: "योग = 2.", logicPremise: "1 + 1/2 + 1/4 + ... श्रेणी का योग?", logicOptions: ["1.5", "2", "2.5", "3"], logicAnswer: "2" },
      'math-4-9': { missionTitle: "अनुकूलन उपपत्ति", story: "f(X) = -(X - 3)² + 10 का अधिकतम मान ज्ञात करें।", primaryConcept: "अनुकूलन", learningObjective: "शीर्ष पर अधिकतम मान।", missionObjective: "अधिकतम मान खोजें।", hint: "X = 3 पर अधिकतम मान 10 है।", feedbackIncorrect: "अधिकतम मान = 10.", logicPremise: "-(X-3)² + 10 का अधिकतम मान?", logicOptions: ["3", "7", "10", "13"], logicAnswer: "10" },
      'math-4-10': {
        missionTitle: "स्टेज 4 बॉस — एक्सिओम पत्थर महारत",
        story: "अंतिम गणितीय परीक्षा! कलन और सदिशों में महारत हासिल करके एक्सिओम पत्थर का निर्माण करें!",
        primaryConcept: "गणित स्टेज 4 उच्च महारत",
        learningObjective: "एकीकृत उच्च गणित में महारत हासिल करें।",
        missionObjective: "सभी 4 चरणों को पूरा करें।",
        hint: "पूरे गणितीय ज्ञान का उपयोग करें।",
        feedbackIncorrect: "चरण विफल। पुनः प्रयास करें!",
        phases: [
          { title: "द्विघात मूल", description: "X² - 9 = 0 के मूल", instruction: "धनात्मक मूल खोजें।", logicPremise: "X² - 9 = 0 का धनात्मक मूल?", logicOptions: ["2", "3", "4", "9"], logicAnswer: "3" },
          { title: "त्रिकोणमितीय मान", description: "sin(30°) = ?", instruction: "sin(30°) खोजें।", logicPremise: "sin(30°) = ?", logicOptions: ["0.5", "0.707", "0.866", "1.0"], logicAnswer: "0.5" },
          { title: "अवकलज परीक्षण", description: "X=3 पर 5X का अवकलज।", instruction: "अवकलज की गणना करें।" },
          { title: "सदिश योग", description: "[2, 3] + [4, 1] = ?", instruction: "सदिशों को जोड़ें।", logicPremise: "[2, 3] + [4, 1] = ?", logicOptions: ["[6, 4]", "[5, 5]", "[6, 3]", "[7, 4]"], logicAnswer: "[6, 4]" }
        ]
      }
    },
    fragments: { f1: "गणित टुकड़ा 1", f2: "गणित टुकड़ा 2", f3: "गणित टुकड़ा 3", f4: "गणित टुकड़ा 4", acquired: "गणित पत्थर का टुकड़ा प्राप्त हुआ!", desc: "आपने एक्सिओम पत्थर का एक टुकड़ा अर्जित किया है।" },
    stone: { title: "एक्सिओम पत्थर", acquired: "एक्सिओम पत्थर प्राप्त हुआ!", desc: "आपने गणित के मार्ग में महारत हासिल कर ली है और सार्वभौमिक तर्क को खोल दिया है।" },
    achievements: {
      initiate: { title: "गणित नवागंतुक", desc: "गणित क्षेत्र का स्टेज 1 पूरा किया।" },
      physics: { title: "संख्या मार्गदर्शक", desc: "अनुक्रमों, समीकरणों और अंकगणित में महारत हासिल की।" },
      chemistry: { title: "बीजगणित अन्वेषक", desc: "रैखिक प्रणालियों और अनुपातों में महारत हासिल की।" },
      biology: { title: "ज्यामिति खोजकर्ता", desc: "कोणों, पाइथागोरस प्रमेय और 3D मॉडलों में महारत हासिल की।" },
      master: { title: "गणित मास्टरी", desc: "सभी 40 गणित स्तरों को पूरा किया और एक्सिओम पत्थर को असेंबल किया!" }
    }
  },

  ml: {
    title: "ഗണിത വിഭാഗം",
    subtitle: "പാറ്റേണുകൾ, ലോജിക് & സാർവത്രിക സമവാക്യങ്ങൾ",
    intro: "ഗണിതത്തിന്റെ സാർവത്രിക ഭാഷ സ്വായത്തമാക്കാൻ ഗണിതം, ബീജഗണിതം, ജ്യാമിതി, ലോജിക് എന്നിവ പര്യവേക്ഷണം ചെയ്യുക.",
    stages: {
      'stage-1': { title: "സ്റ്റേജ് 1 — കണ്ടെത്തുക", subtitle: "ഗണിത തത്വങ്ങൾ", desc: "അടിസ്ഥാന സംഖ്യാ ശ്രേണികൾ, സമവാക്യങ്ങൾ, ഭിന്നസംഖ്യകൾ, കോഓർഡിനേറ്റുകൾ എന്നിവ സ്വായത്തമാക്കുക.", concept: "ഗണിതവും ബീജഗണിതവും", learningObjective: "ശ്രേണികൾ, സമവാക്യങ്ങൾ, ഭിന്നസംഖ്യകൾ, ഗ്രിഡ് ജ്യാമിതി എന്നിവ മനസ്സിലാക്കുക.", reward: "ഗണിത കഷ്ണം 1" },
      'stage-2': { title: "സ്റ്റേജ് 2 — മനസ്സിലാക്കുക", subtitle: "സമവാക്യങ്ങളും അനുപാതങ്ങളും", desc: "രേഖീയ സമവാക്യങ്ങൾ, അനുപാതങ്ങൾ, ശതമാനം, ചുറ്റളവ്, പരപ്പളവ് എന്നിവ പരിഹരിക്കുക.", concept: "സമവാക്യങ്ങളും ജ്യാമിതീയ അളവുകളും", learningObjective: "ബഹു-ഘട്ട ബീജഗണിത സമവാക്യങ്ങൾ, അനുപാതങ്ങൾ, പരപ്പളവ് സൂത്രവാക്യങ്ങൾ എന്നിവ പഠിക്കുക.", reward: "ഗണിത കഷ്ണം 2" },
      'stage-3': { title: "സ്റ്റേജ് 3 — പ്രായോഗിക ഗണിതം", subtitle: "സ്റ്റാറ്റിസ്റ്റിക്സും 3D ഗണിതവും", desc: "ഗ്രാഫ് ഡാറ്റ, 3D വ്യാപ്തം, സംഭാവ്യത, ഘാതാങ്കങ്ങൾ എന്നിവ വിശകലനം ചെയ്യുക.", concept: "ഡാറ്റാ വിശകലനവും ജ്യാമിതിയും", learningObjective: "കോഓർഡിനേറ്റ് മോഡലുകൾ, വ്യാപ്ത സൂത്രവാക്യങ്ങൾ എന്നിവ വ്യാഖ്യാനിക്കുക.", reward: "ഗണിത കഷ്ണം 3" },
      'stage-4': { title: "സ്റ്റേജ് 4 — മാസ്റ്ററി", subtitle: "ഉയർന്ന ലോജിക്കും മാസ്റ്ററിയും", desc: "സമവാക്യ വ്യവസ്ഥകൾ, ദ്വിമാന പാറ്റേണുകൾ, സങ്കീർണ്ണ സമവാക്യങ്ങൾ എന്നിവയിൽ പ്രാവീണ്യം നേടുക.", concept: "ഉയർന്ന ഗണിതവും കോർ മാസ്റ്ററിയും", learningObjective: "ബഹു-വേരിയബിൾ സമവാക്യങ്ങൾ സംയോജിപ്പിച്ച് ആക്സിയം സ്റ്റോൺ നിർമ്മിക്കുക.", reward: "ഗണിത കഷ്ണം 4 & ആക്സിയം സ്റ്റോൺ" }
    },
    levels: {
      'math-1-1': { missionTitle: "പവർ ഗ്രിഡ് ട്രിഗർ", story: "ബാക്കപ്പ് സോളാർ ഗ്രിഡ് പ്രവർത്തിപ്പിക്കാൻ കോറിൽ നിന്നുള്ള സംഖ്യാ ശ്രേണി തരംഗദൈർഘ്യം പൊരുത്തപ്പെടുത്തുക.", primaryConcept: "സംഖ്യാ ശ്രേണികൾ", learningObjective: "സ്ഥിരമായ സംഖ്യ കൂട്ടി ശ്രേണി നീട്ടുക.", missionObjective: "വിട്ടുപോയ സംഖ്യ കണ്ടെത്തുക: 3, 6, 9, 12, ...", hint: "ഓരോ സംഖ്യയും തമ്മിലുള്ള അന്തരം കാണുക. 12 നോട് 3 കൂട്ടുക.", feedbackIncorrect: "തെറ്റായ ശ്രേണി. ഓരോ തവണയും 3 കൂടുന്നു. 12 നോട് 3 കൂട്ടുക.", logicPremise: "അടുത്ത സംഖ്യ കണ്ടെത്തുക: 3, 6, 9, 12, ?", logicOptions: ["13", "14", "15", "18"], logicAnswer: "15" },
      'math-1-2': { missionTitle: "വാൽവ് സമവാക്യം", story: "സ്റ്റീം മർദ്ദം ഉയരുന്നു. മർദ്ദ നിയന്ത്രണ സമവാക്യം പരിഹരിക്കുക.", primaryConcept: "രേഖീയ സമവാക്യങ്ങൾ", learningObjective: "സമവാക്യത്തിൽ നിന്നും വേരിയബിൾ കണ്ടെത്തുക.", missionObjective: "X + 7 = 15 ൽ X ന്റെ മൂല്യം കണ്ടെത്തുക.", hint: "X കണ്ടെത്താൻ 15 ൽ നിന്ന് 7 കുറയ്ക്കുക.", feedbackIncorrect: "15 ൽ നിന്ന് 7 കുറയ്ക്കുക.", logicPremise: "X + 7 = 15 ആയാൽ X എത്ര?", logicOptions: ["6", "7", "8", "22"], logicAnswer: "8" },
      'math-1-3': { missionTitle: "മരുന്ന് വിതരണം", story: "12 മരുന്ന് പാക്കറ്റുകൾ അനുപാതത്തിൽ വിഭജിക്കുക: ഷെൽട്ടർ A (1/2), ഷെൽട്ടർ B (1/3), ഷെൽട്ടർ C (1/6).", primaryConcept: "ഭിന്നസംഖ്യാ അനുപാതം", learningObjective: "ഭിന്നസംഖ്യകൾ ഉപയോഗിച്ച് വിഭജിക്കുക.", missionObjective: "12 ബോക്സുകൾ വിതരണം ചെയ്യുക: പകുതി A യ്ക്ക്, 1/3 B യ്ക്ക്, 1/6 C യ്ക്ക്.", hint: "12 ന്റെ 1/2 = 6, 1/3 = 4, 1/6 = 2.", feedbackIncorrect: "A യ്ക്ക് 6, B യ്ക്ക് 4, C യ്ക്ക് 2 നൽകുക." },
      'math-1-[#rem1]': { missionTitle: "ഗ്രിഡ് നാവിഗേഷൻ", story: "ഡ്രോണിനെ [4, 3] ലേക്ക് നയിക്കുക.", primaryConcept: "കോഓർഡിനേറ്റ് ജ്യാമിതി", learningObjective: "2D തലത്തിൽ ബിന്ദുക്കൾ അടയാളപ്പെടുത്തുക.", missionObjective: "[0,0] ൽ നിന്ന് [4,3] ലേക്ക് പോവുക.", hint: "ആദ്യം X (വലത്തോട്ട്), പിന്നെ Y (മുകളിലേക്ക്).", feedbackIncorrect: "X=4, Y=3 ൽ എത്തുക!" },
      'math-1-5': { missionTitle: "ഷീൽഡ് ചുറ്റളവ്", story: "ചതുരാകൃതിയിലുള്ള ഷീൽഡിന്റെ ചുറ്റളവ് കണക്കാക്കുക.", primaryConcept: "ചുറ്റളവ്", learningObjective: "ചതുരത്തിന്റെ ചുറ്റളവ് കണ്ടെത്തുക.", missionObjective: "6m × 4m ചതുരത്തിന്റെ ചുറ്റളവ് കണ്ടെത്തുക.", hint: "ചുറ്റളവ് = 2 × (നീളം + വീതി).", feedbackIncorrect: "എല്ലാ വശങ്ങളും കൂട്ടുക: 6 + 4 + 6 + 4 = 20m.", logicPremise: "6m നീളവും 4m വീതിയുമുള്ള ചതുരത്തിന്റെ ചുറ്റളവ്?", logicOptions: ["10m", "20m", "24m", "30m"], logicAnswer: "20m" },
      'math-1-6': { missionTitle: "ബൈനറി സിഗ്നൽ", story: "ബൈനറി കോഡിനെ ഡെസിമൽ സംഖ്യയാക്കുക.", primaryConcept: "ബൈനറി രീതി", learningObjective: "ബൈനറിയെ ഡെസിമലാക്കുക.", missionObjective: "ബൈനറി 101 നെ ഡെസിമലാക്കുക.", hint: "ബൈനറി 101 = 4 + 0 + 1 = 5.", feedbackIncorrect: "ബൈനറി 101 എന്നാൽ ഡെസിമലിൽ 5 ആണ്.", logicPremise: "ബൈനറി 101 ന്റെ ഡെസിമൽ മൂല്യം എന്താണ്?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'math-1-7': { missionTitle: "ശതമാനം ചാർജ്ജ്", story: "ബാറ്ററി 75% ചാർജ്ജ് ആകണം. ആകെ ശേഷി 200 യൂണിറ്റാണ്.", primaryConcept: "ശതമാനം", learningObjective: "അളവിന്റെ ശതമാനം കണ്ടെത്തുക.", missionObjective: "200 ന്റെ 75% കണ്ടെത്തുക.", hint: "(75/100) × 200 = 150.", feedbackIncorrect: "200 നെ 0.75 കൊണ്ട് ഗുണിക്കുക, 150 കിട്ടും.", logicPremise: "200 യൂണിറ്റിന്റെ 75% എത്രയാണ്?", logicOptions: ["100", "120", "150", "175"], logicAnswer: "150" },
      'math-1-8': { missionTitle: "സംഭാവ്യത", story: "ഒരു ബോക്സിൽ 3 ചുവപ്പ്, 7 നീല സെല്ലുകളുണ്ട്. ചുവപ്പ് സെൽ കിട്ടാനുള്ള സംഭാവ്യത?", primaryConcept: "അടിസ്ഥാന സംഭാവ്യത", learningObjective: "സംഭാവ്യത കണക്കാക്കുക.", missionObjective: "ചുവപ്പ് സെല്ലിന്റെ സംഭാവ്യത കണ്ടെത്തുക.", hint: "സംഭാവ്യത = ചുവപ്പ് സെല്ലുകൾ / ആകെ സെല്ലുകൾ.", feedbackIncorrect: "ആകെ സെല്ലുകൾ = 10. സംഭാവ്യത = 3/10 = 30%.", logicPremise: "3 ചുവപ്പ്, 7 നീല. ചുവപ്പ് കിട്ടാനുള്ള സംഭാവ്യത?", logicOptions: ["3/10 (30%)", "7/10 (70%)", "1/2 (50%)", "3/7"], logicAnswer: "3/10 (30%)" },
      'math-1-9': { missionTitle: "സമവാക്യ സമീകരണം", story: "സമവാക്യം പരിഹരിക്കുക: 3X + 2 = 14.", primaryConcept: "രണ്ടു ഘട്ട സമവാക്യങ്ങൾ", learningObjective: "രണ്ടു ഘട്ട സമവാക്യങ്ങൾ പരിഹരിക്കുക.", missionObjective: "3X + 2 = 14 ൽ X കണ്ടെത്തുക.", hint: "14 ൽ നിന്ന് 2 കുറയ്ക്കുക (12), പിന്നെ 3 കൊണ്ട് ഹരിക്കുക (4).", feedbackIncorrect: "3X = 12, അതിനാൽ X = 4.", logicPremise: "3X + 2 = 14 ആയാൽ X എത്ര?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "4" },
      'math-1-10': {
        missionTitle: "സ്റ്റേജ് 1 ബോസ് — ഗണിത തത്വ മാസ്റ്ററി",
        story: "ഗ്രിഡ് സുരക്ഷിതമാക്കാൻ ഗണിതം, ബീജഗണിതം, ജ്യാമിതി എന്നിവയിൽ പ്രാവീണ്യം നേടുക!",
        primaryConcept: "ഗണിത സ്റ്റേജ് 1 മാസ്റ്ററി",
        learningObjective: "ശ്രേണികൾ, സമവാക്യങ്ങൾ, ജ്യാമിതി എന്നിവ പ്രയോഗിക്കുക.",
        missionObjective: "4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "പഠിച്ച കാര്യങ്ങൾ ഓർക്കുക.",
        feedbackIncorrect: "പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          { title: "ശ്രേണി പൂർത്തിയാക്കൽ", description: "5, 10, 15, 20, ?", instruction: "അടുത്ത സംഖ്യ തിരഞ്ഞെടുക്കുക.", logicPremise: "5, 10, 15, 20, ?", logicOptions: ["22", "25", "30", "35"], logicAnswer: "25" },
          { title: "സമവാക്യം", description: "X - 8 = 12", instruction: "X കണ്ടെത്തുക.", logicPremise: "X - 8 = 12", logicOptions: ["16", "18", "20", "24"], logicAnswer: "20" },
          { title: "വിഭജനം", description: "20 യൂണിറ്റിന്റെ പകുതി.", instruction: "20 ന്റെ പകുതി കാണുക." },
          { title: "പരപ്പളവ്", description: "5m × 4m ചതുരത്തിന്റെ പരപ്പളവ്.", instruction: "പരപ്പളവ് = നീളം × വീതി.", logicPremise: "5m × 4m ചതുരത്തിന്റെ പരപ്പളവ്?", logicOptions: ["9 m²", "18 m²", "20 m²", "25 m²"], logicAnswer: "20 m²" }
        ]
      },
      'math-2-1': { missionTitle: "ബീജഗണിത മാട്രിക്സ്", story: "2X + 4 = 16 പരിഹരിക്കുക.", primaryConcept: "ബീജഗണിതം", learningObjective: "സമവാക്യങ്ങൾ പരിഹരിക്കുക.", missionObjective: "X കണ്ടെത്തുക.", hint: "4 കുറച്ച് 2 കൊണ്ട് ഹരിക്കുക.", feedbackIncorrect: "2X = 12, X = 6.", logicPremise: "2X + 4 = 16 ൽ X എത്ര?", logicOptions: ["4", "5", "6", "8"], logicAnswer: "6" },
      'math-2-2': { missionTitle: "ത്രികോണ കോൺ", story: "ത്രികോണത്തിന്റെ രണ്ട് കോണുകൾ 60°, 70° ആണ്. മൂന്നാമത്തെ കോൺ എത്ര?", primaryConcept: "ത്രികോണ കോണുകൾ", learningObjective: "കോണുകളുടെ തുക 180° ആണ്.", missionObjective: "മൂന്നാമത്തെ കോൺ കണ്ടെത്തുക.", hint: "180 - (60 + 70) = 50°.", feedbackIncorrect: "180 - 130 = 50°.", logicPremise: "60°, 70° കോണുകളുള്ള ത്രികോണത്തിന്റെ 3-ാം കോൺ?", logicOptions: ["40°", "50°", "60°", "70°"], logicAnswer: "50°" },
      'math-2-3': { missionTitle: "അനുപാതം", story: "ഇന്ധനവും വെള്ളവും 3:1 അനുപാതത്തിൽ കലർത്തുക. ആകെ 20 ലിറ്റർ. ഇന്ധനം എത്ര?", primaryConcept: "അനുപാതം", learningObjective: "അനുപാതത്തിൽ വിഭജിക്കുക.", missionObjective: "ഇന്ധനത്തിന്റെ അളവ് കണ്ടെത്തുക.", hint: "ആകെ ഭാഗങ്ങൾ = 4. 20/4 = 5. ഇന്ധനം = 3×5 = 15.", feedbackIncorrect: "ഇന്ധനം 15 ലിറ്ററാണ്.", logicPremise: "ഇന്ധനം:വെള്ളം = 3:1. ആകെ = 20L. ഇന്ധനം = ?", logicOptions: ["10L", "12L", "15L", "16L"], logicAnswer: "15L" },
      'math-2-4': { missionTitle: "ശരാശരി വേഗത", story: "ഒരു വാഹനം 2 മണിക്കൂറിൽ 120 കി.മീ സഞ്ചരിക്കുന്നു. ശരാശരി വേഗത?", primaryConcept: "വേഗത", learningObjective: "വേഗത = ദൂരം / സമയം.", missionObjective: "വേഗത കണ്ടെത്തുക.", hint: "120 / 2 = 60 കി.മീ/മണിക്കൂർ.", feedbackIncorrect: "120 / 2 = 60 കി.മീ/മണിക്കൂർ.", logicPremise: "2 മണിക്കൂറിൽ 120 കി.മീ പോകുന്ന വേഗത?", logicOptions: ["50 കി.മീ/മണിക്കൂർ", "60 കി.മീ/മണിക്കൂർ", "70 കി.മീ/മണിക്കൂർ", "80 കി.മീ/മണിക്കൂർ"], logicAnswer: "60 കി.മീ/മണിക്കൂർ" },
      'math-2-5': { missionTitle: "ഘാതാങ്കം", story: "2⁴ ന്റെ മൂല്യം കാണുക.", primaryConcept: "ഘാതാങ്കങ്ങൾ", learningObjective: "സംഖ്യകളുടെ ഘാതം മനസ്സിലാക്കുക.", missionObjective: "2⁴ കണ്ടെത്തുക.", hint: "2 × 2 × 2 × 2 = 16.", feedbackIncorrect: "2⁴ = 16.", logicPremise: "2⁴ ന്റെ മൂല്യം എത്ര?", logicOptions: ["8", "12", "16", "32"], logicAnswer: "16" },
      'math-2-6': { missionTitle: "വൃത്ത ആരം", story: "വ്യാസം 14 സെ.മീ ആയാൽ ആരം എത്ര?", primaryConcept: "വൃത്ത ജ്യാമിതി", learningObjective: "ആരം = വ്യാസം / 2.", missionObjective: "ആരം കണ്ടെത്തുക.", hint: "14 / 2 = 7 സെ.മീ.", feedbackIncorrect: "ആരം = 14 / 2 = 7 സെ.മീ.", logicPremise: "14 സെ.മീ വ്യാസമുള്ള വൃത്തത്തിന്റെ ആരം?", logicOptions: ["5 സെ.മീ", "6 സെ.മീ", "7 സെ.മീ", "28 സെ.മീ"], logicAnswer: "7 സെ.മീ" },
      'math-2-7': { missionTitle: "പൈതഗോറസ് തിയറം", story: "മട്ടത്രികോണത്തിന്റെ വശങ്ങൾ 3m, 4m ആണ്. കർണ്ണം കണ്ടെത്തുക.", primaryConcept: "പൈതഗോറസ് തിയറം", learningObjective: "a² + b² = c².", missionObjective: "കർണ്ണം c കണ്ടെത്തുക.", hint: "3² + 4² = 9 + 16 = 25. √25 = 5.", feedbackIncorrect: "കർണ്ണം = 5m.", logicPremise: "3m, 4m വശങ്ങളുള്ള ത്രികോണത്തിന്റെ കർണ്ണം?", logicOptions: ["5", "6", "7", "25"], logicAnswer: "5" },
      'math-2-8': { missionTitle: "ചരിവ്", story: "2 അലക് നീങ്ങുമ്പോൾ 6 അലക് ഉയരുന്നു. ചരിവ് കണ്ടെത്തുക.", primaryConcept: "രേഖീയ ചരിവ്", learningObjective: "ചരിവ് = ഉയരം / നീളം.", missionObjective: "ചരിവ് കണ്ടെത്തുക.", hint: "6 / 2 = 3.", feedbackIncorrect: "ചരിവ് = 6 / 2 = 3.", logicPremise: "ഉയരം=6, നീളം=2 ആയാൽ ചരിവ് എത്ര?", logicOptions: ["2", "3", "4", "12"], logicAnswer: "3" },
      'math-2-9': { missionTitle: "സമവാക്യ വ്യവസ്ഥ", story: "X + Y = 10, X - Y = 2. X കണ്ടെത്തുക.", primaryConcept: "സമവാക്യ വ്യവസ്ഥകൾ", learningObjective: "സമവാക്യങ്ങൾ പരിഹരിക്കുക.", missionObjective: "X കണ്ടെത്തുക.", hint: "കൂട്ടുക: 2X = 12, അതിനാൽ X = 6.", feedbackIncorrect: "2X = 12, X = 6.", logicPremise: "X + Y = 10, X - Y = 2 ആയാൽ X എത്ര?", logicOptions: ["5", "6", "7", "8"], logicAnswer: "6" },
      'math-2-10': {
        missionTitle: "സ്റ്റേജ് 2 ബോസ് — ബീജഗണിത മാസ്റ്ററി",
        story: "സമവാക്യങ്ങളും ജ്യാമിതിയും സ്വായത്തമാക്കുക!",
        primaryConcept: "ഗണിത സ്റ്റേജ് 2 മാസ്റ്ററി",
        learningObjective: "ബീജഗണിതവും ജ്യാമിതിയും പ്രയോഗിക്കുക.",
        missionObjective: "4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "സമവാക്യങ്ങൾ ഓർക്കുക.",
        feedbackIncorrect: "പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          { title: "സമവാക്യ പരിശോധന", description: "4X = 32 പരിഹരിക്കുക", instruction: "X കണ്ടെത്തുക.", logicPremise: "4X = 32", logicOptions: ["6", "7", "8", "9"], logicAnswer: "8" },
          { title: "അനുപാതം", description: "അനുപാതം 2:3, ആകെ 25. വലിയ ഭാഗം കാണുക.", instruction: "വലിയ ഭാഗം കാണുക.", logicPremise: "2:3 അനുപാതത്തിൽ 25 ന്റെ വലിയ ഭാഗം?", logicOptions: ["10", "12", "15", "18"], logicAnswer: "15" },
          { title: "മട്ടത്രികോണം", description: "വശങ്ങൾ 6, 8. കർണ്ണം കാണുക.", instruction: "പൈതഗോറസ് തിയറം ഉപയോഗിക്കുക." },
          { title: "വേഗത", description: "3 മണിക്കൂറിൽ 180 കി.മീ. വേഗത?", instruction: "വേഗത കാണുക.", logicPremise: "180 / 3 = ?", logicOptions: ["50", "60", "70", "90"], logicAnswer: "60" }
        ]
      },
      'math-3-1': { missionTitle: "ശരാശരി", story: "4, 8, 12, 16 ന്റെ ശരാശരി കണ്ടെത്തുക.", primaryConcept: "ശരാശരി", learningObjective: "ശരാശരി കണക്കാക്കുക.", missionObjective: "ശരാശരി കാണുക.", hint: "(4+8+12+16)/4 = 10.", feedbackIncorrect: "ശരാശരി = 10.", logicPremise: "4, 8, 12, 16 ന്റെ ശരാശരി എത്ര?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'math-3-2': { missionTitle: "മധ്യകം", story: "3, 7, 9, 15, 21 ന്റെ മധ്യകം കണ്ടെത്തുക.", primaryConcept: "മധ്യകം", learningObjective: "മധ്യ സംഖ്യ കണ്ടെത്തുക.", missionObjective: "മധ്യകം കാണുക.", hint: "നടുവിലുള്ള സംഖ്യ 9 ആണ്.", feedbackIncorrect: "മധ്യകം 9 ആണ്.", logicPremise: "3, 7, 9, 15, 21 ന്റെ മധ്യകം എത്ര?", logicOptions: ["7", "9", "12", "15"], logicAnswer: "9" },
      'math-3-3': { missionTitle: "ഉരുള വ്യാപ്തം", story: "അടിത്തറ பரப்பளவு = 10 m², ഉയരം = 5 m. വ്യാപ്തം കാണുക.", primaryConcept: "വ്യാപ്തം", learningObjective: "വ്യാപ്തം = അടിത്തറ பரப்பளவு × ഉയരം.", missionObjective: "വ്യാപ്തം കാണുക.", hint: "10 × 5 = 50 m³.", feedbackIncorrect: "10 × 5 = 50 m³.", logicPremise: "10m² അടിത്തറയും 5m ഉയരവുമുള്ള ഉരുളയുടെ വ്യാപ്തം?", logicOptions: ["15 m³", "25 m³", "50 m³", "100 m³"], logicAnswer: "50 m³" },
      'math-3-4': { missionTitle: "വർഗ്ഗമൂലം", story: "X² = 49 ആയാൽ X കണ്ടെത്തുക.", primaryConcept: "വർഗ്ഗമൂലം", learningObjective: "X² = N പരിഹരിക്കുക.", missionObjective: "X കാണുക.", hint: "√49 = 7.", feedbackIncorrect: "√49 = 7.", logicPremise: "X² = 49 ആയാൽ positive X എത്ര?", logicOptions: ["6", "7", "8", "9"], logicAnswer: "7" },
      'math-3-5': { missionTitle: "സാധാരണ പലിശ", story: "മുതൽ = ₹1000, നിരക്ക് = 5%, സമയം = 2 വർഷം. പലിശ കാണുക.", primaryConcept: "പലിശ", learningObjective: "പലിശ = (P × R × T)/100.", missionObjective: "പലിശ കാണുക.", hint: "(1000 × 5 × 2)/100 = 100.", feedbackIncorrect: "പലിശ = ₹100.", logicPremise: "₹1000 ക്ക് 5% നിരക്കിൽ 2 വർഷത്തെ പലിശ?", logicOptions: ["₹50", "₹100", "₹150", "₹200"], logicAnswer: "₹100" },
      'math-3-6': { missionTitle: "ബഹുഭുജ കോണുകൾ", story: "പഞ്ചഭുജത്തിന്റെ (5 വശങ്ങൾ) കോണുകളുടെ തുക കാണുക.", primaryConcept: "ബഹുഭുജങ്ങൾ", learningObjective: "(n-2) × 180°.", missionObjective: "തുക കാണുക.", hint: "(5-2) × 180 = 540°.", feedbackIncorrect: "(5-2) × 180 = 540°.", logicPremise: "5 വശങ്ങളുള്ള പഞ്ചഭുജത്തിന്റെ കോണുകളുടെ തുക?", logicOptions: ["360°", "450°", "540°", "720°"], logicAnswer: "540°" },
      'math-3-7': { missionTitle: "ഫാക്ടോറിയൽ", story: "4! (4 ഫാക്ടോറിയൽ) കണ്ടെത്തുക.", primaryConcept: "ഫാക്ടോറിയൽ", learningObjective: "4! = 4 × 3 × 2 × 1.", missionObjective: "4! കാണുക.", hint: "4 × 3 × 2 × 1 = 24.", feedbackIncorrect: "4! = 24.", logicPremise: "4! ന്റെ മൂല്യം എത്ര?", logicOptions: ["12", "16", "24", "48"], logicAnswer: "24" },
      'math-3-8': { missionTitle: "വിന്യാസം", story: "4 വസ്തുക്കളിൽ നിന്ന് 2 എണ്ണം തിരഞ്ഞെടുക്കാനുള്ള വഴികൾ?", primaryConcept: "വിന്യാസങ്ങൾ", learningObjective: "C(4,2) കണക്കാക്കുക.", missionObjective: "C(4,2) കാണുക.", hint: "(4 × 3) / (2 × 1) = 6.", feedbackIncorrect: "C(4,2) = 6.", logicPremise: "4 വസ്തുക്കളിൽ നിന്ന് 2 എണ്ണം തിരഞ്ഞെടുക്കാനുള്ള വഴികൾ?", logicOptions: ["4", "6", "8", "12"], logicAnswer: "6" },
      'math-3-9': { missionTitle: "ലോഗരിതം", story: "log₁₀(1000) കണ്ടെത്തുക.", primaryConcept: "ലോഗരിതങ്ങൾ", learningObjective: "ലോഗരിതം മനസ്സിലാക്കുക.", missionObjective: "log₁₀(1000) കാണുക.", hint: "10³ = 1000, അതിനാൽ log₁₀(1000) = 3.", feedbackIncorrect: "log₁₀(1000) = 3.", logicPremise: "log₁₀(1000) ന്റെ മൂല്യം എത്ര?", logicOptions: ["2", "3", "4", "10"], logicAnswer: "3" },
      'math-3-10': {
        missionTitle: "സ്റ്റേജ് 3 ബോസ് — പ്രായോഗിക ഗണിത മാസ്റ്ററി",
        story: "സ്റ്റാറ്റിസ്റ്റിക്സും വ്യാപ്തവും സ്വായത്തമാക്കുക!",
        primaryConcept: "ഗണിത സ്റ്റേജ് 3 മാസ്റ്ററി",
        learningObjective: "സ്റ്റാറ്റിസ്റ്റിക്സും 3D ജ്യാമിതിയും പ്രയോഗിക്കുക.",
        missionObjective: "4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "സൂത്രവാക്യങ്ങൾ ഉപയോഗിക്കുക.",
        feedbackIncorrect: "പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          { title: "ശരാശരി പരിശോധന", description: "10, 20, 30 ന്റെ ശരാശരി?", instruction: "ശരാശരി കാണുക.", logicPremise: "10, 20, 30 ന്റെ ശരാശരി?", logicOptions: ["15", "20", "25", "30"], logicAnswer: "20" },
          { title: "വർഗ്ഗമൂലം", description: "√81 = ?", instruction: "വർഗ്ഗമൂലം കാണുക.", logicPremise: "√81 = ?", logicOptions: ["7", "8", "9", "10"], logicAnswer: "9" },
          { title: "വ്യാപ്തം", description: "അടിത്തറ 6m², ഉയരം 4m.", instruction: "വ്യാപ്തം കണക്കാക്കുക." },
          { title: "ലോഗരിതം", description: "log₁₀(100) = ?", instruction: "ലോഗരിതം കാണുക.", logicPremise: "log₁₀(100) = ?", logicOptions: ["1", "2", "3", "4"], logicAnswer: "2" }
        ]
      },
      'math-4-1': { missionTitle: "ദ്വിമാന സമവാക്യം", story: "X² - 5X + 6 = 0 പരിഹരിക്കുക.", primaryConcept: "ദ്വിമാന സമവാക്യങ്ങൾ", learningObjective: "സമവാക്യം പരിഹരിക്കുക.", missionObjective: "മൂല്യങ്ങൾ കാണുക.", hint: "(X-2)(X-3)=0, 2 ഉം 3 ഉം ആണ്.", feedbackIncorrect: "2 ഉം 3 ഉം ആണ്.", logicPremise: "X² - 5X + 6 = 0 ന്റെ മൂല്യങ്ങൾ?", logicOptions: ["1 ഉം 6 ഉം", "2 ഉം 3 ഉം", "0 വും 5 ഉം", "-2 ഉം -3 ഉം"], logicAnswer: "2 ഉം 3 ഉം" },
      'math-4-2': { missionTitle: "മാട്രിക്സ്", story: "[[4, 2], [1, 3]] മാട്രിക്സിന്റെ നിർണ്ണായക മൂല്യം കാണുക.", primaryConcept: "മാട്രിക്സുകൾ", learningObjective: "ad - bc കാണുക.", missionObjective: "മൂല്യം കാണുക.", hint: "(4×3) - (2×1) = 10.", feedbackIncorrect: "മൂല്യം = 10.", logicPremise: "[[4, 2], [1, 3]] ന്റെ നിർണ്ണായക മൂല്യം?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'math-4-3': { missionTitle: "ത്രികോണമിതി സൈൻ", story: "എതിർവശം = 3, കർണ്ണം = 5. sin(θ) കാണുക.", primaryConcept: "ത്രികോണമിതി", learningObjective: "sin = എതിർവശം / കർണ്ണം.", missionObjective: "sin(θ) കാണുക.", hint: "3 / 5 = 0.6.", feedbackIncorrect: "sin(θ) = 0.6.", logicPremise: "എതിർവശം=3, കർണ്ണം=5 ആയാൽ sin(θ)?", logicOptions: ["0.5", "0.6", "0.75", "0.8"], logicAnswer: "0.6" },
      'math-4-4': { missionTitle: "ഡിഫറൻഷ്യേഷൻ", story: "X=2 ൽ f(X) = X³ ന്റെ ഡിഫറൻഷ്യൽ കാണുക.", primaryConcept: "ഡിഫറൻഷ്യേഷൻ", learningObjective: "f'(X) = 3X².", missionObjective: "f'(2) കാണുക.", hint: "3 × (2²) = 12.", feedbackIncorrect: "f'(2) = 12.", logicPremise: "X=2 ൽ X³ ന്റെ ഡിഫറൻഷ്യൽ എത്ര?", logicOptions: ["6", "8", "12", "16"], logicAnswer: "12" },
      'math-4-5': { missionTitle: "ഇന്റഗ്രേഷൻ", story: "X=0 മുതൽ X=3 വരെ f(X) = 2X ഇന്റഗ്രേറ്റ് ചെയ്യുക.", primaryConcept: "ഇന്റഗ്രേഷൻ", learningObjective: "∫ 2X dX = X².", missionObjective: "∫₀³ 2X dX കാണുക.", hint: "3² - 0² = 9.", feedbackIncorrect: "∫₀³ 2X dX = 9.", logicPremise: "∫₀³ 2X dX ന്റെ മൂല്യം എത്ര?", logicOptions: ["6", "9", "12", "18"], logicAnswer: "9" },
      'math-4-6': { missionTitle: "വെക്ടറുകൾ", story: "A = [3, 4], B = [1, 2] കൂട്ടുക.", primaryConcept: "വെക്ടർ ഗണിതം", learningObjective: "വെക്ടറുകൾ കൂട്ടുക.", missionObjective: "A + B കാണുക.", hint: "[3+1, 4+2] = [4, 6].", feedbackIncorrect: "A + B = [4, 6].", logicPremise: "[3, 4] + [1, 2] = ?", logicOptions: ["[4, 6]", "[3, 8]", "[2, 2]", "[5, 5]"], logicAnswer: "[4, 6]" },
      'math-4-7': { missionTitle: "സങ്കീർണ്ണ സംഖ്യകൾ", story: "(2 + i)(2 - i) ഗുണിക്കുക.", primaryConcept: "സങ്കീർണ്ണ സംഖ്യകൾ", learningObjective: "a² + b².", missionObjective: "(2+i)(2-i) കാണുക.", hint: "4 - (-1) = 5.", feedbackIncorrect: "മൂല്യം = 5.", logicPremise: "(2+i)(2-i) ന്റെ മൂല്യം എത്ര?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'math-4-8': { missionTitle: "അനന്ത ശ്രേണി", story: "1 + 1/2 + 1/4 + 1/8 + ... ശ്രേണിയുടെ തുക കാണുക.", primaryConcept: "അനന്ത ശ്രേണി", learningObjective: "തുക = a / (1 - r).", missionObjective: "തുക കാണുക.", hint: "1 / (1 - 0.5) = 2.", feedbackIncorrect: "തുക = 2.", logicPremise: "1 + 1/2 + 1/4 + ... ശ്രേണിയുടെ തുക?", logicOptions: ["1.5", "2", "2.5", "3"], logicAnswer: "2" },
      'math-4-9': { missionTitle: "ഓപ്റ്റിമൈസേഷൻ", story: "f(X) = -(X - 3)² + 10 ന്റെ പരമാവധി മൂല്യം കാണുക.", primaryConcept: "ഓപ്റ്റിമൈസേഷൻ", learningObjective: "പരമാവധി മൂല്യം കണ്ടെത്തുക.", missionObjective: "മൂല്യം കാണുക.", hint: "X = 3 ആകുമ്പോൾ മൂല്യം 10 ആണ്.", feedbackIncorrect: "മൂല്യം = 10.", logicPremise: "-(X-3)² + 10 ന്റെ പരമാവധി മൂല്യം?", logicOptions: ["3", "7", "10", "13"], logicAnswer: "10" },
      'math-4-10': {
        missionTitle: "സ്റ്റേജ് 4 ബോസ് — ആക്സിയം സ്റ്റോൺ മാസ്റ്ററി",
        story: "അവസാന ഗണിത പരീക്ഷണം! ആക്സിയം സ്റ്റോൺ സ്വന്തമാക്കാൻ നിങ്ങളുടെ എല്ലാ അറിവുകളും ഉപയോഗിക്കുക!",
        primaryConcept: "ഗണിത സ്റ്റേജ് 4 സമ്പൂർണ്ണ മാസ്റ്ററി",
        learningObjective: "ഉയർന്ന ഗണിത ആശയങ്ങൾ സ്വായത്തമാക്കുക.",
        missionObjective: "4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "സമ്പൂർണ്ണ അറിവ് പ്രയോഗിക്കുക.",
        feedbackIncorrect: "പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          { title: "സമവാക്യം", description: "X² - 9 = 0 ന്റെ മൂല്യം", instruction: "മൂല്യം കാണുക.", logicPremise: "X² - 9 = 0 ന്റെ positive മൂല്യം?", logicOptions: ["2", "3", "4", "9"], logicAnswer: "3" },
          { title: "ത്രികോണമിതി", description: "sin(30°) = ?", instruction: "sin(30°) കാണുക.", logicPremise: "sin(30°) = ?", logicOptions: ["0.5", "0.707", "0.866", "1.0"], logicAnswer: "0.5" },
          { title: "ഡിഫറൻഷ്യേഷൻ", description: "X=3 ൽ 5X ന്റെ ഡിഫറൻഷ്യൽ.", instruction: "ഡിഫറൻഷ്യൽ കാണുക." },
          { title: "വെക്ടർ കൂട്ടൽ", description: "[2, 3] + [4, 1] = ?", instruction: "വെക്ടറുകൾ കൂട്ടുക.", logicPremise: "[2, 3] + [4, 1] = ?", logicOptions: ["[6, 4]", "[5, 5]", "[6, 3]", "[7, 4]"], logicAnswer: "[6, 4]" }
        ]
      }
    },
    fragments: { f1: "ഗണിത കഷ്ണം 1", f2: "ഗണിത കഷ്ണം 2", f3: "ഗണിത കഷ്ണം 3", f4: "ഗണിത കഷ്ണം 4", acquired: "ഗണിത സ്റ്റോൺ കഷ്ണം സ്വന്തമാക്കി!", desc: "നിങ്ങൾ ആക്സിയം സ്റ്റോണിന്റെ ഒരു ഭാഗം സ്വന്തമാക്കി." },
    stone: { title: "ആക്സിയം സ്റ്റോൺ", acquired: "ആക്സിയം സ്റ്റോൺ സ്വന്തമാക്കി!", desc: "നിങ്ങൾ ഗണിത പാതയിൽ പൂർണ്ണ മാസ്റ്ററി നേടുകയും സാർവത്രിക ലോജിക് തിരിച്ചറിയുകയും ചെയ്തു." },
    achievements: {
      initiate: { title: "ഗണിത തുടക്കക്കാരൻ", desc: "ഗണിത വിഭാഗത്തിന്റെ സ്റ്റേജ് 1 പൂർത്തിയാക്കി." },
      physics: { title: "സംഖ്യാ മാർഗ്ഗദർശി", desc: "ശ്രേണികൾ, സമവാക്യങ്ങൾ എന്നിവയിൽ മാസ്റ്ററി നേടി." },
      chemistry: { title: "ബീജഗണിത അന്വേഷകൻ", desc: "രേഖീയ വ്യവസ്ഥകൾ, അനുപാതങ്ങൾ എന്നിവയിൽ മാസ്റ്ററി നേടി." },
      biology: { title: "ജ്യാമിതി കണ്ടെത്തൽക്കാരൻ", desc: "കോണുകൾ, പൈതഗോറസ് തിയറം എന്നിവയിൽ മാസ്റ്ററി നേടി." },
      master: { title: "ഗണിത മാസ്റ്റർ", desc: "എല്ലാ 40 ഗണിത ലെവലുകളും പൂർത്തിയാക്കി ആക്സിയം സ്റ്റോൺ അസംബിൾ ചെയ്തു!" }
    }
  }
};
