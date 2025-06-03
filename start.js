import app from './server.js';
import { serve } from '@hono/node-server';
import { ENV_CONFIG, validateConfig } from './utils/config.js';

// Validate environment configuration
validateConfig();

serve({
  fetch: app.fetch,
  port: ENV_CONFIG.PORT,
});

console.log(`🚀 Server running on http://localhost:${ENV_CONFIG.PORT}`);
console.log(`🌍 Environment: ${ENV_CONFIG.NODE_ENV}`);
