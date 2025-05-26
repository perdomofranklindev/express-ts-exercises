import { z } from 'zod';

const firstName = z.string({ message: 'First name required' });

const lastName = z.string({ message: 'Last name required' });

const email = z
  .string({ message: 'Email required' })
  .email('Please enter a valid email address')
  .transform(val => val.toLowerCase());

const password = z
  .string({ message: 'Password required' })
  .min(8, 'Password must be at least 8 characters long');

export const SignUpSchema = z.object({
  firstName,
  lastName,
  email,
  password,
});

export const SignInSchema = z.object({
  email,
  password,
});

export const ChangePasswordSchema = z.object({
  currentPassword: password,
  newPassword: password,
});
