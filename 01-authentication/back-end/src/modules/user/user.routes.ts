import express, { Response, Router } from 'express';
import { AuthenticatedRequest } from 'src/types/express';
import { UserController } from './user.controller';

const router: Router = express.Router();

// Protected route example
router.get('/profile', (req: AuthenticatedRequest, res: Response) => {
  // The user object is now available in req.user
  res.json({
    message: 'Profile data retrieved successfully',
    user: req.user,
  });
});

// Change password endpoint
router.post('/change-password', UserController.changePassword);

export { router as userRouter };
