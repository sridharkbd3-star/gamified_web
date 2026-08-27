// ============================================================
// S.H.I.E.L.D. Platform — StudentDoubtModal Component
// Student-Teacher Communication Interface ("ASK YOUR TEACHER" & "MY DOUBTS")
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Send,
  X,
  CheckCircle2,
  Clock,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import {
  submitStudentDoubt,
  getDoubtsForStudent,
} from '../../utils/studentData';
import type { DoubtItem, DomainId } from '../../types';

interface StudentDoubtModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomainId?: DomainId;
}

export const StudentDoubtModal: React.FC<StudentDoubtModalProps> = ({
  isOpen,
  onClose,
  defaultDomainId = 'science',
}) => {
  const { state } = useGameState();
  const studentName = state.player.name || 'Cadet Explorer';
  const studentEmail = state.currentUserEmail || `${studentName.toLowerCase().replace(/\s+/g, '.')}@shield.gov`;

  const [activeTab, setActiveTab] = useState<'ASK' | 'HISTORY'>('ASK');
  const [domainId, setDomainId] = useState<DomainId>(defaultDomainId);
  const [questionText, setQuestionText] = useState('');
  const [stageText, setStageText] = useState('Stage 02');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [myDoubts, setMyDoubts] = useState<DoubtItem[]>([]);

  // Load doubts on open
  useEffect(() => {
    if (isOpen) {
      refreshMyDoubts();
    }
  }, [isOpen, studentEmail]);

  const refreshMyDoubts = () => {
    setMyDoubts(getDoubtsForStudent(studentEmail));
  };

  const handleSubmitDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const domainNames: Record<DomainId, string> = {
      science: 'Science',
      technology: 'Technology',
      engineering: 'Engineering',
      mathematics: 'Mathematics',
    };

    submitStudentDoubt(
      studentName,
      studentEmail,
      domainId,
      domainNames[domainId],
      questionText,
      `${domainNames[domainId]} • ${stageText}`
    );

    setSubmitSuccess(true);
    refreshMyDoubts();

    setTimeout(() => {
      setSubmitSuccess(false);
      setQuestionText('');
      setActiveTab('HISTORY');
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/40 bg-[#07091e] p-6 shadow-2xl flex flex-col gap-5 text-left"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-cyan-400" />
            <h3 className="font-display text-base font-extrabold tracking-widest text-white uppercase">
              STUDENT - TEACHER HELP NODE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-[#040614] border border-cyan-500/25 w-full font-display text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('ASK')}
            className={`flex-1 py-2.5 rounded-lg tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'ASK'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,180,255,0.25)]'
                : 'text-slate-500 hover:text-slate-300 border border-transparent'
            }`}
          >
            <HelpCircle size={14} />
            <span>ASK YOUR TEACHER</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('HISTORY');
              refreshMyDoubts();
            }}
            className={`flex-1 py-2.5 rounded-lg tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'HISTORY'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-400/50 shadow-[0_0_15px_rgba(123,47,255,0.3)]'
                : 'text-slate-500 hover:text-slate-300 border border-transparent'
            }`}
          >
            <BookOpen size={14} />
            <span>MY DOUBTS ({myDoubts.length})</span>
          </button>
        </div>

        {/* TAB 1: ASK YOUR TEACHER FORM */}
        {activeTab === 'ASK' && (
          <>
            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                <CheckCircle2 size={42} className="text-emerald-400 animate-bounce" />
                <span className="font-display text-base font-extrabold tracking-widest text-emerald-400 uppercase">
                  DOUBT SENT TO TEACHER ✓
                </span>
                <span className="text-xs text-slate-300 font-display">
                  Your question has been transmitted to the Teacher Command Center.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmitDoubt} className="flex flex-col gap-4">
                {/* Select Domain */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-[10px] tracking-widest uppercase font-bold text-cyan-400">
                    STEM DOMAIN *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'science', label: 'SCIENCE', color: '#00e5ff' },
                      { id: 'technology', label: 'TECH', color: '#7b2fff' },
                      { id: 'engineering', label: 'ENG', color: '#ff9500' },
                      { id: 'mathematics', label: 'MATH', color: '#00ff88' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDomainId(d.id as any)}
                        className={`py-2 px-3 rounded-xl border text-[10px] font-display font-bold tracking-widest uppercase transition-all cursor-pointer ${
                          domainId === d.id
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'border-slate-800 bg-slate-950/60 text-slate-500'
                        }`}
                        style={{
                          borderColor: domainId === d.id ? d.color : undefined,
                          color: domainId === d.id ? d.color : undefined,
                        }}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stage Info */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-[10px] tracking-widest uppercase font-bold text-cyan-400">
                    STAGE / MISSION CONTEXT
                  </label>
                  <input
                    type="text"
                    value={stageText}
                    onChange={(e) => setStageText(e.target.value)}
                    placeholder="e.g. Stage 02 (Planetary Orbits)"
                    className="w-full px-4 py-2.5 text-xs font-body border border-cyan-500/25 rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>

                {/* Question Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-[10px] tracking-widest uppercase font-bold text-cyan-400">
                    WHAT I DON'T UNDERSTAND *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Type your question or what concept you need help with..."
                    className="w-full p-3 text-xs font-body border border-cyan-500/25 rounded-xl bg-[#040614] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,180,255,0.25)] transition-all resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[9px] font-display text-slate-400 tracking-wider">
                    HUMAN TEACHER RESPONSE CHANNEL
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl text-xs font-display font-bold tracking-widest uppercase text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Send size={14} />
                    <span>SEND DOUBT →</span>
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {/* TAB 2: MY DOUBTS HISTORY */}
        {activeTab === 'HISTORY' && (
          <div className="flex flex-col gap-4">
            {myDoubts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500 font-display text-xs tracking-wider gap-2">
                <HelpCircle size={32} className="opacity-40" />
                <span>YOU HAVE NOT SUBMITTED ANY DOUBTS YET</span>
              </div>
            ) : (
              myDoubts.map((doubt) => (
                <div
                  key={doubt.id}
                  className={`p-4 rounded-xl border flex flex-col gap-3 text-left ${
                    doubt.status === 'ANSWERED'
                      ? 'border-emerald-500/40 bg-[#040e16]/80 shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                      : 'border-cyan-500/30 bg-[#040614]/80'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-display text-xs font-bold text-cyan-300 uppercase">
                      {doubt.stageTitle || doubt.domainName}
                    </span>

                    <span
                      className={`text-[9px] font-display font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
                        doubt.status === 'ANSWERED'
                          ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                          : 'border-amber-500/40 bg-amber-950/40 text-amber-300 animate-pulse'
                      }`}
                    >
                      {doubt.status === 'ANSWERED' ? 'ANSWERED ✓' : 'WAITING FOR TEACHER'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 font-body">
                    <strong className="text-slate-400">You: </strong>"{doubt.question}"
                  </p>

                  {doubt.answer ? (
                    <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 flex flex-col gap-1 text-xs">
                      <span className="font-display text-[9px] text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1">
                        <CheckCircle2 size={11} />
                        TEACHER ({doubt.teacherName || 'Faculty'}):
                      </span>
                      <p className="text-emerald-200 leading-relaxed font-body">
                        {doubt.answer}
                      </p>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-display flex items-center gap-1">
                      <Clock size={10} /> Submitted on {doubt.createdAt}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
