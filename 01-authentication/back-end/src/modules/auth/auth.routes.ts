import express, { Router } from 'express';
import { AuthController } from './auth.controller';

const router: Router = express.Router();

router.post('/sign-up', AuthController.signUp);
router.post('/sign-in', AuthController.signIn);
router.post('/sign-out', AuthController.SignOut);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/check-token', AuthController.checkToken);

export { router as authRouter };
