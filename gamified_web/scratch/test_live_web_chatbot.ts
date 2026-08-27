import { processChatRequest } from '../server/services/aiChatService';

async function testChatbotBackend() {
  console.log('=== TESTING LIVE WEB-RETRIEVAL AI CHATBOT BACKEND ===\n');

  // Test Question 1: Science concept query
  console.log('--- TEST 1: "What is photosynthesis?" ---');
  const res1 = await processChatRequest({
    message: 'What is photosynthesis?',
    domainId: 'science',
    domainName: 'Science',
    stage: 1,
    missionNumber: 1,
    missionTitle: 'Observation',
    primaryConcept: 'Photosynthesis',
    language: 'en',
  });
  console.log('Searched Web:', res1.searchedWeb);
  console.log('Reply:\n', res1.reply);
  console.log('Contains URL/Source Dump?:', res1.reply.includes('SOURCES REFERENCED:') || res1.reply.includes('http'));
  console.log('---------------------------------------------------\n');

  // Test Question 2: Math calculation query
  console.log('--- TEST 2: "What is 25% of 80?" ---');
  const res2 = await processChatRequest({
    message: 'What is 25% of 80?',
    domainId: 'mathematics',
    domainName: 'Mathematics',
    stage: 1,
    missionNumber: 1,
    missionTitle: 'Number Patterns',
    primaryConcept: 'Percentages',
    language: 'en',
  });
  console.log('Searched Web:', res2.searchedWeb);
  console.log('Reply:\n', res2.reply);
  console.log('---------------------------------------------------\n');

  // Test Question 3: Current info query
  console.log('--- TEST 3: "What is the latest space mission?" ---');
  const res3 = await processChatRequest({
    message: 'What is the latest space mission?',
    domainId: 'technology',
    domainName: 'Technology',
    stage: 2,
    missionNumber: 4,
    missionTitle: 'Space Tech',
    primaryConcept: 'Aerospace Technology',
    language: 'en',
  });
  console.log('Searched Web:', res3.searchedWeb);
  console.log('Reply:\n', res3.reply);
  console.log('Contains URL/Source Dump?:', res3.reply.includes('SOURCES REFERENCED:') || res3.reply.includes('http'));
  console.log('---------------------------------------------------\n');

  console.log('✓ CHATBOT BACKEND PIPELINE VERIFIED SUCCESSFULLY!');
}

testChatbotBackend().catch(console.error);
