import app from './server.js';
import { serve } from '@hono/node-server';

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log('🚀 Server running on http://localhost:3000');
