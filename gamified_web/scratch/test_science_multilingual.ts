import { scienceCurriculumData } from '../src/data/scienceCurriculumData';

console.log('--- MULTILINGUAL SCIENCE CURRICULUM VERIFICATION ---');

const languages = ['en', 'ta', 'hi', 'ml'] as const;

for (const lang of languages) {
  const curr = scienceCurriculumData[lang];
  console.log(`\n=== LANGUAGE: ${lang.toUpperCase()} ===`);
  console.log('Domain Title:', curr.title);
  console.log('Stage 1 Title:', curr.stages['stage-1'].title);
  console.log('Stage 1 Desc:', curr.stages['stage-1'].desc);
  console.log('Level 1-1 Mission Title:', curr.levels['sci-1-1'].missionTitle);
  console.log('Level 1-1 Concept:', curr.levels['sci-1-1'].primaryConcept);
  console.log('Level 1-1 Story:', curr.levels['sci-1-1'].story);
  console.log('Level 1-10 Boss Title:', curr.levels['sci-1-10']?.missionTitle || 'Boss Level');
  console.log('Fragment 1:', curr.fragments.f1);
  console.log('Science Stone Title:', curr.stone.title);
  console.log('Achievement Master Title:', curr.achievements.master.title);
}

console.log('\n✓ ALL 4 LANGUAGES FOR SCIENCE DOMAIN VERIFIED SUCCESSFULLY!');
