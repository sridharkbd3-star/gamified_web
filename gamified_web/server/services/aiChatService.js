// ============================================================
// S.H.I.E.L.D. Platform — Server-Side AI Chat & Web Search Integration
// Handles intent detection, web search execution, educational answer synthesis
// ============================================================

import { performWebSearch, SearchResultItem } from './webSearchService.js';

export interface ChatRequestPayload {
  message: string;
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

export interface ChatResponsePayload {
  success: boolean;
  reply: string;
  searchedWeb: boolean;
  searchQuery?: string;
  sources?: { title: string; url: string; domain: string }[];
}

/**
 * Main AI Chat Processor with Web Search Integration
 */
export async function processChatRequest(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
  const {
    message,
    domainId,
    domainName,
    stage,
    missionNumber,
    missionTitle,
    primaryConcept,
    objective,
    questionText,
    submittedAnswer,
    isCorrect,
    language = 'en',
  } = payload;

  const userQuery = (message || '').trim();
  if (!userQuery) {
    return {
      success: false,
      reply: 'Agent, please enter a valid query.',
      searchedWeb: false,
    };
  }

  // 1. Determine if web search is needed
  const shouldSearchWeb = checkIfWebSearchNeeded(userQuery);

  let searchResults: SearchResultItem[] = [];
  let searchedWeb = false;

  if (shouldSearchWeb) {
    try {
      searchResults = await performWebSearch({
        query: userQuery,
        domainId,
        concept: primaryConcept,
        language,
        maxResults: 4,
      });
      searchedWeb = searchResults.length > 0;
    } catch (err) {
      console.warn('[SHIELD aiChatService] Web search warning:', err);
      searchedWeb = false;
    }
  }

  // 2. Synthesize AI Educational Response
  const aiReply = generateEducationalAnswer({
    userQuery,
    domainId,
    domainName,
    stage,
    missionNumber,
    missionTitle,
    primaryConcept,
    objective,
    questionText,
    submittedAnswer,
    isCorrect,
    language,
    searchResults,
    searchedWeb,
  });

  // 3. Format sources if web search was performed
  const sources = searchedWeb
    ? searchResults.map((r) => ({
        title: r.title,
        url: r.url,
        domain: r.domain,
      }))
    : [];

  return {
    success: true,
    reply: aiReply,
    searchedWeb,
    searchQuery: searchedWeb ? userQuery : undefined,
    sources: sources.length > 0 ? sources : undefined,
  };
}

/**
 * Intent Classifier: Determines whether a student question requires web search
 */
function checkIfWebSearchNeeded(query: string): boolean {
  const q = query.toLowerCase();

  // Explicit user command to search web
  if (
    q.includes('search') ||
    q.includes('web') ||
    q.includes('online') ||
    q.includes('internet') ||
    q.includes('google') ||
    q.includes('latest') ||
    q.includes('news') ||
    q.includes('தேடு') ||
    q.includes('खोजो') ||
    q.includes('അന്വേഷിക്കുക')
  ) {
    return true;
  }

  // General educational inquiries or broad STEM questions that benefit from external knowledge
  if (
    q.startsWith('what is') ||
    q.startsWith('who is') ||
    q.startsWith('explain') ||
    q.startsWith('how does') ||
    q.startsWith('why does') ||
    q.includes('definition') ||
    q.includes('example') ||
    q.includes('history of') ||
    q.includes('real world')
  ) {
    return true;
  }

  return false;
}

/**
 * Educational Answer Generator (combines STEM mission context + web search results + multilingual support)
 */
function generateEducationalAnswer(params: {
  userQuery: string;
  domainId: string;
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
  searchResults: SearchResultItem[];
  searchedWeb: boolean;
}): string {
  const {
    userQuery,
    domainId,
    domainName,
    stage,
    missionNumber,
    primaryConcept,
    objective,
    questionText,
    language,
    searchResults,
    searchedWeb,
  } = params;

  const lang = language.toLowerCase();
  const query = userQuery.toLowerCase();

  // Check if student asks directly for answer
  const isDirectAnswer =
    query.includes('what is the answer') ||
    query.includes('tell me the answer') ||
    query.includes('give me the answer') ||
    query.includes('answer please') ||
    query.includes('விடை என்ன') ||
    query.includes('उत्तर क्या है');

  if (isDirectAnswer) {
    return formatGuidedPedagogicalHint(params);
  }

  // Build web-assisted response if web results available
  if (searchedWeb && searchResults.length > 0) {
    const topSnippet = searchResults[0].snippet;
    const topTitle = searchResults[0].title;
    const topDomain = searchResults[0].domain;

    if (lang.startsWith('ta')) {
      return `இணையத் தரவுகளின்படி (${topDomain}):
${topSnippet}

🎯 உங்கள் மிஷன் கருத்து: ${primaryConcept}.
இந்தத் தகவல் உங்கள் ${domainName} மிஷன் ${missionNumber}-க்கு எவ்வாறு பொருந்துகிறது என்று யோசித்துப் பாருங்கள்!`;
    }

    if (lang.startsWith('hi')) {
      return `वेब स्रोतों के अनुसार (${topDomain}):
${topSnippet}

🎯 आपकी मिशन अवधारणा: ${primaryConcept}।
विचार करें कि यह जानकारी आपके ${domainName} मिशन ${missionNumber} पर कैसे लागू होती है!`;
    }

    if (lang.startsWith('ml')) {
      return `വെബ് വിവരങ്ങൾ അനുസരിച്ച് (${topDomain}):
${topSnippet}

🎯 നിങ്ങളുടെ മിഷൻ വിഷയം: ${primaryConcept}.
ഈ വിവരം നിങ്ങളുടെ ${domainName} മിഷൻ ${missionNumber}-ൽ എങ്ങനെ സഹായിക്കും എന്ന് ചിന്തിക്കൂ!`;
    }

    // Default English
    return `According to verified web sources (${topDomain} - ${topTitle}):

"${topSnippet}"

🎯 **Connection to your current ${domainName} Mission (${primaryConcept})**:
Use this core principle to analyze the mission objective: "${objective || 'Solve the module challenge'}".`;
  }

  // Fallback if web search wasn't triggered or returned empty
  if (lang.startsWith('ta')) {
    return `நான்கு STEM பிரிவுகளில் உங்கள் கேள்வியைப் பரிசீலித்தேன்! 
கருத்து: ${primaryConcept} (மிஷன் ${missionNumber}).
இலக்கு: ${objective || 'சவாலை நிறைவு செய்க'}.
குறிப்பிட்ட சந்தேகம் அல்லது படிபடியான வழிகாட்டலுக்குக் கேளுங்கள்!`;
  }

  if (lang.startsWith('hi')) {
    return `मैंने आपकी जिज्ञासा का विश्लेषण किया है!
अवधारणा: ${primaryConcept} (मिशन ${missionNumber})।
लक्ष्य: ${objective || 'चुनौती को पूरा करें'}।
चरण-दर-चरण मार्गदर्शन के लिए निसंकोच पूछें!`;
  }

  return `I have analyzed your query regarding ${domainName} (Stage ${stage} Mission ${missionNumber} — ${primaryConcept}).
Objective: ${objective || 'Solve the puzzle module'}.
How can I further assist your mission, Agent? Ask for hints, concepts, or step-by-step guidance!`;
}

function formatGuidedPedagogicalHint(params: any): string {
  const { domainId, primaryConcept, missionNumber, questionText, objective, language } = params;
  const lang = (language || 'en').toLowerCase();

  if (lang.startsWith('ta')) {
    return `நேரடியாக விடையைக் கூறுவதை விட, நாம் இணைந்து இதைக் கண்டுபிடிப்போம்!
கருத்து: ${primaryConcept}.
மிஷன் இலக்கு: ${objective || 'சரியான அமைப்பைத் தேர்ந்தெடுங்கள்'}.
கேள்வி: "${questionText || 'தரவை ஆய்வு செய்யுங்கள்'}".
ஒவ்வொரு தேர்வாக யோசித்து சோதித்துப் பாருங்கள்!`;
  }

  if (lang.startsWith('hi')) {
    return `सीधे उत्तर देने के बजाय, आइए इसे मिलकर हल करें!
अवधारणा: ${primaryConcept}।
मिशन लक्ष्य: ${objective || 'सही विकल्प चुनें'}।
प्रश्न: "${questionText || 'डेटा का विश्लेषण करें'}"।
एक-एक करके प्रयास करें!`;
  }

  return `Let's work through Mission ${missionNumber} together instead of just giving the answer!
Current Concept: ${primaryConcept}.
Goal: ${objective || 'Solve the module'}.
Hint: Break the problem into parts. What does the first parameter indicate? Analyze each choice before submitting!`;
}
