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
  BETTER_AUTH_SESSION_EXPIRES_IN: num({ default: 7 }),
  BETTER_AUTH_SESSION_UPDATE_AGE: num({ default: 1 }),
});

// Environment variables with their types
export const envConfig = {
  environment: env.NODE_ENV,
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  corsOrigins: env.CORS_ORIGINS.split(','),
  betterAuth: {
    secret: env.BETTER_AUTH_SECRET,
    session: {
      expiresIn: env.BETTER_AUTH_SESSION_EXPIRES_IN,
      updateAge: env.BETTER_AUTH_SESSION_UPDATE_AGE,
    },
  },
};
