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
      return "Greetings, Agent! I'm your SHIELD Science Assistant. Ready to explore natural laws, chemical reactions, and physics concepts. Ask me anything about your current mission!";
    case 'technology':
      return "Hi! I'm your SHIELD Technology Assistant. I'm here to help you understand coding, logic gates, binary numbers, and tech missions. Ask me anything you're stuck on!";
    case 'engineering':
      return "Welcome to the Forge, Agent! I'm your SHIELD Engineering Assistant. Ask me about load distribution, structural integrity, beam materials, or design principles.";
    case 'mathematics':
      return "Hello Agent! I'm your SHIELD Math Assistant. Ready to analyze patterns, solve equations, calculate growth ratios, or decode logical ciphers with you.";
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
  const isDirectAnswerRequest = 
    query.includes('what is the answer') ||
    query.includes('tell me the answer') ||
    query.includes('give me the answer') ||
    query.includes('answer please') ||
    query.includes('what\'s the answer') ||
    query.includes('விடை என்ன') ||
    query.includes('उत्तर क्या है') ||
    query.includes('ഉത്തരം എന്താണ്');

  const isAskingForHint =
    query.includes('hint') ||
    query.includes('stuck') ||
    query.includes('help') ||
    query.includes('குறிப்பு') ||
    query.includes('संकेत') ||
    query.includes('സൂചന');

  const isAskingStepByStep =
    query.includes('step') ||
    query.includes('how to solve') ||
    query.includes('explain step') ||
    query.includes('படி') ||
    query.includes('चरण') ||
    query.includes('ഘട്ടം');

  const isAskingWhyWrong =
    query.includes('wrong') ||
    query.includes('failed') ||
    query.includes('incorrect') ||
    query.includes('কেন') ||
    query.includes('ஏன்') ||
    query.includes('क्यों') ||
    query.includes('എന്തുകൊണ്ട്');

  // Handle direct answer requests by guiding step-by-step first
  if (isDirectAnswerRequest) {
    if (lang.startsWith('ta')) {
      return `நேரடியாக விடையைக் கூறுவதை விட, நாம் சேர்ந்து அதைத் தீர்ப்போம்! 
உங்கள் தற்போதைய கருத்து: "${ctx.primaryConcept}".
படி 1: கேள்வியின் முக்கியத் தகவலை கவனியுங்கள்: "${ctx.questionText || ctx.objective || 'மிஷன் இலக்கு'}".
படி 2: ஒவ்வொரு தேர்வின் விளைவையும் யோசித்துச் சரிபாருங்கள். நீங்கள் எதை முயற்சி செய்ய விரும்புகிறீர்கள்?`;
    }
    if (lang.startsWith('hi')) {
      return `सीधे उत्तर देने के बजाय, आइए इसे मिलकर हल करें! 
आपकी वर्तमान अवधारणा: "${ctx.primaryConcept}"।
चरण 1: प्रश्न की मुख्य जानकारी देखें: "${ctx.questionText || ctx.objective || 'मिशन लक्ष्य'}"।
चरण 2: विकल्पों का विश्लेषण करें। आपको कौन सा विकल्प सही लगता है?`;
    }
    if (lang.startsWith('ml')) {
      return `നേരിട്ട് ഉത്തരം നൽകുന്നതിന് പകരം നമുക്ക് ഒന്നിച്ച് ഇത് നിർദ്ധാരണം ചെയ്യാം! 
വിഷയം: "${ctx.primaryConcept}".
ഘട്ടം 1: പ്രധാന ചോദ്യം ശ്രദ്ധിക്കൂ: "${ctx.questionText || ctx.objective || 'മിഷൻ ലക്ഷ്യം'}".
ഘട്ടം 2: ഓരോ ഓപ്ഷനും പരിശോധിക്കൂ. ഏതാണ് ശരി എന്ന് തോന്നുന്നത്?`;
    }

    // English
    if (ctx.domainId === 'technology') {
      return `Let's solve Mission ${ctx.missionNumber} step-by-step instead of just giving the answer!
Current Concept: ${ctx.primaryConcept}.
Hint: Remember that binary positions from right to left represent powers of 2 (1, 2, 4, 8...). 
Count which positions have 1s and add their values together. What sum do you get?`;
    }
    if (ctx.domainId === 'science') {
      return `Let's work through Mission ${ctx.missionNumber} together!
Concept: ${ctx.primaryConcept}.
Think about how changing the variables affects equilibrium. What happens when heat or catalyst ratio increases? Try adjusting one variable at a time!`;
    }
    if (ctx.domainId === 'engineering') {
      return `Engineering is about testing and iteration!
Concept: ${ctx.primaryConcept}.
Consider the stress distribution across the bridge span. Steel trusses handle heavy tension while carbon cables anchor load points. Which beam placement stabilizes the center?`;
    }
    if (ctx.domainId === 'mathematics') {
      return `Let's unlock the mathematical pattern together!
Concept: ${ctx.primaryConcept}.
Look at the progression of terms. Identify the constant ratio or addition rule between consecutive numbers. What rule transforms term 1 into term 2?`;
    }
  }

  // Handle Hint Requests
  if (isAskingForHint) {
    if (lang.startsWith('ta')) {
      return `💡 குறிப்பு: "${ctx.primaryConcept}" என்ற விதியைப் பயன்படுத்துங்கள். இலக்கு: ${ctx.objective || 'சரியான அமைப்பைத் தேர்ந்தெடுங்கள்'}. ஒவ்வொன்றாக சோதித்துப் பாருங்கள்!`;
    }
    if (lang.startsWith('hi')) {
      return `💡 संकेत: अवधारणा "${ctx.primaryConcept}" का प्रयोग करें। लक्ष्य: ${ctx.objective || 'सही विकल्प चुनें'}। एक-एक करके प्रयास करें!`;
    }
    if (lang.startsWith('ml')) {
      return `💡 സൂചന: "${ctx.primaryConcept}" എന്ന തത്വം ഓർക്കുക. ലക്ഷ്യം: ${ctx.objective || 'ശരിയായ ഉത്തരം കണ്ടെത്തൂ'}.`;
    }

    return `💡 Strategic Hint for Mission ${ctx.missionNumber}:
Focus on "${ctx.primaryConcept}".
Goal: ${ctx.objective || 'Solve the active puzzle'}.
Try isolating one variable/step at a time to verify the pattern before submitting!`;
  }

  // Handle Step-by-step explanation requests
  if (isAskingStepByStep) {
    return `🔍 Step-by-Step Breakdown for ${ctx.domainName} Stage ${ctx.stage} Mission ${ctx.missionNumber}:
1️⃣ Concept Focus: ${ctx.primaryConcept}.
2️⃣ Mission Objective: ${ctx.objective || 'Complete the active module'}.
3️⃣ Approach:
   • Analyze the input parameter / sequence.
   • Apply the fundamental rule of ${ctx.domainName}.
   • Select or enter the matching value and click 'Check My Answer'.`;
  }

  // Handle "Why is my answer wrong?" requests
  if (isAskingWhyWrong) {
    if (ctx.submittedAnswer) {
      return `❓ Analysis of Submitted Answer ("${ctx.submittedAnswer}"):
In ${ctx.domainName} (${ctx.primaryConcept}), your chosen answer did not satisfy the operational requirement.
Check the constraint in "${ctx.objective || 'the mission briefing'}" and try re-evaluating with the core rule!`;
    }
    return `❓ If your answer was incorrect, don't worry! In S.H.I.E.L.D., failure is just data. Review the concept "${ctx.primaryConcept}" and try adjusting your parameters.`;
  }

  // Domain-specific keyword responses
  if (ctx.domainId === 'technology') {
    if (query.includes('binary') || query.includes('bit') || query.includes('byte')) {
      return `💻 Binary System Insight:
Binary uses base-2 numbers consisting of only 0s and 1s.
• Position 0 (rightmost): 2⁰ = 1
• Position 1: 2¹ = 2
• Position 2: 2² = 4
• Position 3: 2³ = 8
For example, binary 1010 = 8 + 0 + 2 + 0 = 10 in decimal!`;
    }
    if (query.includes('loop') || query.includes('repeat')) {
      return `🔁 Loops in Technology:
A loop repeats a set of instructions until a condition is met. REPEAT(2) executes the enclosed commands twice in sequence!`;
    }
    if (query.includes('drone') || query.includes('grid') || query.includes('coordinate')) {
      return `📍 Drone Navigation:
Check your current coordinates (x, y) vs target coordinates! Avoid ⚠️ obstacles by stepping around them using NAV controls.`;
    }
  }

  if (ctx.domainId === 'science') {
    if (query.includes('variable') || query.includes('pressure') || query.includes('heat') || query.includes('catalyst')) {
      return `🧪 Scientific Variables:
• Independent Variable: The factor you change (e.g. Heat or Pressure).
• Dependent Variable: The outcome you measure (e.g. Reactor Stability).
Keep controls steady while adjusting one variable at a time!`;
    }
    if (query.includes('ph') || query.includes('acid') || query.includes('base') || query.includes('crystal')) {
      return `🔬 pH & Resonance:
pH measures acidity (1-6) or alkalinity (8-14). Neutral pH is 7. Combine pH balance with matching light wavelength to heal the crystal!`;
    }
  }

  if (ctx.domainId === 'engineering') {
    if (query.includes('truss') || query.includes('beam') || query.includes('bridge') || query.includes('load')) {
      return `⚙️ Engineering Structural Integrity:
• Wood Beams: Lightweight, low cost, moderate support.
• Steel Trusses: Heavy duty, distributes weight across triangular links.
• Carbon Cables: High tension anchors for wide spans.
Balance budget vs load stress!`;
    }
  }

  if (ctx.domainId === 'mathematics') {
    if (query.includes('fibonacci') || query.includes('sequence') || query.includes('pattern')) {
      return `📐 Mathematical Patterns:
In a Fibonacci sequence, each term is the sum of the previous two terms: 1, 1, 2, 3, 5, 8, 13, 21...
Check if the sequence adds preceding values or multiplies by a constant ratio!`;
    }
    if (query.includes('scale') || query.includes('equation') || query.includes('balance')) {
      return `⚖️ Algebraic Scale Balance:
Whatever operation you apply to the left side of the scale must equal the right side to keep equilibrium!`;
    }
  }

  // General fallback response encouraging learning
  if (lang.startsWith('ta')) {
    return `நான் உங்கள் கேள்வியைப் புரிந்து கொண்டேன்! "${ctx.primaryConcept}" என்ற கருத்தில் மிஷன் ${ctx.missionNumber}-க்கு உதவி பெற விரும்புகிறீர்கள். 
குறிப்பிட்ட சந்தேகங்கள், குறிப்புகள் அல்லது படிபடியான விளக்கங்கள் தேவைப்பட்டால் எனக்குத் தெரியப்படுத்துங்கள்!`;
  }
  if (lang.startsWith('hi')) {
    return `मैंने आपका प्रश्न समझा! आप मिशन ${ctx.missionNumber} और अवधारणा "${ctx.primaryConcept}" पर सहायता चाहते हैं। 
विशिष्ट प्रश्नों, संकेतों या चरण-दर-चरण स्पष्टीकरण के लिए बेझिझक पूछें!`;
  }
  if (lang.startsWith('ml')) {
    return `നിങ്ങളുടെ ചോദ്യം മനസ്സിലായി! വിഷയം: "${ctx.primaryConcept}". 
സൂചനകൾക്കോ കൂടുതൽ വിശദീകരണങ്ങൾക്കോ ചോദിക്കാം!`;
  }

  return `I'm analyzing your query regarding Mission ${ctx.missionNumber} (${ctx.primaryConcept}) in ${ctx.domainName}.
You can ask me to:
• "Explain ${ctx.primaryConcept}"
• "Give me a hint"
• "Explain step by step"
• "Why is my answer wrong?"
How would you like to proceed, Agent?`;
}
