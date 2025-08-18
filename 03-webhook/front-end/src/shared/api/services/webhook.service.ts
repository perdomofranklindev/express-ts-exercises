import { apiProvider } from "../client";
import type { Webhook } from "../models/webhook.model";

export class WebhookService {
  static async getWebhooks() {
    const response = await apiProvider.get("/webhook/list");
    return response.data;
  }

  static async createWebhook(webhookData: Webhook) {
    const response = await apiProvider.post("/webhook/create", webhookData);
    return response.data;
  }
}
