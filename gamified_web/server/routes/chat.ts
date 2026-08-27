// ============================================================
// S.H.I.E.L.D. Platform — API Route: POST /api/chat
// Secure Chatbot API Handler with Web Search Integration
// ============================================================

import express, { Request, Response } from 'express';
import { processChatRequest } from '../services/aiChatService.ts';

export const router = express.Router();

const rateLimitMap = new Map<string, { count: number; startTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 30;

  const record = rateLimitMap.get(ip) || { count: 0, startTime: now };

  if (now - record.startTime > windowMs) {
    record.count = 1;
    record.startTime = now;
    rateLimitMap.set(ip, record);
    return false;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);
  return record.count > maxRequests;
}

router.post('/', async (req: Request, res: Response) => {
  const clientIp = (req.ip || req.headers['x-forwarded-for'] || 'client') as string;

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      reply: 'Agent, rate limit reached. Please wait a moment before sending another query.',
      searchedWeb: false,
    });
  }

  try {
    const {
      message,
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
      language,
      chatHistory,
    } = req.body || {};

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        reply: 'Please provide a valid message.',
        searchedWeb: false,
      });
    }

    const sanitizedMessage = message.trim().slice(0, 500);

    const result = await processChatRequest({
      message: sanitizedMessage,
      domainId: domainId || 'science',
      domainName: domainName || 'Science',
      stage: Number(stage) || 1,
      missionNumber: Number(missionNumber) || 1,
      missionTitle: missionTitle || 'Mission',
      primaryConcept: primaryConcept || 'STEM Concept',
      objective: objective || '',
      questionText: questionText || '',
      submittedAnswer: submittedAnswer || null,
      isCorrect: typeof isCorrect === 'boolean' ? isCorrect : null,
      language: language || 'en',
      chatHistory: Array.isArray(chatHistory) ? chatHistory : [],
    });

    return res.json(result);
  } catch (error) {
    console.error('[SHIELD API /api/chat Error]:', error);
    return res.json({
      success: true,
      reply: "I couldn't access the web right now, but I can still help explain the concept using what I know.",
      searchedWeb: false,
    });
  }
});
