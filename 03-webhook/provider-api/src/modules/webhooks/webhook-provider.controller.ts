import { Request, Response } from 'express';
import { handleTryCatch } from '../../shared/utils/try-catch-utils';
import { Webhook } from './../../../prisma/generated/client/index.d';
import { prisma } from '@shared/prisma';
import { WebhookProviderUtils } from './webhook-provider.utils';

export class WebhookProviderController {
  static async createWebhook(
    req: Request<Record<string, never>, unknown, Webhook>,
    res: Response
  ): Promise<Response> {
    const [webhook, error] = await handleTryCatch(
      prisma.webhook.create({
        data: { ...req.body, secretKey: WebhookProviderUtils.generateSecretKey() },
      })
    );

    if (error) {
      return res.status(500).json({ error: 'Failed to create webhook' });
    }

    return res.status(201).json(webhook);
  }

  static async getWebhooks(req: Request, res: Response): Promise<Response> {
    const [webhooks, error] = await handleTryCatch(prisma.webhook.findMany());

    if (error) {
      return res.status(500).json({ error: 'Failed to retrieve webhooks' });
    }

    return res.status(200).json(webhooks);
  }

  static async updateWebhook(
    req: Request<{ id: string }, unknown, Partial<Webhook>>,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    const [webhook, error] = await handleTryCatch(
      prisma.webhook.update({
        where: { id },
        data: req.body,
      })
    );

    if (error) {
      return res.status(500).json({ error: 'Failed to update webhook' });
    }

    return res.status(200).json(webhook);
  }

  static async toggleWebhook(
    req: Request<{ id: string }, unknown, Pick<Webhook, 'enabledAt'>>,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    const [webhook, error] = await handleTryCatch(
      prisma.webhook.update({
        where: { id },
        data: { enabledAt: req.body.enabledAt ? new Date() : undefined },
      })
    );

    if (error) {
      return res.status(500).json({ error: 'Failed to update webhook' });
    }

    return res.status(200).json(webhook);
  }

  static async triggerWebhook(
    req: Request<{ id: string }, unknown, Pick<Webhook, 'eventType'>>,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const { eventType } = req.body;

    const [webhook, error] = await handleTryCatch(
      prisma.webhook.findUnique({
        where: { id, eventType, enabledAt: { not: null } },
      })
    );

    if (error) {
      return res.status(500).json({ error: 'Failed to retrieve webhook' });
    }

    if (!webhook) {
      return res.status(404).json({ error: 'Webhook not found' });
    }

    const payload = { eventType };
    const headers = WebhookProviderUtils.generateSignedHeaders(payload, webhook.secretKey);

    const [, triggerError] = await handleTryCatch(
      fetch(webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })
    );

    if (triggerError) {
      return res.status(500).json({ error: 'Failed to trigger webhook' });
    }

    return res.status(200).json({ message: 'Webhook triggered successfully' });
  }

  static async regenerateSecretKey(
    req: Request<{ id: string }, unknown, unknown>,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    const [webhook, error] = await handleTryCatch(
      prisma.webhook.update({
        where: { id },
        data: { secretKey: WebhookProviderUtils.generateSecretKey() },
      })
    );

    if (error) {
      return res.status(500).json({ error: 'Failed to regenerate secret key' });
    }

    return res.status(200).json(webhook);
  }
}
