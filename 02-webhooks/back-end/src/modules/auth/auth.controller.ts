import { auth } from '@lib/auth';
import { ApiResponse } from '@shared/types/api-response.types';
import { handleTryCatch } from '@shared/utils/try-catch-utils';
import { Request, Response } from 'express';
import { AuthResponse, SignInBody, SignOutResponse, SignUpBody } from './auth.types';

export class AuthController {
  static async signUp(
    req: Request<Record<string, never>, unknown, SignUpBody>,
    res: Response
  ): Promise<Response> {
    const { email, password, name, firstName, lastName } = req.body;
    const [user, error] = await handleTryCatch(
      auth.api.signUpEmail({
        body: {
          email,
          name,
          password,
          firstName,
          lastName,
        },
      })
    );

    if (error) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, error.message || 'Registration failed'));
    }

    if (!user) {
      return res.status(400).json(new ApiResponse(400, null, 'Failed to create user'));
    }

    return res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
  }

  static async signIn(
    req: Request<Record<string, never>, unknown, SignInBody>,
    res: Response
  ): Promise<Response> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(new ApiResponse(400, null, 'Email and password are required'));
    }

    const [result, error] = await handleTryCatch<AuthResponse>(
      auth.api.signInEmail({
        body: { email, password },
      })
    );

    if (error) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, error.message || 'Authentication failed'));
    }

    if (!result) {
      return res.status(401).json(new ApiResponse(401, null, 'Authentication failed'));
    }

    if (!result.token) {
      return res.status(401).json(new ApiResponse(401, null, 'Invalid session token'));
    }

    res.cookie('sessionToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json(new ApiResponse(200, { user: result.user }, 'Login successful'));
  }

  static async signOut(req: Request, res: Response): Promise<Response> {
    const sessionToken = req.cookies.sessionToken;
    if (sessionToken) {
      const [, error] = await handleTryCatch<SignOutResponse>(
        auth.api.signOut({
          headers: {
            cookie: `sessionToken=${sessionToken}`,
          },
        })
      );

      if (error) {
        return res.status(400).json(new ApiResponse(400, null, error.message || 'Logout failed'));
      }
    }

    res.clearCookie('sessionToken');
    return res.status(200).json(new ApiResponse(200, null, 'Logout successful'));
  }
}
