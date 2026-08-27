// ============================================================
// S.H.I.E.L.D. Platform — Teacher Command Center Dashboard
// Futuristic Spatial UI Monitor for Student Progress & Doubts
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  UserCheck,
  Plus,
  Search,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  X,
  LogOut,
  Activity,
  Radio,
  BookOpen,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import {
  getStoredStudentRoster,
  getStoredDoubts,
  addStudentToRoster,
  answerStudentDoubt,
} from '../utils/studentData';
import type { StudentRecord, DoubtItem } from '../types';

export const TeacherDashboard: React.FC = () => {
  const { state, dispatch, navigateTo } = useGameState();
  const teacherName = state.player.name || 'Dr. Agent Sterling';

  const [roster, setRoster] = useState<StudentRecord[]>([]);
  const [doubts, setDoubts] = useState<DoubtItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED' | 'NEEDS_SUPPORT'>('ALL');
  
  // Modal states
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [activeDoubtToAnswer, setActiveDoubtToAnswer] = useState<DoubtItem | null>(null);

  // Form states
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [addStudentSuccess, setAddStudentSuccess] = useState(false);
  const [teacherResponseText, setTeacherResponseText] = useState('');
  const [answerSuccess, setAnswerSuccess] = useState(false);

  // Load roster and doubts on mount
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setRoster(getStoredStudentRoster());
    setDoubts(getStoredDoubts());
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_USER' });
    navigateTo('LANDING');
  };

  // Add new student handler
  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    addStudentToRoster(newStudentName, newStudentEmail);
    setAddStudentSuccess(true);

    setTimeout(() => {
      setAddStudentSuccess(false);
      setShowAddStudentModal(false);
      setNewStudentName('');
      setNewStudentEmail('');
      refreshData();
    }, 1200);
  };

  // Answer doubt handler
  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDoubtToAnswer || !teacherResponseText.trim()) return;

    answerStudentDoubt(activeDoubtToAnswer.id, teacherResponseText, teacherName);
    setAnswerSuccess(true);

    setTimeout(() => {
      setAnswerSuccess(false);
      setActiveDoubtToAnswer(null);
      setTeacherResponseText('');
      refreshData();
    }, 1200);
  };

  // Filtered Roster
  const filteredRoster = roster.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.currentStage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate overview metrics
  const totalStudentsCount = roster.length;
  const activeStudentsCount = roster.filter((s) => s.status === 'ACTIVE').length;
  const completedStudentsCount = roster.filter((s) => s.status === 'COMPLETED').length;
  const needsSupportCount = roster.filter((s) => s.status === 'NEEDS_SUPPORT').length;
  const unansweredDoubtsCount = doubts.filter((d) => d.status !== 'ANSWERED').length;

  return (
    <div className="relative w-full min-h-screen bg-[#03030b] text-slate-100 font-body select-none overflow-x-hidden">
      
      {/* Background Grid & Atmospheric Energy Lights */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(123, 47, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px',
        }}
      />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none z-0" />

      {/* ============================================================
          COMMAND CENTER HEADER BAR
          ============================================================ */}
      <header className="relative z-30 w-full px-6 py-4 md:px-10 flex items-center justify-between backdrop-blur-xl bg-[#050617]/85 border-b border-purple-500/30 sticky top-0 shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
        {/* Left Branding */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-10 h-10 rounded-xl border border-purple-500/60 flex items-center justify-center bg-[#0d0d24] shadow-[0_0_20px_rgba(123,47,255,0.4)]">
            <Shield size={20} className="text-purple-400" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm md:text-base tracking-[0.25em] font-extrabold text-white leading-none">
              S.H.I.E.L.D.
            </span>
            <span className="text-[9px] tracking-[0.2em] text-purple-300 font-display font-bold uppercase mt-1">
              TEACHER COMMAND CENTER // FACULTY PORTAL
            </span>
          </div>
        </div>

        {/* Center HUD Status Bar */}
        <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full border border-purple-500/25 bg-purple-950/30 backdrop-blur-md text-[9px] font-display tracking-widest text-cyan-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#00ff88]" />
            FACULTY MONITOR ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5 text-purple-300 font-bold">
            <UserCheck size={11} />
            INSTRUCTOR: {teacherName.toUpperCase()}
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5 text-amber-400/90 font-bold">
            <Radio size={11} />
            ENCRYPTION: SHIELD-V9
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={handleLogout}
            title="Log Out Faculty Session"
            className="px-3.5 py-2 rounded-xl border border-red-500/30 bg-red-950/20 hover:bg-red-900/40 text-red-400 font-display text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">LOG OUT</span>
          </button>
        </div>
      </header>

      {/* ============================================================
          MAIN DASHBOARD BODY CONTAINER
          ============================================================ */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Page Title & Subtitle Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-display tracking-widest text-purple-400 font-bold uppercase">
              <Sparkles size={14} className="text-amber-400" />
              S.H.I.E.L.D. ACADEMIC OVERVIEW
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-white uppercase">
              TEACHER COMMAND CENTER
            </h1>
            <p className="text-xs text-slate-400 font-display tracking-wide">
              STUDENT PROGRESS & LEARNING MONITOR // HUMAN GUIDANCE INTERFACE
            </p>
          </div>

          <button
            onClick={() => setShowAddStudentModal(true)}
            className="self-start md:self-auto px-5 py-3 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-950/60 to-purple-950/60 hover:border-cyan-300 text-cyan-300 hover:text-white font-display text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] cursor-pointer flex items-center gap-2"
          >
            <Plus size={16} />
            <span>+ ADD STUDENT</span>
          </button>
        </div>

        {/* ============================================================
            1. OVERVIEW STATISTICS METRICS CARDS
            ============================================================ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Card 1: TOTAL STUDENTS */}
          <div className="relative rounded-2xl border border-purple-500/25 bg-[#090b24]/80 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-lg overflow-hidden group hover:border-purple-400/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-display font-bold tracking-widest uppercase">
              <span>TOTAL STUDENTS</span>
              <UserCheck size={16} className="text-purple-400" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
              {totalStudentsCount}
            </span>
            <span className="text-[9px] font-display text-purple-300/80 tracking-wider uppercase">
              REGISTERED CADETS
            </span>
          </div>

          {/* Card 2: ACTIVE STUDENTS */}
          <div className="relative rounded-2xl border border-cyan-500/25 bg-[#090b24]/80 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-lg overflow-hidden group hover:border-cyan-400/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-display font-bold tracking-widest uppercase">
              <span>ACTIVE</span>
              <Activity size={16} className="text-cyan-400" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-wider">
              {activeStudentsCount}
            </span>
            <span className="text-[9px] font-display text-cyan-400/80 tracking-wider uppercase">
              IN PROGRESS MISSIONS
            </span>
          </div>

          {/* Card 3: COMPLETED */}
          <div className="relative rounded-2xl border border-emerald-500/25 bg-[#090b24]/80 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-lg overflow-hidden group hover:border-emerald-400/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-display font-bold tracking-widest uppercase">
              <span>COMPLETED</span>
              <CheckCircle2 size={16} className="text-emerald-400" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-wider">
              {completedStudentsCount}
            </span>
            <span className="text-[9px] font-display text-emerald-400/80 tracking-wider uppercase">
              STEM HERO MASTERY
            </span>
          </div>

          {/* Card 4: NEEDS SUPPORT */}
          <div className="relative rounded-2xl border border-amber-500/25 bg-[#090b24]/80 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-lg overflow-hidden group hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-display font-bold tracking-widest uppercase">
              <span>NEEDS SUPPORT</span>
              <AlertCircle size={16} className="text-amber-400" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-wider">
              {needsSupportCount}
            </span>
            <span className="text-[9px] font-display text-amber-400/80 tracking-wider uppercase">
              ATTENTION RECOMMENDED
            </span>
          </div>

          {/* Card 5: UNANSWERED DOUBTS */}
          <div className="relative rounded-2xl border border-purple-500/35 bg-[#090b24]/80 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-lg overflow-hidden group hover:border-purple-300 transition-all col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-display font-bold tracking-widest uppercase">
              <span>OPEN DOUBTS</span>
              <MessageSquare size={16} className="text-purple-300" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-purple-300 tracking-wider">
              {unansweredDoubtsCount}
            </span>
            <span className="text-[9px] font-display text-purple-300/90 tracking-wider uppercase flex items-center gap-1">
              <Clock size={10} />
              WAITING FOR TEACHER
            </span>
          </div>
        </div>

        {/* ============================================================
            2. STUDENT ROSTER TABLE (HOLOGRAPHIC SPATIAL STYLING)
            ============================================================ */}
        <div className="relative rounded-2xl border border-purple-500/30 bg-[#07091e]/90 backdrop-blur-xl p-6 shadow-2xl flex flex-col gap-5 overflow-hidden">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-purple-400" />
              <h2 className="font-display text-lg tracking-[0.2em] font-extrabold text-white uppercase">
                STUDENT ROSTER
              </h2>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Cadet by Name or Stage..."
                  className="pl-9 pr-4 py-2 text-xs font-body border border-purple-500/25 rounded-xl bg-[#040614] text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_12px_rgba(123,47,255,0.25)] transition-all w-52 sm:w-64"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center p-1 rounded-xl bg-[#040614] border border-purple-500/20 text-[10px] font-display">
                {(['ALL', 'ACTIVE', 'COMPLETED', 'NEEDS_SUPPORT'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-bold tracking-widest uppercase transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-purple-600/30 text-purple-300 border border-purple-400/50 shadow-sm'
                        : 'text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {st === 'NEEDS_SUPPORT' ? 'SUPPORT' : st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-purple-500/20 text-[10px] font-display tracking-[0.2em] uppercase text-cyan-400 font-bold bg-[#0d0f2c]/50">
                  <th className="py-3.5 px-4">STUDENT CADET</th>
                  <th className="py-3.5 px-4">OVERALL PROGRESS</th>
                  <th className="py-3.5 px-4">CURRENT DOMAIN / STAGE</th>
                  <th className="py-3.5 px-4">STONES COLLECTED</th>
                  <th className="py-3.5 px-4 text-center">STATUS</th>
                  <th className="py-3.5 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/15">
                {filteredRoster.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 font-display text-xs tracking-wider">
                      NO CADETS FOUND MATCHING CRITERIA
                    </td>
                  </tr>
                ) : (
                  filteredRoster.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-purple-950/20 transition-colors group"
                    >
                      {/* Name & Email */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-display text-sm font-bold text-white tracking-wider group-hover:text-cyan-300 transition-colors">
                            {student.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {student.email}
                          </span>
                        </div>
                      </td>

                      {/* Progress Bar & % */}
                      <td className="py-4 px-4 w-44">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-[10px] font-display font-bold">
                            <span className="text-slate-300">{student.overallProgress}%</span>
                            <span className="text-slate-500">LVL {student.level}</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-900 border border-purple-500/20 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${student.overallProgress}%`,
                                background:
                                  student.overallProgress >= 80
                                    ? 'linear-gradient(90deg, #00b4ff, #00ff88)'
                                    : student.overallProgress >= 50
                                    ? 'linear-gradient(90deg, #7b2fff, #00b4ff)'
                                    : 'linear-gradient(90deg, #c59b27, #ff9500)',
                                boxShadow: '0 0 10px rgba(0, 180, 255, 0.4)',
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Current Domain & Stage */}
                      <td className="py-4 px-4 max-w-xs">
                        <span className="text-slate-300 font-display text-xs tracking-wide truncate block">
                          {student.currentStage}
                        </span>
                      </td>

                      {/* Stones Collected Chips */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          {[
                            { id: 'science-stone', name: 'Science', color: '#00e5ff' },
                            { id: 'technology-stone', name: 'Tech', color: '#7b2fff' },
                            { id: 'engineering-stone', name: 'Eng', color: '#ff9500' },
                            { id: 'mathematics-stone', name: 'Math', color: '#00ff88' },
                          ].map((st) => {
                            const isCollected = student.collectedStones.includes(st.id as any);
                            return (
                              <div
                                key={st.id}
                                title={`${st.name} Stone ${isCollected ? 'Collected ✓' : 'Pending'}`}
                                className={`w-6 h-6 rounded-lg border flex items-center justify-center text-[9px] font-display font-bold transition-all ${
                                  isCollected
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'border-slate-800 bg-slate-950/60 text-slate-700 opacity-40'
                                }`}
                                style={{
                                  borderColor: isCollected ? st.color : undefined,
                                  boxShadow: isCollected ? `0 0 8px ${st.color}50` : undefined,
                                }}
                              >
                                {isCollected ? '✓' : '○'}
                              </div>
                            );
                          })}
                        </div>
                      </td>

                      {/* Status Indicator */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-display font-bold tracking-widest uppercase border ${
                            student.status === 'COMPLETED'
                              ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400'
                              : student.status === 'NEEDS_SUPPORT'
                              ? 'border-amber-500/40 bg-amber-950/30 text-amber-300 animate-pulse'
                              : 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              student.status === 'COMPLETED'
                                ? 'bg-emerald-400'
                                : student.status === 'NEEDS_SUPPORT'
                                ? 'bg-amber-400'
                                : 'bg-cyan-400'
                            }`}
                          />
                          {student.status === 'NEEDS_SUPPORT' ? 'SUPPORT REQ' : student.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="px-3.5 py-1.5 rounded-lg border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/50 hover:border-purple-300 text-purple-300 text-[10px] font-display font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1 ml-auto"
                        >
                          <span>PROFILE</span>
                          <ChevronRight size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================
            3. STUDENT DOUBTS INBOX & RESPONSE SECTION
            ============================================================ */}
        <div className="relative rounded-2xl border border-purple-500/30 bg-[#07091e]/90 backdrop-blur-xl p-6 shadow-2xl flex flex-col gap-5 overflow-hidden">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-purple-300" />
              <h2 className="font-display text-lg tracking-[0.2em] font-extrabold text-white uppercase">
                STUDENT DOUBTS & QUESTIONS
              </h2>
            </div>
            <span className="text-[10px] font-display tracking-widest text-slate-400 uppercase">
              {doubts.length} TOTAL INBOX ITEMS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doubts.map((doubt) => (
              <div
                key={doubt.id}
                className={`relative rounded-xl border p-4 flex flex-col justify-between gap-3 transition-all ${
                  doubt.status === 'ANSWERED'
                    ? 'border-emerald-500/30 bg-[#040d16]/70'
                    : 'border-purple-500/40 bg-[#0c0a22]/80 shadow-[0_0_15px_rgba(123,47,255,0.15)]'
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs font-bold text-white tracking-wider">
                        {doubt.studentName}
                      </span>
                      <span className="text-[9px] font-display px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 uppercase">
                        {doubt.domainName}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-display font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${
                        doubt.status === 'ANSWERED'
                          ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                          : 'border-amber-500/40 bg-amber-950/40 text-amber-300 animate-pulse'
                      }`}
                    >
                      {doubt.status === 'ANSWERED' ? 'ANSWERED ✓' : 'NEW'}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-display">
                    {doubt.stageTitle || 'General Concept'} • {doubt.createdAt}
                  </span>

                  <p className="text-xs text-slate-200 font-body leading-relaxed bg-[#040614] p-3 rounded-lg border border-slate-800">
                    "{doubt.question}"
                  </p>

                  {doubt.answer && (
                    <div className="flex flex-col gap-1 mt-1 p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-xs">
                      <span className="font-display text-[9px] text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1">
                        <CheckCircle2 size={11} />
                        TEACHER RESPONSE ({doubt.teacherName || 'Faculty'}):
                      </span>
                      <p className="text-emerald-200 leading-relaxed font-body">
                        {doubt.answer}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-800/60">
                  <button
                    onClick={() => {
                      setActiveDoubtToAnswer(doubt);
                      setTeacherResponseText(doubt.answer || '');
                    }}
                    className={`px-4 py-2 rounded-xl text-[10px] font-display font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      doubt.status === 'ANSWERED'
                        ? 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300'
                        : 'border border-purple-400/50 bg-gradient-to-r from-purple-900/60 to-cyan-900/60 text-white hover:scale-105 shadow-[0_0_15px_rgba(123,47,255,0.3)]'
                    }`}
                  >
                    <Send size={12} />
                    <span>{doubt.status === 'ANSWERED' ? 'UPDATE ANSWER' : 'ANSWER DOUBT →'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ============================================================
          MODAL 1: ADD NEW STUDENT MODAL
          ============================================================ */}
      <AnimatePresence>
        {showAddStudentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-cyan-500/40 bg-[#07091e] p-6 shadow-2xl flex flex-col gap-5 overflow-hidden text-left"
            >
              <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Plus size={18} className="text-cyan-400" />
                  <h3 className="font-display text-base font-extrabold tracking-widest text-white uppercase">
                    ADD NEW STUDENT
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {addStudentSuccess ? (
                <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
                  <CheckCircle2 size={40} className="text-emerald-400 animate-bounce" />
                  <span className="font-display text-base font-extrabold tracking-widest text-emerald-400 uppercase">
                    STUDENT ADDED ✓
                  </span>
                  <span className="text-xs text-slate-300 font-display">
                    Cadet record has been added to S.H.I.E.L.D. roster.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleAddStudentSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display text-[10px] tracking-widest uppercase font-bold text-cyan-400">
                      STUDENT NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      placeholder="e.g. Aarav Kumar"
                      className="w-full px-4 py-3 text-xs font-body border border-cyan-500/25 rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,180,255,0.25)] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-display text-[10px] tracking-widest uppercase font-bold text-cyan-400">
                      STUDENT EMAIL ID *
                    </label>
                    <input
                      type="email"
                      required
                      value={newStudentEmail}
                      onChange={(e) => setNewStudentEmail(e.target.value)}
                      placeholder="e.g. aarav@example.com"
                      className="w-full px-4 py-3 text-xs font-body border border-cyan-500/25 rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,180,255,0.25)] transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddStudentModal(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-display tracking-widest uppercase text-slate-400 hover:text-white transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-display font-bold tracking-widest uppercase text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all cursor-pointer"
                    >
                      ADD STUDENT →
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          MODAL 2: INDIVIDUAL STUDENT PROGRESS PROFILE MODAL
          ============================================================ */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-purple-500/40 bg-[#07091e] p-6 sm:p-8 shadow-2xl flex flex-col gap-6 text-left"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-purple-500/20 pb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-display font-bold tracking-widest text-purple-400 uppercase">
                    STUDENT PROGRESS PROFILE
                  </span>
                  <h3 className="font-display text-2xl font-extrabold tracking-wider text-white uppercase">
                    {selectedStudent.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedStudent.email}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Top Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl border border-purple-500/20 bg-[#040614] flex flex-col gap-1">
                  <span className="text-[9px] font-display text-slate-400 uppercase font-bold">OVERALL PROGRESS</span>
                  <span className="text-lg font-display font-extrabold text-cyan-300">{selectedStudent.overallProgress}%</span>
                </div>
                <div className="p-3 rounded-xl border border-purple-500/20 bg-[#040614] flex flex-col gap-1">
                  <span className="text-[9px] font-display text-slate-400 uppercase font-bold">XP POINTS</span>
                  <span className="text-lg font-display font-extrabold text-amber-400">{selectedStudent.xp} XP</span>
                </div>
                <div className="p-3 rounded-xl border border-purple-500/20 bg-[#040614] flex flex-col gap-1">
                  <span className="text-[9px] font-display text-slate-400 uppercase font-bold">CLEARANCE LEVEL</span>
                  <span className="text-lg font-display font-extrabold text-purple-300">LVL {selectedStudent.level}</span>
                </div>
                <div className="p-3 rounded-xl border border-purple-500/20 bg-[#040614] flex flex-col gap-1">
                  <span className="text-[9px] font-display text-slate-400 uppercase font-bold">MISSIONS DONE</span>
                  <span className="text-lg font-display font-extrabold text-emerald-400">{selectedStudent.completedMissionsCount}</span>
                </div>
              </div>

              {/* 4 STEM Domains Breakdown */}
              <div className="flex flex-col gap-3">
                <span className="font-display text-xs font-extrabold tracking-widest text-white uppercase">
                  STEM DOMAINS PROGRESS
                </span>

                {[
                  { id: 'science', name: 'SCIENCE', progress: selectedStudent.domainProgress.science, color: '#00e5ff' },
                  { id: 'technology', name: 'TECHNOLOGY', progress: selectedStudent.domainProgress.technology, color: '#7b2fff' },
                  { id: 'engineering', name: 'ENGINEERING', progress: selectedStudent.domainProgress.engineering, color: '#ff9500' },
                  { id: 'mathematics', name: 'MATHEMATICS', progress: selectedStudent.domainProgress.mathematics, color: '#00ff88' },
                ].map((d) => (
                  <div key={d.id} className="flex flex-col gap-1.5 p-3 rounded-xl border border-slate-800 bg-[#040614]">
                    <div className="flex justify-between items-center text-xs font-display font-bold">
                      <span style={{ color: d.color }}>{d.name}</span>
                      <span className="text-slate-300">{d.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${d.progress}%`, background: d.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Stones Collected Grid */}
              <div className="flex flex-col gap-3">
                <span className="font-display text-xs font-extrabold tracking-widest text-white uppercase">
                  DOMAIN STONES COLLECTED
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'science-stone', name: 'SCIENCE', color: '#00e5ff' },
                    { id: 'technology-stone', name: 'TECHNOLOGY', color: '#7b2fff' },
                    { id: 'engineering-stone', name: 'ENGINEERING', color: '#ff9500' },
                    { id: 'mathematics-stone', name: 'MATHEMATICS', color: '#00ff88' },
                  ].map((st) => {
                    const isCollected = selectedStudent.collectedStones.includes(st.id as any);
                    return (
                      <div
                        key={st.id}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center ${
                          isCollected
                            ? 'border-cyan-500/40 bg-cyan-950/20 text-white'
                            : 'border-slate-800 bg-slate-950/40 text-slate-600'
                        }`}
                      >
                        <span className="text-base">{isCollected ? '✓' : '○'}</span>
                        <span className="font-display text-[9px] font-bold tracking-wider uppercase">
                          {st.name} {isCollected ? 'STONE' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monitoring Notice */}
              <div className="p-3 rounded-xl border border-purple-500/30 bg-purple-950/20 text-purple-300 text-[10px] font-display tracking-wide uppercase flex items-center gap-2">
                <Shield size={14} className="shrink-0 text-purple-400" />
                <span>TEACHER MONITORING ONLY — GAMEPLAY RESTRICTED TO STUDENT VIEW.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          MODAL 3: TEACHER ANSWER RESPONSE PANEL MODAL
          ============================================================ */}
      <AnimatePresence>
        {activeDoubtToAnswer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl border border-purple-500/40 bg-[#07091e] p-6 shadow-2xl flex flex-col gap-5 text-left"
            >
              <div className="flex justify-between items-center border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Send size={18} className="text-purple-400" />
                  <h3 className="font-display text-base font-extrabold tracking-widest text-white uppercase">
                    RESPOND TO STUDENT DOUBT
                  </h3>
                </div>
                <button
                  onClick={() => setActiveDoubtToAnswer(null)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {answerSuccess ? (
                <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
                  <CheckCircle2 size={40} className="text-emerald-400 animate-bounce" />
                  <span className="font-display text-base font-extrabold tracking-widest text-emerald-400 uppercase">
                    ANSWER SENT ✓
                  </span>
                  <span className="text-xs text-slate-300 font-display">
                    Response delivered to cadet's portal.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleAnswerSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1 p-3 rounded-xl border border-slate-800 bg-[#040614]">
                    <div className="flex justify-between items-center text-[10px] font-display font-bold">
                      <span className="text-cyan-400">STUDENT: {activeDoubtToAnswer.studentName}</span>
                      <span className="text-purple-400 uppercase">DOMAIN: {activeDoubtToAnswer.domainName}</span>
                    </div>
                    <span className="text-xs text-slate-300 font-body italic mt-1">
                      "{activeDoubtToAnswer.question}"
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-display text-[10px] tracking-widest uppercase font-bold text-purple-300">
                      TEACHER RESPONSE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={teacherResponseText}
                      onChange={(e) => setTeacherResponseText(e.target.value)}
                      placeholder="Type your educational explanation here..."
                      className="w-full p-3 text-xs font-body border border-purple-500/30 rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_12px_rgba(123,47,255,0.3)] transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveDoubtToAnswer(null)}
                      className="px-4 py-2.5 rounded-xl text-xs font-display tracking-widest uppercase text-slate-400 hover:text-white transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-display font-bold tracking-widest uppercase text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:brightness-110 shadow-[0_0_15px_rgba(123,47,255,0.3)] transition-all cursor-pointer"
                    >
                      SEND ANSWER →
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default TeacherDashboard;
