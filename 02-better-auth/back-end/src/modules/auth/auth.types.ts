import { User } from '@prisma/generated/client';

export type SignUpBody = Pick<User, 'email' | 'name' | 'firstName' | 'lastName' | 'username'> & {
  password: string;
};

export type SignInBody = Pick<User, 'email'> & { password: string };

export type AuthUser = Pick<
  User,
  'id' | 'email' | 'name' | 'emailVerified' | 'createdAt' | 'updatedAt'
> & {
  image: string | null | undefined;
};

export interface AuthResponse {
  user: AuthUser;
  token: string;
  redirect: boolean;
  url?: string;
}

export interface SignOutResponse {
  success: boolean;
}

export interface SessionResponse {
  user: AuthUser;
  expires: Date;
}
