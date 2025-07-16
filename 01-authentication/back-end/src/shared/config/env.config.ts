import dotenv from 'dotenv';
import ms from 'ms';
import { cleanEnv, num, str } from 'envalid';

// Load environment variables
dotenv.config();

const oneSecond = 1000;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  PORT: num({ default: 3000 }),
  CORS_ORIGINS: str({ default: 'http://localhost:5173' }),
  DATABASE_URL: str(),
  USERS_PASSWORD_ENCRYPTION_ROUNDS: num({ default: 10 }),
  JWT_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: str({ default: '1h' as ms.StringValue }),
  JWT_REFRESH_TOKEN_EXPIRES_IN: str({ default: '1d' as ms.StringValue }),
  COOKIE_ACCESS_TOKEN_MAX_AGE: num({ default: 1 }),
  COOKIE_REFRESH_TOKEN_MAX_AGE: num({ default: 1 }),
});

// Environment variables with their types
export const envConfig = {
  environment: env.NODE_ENV,
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  jwtSecret: env.JWT_SECRET,
  jwtRefreshSecret: env.JWT_REFRESH_SECRET,
  corsOrigins: env.CORS_ORIGINS.split(','),
  auth: {
    userPasswordEncryptionRounds: env.USERS_PASSWORD_ENCRYPTION_ROUNDS,
    jwt: {
      secret: env.JWT_SECRET,
      refreshSecret: env.JWT_REFRESH_SECRET,
      accessTokenExpiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN as ms.StringValue,
      refreshTokenExpiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
    },
    cookies: {
      accessToken: {
        name: 'access_token',
        maxAge: oneHour * env.COOKIE_ACCESS_TOKEN_MAX_AGE,
      },
      refreshToken: {
        name: 'refresh_token',
        maxAge: oneDay * env.COOKIE_REFRESH_TOKEN_MAX_AGE,
      },
    },
  },
};
