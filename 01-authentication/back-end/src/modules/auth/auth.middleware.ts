import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { AuthErrorCode, AuthErrorResponse } from './auth.types';
import { envConfig } from '@shared/config/env.config';
import jwt from 'jsonwebtoken';

export const authMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  try {
    const accessToken = request.cookies.access_token;

    if (!accessToken) {
      response.status(401).json(AuthErrorResponse[AuthErrorCode.ACCESS_TOKEN_MISSING]);
      return;
    }

    try {
      // Verify the access token
      const decoded = jwt.verify(accessToken, envConfig.auth.jwt.secret) as User;

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
