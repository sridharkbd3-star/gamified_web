// ============================================================
// S.H.I.E.L.D. Platform — Backend Server Entry Point (JS)
// Express API Server for AI Chatbot & Google OAuth Integration
// ============================================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as chatRouter } from './routes/chat.js';
import { router as authRouter } from './routes/auth.js';

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
    googleAuthConfigured: !!(process.env.GOOGLE_CLIENT_ID),
    timestamp: new Date().toISOString(),
  });
});

// API Endpoints
app.use('/api/chat', chatRouter);
app.use('/api/auth', authRouter);

// Start Express Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[S.H.I.E.L.D. Backend] Server running on http://localhost:${PORT}`);
    console.log(`[S.H.I.E.L.D. Backend] Health Check: http://localhost:${PORT}/api/health`);
  });
}

export default app;
