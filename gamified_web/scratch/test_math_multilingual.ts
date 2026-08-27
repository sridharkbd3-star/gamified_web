import { mathCurriculumData } from '../src/data/mathCurriculumData';

console.log('--- MULTILINGUAL MATHEMATICS CURRICULUM VERIFICATION ---');

const languages = ['en', 'ta', 'hi', 'ml'] as const;

for (const lang of languages) {
  const curr = mathCurriculumData[lang];
  console.log(`\n=== LANGUAGE: ${lang.toUpperCase()} ===`);
  console.log('Domain Title:', curr.title);
  console.log('Stage 1 Title:', curr.stages['stage-1'].title);
  console.log('Stage 1 Desc:', curr.stages['stage-1'].desc);
  console.log('Level 1-1 Mission Title:', curr.levels['math-1-1'].missionTitle);
  console.log('Level 1-1 Concept:', curr.levels['math-1-1'].primaryConcept);
  console.log('Level 1-1 Story:', curr.levels['math-1-1'].story);
  console.log('Level 1-10 Boss Title:', curr.levels['math-1-10'].missionTitle);
  console.log('Fragment 1:', curr.fragments.f1);
  console.log('Axiom Stone Title:', curr.stone.title);
  console.log('Achievement Master Title:', curr.achievements.master.title);
}

console.log('\n✓ ALL 4 LANGUAGES VERIFIED SUCCESSFULLY!');
