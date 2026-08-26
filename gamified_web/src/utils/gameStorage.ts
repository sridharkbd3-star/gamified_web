// ============================================================
// STEM Adventure Platform — Game State Utilities
// Phase 1 Foundation
//
// saveGameState  — persist to localStorage
// loadGameState  — retrieve from localStorage
// resetGameState — clear from localStorage
// ============================================================

import type { GameState } from '../types';

const STORAGE_KEY = 'stem_adventure_game_state';
const CURRENT_VERSION = 1;

/**
 * Persist the full game state to localStorage.
 * Call this whenever the state changes (handled by GameStateContext).
 */
export function saveGameState(state: GameState): void {
  try {
    const serialized = JSON.stringify({ ...state, _version: CURRENT_VERSION });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.warn('[STEM] Could not save game state:', err);
  }
}

/**
 * Load game state from localStorage.
 * Returns null if nothing is stored or the stored version is incompatible.
 */
export function loadGameState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as GameState;

    // Version guard — if schema changed, discard old state
    if (parsed._version !== CURRENT_VERSION) {
      console.info('[STEM] Stored state version mismatch — resetting.');
      resetGameState();
      return null;
    }

    return parsed;
  } catch (err) {
    console.warn('[STEM] Could not load game state:', err);
    return null;
  }
}

/**
 * Erase all stored game state from localStorage.
 * Use for "New Game" or developer resets.
 */
export function resetGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('[STEM] Could not reset game state:', err);
  }
}

/**
 * Check whether any saved state exists.
 */
export function hasSavedState(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

/**
 * Persist user-specific game state.
 */
export function saveUserGameState(email: string, state: GameState): void {
  try {
    const key = `shield_progress_${email.toLowerCase().trim()}`;
    const serialized = JSON.stringify({ ...state, _version: CURRENT_VERSION });
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.warn('[STEM] Could not save user game state:', err);
  }
}

/**
 * Load user-specific game state.
 */
export function loadUserGameState(email: string): GameState | null {
  try {
    const key = `shield_progress_${email.toLowerCase().trim()}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as GameState;
    if (parsed._version !== CURRENT_VERSION) {
      console.info('[STEM] Stored user state version mismatch.');
      return null;
    }
    return parsed;
  } catch (err) {
    console.warn('[STEM] Could not load user game state:', err);
    return null;
  }
}

/**
 * Active Session management
 */
export function saveSessionEmail(email: string): void {
  localStorage.setItem('shield_current_session', email.trim());
}

export function loadSessionEmail(): string | null {
  return localStorage.getItem('shield_current_session');
}

export function clearSessionEmail(): void {
  localStorage.removeItem('shield_current_session');
}

/**
 * Prototype Authentication Account details
 */
export interface UserAccount {
  email: string;
  name: string;
  passwordHash: string;
}

export function getStoredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem('shield_users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredUsers(users: UserAccount[]): void {
  try {
    localStorage.setItem('shield_users', JSON.stringify(users));
  } catch {}
}

/**
 * Simple password obfuscator / hash for local prototype storage
 */
export function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'shield_hash_' + Math.abs(hash).toString(36);
}
