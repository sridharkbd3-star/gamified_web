// ============================================================
// S.H.I.E.L.D. Platform — Technology Curriculum Multilingual Data
// Complete 40 Levels, 4 Stages, 4 Bosses, 4 Fragments & Circuit Stone
// Languages: English (en), Tamil (ta), Hindi (hi), Malayalam (ml)
// ============================================================

import type { DomainTranslation } from './scienceCurriculumData';

export const techCurriculumData: Record<'en' | 'ta' | 'hi' | 'ml', DomainTranslation> = {
  en: {
    title: "TECHNOLOGY DOMAIN",
    subtitle: "Computing, Circuits & Software Engineering",
    intro: "Explore computer architecture, algorithms, digital logic, networking, and software to master digital technology.",
    stages: {
      'stage-1': {
        title: "STAGE 1 — DISCOVER",
        subtitle: "Digital Fundamentals",
        desc: "Understand binary code, logic gates, input/output devices, sensors, and basic algorithms.",
        concept: "Computers & Binary Systems",
        learningObjective: "Master binary numbers, logic gates, hardware components, and algorithm steps.",
        reward: "Technology Fragment 1"
      },
      'stage-2': {
        title: "STAGE 2 — UNDERSTAND",
        subtitle: "Circuits & Control Flow",
        desc: "Master variables, conditional branching, loops, memory storage, and network fundamentals.",
        concept: "Programming & Circuit Control",
        learningObjective: "Apply if-else statements, while/for loops, memory management, and IP protocols.",
        reward: "Technology Fragment 2"
      },
      'stage-3': {
        title: "STAGE 3 — SYSTEMS & DATA",
        subtitle: "Data Structures & Networks",
        desc: "Explore data structures, encryption, APIs, cloud computing, database queries, and cybersecurity.",
        concept: "System Architecture & Security",
        learningObjective: "Analyze data structures, hashing, encryption algorithms, and database design.",
        reward: "Technology Fragment 3"
      },
      'stage-4': {
        title: "STAGE 4 — MASTERY",
        subtitle: "Software Engineering & AI",
        desc: "Master complex algorithms, neural networks, machine learning models, and system debugging.",
        concept: "Advanced Technology & Core Mastery",
        learningObjective: "Integrate full-stack system architecture and assemble the Circuit Stone.",
        reward: "Technology Fragment 4 & Circuit Stone"
      }
    },
    levels: {
      'tech-1-1': {
        missionTitle: "THE BINARY TRANSMISSION",
        story: "The communication relay is transmitting binary signals. Decode binary 0101 to decimal.",
        primaryConcept: "Binary Numbers",
        learningObjective: "Convert binary 0101 into decimal.",
        missionObjective: "Decode binary 0101.",
        hint: "Binary 0101 = 4 + 0 + 1 = 5.",
        feedbackIncorrect: "0101 in binary equals 5 in decimal.",
        logicPremise: "Convert binary 0101 to decimal:",
        logicOptions: ["3", "4", "5", "6"],
        logicAnswer: "5"
      },
      'tech-1-2': {
        missionTitle: "THE BINARY CODE II",
        story: "Decode binary 1010 to restore the server connection.",
        primaryConcept: "Binary Systems",
        learningObjective: "Convert binary 1010 to decimal.",
        missionObjective: "Find decimal equivalent of 1010.",
        hint: "1010 = 8 + 0 + 2 + 0 = 10.",
        feedbackIncorrect: "Binary 1010 equals 10 in decimal.",
        logicPremise: "Binary 1010 equals what in decimal?",
        logicOptions: ["8", "10", "12", "14"],
        logicAnswer: "10"
      },
      'tech-1-3': {
        missionTitle: "THE LOGIC GATE",
        story: "The circuit is disconnected. Identify when an AND gate produces output 1.",
        primaryConcept: "Logic Gates",
        learningObjective: "Understand AND gate function.",
        missionObjective: "Identify AND gate condition.",
        hint: "AND means both inputs must be 1.",
        feedbackIncorrect: "An AND gate requires all inputs to be 1.",
        logicPremise: "An AND gate gives output 1 only when...",
        logicOptions: ["Both inputs are 1", "At least one input is 1", "Both inputs are 0", "One input is 0"],
        logicAnswer: "Both inputs are 1"
      },
      'tech-1-4': {
        missionTitle: "THE INPUT ROOM",
        story: "Classify computer hardware devices into input or output.",
        primaryConcept: "Input/Output Devices",
        learningObjective: "Distinguish between input and output hardware.",
        missionObjective: "Classify a keyboard.",
        hint: "Does a keyboard send data INTO the computer?",
        feedbackIncorrect: "A keyboard is an input device.",
        logicPremise: "A keyboard is an example of a __ device.",
        logicOptions: ["Output", "Processing", "Input", "Storage"],
        logicAnswer: "Input"
      },
      'tech-1-5': {
        missionTitle: "THE SENSOR LAB",
        story: "Select the correct sensor type for automatic sliding doors.",
        primaryConcept: "Sensors & Automation",
        learningObjective: "Identify motion sensor applications.",
        missionObjective: "Choose sensor for automatic door.",
        hint: "It detects motion of approaching people.",
        feedbackIncorrect: "A motion sensor detects movement near the door.",
        logicPremise: "Which sensor triggers automatic doors when people approach?",
        logicOptions: ["Temperature sensor", "Motion sensor", "Light sensor", "Pressure sensor"],
        logicAnswer: "Motion sensor"
      },
      'tech-1-6': {
        missionTitle: "THE ALGORITHM STEPS",
        story: "Arrange algorithm instructions in the correct logical order.",
        primaryConcept: "Algorithm Design",
        learningObjective: "Order sequential steps in an algorithm.",
        missionObjective: "Identify the first step of a cooking algorithm.",
        hint: "You must gather ingredients before cooking.",
        feedbackIncorrect: "Gathering ingredients comes before cooking.",
        logicPremise: "What is the FIRST step in a recipe algorithm?",
        logicOptions: ["Serve food", "Gather ingredients", "Cook dish", "Wash plates"],
        logicAnswer: "Gather ingredients"
      },
      'tech-1-7': {
        missionTitle: "THE CPU CORE",
        story: "Identify the component of a computer that executes calculations.",
        primaryConcept: "CPU & Processing",
        learningObjective: "Identify CPU function.",
        missionObjective: "Identify the brain of the computer.",
        hint: "CPU stands for Central Processing Unit.",
        feedbackIncorrect: "The CPU executes instructions and calculations.",
        logicPremise: "Which computer component is known as the 'brain'?",
        logicOptions: ["Hard Drive", "CPU", "Monitor", "RAM"],
        logicAnswer: "CPU"
      },
      'tech-1-8': {
        missionTitle: "RAM MEMORY",
        story: "Differentiate between short-term RAM and long-term storage.",
        primaryConcept: "Computer Memory",
        learningObjective: "Identify RAM as temporary volatile memory.",
        missionObjective: "Identify RAM characteristic.",
        hint: "RAM contents disappear when powered off.",
        feedbackIncorrect: "RAM is temporary (volatile) working memory.",
        logicPremise: "RAM (Random Access Memory) is used for...",
        logicOptions: ["Permanent file storage", "Temporary fast data access", "Displaying images", "Power supply"],
        logicAnswer: "Temporary fast data access"
      },
      'tech-1-9': {
        missionTitle: "THE BUG HUNTER",
        story: "Debug an error in computer code. What is a programming error called?",
        primaryConcept: "Debugging",
        learningObjective: "Identify syntax errors as software bugs.",
        missionObjective: "Identify the term for a code error.",
        hint: "Grace Hopper famously found a moth inside a computer.",
        feedbackIncorrect: "An error in computer code is called a bug.",
        logicPremise: "An error or mistake in a computer program is called a...",
        logicOptions: ["Virus", "Bug", "Feature", "Chip"],
        logicAnswer: "Bug"
      },
      'tech-1-10': {
        missionTitle: "STAGE 1 BOSS — DIGITAL SPARK MASTERY",
        story: "Master binary numbers, logic gates, hardware, and debugging to restore the core server!",
        primaryConcept: "Technology Stage 1 Mastery",
        learningObjective: "Apply binary, logic gates, and hardware fundamentals.",
        missionObjective: "Complete all 4 phases.",
        hint: "Recall binary and hardware concepts.",
        feedbackIncorrect: "Phase failed. Try again!",
        phases: [
          { title: "Binary Decode", description: "Convert binary 0110 to decimal.", instruction: "Select decimal value.", logicPremise: "Binary 0110 in decimal?", logicOptions: ["4", "5", "6", "7"], logicAnswer: "6" },
          { title: "OR Gate", description: "An OR gate outputs 1 when at least one input is 1.", instruction: "Select OR gate rule.", logicPremise: "An OR gate gives 1 when...", logicOptions: ["At least one input is 1", "Both inputs are 0", "Only when both are 1", "Never"], logicAnswer: "At least one input is 1" },
          { title: "Hardware Check", description: "Is a monitor an input or output device?", instruction: "Select device type." },
          { title: "Debug Protocol", description: "What is fixing errors in code called?", instruction: "Select term.", logicPremise: "Fixing code errors is called...", logicOptions: ["Compiling", "Debugging", "Downloading", "Formatting"], logicAnswer: "Debugging" }
        ]
      },
      'tech-2-1': { missionTitle: "VARIABLE STORAGE", story: "Store player score in code: score = 100.", primaryConcept: "Variables", learningObjective: "Understand variables as named storage containers.", missionObjective: "Identify variable assignment.", hint: "Variables hold values that can change.", feedbackIncorrect: "score = 100 stores integer 100 in variable score.", logicPremise: "In code: score = 100. What is 'score'?", logicOptions: ["A variable name", "A fixed constant only", "An error", "A loop"], logicAnswer: "A variable name" },
      'tech-2-2': { missionTitle: "IF-ELSE BRANCH", story: "Evaluate: if (speed > 50) { status = 'FAST'; } else { status = 'SLOW'; } when speed = 60.", primaryConcept: "Conditionals", learningObjective: "Evaluate if-else branching.", missionObjective: "Determine output status.", hint: "60 > 50 is true.", feedbackIncorrect: "60 is greater than 50, so status = 'FAST'.", logicPremise: "if (speed > 50) status='FAST' else status='SLOW'. If speed=60, status is...", logicOptions: ["FAST", "SLOW", "ERROR", "NONE"], logicAnswer: "FAST" },
      'tech-2-3': { missionTitle: "FOR LOOP COUNT", story: "How many times does for (let i = 0; i < 4; i++) execute?", primaryConcept: "For Loops", learningObjective: "Count loop iterations.", missionObjective: "Find loop count.", hint: "i = 0, 1, 2, 3 (4 times).", feedbackIncorrect: "i runs for 0, 1, 2, 3 = 4 iterations.", logicPremise: "How many times does for (let i=0; i<4; i++) run?", logicOptions: ["3", "4", "5", "Infinite"], logicAnswer: "4" },
      'tech-2-4': { missionTitle: "WHILE LOOP CONDITION", story: "A while loop continues executing as long as its condition is...", primaryConcept: "While Loops", learningObjective: "Understand while loop execution condition.", missionObjective: "Identify condition requirement.", hint: "It runs while the condition remains true.", feedbackIncorrect: "A while loop runs as long as the condition is true.", logicPremise: "A while loop continues running while its condition is...", logicOptions: ["True", "False", "Null", "Undefined"], logicAnswer: "True" },
      'tech-2-5': { missionTitle: "FUNCTION CALL", story: "Define a function: function add(a, b) { return a + b; }. Evaluate add(3, 4).", primaryConcept: "Functions", learningObjective: "Call functions with parameters.", missionObjective: "Evaluate add(3, 4).", hint: "3 + 4 = 7.", feedbackIncorrect: "add(3, 4) returns 3 + 4 = 7.", logicPremise: "function add(a, b) { return a + b; }. What is add(3, 4)?", logicOptions: ["34", "7", "12", "0"], logicAnswer: "7" },
      'tech-2-6': { missionTitle: "ARRAY INDEXING", story: "In array items = ['Shield', 'Laser', 'Sensor'], what is items[0]?", primaryConcept: "Arrays & Lists", learningObjective: "Understand 0-indexed array access.", missionObjective: "Identify items[0].", hint: "Arrays start at index 0.", feedbackIncorrect: "Index 0 is the first item: 'Shield'.", logicPremise: "items = ['Shield', 'Laser', 'Sensor']. What is items[0]?", logicOptions: ["Shield", "Laser", "Sensor", "1"], logicAnswer: "Shield" },
      'tech-2-7': { missionTitle: "BOOLEAN LOGIC", story: "Evaluate: !(true && false).", primaryConcept: "Boolean Operators", learningObjective: "Evaluate NOT and AND logical operators.", missionObjective: "Find result of !(true && false).", hint: "true && false = false. !false = true.", feedbackIncorrect: "true && false is false. !false is true.", logicPremise: "What is the value of !(true && false)?", logicOptions: ["true", "false", "undefined", "null"], logicAnswer: "true" },
      'tech-2-8': { missionTitle: "IP ADDRESSING", story: "What is the purpose of an IP address on a computer network?", primaryConcept: "Networking & IP", learningObjective: "Identify IP address as network device identifier.", missionObjective: "Identify IP function.", hint: "IP addresses locate devices on a network.", feedbackIncorrect: "An IP address uniquely identifies a device on a network.", logicPremise: "An IP address is used to...", logicOptions: ["Uniquely identify a device on a network", "Store files", "Increase CPU speed", "Cool the computer"], logicAnswer: "Uniquely identify a device on a network" },
      'tech-2-9': { missionTitle: "HTTP PROTOCOL", story: "What does HTTP stand for in web technology?", primaryConcept: "Web Protocols", learningObjective: "Identify HTTP definition.", missionObjective: "Identify HTTP abbreviation.", hint: "Hypertext Transfer Protocol.", feedbackIncorrect: "HTTP = Hypertext Transfer Protocol.", logicPremise: "What does HTTP stand for?", logicOptions: ["Hypertext Transfer Protocol", "High Tech Power", "Home Terminal Transfer", "Hyper Text Processing"], logicAnswer: "Hypertext Transfer Protocol" },
      'tech-2-10': {
        missionTitle: "STAGE 2 BOSS — CONTROL FLOW & NETWORK MASTERY",
        story: "Master variables, loops, conditionals, and networks to reboot the main network router!",
        primaryConcept: "Technology Stage 2 Mastery",
        learningObjective: "Apply loops, conditionals, functions, and networking.",
        missionObjective: "Complete all 4 phases.",
        hint: "Recall loop counts and boolean logic.",
        feedbackIncorrect: "Phase failed. Try again!",
        phases: [
          { title: "Condition Check", description: "Evaluate if (10 > 5).", instruction: "Select result.", logicPremise: "Is 10 > 5 true or false?", logicOptions: ["true", "false"], logicAnswer: "true" },
          { title: "Array Lookup", description: "nums = [10, 20, 30]. What is nums[1]?", instruction: "Find value.", logicPremise: "nums[1] in [10, 20, 30]?", logicOptions: ["10", "20", "30", "1"], logicAnswer: "20" },
          { title: "Loop Iteration", description: "How many times does for (i=0; i<3; i++) run?", instruction: "Count runs." },
          { title: "IP Identify", description: "Which format is a valid IPv4 address?", instruction: "Select valid IP.", logicPremise: "Valid IPv4 address format?", logicOptions: ["192.168.1.1", "999.999.1", "http://server", "abc.def"], logicAnswer: "192.168.1.1" }
        ]
      },
      'tech-3-1': { missionTitle: "STACK DATA STRUCTURE", story: "A stack follows LIFO (Last In, First Out). Which element is removed first?", primaryConcept: "Stacks", learningObjective: "Understand LIFO stack push/pop.", missionObjective: "Identify top of stack removal.", hint: "The last item added is popped first.", feedbackIncorrect: "Stacks remove the most recently added (last) item first.", logicPremise: "In a LIFO stack, which element is removed first?", logicOptions: ["The last added element", "The first added element", "A random element", "The middle element"], logicAnswer: "The last added element" },
      'tech-3-2': { missionTitle: "QUEUE DATA STRUCTURE", story: "A queue follows FIFO (First In, First Out). Think of a line at a store.", primaryConcept: "Queues", learningObjective: "Understand FIFO queue enqueue/dequeue.", missionObjective: "Identify FIFO queue operation.", hint: "First in line gets served first.", feedbackIncorrect: "Queues process the first added element first.", logicPremise: "In a FIFO queue, which element is processed first?", logicOptions: ["The first added element", "The last added element", "The largest element", "The newest element"], logicAnswer: "The first added element" },
      'tech-3-3': { missionTitle: "ENCRYPTION HASHING", story: "Why do systems use cryptographic hashing for stored passwords?", primaryConcept: "Cybersecurity & Hashing", learningObjective: "Understand password hashing security.", missionObjective: "Identify hashing purpose.", hint: "Hashes cannot be easily reversed back to plaintext.", feedbackIncorrect: "Hashing protects passwords so plaintext is not stored.", logicPremise: "Why are passwords hashed before storage?", logicOptions: ["To protect raw passwords if data is breached", "To make passwords shorter", "To speed up internet connection", "To send emails faster"], logicAnswer: "To protect raw passwords if data is breached" },
      'tech-3-4': { missionTitle: "SQL DATABASE QUERY", story: "Which SQL command retrieves data from a database table?", primaryConcept: "Databases & SQL", learningObjective: "Identify SQL SELECT statement.", missionObjective: "Identify retrieval command.", hint: "SELECT retrieves rows from a table.", feedbackIncorrect: "SELECT is used to query data from a database.", logicPremise: "Which SQL query reads data from a table?", logicOptions: ["SELECT", "INSERT", "DELETE", "UPDATE"], logicAnswer: "SELECT" },
      'tech-3-5': { missionTitle: "API ENDPOINTS", story: "What does API stand for in software integration?", primaryConcept: "APIs", learningObjective: "Identify API acronym.", missionObjective: "Identify API term.", hint: "Application Programming Interface.", feedbackIncorrect: "API = Application Programming Interface.", logicPremise: "What does API stand for?", logicOptions: ["Application Programming Interface", "Automated Program Integration", "Advanced Protocol Internet", "App Private Identification"], logicAnswer: "Application Programming Interface" },
      'tech-3-6': { missionTitle: "CLOUD COMPUTING", story: "What is a main advantage of cloud computing over physical on-premise servers?", primaryConcept: "Cloud Architecture", learningObjective: "Identify cloud scalability advantages.", missionObjective: "Identify cloud benefit.", hint: "Cloud allows on-demand scaling without buying hardware.", feedbackIncorrect: "Cloud computing provides elastic scaling on demand.", logicPremise: "Main benefit of cloud computing?", logicOptions: ["On-demand scalable resources over internet", "No internet needed", "Free hardware forever", "Zero electricity required"], logicAnswer: "On-demand scalable resources over internet" },
      'tech-3-7': { missionTitle: "BINARY SEARCH ALGORITHM", story: "Binary search requires an array to be in what order?", primaryConcept: "Binary Search", learningObjective: "Identify sorted array prerequisite.", missionObjective: "Identify array requirement.", hint: "Binary search only works on sorted lists.", feedbackIncorrect: "Binary search requires the list to be sorted.", logicPremise: "Binary search requires data to be...", logicOptions: ["Sorted", "Unsorted", "Random", "Empty"], logicAnswer: "Sorted" },
      'math-3-8': { missionTitle: "CYBERSECURITY FIREWALL", story: "What is the primary function of a network firewall?", primaryConcept: "Firewalls & Security", learningObjective: "Identify firewall packet filtering.", missionObjective: "Identify firewall purpose.", hint: "It monitors and blocks unauthorized traffic.", feedbackIncorrect: "A firewall blocks unauthorized incoming/outgoing network traffic.", logicPremise: "What does a firewall do?", logicOptions: ["Blocks unauthorized network access", "Cleans physical dust from servers", "Generates electricity", "Stores database records"], logicAnswer: "Blocks unauthorized network access" },
      'tech-3-9': { missionTitle: "VERSION CONTROL (GIT)", story: "What command in Git creates a snapshot record of changes?", primaryConcept: "Version Control", learningObjective: "Identify Git commit operation.", missionObjective: "Identify commit command.", hint: "git commit saves changes locally.", feedbackIncorrect: "git commit saves a snapshot of code changes.", logicPremise: "Which Git command saves a snapshot of changes?", logicOptions: ["git commit", "git push", "git clone", "git init"], logicAnswer: "git commit" },
      'tech-3-10': {
        missionTitle: "STAGE 3 BOSS — SYSTEMS & ARCHITECTURE MASTERY",
        story: "Master data structures, SQL, security, APIs, and Git to defend the central database!",
        primaryConcept: "Technology Stage 3 Mastery",
        learningObjective: "Apply data structures, SQL, security, and Git.",
        missionObjective: "Complete all 4 phases.",
        hint: "Recall stacks, queues, SQL, and firewalls.",
        feedbackIncorrect: "Phase failed. Try again!",
        phases: [
          { title: "Stack Order", description: "Stack is LIFO or FIFO?", instruction: "Select order.", logicPremise: "Is stack LIFO or FIFO?", logicOptions: ["LIFO", "FIFO"], logicAnswer: "LIFO" },
          { title: "SQL Query", description: "Command to insert new row into SQL table?", instruction: "Select SQL command.", logicPremise: "Command to add row to table?", logicOptions: ["INSERT", "SELECT", "DROP", "ALTER"], logicAnswer: "INSERT" },
          { title: "Security Check", description: "What protects hashed passwords?", instruction: "Select hashing property." },
          { title: "Git Command", description: "Command to download repository from remote?", instruction: "Select Git command.", logicPremise: "Command to copy remote repository?", logicOptions: ["git clone", "git status", "git branch", "git merge"], logicAnswer: "git clone" }
        ]
      },
      'tech-4-1': { missionTitle: "BIG O NOTATION", story: "What is the time complexity of looking up an array item by index arr[i]?", primaryConcept: "Algorithm Complexity", learningObjective: "Identify O(1) constant time lookup.", missionObjective: "Identify time complexity.", hint: "Direct index lookup takes 1 operation: O(1).", feedbackIncorrect: "Array index lookup is O(1) constant time.", logicPremise: "Time complexity of direct array index access arr[i]?", logicOptions: ["O(1)", "O(N)", "O(N²)", "O(log N)"], logicAnswer: "O(1)" },
      'tech-4-2': { missionTitle: "NEURAL NETWORK NEURONS", story: "What is the basic processing unit in an artificial neural network?", primaryConcept: "Artificial Neural Networks", learningObjective: "Identify artificial neuron / perceptron.", missionObjective: "Identify AI building block.", hint: "An artificial neuron (perceptron).", feedbackIncorrect: "An artificial neuron processes inputs with weights.", logicPremise: "Basic unit of an artificial neural network?", logicOptions: ["Perceptron / Neuron", "Transistor", "Database row", "CPU core"], logicAnswer: "Perceptron / Neuron" },
      'tech-4-3': { missionTitle: "SUPERVISED LEARNING", story: "Supervised machine learning requires training data with what?", primaryConcept: "Machine Learning", learningObjective: "Identify labeled data requirement.", missionObjective: "Identify training requirement.", hint: "Supervised learning uses labeled target outputs.", feedbackIncorrect: "Supervised learning uses labeled training examples.", logicPremise: "Supervised ML relies on training data with...", logicOptions: ["Labels / Targets", "No labels at all", "Only noise", "Unsorted text only"], logicAnswer: "Labels / Targets" },
      'tech-4-4': { missionTitle: "DOCKER CONTAINERS", story: "What is the main benefit of containerizing applications with Docker?", primaryConcept: "Containerization", learningObjective: "Understand container portability.", missionObjective: "Identify Docker benefit.", hint: "Containers run consistently across any system environment.", feedbackIncorrect: "Containers package code and dependencies for consistent execution.", logicPremise: "Main benefit of Docker containers?", logicOptions: ["Consistent application execution anywhere", "Increases monitor resolution", "Replaces physical CPU", "Deletes old code automatically"], logicAnswer: "Consistent application execution anywhere" },
      'tech-4-5': { missionTitle: "ASYNCHRONOUS PROMISES", story: "In JavaScript, what object handles asynchronous operations that complete later?", primaryConcept: "Asynchronous JS", learningObjective: "Identify JavaScript Promise.", missionObjective: "Identify async object.", hint: "A Promise resolves or rejects asynchronously.", feedbackIncorrect: "A Promise handles future asynchronous completion.", logicPremise: "Object used for async operations in JS?", logicOptions: ["Promise", "String", "Loop", "Math"], logicAnswer: "Promise" },
      'tech-4-6': { missionTitle: "MICROSERVICES ARCHITECTURE", story: "How does a microservices architecture structure an application?", primaryConcept: "Software Architecture", learningObjective: "Contrast microservices with monoliths.", missionObjective: "Identify microservices structure.", hint: "As small independent, decoupled services.", feedbackIncorrect: "Microservices split apps into decoupled independent services.", logicPremise: "Microservices architecture splits applications into...", logicOptions: ["Small independent decoupled services", "One single huge file", "Database tables only", "HTML tags"], logicAnswer: "Small independent decoupled services" },
      'tech-4-7': { missionTitle: "DNS NAME RESOLUTION", story: "What is the primary role of DNS on the Internet?", primaryConcept: "DNS & Protocols", learningObjective: "Identify domain name to IP translation.", missionObjective: "Identify DNS function.", hint: "DNS translates domain names (google.com) to IP addresses.", feedbackIncorrect: "DNS maps domain names to IP addresses.", logicPremise: "What does DNS do?", logicOptions: ["Translates domain names to IP addresses", "Compresses image files", "Powers wireless routers", "Calculates math equations"], logicAnswer: "Translates domain names to IP addresses" },
      'tech-4-8': { missionTitle: "GARBAGE COLLECTION", story: "What does automatic garbage collection do in modern runtime environments?", primaryConcept: "Memory Management", learningObjective: "Identify automatic memory reclamation.", missionObjective: "Identify garbage collector role.", hint: "Frees memory occupied by unused objects.", feedbackIncorrect: "Garbage collection frees unused memory automatically.", logicPremise: "What is the function of garbage collection?", logicOptions: ["Frees unused memory allocated to dead objects", "Deletes junk emails", "Reboots the computer", "Compiles code to C"], logicAnswer: "Frees unused memory allocated to dead objects" },
      'tech-4-9': { missionTitle: "SYSTEM LOAD BALANCING", story: "What does a load balancer do for high-traffic Web applications?", primaryConcept: "System Scalability", learningObjective: "Identify load balancer traffic distribution.", missionObjective: "Identify load balancer function.", hint: "Distributes incoming traffic across multiple servers.", feedbackIncorrect: "Load balancers distribute incoming web traffic across servers.", logicPremise: "What does a load balancer do?", logicOptions: ["Distributes incoming traffic across multiple servers", "Encrypts local hard drives", "Changes monitor brightness", "Backs up database tables"], logicAnswer: "Distributes incoming traffic across multiple servers" },
      'tech-4-10': {
        missionTitle: "STAGE 4 BOSS — CIRCUIT STONE MASTERY",
        story: "The ultimate technology test! Combine full-stack software engineering, AI, scalability, and security to assemble the Circuit Stone!",
        primaryConcept: "Comprehensive Technology Stage 4 Mastery",
        learningObjective: "Master full-stack system architecture and AI.",
        missionObjective: "Complete all 4 phases to assemble the Circuit Stone.",
        hint: "Apply full technical integration.",
        feedbackIncorrect: "Phase failed. Try again!",
        phases: [
          { title: "Big O Check", description: "Time complexity of linear search?", instruction: "Select Big O notation.", logicPremise: "Linear search time complexity?", logicOptions: ["O(1)", "O(N)", "O(N²)", "O(log N)"], logicAnswer: "O(N)" },
          { title: "Container Deploy", description: "Technology that packages app code & dependencies?", instruction: "Select container technology.", logicPremise: "Popular containerization tool?", logicOptions: ["Docker", "Paint", "Excel", "Calculator"], logicAnswer: "Docker" },
          { title: "DNS Lookup", description: "Translates domain names to IP addresses.", instruction: "Select service." },
          { title: "Load Balancer", description: "Distributes incoming web traffic across servers.", instruction: "Select component.", logicPremise: "Distributes traffic across servers?", logicOptions: ["Load Balancer", "Keyboard", "Graphics Card", "Sound Card"], logicAnswer: "Load Balancer" }
        ]
      }
    },
    fragments: { f1: "Technology Fragment 1", f2: "Technology Fragment 2", f3: "Technology Fragment 3", f4: "Technology Fragment 4", acquired: "TECHNOLOGY FRAGMENT ACQUIRED!", desc: "You earned a piece of the Circuit Stone." },
    stone: { title: "THE CIRCUIT STONE", acquired: "CIRCUIT STONE ACQUIRED!", desc: "You have mastered the Technology path and unlocked digital systems." },
    achievements: {
      initiate: { title: "TECHNOLOGY INITIATE", desc: "Completed Stage 1 of the Technology Domain." },
      physics: { title: "PROGRAMMER", desc: "Mastered variables, loops, and control flow." },
      chemistry: { title: "CIRCUIT EXPLORER", desc: "Mastered digital logic, hardware, and networks." },
      biology: { title: "DEBUGGER", desc: "Mastered data structures, security, and databases." },
      master: { title: "TECHNOLOGY MASTER", desc: "Completed all 40 Technology levels and assembled the Circuit Stone!" }
    }
  },

  ta: {
    title: "தொழில்நுட்பப் பிரிவு",
    subtitle: "கணிப்பொறி, சுற்றுகள் & மென்பொருள் பொறியியல்",
    intro: "டிஜிட்டல் தொழில்நுட்பத்தை மாஸ்டர் செய்ய கணினி கட்டமைப்பு, வழிமுறைகள், டிஜிட்டல் தர்க்கம், நெட்வொர்க்கிங் மற்றும் மென்பொருளை ஆராயுங்கள்.",
    stages: {
      'stage-1': { title: "நிலை 1 — கண்டுபிடி", subtitle: "டிஜிட்டல் அடிப்படைகள்", desc: "இருநிலை குறியீடு, தர்க்க வாயில்கள், உள்ளீட்டு/வெளியீட்டு சாதனங்கள், உணரிகளையும் புரிந்துகொள்ளுங்கள்.", concept: "கணினிகள் & இருநிலை அமைப்புகள்", learningObjective: "இருநிலை எண்கள், தர்க்க வாயில்கள், வன்பொருள் கூறுகளை மாஸ்டர் செய்தல்.", reward: "தொழில்நுட்பத் துண்டு 1" },
      'stage-2': { title: "நிலை 2 — புரிந்துகொள்", subtitle: "சுற்றுகள் & கட்டுப்பாட்டு ஓட்டம்", desc: "மாறிகள், நிபந்தனை கிளைகள், மடக்குகள், நினைவக சேமிப்பு மற்றும் நெட்வொர்க் அடிப்படைகளை மாஸ்டர் செய்யுங்கள்.", concept: "நிரலாக்கம் & சுற்று கட்டுப்பாடு", learningObjective: "if-else கூற்றுகள், மடக்குகள், நினைவக மேலாண்மை மற்றும் IP விதிகளைப் பயன்படுத்துதல்.", reward: "தொழில்நுட்பத் துண்டு 2" },
      'stage-3': { title: "நிலை 3 — அமைப்புகள் & தரவு", subtitle: "தரவு கட்டமைப்புகள் & நெட்வொர்க்குகள்", desc: "தரவு கட்டமைப்புகள், குறியாக்கம், API கள், மேகக்கணி கணிப்பொறியியல் மற்றும் தரவுத்தளங்களை ஆராயுங்கள்.", concept: "அமைப்பு கட்டமைப்பு & பாதுகாப்பு", learningObjective: "தரவு கட்டமைப்புகள், குறியாக்க வழிமுறைகள் மற்றும் தரவுத்தள வடிவமைப்பை பகுப்பாய்வு செய்தல்.", reward: "தொழில்நுட்பத் துண்டு 3" },
      'stage-4': { title: "நிலை 4 — மாஸ்டரி", subtitle: "மென்பொருள் பொறியியல் & AI", desc: "சீரான வழிமுறைகள், நரம்பியல் நெட்வொர்க்குகள், இயந்திர கற்றல் மாதிரிகள் மற்றும் பிழைதிருத்தலை மாஸ்டர் செய்யுங்கள்.", concept: "உயர் தொழில்நுட்பம் & முதன்மை மாஸ்டரி", learningObjective: "முழு மென்பொருள் அமைப்பை ஒருங்கிணைத்து சர்க்யூட் கல்லை உருவாக்குதல்.", reward: "தொழில்நுட்பத் துண்டு 4 & சர்க்யூட் கல்" }
    },
    levels: {
      'sci-1-1': { missionTitle: "இருநிலை பரிமாற்றம்", story: "தொடர்பு ரிலே இருநிலை சமிக்ஞைகளை அனுப்புகிறது. இருநிலை 0101 ஐ தசமமாக மாற்றவும்.", primaryConcept: "இருநிலை எண்கள்", learningObjective: "இருநிலை 0101 ஐ தசமமாக மாற்றவும்.", missionObjective: "இருநிலை 0101 ஐ மாற்றவும்.", hint: "இருநிலை 0101 = 4 + 0 + 1 = 5.", feedbackIncorrect: "இருநிலை 0101 என்பது தசமத்தில் 5 ஆகும்.", logicPremise: "இருநிலை 0101 இன் தசம மதிப்பு என்ன?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'tech-1-1': { missionTitle: "இருநிலை பரிமாற்றம்", story: "தொடர்பு ரிலே இருநிலை சமிக்ஞைகளை அனுப்புகிறது. இருநிலை 0101 ஐ தசமமாக மாற்றவும்.", primaryConcept: "இருநிலை எண்கள்", learningObjective: "இருநிலை 0101 ஐ தசமமாக மாற்றவும்.", missionObjective: "இருநிலை 0101 ஐ மாற்றவும்.", hint: "இருநிலை 0101 = 4 + 0 + 1 = 5.", feedbackIncorrect: "இருநிலை 0101 என்பது தசமத்தில் 5 ஆகும்.", logicPremise: "இருநிலை 0101 இன் தசம மதிப்பு என்ன?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'tech-1-2': { missionTitle: "இருநிலை குறியீடு II", story: "சர்வர் இணைப்பை மீட்டெடுக்க இருநிலை 1010 ஐ தசமமாக மாற்றவும்.", primaryConcept: "இருநிலை அமைப்புகள்", learningObjective: "இருநிலை 1010 ஐ தசமமாக மாற்றவும்.", missionObjective: "1010 இன் தசம மதிப்பைக் காணவும்.", hint: "1010 = 8 + 0 + 2 + 0 = 10.", feedbackIncorrect: "இருநிலை 1010 என்பது தசமத்தில் 10 ஆகும்.", logicPremise: "இருநிலை 1010 இன் தசம மதிப்பு என்ன?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'tech-1-3': { missionTitle: "தர்க்க வாயில்", story: "மின் சுற்று துண்டிக்கப்பட்டுள்ளது. ஒரு AND வாயில் எப்போது 1 வெளியீட்டைத் தருகிறது என்பதை அடையாளம் காணவும்.", primaryConcept: "தர்க்க வாயில்கள்", learningObjective: "AND வாயிலின் செயல்பாட்டைப் புரிந்து கொள்ளுங்கள்.", missionObjective: "AND வாயிலின் நிபந்தனையைக் கண்டறியவும்.", hint: "AND என்றால் இரண்டு உள்ளீடுகளும் 1 ஆக இருக்க வேண்டும்.", feedbackIncorrect: "AND வாயிலுக்கு அனைத்து உள்ளீடுகளும் 1 ஆக இருக்க வேண்டும்.", logicPremise: "ஒரு AND வாயில் எப்போது 1 வெளியீட்டைத் தரும்?", logicOptions: ["இரண்டு உள்ளீடுகளும் 1 ஆக இருக்கும்போது", "குறைந்தது ஒரு உள்ளீடு 1 ஆக இருக்கும்போது", "இரண்டு உள்ளீடுகளும் 0 ஆக இருக்கும்போது", "ஒரு உள்ளீடு 0 ஆக இருக்கும்போது"], logicAnswer: "இரண்டு உள்ளீடுகளும் 1 ஆக இருக்கும்போது" },
      'tech-1-4': { missionTitle: "உள்ளீட்டு அறை", story: "கணினி வன்பொருள் சாதனங்களை உள்ளீடு அல்லது வெளியீடாக வகைப்படுத்துங்கள்.", primaryConcept: "உள்ளீட்டு/வெளியீட்டு சாதனங்கள்", learningObjective: "உள்ளீட்டு மற்றும் வெளியீட்டு சாதனங்களை வேறுபடுத்துங்கள்.", missionObjective: "விசைப்பலகையை வகைப்படுத்துங்கள்.", hint: "விசைப்பலகை கணினிக்குள் தகவலை அனுப்புகிறதா?", feedbackIncorrect: "விசைப்பலகை ஒரு உள்ளீட்டு சாதனம் ஆகும்.", logicPremise: "விசைப்பலகை என்பது ஒரு __ சாதனம் ஆகும்.", logicOptions: ["வெளியீடு", "செயலாக்கம்", "உள்ளீடு", "சேமிப்பகம்"], logicAnswer: "உள்ளீடு" },
      'tech-1-5': { missionTitle: "உணரி ஆய்வகம்", story: "தானியங்கி கதவுகளுக்கு சரியான உணரி வகையைத் தேர்ந்தெடுக்கவும்.", primaryConcept: "உணரிகள் & தானியங்கி", learningObjective: "இயக்க உணரியின் பயன்பாட்டைக் கண்டறியவும்.", missionObjective: "தானியங்கி கதவிற்கான உணரையைத் தேர்ந்தெடுக்கவும்.", hint: "மனிதர்களின் இயக்கத்தை இது கண்டறியும்.", feedbackIncorrect: "இயக்க உணரி கதவின் அருகே உள்ள இயக்கத்தைக் கண்டறியும்.", logicPremise: "தானியங்கி கதவுகளை செயல்படுத்தும் உணரி எது?", logicOptions: ["வெப்பநிலை உணரி", "இயக்க உணரி", "ஒளி உணரி", "அழுத்த உணரி"], logicAnswer: "இயக்க உணரி" },
      'tech-1-6': { missionTitle: "நெறிமுறை படிகள்", story: "நிரல் நெறிமுறை படிகளை சரியான தர்க்க வரிசையில் அமைத்திடுங்கள்.", primaryConcept: "நெறிமுறை வடிவமைப்பு", learningObjective: "வரிசைமுறை படிகளை அமைக்கவும்.", missionObjective: "சமையல் நெறிமுறையின் முதல் படியைக் கண்டறியவும்.", hint: "சமைப்பதற்கு முன் பொருட்களைச் சேகரிக்க வேண்டும்.", feedbackIncorrect: "சமைப்பதற்கு முன் பொருட்களைச் சேகரிப்பதே முதல் படி.", logicPremise: "சமையல் நெறிமுறையின் முதல் படி என்ன?", logicOptions: ["உணவை வழங்குவது", "பொருட்களைச் சேகரிப்பது", "சமைப்பது", "பாத்திரங்களைக் கழுவுவது"], logicAnswer: "பொருட்களைச் சேகரிப்பது" },
      'tech-1-7': { missionTitle: "கணினி செயலி (CPU)", story: "கணக்கீடுகளைச் செய்யும் கணினியின் பகுதியைக் கண்டறியவும்.", primaryConcept: "CPU & செயலாக்கம்", learningObjective: "CPU இன் செயல்பாட்டைக் கண்டறியவும்.", missionObjective: "கணினியின் மூளையைக் கண்டறியவும்.", hint: "CPU என்பது மத்திய செயலாக்க அலகு ஆகும்.", feedbackIncorrect: "CPU கணினியின் மூளையாக செயல்படுகிறது.", logicPremise: "கணினியின் 'மூளை' என்று அழைக்கப்படும் பகுதி எது?", logicOptions: ["ஹார்டு டிஸ்க்", "CPU", "திரை (Monitor)", "RAM"], logicAnswer: "CPU" },
      'tech-1-8': { missionTitle: "RAM நினைവகம்", story: "தற்காலிக RAM மற்றும் நிரந்தர சேமிப்பகத்தை வேறுபடுத்துங்கள்.", primaryConcept: "கணினி நினைவகம்", learningObjective: "RAM ஐத் தற்காலிக நினைவகமாக அடையாளம் காணவும்.", missionObjective: "RAM இன் பண்பைக் கண்டறியவும்.", hint: "மின்சாரம் அணைக்கப்பட்டால் RAM தகவல்கள் அழியும்.", feedbackIncorrect: "RAM என்பது தற்காலிக நினைவகம் ஆகும்.", logicPremise: "RAM (Random Access Memory) எதற்குப் பயன்படுகிறது?", logicOptions: ["நிரந்தர கோப்பு சேமிப்பிற்கு", "தற்காலிக வேகமான தரவு அணுகலுக்கு", "படங்களைக் காட்ட", "மின்சாரத்திற்கு"], logicAnswer: "தற்காலிக வேகமான தரவு அணுகலுக்கு" },
      'tech-1-9': { missionTitle: "பிழை வேட்டைக்காரன்", story: "கணினி நிரலில் உள்ள பிழையைக் கண்டறியவும். நிரல் பிழை எவ்வாறு அழைக்கப்படுகிறது?", primaryConcept: "பிழைதிருத்தல் (Debugging)", learningObjective: "நிரல் பிழையை 'பக்' (Bug) என அடையாளம் காணவும்.", missionObjective: "நிரல் பிழைக்கான சொல்லைக் கண்டறியவும்.", hint: "கணினியில் அந்துப்பூச்சி கண்டுபிடிக்கப்பட்ட கதை நினைவிருக்கிறதா?", feedbackIncorrect: "கணினி நிரலில் உள்ள பிழை 'பக்' (Bug) எனப்படும்.", logicPremise: "கணினி நிரலில் உள்ள பிழை எவ்வாறு அழைக்கப்படுகிறது?", logicOptions: ["வைரஸ்", "பக் (Bug)", "அம்சம்", "சிப்"], logicAnswer: "பக் (Bug)" },
      'tech-1-10': {
        missionTitle: "நிலை 1 பாஸ் — டிஜிட்டல் ஸ்பார்க் மாஸ்டரி",
        story: "சர்வரை மீட்டெடுக்க இருநிலை எண்கள், தர்க்க வாயில்கள் மற்றும் பிழைதிருத்தலை மாஸ்டர் செய்யுங்கள்!",
        primaryConcept: "தொழில்நுட்ப நிலை 1 மாஸ்டரி",
        learningObjective: "இருநிலை எண்கள் மற்றும் வன்பொருள் அடிப்படைகளைப் பயன்படுத்துங்கள்.",
        missionObjective: "அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "இருநிலை மற்றும் வன்பொருள் பற்றிய அறிவைப் பயன்படுத்துங்கள்.",
        feedbackIncorrect: "தோல்வி. மீண்டும் முயற்சிக்கவும்!",
        phases: [
          { title: "இருநிலை மாற்றம்", description: "இருநிலை 0110 ஐ தசமமாக மாற்றவும்.", instruction: "தசம மதிப்பைத் தேர்ந்தெடுக்கவும்.", logicPremise: "இருநிலை 0110 இன் தசம மதிப்பு?", logicOptions: ["4", "5", "6", "7"], logicAnswer: "6" },
          { title: "OR வாயில்", description: "குறைந்தது ஒரு உள்ளீடு 1 எனில் OR வாயில் 1 வெளியீட்டைத் தரும்.", instruction: "OR வாயில் விதியைத் தேர்ந்தெடுக்கவும்.", logicPremise: "OR வாயில் எப்போது 1 தரும்?", logicOptions: ["குறைந்தது ஒரு உள்ளீடு 1 எனில்", "இரண்டும் 0 எனில்", "இரண்டும் 1 எனில் மட்டுமே", "எப்போதுமில்லை"], logicAnswer: "குறைந்தது ஒரு உள்ளீடு 1 எனில்" },
          { title: "வன்பொருள் சரிபார்ப்பு", description: "திரை (Monitor) உள்ளீடா அல்லது வெளியீடா?", instruction: "சாதன வகையைத் தேர்ந்தெடுக்கவும்." },
          { title: "பிழைதிருத்தல் நெறிமுறை", description: "நிரல் பிழைகளைச் சரிசெய்வது எவ்வாறு அழைக்கப்படுகிறது?", instruction: "சொல்லைத் தேர்ந்தெடுக்கவும்.", logicPremise: "பிழைகளைச் சரிசெய்வது...", logicOptions: ["தொகுத்தல் (Compiling)", "பிழைதிருத்தல் (Debugging)", "பதிவிறக்கல்", "வடிவமைத்தல்"], logicAnswer: "பிழைதிருத்தல் (Debugging)" }
        ]
      },
      'tech-2-1': { missionTitle: "மாறி சேமிப்பகம்", story: "நிரலில் ஸ்கோரைச் சேமிக்கவும்: score = 100.", primaryConcept: "மாறிகள் (Variables)", learningObjective: "மாறிகளைப் புரிந்து கொள்ளுங்கள்.", missionObjective: "மாறி ஒதுக்கீட்டைக் கண்டறியவும்.", hint: "மாறிகள் மாறும் மதிப்புகளை வைக்கும் கொள்கலன்கள்.", feedbackIncorrect: "score = 100 என்பதில் score என்பது ஒரு மாறி பெயர்.", logicPremise: "niralil: score = 100. இதில் 'score' என்பது என்ன?", logicOptions: ["ஒரு மாறி பெயர் (Variable name)", "நிலையான எண் மட்டுமே", "பிழை", "மடக்கு"], logicAnswer: "ஒரு மாறி பெயர் (Variable name)" },
      'tech-2-2': { missionTitle: "IF-ELSE கிளைத்தல்", story: "மதிப்பிடுக: speed = 60 எனில் if (speed > 50) status = 'FAST'; else status = 'SLOW';", primaryConcept: "நிபந்தனைகள்", learningObjective: "if-else கிளையை மதிப்பிடுங்கள்.", missionObjective: "வெளியீட்டைக் கண்டறியவும்.", hint: "60 > 50 என்பது உண்மை.", feedbackIncorrect: "60 என்பது 50 ஐ விட பெரியது, எனவே 'FAST'.", logicPremise: "speed=60 எனில் if (speed > 50) status='FAST' என்றால் status என்ன?", logicOptions: ["FAST", "SLOW", "ERROR", "NONE"], logicAnswer: "FAST" },
      'tech-2-3': { missionTitle: "FOR மடக்கு எண்ணிக்கை", story: "for (let i = 0; i < 4; i++) எத்தனை முறை இயங்கும்?", primaryConcept: "For மடக்குகள்", learningObjective: "மடக்கு சுழற்சிகளை எண்ணுங்கள்.", missionObjective: "எண்ணிக்கையைக் கண்டறியவும்.", hint: "i = 0, 1, 2, 3 (4 முறை).", feedbackIncorrect: "i 0, 1, 2, 3 என 4 முறை இயங்கும்.", logicPremise: "for (let i=0; i<4; i++) எத்தனை முறை இயங்கும்?", logicOptions: ["3", "4", "5", "முடிவில்லாதது"], logicAnswer: "4" },
      'tech-2-4': { missionTitle: "WHILE மடக்கு நிபந்தனை", story: "ஒரு while மடக்கு அதன் நிபந்தனை __ ஆக இருக்கும் வரை தொடர்ந்து இயங்கும்.", primaryConcept: "While மடக்குகள்", learningObjective: "while மடக்கு நிபந்தனையைப் புரிந்து கொள்ளுங்கள்.", missionObjective: "தேவையை அடையாளம் காணவும்.", hint: "நிபந்தனை உண்மையாக இருக்கும் வரை இயங்கும்.", feedbackIncorrect: "நிபந்தனை உண்மையா (True) ஆக இருக்கும் வரை இயங்கும்.", logicPremise: "while மடக்கு எப்போது இயங்கும்?", logicOptions: ["உண்மை (True)", "தவறு (False)", "வெற்றிடம்", "வரையறுக்கப்படாதது"], logicAnswer: "உண்மை (True)" },
      'tech-2-5': { missionTitle: "செயல்பாடு அழைப்பு", story: "function add(a, b) { return a + b; }. add(3, 4) இன் மதிப்பு என்ன?", primaryConcept: "செயல்பாடுகள் (Functions)", learningObjective: "செயல்பாடுகளை அழைக்கவும்.", missionObjective: "add(3, 4) ஐ மதிப்பிடுங்கள்.", hint: "3 + 4 = 7.", feedbackIncorrect: "add(3, 4) என்பது 3 + 4 = 7 ஐத் தரும்.", logicPremise: "function add(a, b) { return a + b; }. add(3, 4) என்ன தரும்?", logicOptions: ["34", "7", "12", "0"], logicAnswer: "7" },
      'tech-2-6': { missionTitle: "அணி சுட்டெண்", story: "items = ['Shield', 'Laser', 'Sensor'] அணியில், items[0] என்ன?", primaryConcept: "அணிகள் (Arrays)", learningObjective: "0-சுட்டெண் அணுகலைப் புரிந்து கொள்ளுங்கள்.", missionObjective: "items[0] ஐக் கண்டறியவும்.", hint: "அணிகள் 0 இல் தொடங்குகின்றன.", feedbackIncorrect: "சுட்டெண் 0 என்பது முதல் பொருள்: 'Shield'.", logicPremise: "items = ['Shield', 'Laser', 'Sensor']. items[0] என்ன?", logicOptions: ["Shield", "Laser", "Sensor", "1"], logicAnswer: "Shield" },
      'math-2-7': { missionTitle: "பூலியன் தர்க்கம்", story: "மதிப்பிடுக: !(true && false).", primaryConcept: "பூலியன் இயக்கிகள்", learningObjective: "NOT மற்றும் AND இயக்கிகளை மதிப்பிடுங்கள்.", missionObjective: "!(true && false) இன் முடிவைக் காணவும்.", hint: "true && false = false. !false = true.", feedbackIncorrect: "!(true && false) இன் மதிப்பு true ஆகும்.", logicPremise: "!(true && false) இன் மதிப்பு என்ன?", logicOptions: ["true", "false", "undefined", "null"], logicAnswer: "true" },
      'tech-2-7': { missionTitle: "பூலியன் தர்க்கம்", story: "மதிப்பிடுக: !(true && false).", primaryConcept: "பூலியன் இயக்கிகள்", learningObjective: "NOT மற்றும் AND இயக்கிகளை மதிப்பிடுங்கள்.", missionObjective: "!(true && false) இன் முடிவைக் காணவும்.", hint: "true && false = false. !false = true.", feedbackIncorrect: "!(true && false) இன் மதிப்பு true ஆகும்.", logicPremise: "!(true && false) இன் மதிப்பு என்ன?", logicOptions: ["true", "false", "undefined", "null"], logicAnswer: "true" },
      'tech-2-8': { missionTitle: "IP முகவரி", story: "கணினி நெட்வொர்க்கில் IP முகவரியின் நோக்கம் என்ன?", primaryConcept: "நெட்வொர்க்கிங் & IP", learningObjective: "IP முகவரியை அடையாளம் காணவும்.", missionObjective: "IP நோக்கத்தைக் கண்டறியவும்.", hint: "IP முகவரி சாதனங்களைக் கண்டறியும்.", feedbackIncorrect: "IP முகவரி நெட்வொர்க்கில் ஒரு சாதனத்தை தனித்துவமாகக் குறிக்கும்.", logicPremise: "IP முகவரி எதற்குப் பயன்படுகிறது?", logicOptions: ["நெட்வொர்க்கில் சாதனத்தை தனித்துவமாகக் குறிக்க", "கோப்புகளைச் சேமிக்க", "செயலி வேகத்தை அதிகரிக்க", "குளிரூட்ட"], logicAnswer: "நெட்வொர்க்கில் சாதனத்தை தனித்துவமாகக் குறிக்க" },
      'tech-2-9': { missionTitle: "HTTP நெறிமுறை", story: "இணைய தொழில்நுட்பத்தில் HTTP என்பதன் விரிவாக்கம் என்ன?", primaryConcept: "இணைய நெறிமுறைகள்", learningObjective: "HTTP விரிவாக்கத்தைக் கண்டறியவும்.", missionObjective: "விரிவாக்கத்தைக் கண்டறியவும்.", hint: "Hypertext Transfer Protocol.", feedbackIncorrect: "HTTP = Hypertext Transfer Protocol.", logicPremise: "HTTP என்பதன் விரிவாக்கம் என்ன?", logicOptions: ["Hypertext Transfer Protocol", "High Tech Power", "Home Terminal Transfer", "Hyper Text Processing"], logicAnswer: "Hypertext Transfer Protocol" },
      'tech-2-10': {
        missionTitle: "நிலை 2 பாஸ் — கட்டுப்பாட்டு ஓட்டம் & நெட்வொர்க் மாஸ்டரி",
        story: "மாறிகள், மடக்குகள், நிபந்தனைகள் மற்றும் நெட்வொர்க்குகளை மாஸ்டர் செய்யுங்கள்!",
        primaryConcept: "தொழில்நுட்ப நிலை 2 மாஸ்டரி",
        learningObjective: "மடக்குகள், நிபந்தனைகள் மற்றும் நெட்வொர்க்கிங்கைப் பயன்படுத்துங்கள்.",
        missionObjective: "அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "மடக்குகள் மற்றும் பூலியன் தர்க்கத்தை நினைவுகூருங்கள்.",
        feedbackIncorrect: "தோல்வி. மீண்டும் முயற்சிக்கவும்!",
        phases: [
          { title: "நிபந்தனை சரிபார்ப்பு", description: "if (10 > 5) சரியா தவறா?", instruction: "முடிவைத் தேர்ந்தெடுக்கவும்.", logicPremise: "10 > 5 என்பது சரியா தவறா?", logicOptions: ["true", "false"], logicAnswer: "true" },
          { title: "அணி தேடல்", description: "nums = [10, 20, 30]. nums[1] என்ன?", instruction: "மதிப்பைக் காணவும்.", logicPremise: "nums[1] இன் மதிப்பு என்ன?", logicOptions: ["10", "20", "30", "1"], logicAnswer: "20" },
          { title: "மடக்கு சுழற்சி", description: "for (i=0; i<3; i++) எத்தனை முறை இயங்கும்?", instruction: "எண்ணிக்கையைக் காணவும்." },
          { title: "IP முகவரி", description: "சரியான IPv4 முகவரி வடிவம் எது?", instruction: "சரியான IP ஐத் தேர்ந்தெடுக்கவும்.", logicPremise: "சரியான IPv4 முகவரி எது?", logicOptions: ["192.168.1.1", "999.999.1", "http://server", "abc.def"], logicAnswer: "192.168.1.1" }
        ]
      },
      'tech-3-1': { missionTitle: "ஸ்டாக் தரவு கட்டமைப்பு", story: "ஒரு ஸ்டாக் LIFO (கடைசியாக வந்தது முதலில் வெளியே) விதியைப் பின்பற்றுகிறது. எந்தப் பொருள் முதலில் நீக்கப்படும்?", primaryConcept: "ஸ்டாக் (Stack)", learningObjective: "LIFO விதியைப் புரிந்து கொள்ளுங்கள்.", missionObjective: "நீக்கப்படும் பொருளைக் கண்டறியவும்.", hint: "கடைசியாகச் சேர்க்கப்பட்ட பொருள் முதலில் நீக்கப்படும்.", feedbackIncorrect: "கடைசியாகச் சேர்க்கப்பட்ட பொருளே முதலில் நீக்கப்படும்.", logicPremise: "LIFO ஸ்டாக்கில் எந்தப் பொருள் முதலில் நீக்கப்படும்?", logicOptions: ["கடைசியாகச் சேர்க்கப்பட்ட பொருள்", "முதலில் சேர்க்கப்பட்ட பொருள்", "ரேண்டம் பொருள்", "நடுவில் உள்ள பொருள்"], logicAnswer: "கடைசியாகச் சேர்க்கப்பட்ட பொருள்" },
      'tech-3-2': { missionTitle: "ക്യൂ தரவு கட்டமைப்பு", story: "ஒரு ക്യൂ FIFO (முதலில் வந்தது முதலில் வெளியே) விதியைப் பின்பற்றுகிறது.", primaryConcept: "ക്യூ (Queue)", learningObjective: "FIFO விதியைப் புரிந்து கொள்ளுங்கள்.", missionObjective: "FIFO செயல்பாட்டைக் கண்டறியவும்.", hint: "வரிசையில் முதலில் இருப்பவருக்கு முதலில் சேவை அளிக்கப்படும்.", feedbackIncorrect: "முதலில் சேர்க்கப்பட்ட பொருளே முதலில் செயலாக்கப்படும்.", logicPremise: "FIFO ക്യൂவில் எந்தப் பொருள் முதலில் செயலாக்கப்படும்?", logicOptions: ["முதலில் சேர்க்கப்பட்ட பொருள்", "கடைசியாகச் சேர்க்கப்பட்ட பொருள்", "பெரிய பொருள்", "புதிய பொருள்"], logicAnswer: "முதலில் சேர்க்கப்பட்ட பொருள்" },
      'tech-3-3': { missionTitle: "குறியாக்க ஹேஷிங்", story: "கடவுச்சொற்களைச் சேமிக்க அமைப்புகள் ஏன் ஹேஷிங்கைப் பயன்படுத்துகின்றன?", primaryConcept: "சைபர் பாதுகாப்பு & ஹேஷிங்", learningObjective: "ஹேஷிங் பாதுகாப்பைப் புரிந்து கொள்ளுங்கள்.", missionObjective: "ஹேஷிங் நோக்கத்தைக் கண்டறியவும்.", hint: "ஹேஷ்களை எளிதில் தலைகீழாக மாற்ற முடியாது.", feedbackIncorrect: "தரவு கசிந்தால் மூல கடவுச்சொல் வெளிப்படாமல் இருக்க ஹேஷிங் பயன்படுகிறது.", logicPremise: "கடவுச்சொற்கள் ஏன் ஹேஷ் செய்யப்படுகின்றன?", logicOptions: ["மூல கடவுச்சொற்களைப் பாதுகாக்க", "கடவுச்சொற்களைச் சிறிதாக்க", "இணைய வேகத்தை அதிகரிக்க", "மின்னஞ்சல் அனுப்ப"], logicAnswer: "மூல கடவுச்சொற்களைப் பாதுகாக்க" },
      'tech-3-4': { missionTitle: "SQL தரவுத்தள வினவல்", story: "தரவுத்தள அட்டவணையில் இருந்து தரவைப் பெற எந்த SQL கட்டளை பயன்படுகிறது?", primaryConcept: "தரவுத்தளங்கள் & SQL", learningObjective: "SQL SELECT கூற்றை அடையாளம் காணவும்.", missionObjective: "கட்டளையைக் கண்டறியவும்.", hint: "SELECT தரவைப் பெறப் பயன்படுகிறது.", feedbackIncorrect: "தரவைப் பெற SELECT கட்டளை பயன்படுகிறது.", logicPremise: "தரவைப் பெற பயன்படும் SQL கட்டளை எது?", logicOptions: ["SELECT", "INSERT", "DELETE", "UPDATE"], logicAnswer: "SELECT" },
      'tech-3-5': { missionTitle: "API இணைப்புகள்", story: "மென்பொருள் ஒருங்கிணைப்பில் API என்பதன் விரிவாக்கம் என்ன?", primaryConcept: "API கள்", learningObjective: "API விரிவாக்கத்தைக் கண்டறியவும்.", missionObjective: "சொல்லைக் கண்டறியவும்.", hint: "Application Programming Interface.", feedbackIncorrect: "API = Application Programming Interface.", logicPremise: "API என்பதன் விரிவாக்கம் என்ன?", logicOptions: ["Application Programming Interface", "Automated Program Integration", "Advanced Protocol Internet", "App Private Identification"], logicAnswer: "Application Programming Interface" },
      'tech-3-6': { missionTitle: "மேகக்கணி கணிப்பொறியியல்", story: "மேகக்கணி கணிப்பொறியியலின் (Cloud Computing) முக்கிய நன்மை என்ன?", primaryConcept: "மேகக்கணி கட்டமைப்பு", learningObjective: "மேகக்கணி நன்மைகளைக் கண்டறியவும்.", missionObjective: "நன்மையைக் கண்டறியவும்.", hint: "தேவைக்கேற்ப வளங்களை உயர்த்த முடியும்.", feedbackIncorrect: "இணையம் வழியாக தேவைக்கேற்ப வளங்களை வழங்குவது இதன் முக்கிய நன்மையாகும்.", logicPremise: "மேகக்கணியின் முக்கிய நன்மை என்ன?", logicOptions: ["இணையம் வழியாக தேவைக்கேற்ப வளங்களை அளவிடுவது", "இணையம் தேவையில்லை", "இலவச வன்பொருள்", "பூஜ்ய மின்சாரம்"], logicAnswer: "இணையம் வழியாக தேவைக்கேற்ப வளங்களை அளவிடுவது" },
      'tech-3-7': { missionTitle: "இருநிலைத் தேடல் நெறிமுறை", story: "இருநிலைத் தேடலுக்கு (Binary Search) தரவு எவ்வாறு இருக்க வேண்டும்?", primaryConcept: "இருநிலைத் தேடல்", learningObjective: "வரிசைப்படுத்தப்பட்ட தரவுத் தேவையை அடையாளம் காணவும்.", missionObjective: "தேவையைக் கண்டறியவும்.", hint: "தரவு வரிசைப்படுத்தப்பட்டிருக்க வேண்டும்.", feedbackIncorrect: "இருநிலைத் தேடலுக்கு தரவு வரிசைப்படுத்தப்பட்டிருக்க வேண்டும்.", logicPremise: "இருநிலைத் தேடலுக்கு தரவு எவ்வாறு இருக்க வேண்டும்?", logicOptions: ["வரிசைப்படுத்தப்பட்டிருக்க வேண்டும் (Sorted)", "வரிசைப்படுத்தப்படாதது", "ரேண்டம்", "காலியானது"], logicAnswer: "வரிசைப்படுத்தப்பட்டிருக்க வேண்டும் (Sorted)" },
      'math-3-8': { missionTitle: "ஃபயர்வால் பாதுகாப்பு", story: "நெட்வொர்க் ஃபயர்வாலின் (Firewall) முக்கிய செயல்பாடு என்ன?", primaryConcept: "ஃபயர்வால் & பாதுகாப்பு", learningObjective: "ஃபயர்வால் செயல்பாட்டைக் கண்டறியவும்.", missionObjective: "நோக்கத்தைக் கண்டறியவும்.", hint: "அனுமதிக்கப்படாத நெட்வொர்க் போக்குவரத்தைத் தடுக்கும்.", feedbackIncorrect: "ஃபயர்வால் அனுமதிக்கப்படாத போக்குவரத்தைத் தடுக்கும்.", logicPremise: "ஃபயர்வால் என்ன செய்கிறது?", logicOptions: ["அனுமதிக்கப்படாத நெட்வொர்க் அணுகலைத் தடுக்கிறது", "சர்வர்களைச் சுத்தம் செய்கிறது", "மின்சாரம் தயாரிக்கிறது", "தரவைச் சேமிக்கிறது"], logicAnswer: "அனுமதிக்கப்படாத நெட்வொர்க் அணுகலைத் தடுக்கிறது" },
      'tech-3-8': { missionTitle: "ஃபயர்வால் பாதுகாப்பு", story: "நெட்வொர்க் ஃபயர்வாலின் (Firewall) முக்கிய செயல்பாடு என்ன?", primaryConcept: "ஃபயர்வால் & பாதுகாப்பு", learningObjective: "ஃபயர்வால் செயல்பாட்டைக் கண்டறியவும்.", missionObjective: "நோக்கத்தைக் கண்டறியவும்.", hint: "அனுமதிக்கப்படாத நெட்வொர்க் போக்குவரத்தைத் தடுக்கும்.", feedbackIncorrect: "ஃபயர்வால் அனுமதிக்கப்படாத போக்குவரத்தைத் தடுக்கும்.", logicPremise: "ஃபயர்வால் என்ன செய்கிறது?", logicOptions: ["அனுமதிக்கப்படாத நெட்வொர்க் அணுகலைத் தடுக்கிறது", "சர்வர்களைச் சுத்தம் செய்கிறது", "மின்சாரம் தயாரிக்கிறது", "தரவைச் சேமிக்கிறது"], logicAnswer: "அனுமதிக்கப்படாத நெட்வொர்க் அணுகலைத் தடுக்கிறது" },
      'tech-3-9': { missionTitle: "பதிப்புக் கட்டுப்பாடு (GIT)", story: "Git இல் மாற்றங்களைச் சேமிக்க எந்தக் கட்டளை பயன்படுகிறது?", primaryConcept: "பதிப்புக் கட்டுப்பாடு (Git)", learningObjective: "Git commit கட்டளையைக் கண்டறியவும்.", missionObjective: "கட்டளையைக் கண்டறியவும்.", hint: "git commit மாற்றங்களை உள்ளூர் களஞ்சியத்தில் சேமிக்கும்.", feedbackIncorrect: "git commit மாற்றங்களின் நகலைச் சேமிக்கும்.", logicPremise: "மாற்றங்களைச் சேமிக்கும் Git கட்டளை எது?", logicOptions: ["git commit", "git push", "git clone", "git init"], logicAnswer: "git commit" },
      'tech-3-10': {
        missionTitle: "நிலை 3 பாஸ் — அமைப்புகள் & கட்டமைப்பு மாஸ்டரி",
        story: "தரவுத்தளத்தைப் பாதுகாக்க தரவு கட்டமைப்புகள், SQL மற்றும் Git ஐ மாஸ்டர் செய்யுங்கள்!",
        primaryConcept: "தொழில்நுட்ப நிலை 3 மாஸ்டரி",
        learningObjective: "தரவு கட்டமைப்புகள், SQL மற்றும் Git ஐப் பயன்படுத்துங்கள்.",
        missionObjective: "அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "ஸ்டாக், கிளியூ மற்றும் SQL ஐ நினைவில் கொள்க.",
        feedbackIncorrect: "தோல்வி. மீண்டும் முயற்சிக்கவும்!",
        phases: [
          { title: "ஸ்டாக் வரிசை", description: "ஸ்டாக் LIFO வா அல்லது FIFO வா?", instruction: "வரிசையைத் தேர்ந்தெடுக்கவும்.", logicPremise: "ஸ்டாக் LIFO வா FIFO வா?", logicOptions: ["LIFO", "FIFO"], logicAnswer: "LIFO" },
          { title: "SQL கட்டளை", description: "SQL அட்டவணையில் புதிய வரிசையைச் சேர்க்கும் கட்டளை?", instruction: "SQL கட்டளையைத் தேர்ந்தெடுக்கவும்.", logicPremise: "புதிய வரிசையைச் சேர்க்கும் கட்டளை?", logicOptions: ["INSERT", "SELECT", "DROP", "ALTER"], logicAnswer: "INSERT" },
          { title: "பாதுகாப்பு சரிபார்ப்பு", description: "ஹேஷ் செய்யப்பட்ட கடவுச்சொற்களைப் பாதுகாப்பது எது?", instruction: "பண்பைத் தேர்ந்தெடுக்கவும்." },
          { title: "Git கட்டளை", description: "தொலைநிலைக் களஞ்சியத்தை நகலெடுக்கும் கட்டளை?", instruction: "Git கட்டளையைத் தேர்ந்தெடுக்கவும்.", logicPremise: "தொலைநிலைக் களஞ்சியத்தை நகலெடுக்கும் கட்டளை?", logicOptions: ["git clone", "git status", "git branch", "git merge"], logicAnswer: "git clone" }
        ]
      },
      'tech-4-1': { missionTitle: "பிக் ஓ குறியீடு (BIG O)", story: "அணி சுட்டெண் arr[i] மூலம் தரவைத் தேடுவதற்கான நேரச் சிக்கல் என்ன?", primaryConcept: "நெறிமுறைச் சிக்கல்", learningObjective: "O(1) நேரச் சிக்கலைக் கண்டறியவும்.", missionObjective: "நேரச் சிக்கலைக் கண்டறியவும்.", hint: "நேரடி சுட்டெண் அணுகல் O(1) ஆகும்.", feedbackIncorrect: "நேரடி அணுகல் O(1) நிலையான நேரம் ஆகும்.", logicPremise: "arr[i] நேரடி அணுகலின் நேரச் சிக்கல் என்ன?", logicOptions: ["O(1)", "O(N)", "O(N²)", "O(log N)"], logicAnswer: "O(1)" },
      'tech-4-2': { missionTitle: "செயற்கை நரம்பியல் நெட்வொர்க்", story: "செயற்கை நரம்பியல் நெட்வொர்க்கின் அடிப்படை அலகு என்ன?", primaryConcept: "செயற்கை நரம்பியல் நெட்வொர்க்குகள்", learningObjective: "செயற்கை நரம்பைக் கண்டறியவும்.", missionObjective: "அடிப்படை அலகைக் கண்டறியவும்.", hint: "செயற்கை நரம்பு (Perceptron / Neuron).", feedbackIncorrect: "செயற்கை நரம்பு (Neuron) அடிப்படை அலகு ஆகும்.", logicPremise: "நரம்பியல் நெட்வொர்க்கின் அடிப்படை அலகு என்ன?", logicOptions: ["Perceptron / Neuron", "Transistor", "தரவுத்தள வரிசை", "CPU கோர்"], logicAnswer: "Perceptron / Neuron" },
      'tech-4-3': { missionTitle: "மேற்பார்வையிடப்பட்ட கற்றல்", story: "மேற்பார்வையிடப்பட்ட இயந்திர கற்றலுக்கு (Supervised Learning) எத்தகைய தரவு தேவை?", primaryConcept: "இயந்திர கற்றல் (ML)", learningObjective: "லޭபில் செய்யப்பட்ட தரவுத் தேவையை அடையாளம் காணவும்.", missionObjective: "தேவையைக் கண்டறியவும்.", hint: "லޭபில் செய்யப்பட்ட (Labeled) தரவு தேவை.", feedbackIncorrect: "மேற்பார்வையிடப்பட்ட கற்றலுக்கு லޭபில் செய்யப்பட்ட தரவு தேவை.", logicPremise: "Supervised ML க்கு எத்தகைய தரவு தேவை?", logicOptions: ["லޭபில் செய்யப்பட்ட தரவு (Labels)", "லޭபில் இல்லாத தரவு", "வெறும் சத்தம்", "வரிசைப்படுத்தப்படாத உரை"], logicAnswer: "லޭபில் செய்யப்பட்ட தரவு (Labels)" },
      'tech-4-4': { missionTitle: "டொக்கர் கன்டெய்னர்கள்", story: "டொக்கர் (Docker) மூலம் பயன்பாடுகளை கன்டெய்னராக்குவதன் முக்கிய நன்மை என்ன?", primaryConcept: "கன்டெய்னராக்கம் (Docker)", learningObjective: "டொக்கர் நன்மைகளைப் புரிந்து கொள்ளுங்கள்.", missionObjective: "நன்மையைக் கண்டறியவும்.", hint: "எந்த அமைப்பிலும் சீராக இயங்கும்.", feedbackIncorrect: "அனைத்து அமைப்புகளிலும் சீராக இயங்குவது இதன் நன்மை ஆகும்.", logicPremise: "Docker கன்டெய்னர்களின் முக்கிய நன்மை என்ன?", logicOptions: ["எந்த அமைப்பிலும் சீரான பயன்பாட்டு இயக்கம்", "திரை தெளிவுத்திறனை அதிகரிக்கும்", "CPU ஐ மாற்றும்", "பழைய குறியீட்டை அழிக்கும்"], logicAnswer: "எந்த அமைப்பிலும் சீரான பயன்பாட்டு இயக்கம்" },
      'tech-4-5': { missionTitle: "அசின்க்ரோனஸ் வாக்குறுதிகள்", story: "JavaScript இல் பின்னர் முடிவடையும் அசின்க்ரோனஸ் செயல்பாடுகளைக் കൈകാര്യം செய்யும் பொருள் எது?", primaryConcept: "Async JavaScript", learningObjective: "JavaScript Promise ஐக் கண்டறியவும்.", missionObjective: "பொருளைக் கண்டறியவும்.", hint: "Promise பொருள் async செயல்பாடுகளைக் கையாளும்.", feedbackIncorrect: "Promise பொருள் async செயல்பாடுகளைக் கையாளும்.", logicPremise: "JS இல் async செயல்பாடுகளுக்குப் பயன்படும் பொருள் எது?", logicOptions: ["Promise", "String", "Loop", "Math"], logicAnswer: "Promise" },
      'tech-4-6': { missionTitle: "மைக்ரோசர்வீசஸ் கட்டமைப்பு", story: "மைக்ரோசர்வீசஸ் கட்டமைப்பு பயன்பாட்டை எவ்வாறு பிரிக்கிறது?", primaryConcept: "மென்பொருள் கட்டமைப்பு", learningObjective: "மைக்ரோசர்வீசஸ் அமைப்பைப் புரிந்து கொள்ளுங்கள்.", missionObjective: "அமைப்பைக் கண்டறியவும்.", hint: "சிறிய சுதந்திரமான சேவைகளாகப் பிரிக்கிறது.", feedbackIncorrect: "பயன்பாட்டைச் சிறிய சுதந்திரமான சேவைகளாகப் பிரிக்கிறது.", logicPremise: "Microservices கட்டமைப்பு பயன்பாட்டை எவ்வாறு பிரிக்கிறது?", logicOptions: ["சிறிய சுதந்திரமான சேவைகளாக (Independent services)", "ஒரே பெரிய கோப்பாக", "தரவுத்தள அட்டவணைகளாக மட்டும்", "HTML குறிச்சொற்களாக"], logicAnswer: "சிறிய சுதந்திரமான சேவைகளாக (Independent services)" },
      'tech-4-7': { missionTitle: "DNS பெயர் தீர்வு", story: "இணையத்தில் DNS இன் முக்கிய பங்கு என்ன?", primaryConcept: "DNS நெறிமுறை", learningObjective: "டொமைன் பெயரை IP ஆக மாற்றுவதை அடையாளம் காணவும்.", missionObjective: "பங்கைக் கண்டறியவும்.", hint: "டொமைன் பெயர்களை IP முகவரிகளாக மாற்றும்.", feedbackIncorrect: "DNS டொமைன் பெயர்களை IP முகவரிகளாக மாற்றுகிறது.", logicPremise: "DNS என்ன செய்கிறது?", logicOptions: ["டொமைன் பெயர்களை IP முகவரிகளாக மாற்றுகிறது", "படங்களைச் சுருக்கும்", "ரൂട്ടர்களை இயக்கும்", "கணிதக் கணக்கீடுகளைச் செய்யும்"], logicAnswer: "டொமைன் பெயர்களை IP முகவரிகளாக மாற்றுகிறது" },
      'tech-4-8': { missionTitle: "குப்பை சேகரிப்பு (Garbage Collection)", story: "நவீன நிரலாக்க சூழல்களில் குப்பை சேகரிப்பு (Garbage Collection) என்ன செய்கிறது?", primaryConcept: "நினைவக மேலாண்மை", learningObjective: "தானியங்கி நினைவக விடுவிப்பைக் கண்டறியவும்.", missionObjective: "பங்கைக் கண்டறியவும்.", hint: "பயன்படுத்தப்படாத நினைவகத்தைத் தானாக விடுவிக்கும்.", feedbackIncorrect: "பயன்படுத்தப்படாத நினைவகத்தைத் தானாக விடுவிக்கும்.", logicPremise: "Garbage Collection இன் செயல்பாடு என்ன?", logicOptions: ["பயன்படுத்தப்படாத நினைவகத்தை விடுவிப்பது", "தேவையற்ற மின்னஞ்சல்களை அழிப்பது", "கணினியை மீண்டும் இயக்குவது", "குறியீட்டை C ஆக மாற்றுவது"], logicAnswer: "பயன்படுத்தப்படாத நினைவகத்தை விடுவிப்பது" },
      'tech-4-9': { missionTitle: "சுமை சமநிலைப்படுத்தி (Load Balancer)", story: "அதிக போக்குவரத்து கொண்ட இணைய பயன்பாடுகளுக்கு லோட் பேலன்சர் (Load Balancer) என்ன செய்கிறது?", primaryConcept: "அமைப்பு அளவிடுதல்", learningObjective: "போக்குவரத்துப் பகிர்வைக் கண்டறியவும்.", missionObjective: "செயல்பாட்டைக் கண்டறியவும்.", hint: "வரும் போக்குவரத்தைப் பல சர்வர்களுக்குப் பகிர்ந்து அளிக்கும்.", feedbackIncorrect: "வரும் போக்குவரத்தைப் பல சர்வர்களுக்குப் பகிர்ந்து அளிக்கும்.", logicPremise: "Load Balancer என்ன செய்கிறது?", logicOptions: ["வரும் போக்குவரத்தைப் பல சர்வர்களுக்குப் பகிர்கிறது", "ஹார்டு டிஸ்க்கைக் குறியாக்கும்", "திரை வெளிச்சத்தை மாற்றும்", "தரவை நகலெடுக்கும்"], logicAnswer: "வரும் போக்குவரத்தைப் பல சர்வர்களுக்குப் பகிர்கிறது" },
      'tech-4-10': {
        missionTitle: "நிலை 4 பாஸ் — சர்க்யூட் கல் மாஸ்டரி",
        story: "இறுதி தொழில்நுட்பச் சோதனை! மென்பொருள் பொறியியல், AI மற்றும் பாதுகாப்பை மாஸ்டர் செய்து சர்க்யூட் கல்லை இணைக்கவும்!",
        primaryConcept: "தொழில்நுட்ப நிலை 4 முதன்மை மாஸ்டரி",
        learningObjective: "முழு தொழில்நுட்ப அமைப்பையும் மாஸ்டர் செய்யுங்கள்.",
        missionObjective: "அனைத்து 4 கட்டங்களையும் முடிக்கவும்.",
        hint: "முழுத் தொழில்நுட்ப அறிவையும் பயன்படுத்துங்கள்.",
        feedbackIncorrect: "தோல்வி. மீண்டும் முயற்சிக்கவும்!",
        phases: [
          { title: "பிக் ஓ சரிபார்ப்பு", description: "நேரியல் தேடலின் நேரச் சிக்கல்?", instruction: "பிக் ஓ குறியீட்டைத் தேர்ந்தெடுக்கவும்.", logicPremise: "நேரியல் தேடலின் நேரச் சிக்கல்?", logicOptions: ["O(1)", "O(N)", "O(N²)", "O(log N)"], logicAnswer: "O(N)" },
          { title: "கன்டெய்னர் உருவாக்கம்", description: "பயன்பாட்டுக் குறியீட்டைப் பொதியிடும் தொழில்நுட்பம்?", instruction: "தொழில்நுட்பத்தைத் தேர்ந்தெடுக்கவும்.", logicPremise: "பிரபலமான கன்டெய்னர் கருவி எது?", logicOptions: ["Docker", "Paint", "Excel", "Calculator"], logicAnswer: "Docker" },
          { title: "DNS தேடல்", description: "டொமைன் பெயர்களை IP முகவரிகளாக மாற்றும் சேவை.", instruction: "சேவையைத் தேர்ந்தெடுக்கவும்." },
          { title: "சுமை சமநிலை", description: "வரும் போக்குவரத்தைப் பல சர்வர்களுக்குப் பகிர்கிறது.", instruction: "கூறைத் தேர்ந்தெடுக்கவும்.", logicPremise: "போக்குவரத்தைப் பல சர்வர்களுக்குப் பகிர்வது எது?", logicOptions: ["Load Balancer", "Keyboard", "Graphics Card", "Sound Card"], logicAnswer: "Load Balancer" }
        ]
      }
    },
    fragments: { f1: "தொழில்நுட்பத் துண்டு 1", f2: "தொழில்நுட்பத் துண்டு 2", f3: "தொழில்நுட்பத் துண்டு 3", f4: "தொழில்நுட்பத் துண்டு 4", acquired: "தொழில்நுட்பக் கல் துண்டு பெறப்பட்டது!", desc: "சர்க்யூட் கல்லின் ஒரு துண்டை பெற்றுள்ளாய்." },
    stone: { title: "சர்க்யூட் கல்", acquired: "சர்க்யூட் கல் பெறப்பட்டது!", desc: "நீ தொழில்நுட்பப் பாதையை மாஸ்டர் செய்து டிஜிட்டல் அமைப்புகளைத் திறந்துவிட்டாய்." },
    achievements: {
      initiate: { title: "தொழில்நுட்பத் தொடக்க வீரர்", desc: "தொழில்நுட்பப் பிரிவின் நிலை 1 ஐ முடித்தார்." },
      physics: { title: "நிரலர் (Programmer)", desc: "மாறிகள், மடக்குகள் மற்றும் கட்டுப்பாட்டு ஓட்டத்தை மாஸ்டர் செய்தார்." },
      chemistry: { title: "சுற்று ஆய்வாளர்", desc: "டிஜிட்டல் தர்க்கம், வன்பொருள் மற்றும் நெட்வொர்க்குகளை மாஸ்டர் செய்தார்." },
      biology: { title: "பிழைதிருத்துபவர் (Debugger)", desc: "தரவு கட்டமைப்புகள், பாதுகாப்பு மற்றும் தரவுத்தளங்களை மாஸ்டர் செய்தார்." },
      master: { title: "தொழில்நுட்ப மாஸ்டர்", desc: "அனைத்து 40 தொழில்நுட்ப நிலைகளையும் முடித்து சர்க்யூட் கல்லை இணைத்தார்!" }
    }
  },

  hi: {
    title: "प्रौद्योगिकी क्षेत्र",
    subtitle: "कंप्यूटिंग, सर्किट और सॉफ्टवेयर इंजीनियरिंग",
    intro: "डिजिटल तकनीक में महारत हासिल करने के लिए कंप्यूटर आर्किटेक्चर, एल्गोरिदम, डिजिटल लॉजिक, नेटवर्किंग और सॉफ्टवेयर का अन्वेषण करें।",
    stages: {
      'stage-1': { title: "स्टेज 1 — खोज", subtitle: "डिजिटल आधार", desc: "बाइनरी कोड, लॉजिक गेट्स, इनपुट/आउटपुट डिवाइस, सेंसर और बुनियादी एल्गोरिदम को समझें।", concept: "कंप्यूटर और बाइनरी प्रणालियां", learningObjective: "बाइनरी संख्याओं, लॉजिक गेट्स, हार्डवेयर घटकों में महारत हासिल करें।", reward: "प्रौद्योगिकी टुकड़ा 1" },
      'stage-2': { title: "स्टेज 2 — समझें", subtitle: "सर्किट और नियंत्रण प्रवाह", desc: "चर, सशर्त शाखन, लूप, मेमोरी स्टोरेज और नेटवर्क सिद्धांतों में महारत हासिल करें।", concept: "प्रोग्रामिंग और सर्किट नियंत्रण", learningObjective: "if-else कथनों, लूप्स, मेमोरी प्रबंधन और IP प्रोटोकॉल को लागू करें।", reward: "प्रौद्योगिकी टुकड़ा 2" },
      'stage-3': { title: "स्टेज 3 — प्रणालियां और डेटा", subtitle: "डेटा संरचनाएं और नेटवर्क", desc: "डेटा संरचनाओं, एन्क्रिप्शन, एपीआई, क्लाउड कंप्यूटिंग और डेटाबेस का अन्वेषण करें।", concept: "सिस्टम आर्किटेक्चर और सुरक्षा", learningObjective: "डेटा संरचनाओं, एन्क्रिप्शन एल्गोरिदम और डेटाबेस डिज़ाइन का विश्लेषण करें।", reward: "प्रौद्योगिकी टुकड़ा 3" },
      'stage-4': { title: "स्टेज 4 — महारत", subtitle: "सॉफ्टवेयर इंजीनियरिंग और AI", desc: "जटिल एल्गोरिदम, न्यूरल नेटवर्क, मशीन लर्निंग मॉडल और सिस्टम डिबगिंग में महारत हासिल करें।", concept: "उन्नत प्रौद्योगिकी और कोर महारत", learningObjective: "पूर्ण-स्टैक सिस्टम आर्किटेक्चर को एकीकृत करें और सर्किट पत्थर का निर्माण करें।", reward: "प्रौद्योगिकी टुकड़ा 4 और सर्किट पत्थर" }
    },
    levels: {
      'tech-1-1': { missionTitle: "बाइनरी ट्रांसमिशन", story: "संचार रिले बाइनरी सिग्नल भेज रहा है। बाइनरी 0101 को दशमलव में बदलें।", primaryConcept: "बाइनरी संख्याएं", learningObjective: "बाइनरी 0101 को दशमलव में बदलें।", missionObjective: "बाइनरी 0101 को डिकोड करें।", hint: "बाइनरी 0101 = 4 + 0 + 1 = 5.", feedbackIncorrect: "बाइनरी 0101 दशमलव में 5 के बराबर है।", logicPremise: "बाइनरी 0101 को दशमलव में बदलें:", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'tech-1-2': { missionTitle: "बाइनरी कोड II", story: "सर्वर कनेक्शन को पुनर्स्थापित करने के लिए बाइनरी 1010 को डिकोड करें।", primaryConcept: "बाइनरी प्रणालियां", learningObjective: "बाइनरी 1010 को दशमलव में बदलें।", missionObjective: "1010 का दशमलव मान ज्ञात करें।", hint: "1010 = 8 + 0 + 2 + 0 = 10.", feedbackIncorrect: "बाइनरी 1010 दशमलव में 10 के बराबर है।", logicPremise: "बाइनरी 1010 दशमलव में किसके बराबर है?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'tech-1-3': { missionTitle: "लॉजिक गेट", story: "सर्किट कटा हुआ है। पहचानें कि AND गेट कब 1 आउटपुट देता है।", primaryConcept: "लॉजिक गेट्स", learningObjective: "AND गेट के कार्य को समझें।", missionObjective: "AND गेट की स्थिति पहचानें।", hint: "AND का अर्थ है दोनों इनपुट 1 होने चाहिए।", feedbackIncorrect: "AND गेट के लिए सभी इनपुट 1 होने चाहिए।", logicPremise: "AND गेट आउटपुट 1 केवल तब देता है जब...", logicOptions: ["दोनों इनपुट 1 हों", "कम से कम एक इनपुट 1 हो", "दोनों इनपुट 0 हों", "एक इनपुट 0 हो"], logicAnswer: "दोनों इनपुट 1 हों" },
      'tech-1-4': { missionTitle: "इनपुट रूम", story: "कंप्यूटर हार्डवेयर उपकरणों को इनपुट या आउटपुट में वर्गीकृत करें।", primaryConcept: "इनपुट/आउटपुट डिवाइस", learningObjective: "इनपुट और आउटपुट हार्डवेयर में अंतर करें।", missionObjective: "कीबोर्ड को वर्गीकृत करें।", hint: "क्या कीबोर्ड कंप्यूटर में डेटा भेजता है?", feedbackIncorrect: "कीबोर्ड एक इनपुट डिवाइस है।", logicPremise: "कीबोर्ड एक __ डिवाइस का उदाहरण है।", logicOptions: ["आउटपुट", "प्रोसेसिंग", "इनपुट", "स्टोरेज"], logicAnswer: "इनपुट" },
      'tech-1-5': { missionTitle: "सेंसर लैब", story: "स्वचालित स्लाइडिंग दरवाजों के लिए सही सेंसर प्रकार चुनें।", primaryConcept: "सेंसर और स्वचालन", learningObjective: "मोशन सेंसर के अनुप्रयोग पहचानें।", missionObjective: "स्वचालित दरवाजे के लिए सेंसर चुनें।", hint: "यह पास आने वाले लोगों की गति का पता लगाता है।", feedbackIncorrect: "मोशन सेंसर दरवाजे के पास गति का पता लगाता है।", logicPremise: "स्वचालित दरवाजों को चालू करने वाला सेंसर कौन सा है?", logicOptions: ["तापमान सेंसर", "मोशन सेंसर", "प्रकाश सेंसर", "दबाव सेंसर"], logicAnswer: "मोशन सेंसर" },
      'tech-1-6': { missionTitle: "एल्गोरिदम चरण", story: "एल्गोरिदम निर्देशों को सही तार्किक क्रम में व्यवस्थित करें।", primaryConcept: "एल्गोरिदम डिज़ाइन", learningObjective: "अनुक्रमिक चरणों को क्रमबद्ध करें।", missionObjective: "खाना पकाने के एल्गोरिदम का पहला चरण पहचानें।", hint: "पकाने से पहले सामग्री इकट्ठा करनी होगी।", feedbackIncorrect: "सामग्री इकट्ठा करना पकाने से पहले आता है।", logicPremise: "रेसिपी एल्गोरिदम का पहला चरण क्या है?", logicOptions: ["भोजन परोसना", "सामग्री इकट्ठा करना", "खाना पकाना", "बर्तन धोना"], logicAnswer: "सामग्री इकट्ठा करना" },
      'tech-1-7': { missionTitle: "सीपीयू (CPU) कोर", story: "गणना करने वाले कंप्यूटर के घटक की पहचान करें।", primaryConcept: "CPU और प्रोसेसिंग", learningObjective: "CPU का कार्य पहचानें।", missionObjective: "कंप्यूटर के मस्तिष्क की पहचान करें।", hint: "CPU का मतलब सेंट्रली प्रोसेसिंग यूनिट है।", feedbackIncorrect: "CPU कंप्यूटर के मस्तिष्क के रूप में कार्य करता है।", logicPremise: "किस कंप्यूटर घटक को 'मस्तिष्क' कहा जाता है?", logicOptions: ["हार्ड ड्राइव", "CPU", "मॉनिटर", "RAM"], logicAnswer: "CPU" },
      'tech-1-8': { missionTitle: "RAM मेमोरी", story: "अस्थायी RAM और स्थायी स्टोरेज में अंतर करें।", primaryConcept: "कंप्यूटर मेमोरी", learningObjective: "RAM को अस्थायी मेमोरी के रूप में पहचानें।", missionObjective: "RAM की विशेषता पहचानें।", hint: "पावर बंद होने पर RAM की सामग्री गायब हो जाती है।", feedbackIncorrect: "RAM एक अस्थायी (अस्थिर) मेमोरी है।", logicPremise: "RAM (रैंडम एक्सेस मेमोरी) का उपयोग होता है...", logicOptions: ["स्थायी फ़ाइल भंडारण के लिए", "अस्थायी तेज़ डेटा एक्सेस के लिए", "छवियों को प्रदर्शित करने के लिए", "बिजली आपूर्ति के लिए"], logicAnswer: "अस्थायी तेज़ डेटा एक्सेस के लिए" },
      'tech-1-9': { missionTitle: "बग हंटर", story: "कोड में त्रुटि को ठीक करें। प्रोग्रामिंग त्रुटि को क्या कहा जाता है?", primaryConcept: "डिबगिंग", learningObjective: "कोड त्रुटि को 'बग' के रूप में पहचानें।", missionObjective: "कोड त्रुटि के शब्द को पहचानें।", hint: "कंप्यूटर में कीड़ा (मॉथ) मिलने की कहानी याद रखें।", feedbackIncorrect: "कंप्यूटर कोड में त्रुटि को 'बग' कहा जाता है।", logicPremise: "कंप्यूटर प्रोग्राम में त्रुटि को कहा जाता है...", logicOptions: ["वायरस", "बग", "फीचर", "चिप"], logicAnswer: "बग" },
      'tech-1-10': {
        missionTitle: "स्टेज 1 बॉस — डिजिटल स्पार्क महारत",
        story: "सर्वर को पुनर्स्थापित करने के लिए बाइनरी, लॉजिक गेट्स और डिबगिंग में महारत हासिल करें!",
        primaryConcept: "प्रौद्योगिकी स्टेज 1 महारत",
        learningObjective: "बाइनरी और हार्डवेयर सिद्धांतों को लागू करें।",
        missionObjective: "सभी 4 चरणों को पूरा करें।",
        hint: "बाइनरी और हार्डवेयर ज्ञान लागू करें।",
        feedbackIncorrect: "चरण विफल। पुनः प्रयास करें!",
        phases: [
          { title: "बाइनरी डिकोड", description: "बाइनरी 0110 को दशमलव में बदलें।", instruction: "दशमलव मान चुनें।", logicPremise: "बाइनरी 0110 का दशमलव मान?", logicOptions: ["4", "5", "6", "7"], logicAnswer: "6" },
          { title: "OR गेट", description: "OR गेट कम से कम एक इनपुट 1 होने पर 1 देता है।", instruction: "OR गेट नियम चुनें।", logicPremise: "OR गेट 1 कब देता है?", logicOptions: ["कम से कम एक इनपुट 1 हो", "दोनों इनपुट 0 हों", "केवल जब दोनों 1 हों", "कभी नहीं"], logicAnswer: "कम से कम एक इनपुट 1 हो" },
          { title: "हार्डवेयर जांच", description: "मॉनिटर इनपुट है या आउटपुट डिवाइस?", instruction: "डिवाइस प्रकार चुनें।" },
          { title: "डिबग प्रोटोकॉल", description: "कोड में त्रुटियों को ठीक करना क्या कहलाता है?", instruction: "शब्द चुनें।", logicPremise: "कोड त्रुटियां ठीक करना कहलाता है...", logicOptions: ["कंपाइलिंग", "डिबगिंग", "डाउनलोडिंग", "फॉर्मेटिंग"], logicAnswer: "डिबगिंग" }
        ]
      },
      'tech-2-1': { missionTitle: "चर भंडारण", story: "कोड में स्कोर स्टोर करें: score = 100.", primaryConcept: "चर (Variables)", learningObjective: "चरों को समझें।", missionObjective: "चर असाइनमेंट पहचानें।", hint: "चर मानों को धारण करते हैं।", feedbackIncorrect: "score = 100 में score एक चर नाम है।", logicPremise: "कोड में: score = 100. 'score' क्या है?", logicOptions: ["एक चर नाम", "केवल एक निश्चित मान", "एक त्रुटि", "एक लूप"], logicAnswer: "एक चर नाम" },
      'tech-2-2': { missionTitle: "IF-ELSE शाखन", story: "मूल्यांकन करें: speed = 60 होने पर if (speed > 50) status = 'FAST'; else status = 'SLOW';", primaryConcept: "सशर्त कथन", learningObjective: "if-else शाखन का मूल्यांकन करें।", missionObjective: "आउटपुट स्थिति निर्धारित करें।", hint: "60 > 50 सत्य है।", feedbackIncorrect: "60 50 से बड़ा है, इसलिए status = 'FAST'.", logicPremise: "speed=60 होने पर status क्या होगा?", logicOptions: ["FAST", "SLOW", "ERROR", "NONE"], logicAnswer: "FAST" },
      'tech-2-3': { missionTitle: "FOR लूप गिनती", story: "for (let i = 0; i < 4; i++) कितनी बार चलता है?", primaryConcept: "For लूप्स", learningObjective: "लूप पुनरावृत्तियों की गिनती करें।", missionObjective: "गिनती खोजें।", hint: "i = 0, 1, 2, 3 (4 बार)।", feedbackIncorrect: "i 0, 1, 2, 3 के लिए 4 बार चलेगा।", logicPremise: "for (let i=0; i<4; i++) कितनी बार चलता है?", logicOptions: ["3", "4", "5", "अनंत"], logicAnswer: "4" },
      'tech-2-4': { missionTitle: "WHILE लूप स्थिति", story: "एक while लूप तब तक चलता रहता है जब तक उसकी स्थिति...", primaryConcept: "While लूप्स", learningObjective: "while लूप स्थिति समझें।", missionObjective: "आवश्यकता पहचानें।", hint: "यह स्थिति सत्य रहने तक चलता है।", feedbackIncorrect: "while लूप स्थिति सत्य (True) रहने तक चलता है।", logicPremise: "while लूप कब तक चलता रहता है?", logicOptions: ["सत्य (True)", "असत्य (False)", "शून्य (Null)", "अपरिभाषित"], logicAnswer: "सत्य (True)" },
      'tech-2-5': { missionTitle: "फ़ंक्शन कॉल", story: "function add(a, b) { return a + b; }. add(3, 4) का मान क्या है?", primaryConcept: "फ़ंक्शन (Functions)", learningObjective: "फ़ंक्शन कॉल करें।", missionObjective: "add(3, 4) का मूल्यांकन करें।", hint: "3 + 4 = 7.", feedbackIncorrect: "add(3, 4) 3 + 4 = 7 देता है।", logicPremise: "function add(a, b) { return a + b; }. add(3, 4) क्या देगा?", logicOptions: ["34", "7", "12", "0"], logicAnswer: "7" },
      'tech-2-6': { missionTitle: "एरे इंडेक्सिंग", story: "एरे items = ['Shield', 'Laser', 'Sensor'] में, items[0] क्या है?", primaryConcept: "एरे (Arrays)", learningObjective: "0-इंडेक्सिंग समझें।", missionObjective: "items[0] पहचानें।", hint: "एरे 0 इंडेक्स से शुरू होते हैं।", feedbackIncorrect: "इंडेक्स 0 पहली वस्तु है: 'Shield'.", logicPremise: "items = ['Shield', 'Laser', 'Sensor']. items[0] क्या है?", logicOptions: ["Shield", "Laser", "Sensor", "1"], logicAnswer: "Shield" },
      'tech-2-7': { missionTitle: "बूलियन तर्क", story: "मूल्यांकन करें: !(true && false).", primaryConcept: "बूलियन ऑपरेटर", learningObjective: "NOT और AND ऑपरेटरों का मूल्यांकन करें।", missionObjective: "!(true && false) का परिणाम खोजें।", hint: "true && false = false. !false = true.", feedbackIncorrect: "!(true && false) का मान true है।", logicPremise: "!(true && false) का मान क्या है?", logicOptions: ["true", "false", "undefined", "null"], logicAnswer: "true" },
      'tech-2-8': { missionTitle: "IP एड्रेसिंग", story: "कंप्यूटर नेटवर्क पर IP एड्रेस का उद्देश्य क्या है?", primaryConcept: "नेटवर्किंग और IP", learningObjective: "IP एड्रेस पहचानें।", missionObjective: "IP उद्देश्य पहचानें।", hint: "IP एड्रेस नेटवर्क पर डिवाइस की पहचान करता है।", feedbackIncorrect: "IP एड्रेस नेटवर्क पर डिवाइस की विशिष्ट पहचान करता है।", logicPremise: "IP एड्रेस का उपयोग किस लिए होता है?", logicOptions: ["नेटवर्क पर डिवाइस की विशिष्ट पहचान", "फ़ाइलें स्टोर करने", "CPU स्पीड बढ़ाने", "कंप्यूटर ठंडा करने"], logicAnswer: "नेटवर्क पर डिवाइस की विशिष्ट पहचान" },
      'tech-2-9': { missionTitle: "HTTP प्रोटोकॉल", story: "वेब तकनीक में HTTP का क्या अर्थ है?", primaryConcept: "वेब प्रोटोकॉल", learningObjective: "HTTP अर्थ पहचानें।", missionObjective: "पूरा नाम पहचानें।", hint: "Hypertext Transfer Protocol.", feedbackIncorrect: "HTTP = Hypertext Transfer Protocol.", logicPremise: "HTTP का पूरा नाम क्या है?", logicOptions: ["Hypertext Transfer Protocol", "High Tech Power", "Home Terminal Transfer", "Hyper Text Processing"], logicAnswer: "Hypertext Transfer Protocol" },
      'tech-2-10': {
        missionTitle: "स्टेज 2 बॉस — नियंत्रण प्रवाह और नेटवर्क महारत",
        story: "नेटवर्क राउटर को रीबूट करने के लिए चरों, लूप्स, शर्तों और नेटवर्किंग में महारत हासिल करें!",
        primaryConcept: "प्रौद्योगिकी स्टेज 2 महारत",
        learningObjective: "लूप्स, शर्तों और नेटवर्किंग को लागू करें।",
        missionObjective: "सभी 4 चरणों को पूरा करें।",
        hint: "लूप गिनती और बूलियन तर्क याद रखें।",
        feedbackIncorrect: "चरण विफल। पुनः प्रयास करें!",
        phases: [
          { title: "शर्त जांच", description: "if (10 > 5) सत्य है या असत्य?", instruction: "परिणाम चुनें।", logicPremise: "क्या 10 > 5 सत्य है या असत्य?", logicOptions: ["true", "false"], logicAnswer: "true" },
          { title: "एरे खोज", description: "nums = [10, 20, 30]. nums[1] क्या है?", instruction: "मान खोजें।", logicPremise: "nums[1] का मान क्या है?", logicOptions: ["10", "20", "30", "1"], logicAnswer: "20" },
          { title: "लूप गिनती", description: "for (i=0; i<3; i++) कितनी बार चलता है?", instruction: "गिनती खोजें।" },
          { title: "IP पहचान", description: "वैध IPv4 एड्रेस प्रारूप कौन सा है?", instruction: "वैध IP चुनें।", logicPremise: "वैध IPv4 एड्रेस प्रारूप?", logicOptions: ["192.168.1.1", "999.999.1", "http://server", "abc.def"], logicAnswer: "192.168.1.1" }
        ]
      },
      'tech-3-1': { missionTitle: "स्टैक डेटा संरचना", story: "एक स्टैक LIFO (लास्ट इन, फर्स्ट आउट) नियम का पालन करता है। कौन सा तत्व सबसे पहले हटाया जाएगा?", primaryConcept: "स्टैक (Stack)", learningObjective: "LIFO सिद्धांत समझें।", missionObjective: "हटाए जाने वाले तत्व को पहचानें।", hint: "अंत में जोड़ा गया तत्व सबसे पहले निकलता है।", feedbackIncorrect: "स्टैक सबसे अंत में जोड़ी गई वस्तु को सबसे पहले हटाता है।", logicPremise: "LIFO स्टैक में कौन सा तत्व सबसे पहले हटाया जाता है?", logicOptions: ["सबसे अंत में जोड़ा गया तत्व", "सबसे पहले जोड़ा गया तत्व", "यादृच्छिक तत्व", "बीच का तत्व"], logicAnswer: "सबसे अंत में जोड़ा गया तत्व" },
      'tech-3-2': { missionTitle: "क्यू डेटा संरचना", story: "एक क्यू FIFO (फर्स्ट इन, फर्स्ट आउट) नियम का पालन करता है। लाइन की तरह सोचें।", primaryConcept: "क्यू (Queue)", learningObjective: "FIFO सिद्धांत समझें।", missionObjective: "FIFO कार्य पहचानें।", hint: "लाइन में सबसे पहले वाले को सेवा पहले मिलती है।", feedbackIncorrect: "क्यू सबसे पहले जोड़े गए तत्व को पहले प्रोसेस करता है।", logicPremise: "FIFO क्यू में कौन सा तत्व सबसे पहले प्रोसेस होता है?", logicOptions: ["सबसे पहले जोड़ा गया तत्व", "सबसे अंत में जोड़ा गया तत्व", "सबसे बड़ा तत्व", "नवीनतम तत्व"], logicAnswer: "सबसे पहले जोड़ा गया तत्व" },
      'tech-3-3': { missionTitle: "एन्क्रिप्शन हैशिंग", story: "स्टोर किए गए पासवर्ड के लिए सिस्टम क्रिप्टोग्राफिक हैशिंग का उपयोग क्यों करते हैं?", primaryConcept: "साइबर सुरक्षा और हैशिंग", learningObjective: "हैशिंग सुरक्षा समझें।", missionObjective: "हैशिंग उद्देश्य पहचानें।", hint: "हैश को आसानी से प्लेनटेक्स्ट में नहीं बदला जा सकता।", feedbackIncorrect: "डेटा लीक होने पर मूल पासवर्ड की सुरक्षा के लिए हैशिंग होती है।", logicPremise: "स्टोरेज से पहले पासवर्ड को हैश क्यों किया जाता है?", logicOptions: ["डेटा लीक होने पर मूल पासवर्ड की सुरक्षा के लिए", "पासवर्ड छोटा करने के लिए", "इंटरनेट स्पीड बढ़ाने के लिए", "ईमेल भेजने के लिए"], logicAnswer: "डेटा लीक होने पर मूल पासवर्ड की सुरक्षा के लिए" },
      'tech-3-4': { missionTitle: "SQL डेटाबेस क्वेरी", story: "डेटाबेस टेबल से डेटा प्राप्त करने के लिए किस SQL कमांड का उपयोग किया जाता है?", primaryConcept: "डेटाबेस और SQL", learningObjective: "SQL SELECT कथन पहचानें।", missionObjective: "कमांड पहचानें।", hint: "SELECT टेबल से डेटा प्राप्त करता है।", feedbackIncorrect: "डेटा प्राप्त करने के लिए SELECT का उपयोग किया जाता है।", logicPremise: "टेबल से डेटा पढ़ने के लिए किस SQL क्वेरी का उपयोग होता है?", logicOptions: ["SELECT", "INSERT", "DELETE", "UPDATE"], logicAnswer: "SELECT" },
      'tech-3-5': { missionTitle: "API एंडपॉइंट्स", story: "सॉफ्टवेयर एकीकरण में API का पूरा नाम क्या है?", primaryConcept: "API", learningObjective: "API का पूरा नाम पहचानें।", missionObjective: "शब्द पहचानें।", hint: "Application Programming Interface.", feedbackIncorrect: "API = Application Programming Interface.", logicPremise: "API का पूरा नाम क्या है?", logicOptions: ["Application Programming Interface", "Automated Program Integration", "Advanced Protocol Internet", "App Private Identification"], logicAnswer: "Application Programming Interface" },
      'tech-3-6': { missionTitle: "क्लाउड कंप्यूटिंग", story: "ऑन-प्रिमाइसेस सर्वर की तुलना में क्लाउड कंप्यूटिंग का मुख्य लाभ क्या है?", primaryConcept: "क्लाउड आर्किटेक्चर", learningObjective: "क्लाउड लाभ पहचानें।", missionObjective: "लाभ पहचानें।", hint: "इंटरनेट पर मांग के अनुसार संसाधनों को बढ़ाना।", feedbackIncorrect: "मांग के अनुसार लचीले संसाधन प्रदान करना इसका मुख्य लाभ है।", logicPremise: "क्लाउड कंप्यूटिंग का मुख्य लाभ?", logicOptions: ["इंटरनेट पर मांग के अनुसार स्केलेबल संसाधन", "इंटरनेट की आवश्यकता नहीं", "मुफ्त हार्डवेयर", "शून्य बिजली"], logicAnswer: "इंटरनेट पर मांग के अनुसार स्केलेबल संसाधन" },
      'tech-3-7': { missionTitle: "बाइनरी सर्च एल्गोरिदम", story: "बाइनरी सर्च के लिए एरे किस क्रम में होना चाहिए?", primaryConcept: "बाइनरी सर्च", learningObjective: "क्रमबद्ध एरे आवश्यकता पहचानें।", missionObjective: "आवश्यकता पहचानें।", hint: "बाइनरी सर्च केवल क्रमबद्ध सूचियों पर काम करता है।", feedbackIncorrect: "बाइनरी सर्च के लिए डेटा का क्रमबद्ध होना आवश्यक है।", logicPremise: "बाइनरी सर्च के लिए डेटा होना चाहिए...", logicOptions: ["क्रमबद्ध (Sorted)", "अक्रमबद्ध", "यादृच्छिक", "खाली"], logicAnswer: "क्रमबद्ध (Sorted)" },
      'tech-3-8': { missionTitle: "फायरवॉल सुरक्षा", story: "नेटवर्क फायरवॉल का प्राथमिक कार्य क्या है?", primaryConcept: "फायरवॉल और सुरक्षा", learningObjective: "फायरवॉल कार्य पहचानें।", missionObjective: "उद्देश्य पहचानें।", hint: "यह अनधिकृत ट्रैफिक को रोकता है।", feedbackIncorrect: "फायरवॉल अनधिकृत नेटवर्क पहुंच को रोकता है।", logicPremise: "फायरवॉल क्या करता है?", logicOptions: ["अनधिकृत नेटवर्क पहुंच को रोकता है", "सर्वर साफ करता है", "बिजली बनाता है", "डेटा स्टोर करता है"], logicAnswer: "अनधिकृत नेटवर्क पहुंच को रोकता है" },
      'tech-3-9': { missionTitle: "संस्करण नियंत्रण (GIT)", story: "Git में परिवर्तनों का स्नैपशॉट सहेजने के लिए कौन सी कमांड है?", primaryConcept: "संस्करण नियंत्रण (Git)", learningObjective: "Git commit कमांड पहचानें।", missionObjective: "कमांड पहचानें।", hint: "git commit परिवर्तनों को सहेजता है।", feedbackIncorrect: "git commit परिवर्तनों का स्नैपशॉट सहेजता है।", logicPremise: "परिवर्तनों को सहेजने वाली Git कमांड कौन सी है?", logicOptions: ["git commit", "git push", "git clone", "git init"], logicAnswer: "git commit" },
      'tech-3-10': {
        missionTitle: "स्टेज 3 बॉस — प्रणालियां और आर्किटेक्चर महारत",
        story: "डेटाबेस की रक्षा के लिए डेटा संरचनाओं, SQL, सुरक्षा और Git में महारत हासिल करें!",
        primaryConcept: "प्रौद्योगिकी स्टेज 3 महारत",
        learningObjective: "डेटा संरचनाओं, SQL और Git को लागू करें।",
        missionObjective: "सभी 4 चरणों को पूरा करें।",
        hint: "स्टैक, क्यू और SQL याद रखें।",
        feedbackIncorrect: "चरण विफल। पुनः प्रयास करें!",
        phases: [
          { title: "स्टैक क्रम", description: "स्टैक LIFO है या FIFO?", instruction: "क्रम चुनें।", logicPremise: "क्या स्टैक LIFO है या FIFO?", logicOptions: ["LIFO", "FIFO"], logicAnswer: "LIFO" },
          { title: "SQL कमांड", description: "SQL टेबल में पंक्ति जोड़ने की कमांड?", instruction: "SQL कमांड चुनें।", logicPremise: "पंक्ति जोड़ने की कमांड?", logicOptions: ["INSERT", "SELECT", "DROP", "ALTER"], logicAnswer: "INSERT" },
          { title: "सुरक्षा जांच", description: "हैश किए गए पासवर्ड की सुरक्षा क्या करती है?", instruction: "गुण चुनें।" },
          { title: "Git कमांड", description: "रिमोट रिपोजिटरी को कॉपी करने की कमांड?", instruction: "Git कमांड चुनें।", logicPremise: "रिमोट रिपोजिटरी कॉपी करने की कमांड?", logicOptions: ["git clone", "git status", "git branch", "git merge"], logicAnswer: "git clone" }
        ]
      },
      'tech-4-1': { missionTitle: "बिग ओ नोटेशन (BIG O)", story: "इंडेक्स arr[i] द्वारा एरे आइटम खोजने की समय जटिलता क्या है?", primaryConcept: "एल्गोरिदम जटिलता", learningObjective: "O(1) स्थिर समय पहचानें।", missionObjective: "समय जटिलता पहचानें।", hint: "सीधा इंडेक्स एक्सेस O(1) होता है।", feedbackIncorrect: "इंडेक्स एक्सेस O(1) स्थिर समय है।", logicPremise: "arr[i] इंडेक्स एक्सेस की समय जटिलता?", logicOptions: ["O(1)", "O(N)", "O(N²)", "O(log N)"], logicAnswer: "O(1)" },
      'tech-4-2': { missionTitle: "कृत्रिम न्यूरल नेटवर्क", story: "कृत्रिम न्यूरल नेटवर्क में मूल प्रसंस्करण इकाई क्या है?", primaryConcept: "कृत्रिम न्यूरल नेटवर्क", learningObjective: "कृत्रिम न्यूरॉन पहचानें।", missionObjective: "मूल इकाई पहचानें।", hint: "कृत्रिम न्यूरॉन (Perceptron / Neuron)।", feedbackIncorrect: "कृत्रिम न्यूरॉन (Neuron) मूल इकाई है।", logicPremise: "न्यूरल नेटवर्क की मूल इकाई क्या है?", logicOptions: ["Perceptron / Neuron", "ट्रांजिस्टर", "डेटाबेस पंक्ति", "CPU कोर"], logicAnswer: "Perceptron / Neuron" },
      'tech-4-3': { missionTitle: "पर्यवेक्षित शिक्षा (SUPERVISED ML)", story: "पर्यवेक्षित मशीन लर्निंग (Supervised ML) को किस प्रकार के डेटा की आवश्यकता होती है?", primaryConcept: "मशीन लर्निंग (ML)", learningObjective: "लेबल वाले डेटा की आवश्यकता पहचानें।", missionObjective: "आवश्यकता पहचानें।", hint: "लेबल (Labeled) डेटा आवश्यक है।", feedbackIncorrect: "पर्यवेक्षित शिक्षा को लेबल वाले डेटा की आवश्यकता होती है।", logicPremise: "Supervised ML को किस प्रकार का डेटा चाहिए?", logicOptions: ["लेबल वाला डेटा (Labels)", "बिना लेबल का डेटा", "केवल शोर", "अक्रमबद्ध टेक्स्ट"], logicAnswer: "लेबल वाला डेटा (Labels)" },
      'tech-4-4': { missionTitle: "डॉकर कंटेनर (DOCKER)", story: "डॉकर द्वारा अनुप्रयोगों को कंटेनर बनाने का मुख्य लाभ क्या है?", primaryConcept: "कंटेनराइजेशन (Docker)", learningObjective: "डॉकर लाभ समझें।", missionObjective: "लाभ पहचानें।", hint: "किसी भी सिस्टम पर समान निष्पादन।", feedbackIncorrect: "सभी प्रणालियों पर समान निष्पादन इसका लाभ है।", logicPremise: "Docker कंटेनरों का मुख्य लाभ?", logicOptions: ["किसी भी सिस्टम पर समान अनुप्रयोग निष्पादन", "स्क्रीन रिज़ॉल्यूशन बढ़ाना", "CPU बदलना", "पुराना कोड हटाना"], logicAnswer: "किसी भी सिस्टम पर समान अनुप्रयोग निष्पादन" },
      'tech-4-5': { missionTitle: "असिंक्रोनस प्रॉमिस", story: "जावास्क्रिप्ट में बाद में पूरा होने वाले असिंक्रोनस कार्यों को कौन सा ऑब्जेक्ट संभालता है?", primaryConcept: "Async JavaScript", learningObjective: "JavaScript Promise पहचानें।", missionObjective: "ऑब्जेक्ट पहचानें।", hint: "Promise ऑब्जेक्ट async कार्यों को संभालता है।", feedbackIncorrect: "Promise ऑब्जेक्ट async निष्पादन को संभालता है।", logicPremise: "JS में async कार्यों के लिए उपयोग होने वाला ऑब्जेक्ट?", logicOptions: ["Promise", "String", "Loop", "Math"], logicAnswer: "Promise" },
      'tech-4-6': { missionTitle: "माइक्रोसर्विसेज आर्किटेक्चर", story: "माइक्रोसर्विसेज आर्किटेक्चर एप्लिकेशन को कैसे विभाजित करता है?", primaryConcept: "सॉफ्टवेयर आर्किटेक्चर", learningObjective: "माइक्रोसर्विसेज संरचना समझें।", missionObjective: "संरचना पहचानें।", hint: "छोटी स्वतंत्र सेवाओं में विभाजित करता है।", feedbackIncorrect: "एप्लिकेशन को छोटी स्वतंत्र सेवाओं में विभाजित करता है।", logicPremise: "Microservices आर्किटेक्चर एप्लिकेशन को विभाजित करता है...", logicOptions: ["छोटी स्वतंत्र सेवाओं में (Independent services)", "एक बड़ी फ़ाइल में", "केवल डेटाबेस टेबल में", "HTML टैग में"], logicAnswer: "छोटी स्वतंत्र सेवाओं में (Independent services)" },
      'tech-4-7': { missionTitle: "DNS नाम रिज़ॉल्यूशन", story: "इंटरनेट पर DNS की प्राथमिक भूमिका क्या है?", primaryConcept: "DNS प्रोटोकॉल", learningObjective: "डोमेन नाम को IP में बदलना पहचानें।", missionObjective: "भूमिका पहचानें।", hint: "डोमेन नामों को IP पतों में बदलता है।", feedbackIncorrect: "DNS डोमेन नामों को IP पतों में बदलता है।", logicPremise: "DNS क्या करता है?", logicOptions: ["डोमेन नामों को IP पतों में बदलता है", "छवियों को कंप्रेस करता है", "राउटर चलाता है", "गणित हल करता है"], logicAnswer: "डोमेन नामों को IP पतों में बदलता है" },
      'tech-4-8': { missionTitle: "गारबेज कलेक्शन", story: "आधुनिक प्रोग्रामिंग वातावरण में गारबेज कलेक्शन (Garbage Collection) क्या करता है?", primaryConcept: "मेमोरी प्रबंधन", learningObjective: "स्वचालित मेमोरी रिलीज़ पहचानें।", missionObjective: "भूमिका पहचानें।", hint: "अप्रकाशित/अप्रयुक्त मेमोरी को स्वतः मुक्त करता है।", feedbackIncorrect: "अप्रयुक्त मेमोरी को स्वतः मुक्त करता है।", logicPremise: "Garbage Collection का कार्य क्या है?", logicOptions: ["अप्रयुक्त मेमोरी को मुक्त करना", "जंक ईमेल हटाना", "कंप्यूटर रीबूट करना", "कोड को C में बदलना"], logicAnswer: "अप्रयुक्त मेमोरी को मुक्त करना" },
      'tech-4-9': { missionTitle: "लोड बैलेन्सर", story: "उच्च-ट्रैफ़िक वेब अनुप्रयोगों के लिए लोड बैलेन्सर (Load Balancer) क्या करता है?", primaryConcept: "सिस्टम स्केलेबिलिटी", learningObjective: "ट्रैफ़िक वितरण पहचानें।", missionObjective: "कार्य पहचानें।", hint: "आने वाले ट्रैफ़िक को कई सर्वरों पर बांटता है।", feedbackIncorrect: "आने वाले वेब ट्रैफ़िक को कई सर्वरों पर बांटता है।", logicPremise: "Load Balancer क्या करता है?", logicOptions: ["आने वाले ट्रैफ़िक को कई सर्वरों पर बांटता है", "हार्ड ड्राइव एन्क्रिप्ट करता है", "स्क्रीन चमक बदलता है", "डेटा बैकअप लेता है"], logicAnswer: "आने वाले ट्रैफ़िक को कई सर्वरों पर बांटता है" },
      'tech-4-10': {
        missionTitle: "स्टेज 4 बॉस — सर्किट पत्थर महारत",
        story: "अंतिम तकनीकी परीक्षा! सॉफ्टवेयर इंजीनियरिंग, AI और सुरक्षा में महारत हासिल करके सर्किट पत्थर का निर्माण करें!",
        primaryConcept: "प्रौद्योगिकी स्टेज 4 उच्च महारत",
        learningObjective: "पूर्ण तकनीकी आर्किटेक्चर में महारत हासिल करें।",
        missionObjective: "सभी 4 चरणों को पूरा करें।",
        hint: "पूरे तकनीकी ज्ञान का उपयोग करें।",
        feedbackIncorrect: "चरण विफल। पुनः प्रयास करें!",
        phases: [
          { title: "बिग ओ जांच", description: "रैखिक खोज की समय जटिलता?", instruction: "बिग ओ नोटेशन चुनें।", logicPremise: "रैखिक खोज की समय जटिलता?", logicOptions: ["O(1)", "O(N)", "O(N²)", "O(log N)"], logicAnswer: "O(N)" },
          { title: "कंटेनर परिनियोजन", description: "एप्लिकेशन कोड को पैकेज करने वाली तकनीक?", instruction: "तकनीक चुनें।", logicPremise: "लोकप्रिय कंटेनर टूल?", logicOptions: ["Docker", "Paint", "Excel", "Calculator"], logicAnswer: "Docker" },
          { title: "DNS लुकअप", description: "डोमेन नामों को IP पतों में बदलने वाली सेवा।", instruction: "सेवा चुनें।" },
          { title: "लोड बैलेन्सर", description: "वेब ट्रैफ़िक को कई सर्वरों पर बांटता है।", instruction: "घटक चुनें।", logicPremise: "ट्रैफ़िक को सर्वरों पर बांटने वाला घटक?", logicOptions: ["Load Balancer", "Keyboard", "Graphics Card", "Sound Card"], logicAnswer: "Load Balancer" }
        ]
      }
    },
    fragments: { f1: "प्रौद्योगिकी टुकड़ा 1", f2: "प्रौद्योगिकी टुकड़ा 2", f3: "प्रौद्योगिकी टुकड़ा 3", f4: "प्रौद्योगिकी टुकड़ा 4", acquired: "सर्किट पत्थर का टुकड़ा प्राप्त हुआ!", desc: "आपने सर्किट पत्थर का एक टुकड़ा अर्जित किया है।" },
    stone: { title: "सर्किट पत्थर", acquired: "सर्किट पत्थर प्राप्त हुआ!", desc: "आपने प्रौद्योगिकी के मार्ग में महारत हासिल कर ली है और डिजिटल प्रणालियों को खोल दिया है।" },
    achievements: {
      initiate: { title: "प्रौद्योगिकी नवागंतुक", desc: "प्रौद्योगिकी क्षेत्र का स्टेज 1 पूरा किया।" },
      physics: { title: "प्रोग्रामर", desc: "चरों, लूप्स और नियंत्रण प्रवाह में महारत हासिल की।" },
      chemistry: { title: "सर्किट अन्वेषक", desc: "डिजिटल तर्क, हार्डवेयर और नेटवर्क में महारत हासिल की।" },
      biology: { title: "डिबगर", desc: "डेटा संरचनाओं, सुरक्षा और डेटाबेस में महारत हासिल की।" },
      master: { title: "प्रौद्योगिकी मास्टरी", desc: "सभी 40 प्रौद्योगिकी स्तरों को पूरा किया और सर्किट पत्थर को असेंबल किया!" }
    }
  },

  ml: {
    title: "സാങ്കേതിക വിഭാഗം",
    subtitle: "കമ്പ്യൂട്ടിംഗ്, സർക്യൂട്ടുകൾ & സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയറിംഗ്",
    intro: "ഡിജിറ്റൽ സാങ്കേതികവിദ്യയിൽ മാസ്റ്ററി നേടാൻ കമ്പ്യൂട്ടർ ആർക്കിടെക്ചർ, അൽഗോരിതങ്ങൾ, ലോജിക്, നെറ്റ്വർക്കിംഗ് എന്നിവ പഠിക്കുക.",
    stages: {
      'stage-1': { title: "സ്റ്റേജ് 1 — കണ്ടെത്തുക", subtitle: "ഡിജിറ്റൽ തത്വങ്ങൾ", desc: "ബൈനറി കോഡ്, ലോജിക് ഗേറ്റുകൾ, ഇൻപുട്ട്/ഔട്ട്പുട്ട് ഉപകരണങ്ങൾ, സെൻസറുകൾ എന്നിവ മനസ്സിലാക്കുക.", concept: "കമ്പ്യൂട്ടറുകളും ബൈനറി രീതിയും", learningObjective: "ബൈനറി സംഖ്യകൾ, ലോജിക് ഗേറ്റുകൾ, ഹാർഡ്‌വെയർ ഭാഗങ്ങൾ എന്നിവ സ്വായത്തമാക്കുക.", reward: "സാങ്കേതിക കഷ്ണം 1" },
      'stage-2': { title: "സ്റ്റേജ് 2 — മനസ്സിലാക്കുക", subtitle: "സർക്യൂട്ടുകളും നിയന്ത്രണവും", desc: "വേരിയബിളുകൾ, നിബന്ധനകൾ, ലൂപ്പുകൾ, മെമ്മറി സ്റ്റോറേജ്, നെറ്റ്വർക്ക് തത്വങ്ങൾ എന്നിവ പഠിക്കുക.", concept: "പ്രോഗ്രാമിംഗും സർക്യൂട്ട് നിയന്ത്രണവും", learningObjective: "if-else വാക്യങ്ങൾ, ലൂപ്പുകൾ, മെമ്മറി മാനേജ്‌മെന്റ് എന്നിവ പ്രയോഗിക്കുക.", reward: "സാങ്കേതിക കഷ്ണം 2" },
      'stage-3': { title: "സ്റ്റേജ് 3 — സിസ്റ്റങ്ങളും ഡാറ്റയും", subtitle: "ഡാറ്റാ ഘടനകളും നെറ്റ്വർക്കുകളും", desc: "ഡാറ്റാ ഘടനകൾ, എൻക്രിപ്ഷൻ, API കൾ, ക്ലൗഡ് കമ്പ്യൂട്ടിംഗ്, ഡാറ്റാബേസുകൾ എന്നിവ പഠിക്കുക.", concept: "സിസ്റ്റം ആർക്കിടെക്ചറും സെക്യൂരിറ്റിയും", learningObjective: "ഡാറ്റാ ഘടനകൾ, എൻക്രിപ്ഷൻ അൽഗോരിതങ്ങൾ എന്നിവ വിശകലനം ചെയ്യുക.", reward: "സാങ്കേതിക കഷ്ണം 3" },
      'stage-4': { title: "സ്റ്റേജ് 4 — മാസ്റ്ററി", subtitle: "സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയറിംഗും AI യും", desc: "സങ്കീർണ്ണ അൽഗോരിതങ്ങൾ, ന്യൂറൽ നെറ്റ്വർക്കുകൾ, മെഷീൻ ലേണിംഗ് മോഡലുകൾ എന്നിവയിൽ പ്രാവീണ്യം നേടുക.", concept: "ഉയർന്ന സാങ്കേതികവിദ്യയും കോർ മാസ്റ്ററിയും", learningObjective: "ഫുൾ-സ്റ്റാക്ക് സിസ്റ്റം ആർക്കിടെക്ചർ സംയോജിപ്പിച്ച് സർക്യൂട്ട് സ്റ്റോൺ നിർമ്മിക്കുക.", reward: "സാങ്കേതിക കഷ്ണം 4 & സർക്യൂട്ട് സ്റ്റോൺ" }
    },
    levels: {
      'tech-1-1': { missionTitle: "ബൈനറി സന്ദേശം", story: "ബൈനറി സിഗ്നൽ വരുന്നു. ബൈനറി 0101 നെ ഡെസിമലാക്കുക.", primaryConcept: "ബൈനറി സംഖ്യകൾ", learningObjective: "ബൈനറി 0101 നെ ഡെസിമലാക്കുക.", missionObjective: "ബൈനറി 0101 ഡികോഡ് ചെയ്യുക.", hint: "ബൈനറി 0101 = 4 + 0 + 1 = 5.", feedbackIncorrect: "ബൈനറി 0101 എന്നാൽ ഡെസിമലിൽ 5 ആണ്.", logicPremise: "ബൈനറി 0101 ന്റെ ഡെസിമൽ മൂല്യം എത്ര?", logicOptions: ["3", "4", "5", "6"], logicAnswer: "5" },
      'tech-1-2': { missionTitle: "ബൈനറി കോഡ് II", story: "സർവർ ബന്ധം പുനഃസ്ഥാപിക്കാൻ ബൈനറി 1010 നെ ഡെസിമലാക്കുക.", primaryConcept: "ബൈനറി രീതി", learningObjective: "ബൈനറി 1010 നെ ഡെസിമലാക്കുക.", missionObjective: "1010 ന്റെ ഡെസിമൽ കാണുക.", hint: "1010 = 8 + 0 + 2 + 0 = 10.", feedbackIncorrect: "ബൈനറി 1010 എന്നാൽ 10 ആണ്.", logicPremise: "ബൈനറി 1010 ന്റെ ഡെസിമൽ മൂല്യം എത്ര?", logicOptions: ["8", "10", "12", "14"], logicAnswer: "10" },
      'tech-1-3': { missionTitle: "ലോജിക് ഗേറ്റ്", story: "AND ഗേറ്റ് എപ്പോഴാണ് 1 ഔട്ട്പുട്ട് നൽകുന്നത് എന്ന് കണ്ടെത്തുക.", primaryConcept: "ലോജിക് ഗേറ്റുകൾ", learningObjective: "AND ഗേറ്റ് ധർമ്മം മനസ്സിലാക്കുക.", missionObjective: "AND ഗേറ്റ് നിബന്ധന കണ്ടെത്തുക.", hint: "AND എന്നാൽ രണ്ട് ഇൻപുട്ടുകളും 1 ആകണം.", feedbackIncorrect: "AND ഗേറ്റിന് എല്ലാ ഇൻപുട്ടുകളും 1 ആകണം.", logicPremise: "AND ഗേറ്റ് എപ്പോഴാണ് 1 നൽകുന്നത്?", logicOptions: ["രണ്ട് ഇൻപുട്ടുകളും 1 ആകുമ്പോൾ", "കുറഞ്ഞത് ഒരു ഇൻപുട്ട് 1 ആകുമ്പോൾ", "രണ്ടും 0 ആകുമ്പോൾ", "ഒന്ന് 0 ആകുമ്പോൾ"], logicAnswer: "രണ്ട് ഇൻപുട്ടുകളും 1 ആകുമ്പോൾ" },
      'tech-1-4': { missionTitle: "ഇൻപുട്ട് മുറി", story: "കീബോർഡ് ഇൻപുട്ടാണോ ഔട്ട്പുട്ടാണോ എന്ന് തരംതിരിക്കുക.", primaryConcept: "ഇൻപുട്ട്/ഔട്ട്പുട്ട് ഉപകരണങ്ങൾ", learningObjective: "ഉപകരണങ്ങൾ വേർതിരിക്കുക.", missionObjective: "കീബോർഡ് തരംതിരിക്കുക.", hint: "കീബോർഡ് കമ്പ്യൂട്ടറിലേക്ക് ഡാറ്റ നൽകുന്നുണ്ടോ?", feedbackIncorrect: "കീബോർഡ് ഒരു ഇൻപുട്ട് ഉപകരണമാണ്.", logicPremise: "കീബോർഡ് ഏത് തരം ഉപകരണമാണ്?", logicOptions: ["ഔട്ട്പുട്ട്", "പ്രോസസ്സിംഗ്", "ഇൻപുട്ട്", "സ്റ്റോറേജ്"], logicAnswer: "ഇൻപുട്ട്" },
      'tech-1-5': { missionTitle: "സെൻസർ ലാബ്", story: "ഓട്ടോമാറ്റിക് വാതിലുകൾക്ക് അനുയോജ്യമായ സെൻസർ തിരഞ്ഞെടുക്കുക.", primaryConcept: "സെൻസറുകൾ", learningObjective: "മോഷൻ സെൻസർ ഉപയോഗം കണ്ടെത്തുക.", missionObjective: "സെൻസർ തിരഞ്ഞെടുക്കുക.", hint: "ആളുകൾ നീങ്ങുന്നത് ഇത് കണ്ടെത്തുന്നു.", feedbackIncorrect: "മോഷൻ സെൻസർ വാതിലിന് അടുത്തുള്ള ചലനം കണ്ടെത്തുന്നു.", logicPremise: "ഓട്ടോമാറ്റിക് വാതിലുകൾ തുറക്കുന്ന സെൻസർ ഏതാണ്?", logicOptions: ["താപനില സെൻസർ", "മോഷൻ സെൻസർ", "വെളിച്ച സെൻസർ", "മർദ്ദ സെൻസർ"], logicAnswer: "മോഷൻ സെൻസർ" },
      'tech-1-6': { missionTitle: "അൽഗോരിതം പടികൾ", story: "പാചക അൽഗോരിതത്തിന്റെ ആദ്യ പടി കണ്ടെത്തുക.", primaryConcept: "അൽഗോരിതം ഡിസൈൻ", learningObjective: "ഘട്ടങ്ങൾ ക്രമീകരിക്കുക.", missionObjective: "ആദ്യ പടി കണ്ടെത്തുക.", hint: "പാകം ചെയ്യുന്നതിന് മുൻപ് ചേരുവകൾ ശേഖരിക്കണം.", feedbackIncorrect: "ചേരുവകൾ ശേഖരിക്കുന്നതാണ് ആദ്യ പടി.", logicPremise: "പാചക അൽഗോരിതത്തിന്റെ ആദ്യ പടി എന്താണ്?", logicOptions: ["ഭക്ഷണം വിളമ്പുക", "ചേരുവകൾ ശേഖരിക്കുക", "പാകം ചെയ്യുക", "പാത്രങ്ങൾ കഴുകുക"], logicAnswer: "ചേരുവകൾ ശേഖരിക്കുക" },
      'tech-1-7': { missionTitle: "സിപിയു (CPU)", story: "കമ്പ്യൂട്ടറിന്റെ തലച്ചോറ് എന്നറിയപ്പെടുന്ന ഭാഗം ഏതാണ്?", primaryConcept: "CPU & പ്രോസസ്സിംഗ്", learningObjective: "CPU ധർമ്മം തിരിച്ചറിയുക.", missionObjective: "തലച്ചോറ് കണ്ടെത്തുക.", hint: "CPU എന്നാൽ സെൻട്രൽ പ്രോസസ്സിംഗ് യൂണിറ്റ്.", feedbackIncorrect: "CPU കമ്പ്യൂട്ടറിന്റെ തലച്ചോറായി പ്രവർത്തിക്കുന്നു.", logicPremise: "കമ്പ്യൂട്ടറിന്റെ 'തലച്ചോറ്' എന്നറിയപ്പെടുന്നത് ഏതാണ്?", logicOptions: ["ഹാർഡ് ഡിസ്ക്", "CPU", "മോണിറ്റർ", "RAM"], logicAnswer: "CPU" },
      'tech-1-8': { missionTitle: "RAM മെമ്മറി", story: "താത്കാലിക RAM നെക്കുറിച്ചുള്ള വസ്തുത കണ്ടെത്തുക.", primaryConcept: "കമ്പ്യൂട്ടർ മെമ്മറി", learningObjective: "RAM താൽക്കാലിക മെമ്മറിയാണെന്ന് മനസ്സിലാക്കുക.", missionObjective: "RAM സവിശേഷത കണ്ടെത്തുക.", hint: "പവർ ഓഫായാൽ RAM ലെ ഡാറ്റ പോകും.", feedbackIncorrect: "RAM താൽക്കാലിക മെമ്മറിയാണ്.", logicPremise: "RAM (Random Access Memory) എന്തിനാണ് ഉപയോഗിക്കുന്നത്?", logicOptions: ["സ്ഥിരമായി ഫയലുകൾ സൂക്ഷിക്കാൻ", "താൽക്കാലികമായി വേഗത്തിൽ ഡാറ്റ എടുക്കാൻ", "ചിത്രങ്ങൾ കാണിക്കാൻ", "വൈദ്യുതി നൽകാൻ"], logicAnswer: "താൽക്കാലികമായി വേഗത്തിൽ ഡാറ്റ എടുക്കാൻ" },
      'tech-1-9': { missionTitle: "ബഗ് ഹണ്ടർ", story: "പ്രോഗ്രാമിംഗിലെ തെറ്റിനെ എന്താണ് വിളിക്കുന്നത്?", primaryConcept: "ഡിബഗ്ഗിംഗ്", learningObjective: "കോഡിലെ തെറ്റ് 'ബഗ്' ആണെന്ന് തിരിച്ചറിയുക.", missionObjective: "വാക്ക് കണ്ടെത്തുക.", hint: "കമ്പ്യൂട്ടറിൽ പ്രാണി (Bug) കിട്ടിയ കഥ ഓർക്കുക.", feedbackIncorrect: "കോഡിലെ തെറ്റിനെ 'ബഗ്' എന്ന് വിളിക്കുന്നു.", logicPremise: "പ്രോഗ്രാമിംഗിലെ തെറ്റിനെ എന്താണ് വിളിക്കുന്നത്?", logicOptions: ["വൈറസ്", "ബഗ് (Bug)", "ഫീച്ചർ", "ചിപ്പ്"], logicAnswer: "ബഗ് (Bug)" },
      'tech-1-10': {
        missionTitle: "സ്റ്റേജ് 1 ബോസ് — ഡിജിറ്റൽ സ്പാർക്ക് മാസ്റ്ററി",
        story: "ബൈനറിയും ലോജിക് ഗേറ്റുകളും സ്വായത്തമാക്കുക!",
        primaryConcept: "സാങ്കേതിക സ്റ്റേജ് 1 മാസ്റ്ററി",
        learningObjective: "ബൈനറിയും ഹാർഡ്‌വെയറും പ്രയോഗിക്കുക.",
        missionObjective: "4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "അറിവുകൾ ഉപയോഗിക്കുക.",
        feedbackIncorrect: "പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          { title: "ബൈനറി", description: "ബൈനറി 0110 ന്റെ ഡെസിമൽ മൂല്യം?", instruction: "ഡെസിമൽ കാണുക.", logicPremise: "ബൈനറി 0110 ന്റെ ഡെസിമൽ എത്ര?", logicOptions: ["4", "5", "6", "7"], logicAnswer: "6" },
          { title: "OR ഗേറ്റ്", description: "ഒരു ഇൻപുട്ട് 1 ആയാൽ OR ഗേറ്റ് 1 തരും.", instruction: "നിയമം തിരഞ്ഞെടുക്കുക.", logicPremise: "OR ഗേറ്റ് എപ്പോൾ 1 തരും?", logicOptions: ["കുറഞ്ഞത് ഒരു ഇൻപുട്ട് 1 ആയാൽ", "രണ്ടും 0 ആയാൽ", "രണ്ടും 1 ആയാൽ മാത്രം", "ഒരിക്കലുമില്ല"], logicAnswer: "കുറഞ്ഞത് ഒരു ഇൻപുട്ട് 1 ആയാൽ" },
          { title: "ഹാർഡ്‌വെയർ", description: "മോണിറ്റർ ഇൻപുട്ടാണോ ഔട്ട്പുട്ടാണോ?", instruction: "ഉപകരണം തിരഞ്ഞെടുക്കുക." },
          { title: "ഡിബഗ്ഗിംഗ്", description: "തെറ്റുകൾ തിരുത്തുന്നത് എന്താണ്?", instruction: "വാക്ക് തിരഞ്ഞെടുക്കുക.", logicPremise: "തെറ്റുകൾ തിരുത്തുന്നത്...", logicOptions: ["കംപൈലിംഗ്", "ഡിബഗ്ഗിംഗ് (Debugging)", "ഡൗൺലോഡിംഗ്", "ഫോർമാറ്റിംഗ്"], logicAnswer: "ഡിബഗ്ഗിംഗ് (Debugging)" }
        ]
      },
      'tech-2-1': { missionTitle: "വേരിയബിൾ", story: "score = 100 ൽ score എന്താണ്?", primaryConcept: "വേരിയബിളുകൾ", learningObjective: "വേരിയബിളുകൾ മനസ്സിലാക്കുക.", missionObjective: "വേരിയബിൾ കണ്ടെത്തുക.", hint: "വേരിയബിളുകൾ മൂല്യങ്ങൾ സൂക്ഷിക്കുന്നു.", feedbackIncorrect: "score ഒരു വേരിയബിൾ പേരാണ്.", logicPremise: "score = 100 ൽ 'score' എന്താണ്?", logicOptions: ["വേരിയബിൾ പേര് (Variable name)", "സംഖ്യ മാത്രം", "തെറ്റ്", "ലൂപ്പ്"], logicAnswer: "വേരിയബിൾ പേര് (Variable name)" },
      'tech-2-2': { missionTitle: "IF-ELSE നിബന്ധന", story: "speed = 60 ആയാൽ if (speed > 50) status = 'FAST'; else status = 'SLOW'; ൽ status എന്താണ്?", primaryConcept: "നിബന്ധനകൾ", learningObjective: "if-else ശാഖ മനസ്സിലാക്കുക.", missionObjective: "മൂല്യം കാണുക.", hint: "60 > 50 ശരിയാണ്.", feedbackIncorrect: "60 അമ്പതിനേക്കാൾ വലുതാണ്, അതിനാൽ 'FAST'.", logicPremise: "speed=60 ആയാൽ status എന്തായിരിക്കും?", logicOptions: ["FAST", "SLOW", "ERROR", "NONE"], logicAnswer: "FAST" },
      'tech-2-3': { missionTitle: "FOR ലൂപ്പ്", story: "for (let i = 0; i < 4; i++) എത്ര തവണ പ്രവർത്തിക്കും?", primaryConcept: "For ലൂപ്പുകൾ", learningObjective: "ലൂപ്പ് തവണകൾ എണ്ണുക.", missionObjective: "തവണകൾ കാണുക.", hint: "i = 0, 1, 2, 3 (4 തവണ).", feedbackIncorrect: "i 0, 1, 2, 3 എന്ന് 4 തവണ പ്രവർത്തിക്കും.", logicPremise: "for (let i=0; i<4; i++) എത്ര തവണ പ്രവർത്തിക്കും?", logicOptions: ["3", "4", "5", "അനന്തമായി"], logicAnswer: "4" },
      'tech-2-4': { missionTitle: "WHILE ലൂപ്പ്", story: "while ലൂപ്പ് നിബന്ധന __ ആയിരിക്കുന്നിടത്തോളം പ്രവർത്തിക്കും.", primaryConcept: "While ലൂപ്പുകൾ", learningObjective: "while ലൂപ്പ് മനസ്സിലാക്കുക.", missionObjective: "ആവശ്യകത കാണുക.", hint: "ശരിയായിരിക്കുന്നിടത്തോളം പ്രവർത്തിക്കും.", feedbackIncorrect: "നിബന്ധന ശരിയായിരിക്കുന്നിടത്തോളം പ്രവർത്തിക്കും.", logicPremise: "while ലൂപ്പ് എപ്പോൾ പ്രവർത്തിക്കും?", logicOptions: ["ശരി (True)", "തെറ്റ് (False)", "ശൂന്യം", "നിർവ്വചിക്കാത്തത്"], logicAnswer: "ശരി (True)" },
      'tech-2-5': { missionTitle: "ഫംഗ്ഷൻ", story: "function add(a, b) { return a + b; }. add(3, 4) ന്റെ മൂല്യം എത്ര?", primaryConcept: "ഫംഗ്ഷനുകൾ", learningObjective: "ഫംഗ്ഷനുകൾ വിളിക്കുക.", missionObjective: "add(3, 4) കാണുക.", hint: "3 + 4 = 7.", feedbackIncorrect: "add(3, 4) എന്നത് 3 + 4 = 7 തരും.", logicPremise: "add(3, 4) ന്റെ മൂല്യം എത്ര?", logicOptions: ["34", "7", "12", "0"], logicAnswer: "7" },
      'tech-2-6': { missionTitle: "അറേ സൂചിക", story: "items = ['Shield', 'Laser', 'Sensor'] അറേയിൽ items[0] എന്താണ്?", primaryConcept: "അറേകൾ (Arrays)", learningObjective: "0-സൂചിക മനസ്സിലാക്കുക.", missionObjective: "items[0] കാണുക.", hint: "അറേകൾ 0 ൽ തുടങ്ങുന്നു.", feedbackIncorrect: "സൂചിക 0 എന്നാൽ ആദ്യ വസ്തു: 'Shield'.", logicPremise: "items = ['Shield', 'Laser', 'Sensor']. items[0] എന്താണ്?", logicOptions: ["Shield", "Laser", "Sensor", "1"], logicAnswer: "Shield" },
      'tech-2-7': { missionTitle: "ബൂളിയൻ ലോജിക്", story: "!(true && false) ന്റെ മൂല്യം കാണുക.", primaryConcept: "ബൂളിയൻ ലോജിക്", learningObjective: "NOT, AND ഓപ്പറേറ്ററുകൾ കാണുക.", missionObjective: "മൂല്യം കാണുക.", hint: "true && false = false. !false = true.", feedbackIncorrect: "!(true && false) ന്റെ മൂല്യം true ആണ്.", logicPremise: "!(true && false) ന്റെ മൂല്യം എന്താണ്?", logicOptions: ["true", "false", "undefined", "null"], logicAnswer: "true" },
      'tech-2-8': { missionTitle: "IP വിലാസം", story: "IP വിലാസത്തിന്റെ പ്രധാന ലക്ഷ്യം എന്താണ്?", primaryConcept: "നൂതന നെറ്റ്വർക്കിംഗ്", learningObjective: "IP വിലാസം തിരിച്ചറിയുക.", missionObjective: "ലക്ഷ്യം കണ്ടെത്തുക.", hint: "ഉപകരണത്തെ നെറ്റ്വർക്കിൽ പ്രത്യേകമായി തിരിച്ചറിയുന്നു.", feedbackIncorrect: "IP വിലാസം നെറ്റ്വർക്കിൽ ഉപകരണത്തെ തിരിച്ചറിയുന്നു.", logicPremise: "IP വിലാസം എന്തിനാണ് ഉപയോഗിക്കുന്നത്?", logicOptions: ["ഉപകരണത്തെ പ്രത്യേകമായി തിരിച്ചറിയാൻ", "ഫയലുകൾ സൂക്ഷിക്കാൻ", "വേഗത കൂട്ടാൻ", "തണുപ്പിക്കാൻ"], logicAnswer: "ഉപകരണത്തെ പ്രത്യേകമായി തിരിച്ചറിയാൻ" },
      'tech-2-9': { missionTitle: "HTTP പ്രോട്ടോക്കോൾ", story: "HTTP യുടെ പൂർണ്ണരൂപം എന്താണ്?", primaryConcept: "വെബ് പ്രോട്ടോക്കോളുകൾ", learningObjective: "HTTP പൂർണ്ണരൂപം കാണുക.", missionObjective: "പൂർണ്ണരൂപം കാണുക.", hint: "Hypertext Transfer Protocol.", feedbackIncorrect: "HTTP = Hypertext Transfer Protocol.", logicPremise: "HTTP യുടെ പൂർണ്ണരൂപം എന്താണ്?", logicOptions: ["Hypertext Transfer Protocol", "High Tech Power", "Home Terminal Transfer", "Hyper Text Processing"], logicAnswer: "Hypertext Transfer Protocol" },
      'tech-2-10': {
        missionTitle: "സ്റ്റേജ് 2 ബോസ് — പ്രോഗ്രാമിംഗ് മാസ്റ്ററി",
        story: "വേരിയബിളുകളും ലൂപ്പുകളും നെറ്റ്വർക്കുകളും സ്വായത്തമാക്കുക!",
        primaryConcept: "സാങ്കേതിക സ്റ്റേജ് 2 മാസ്റ്ററി",
        learningObjective: "ലൂപ്പുകളും നെറ്റ്വർക്കിംഗും പ്രയോഗിക്കുക.",
        missionObjective: "4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "തത്വങ്ങൾ ഓർക്കുക.",
        feedbackIncorrect: "പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          { title: "നിബന്ധന", description: "10 > 5 ശരിയോ തെറ്റോ?", instruction: "ഉത്തരം കാണുക.", logicPremise: "10 > 5 ശരിയോ തെറ്റോ?", logicOptions: ["true", "false"], logicAnswer: "true" },
          { title: "അറേ", description: "nums = [10, 20, 30]. nums[1] എത്ര?", instruction: "മൂല്യം കാണുക.", logicPremise: "nums[1] ന്റെ മൂല്യം എത്ര?", logicOptions: ["10", "20", "30", "1"], logicAnswer: "20" },
          { title: "ലൂപ്പ്", description: "for (i=0; i<3; i++) എത്ര തവണ പ്രവർത്തിക്കും?", instruction: "എണ്ണം കാണുക." },
          { title: "IP വിലാസം", description: "ശരിയായ IPv4 വിലാസം ഏതാണ്?", instruction: "IP കാണുക.", logicPremise: "ശരിയായ IPv4 വിലാസം ഏതാണ്?", logicOptions: ["192.168.1.1", "999.999.1", "http://server", "abc.def"], logicAnswer: "192.168.1.1" }
        ]
      },
      'tech-3-1': { missionTitle: "സ്റ്റാക്ക് (STACK)", story: "സ്റ്റാക്ക് LIFO (അവസാനം വന്നത് ആദ്യം പുറത്ത്) രീതിയാണ്. ഏത് വസ്തുവാണ് ആദ്യം നീക്കം ചെയ്യുന്നത്?", primaryConcept: "സ്റ്റാക്ക് (Stack)", learningObjective: "LIFO രീതി മനസ്സിലാക്കുക.", missionObjective: "വസ്തു കാണുക.", hint: "അവസാനം ചേർത്ത വസ്തു ആദ്യം നീക്കം ചെയ്യപ്പെടും.", feedbackIncorrect: "അവസാനം ചേർത്ത വസ്തുവാണ് ആദ്യം നീക്കം ചെയ്യപ്പെടുന്നത്.", logicPremise: "LIFO സ്റ്റാക്കിൽ ഏത് വസ്തു ആദ്യം നീക്കം ചെയ്യപ്പെടും?", logicOptions: ["അവസാനം ചേർത്ത വസ്തു", "ആദ്യം ചേർത്ത വസ്തു", "ഏതെങ്കിലും വസ്തു", "നടുവിലുള്ള വസ്തു"], logicAnswer: "അവസാനം ചേർത്ത വസ്തു" },
      'tech-3-2': { missionTitle: "ക്യൂ (QUEUE)", story: "ക്യൂ FIFO (ആദ്യം വന്നത് ആദ്യം പുറത്ത്) രീതിയാണ്.", primaryConcept: "ക്യൂ (Queue)", learningObjective: "FIFO രീതി മനസ്സിലാക്കുക.", missionObjective: "FIFO രീതി കാണുക.", hint: "ആദ്യം വന്നയാൾക്ക് ആദ്യം സേവനം ലഭിക്കും.", feedbackIncorrect: "ആദ്യം ചേർത്ത വസ്തുവാണ് ആദ്യം പ്രോസസ്സ് ചെയ്യുന്നത്.", logicPremise: "FIFO ക്യൂവിൽ ഏത് വസ്തു ആദ്യം പ്രോസസ്സ് ചെയ്യപ്പെടും?", logicOptions: ["ആദ്യം ചേർത്ത വസ്തു", "അവസാനം ചേർത്ത വസ്തു", "വലിയ വസ്തു", "പുതിയ വസ്തു"], logicAnswer: "ആദ്യം ചേർത്ത വസ്തു" },
      'tech-3-3': { missionTitle: "ഹേഷിങ് സെക്യൂരിറ്റി", story: "പാസ്‌വേഡുകൾ സൂക്ഷിക്കാൻ ഹേഷിങ് ഉപയോഗിക്കുന്നത് എന്തുകൊണ്ട്?", primaryConcept: "സൈബർ സെക്യൂരിറ്റിയും ഹേഷിംഗും", learningObjective: "ഹേഷിങ് സംരക്ഷണം മനസ്സിലാക്കുക.", missionObjective: "ലക്ഷ്യം കണ്ടെത്തുക.", hint: "ഹേഷുകളിൽ നിന്ന് തിരികെ പഴയ പാസ്‌വേഡ് എടുക്കാനാകില്ല.", feedbackIncorrect: "ചോർച്ച ഉണ്ടായാൽ പാസ്‌വേഡുകൾ സുരക്ഷിതമാക്കാൻ.", logicPremise: "പാസ്‌വേഡുകൾ ഹേഷ് ചെയ്യുന്നത് എന്തുകൊണ്ട്?", logicOptions: ["യഥാർത്ഥ പാസ്‌വേഡുകൾ സുരക്ഷിതമാക്കാൻ", "പാസ്‌വേഡ് ചെറുതാക്കാൻ", "ഇന്റർനെറ്റ് വേഗത കൂട്ടാൻ", "മെയിൽ അയക്കാൻ"], logicAnswer: "യഥാർത്ഥ പാസ്‌വേഡുകൾ സുരക്ഷിതമാക്കാൻ" },
      'tech-3-4': { missionTitle: "SQL ഡാറ്റാബേസ്", story: "ഡാറ്റാബേസ് ടേബിളിൽ നിന്ന് ഡാറ്റ എടുക്കാൻ ഏത് SQL കമാൻഡ് ഉപയോഗിക്കുന്നു?", primaryConcept: "ഡാറ്റാബേസുകളും SQL ഉം", learningObjective: "SELECT കമാൻഡ് കാണുക.", missionObjective: "കമാൻഡ് കാണുക.", hint: "SELECT ഡാറ്റ എടുക്കാൻ ഉപയോഗിക്കുന്നു.", feedbackIncorrect: "SELECT കമാൻഡാണ് ഡാറ്റ എടുക്കാൻ ഉപയോഗിക്കുന്നത്.", logicPremise: "ഡാറ്റ എടുക്കാൻ ഉപയോഗിക്കുന്ന SQL കമാൻഡ് ഏതാണ്?", logicOptions: ["SELECT", "INSERT", "DELETE", "UPDATE"], logicAnswer: "SELECT" },
      'tech-3-5': { missionTitle: "API", story: "API യുടെ പൂർണ്ണരൂപം എന്താണ്?", primaryConcept: "API കൾ", learningObjective: "API പൂർണ്ണരൂപം കാണുക.", missionObjective: "പൂർണ്ണരൂപം കാണുക.", hint: "Application Programming Interface.", feedbackIncorrect: "API = Application Programming Interface.", logicPremise: "API യുടെ പൂർണ്ണരൂപം എന്താണ്?", logicOptions: ["Application Programming Interface", "Automated Program Integration", "Advanced Protocol Internet", "App Private Identification"], logicAnswer: "Application Programming Interface" },
      'tech-3-6': { missionTitle: "ക്ലൗഡ് കമ്പ്യൂട്ടിംഗ്", story: "ക്ലൗഡ് കമ്പ്യൂട്ടിംഗിന്റെ പ്രധാന നേട്ടം എന്താണ്?", primaryConcept: "ക്ലൗഡ് ആർക്കിടെക്ചർ", learningObjective: "ക്ലൗഡ് നേട്ടങ്ങൾ കാണുക.", missionObjective: "നേട്ടം കാണുക.", hint: "ആവശ്യാനുസരണം വിഭവങ്ങൾ വർദ്ധിപ്പിക്കാം.", feedbackIncorrect: "ഇന്റർനെറ്റ് വഴി ആവശ്യാനുസരണം വിഭവങ്ങൾ ലഭ്യമാക്കുന്നതാണ് നേട്ടം.", logicPremise: "ക്ലൗഡ് കമ്പ്യൂട്ടിംഗിന്റെ പ്രധാന നേട്ടം എന്താണ്?", logicOptions: ["ഇന്റർനെറ്റ് വഴി ആവശ്യാനുസരണം വിഭവങ്ങൾ വർദ്ധിപ്പിക്കാം", "ഇന്റർനെറ്റ് ആവശ്യമില്ല", "സൗജന്യ ഹാർഡ്‌വെയർ", "വൈദ്യുതി ആവശ്യമില്ല"], logicAnswer: "ഇന്റർനെറ്റ് വഴി ആവശ്യാനുസരണം വിഭവങ്ങൾ വർദ്ധിപ്പിക്കാം" },
      'tech-3-7': { missionTitle: "ബൈനറി സെർച്ച്", story: "ബൈനറി സെർച്ചിന് ഡാറ്റ എങ്ങനെയായിരിക്കണം?", primaryConcept: "ബൈനറി സെർച്ച്", learningObjective: "ക്രമീകരിച്ച ഡാറ്റ ആവശ്യകത കാണുക.", missionObjective: "ആവശ്യകത കാണുക.", hint: "ഡാറ്റ ക്രമീകരിച്ചതായിരിക്കണം (Sorted).", feedbackIncorrect: "ഡാറ്റ ക്രമീകരിച്ചതായിരിക്കണം (Sorted).", logicPremise: "ബൈനറി സെർച്ചിന് ഡാറ്റ എങ്ങനെയായിരിക്കണം?", logicOptions: ["ക്രമീകരിച്ചതായിരിക്കണം (Sorted)", "ക്രമീകരിക്കാത്തത്", "ഏതെങ്കിലും രീതിയിൽ", "ശൂന്യമായിരിക്കണം"], logicAnswer: "ക്രമീകരിച്ചതായിരിക്കണം (Sorted)" },
      'math-3-8': { missionTitle: "ഫയർവോൾ സെക്യൂരിറ്റി", story: "നെറ്റ്വർക്ക് ഫയർവോളിന്റെ പ്രധാന ധർമ്മം എന്താണ്?", primaryConcept: "ഫയർവോൾ", learningObjective: "ഫയർവോൾ ധർമ്മം കാണുക.", missionObjective: "ധർമ്മം കാണുക.", hint: "അനുമതിയില്ലാത്ത പ്രവേശനം തടയും.", feedbackIncorrect: "അനുമതിയില്ലാത്ത നെറ്റ്വർക്ക് പ്രവേശനം തടയുന്നു.", logicPremise: "ഫയർവോൾ എന്താണ് ചെയ്യുന്നത്?", logicOptions: ["അനുമതിയില്ലാത്ത നെറ്റ്വർക്ക് പ്രവേശനം തടയുന്നു", "സെർവറുകൾ വൃത്തിയാക്കുന്നു", "വൈദ്യുതി ഉണ്ടാക്കുന്നു", "ഡാറ്റ സൂക്ഷിക്കുന്നു"], logicAnswer: "അനുമതിയില്ലാത്ത നെറ്റ്വർക്ക് പ്രവേശനം തടയുന്നു" },
      'tech-3-8': { missionTitle: "ഫയർവോൾ സെക്യൂരിറ്റി", story: "നെറ്റ്വർക്ക് ഫയർവോളിന്റെ പ്രധാന ധർമ്മം എന്താണ്?", primaryConcept: "ഫയർവോൾ", learningObjective: "ഫയർവോൾ ധർമ്മം കാണുക.", missionObjective: "ധർമ്മം കാണുക.", hint: "അനുമതിയില്ലാത്ത പ്രവേശനം തടയും.", feedbackIncorrect: "അനുമതിയില്ലാത്ത നെറ്റ്വർക്ക് പ്രവേശനം തടയുന്നു.", logicPremise: "ഫയർവോൾ എന്താണ് ചെയ്യുന്നത്?", logicOptions: ["അനുമതിയില്ലാത്ത നെറ്റ്വർക്ക് പ്രവേശനം തടയുന്നു", "സെർവറുകൾ വൃത്തിയാക്കുന്നു", "വൈദ്യുതി ഉണ്ടാക്കുന്നു", "ഡാറ്റ സൂക്ഷിക്കുന്നു"], logicAnswer: "അനുമതിയില്ലാത്ത നെറ്റ്വർക്ക് പ്രവേശനം തടയുന്നു" },
      'tech-3-9': { missionTitle: "Git കമാൻഡ്", story: "Git ൽ മാറ്റങ്ങൾ സേവ് ചെയ്യാൻ ഏത് കമാൻഡ് ഉപയോഗിക്കുന്നു?", primaryConcept: "Git പ്ലാറ്റ്‌ഫോം", learningObjective: "git commit കാണുക.", missionObjective: "കമാൻഡ് കാണുക.", hint: "git commit മാറ്റങ്ങൾ സേവ് ചെയ്യും.", feedbackIncorrect: "git commit മാറ്റങ്ങളുടെ കോപ്പി സേവ് ചെയ്യും.", logicPremise: "മാറ്റങ്ങൾ സേവ് ചെയ്യുന്ന Git കമാൻഡ് ഏതാണ്?", logicOptions: ["git commit", "git push", "git clone", "git init"], logicAnswer: "git commit" },
      'tech-3-10': {
        missionTitle: "സ്റ്റേജ് 3 ബോസ് — സിസ്റ്റംസ് മാസ്റ്ററി",
        story: "ഡാറ്റാബേസ് സംരക്ഷിക്കാൻ ഡാറ്റാ ഘടനകളും SQL ഉം Git ഉം സ്വായത്തമാക്കുക!",
        primaryConcept: "സാങ്കേതിക സ്റ്റേജ് 3 മാസ്റ്ററി",
        learningObjective: "SQL ഉം Git ഉം പ്രയോഗിക്കുക.",
        missionObjective: "4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "തത്വങ്ങൾ ഓർക്കുക.",
        feedbackIncorrect: "പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          { title: "സ്റ്റാക്ക് രീതി", description: "സ്റ്റാക്ക് LIFO യോ FIFO യോ?", instruction: "രീതി തിരഞ്ഞെടുക്കുക.", logicPremise: "സ്റ്റാക്ക് LIFO യോ FIFO യോ?", logicOptions: ["LIFO", "FIFO"], logicAnswer: "LIFO" },
          { title: "SQL കമാൻഡ്", description: "പുതിയ വരി ചേർക്കുന്ന SQL കമാൻഡ്?", instruction: "കമാൻഡ് തിരഞ്ഞെടുക്കുക.", logicPremise: "വരി ചേർക്കുന്ന കമാൻഡ്?", logicOptions: ["INSERT", "SELECT", "DROP", "ALTER"], logicAnswer: "INSERT" },
          { title: "സെക്യൂരിറ്റി", description: "പാസ്‌വേഡുകളെ സംരക്ഷിക്കുന്നത് ഏതാണ്?", instruction: "രീതി തിരഞ്ഞെടുക്കുക." },
          { title: "Git കമാൻഡ്", description: "റിമോട്ട് റിപ്പോസിറ്ററി കോപ്പി ചെയ്യുന്ന കമാൻഡ്?", instruction: "Git കമാൻഡ് തിരഞ്ഞെടുക്കുക.", logicPremise: "റിപ്പോസിറ്ററി കോപ്പി ചെയ്യുന്ന കമാൻഡ്?", logicOptions: ["git clone", "git status", "git branch", "git merge"], logicAnswer: "git clone" }
        ]
      },
      'tech-4-1': { missionTitle: "ബിഗ് ഒ നോട്ടേഷൻ (BIG O)", story: "അറേ സൂചിക arr[i] വഴി ഡാറ്റ എടുക്കാനുള്ള സമയ സങ്കീർണ്ണത എത്ര?", primaryConcept: "അൽഗോരിതം സങ്കീർണ്ണത", learningObjective: "O(1) സമയം തിരിച്ചറിയുക.", missionObjective: "സമയ സങ്കീർണ്ണത കാണുക.", hint: "സൂചിക വഴിയുള്ള പ്രവേശനം O(1) ആണ്.", feedbackIncorrect: "arr[i] വഴിയുള്ള പ്രവേശനം O(1) ആണ്.", logicPremise: "arr[i] വഴിയുള്ള പ്രവേശനത്തിന്റെ സമയ സങ്കീർണ്ണത എത്ര?", logicOptions: ["O(1)", "O(N)", "O(N²)", "O(log N)"], logicAnswer: "O(1)" },
      'tech-4-2': { missionTitle: "ന്യൂറൽ നെറ്റ്വർക്ക്", story: "ആർട്ടിഫിഷ്യൽ ന്യൂറൽ നെറ്റ്വർക്കിന്റെ അടിസ്ഥാന ഭാഗം എന്താണ്?", primaryConcept: "ന്യൂറൽ നെറ്റ്വർക്കുകൾ", learningObjective: "ന്യൂറോൺ തിരിച്ചറിയുക.", missionObjective: "ഭാഗം കാണുക.", hint: "ആർട്ടിഫിഷ്യൽ ന്യൂറോൺ (Perceptron / Neuron).", feedbackIncorrect: "Perceptron / Neuron ആണ് അടിസ്ഥാന ഭാഗം.", logicPremise: "ന്യൂറൽ നെറ്റ്വർക്കിന്റെ അടിസ്ഥാന ഭാഗം ഏതാണ്?", logicOptions: ["Perceptron / Neuron", "ട്രാൻസിസ്റ്റർ", "ഡാറ്റാബേസ് വരി", "CPU കോർ"], logicAnswer: "Perceptron / Neuron" },
      'tech-4-3': { missionTitle: "സൂപ്പർവൈസ്ഡ് ലേണിംഗ്", story: "Supervised ML ന് എത്തരം ഡാറ്റയാണ് ആവശ്യം?", primaryConcept: "മെഷീൻ ലേണിംഗ് (ML)", learningObjective: "ലേബൽ ചെയ്ത ഡാറ്റ ആവശ്യകത കാണുക.", missionObjective: "ആവശ്യകത കാണുക.", hint: "ലേബൽ ചെയ്ത (Labeled) ഡാറ്റ ആവശ്യമാണ്.", feedbackIncorrect: "ലേബൽ ചെയ്ത ഡാറ്റയാണ് ആവശ്യം.", logicPremise: "Supervised ML ന് എത്തരം ഡാറ്റ ആവശ്യമാണ്?", logicOptions: ["ലേബൽ ചെയ്ത ഡാറ്റ (Labels)", "ലേബൽ ഇല്ലാത്ത ഡാറ്റ", "വെറും ശബ്ദം", "ക്രമീകരിക്കാത്ത ടെക്സ്റ്റ്"], logicAnswer: "ലേബൽ ചെയ്ത ഡാറ്റ (Labels)" },
      'tech-4-4': { missionTitle: "ഡോക്കർ കന്റെയ്നറുകൾ (DOCKER)", story: "ഡോക്കർ (Docker) കന്റെയ്നറുകളുടെ പ്രധാന നേട്ടം എന്താണ്?", primaryConcept: "കന്റെയ്നറൈസേഷൻ (Docker)", learningObjective: "ഡോക്കർ നേട്ടങ്ങൾ കാണുക.", missionObjective: "നേട്ടം കാണുക.", hint: "എല്ലാ സിസ്റ്റത്തിലും ഒരുപോലെ പ്രവർത്തിക്കും.", feedbackIncorrect: "എല്ലാ സിസ്റ്റത്തിലും ഒരുപോലെ പ്രവർത്തിക്കും.", logicPremise: "Docker കന്റെയ്നറുകളുടെ പ്രധാന നേട്ടം എന്താണ്?", logicOptions: ["എല്ലാ സിസ്റ്റത്തിലും ഒരുപോലെ ആപ്പ് പ്രവർത്തിക്കും", "സ്ക്രീൻ റെസല്യൂഷൻ കൂട്ടും", "CPU മാറ്റും", "പഴയ കോഡ് മായ്ക്കും"], logicAnswer: "എല്ലാ സിസ്റ്റത്തിലും ഒരുപോലെ ആപ്പ് പ്രവർത്തിക്കും" },
      'tech-4-5': { missionTitle: "അസിൻക്രണസ് പ്രോമിസ്", story: "JS ൽ അസിൻക്രണസ് പ്രവർത്തനങ്ങൾ കൈകാര്യം ചെയ്യുന്ന ഒബ്ജക്റ്റ് ഏതാണ്?", primaryConcept: "Async JavaScript", learningObjective: "Promise തിരിച്ചറിയുക.", missionObjective: "ഒബ്ജക്റ്റ് കാണുക.", hint: "Promise ഒബ്ജക്റ്റാണ് ഉപയോഗിക്കുന്നത്.", feedbackIncorrect: "Promise ഒബ്ജക്റ്റാണ് ഉപയോഗിക്കുന്നത്.", logicPremise: "JS ൽ async പ്രവർത്തനങ്ങൾക്ക് ഉപയോഗിക്കുന്ന ഒബ്ജക്റ്റ് ഏതാണ്?", logicOptions: ["Promise", "String", "Loop", "Math"], logicAnswer: "Promise" },
      'tech-4-6': { missionTitle: "മൈക്രോസർവീസസ്", story: "മൈക്രോസർവീസസ് ആർക്കിടെക്ചർ ആപ്ലിക്കേഷനെ എങ്ങനെ വിഭജിക്കുന്നു?", primaryConcept: "സോഫ്റ്റ്‌വെയർ ആർക്കിടെക്ചർ", learningObjective: "മൈക്രോസർവീസസ് ഘടന കാണുക.", missionObjective: "ഘടന കാണുക.", hint: "ചെറിയ സ്വതന്ത്ര സർവീസുകളായി വിഭജിക്കുന്നു.", feedbackIncorrect: "ചെറിയ സ്വതന്ത്ര സർവീസുകളായി വിഭജിക്കുന്നു.", logicPremise: "Microservices ആർക്കിടെക്ചർ ആപ്ലിക്കേഷനെ എങ്ങനെ വിഭജിക്കുന്നു?", logicOptions: ["ചെറിയ സ്വതന്ത്ര സർവീസുകളായി (Independent services)", "ഒറ്റ വലിയ ഫയലായി", "ഡാറ്റാബേസ് ടേബിളുകളായി മാത്രം", "HTML ടാഗുകളായി"], logicAnswer: "ചെറിയ സ്വതന്ത്ര സർവീസുകളായി (Independent services)" },
      'tech-4-7': { missionTitle: "DNS സേവനം", story: "ഇന്റർനെറ്റിൽ DNS ന്റെ പ്രധാന ധർമ്മം എന്താണ്?", primaryConcept: "DNS പ്രോട്ടോക്കോൾ", learningObjective: "ഡൊമൈൻ പേര് IP ആക്കുന്ന ധർമ്മം കാണുക.", missionObjective: "ധർമ്മം കാണുക.", hint: "ഡൊമൈൻ പേരുകളെ IP വിലാസങ്ങളാക്കി മാറ്റുന്നു.", feedbackIncorrect: "ഡൊമൈൻ പേരുകളെ IP വിലാസങ്ങളാക്കി മാറ്റുന്നു.", logicPremise: "DNS എന്താണ് ചെയ്യുന്നത്?", logicOptions: ["ഡൊമൈൻ പേരുകളെ IP വിലാസങ്ങളാക്കി മാറ്റുന്നു", "ചിത്രങ്ങൾ ചെറുതാക്കുന്നു", "റൂട്ടറുകൾ പ്രവർത്തിപ്പിക്കുന്നു", "കണക്കുകൾ കൂട്ടുന്നു"], logicAnswer: "ഡൊമൈൻ പേരുകളെ IP വിലാസങ്ങളാക്കി മാറ്റുന്നു" },
      'tech-4-8': { missionTitle: "ഗാർബേജ് കളക്ഷൻ", story: "ഗാർബേജ് കളക്ഷൻ (Garbage Collection) എന്താണ് ചെയ്യുന്നത്?", primaryConcept: "മെമ്മറി മാനേജ്‌മെന്റ്", learningObjective: "മെമ്മറി വീണ്ടെടുക്കൽ കാണുക.", missionObjective: "ധർമ്മം കാണുക.", hint: "ഉപയോഗിക്കാത്ത മെമ്മറി സ്വയം ഒഴിവാക്കുന്നു.", feedbackIncorrect: "ഉപയോഗിക്കാത്ത മെമ്മറി സ്വയം ഒഴിവാക്കുന്നു.", logicPremise: "Garbage Collection ന്റെ ധർമ്മം എന്താണ്?", logicOptions: ["ഉപയോഗിക്കാത്ത മെമ്മറി സ്വയം ഒഴിവാക്കുക", "മെയിലുകൾ മായ്ക്കുക", "കമ്പ്യൂട്ടർ റീസ്റ്റാർട്ട് ചെയ്യുക", "കോഡ് C ആക്കുക"], logicAnswer: "ഉപയോഗിക്കാത്ത മെമ്മറി സ്വയം ഒഴിവാക്കുക" },
      'tech-4-9': { missionTitle: "ലോഡ് ബാലൻസർ", story: "ലോഡ് ബാലൻസർ (Load Balancer) എന്താണ് ചെയ്യുന്നത്?", primaryConcept: "സിസ്റ്റം സ്കേലബിലിറ്റി", learningObjective: "ട്രാഫിക് വിഭജനം കാണുക.", missionObjective: "ധർമ്മം കാണുക.", hint: "വരുന്ന ട്രാഫിക്കിനെ പല സെർവറുകളിലേക്ക് വിഭജിക്കുന്നു.", feedbackIncorrect: "വരുന്ന ട്രാഫിക്കിനെ പല സെർവറുകളിലേക്ക് വിഭജിക്കുന്നു.", logicPremise: "Load Balancer എന്താണ് ചെയ്യുന്നത്?", logicOptions: ["വരുന്ന ട്രാഫിക്കിനെ പല സെർവറുകളിലേക്ക് വിഭജിക്കുന്നു", "ഹാർഡ് ഡിസ്ക് എൻക്രിപ്റ്റ് ചെയ്യുന്നു", "ബ്രൈറ്റ്‌നസ് മാറ്റുന്നു", "ഡാറ്റാ ബാക്കപ്പ് എടുക്കുന്നു"], logicAnswer: "വരുന്ന ട്രാഫിക്കിനെ പല സെർവറുകളിലേക്ക് വിഭജിക്കുന്നു" },
      'tech-4-10': {
        missionTitle: "സ്റ്റേജ് 4 ബോസ് — സർക്യൂട്ട് സ്റ്റോൺ മാസ്റ്ററി",
        story: "അവസാന സാങ്കേതിക പരീക്ഷണം! സർക്യൂട്ട് സ്റ്റോൺ സ്വന്തമാക്കാൻ നിങ്ങളുടെ എല്ലാ സാങ്കേതിക അറിവുകളും ഉപയോഗിക്കുക!",
        primaryConcept: "സാങ്കേതിക സ്റ്റേജ് 4 സമ്പൂർണ്ണ മാസ്റ്ററി",
        learningObjective: "സാങ്കേതിക ആശയങ്ങൾ പൂർണ്ണമായി സ്വായത്തമാക്കുക.",
        missionObjective: "4 ഘട്ടങ്ങളും പൂർത്തിയാക്കുക.",
        hint: "സമ്പൂർണ്ണ അറിവ് പ്രയോഗിക്കുക.",
        feedbackIncorrect: "പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ!",
        phases: [
          { title: "ബിഗ് ഒ പരിശോധന", description: "ലീനിയർ സെർച്ചിന്റെ സമയ സങ്കീർണ്ണത?", instruction: "ബിഗ് ഒ കാണുക.", logicPremise: "ലീനിയർ സെർച്ചിന്റെ സമയ സങ്കീർണ്ണത?", logicOptions: ["O(1)", "O(N)", "O(N²)", "O(log N)"], logicAnswer: "O(N)" },
          { title: "കന്റെയ്നറൈസേഷൻ", description: "ആപ്പ് കോഡ് പാക്ക് ചെയ്യുന്ന സാങ്കേതികവിദ്യ?", instruction: "ടൂൾ തിരഞ്ഞെടുക്കുക.", logicPremise: "പ്രസിദ്ധമായ കന്റെയ്നർ ടൂൾ ഏതാണ്?", logicOptions: ["Docker", "Paint", "Excel", "Calculator"], logicAnswer: "Docker" },
          { title: "DNS സെർച്ച്", description: "ഡൊമൈൻ പേരുകളെ IP വിലാസങ്ങളാക്കുന്ന സേവനം.", instruction: "സേവനം കാണുക." },
          { title: "ലോഡ് ബാലൻസർ", description: "ട്രാഫിക്കിനെ പല സെർവറുകളിലേക്ക് വിഭജിക്കുന്നത്.", instruction: "ഘടകം കാണുക.", logicPremise: "ട്രാഫിക് വിഭജിക്കുന്നത് ഏതാണ്?", logicOptions: ["Load Balancer", "Keyboard", "Graphics Card", "Sound Card"], logicAnswer: "Load Balancer" }
        ]
      }
    },
    fragments: { f1: "സാങ്കേതിക കഷ്ണം 1", f2: "സാങ്കേതിക കഷ്ണം 2", f3: "സാങ്കേതിക കഷ്ണം 3", f4: "സാങ്കേതിക കഷ്ണം 4", acquired: "സർക്യൂട്ട് സ്റ്റോൺ കഷ്ണം സ്വന്തമാക്കി!", desc: "നിങ്ങൾ സർക്യൂട്ട് സ്റ്റോണിന്റെ ഒരു ഭാഗം സ്വന്തമാക്കി." },
    stone: { title: "സർക്യൂട്ട് സ്റ്റോൺ", acquired: "സർക്യൂട്ട് സ്റ്റോൺ സ്വന്തമാക്കി!", desc: "നിങ്ങൾ സാങ്കേതിക പാതയിൽ പൂർണ്ണ മാസ്റ്ററി നേടുകയും ഡിജിറ്റൽ സിസ്റ്റങ്ങൾ തിരിച്ചറിയുകയും ചെയ്തു." },
    achievements: {
      initiate: { title: "സാങ്കേതിക തുടക്കക്കാരൻ", desc: "സാങ്കേതിക വിഭാഗത്തിന്റെ സ്റ്റേജ് 1 പൂർത്തിയാക്കി." },
      physics: { title: "പ്രോഗ്രാമർ (Programmer)", desc: "വേരിയബിളുകൾ, ലൂപ്പുകൾ എന്നിവയിൽ മാസ്റ്ററി നേടി." },
      chemistry: { title: "സർക്യൂട്ട് അന്വേഷകൻ", desc: "ഡിജിറ്റൽ ലോജിക്, ഹാർഡ്‌വെയർ എന്നിവയിൽ മാസ്റ്ററി നേടി." },
      biology: { title: "ഡിബഗ്ഗർ (Debugger)", desc: "ഡാറ്റാ ഘടനകൾ, സെക്യൂരിറ്റി എന്നിവയിൽ മാസ്റ്ററി നേടി." },
      master: { title: "സാങ്കേതിക മാസ്റ്റർ", desc: "എല്ലാ 40 സാങ്കേതിക ലെവലുകളും പൂർത്തിയാക്കി സർക്യൂട്ട് സ്റ്റോൺ അസംബിൾ ചെയ്തു!" }
    }
  }
};
