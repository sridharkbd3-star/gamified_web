import { processChatRequest } from '../server/services/aiChatService.ts';

async function runTests() {
  console.log('--- TEST 1: Photosynthesis in English ---');
  const res1 = await processChatRequest({
    message: 'What is photosynthesis?',
    domainId: 'science',
    domainName: 'Science',
    stage: 1,
    missionNumber: 1,
    missionTitle: 'M1',
    primaryConcept: 'Photosynthesis',
    language: 'en',
  });
  console.log('Reply:\n', res1.reply);

  console.log('\n--- TEST 2: Tamil Photosynthesis ---');
  const res2 = await processChatRequest({
    message: 'ஒளிச்சேர்க்கை என்றால் என்ன?',
    domainId: 'science',
    domainName: 'Science',
    stage: 1,
    missionNumber: 1,
    missionTitle: 'M1',
    primaryConcept: 'Photosynthesis',
    language: 'ta',
  });
  console.log('Reply:\n', res2.reply);

  console.log('\n--- TEST 3: Binary Explanation ---');
  const res3 = await processChatRequest({
    message: 'Why is 1010 equal to 10 in binary?',
    domainId: 'technology',
    domainName: 'Technology',
    stage: 1,
    missionNumber: 1,
    missionTitle: 'M1',
    primaryConcept: 'Binary System',
    language: 'en',
  });
  console.log('Reply:\n', res3.reply);

  console.log('\n--- TEST 4: Explicit Web Search ---');
  const res4 = await processChatRequest({
    message: 'Search the web for the latest developments in AI.',
    domainId: 'technology',
    domainName: 'Technology',
    stage: 1,
    missionNumber: 1,
    missionTitle: 'M1',
    primaryConcept: 'AI',
    language: 'en',
  });
  console.log('Reply:\n', res4.reply);
}

runTests();
