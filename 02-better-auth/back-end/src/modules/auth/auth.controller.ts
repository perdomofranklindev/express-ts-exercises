import { ApiResponse } from '@shared/types/api-response.types';
import { handleTryCatch } from '@shared/utils/try-catch-utils';
import { Request, Response } from 'express';
import { SignInBody, SignUpBody } from './auth.types';
import { auth } from '@auth';
import { fromNodeHeaders } from 'better-auth/node';

export class AuthController {
  static async signUp(
    req: Request<Record<string, never>, unknown, SignUpBody>,
    res: Response
  ): Promise<Response> {
    const { email, password, firstName, lastName, username } = req.body;

    const generatedUsername = username ? username : email.split('@')[0];

    const [user, error] = await handleTryCatch(
      auth.api.signUpEmail({
        body: {
          email,
          name: firstName,
          firstName,
          lastName,
          password,
          username: generatedUsername,
          displayUsername: generatedUsername,
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
    const [result, error] = await handleTryCatch(
      auth.api.signInEmail({
        body: req.body,
        asResponse: true,
      })
    );

    if (error) {
      console.error('Unexpected error during sign-in:', error);
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            null,
            error.message || 'An internal server error occurred during sign-in.'
          )
        );
    }

    if (!result?.ok) {
      return res
        .status(result ? result.status : 500)
        .json(new ApiResponse(result ? result.status : 500, null, 'Authentication failed'));
    }

    // Transfer headers (including Set-Cookie) from Better Auth's Response to Express's Response
    result.headers.forEach((value: string, name: string) => {
      res.append(name, value);
    });

    res.status(result.status);
    const responseBody = await result.json();

    return res.json(new ApiResponse(result.status, responseBody, 'Sign in successful'));
  }

  static async getSession(req: Request, res: Response): Promise<Response> {
    const [session, error] = await handleTryCatch(
      auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      })
    );

    if (error) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            null,
            error.message || 'An internal server error occurred while fetching the session.'
          )
        );
    }

    if (!session) {
      return res.status(401).json(new ApiResponse(401, null, 'No active session found'));
    }

    return res.json(new ApiResponse(200, session, 'Session fetched successfully'));
  }

  static async signOut(req: Request, res: Response): Promise<Response> {
    const [result, error] = await handleTryCatch(
      auth.api.signOut({
        headers: fromNodeHeaders(req.headers),
      })
    );

    if (error) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            null,
            error.message || 'An internal server error occurred during sign out.'
          )
        );
    }

    if (!result?.success) {
      return res.status(400).json(new ApiResponse(400, null, 'Sign out failed'));
    }

    return res.json(new ApiResponse(200, result, 'Sign out successful'));
  }
}
