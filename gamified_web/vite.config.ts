import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { processChatRequest } from './server/services/aiChatService.ts';

// Custom Vite Server Plugin for dev API handling
function shieldApiPlugin() {
  return {
    name: 'shield-api-plugin',
    configureServer(server: any) {
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
                reply: "I couldn't access the web right now, but I can still help explain the concept using what I know.",
                searchedWeb: false,
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
