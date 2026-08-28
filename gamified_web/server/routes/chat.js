// ============================================================
// S.H.I.E.L.D. Platform — API Route: POST /api/chat (JS)
// ============================================================

import express from 'express';
import { processChatRequest } from '../services/aiChatService.ts';

export const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const payload = req.body || {};
    const result = await processChatRequest(payload);
    return res.json(result);
  } catch (error) {
    console.error('[SHIELD API /api/chat Error]:', error);
    return res.json({
      success: false,
      reply: "S.H.I.E.L.D. AI is temporarily unavailable. Please try again in a moment.",
    });
  }
});
