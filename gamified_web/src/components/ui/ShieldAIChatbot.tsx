// ============================================================
// S.H.I.E.L.D. Platform — Futuristic Subject-Specific AI Chatbot UI
// Natural ChatGPT-Style Educational Assistant (Internal Web Search)
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Sparkles,
  Mic,
  MicOff,
  ChevronDown,
  ChevronUp,
  X,
  Lightbulb,
  BookOpen,
  HelpCircle,
  ListOrdered
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getInitialGreeting, generateAIResponse } from '../../utils/chatbotAI.ts';

export interface ShieldAIChatbotProps {
  domainId: 'science' | 'technology' | 'engineering' | 'mathematics';
  domainName: string;
  themeColor: string;
  stage: number;
  missionNumber: number;
  missionTitle: string;
  primaryConcept: string;
  objective?: string;
  questionText?: string;
  submittedAnswer?: string | null;
  isCorrect?: boolean | null;
  onTriggerHint?: () => void;
  variant?: 'desktop' | 'mobile-floating';
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const ShieldAIChatbot: React.FC<ShieldAIChatbotProps> = ({
  domainId,
  domainName,
  themeColor = '#7b2fff',
  stage,
  missionNumber,
  missionTitle,
  primaryConcept,
  objective,
  questionText,
  submittedAnswer,
  isCorrect,
  onTriggerHint,
  variant = 'desktop',
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize contextual greeting when domain or mission changes
  useEffect(() => {
    const initialGreeting = getInitialGreeting(domainId, lang);
    setMessages([
      {
        id: 'msg-init-' + Date.now(),
        sender: 'ai',
        text: initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [domainId, stage, missionNumber, lang]);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: Message = {
      id: 'msg-usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsThinking(true);

    const payload = {
      message: text,
      domainId,
      domainName,
      stage,
      missionNumber,
      missionTitle,
      primaryConcept,
      objective,
      questionText,
      submittedAnswer,
      isCorrect,
      language: lang,
      chatHistory: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
    };

    try {
      // Send request to secure backend API (runs web search internally when needed)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: Message = {
          id: 'msg-ai-' + Date.now(),
          sender: 'ai',
          text: data.reply || 'Agent, here is what I found.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error(`API response status: ${response.status}`);
      }
    } catch (error) {
      console.warn('[ShieldAIChatbot] Backend API unavailable, using client AI fallback:', error);
      const responseText = generateAIResponse(text, payload);
      const aiMsg: Message = {
        id: 'msg-ai-' + Date.now(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleQuickAction = (actionType: 'hint' | 'concept' | 'step' | 'wrong' | 'explain') => {
    if (actionType === 'hint') {
      if (onTriggerHint) onTriggerHint();
      handleSendMessage("Can you give me a hint for this mission?");
    } else if (actionType === 'concept' || actionType === 'explain') {
      handleSendMessage(`Explain the concept of ${primaryConcept}`);
    } else if (actionType === 'step') {
      handleSendMessage("Explain step by step how to solve this");
    } else if (actionType === 'wrong') {
      handleSendMessage("Why was my answer incorrect?");
    }
  };

  const toggleMic = () => {
    setIsMicActive(!isMicActive);
    if (!isMicActive) {
      setInputText("Explain " + primaryConcept);
    }
  };

  const renderFormattedMessageText = (text: string) => {
    if (!text) return null;

    const parts = text.split('\n---\n');
    const mainText = parts[0];
    const sourcesText = parts.length > 1 ? parts.slice(1).join('\n---\n') : null;

    const formatLine = (line: string, index: number) => {
      const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
      const elements: React.ReactNode[] = [];
      let lastIdx = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIdx) {
          elements.push(...formatBoldText(line.substring(lastIdx, match.index), index));
        }
        const label = match[1];
        const url = match[2];
        elements.push(
          <a
            key={`link-${index}-${match.index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline hover:text-cyan-300 transition-colors font-bold break-all inline-flex items-center gap-1"
          >
            {label} ↗
          </a>
        );
        lastIdx = linkRegex.lastIndex;
      }

      if (lastIdx < line.length) {
        elements.push(...formatBoldText(line.substring(lastIdx), index));
      }

      return (
        <p key={`line-${index}`} className="mb-1 leading-relaxed">
          {elements.length > 0 ? elements : line}
        </p>
      );
    };

    const formatBoldText = (str: string, lineIndex: number): React.ReactNode[] => {
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const parts: React.ReactNode[] = [];
      let lastIdx = 0;
      let match;

      while ((match = boldRegex.exec(str)) !== null) {
        if (match.index > lastIdx) {
          parts.push(str.substring(lastIdx, match.index));
        }
        parts.push(
          <strong key={`bold-${lineIndex}-${match.index}`} className="font-bold text-white">
            {match[1]}
          </strong>
        );
        lastIdx = boldRegex.lastIndex;
      }
      if (lastIdx < str.length) {
        parts.push(str.substring(lastIdx));
      }
      return parts;
    };

    return (
      <div className="flex flex-col gap-1 text-xs">
        <div>{mainText.split('\n').map((line, idx) => formatLine(line, idx))}</div>
        {sourcesText && (
          <div className="mt-2 pt-2 border-t border-cyan-500/20 text-[10px] text-cyan-300/90 font-display">
            {sourcesText.split('\n').map((line, idx) => formatLine(line, idx + 1000))}
          </div>
        )}
      </div>
    );
  };

  // ------------------------------------------------------------
  // CHATBOT CONTENT INNER COMPONENT
  // ------------------------------------------------------------
  const renderChatContent = () => (
    <div className="flex flex-col h-full w-full select-none text-slate-100">
      {/* Header Bar */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur-md shrink-0"
        style={{ borderTop: `2px solid ${themeColor}` }}
      >
        <div className="flex items-center gap-2.5">
          <div 
            className="w-7 h-7 rounded-lg border flex items-center justify-center relative shadow-sm"
            style={{ borderColor: `${themeColor}60`, background: `${themeColor}15` }}
          >
            <Bot size={15} style={{ color: themeColor }} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold tracking-wider text-white uppercase leading-none">
              {t('chatbot.title', 'SHIELD AI ASSISTANT')}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-display tracking-widest text-emerald-400 font-bold uppercase leading-none">
                {t('chatbot.status', 'ONLINE')} · STAGE {stage}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {variant === 'desktop' && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              title={isCollapsed ? "Expand Chat" : "Collapse Chat"}
            >
              {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          )}

          {variant === 'mobile-floating' && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Body (messages + actions + input) */}
      {!isCollapsed && (
        <div className="flex-1 flex flex-col min-h-0 bg-[#06040f]/90">
          {/* Scrollable Conversation Area */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3 min-h-[160px] max-h-[280px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div 
                    className="w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5"
                    style={{ borderColor: `${themeColor}40`, background: `${themeColor}20` }}
                  >
                    <Sparkles size={11} style={{ color: themeColor }} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#18112e] text-slate-100 border border-purple-500/30 rounded-tr-none'
                      : 'bg-black/60 text-slate-200 border border-white/10 rounded-tl-none shadow-sm'
                  }`}
                  style={msg.sender === 'ai' ? { borderLeft: `2px solid ${themeColor}` } : {}}
                >
                  {renderFormattedMessageText(msg.text)}

                  <span className="text-[8px] text-slate-500 font-display block text-right mt-1 opacity-70">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Thinking / Analyzing Indicator */}
            {isThinking && (
              <div className="flex gap-2 items-center text-xs text-slate-400">
                <div 
                  className="w-6 h-6 rounded-lg border flex items-center justify-center shrink-0"
                  style={{ borderColor: `${themeColor}40`, background: `${themeColor}20` }}
                >
                  <Bot size={11} className="animate-spin" style={{ color: themeColor }} />
                </div>
                <div className="flex gap-1.5 items-center bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: themeColor, animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: themeColor, animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: themeColor, animationDelay: '300ms' }} />
                  <span className="text-[10px] font-display text-slate-400 ml-1">
                    {t('chatbot.thinking', 'SHIELD AI is analyzing...')}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-3 py-1.5 border-t border-white/5 bg-black/20 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => handleQuickAction('concept')}
              className="px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-display text-[9px] font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer flex items-center gap-1"
            >
              <BookOpen size={10} className="text-purple-400" />
              {t('chatbot.explainConcept', '📖 Concept')}
            </button>
            <button
              onClick={() => handleQuickAction('hint')}
              className="px-2.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-display text-[9px] font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer flex items-center gap-1"
            >
              <Lightbulb size={10} className="text-amber-400" />
              {t('chatbot.askHint', '💡 Hint')}
            </button>
            <button
              onClick={() => handleQuickAction('step')}
              className="px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-display text-[9px] font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer flex items-center gap-1"
            >
              <ListOrdered size={10} className="text-emerald-400" />
              {t('chatbot.stepByStep', '🔍 Steps')}
            </button>
            {submittedAnswer && isCorrect === false && (
              <button
                onClick={() => handleQuickAction('wrong')}
                className="px-2.5 py-1 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-display text-[9px] font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer flex items-center gap-1"
              >
                <HelpCircle size={10} className="text-red-400" />
                {t('chatbot.whyWrong', '❓ Why Wrong?')}
              </button>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-2.5 border-t border-white/10 bg-black/50 flex items-center gap-2 shrink-0">
            <button
              onClick={toggleMic}
              title={isMicActive ? "Disable Mic" : "Enable Mic"}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isMicActive 
                  ? 'border-red-500 bg-red-500/20 text-red-400 animate-pulse' 
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isMicActive ? <MicOff size={13} /> : <Mic size={13} />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('chatbot.placeholder', 'Ask a doubt or concept...')}
              className="flex-1 py-1.5 px-3 rounded-xl border border-white/10 bg-slate-950/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all font-body"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isThinking}
              className="p-2 rounded-xl border transition-all cursor-pointer font-display"
              style={{
                borderColor: inputText.trim() ? themeColor : '#27273a',
                background: inputText.trim() ? `${themeColor}25` : '#12121f',
                color: inputText.trim() ? '#ffffff' : '#4a4a6a',
                boxShadow: inputText.trim() ? `0 0 10px ${themeColor}30` : 'none',
              }}
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop & Embedded Column Card */}
      <div 
        className="w-full rounded-2xl border bg-black/40 backdrop-blur-md overflow-hidden transition-all shadow-lg my-1"
        style={{ borderColor: `${themeColor}30` }}
      >
        {renderChatContent()}
      </div>

      {/* Floating Action Button for Tablet/Mobile Screens (< lg) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-5 right-5 z-[90] px-4 py-3 rounded-full border-2 font-display text-xs font-bold tracking-wider uppercase text-white flex items-center gap-2.5 shadow-2xl cursor-pointer"
        style={{
          borderColor: themeColor,
          background: `linear-gradient(135deg, ${themeColor}90 0%, #080415 100%)`,
          boxShadow: `0 0 25px ${themeColor}60`,
        }}
      >
        <Bot size={18} className="animate-pulse" />
        <span>SHIELD AI</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
      </motion.button>

      {/* Floating Panel Drawer for Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="lg:hidden fixed bottom-20 right-4 left-4 sm:left-auto sm:w-[380px] h-[480px] z-[100] rounded-2xl border border-white/20 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ boxShadow: `0 0 35px ${themeColor}40` }}
          >
            {renderChatContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
