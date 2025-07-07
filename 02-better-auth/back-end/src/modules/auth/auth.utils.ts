import { prisma } from '@shared/prisma';
import { handleTryCatch } from '@shared/utils/try-catch-utils';

export class AuthUtils {
  /**
   * Check if a user exists by email
   * @param email - The email to check
   * @returns Promise<[user | null, error | null]>
   */
  static async checkUserExists(email: string): Promise<[any, Error | null]> {
    return handleTryCatch(
      prisma.user.findUnique({
        where: { email },
      })
    );
  }

  /**
   * Check if a user exists by username
   * @param username - The username to check
   * @returns Promise<[user | null, error | null]>
   */
  static async checkUsernameExists(username: string): Promise<[any, Error | null]> {
    return handleTryCatch(
      prisma.user.findUnique({
        where: { username },
      })
    );
  }

  /**
   * Generate a username from email if not provided
   * @param email - The email address
   * @param providedUsername - Optional username provided by user
   * @returns string - The generated or provided username
   */
  static generateUsername(email: string, providedUsername?: string): string {
    return providedUsername || email.split('@')[0];
  }
}
