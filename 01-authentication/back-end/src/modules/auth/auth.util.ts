import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '@prisma/generated/client';
import { SignInSchema, SignUpSchema } from './auth.schemas';
import { handleTryCatch } from '@shared/utils/try-catch-utils';
import {
  CheckUserExistsParams,
  CreateUserParams,
  FindUserParams,
  ValidatePasswordParams,
} from './auth.types';
import { prisma } from '@shared/prisma';
import { envConfig } from '@shared/config/env.config';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '@modules/auth-session/auth-session.config';

export class AuthUtils {
  static async validateUserSignUp(user: User): Promise<ZodError | null> {
    const error = await handleTryCatch(SignUpSchema.parseAsync(user));

    return error[1] as ZodError;
  }

  static async validateUserSignIn(user: User): Promise<ZodError | null> {
    const error = await handleTryCatch(SignInSchema.parseAsync(user));

    return error[1] as ZodError;
  }

  static async checkUserExists({ email }: CheckUserExistsParams): Promise<boolean> {
    if (!email) {
      throw new Error('Email must be provided.');
    }

    const [user] = await handleTryCatch(
      prisma.user.findUnique({
        where: { email },
      })
    );

    return Boolean(user);
  }

  static async createUser({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserParams): Promise<[User | null, Error | null]> {
    const hashedPassword = await bcrypt.hash(password, envConfig.saltRounds);

    const response = await handleTryCatch(
      prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      })
    );

    return response;
  }

  static async findUser({ email }: FindUserParams): Promise<[User | null, Error | null]> {
    if (!email) {
      throw new Error('Email must be provided.');
    }

    const [user, error] = await handleTryCatch(
      prisma.user.findUnique({
        where: {
          email,
        },
      })
    );

    return [user, error];
  }

  static isValidPassword({ currentPassword, incomingPassword }: ValidatePasswordParams): boolean {
    return bcrypt.compareSync(String(incomingPassword), currentPassword);
  }

  static generateAccessToken(payload: User): string {
    return jwt.sign({ ...payload }, envConfig.jwtSecret, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  static generateRefreshToken(user: User): string {
    return jwt.sign({ ...user }, envConfig.refreshSecret, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  static generateTokens(payload: User): [string, string] {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return [accessToken, refreshToken];
  }

  static verifyRefreshToken(token: string): { id: string } {
    try {
      const decoded = jwt.verify(token, envConfig.refreshSecret) as { id: string };
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token has expired. Please sign in again.');
      }
      throw new Error('Invalid refresh token');
    }
  }

  static async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  static verifyAccessToken(token: string): { id: string } {
    try {
      const decoded = jwt.verify(token, envConfig.jwtSecret) as { id: string };
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Access token has expired');
      }
      throw new Error('Invalid access token');
    }
  }
}
