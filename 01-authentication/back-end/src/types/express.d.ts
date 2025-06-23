import { Request } from 'express';
import { User } from '@prisma/generated/client';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add custom properties here
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}
