import { prisma } from './prisma';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import { username } from 'better-auth/plugins';
import { envConfig } from './config/env.config';

export const auth = betterAuth({
  adapter: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  secret: envConfig.betterAuthSecret,
  plugins: [username()],
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
      },
      lastName: {
        type: 'string',
        required: true,
      },
    },
  },
});
