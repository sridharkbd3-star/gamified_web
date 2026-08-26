// ============================================================
// STEM Adventure Platform — Stone Data
// Phase 1 Foundation
//
// One stone per STEM domain. Stones start uncollected.
// Later phases will animate collection and connect stones to
// domain completion events.
// ============================================================

import type { Stone } from '../types';

export const STONES: Stone[] = [
  {
    id: 'science-stone',
    name: 'The Luminal Stone',
    domainId: 'science',
    description:
      'A crystallized shard of pure knowledge — forged from the light of a thousand discoveries. It pulses with the energy of the natural world.',
    color: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.6)',
    isCollected: false,
  },
  {
    id: 'technology-stone',
    name: 'The Circuit Stone',
    domainId: 'technology',
    description:
      'Woven from digital threads and silicon dreams, this stone hums with computational power. It is the heartbeat of the machine age.',
    color: '#7b2fff',
    glowColor: 'rgba(123, 47, 255, 0.6)',
    isCollected: false,
  },
  {
    id: 'engineering-stone',
    name: 'The Forge Stone',
    domainId: 'engineering',
    description:
      'Carved from the material of creation itself, the Forge Stone carries the weight of every bridge, engine, and structure ever built.',
    color: '#ff9500',
    glowColor: 'rgba(255, 149, 0, 0.6)',
    isCollected: false,
  },
  {
    id: 'mathematics-stone',
    name: 'The Axiom Stone',
    domainId: 'mathematics',
    description:
      'Ancient as the cosmos, the Axiom Stone contains every truth that can be proven. Its geometry shifts and reforms in perfect symmetry.',
    color: '#00ff88',
    glowColor: 'rgba(0, 255, 136, 0.6)',
    isCollected: false,
  },
];

/** Quick lookup helper */
export function getStoneById(id: string): Stone | undefined {
  return STONES.find((s) => s.id === id);
}

export function getStoneByDomain(domainId: string): Stone | undefined {
  return STONES.find((s) => s.domainId === domainId);
}
