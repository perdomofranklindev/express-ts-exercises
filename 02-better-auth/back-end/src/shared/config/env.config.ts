import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

// Load environment variables
dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  PORT: num({ default: 3000 }),
  DATABASE_URL: str(),
  BETTER_AUTH_SECRET: str(),
  CORS_ORIGINS: str({ default: 'http://localhost:5173' }),
});

// Environment variables with their types
export const envConfig = {
  environment: env.NODE_ENV,
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  betterAuthSecret: env.BETTER_AUTH_SECRET,
  corsOrigins: env.CORS_ORIGINS.split(','),
};
