// ============================================================
// S.H.I.E.L.D. Platform — Backend Server Entry Point
// Express API Server for Web Search & AI Chatbot Integration
// ============================================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as chatRouter } from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'S.H.I.E.L.D. Backend Service',
    webSearchConfigured: !!(process.env.WEB_SEARCH_API_KEY || process.env.TAVILY_API_KEY || process.env.SERPER_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Chatbot API Endpoint
app.use('/api/chat', chatRouter);

// Start Express Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[S.H.I.E.L.D. Backend] Server running on http://localhost:${PORT}`);
    console.log(`[S.H.I.E.L.D. Backend] Health Check: http://localhost:${PORT}/api/health`);
  });
}

export default app;
