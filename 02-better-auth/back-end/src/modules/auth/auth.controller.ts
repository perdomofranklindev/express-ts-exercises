import { BetterAuthError, ErrorCodes, ErrorCodesTyped } from '@shared/types/api-response.types';
import { handleTryCatch } from '@shared/utils/try-catch-utils';
import { Request, Response } from 'express';
import { SignInBody, SignOutResponse, SignUpBody, SignUpResponse } from './auth.types';
import { auth } from '@auth';
import { fromNodeHeaders } from 'better-auth/node';
import { AuthUtils } from './auth.utils';
import { ApiResponse } from '@shared/types/api-response.utils';

export class AuthController {
  static async signUp(
    req: Request<Record<string, never>, unknown, SignUpBody>,
    res: Response
  ): Promise<Response> {
    const { email, password, firstName, lastName, username } = req.body;

    const generatedUsername = AuthUtils.generateUsername(email, username || undefined);

    // Check if user already exists
    const [existingUser, existingUserError] = await AuthUtils.checkUserExists(email);

    if (existingUserError) {
      console.error('Error checking existing user:', existingUserError);
      return res.status(500).json(
        ApiResponse.error({
          message: 'An internal server error occurred while checking user existence',
          code: ErrorCodes.FAILED_TO_CREATE_USER,
        })
      );
    }

    if (existingUser) {
      return res.status(409).json(
        ApiResponse.error({
          message: 'User with this email already exists',
          code: ErrorCodes.USER_WITH_THIS_EMAIL_ALREADY_EXITS,
        })
      );
    }

    const [data, error] = await handleTryCatch<SignUpResponse, BetterAuthError>(
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
      return res.status(error?.statusCode || 400).json(
        ApiResponse.error({
          message: error.body.message,
          code: error.body.code as ErrorCodesTyped,
        })
      );
    }

    return res.status(201).json(ApiResponse.success(data));
  }

  static async signIn(
    req: Request<Record<string, never>, unknown, SignInBody>,
    res: Response
  ): Promise<Response> {
    const [result, error] = await handleTryCatch<globalThis.Response, BetterAuthError>(
      auth.api.signInEmail({
        body: req.body,
        asResponse: true,
      })
    );

    if (error) {
      return res.status(error.statusCode).json(
        ApiResponse.error({
          message: error.body.message,
          code: error.body.code as ErrorCodesTyped,
        })
      );
    }

    if (!result?.ok) {
      return res.status(result?.status || 500).json(
        ApiResponse.error({
          message: 'Unexpected server error',
          code: ErrorCodes.UNEXPECTED_SERVER_ERROR,
        })
      );
    }

    // Transfer headers (including Set-Cookie) from Better Auth's Response to Express's Response
    result.headers.forEach((value: string, name: string) => {
      res.append(name, value);
    });

    res.status(result.status);
    const responseBody = await result.json();

    return res.json(ApiResponse.success(responseBody));
  }

  static async signOut(req: Request, res: Response): Promise<Response> {
    const [result, error] = await handleTryCatch<SignOutResponse, BetterAuthError>(
      auth.api.signOut({
        headers: fromNodeHeaders(req.headers),
      })
    );

    if (error) {
      return res.status(error.statusCode).json(
        ApiResponse.error({
          message: error.body.message,
          code: error.body.code,
        })
      );
    }

    if (!result?.success) {
      return res.status(400).json(
        ApiResponse.error({
          message: 'Sign out failed',
          code: ErrorCodes.FAILED_TO_GET_SESSION,
        })
      );
    }

    return res.json(ApiResponse.success(result));
  }

  // get-session
  static async getSession(req: Request, res: Response): Promise<Response> {
    const [result, error] = await handleTryCatch(
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

    if (!result?.user) {
      return res.status(404).json(
        ApiResponse.error({
          message: 'User not found',
          code: ErrorCodes.USER_NOT_FOUND,
        })
      );
    }

    return res.json({
      ...result,
    });
  }
}
