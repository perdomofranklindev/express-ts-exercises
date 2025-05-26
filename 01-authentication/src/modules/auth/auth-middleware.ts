import { NextFunction, Request, Response } from 'express';
import { ENV } from '../../shared/constants';
import { User } from '@prisma/client';
import { AuthErrorCode, AuthErrorResponse } from './auth-constants';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  try {
    const accessToken = request.cookies.access_token;

    if (!accessToken) {
      response.status(401).json(AuthErrorResponse[AuthErrorCode.ACCESS_TOKEN_MISSING]);
      return;
    }

    try {
      // Verify the access token
      const decoded = jwt.verify(accessToken, ENV.JWT_SECRET) as User;

      // Attach user to request object
      request.user = {
        ...decoded,
      };

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        response.status(401).json(AuthErrorResponse[AuthErrorCode.ACCESS_TOKEN_EXPIRED]);
        return;
      }

      response.status(401).json(AuthErrorResponse[AuthErrorCode.INVALID_ACCESS_TOKEN]);
    }
  } catch (error) {
    response.status(500).json(AuthErrorResponse[AuthErrorCode.INTERNAL_SERVER_ERROR]);
  }
};
