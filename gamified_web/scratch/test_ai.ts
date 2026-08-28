import { processChatRequest } from '../server/services/aiChatService.ts';

async function runTests() {
  console.log("=== S.H.I.E.L.D. GEMINI CHATBOT VERIFICATION TESTS ===\n");

  const testQueries = [
    "What is photosynthesis?",
    "What is Newton's second law?",
    "What is a rocket?",
    "How does a computer work?",
    "What is 25 × 16?",
    "Why does ice float on water?",
    "Explain Ohm's law.",
    "What is an algorithm?",
    "Tell me a joke.",
    "",
  ];

  for (let i = 0; i < testQueries.length; i++) {
    const q = testQueries[i];
    console.log(`\n--- TEST ${i + 1}: "${q}" ---`);
    const result = await processChatRequest({
      message: q,
      domainId: 'science',
      domainName: 'Science',
      stage: 1,
      missionNumber: 1,
      missionTitle: 'Planetary Orbits',
      primaryConcept: 'Gravitational Force',
      objective: 'Calculate trajectory',
      language: 'en',
    });

    console.log(`Success: ${result.success}`);
    console.log(`Reply:\n${result.reply}`);
    console.log('-'.repeat(50));
  }
}

runTests();
