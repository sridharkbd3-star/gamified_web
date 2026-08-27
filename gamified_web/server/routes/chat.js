// ============================================================
// S.H.I.E.L.D. Platform — API Route: POST /api/chat
// Secure Chatbot API Handler with Web Search Integration
// ============================================================

import express from 'express';
import { processChatRequest } from '../services/aiChatService.js';

export const router = express.Router();

// Simple in-memory rate limiting per IP (max 30 requests per minute)
const rateLimitMap = new Map();

function isRateLimited(ip) {
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

router.post('/', async (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || 'client';

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
    } = req.body || {};

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        reply: 'Please provide a valid message.',
        searchedWeb: false,
      });
    }

    // Limit message length for safety
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
    });

    return res.json(result);
  } catch (error) {
    console.error('[SHIELD API /api/chat Error]:', error);
    // Never expose technical error or stack traces to client
    return res.json({
      success: true,
      reply: "I couldn't access the web right now, but I can still help explain the concept using what I know.",
      searchedWeb: false,
    });
  }
});
