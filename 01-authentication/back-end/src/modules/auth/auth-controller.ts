import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthUtils } from './auth-utils';
import { ENV } from '../../shared/constants';
import {
  COOKIE_ACCESS_TOKEN_MAX_AGE,
  COOKIE_REFRESH_TOKEN_MAX_AGE,
} from '../auth-session/auth-session-constants';
import { AuthErrorCode, AuthErrorResponse } from './auth-constants';

export class AuthController {
  public static async signUp(request: Request, response: Response): Promise<void> {
    const user = request.body as User;

    const validatedSchema = await AuthUtils.validateUserSignUp(user);

    if (validatedSchema?.errors?.length) {
      response.status(400).json({ message: validatedSchema.errors[0].message });
      return;
    }

    const { firstName, lastName, email, password } = user;

    const doesItExist = await AuthUtils.checkUserExists({
      email,
    });

    if (doesItExist) {
      response.status(400).json({
        message: 'User already exists',
      });
      return;
    }

    const [newUser, createUserError] = await AuthUtils.createUser({
      firstName,
      lastName,
      email,
      password,
    });

    if (createUserError) {
      response.status(400).json({ message: 'Unexpected error' });
      return;
    }

    response.status(201).json({
      id: newUser?.id,
      firstName: newUser?.firstName,
      lastName: newUser?.lastName,
      email: newUser?.email,
    });
  }

  public static async signIn(request: Request, response: Response): Promise<void> {
    const user = request.body as User;

    const validatedSchema = await AuthUtils.validateUserSignIn(user);

    if (validatedSchema?.errors?.length) {
      response.status(400).json({ message: validatedSchema.errors[0].message });
      return;
    }

    const { email, password } = user;

    const [foundUser, error] = await AuthUtils.findUser({ email });

    if (error) {
      response.status(400).json({
        message: 'Invalid user',
      });
      return;
    }

    // Password validation.
    const isValidPassword = AuthUtils.isValidPassword({
      currentPassword: String(foundUser?.password),
      incomingPassword: password,
    });

    if (!isValidPassword) {
      response.status(401).json({
        message: 'Invalid password',
      });
      return;
    }

    // Generate tokens.
    const [accessToken, refreshToken] = AuthUtils.generateTokens(foundUser as User);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_ACCESS_TOKEN_MAX_AGE,
    });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_REFRESH_TOKEN_MAX_AGE,
    });

    response.status(200).json({
      id: foundUser?.id,
      firstName: foundUser?.firstName,
      lastName: foundUser?.lastName,
      email: foundUser?.email,
    });
  }

  public static SignOut(request: Request, response: Response): void {
    // Clear both access and refresh token cookies
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    response.status(200).json({ message: 'Successfully signed out' });
  }

  public static async refreshToken(request: Request, response: Response): Promise<void> {
    const refreshToken = request.cookies.refresh_token;

    if (!refreshToken) {
      // We can't determine if the token is missing or expired, so we'll treat it as expired
      // since that's the more common case and requires the same user action (sign in again)
      response.status(401).json(AuthErrorResponse[AuthErrorCode.REFRESH_TOKEN_EXPIRED]);
      return;
    }

    try {
      // Verify the refresh token and get the user data
      const decoded = AuthUtils.verifyRefreshToken(refreshToken);
      const user = await AuthUtils.findUserById(decoded.id);

      if (!user) {
        response.status(401).json(AuthErrorResponse[AuthErrorCode.INVALID_REFRESH_TOKEN]);
        return;
      }

      // Generate new tokens
      const [newAccessToken, newRefreshToken] = AuthUtils.generateTokens(user);

      // Set new cookies
      response.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: ENV.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: COOKIE_ACCESS_TOKEN_MAX_AGE,
      });
      response.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: ENV.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: COOKIE_REFRESH_TOKEN_MAX_AGE,
      });

      response.status(200).json({ message: 'Tokens refreshed successfully' });
    } catch (error) {
      // Clear cookies if the refresh token is expired
      if (error instanceof Error && error.message.includes('expired')) {
        response.clearCookie('access_token', {
          httpOnly: true,
          secure: ENV.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        response.clearCookie('refresh_token', {
          httpOnly: true,
          secure: ENV.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        response.status(401).json(AuthErrorResponse[AuthErrorCode.REFRESH_TOKEN_EXPIRED]);
        return;
      }

      response.status(401).json(AuthErrorResponse[AuthErrorCode.INVALID_REFRESH_TOKEN]);
    }
  }

  public static async checkToken(request: Request, response: Response): Promise<void> {
    const accessToken = request.cookies.access_token;

    if (!accessToken) {
      // We can't determine if the token is missing or expired, so we'll treat it as expired
      // since that's the more common case and requires the same user action (sign in again)
      response.status(401).json(AuthErrorResponse[AuthErrorCode.ACCESS_TOKEN_MISSING]);
      return;
    }

    try {
      // Verify the access token
      const decoded = AuthUtils.verifyAccessToken(accessToken);
      const user = await AuthUtils.findUserById(decoded.id);

      if (!user) {
        response.status(401).json(AuthErrorResponse[AuthErrorCode.INVALID_ACCESS_TOKEN]);
        return;
      }

      response.status(200).json({
        isValid: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      // Check if the error is due to token expiration
      if (error instanceof Error && error.message.includes('expired')) {
        response.status(401).json(AuthErrorResponse[AuthErrorCode.ACCESS_TOKEN_EXPIRED]);
        return;
      }
      response.status(401).json(AuthErrorResponse[AuthErrorCode.INVALID_ACCESS_TOKEN]);
    }
  }
}
