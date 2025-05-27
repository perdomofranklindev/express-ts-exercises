import { User } from '@prisma/client';
import { handleTryCatch } from '../../shared/utils/try-catch';
import { prisma } from '../../shared/prisma';
import { ENV } from '../../shared/constants';
import bcrypt from 'bcrypt';

export class UserUtils {
  static async updateUserPassword(
    userId: string,
    newPassword: string
  ): Promise<[User | null, Error | null]> {
    const hashedPassword = await bcrypt.hash(newPassword, ENV.SALT_ROUNDS);

    const response = await handleTryCatch(
      prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      })
    );

    return response;
  }
} 