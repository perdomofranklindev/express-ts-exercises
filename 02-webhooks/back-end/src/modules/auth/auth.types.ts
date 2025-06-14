import { User } from '@prisma-generated-types';

export type SignUpBody = Pick<User, 'email' | 'password' | 'name' | 'firstName' | 'lastName'>;

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
