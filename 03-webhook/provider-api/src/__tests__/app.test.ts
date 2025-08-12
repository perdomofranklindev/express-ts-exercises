import request from 'supertest';
import app from '../app';
import { prisma } from '@shared/prisma';
import { Webhook, WebhookEvents } from '@prisma/generated/client';

// Mock Prisma and node-fetch
jest.mock('@shared/prisma', () => ({
  prisma: {
    webhook: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

// eslint-disable-next-line
// (global as any).fetch = jest.fn();
jest.mock('node-fetch', () => jest.fn());

const mockWebhook: Webhook = {
  id: 'hook-123',
  url: 'https://example.com/webhook',
  eventType: WebhookEvents.ORDER_CREATED,
  secretKey: 'sec_abcdef123456',
  enabledAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Webhook API Endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test POST /create
  describe('POST /create', () => {
    it('should create a new webhook', async () => {
      (prisma.webhook.create as jest.Mock).mockResolvedValue(mockWebhook);

      const res = await request(app).post('/api/webhook/create').send({
        url: 'https://example.com/webhook',
        eventType: WebhookEvents.ORDER_CREATED,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({
        id: mockWebhook.id,
        url: mockWebhook.url,
        eventType: mockWebhook.eventType,
      });
      expect(prisma.webhook.create).toHaveBeenCalledWith({
        data: {
          url: 'https://example.com/webhook',
          eventType: WebhookEvents.ORDER_CREATED,
          secretKey: expect.any(String),
        },
      });
    });

    it('should return 500 on creation failure', async () => {
      (prisma.webhook.create as jest.Mock).mockRejectedValue(new Error('DB error'));

      const res = await request(app).post('/api/webhook/create').send({
        url: 'https://example.com/webhook',
        eventType: WebhookEvents.ORDER_CREATED,
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to create webhook' });
    });
  });

  // Test GET /
  describe('GET /', () => {
    it('should retrieve all webhooks', async () => {
      (prisma.webhook.findMany as jest.Mock).mockResolvedValue([mockWebhook]);

      const res = await request(app).get('/api/webhook/list');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        {
          ...mockWebhook,
          createdAt: mockWebhook.createdAt.toISOString(),
          updatedAt: mockWebhook.updatedAt.toISOString(),
          enabledAt: mockWebhook.enabledAt?.toISOString(),
        },
      ]);
    });

    it('should return 500 on retrieval failure', async () => {
      (prisma.webhook.findMany as jest.Mock).mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/webhook/list');

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to retrieve webhooks' });
    });
  });

  // Test PUT /:id
  describe('PUT /:id', () => {
    it('should update a webhook', async () => {
      const updatedWebhook = { ...mockWebhook, url: 'https://new-url.com' };
      (prisma.webhook.update as jest.Mock).mockResolvedValue(updatedWebhook);

      const res = await request(app)
        .put('/api/webhook/hook-123')
        .send({ url: 'https://new-url.com' });

      expect(res.statusCode).toBe(200);
      expect(res.body.url).toBe('https://new-url.com');
    });

    it('should return 500 on update failure', async () => {
      (prisma.webhook.update as jest.Mock).mockRejectedValue(new Error('DB error'));

      const res = await request(app)
        .put('/api/webhook/hook-123')
        .send({ url: 'https://new-url.com' });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to update webhook' });
    });
  });

  // Test PATCH /:id/toggle
  describe('PATCH /:id/toggle', () => {
    it('should enable a webhook', async () => {
      const enabledWebhook = { ...mockWebhook, enabledAt: new Date() };
      (prisma.webhook.update as jest.Mock).mockResolvedValue(enabledWebhook);

      const res = await request(app)
        .patch('/api/webhook/hook-123/toggle')
        .send({ enabledAt: true });

      expect(res.statusCode).toBe(200);
      expect(res.body.enabledAt).toBeDefined();
      expect(prisma.webhook.update).toHaveBeenCalledWith({
        where: { id: 'hook-123' },
        data: { enabledAt: expect.any(Date) },
      });
    });

    it('should disable a webhook', async () => {
      const disabledWebhook = { ...mockWebhook, enabledAt: null };
      (prisma.webhook.update as jest.Mock).mockResolvedValue(disabledWebhook);

      const res = await request(app)
        .patch('/api/webhook/hook-123/toggle')
        .send({ enabledAt: false });

      expect(res.statusCode).toBe(200);
      expect(res.body.enabledAt).toBeNull();
      expect(prisma.webhook.update).toHaveBeenCalledWith({
        where: { id: 'hook-123' },
        data: { enabledAt: undefined },
      });
    });
  });

  // Test POST /:id/regenerate-secret
  describe('POST /:id/regenerate-secret', () => {
    it('should regenerate secret key', async () => {
      const updatedWebhook = { ...mockWebhook, secretKey: 'new_secret' };
      (prisma.webhook.update as jest.Mock).mockResolvedValue(updatedWebhook);

      const res = await request(app).post('/api/webhook/hook-123/regenerate-secret');

      expect(res.statusCode).toBe(200);
      expect(res.body.secretKey).toBe('new_secret');
      expect(prisma.webhook.update).toHaveBeenCalledWith({
        where: { id: 'hook-123' },
        data: { secretKey: expect.any(String) },
      });
    });

    it('should return 500 on regeneration failure', async () => {
      (prisma.webhook.update as jest.Mock).mockRejectedValue(new Error('DB error'));

      const res = await request(app).post('/api/webhook/hook-123/regenerate-secret');

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to regenerate secret key' });
    });
  });
});
