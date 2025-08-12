import express, { Router } from 'express';
import { EnvironmentEnvController } from './environment-env.controller';

const router: Router = express.Router();

router.post('/create', EnvironmentEnvController.createEnvironmentEnv);
router.put('/:id', EnvironmentEnvController.updateEnvironmentEnv);
router.delete('/:id', EnvironmentEnvController.deleteEnvironmentEnv);
router.get('/:id', EnvironmentEnvController.getEnvironmentEnv);
router.get('/list', EnvironmentEnvController.getAllEnvironmentEnvs);

export { router as environmentEnvRouter };
