// ============================================================
// S.H.I.E.L.D. Platform — Subject-Specific Chatbot AI Engine
// Educational Doubt-Solving & Guided Hints Generator
// Supports 4 STEM Domains: Science, Technology, Engineering, Math
// Languages: English (en), Tamil (ta), Hindi (hi), Malayalam (ml)
// ============================================================

export interface ChatbotContext {
  domainId: 'science' | 'technology' | 'engineering' | 'mathematics';
  domainName: string;
  stage: number;
  missionNumber: number;
  missionTitle: string;
  primaryConcept: string;
  objective?: string;
  questionText?: string;
  submittedAnswer?: string | null;
  isCorrect?: boolean | null;
  language: string;
}

/**
 * Gets a contextual initial greeting message for the current domain.
 */
export function getInitialGreeting(domainId: string, language: string): string {
  const lang = language.toLowerCase();
  
  if (lang.startsWith('ta')) {
    switch (domainId) {
      case 'science':
        return "வணக்கம் ஏஜென்ட்! நான் உங்கள் SHIELD அறிவியல் உதவியாளர். இயற்கை விதிகள், வேதியியல் மற்றும் இயற்பியல் பற்றிய சந்தேகங்களைக் கேளுங்கள்!";
      case 'technology':
        return "வணக்கம்! நான் உங்கள் SHIELD தொழில்நுட்ப உதவியாளர். கோடிங், பைனரி எண்கள் மற்றும் தொழில்நுட்ப மிஷன்களில் உதவ தயார்!";
      case 'engineering':
        return "நல்வரவு ஏஜென்ட்! நான் உங்கள் SHIELD பொறியியல் உதவியாளர். அமைப்புகள், பாலங்கள் மற்றும் வடிவமைப்பு பற்றி கேளுங்கள்!";
      case 'mathematics':
        return "வணக்கம் ஏஜென்ட்! நான் உங்கள் SHIELD கணித உதவியாளர். வடிவங்கள், சமன்பாடுகள் மற்றும் எண்களைத் தீர்க்க உதவ தயார்!";
      default:
        return "வணக்கம் ஏஜென்ட்! SHIELD AI உதவியாளர் தயாராக உள்ளது.";
    }
  }

  if (lang.startsWith('hi')) {
    switch (domainId) {
      case 'science':
        return "नमस्ते एजेंट! मैं आपका SHIELD विज्ञान सहायक हूँ। प्राकृतिक नियमों, रासायनिक प्रतिक्रियाओं और भौतिकी के प्रश्नों के लिए तैयार!";
      case 'technology':
        return "नमस्ते! मैं आपका SHIELD प्रौद्योगिकी सहायक हूँ। कोडिंग, बाइनरी नंबर और तकनीकी मिशनों में मदद के लिए तैयार!";
      case 'engineering':
        return "स्वागत है एजेंट! मैं आपका SHIELD इंजीनियरिंग सहायक हूँ। संरचनाओं, भार वितरण और डिजाइन सिद्धांतों के बारे में पूछें।";
      case 'mathematics':
        return "नमस्ते एजेंट! मैं आपका SHIELD गणित सहायक हूँ। पैटर्न, समीकरणों और तार्किक पहेलियों को हल करने के लिए तैयार!";
      default:
        return "नमस्ते एजेंट! SHIELD AI सहायक तैयार है।";
    }
  }

  if (lang.startsWith('ml')) {
    switch (domainId) {
      case 'science':
        return "നമസ്കാരം ഏജന്റ്! ഞാൻ നിങ്ങളുടെ SHIELD സയൻസ് അസിസ്റ്റന്റ് ആണ്. സയൻസ് സംശയങ്ങളും പരീക്ഷണങ്ങളും ചോദിക്കാം!";
      case 'technology':
        return "ഹലോ! ഞാൻ നിങ്ങളുടെ SHIELD ടെക്നോളജി അസിസ്റ്റന്റ് ആണ്. കോഡിംഗ്, ബൈനറി സംശയങ്ങൾ ചോദിക്കാം!";
      case 'engineering':
        return "സ്വാഗതം ഏജന്റ്! ഞാൻ നിങ്ങളുടെ SHIELD എൻജിനീയറിംഗ് അസിസ്റ്റന്റ് ആണ്. നിർമ്മാണ തത്വങ്ങൾ ചോദിക്കാം.";
      case 'mathematics':
        return "ഹലോ ഏജന്റ്! ഞാൻ നിങ്ങളുടെ SHIELD മാത്തമാറ്റിക്സ് അസിസ്റ്റന്റ് ആണ്. സമവാക്യങ്ങൾ നിർദ്ധാരണം ചെയ്യാൻ സഹായിക്കാം!";
      default:
        return "നമസ്കാരം ഏജന്റ്! SHIELD AI തയ്യാറാണ്.";
    }
  }

  // Default English
  switch (domainId) {
    case 'science':
      return "Greetings, Agent! I'm your SHIELD Science Assistant. Ask me any doubt about physics, chemistry, biology, or your current mission!";
    case 'technology':
      return "Hi! I'm your SHIELD Technology Assistant. Ask me anything about programming, logic gates, binary numbers, CPUs, or tech missions!";
    case 'engineering':
      return "Welcome to the Forge, Agent! I'm your SHIELD Engineering Assistant. Ask me about load distribution, structural integrity, mechanisms, or design principles.";
    case 'mathematics':
      return "Hello Agent! I'm your SHIELD Math Assistant. Ask me to solve equations, explain formulas, or guide you through mathematical steps.";
    default:
      return "Greetings Agent! SHIELD AI Assistant is online and synchronized with your mission parameters.";
  }
}

/**
 * Generates an educational, context-aware AI response based on student input.
 */
export function generateAIResponse(userQuery: string, ctx: ChatbotContext): string {
  const query = userQuery.trim().toLowerCase();
  const lang = ctx.language.toLowerCase();

  // 1. Rejections for non-STEM questions
  const nonStemPatterns = [
    /tell me a joke/i,
    /who is the president/i,
    /what movie should i watch/i,
    /who won the match/i,
    /tell me a story/i,
    /sing a song/i,
  ];

  if (nonStemPatterns.some((pattern) => pattern.test(query))) {
    return "I'm designed to help with STEM questions. Please ask me something about Science, Technology, Engineering, or Mathematics.";
  }

  // 2. Direct Math Calculations
  const mulMatch = query.match(/(\d+)\s*[\*x×]\s*(\d+)/i);
  if (mulMatch) {
    const a = parseInt(mulMatch[1], 10);
    const b = parseInt(mulMatch[2], 10);
    const result = a * b;
    return `${a} × ${b} = ${result}.

Calculation:
${a} × ${b} = (${Math.floor(a/10)*10} × ${b}) + (${a % 10} × ${b})
= ${Math.floor(a/10)*10 * b} + ${(a % 10) * b}
= ${result}.`;
  }

  // 3. Factual Direct Answers for Common STEM Queries
  if (query.includes('photosynthesis')) {
    return `Photosynthesis is the process by which green plants, algae, and some bacteria use sunlight, carbon dioxide, and water to produce glucose (food) and oxygen.

Formula:
6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂

It takes place in the chloroplasts of plant cells using the green pigment chlorophyll.`;
  }

  if (query.includes('newton') && (query.includes('second') || query.includes('2nd') || query.includes('f=ma'))) {
    return `Newton's second law states that force equals mass multiplied by acceleration:

F = ma

This means increasing the mass or acceleration of an object requires more force. For example, pushing a heavy truck requires significantly more force than pushing a bicycle to reach the same acceleration.`;
  }

  if (query.includes('rocket')) {
    return `A rocket is a vehicle that propels itself forward by expelling high-speed gases in the opposite direction.

Principle:
It works according to Newton's third law of motion (action and reaction). Because rockets carry their own fuel and oxidizer, they can generate thrust in the vacuum of space without needing atmospheric air.`;
  }

  if (query.includes('computer') || query.includes('cpu')) {
    return `A CPU (Central Processing Unit) executes instructions and performs calculations required for a computer to run programs.

How it works:
It repeatedly carries out a 3-step cycle:
1. Fetch: Retrieve the instruction from system memory.
2. Decode: Interpret what operation needs to be performed.
3. Execute: Perform the arithmetic or logical calculation.`;
  }

  if (query.includes('ice float') || query.includes('water density')) {
    return `Ice floats on water because liquid water expands when it freezes, making ice less dense than liquid water.

Explanation:
As water cools below 4°C, hydrogen bonds organize water molecules into an open crystalline structure. This lattice occupies more space for the same mass, decreasing density.`;
  }

  if (query.includes('ohm')) {
    return `Ohm's Law states that electrical current is directly proportional to voltage and inversely proportional to resistance.

Formula:
V = I × R
(Voltage = Current × Resistance)

Example: For a 12V supply across a 4Ω resistor, Current I = 12 / 4 = 3 Amperes.`;
  }

  if (query.includes('algorithm')) {
    return `An algorithm is a step-by-step procedure or set of rules designed to solve a problem or complete a task.

Example:
A recipe for baking bread or sorting a list of numbers from smallest to largest in computer code is an algorithm.`;
  }

  // 4. Mission Contextual Answers & Hints
  const isAskingForHint =
    query.includes('hint') ||
    query.includes('stuck') ||
    query.includes('help') ||
    query.includes('குறிப்பு') ||
    query.includes('संकेत') ||
    query.includes('സൂചന');

  if (isAskingForHint) {
    if (lang.startsWith('ta')) {
      return `💡 குறிப்பு: "${ctx.primaryConcept}" என்ற விதியைப் பயன்படுத்துங்கள். இலக்கு: ${ctx.objective || 'சரியான அமைப்பைத் தேர்ந்தெடுங்கள்'}.`;
    }
    if (lang.startsWith('hi')) {
      return `💡 संकेत: अवधारणा "${ctx.primaryConcept}" का प्रयोग करें। लक्ष्य: ${ctx.objective || 'सही विकल्प चुनें'}।`;
    }
    if (lang.startsWith('ml')) {
      return `💡 സൂചന: "${ctx.primaryConcept}" എന്ന തത്വം ഓർക്കുക. ലക്ഷ്യം: ${ctx.objective || 'ശരിയായ ഉത്തരം കണ്ടെത്തൂ'}.`;
    }

    return `💡 Strategic Hint for Mission ${ctx.missionNumber}:
Focus on "${ctx.primaryConcept}".
Goal: ${ctx.objective || 'Solve the active puzzle module'}.`;
  }

  // 5. Default STEM Concept Answer (Direct explanation)
  if (lang.startsWith('ta')) {
    return `${ctx.primaryConcept} என்பது ${ctx.domainName} துறையின் முக்கியமான கோட்பாடாகும்.
இலக்கு: ${ctx.objective || 'கேள்வியை ஆய்வு செய்து சரியான அமைப்பைத் தேர்வு செய்யவும்'}.`;
  }
  if (lang.startsWith('hi')) {
    return `${ctx.primaryConcept} ${ctx.domainName} का एक मुख्य सिद्धांत है।
लक्ष्य: ${ctx.objective || 'प्रश्नों का विश्लेषण करें और सही उत्तर चुनें'}।`;
  }

  return `${ctx.primaryConcept} is a foundational principle in ${ctx.domainName} (Stage ${ctx.stage}, Mission ${ctx.missionNumber}).

Explanation:
${ctx.objective ? `Mission Goal: ${ctx.objective}. ` : ''}Analyze the input parameters and apply the core laws of ${ctx.domainName} to complete your objective!`;
}
