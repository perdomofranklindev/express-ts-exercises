import express, { Router } from 'express';
import { WebhookProviderController } from './webhook-provider.controller';

const router: Router = express.Router();

router.post('/create', WebhookProviderController.createWebhook);
router.get('/list', WebhookProviderController.getWebhooks);
router.put('/:id', WebhookProviderController.updateWebhook);
router.patch('/:id/toggle', WebhookProviderController.toggleWebhook);
router.post('/:id/trigger', WebhookProviderController.triggerWebhook);
router.post('/:id/regenerate-secret', WebhookProviderController.regenerateSecretKey);

export { router as webhookRouter };
