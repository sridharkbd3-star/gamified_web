// ============================================================
// S.H.I.E.L.D. Platform — Student Roster & Doubts Storage Utility
// Manages teacher monitoring data, student progress tracking,
// student doubts, and teacher responses.
// ============================================================

import type { StudentRecord, DoubtItem, DomainId, GameState } from '../types';

const STUDENTS_STORAGE_KEY = 'shield_teacher_students_roster';
const DOUBTS_STORAGE_KEY = 'shield_student_doubts';

/**
 * Initial Default Mock Roster for Teacher Command Center demonstration
 */
export const INITIAL_STUDENT_ROSTER: StudentRecord[] = [
  {
    id: 'st-001',
    name: 'Aiden',
    email: 'aiden@shield.gov',
    role: 'student',
    overallProgress: 72,
    domainProgress: {
      science: 80,
      technology: 60,
      engineering: 70,
      mathematics: 60,
    },
    currentStage: 'Science • Stage 2 (Molecular Structure)',
    completedMissionsCount: 14,
    xp: 2850,
    level: 3,
    collectedStones: ['science-stone', 'technology-stone'],
    status: 'ACTIVE',
    recentActivity: 'Completed Chemistry Balance Challenge 10 mins ago',
    doubts: [],
  },
  {
    id: 'st-002',
    name: 'Sarah',
    email: 'sarah@shield.gov',
    role: 'student',
    overallProgress: 48,
    domainProgress: {
      science: 40,
      technology: 50,
      engineering: 40,
      mathematics: 60,
    },
    currentStage: 'Mathematics • Stage 3 (Algebraic Ciphers)',
    completedMissionsCount: 9,
    xp: 1800,
    level: 2,
    collectedStones: ['mathematics-stone'],
    status: 'ACTIVE',
    recentActivity: 'Submitted Mathematics Doubt 30 mins ago',
    doubts: [],
  },
  {
    id: 'st-003',
    name: 'Rahul',
    email: 'rahul@shield.gov',
    role: 'student',
    overallProgress: 91,
    domainProgress: {
      science: 100,
      technology: 100,
      engineering: 90,
      mathematics: 80,
    },
    currentStage: 'Engineering • Final Core Mission',
    completedMissionsCount: 22,
    xp: 4900,
    level: 5,
    collectedStones: ['science-stone', 'technology-stone', 'engineering-stone'],
    status: 'COMPLETED',
    recentActivity: 'Unlocked Engineering Stone 2 hours ago',
    doubts: [],
  },
  {
    id: 'st-004',
    name: 'Maya',
    email: 'maya@shield.gov',
    role: 'student',
    overallProgress: 25,
    domainProgress: {
      science: 30,
      technology: 20,
      engineering: 30,
      mathematics: 20,
    },
    currentStage: 'Engineering • Stage 1 (Beam Loads)',
    completedMissionsCount: 4,
    xp: 750,
    level: 1,
    collectedStones: [],
    status: 'NEEDS_SUPPORT',
    recentActivity: 'Stuck on Bridge Truss Load test',
    doubts: [],
  },
];

/**
 * Initial Default Mock Doubts
 */
export const INITIAL_DOUBTS: DoubtItem[] = [
  {
    id: 'd-001',
    studentId: 'st-001',
    studentName: 'Aiden',
    studentEmail: 'aiden@shield.gov',
    domainId: 'science',
    domainName: 'Science',
    stageTitle: 'Stage 2 — Planetary Orbits & Gravity',
    stageId: 'sci-02',
    question: 'Why does the Earth remain in orbit around the Sun instead of falling into it?',
    answer: 'Earth stays in orbit because of a precise balance between the Sun\'s gravitational pull and Earth\'s forward velocity momentum in space.',
    answeredAt: '2026-08-27 14:20',
    teacherName: 'Dr. Agent Sterling',
    status: 'ANSWERED',
    createdAt: '2026-08-27 12:10',
  },
  {
    id: 'd-002',
    studentId: 'st-002',
    studentName: 'Sarah',
    studentEmail: 'sarah@shield.gov',
    domainId: 'mathematics',
    domainName: 'Mathematics',
    stageTitle: 'Stage 3 — Algebraic Scale Balance',
    stageId: 'math-03',
    question: 'I don\'t understand how to isolate X when there are negative variables on both sides of the equation.',
    status: 'NEW',
    createdAt: '2026-08-27 17:45',
  },
  {
    id: 'd-003',
    studentId: 'st-004',
    studentName: 'Maya',
    studentEmail: 'maya@shield.gov',
    domainId: 'engineering',
    domainName: 'Engineering',
    stageTitle: 'Stage 1 — Beam Stress Distribution',
    stageId: 'eng-01',
    question: 'How do steel trusses distribute weight differently compared to solid wood beams under heavy load?',
    status: 'NEW',
    createdAt: '2026-08-27 19:15',
  },
];

/**
 * Load student roster from localStorage (or populate defaults)
 */
export function getStoredStudentRoster(): StudentRecord[] {
  try {
    const raw = localStorage.getItem(STUDENTS_STORAGE_KEY);
    if (!raw) {
      saveStoredStudentRoster(INITIAL_STUDENT_ROSTER);
      return INITIAL_STUDENT_ROSTER;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[SHIELD] Could not load student roster:', err);
    return INITIAL_STUDENT_ROSTER;
  }
}

/**
 * Save student roster to localStorage
 */
export function saveStoredStudentRoster(students: StudentRecord[]): void {
  try {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
  } catch (err) {
    console.warn('[SHIELD] Could not save student roster:', err);
  }
}

/**
 * Add a new student to the teacher roster
 */
export function addStudentToRoster(name: string, email: string): StudentRecord {
  const roster = getStoredStudentRoster();
  const cleanEmail = email.trim().toLowerCase();
  
  // Check if student already exists
  const existing = roster.find((s) => s.email.toLowerCase() === cleanEmail);
  if (existing) {
    return existing;
  }

  const newStudent: StudentRecord = {
    id: `st-${Date.now().toString(36)}`,
    name: name.trim(),
    email: cleanEmail,
    role: 'student',
    overallProgress: 0,
    domainProgress: {
      science: 0,
      technology: 0,
      engineering: 0,
      mathematics: 0,
    },
    currentStage: 'Enrolled — STEM Core Initializing',
    completedMissionsCount: 0,
    xp: 0,
    level: 1,
    collectedStones: [],
    status: 'ACTIVE',
    recentActivity: 'Enlisted in S.H.I.E.L.D. STEM Platform',
    doubts: [],
  };

  const updatedRoster = [newStudent, ...roster];
  saveStoredStudentRoster(updatedRoster);
  return newStudent;
}

/**
 * Load all student doubts
 */
export function getStoredDoubts(): DoubtItem[] {
  try {
    const raw = localStorage.getItem(DOUBTS_STORAGE_KEY);
    if (!raw) {
      saveStoredDoubts(INITIAL_DOUBTS);
      return INITIAL_DOUBTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[SHIELD] Could not load doubts:', err);
    return INITIAL_DOUBTS;
  }
}

/**
 * Save student doubts
 */
export function saveStoredDoubts(doubts: DoubtItem[]): void {
  try {
    localStorage.setItem(DOUBTS_STORAGE_KEY, JSON.stringify(doubts));
  } catch (err) {
    console.warn('[SHIELD] Could not save doubts:', err);
  }
}

/**
 * Submit a new doubt from a student
 */
export function submitStudentDoubt(
  studentName: string,
  studentEmail: string,
  domainId: DomainId,
  domainName: string,
  question: string,
  stageTitle?: string,
  stageId?: string
): DoubtItem {
  const doubts = getStoredDoubts();
  const cleanEmail = studentEmail.trim().toLowerCase();
  
  const newDoubt: DoubtItem = {
    id: `doubt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    studentId: cleanEmail,
    studentName: studentName.trim() || 'Student Cadet',
    studentEmail: cleanEmail,
    domainId,
    domainName,
    stageTitle: stageTitle || `${domainName} Module`,
    stageId,
    question: question.trim(),
    status: 'NEW',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
  };

  const updated = [newDoubt, ...doubts];
  saveStoredDoubts(updated);

  // Update student's doubts list in roster as well
  const roster = getStoredStudentRoster();
  const studentIndex = roster.findIndex((s) => s.email.toLowerCase() === cleanEmail);
  if (studentIndex !== -1) {
    roster[studentIndex].doubts = [newDoubt, ...(roster[studentIndex].doubts || [])];
    saveStoredStudentRoster(roster);
  }

  return newDoubt;
}

/**
 * Answer a student doubt (Teacher operation)
 */
export function answerStudentDoubt(
  doubtId: string,
  teacherResponse: string,
  teacherName: string = 'Teacher Commander'
): DoubtItem | null {
  const doubts = getStoredDoubts();
  const index = doubts.findIndex((d) => d.id === doubtId);
  
  if (index === -1) return null;

  doubts[index] = {
    ...doubts[index],
    answer: teacherResponse.trim(),
    answeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    teacherName: teacherName.trim(),
    status: 'ANSWERED',
  };

  saveStoredDoubts(doubts);

  // Sync with roster
  const roster = getStoredStudentRoster();
  const studentIndex = roster.findIndex((s) => s.email.toLowerCase() === doubts[index].studentEmail.toLowerCase());
  if (studentIndex !== -1) {
    const studentDoubts = roster[studentIndex].doubts || [];
    const dIdx = studentDoubts.findIndex((d) => d.id === doubtId);
    if (dIdx !== -1) {
      studentDoubts[dIdx] = doubts[index];
    } else {
      studentDoubts.unshift(doubts[index]);
    }
    roster[studentIndex].doubts = studentDoubts;
    saveStoredStudentRoster(roster);
  }

  return doubts[index];
}

/**
 * Get doubts for a specific student
 */
export function getDoubtsForStudent(studentEmail: string): DoubtItem[] {
  const doubts = getStoredDoubts();
  const cleanEmail = studentEmail.trim().toLowerCase();
  return doubts.filter((d) => d.studentEmail.toLowerCase() === cleanEmail);
}

/**
 * Sync active student's GameState with the Teacher Roster
 */
export function syncStudentStateToRoster(state: GameState): void {
  if (!state.currentUserEmail || state.userRole === 'teacher') return;

  const roster = getStoredStudentRoster();
  const cleanEmail = state.currentUserEmail.trim().toLowerCase();
  const name = state.player.name || 'Cadet Explorer';
  
  const existingIdx = roster.findIndex((s) => s.email.toLowerCase() === cleanEmail);

  // Calculate domain progress
  const completedDomainsCount = state.player.completedDomains.length;
  const overallProgress = state.player.overallProgress || Math.min(100, completedDomainsCount * 25);
  
  const status: 'ACTIVE' | 'COMPLETED' | 'NEEDS_SUPPORT' = 
    overallProgress >= 100 ? 'COMPLETED' : 'ACTIVE';

  const updatedRecord: StudentRecord = {
    id: existingIdx !== -1 ? roster[existingIdx].id : `st-${Date.now().toString(36)}`,
    name,
    email: cleanEmail,
    role: 'student',
    overallProgress,
    domainProgress: {
      science: state.player.completedDomains.includes('science') ? 100 : 0,
      technology: state.player.completedDomains.includes('technology') ? 100 : 0,
      engineering: state.player.completedDomains.includes('engineering') ? 100 : 0,
      mathematics: state.player.completedDomains.includes('mathematics') ? 100 : 0,
    },
    currentStage: state.currentDomainId ? `${state.currentDomainId.toUpperCase()} Domain Active` : 'STEM Hub Core',
    completedMissionsCount: state.completedStageIds.length || 0,
    xp: state.player.xp || (state.completedStageIds.length * 150),
    level: state.player.level || 1,
    collectedStones: state.player.collectedStones || [],
    status,
    recentActivity: `Last active in ${state.currentScene}`,
    doubts: existingIdx !== -1 ? roster[existingIdx].doubts : getDoubtsForStudent(cleanEmail),
  };

  if (existingIdx !== -1) {
    roster[existingIdx] = updatedRecord;
  } else {
    roster.unshift(updatedRecord);
  }

  saveStoredStudentRoster(roster);
}
