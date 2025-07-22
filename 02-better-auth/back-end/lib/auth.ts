import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import { envConfig } from '@shared/config/env.config';
import { prisma } from '@shared/prisma';
import { username } from 'better-auth/plugins';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: envConfig.betterAuth.secret,
  session: {
    expiresIn: 60 * 60 * 24 * envConfig.betterAuth.session.expiresIn,
    updateAge: 60 * 60 * 24 * envConfig.betterAuth.session.updateAge,
  },
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
  plugins: [username()],
  trustedOrigins: envConfig.corsOrigins,
});
