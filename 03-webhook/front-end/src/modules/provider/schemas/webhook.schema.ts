import z from "zod";
import { WebhookEvents } from "../../../shared/api/models/webhook.model";

export const WebhookFormSchema = z.object({
  label: z.string().min(2, "Label must be at least 2 characters long"),
  url: z.string().url("Invalid URL format").min(1, "URL is required"),
  eventType: z.nativeEnum(WebhookEvents).nullable(),
  secretKey: z.string().min(1, "Secret key is required"),
  enabledAt: z.date().nullable().optional(),
});

export type WebhookFormData = z.infer<typeof WebhookFormSchema>;
