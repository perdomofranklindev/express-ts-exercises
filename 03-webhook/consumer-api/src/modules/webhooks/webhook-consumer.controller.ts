import { HmacSHA256, enc } from 'crypto-js';
import { Request, Response } from 'express';

export class WebhookConsumerController {
  static consume(req: Request, res: Response): Response {
    const notSignature = req.headers['x-Hub-Signature'] === undefined;
    const signature = req.headers['x-Hub-Signature'] as string;

    if (notSignature) {
      return res.status(400).json({
        error: 'Signature not found',
      });
    }

    const expectedSign = HmacSHA256(req.body, 'secret-key-here').toString(enc.Hex);

    if (signature !== expectedSign) {
      return res.status(403).json({
        error: 'Invalid signature',
      });
    }

    return res.status(200).json({
      message: 'Webhook received successfully',
    });
  }
}
