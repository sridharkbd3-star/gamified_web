// ============================================================
// S.H.I.E.L.D. Platform — Server-Side AI Chat Service (JS)
// Educational Assistant for STEM Learning
// ============================================================

import { processChatRequest as processTsChatRequest } from './aiChatService.ts';

export async function processChatRequest(payload) {
  return await processTsChatRequest(payload);
}
