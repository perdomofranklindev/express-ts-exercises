export enum WebhookEvents {
  ORDER_CREATED = "ORDER_CREATED",
  ORDER_UPDATED = "ORDER_UPDATED",
  ORDER_DELETED = "ORDER_DELETED",
}

export type WebhookEventsType = `${WebhookEvents}`;

export interface Webhook {
  id: string;
  label: string | null;
  url: string;
  eventType: WebhookEvents | WebhookEventsType;
  secretKey: string;
  enabledAt: string | null;
  createdAt: string;
  updatedAt: string;
}
