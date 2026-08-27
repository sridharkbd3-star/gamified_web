/**
 * Short, simple, and clear concept explanations for STEM missions.
 */
export function getConceptExplanation(concept: string, levelNumber?: number): string {
  const c = (concept || '').toLowerCase();
  
  if (c.includes('measurement') || levelNumber === 2) {
    return 'Measurement is the process of finding the value of a physical quantity using an appropriate measuring instrument. Temperature is measured using a thermometer.';
  }
  
  if (c.includes('variable') || c.includes('observation') || c.includes('hypothesis')) {
    return 'Variables are factors or quantities that can change or be measured during a scientific experiment to observe cause and effect.';
  }
  
  if (c.includes('ph') || c.includes('acid') || c.includes('base')) {
    return 'pH measures how acidic or basic a liquid is on a scale from 0 to 14, where 7 represents neutral water.';
  }
  
  if (c.includes('binary') || c.includes('code')) {
    return 'Binary numbers represent digital data using only two digits, 0 and 1, where each position corresponds to a power of 2.';
  }
  
  if (c.includes('logic gate') || c.includes('signal') || c.includes('boolean')) {
    return 'Logic gates process binary inputs (0 and 1) to produce a single output based on fundamental logical operations like AND, OR, and NOT.';
  }
  
  if (c.includes('truss') || c.includes('cantilever') || c.includes('structure') || c.includes('load')) {
    return 'Trusses and load-bearing structures distribute mechanical forces evenly across components to prevent deformation or collapsing.';
  }
  
  if (c.includes('fibonacci') || c.includes('ratio') || c.includes('sequence')) {
    return 'The Fibonacci sequence is a mathematical growth pattern where each number is the sum of the two preceding numbers (0, 1, 1, 2, 3, 5, 8...).';
  }

  if (c.includes('equation') || c.includes('balance') || c.includes('scale')) {
    return 'Mathematical equations state that two expressions are equal. Balancing a scale requires equal values on both sides.';
  }
  
  return `${concept} is a fundamental concept used to analyze physical quantities and solve this mission challenge.`;
}
