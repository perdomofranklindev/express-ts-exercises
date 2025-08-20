import { apiProvider } from "../client";
import type { Webhook } from "../models/webhook.model";

export class WebhookService {
  static async getWebhooks(): Promise<Webhook[]> {
    const response = await apiProvider.get("/webhook/list");
    return response.data;
  }

  static async createWebhook(webhookData: Webhook): Promise<Webhook> {
    const response = await apiProvider.post("/webhook/create", webhookData);
    return response.data;
  }

  static async updateWebhook(
    webhookId: string,
    webhookData: Webhook
  ): Promise<Webhook> {
    const response = await apiProvider.put(
      `/webhook/${webhookId}`,
      webhookData
    );
    return response.data;
  }
}
