import { AuthUtils } from '@modules/auth/auth.util';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/types/express';
import { UserUtils } from './user.util';

export class UserController {
  public static async changePassword(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    const { currentPassword, newPassword } = request.body;
    const userId = request.user?.id;

    if (!userId) {
      response.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Find the user
    const user = await AuthUtils.findUserById(userId);

    if (!user) {
      response.status(404).json({ message: 'User not found' });
      return;
    }

    // Validate current password
    const isValidPassword = AuthUtils.isValidPassword({
      currentPassword: String(user.password),
      incomingPassword: currentPassword,
    });

    if (!isValidPassword) {
      response.status(401).json({ message: 'Current password is incorrect' });
      return;
    }

    // Update password
    const [, updateError] = await UserUtils.updateUserPassword(userId, newPassword);

    if (updateError) {
      response.status(500).json({ message: 'Failed to update password' });
      return;
    }

    response.status(200).json({ message: 'Password updated successfully' });
  }
}
