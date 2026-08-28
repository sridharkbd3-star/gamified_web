import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { processChatRequest } from './server/services/aiChatService.ts';

// Custom Vite Server Plugin for dev API handling
function shieldApiPlugin() {
  return {
    name: 'shield-api-plugin',
    configureServer(server: any) {
      // 1. Chatbot API endpoint
      server.middlewares.use('/api/chat', async (req: any, res: any, next: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const payload = JSON.parse(body || '{}');
              const result = await processChatRequest(payload);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err) {
              console.error('[Vite API Plugin Error]:', err);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                reply: "I encountered an issue processing your query, but I can still help explain concepts.",
              }));
            }
          });
        } else {
          next();
        }
      });

      // 2. Google Auth API endpoint for Dev Server
      server.middlewares.use('/api/auth/google', async (req: any, res: any, next: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const payload = JSON.parse(body || '{}');
              const { role = 'student', googleUser } = payload;
              const email = (googleUser?.email || '').toLowerCase().trim();
              const sub = googleUser?.sub || googleUser?.id || 'google-user-' + Date.now();
              const name = googleUser?.name || email.split('@')[0] || 'Cadet Explorer';
              const picture = googleUser?.picture || '';

              // Role Authorization Check
              if (role === 'teacher') {
                const authorizedTeachers = [
                  'professor.xavier@shield-faculty.gov',
                  'sterling@shield-faculty.gov',
                  'sridhar.240155@ece.ritchennai.edu.in',
                  'sridhar02032007@gmail.com',
                ];
                const isAuth = authorizedTeachers.includes(email) || email.endsWith('@shield-faculty.gov');
                
                if (!isAuth) {
                  res.statusCode = 403;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: false,
                    error: 'UNAUTHORIZED_TEACHER',
                    message: 'Teacher access requires authorization. Please contact the S.H.I.E.L.D. administrator.',
                  }));
                  return;
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  role: 'teacher',
                  user: { id: sub, googleId: sub, name, email, picture },
                }));
                return;
              }

              // Student login / registration
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                role: 'student',
                user: { id: sub, googleId: sub, name, email, picture },
              }));
            } catch (err) {
              console.error('[Vite Auth Plugin Error]:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: 'SERVER_ERROR',
                message: 'AUTHENTICATION FAILED. PLEASE TRY AGAIN.',
              }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    shieldApiPlugin(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
