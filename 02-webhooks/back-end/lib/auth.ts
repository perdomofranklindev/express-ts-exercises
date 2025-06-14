import { prisma } from '../src/shared/prisma';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import { username } from 'better-auth/plugins';
import { envConfig } from '@shared/config/env.config';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
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
