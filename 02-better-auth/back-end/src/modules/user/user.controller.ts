import { Request, Response } from 'express';
import { ErrorCodes } from '@shared/types/api-response.types';
import { ApiResponse } from '@shared/types/api-response.utils';
import { handleTryCatch } from '@shared/utils/try-catch-utils';
import { auth } from '@auth';
import { fromNodeHeaders } from 'better-auth/node';

export class UserController {
  static async me(req: Request, res: Response): Promise<Response> {
    const [session, error] = await handleTryCatch(
      auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      })
    );

    if (error) {
      return res.status(500).json(
        ApiResponse.error({
          message: error.message || 'Internal server error',
          code: ErrorCodes.FAILED_TO_GET_SESSION,
        })
      );
    }

    if (!session?.user) {
      return res.status(404).json(
        ApiResponse.error({
          message: 'User not found',
          code: ErrorCodes.USER_NOT_FOUND,
        })
      );
    }

    return res.json(ApiResponse.success(session.user));
  }
}
