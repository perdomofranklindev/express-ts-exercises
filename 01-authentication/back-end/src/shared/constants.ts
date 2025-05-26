import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Environment variables with their types
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL || '',
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  JWT_SECRET: String(process.env.JWT_SECRET),
  REFRESH_SECRET: String(process.env.REFRESH_SECRET),
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
} as const;

// Type for the environment variables
export type Env = typeof ENV;
