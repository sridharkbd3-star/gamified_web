// ============================================================
// STEM Adventure Platform — Default Player Data
// Phase 1 Foundation
//
// A fresh player who has not started the journey.
// Future phases will update fields as progression advances.
// ============================================================

import type { Player } from '../types';

export const DEFAULT_PLAYER: Player = {
  name: 'Explorer',
  avatarId: 'default',
  level: 1,
  overallProgress: 0,
  completedDomains: [],
  collectedStones: [],
  xp: 0,
};
