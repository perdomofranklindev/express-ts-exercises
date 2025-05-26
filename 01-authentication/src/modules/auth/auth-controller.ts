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
  public static async SignUp(request: Request, response: Response): Promise<void> {
    const user = request.body as User;

    const validatedSchema = await AuthUtils.validateUserSignUp(user);

    if (validatedSchema?.errors?.length) {
      validatedSchema.errors.forEach(issue => {
        response.status(400).json({ message: issue.message });
      });
    }

    const { fistName, lastName, email, password } = user;

    const doesItExist = await AuthUtils.checkUserExists({
      email,
    });

    if (doesItExist) {
      response.status(400).json({
        message: 'User already exists',
      });
    }

    const [newUser, createUserError] = await AuthUtils.createUser({
      fistName,
      lastName,
      email,
      password,
    });

    if (createUserError) {
      response.status(400).json({ message: 'Unexpected error' });
    }

    response.status(201).json({
      id: newUser?.id,
      fistName: newUser?.fistName,
      lastName: newUser?.lastName,
      email: newUser?.email,
    });
  }

  public static async SignIn(request: Request, response: Response): Promise<void> {
    const user = request.body as User;

    const validatedSchema = await AuthUtils.validateUserSignIn(user);

    if (validatedSchema?.errors?.length) {
      validatedSchema.errors.forEach(issue => {
        response.status(400).json({ message: issue.message });
      });
    }

    const { email, password } = user;

    const foundUser = await AuthUtils.findUser({ email });

    if (!foundUser) {
      response.status(400).json({
        message: 'User not found',
      });
    }

    // Password validation.

    const isValidPassword = AuthUtils.isValidPassword({
      currentPassword: user.password,
      incomingPassword: password,
    });
    const notValidPassword = !isValidPassword;

    if (notValidPassword) {
      response.status(401).json({
        message: 'Invalid password',
      });
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
      ...foundUser,
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

  public static async RefreshToken(request: Request, response: Response): Promise<void> {
    const refreshToken = request.cookies.refresh_token;

    if (!refreshToken) {
      response.status(401).json(AuthErrorResponse[AuthErrorCode.INVALID_REFRESH_TOKEN]);
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
}
