import { User } from '@prisma/generated/client';
import { envConfig } from '@shared/config/env.config';
import { prisma } from '@shared/prisma';
import { handleTryCatch } from '@shared/utils/try-catch-utils';
import bcrypt from 'bcrypt';

export class UserUtils {
  static async updateUserPassword(
    userId: string,
    newPassword: string
  ): Promise<[User | null, Error | null]> {
    const hashedPassword = await bcrypt.hash(
      newPassword,
      envConfig.auth.userPasswordEncryptionRounds
    );

    const response = await handleTryCatch(
      prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      })
    );

    return response;
  }
}
