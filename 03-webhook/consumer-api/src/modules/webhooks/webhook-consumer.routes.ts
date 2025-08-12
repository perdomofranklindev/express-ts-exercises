import express, { Router } from 'express';
import { WebhookConsumerController } from './webhook-consumer.controller';

const router: Router = express.Router();

router.post('/consume', WebhookConsumerController.consume);

export { router as webhookConsumerRouter };
