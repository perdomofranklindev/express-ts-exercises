import express, { Router } from 'express';
import { AuthController } from './auth-controller';

const router: Router = express.Router();

router.post('/sign-up', AuthController.SignUp);
router.post('/sign-in', AuthController.SignIn);
router.post('/sign-out', AuthController.SignOut);
router.post('/refresh-token', AuthController.RefreshToken);
router.get('/check-token', AuthController.CheckToken);

export default router;
