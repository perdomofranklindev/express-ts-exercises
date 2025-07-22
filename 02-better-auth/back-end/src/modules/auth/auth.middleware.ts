import { NextFunction, Request, Response } from 'express';
import { auth } from '@auth';
import { fromNodeHeaders } from 'better-auth/node';
import { handleTryCatch } from '@shared/utils/try-catch-utils';
import { ErrorCodes } from '@shared/types/api-response.types';
import { ApiResponse } from '@shared/types/api-response.utils';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const [session, error] = await handleTryCatch(
    auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
  );
  if (error || !session) {
    res.status(401).json(
      ApiResponse.error({
        message: 'Unauthorized',
        code: ErrorCodes.INVALID_TOKEN,
      })
    );
    return;
  }
  (req as unknown as { session: typeof session }).session = session;
  next();
}
