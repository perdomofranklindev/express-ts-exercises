import React from "react";
import {
  Box,
  Grid,
  useTheme,
  Container,
} from "@mui/material";
import { WebhookEvents } from "../../../shared/api/models/webhook.model";
import type { EnvironmentVariable } from "../../../shared/api/models/environment-variable.model";
import type { Webhook } from "../../../shared/api/models/webhook.model";
import Header from "../components/shared/Header";

import ProviderPanel from "../components/provider/ProviderPanel";
import ConsumerPanel from "../components/consumer/ConsumerPanel";

// Mock data
const initialWebhooks: Webhook[] = [
  {
    id: "1",
    label: "Order Creation Webhook",
    url: "https://api.example.com/webhooks/orders",
    eventType: WebhookEvents.ORDER_CREATED,
    secretKey: "sk_live_1234567890abcdef",
    enabledAt: new Date("2023-05-15T14:30:00Z"),
    createdAt: new Date("2023-05-10T09:15:00Z"),
    updatedAt: new Date("2023-05-10T09:15:00Z"),
  },
  {
    id: "2",
    label: "Order Update Webhook",
    url: "https://api.example.com/webhooks/order-updates",
    eventType: WebhookEvents.ORDER_UPDATED,
    secretKey: "sk_live_0987654321fedcba",
    enabledAt: new Date("2023-05-12T11:20:00Z"),
    createdAt: new Date("2023-05-05T14:45:00Z"),
    updatedAt: new Date("2023-05-08T16:30:00Z"),
  },
  {
    id: "3",
    label: "Order Deletion Webhook",
    url: "https://api.example.com/webhooks/order-deletions",
    eventType: WebhookEvents.ORDER_DELETED,
    secretKey: "sk_live_a1b2c3d4e5f67890",
    enabledAt: null,
    createdAt: new Date("2023-05-18T10:00:00Z"),
    updatedAt: new Date("2023-05-18T10:00:00Z"),
  },
];

const initialEnvVars: EnvironmentVariable[] = [
  {
    id: "1",
    name: "WEBHOOK_SECRET",
    secretKey: "sk_live_1234567890abcdef",
    provider: "Stripe",
    createdAt: new Date("2023-04-20T08:30:00Z"),
    updatedAt: new Date("2023-05-10T09:15:00Z"),
  },
  {
    id: "2",
    name: "PAYMENT_WEBHOOK_SECRET",
    secretKey: "sk_live_0987654321fedcba",
    provider: "PayPal",
    createdAt: new Date("2023-05-01T14:20:00Z"),
    updatedAt: new Date("2023-05-08T16:30:00Z"),
  },
];

const WebhookManagementPage: React.FC = () => {
  const theme = useTheme();

  // const handleWebhookSubmit = () => {
  //   const newWebhook: Webhook = {
  //     id: currentWebhook
  //       ? currentWebhook.id
  //       : `wh_${Math.random().toString(36).substr(2, 9)}`,
  //     label: webhookForm.label || null,
  //     url: webhookForm.url,
  //     eventType: webhookForm.eventType,
  //     secretKey: webhookForm.secretKey,
  //     enabledAt: webhookForm.enabled ? new Date() : null,
  //     createdAt: currentWebhook ? currentWebhook.createdAt : new Date(),
  //     updatedAt: new Date(),
  //   };

  //   if (currentWebhook) {
  //     setWebhooks(
  //       webhooks.map((wh) => (wh.id === currentWebhook.id ? newWebhook : wh))
  //     );
  //     setSnackbar({
  //       open: true,
  //       message: "Webhook updated successfully",
  //       severity: "success",
  //     });
  //   } else {
  //     setWebhooks([...webhooks, newWebhook]);
  //     setSnackbar({
  //       open: true,
  //       message: "Webhook created successfully",
  //       severity: "success",
  //     });
  //   }

  //   handleCloseDialogs();
  // };

  // const handleEnvVarSubmit = () => {
  //   const newEnvVar: EnvironmentVariable = {
  //     id: currentEnvVar
  //       ? currentEnvVar.id
  //       : `env_${Math.random().toString(36).substr(2, 9)}`,
  //     name: envVarForm.name,
  //     secretKey: envVarForm.secretKey,
  //     provider: envVarForm.provider || null,
  //     createdAt: currentEnvVar ? currentEnvVar.createdAt : new Date(),
  //     updatedAt: new Date(),
  //   };

  //   if (currentEnvVar) {
  //     setEnvVars(
  //       envVars.map((ev) => (ev.id === currentEnvVar.id ? newEnvVar : ev))
  //     );
  //     setSnackbar({
  //       open: true,
  //       message: "Environment variable updated",
  //       severity: "success",
  //     });
  //   } else {
  //     setEnvVars([...envVars, newEnvVar]);
  //     setSnackbar({
  //       open: true,
  //       message: "Environment variable created",
  //       severity: "success",
  //     });
  //   }

  //   handleCloseDialogs();
  // };

  const activeWebhooks = initialWebhooks.filter((wh) => wh.enabledAt);
  const inactiveWebhooks = initialWebhooks.filter((wh) => !wh.enabledAt);

  return (
    <Box
      sx={{
        background: theme.palette.background.gradient,
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Header
          activeWebhooks={activeWebhooks.length}
          inactiveWebhooks={inactiveWebhooks.length}
          envVars={initialEnvVars.length}
        />
        <Grid container spacing={4}>
          <ProviderPanel
            activeWebhooks={activeWebhooks}
            inactiveWebhooks={inactiveWebhooks}
          />
          <ConsumerPanel initialEnvVars={initialEnvVars} />
        </Grid>
      </Container>
    </Box>
  );
};

export default WebhookManagementPage;
