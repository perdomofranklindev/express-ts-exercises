import express, { Response, Router } from 'express';
import { authenticateToken } from '../auth/auth-middleware';
import { AuthenticatedRequest } from '../../types/express';

const router: Router = express.Router();

// Protected route example
router.get('/profile', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  // The user object is now available in req.user
  res.json({
    message: 'Profile data retrieved successfully',
    user: req.user,
  });
});

export default router;
