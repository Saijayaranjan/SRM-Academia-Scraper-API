import { config } from 'dotenv';

// Load environment variables
config();

// Environment configuration
export const ENV_CONFIG = {
  // Authentication
  CSRF_TOKEN: process.env.CSRF_TOKEN || 'iamcsrcoo=CSRF_TOKEN_PLACEHOLDER',
  SESSION_COOKIES: process.env.SESSION_COOKIES || 'SESSION_COOKIES_PLACEHOLDER',
  
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Validation function
export function validateConfig() {
  const missingVars = [];
  
  if (ENV_CONFIG.CSRF_TOKEN.includes('PLACEHOLDER')) {
    missingVars.push('CSRF_TOKEN');
  }
  
  if (ENV_CONFIG.SESSION_COOKIES.includes('PLACEHOLDER')) {
    missingVars.push('SESSION_COOKIES');
  }
  
  if (missingVars.length > 0) {
    console.warn('⚠️  Warning: Missing environment variables:', missingVars.join(', '));
    console.warn('💡 Please create a .env file based on .env.example');
    console.warn('📖 See README.md for detailed setup instructions');
  }
  
  return missingVars.length === 0;
}
