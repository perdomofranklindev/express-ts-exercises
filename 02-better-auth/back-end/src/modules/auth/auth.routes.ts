import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.post('/sign-up/email', AuthController.signUp);
router.post('/sign-in/email', AuthController.signIn);
router.post('/sign-out', AuthController.signOut);
router.get('/session', AuthController.getSession);

export { router as authRouter };
