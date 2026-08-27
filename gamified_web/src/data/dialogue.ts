import type { DialogueLine } from '../types';

// ----------------------------------------------------------
// PHASE 2 DIALOGUE â€” Opening wake up
// The monologue of the young man protagonist on waking up
// in the unknown mysterious world.
// ----------------------------------------------------------
export const INTRO_DIALOGUE: {
  id: string;
  sceneId: string;
  lines: DialogueLine[];
} = {
  id: 'phase2-monologue',
  sceneId: 'INTRO',
  lines: [
    {
      id: 'intro-01',
      speakerId: 'young-man',
      speakerName: 'Morales',
      text: 'Where am I...?',
      emotion: 'neutral',
    },
    {
      id: 'intro-02',
      speakerId: 'young-man',
      speakerName: 'Morales',
      text: 'What is this place?',
      emotion: 'neutral',
    },
    {
      id: 'intro-03',
      speakerId: 'young-man',
      speakerName: 'Morales',
      text: 'Hello...? Is anyone there?',
      emotion: 'neutral',
    },
    {
      id: 'intro-04',
      speakerId: 'environment',
      speakerName: '...',
      text: '          ',
      emotion: 'neutral',
    },
  ],
};

// ----------------------------------------------------------
// PHASE 3 DIALOGUE â€” Time Portal / Future Self / Tesseract
// The conversation between Morales and his future self.
// event fields trigger special visual moments in Phase3Scene.
// ----------------------------------------------------------
export const PHASE3_DIALOGUE: DialogueLine[] = [
  // â”€â”€ First meeting â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'p3-01',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'Who... who are you?',
    emotion: 'neutral',
  },
  {
    id: 'p3-02',
    speakerId: 'future-self',
    speakerName: '???',
    text: 'I am you.',
    emotion: 'serious',
  },
  {
    id: 'p3-03',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'You...? That\'s impossible.',
    emotion: 'neutral',
  },
  {
    id: 'p3-04',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Your future self. I have come from a time yet to unfold.',
    emotion: 'serious',
  },

  // â”€â”€ Warning â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'p3-05',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'The world is heading toward a dangerous future.',
    emotion: 'urgent',
  },
  {
    id: 'p3-06',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'You have been given a rare chance to change it.',
    emotion: 'serious',
  },
  {
    id: 'p3-07',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'Why should I trust you?',
    emotion: 'neutral',
  },
  {
    id: 'p3-08',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Because I have already lived through everything you are about to face. There is not much time.',
    emotion: 'urgent',
  },
  {
    id: 'p3-09',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'If you want to save the world, you must gain the knowledge you will need.',
    emotion: 'serious',
  },
  {
    id: 'p3-10',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'What knowledge?',
    emotion: 'neutral',
  },

  // â”€â”€ STEM Reveal â€” triggers visual overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'p3-11',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'The four pillars of STEM. Science. Technology. Engineering. Mathematics.',
    emotion: 'serious',
    event: 'STEM_REVEAL',
  },
  {
    id: 'p3-12',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Master all four, and you will have the power to face what is coming.',
    emotion: 'hopeful',
  },

  // â”€â”€ Tesseract Reveal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'p3-13',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'I have something for you.',
    emotion: 'serious',
    event: 'TESSERACT_REVEAL',
  },
  {
    id: 'p3-14',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'The Tesseract. The key to your entire journey.',
    emotion: 'serious',
  },
  {
    id: 'p3-15',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Each learning path you complete will reward you with a special stone.',
    emotion: 'serious',
  },
  {
    id: 'p3-16',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Four domains. Four paths. Four stones. You will need all of them.',
    emotion: 'urgent',
  },

  // â”€â”€ Handover â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'p3-17',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Take it. It will guide you.',
    emotion: 'serious',
    event: 'TESSERACT_HANDOVER',
  },

  // â”€â”€ Departure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'p3-18',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'The journey will not be easy. But you are stronger than you know.',
    emotion: 'hopeful',
  },
  {
    id: 'p3-19',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Trust the Tesseract. It will show you the way.',
    emotion: 'serious',
  },
  {
    id: 'p3-20',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'I will return... when you are ready.',
    emotion: 'neutral',
    event: 'PORTAL_REOPEN',
  },
];

// ----------------------------------------------------------
// PHASE 2 STORY CONSTANTS
// ----------------------------------------------------------
export const INTRO_PHASE_TIMINGS = {
  DARKNESS_DURATION:    2500,
  ENERGY_BUILD_DURATION: 3000,
  SILHOUETTE_DELAY:     1500,
  REVEAL_DELAY:         2500,
  WAKING_DELAY:         1500,
  DIALOGUE_DELAY:       2000,
} as const;

// ----------------------------------------------------------
// PHASE 3 TIMING CONSTANTS
// ----------------------------------------------------------
export const PHASE3_TIMINGS = {
  /** Delay between Phase 2 complete and Phase 3 start (ms) */
  PHASE2_EXIT_DELAY:    3500,
  /** Portal particle gathering duration (ms) */
  PORTAL_FORMING:       4500,
  /** Portal rings fully formed (ms) */
  PORTAL_STABLE:        2000,
  /** Portal center opens (ms) */
  PORTAL_OPEN:          2000,
  /** Future self stepping through (ms) */
  FUTURE_ARRIVING:      2500,
  /** Silent first-meeting moment (ms) */
  FIRST_MEETING:        3000,
  /** STEM reveal overlay duration (ms) */
  STEM_REVEAL_DURATION: 5500,
  /** Tesseract appear duration (ms) */
  TESSERACT_APPEAR:     2000,
  /** Handover animation duration (ms) */
  HANDOVER_DURATION:    2500,
  /** Portal reopen + departure (ms) */
  DEPARTING:            4500,
  /** Portal closing (ms) */
  PORTAL_CLOSING:       3000,
} as const;

// ----------------------------------------------------------
// PHASE 4 DIALOGUE & TIMING CONSTANTS
// ----------------------------------------------------------
export const PHASE4_DIALOGUE: DialogueLine[] = [
  {
    id: 'p4-01',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'So this is what the Tesseract was meant to do...',
    emotion: 'neutral',
  },
  {
    id: 'p4-02',
    speakerId: 'young-man',
    speakerName: 'Morales',
    text: 'Then this is where my journey begins.',
    emotion: 'neutral',
  },
];

export const PHASE4_TIMINGS = {
  /** Tesseract wakeup animation duration (ms) */
  TESSERACT_WAKE:       4000,
  /** Shockwave energy pulse duration (ms) */
  ENERGY_PULSE:         2500,
  /** Gateway formation duration (ms) */
  GATEWAY_FORMING:      3500,
  /** Quick pause for gateway stabilization before walk (ms) */
  GATEWAY_STABLE:       1500,
  /** Entering gateway fade duration (ms) */
  GATEWAY_ENTER:        2000,
  /** Travel tunnel sequence duration (ms) */
  TRAVEL_TUNNEL:        4500,
  /** Arrival panning camera scale duration (ms) */
  ARRIVAL_SCALE:        3500,
} as const;

// ----------------------------------------------------------
// PHASE 9 DOMAIN COMPLETION DIALOGUE
// ----------------------------------------------------------

export const SCIENCE_COMPLETED_DIALOGUE: DialogueLine[] = [
  {
    id: 'sci-comp-01',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'You have mastered the Science path, Morales. You did not simply complete challenges; you learned how to think.',
    emotion: 'proud',
  },
  {
    id: 'sci-comp-02',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Science has given you the power to understand what others cannot see. Observe, question, and discover.',
    emotion: 'hopeful',
  },
];

export const TECHNOLOGY_COMPLETED_DIALOGUE: DialogueLine[] = [
  {
    id: 'tech-comp-01',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'You have mastered the Technology path, Morales. You did not simply complete challenges; you learned how to think.',
    emotion: 'proud',
  },
  {
    id: 'tech-comp-02',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Technology has given you the power to create. Think in systems, give instructions, and solve problems.',
    emotion: 'hopeful',
  },
];

export const ENGINEERING_COMPLETED_DIALOGUE: DialogueLine[] = [
  {
    id: 'eng-comp-01',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'You have mastered the Engineering path, Morales. You did not simply complete challenges; you learned how to think.',
    emotion: 'proud',
  },
  {
    id: 'eng-comp-02',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Engineering has taught you how ideas become reality. Design, test, fail, and improve.',
    emotion: 'hopeful',
  },
];

export const MATHEMATICS_COMPLETED_DIALOGUE: DialogueLine[] = [
  {
    id: 'math-comp-01',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'You have mastered the Mathematics path, Morales. You did not simply complete challenges; you learned how to think.',
    emotion: 'proud',
  },
  {
    id: 'math-comp-02',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Mathematics has given you the power to see structure within complexity. Recognize patterns, reason, and find hidden relationships.',
    emotion: 'hopeful',
  },
];

export const FOURTH_STONE_HOOK_DIALOGUE: DialogueLine[] = [
  {
    id: 'hook-comp-01',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Morales... you have gathered all four stones. You have completed the foundation.',
    emotion: 'proud',
  },
  {
    id: 'hook-comp-02',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'The Tesseract is fully aligned and beginning to awaken. But the final mission has not yet begun.',
    emotion: 'serious',
  },
  {
    id: 'hook-comp-03',
    speakerId: 'future-self',
    speakerName: 'Future Morales',
    text: 'Prepare yourself. The final gateway will open soon.',
    emotion: 'urgent',
  },
];

export function getLocalizedDialogueLine(line: DialogueLine, t: (key: string, options?: any) => string): DialogueLine {
  if (!line) return line;

  const localizedSpeaker = t(`story.${line.speakerId === 'young-man' ? 'youngMan' : line.speakerId === 'future-self' ? 'futureSelf' : line.speakerId}`, {
    defaultValue: line.speakerName,
  });

  const localizedText = t(`dialogue.${line.id}`, { defaultValue: line.text });

  return {
    ...line,
    speakerName: localizedSpeaker,
    text: localizedText,
  };
}

export function getLocalizedDialogueList(lines: DialogueLine[], t: (key: string, options?: any) => string): DialogueLine[] {
  if (!Array.isArray(lines)) return lines;
  return lines.map((l) => getLocalizedDialogueLine(l, t));
}

