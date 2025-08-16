import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Grid,
  Stack,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { type Webhook } from "../../../../shared/api/models/webhook.model";
import WebhookDialog from "./WebhookDialog";
import type { WebhookFormData } from "../../schemas/webhook.schema";
import WebhookCard from "../shared/WebhookCard";
import EmptyState from "../shared/EmptyState";

interface ProviderPanelProps {
  activeWebhooks: Webhook[];
  inactiveWebhooks: Webhook[];
}

const ProviderPanel: React.FC<ProviderPanelProps> = ({
  activeWebhooks,
  inactiveWebhooks,
}) => {
  const theme = useTheme();

  const [openWebhookDialog, setOpenWebhookDialog] = useState(false);
  const [currentWebhook, setCurrentWebhook] = useState<Webhook | null>(null);
  const [expandedWebhook, setExpandedWebhook] = useState<string | null>(null);
  const [copiedSecret, setCopiedSecret] = useState<string | null>(null);
  const [triggeringWebhook, setTriggeringWebhook] = useState<string | null>(
    null
  );
  // Dialogs methods

  const handleWebhookDialogOpen = (webhook: Webhook | null = null) => {
    if (webhook) {
      setCurrentWebhook(webhook);
      setOpenWebhookDialog(true);
      // TODO: Webhook update.
      // resetWebhookForm({
      //   label: webhook.label || "",
      //   url: webhook.url,
      //   eventType: webhook.eventType as WebhookEvents,
      //   secretKey: webhook.secretKey,
      //   enabledAt: webhook.enabledAt,
      // });
      return;
    }

    setCurrentWebhook(null);
    // TODO: Webhook create.
    // resetWebhookForm({
    //   label: "",
    //   url: "",
    //   eventType: WebhookEvents.ORDER_CREATED,
    //   secretKey: generateSecretKey(),
    //   enabledAt: new Date(),
    // });
    setOpenWebhookDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenWebhookDialog(false);
  };

  // Webhook accordions

  const handleToggleExpand = (id: string) => {
    setExpandedWebhook(expandedWebhook === id ? null : id);
  };

  const handleDeleteWebhook = (id: string) => {
    // TODO: API call here!
    // TODO: Here it should refresh the list items.
    console.log("webhook: ", id);
    // setWebhooks(webhooks.filter((wh) => wh.id !== id));
    // setSnackbar({ open: true, message: "Webhook deleted", severity: "info" });
  };

  const handleRegenerateSecret = (id: string) => {
    // TODO: API call here, update!
    // TODO: Here it should regenerate the webhook secret.
    console.log("webhook: ", id);
    // setWebhooks(
    //   webhooks.map((wh) =>
    //     wh.id === id ? { ...wh, secretKey: generateSecretKey() } : wh
    //   )
    // );
    // setSnackbar({
    //   open: true,
    //   message: "Secret key regenerated",
    //   severity: "success",
    // });
  };

  const handleTriggerWebhook = (webhook: Webhook) => {
    // TODO: API consume the trigger POST consumption!
    console.log("webhook: ", webhook);
    // setTriggeringWebhook(webhook.id);
    // setSnackbar({
    //   open: true,
    //   message: `Triggering webhook to ${webhook.url}`,
    //   severity: "info",
    // });

    // // Simulate API call
    // setTimeout(() => {
    //   setTriggeringWebhook(null);
    //   setSnackbar({
    //     open: true,
    //     message: "Webhook triggered successfully",
    //     severity: "success",
    //   });
    // }, 2000);
  };

  const handleCopySecret = (secret: string, id: string) => {
    navigator.clipboard.writeText(secret);
    setCopiedSecret(id);
    // setSnackbar({
    //   open: true,
    //   message: "Secret key copied to clipboard",
    //   severity: "success",
    // });
    // setTimeout(() => setCopiedSecret(null), 2000);
  };

  return (
    <>
      {/* Provider Panel */}
      <Grid size={{ xs: 12, lg: 7 }}>
        <Zoom in timeout={600}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${theme.palette.divider}`,
              height: "fit-content",
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <CloudUploadIcon />
                </Avatar>
              }
              title={
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Webhook Provider
                </Typography>
              }
              subheader="Manage outgoing webhook endpoints"
              action={
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleWebhookDialogOpen()}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    background: theme.palette.gradients.primary,
                  }}
                >
                  New Webhook
                </Button>
              }
              sx={{ pb: 1 }}
            />

            <CardContent>
              {/* Active Webhooks Section */}
              <Box sx={{ mb: 4 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mr: 1 }}>
                      Active Webhooks
                    </Typography>
                    <Badge
                      badgeContent={activeWebhooks.length}
                      color="success"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Box>
                  <Button
                    size="small"
                    startIcon={<RefreshIcon />}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  >
                    Refresh All
                  </Button>
                </Stack>

                {activeWebhooks.length > 0 ? (
                  <Stack spacing={2}>
                    {activeWebhooks.map((webhook, index) => (
                      <Fade in timeout={800 + index * 200} key={webhook.id}>
                        <div>
                          <WebhookCard
                            webhook={webhook}
                            expanded={expandedWebhook === webhook.id}
                            onToggleExpand={handleToggleExpand}
                            onEdit={() => handleWebhookDialogOpen(webhook)}
                            onDelete={() => handleDeleteWebhook(webhook.id)}
                            onRegenerate={() =>
                              handleRegenerateSecret(webhook.id)
                            }
                            onTrigger={() => handleTriggerWebhook(webhook)}
                            onCopySecret={handleCopySecret}
                            triggering={triggeringWebhook === webhook.id}
                            copiedSecret={copiedSecret}
                          />
                        </div>
                      </Fade>
                    ))}
                  </Stack>
                ) : (
                  <EmptyState
                    icon={<CheckCircleIcon />}
                    title="No Active Webhooks"
                    description="Create your first webhook to start receiving real-time notifications."
                    action={
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleWebhookDialogOpen()}
                        sx={{ borderRadius: 2 }}
                      >
                        Create Webhook
                      </Button>
                    }
                  />
                )}
              </Box>

              {/* Inactive Webhooks Section */}
              {inactiveWebhooks.length > 0 && (
                <Box>
                  <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mr: 1 }}>
                      Inactive Webhooks
                    </Typography>
                    <Badge
                      badgeContent={inactiveWebhooks.length}
                      color="warning"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Stack>

                  <Stack spacing={2}>
                    {inactiveWebhooks.map((webhook, index) => (
                      <Fade in timeout={1200 + index * 200} key={webhook.id}>
                        <div>
                          <WebhookCard
                            webhook={webhook}
                            expanded={expandedWebhook === webhook.id}
                            onToggleExpand={handleToggleExpand}
                            onEdit={() => handleWebhookDialogOpen(webhook)}
                            onDelete={() => handleDeleteWebhook(webhook.id)}
                            onRegenerate={() =>
                              handleRegenerateSecret(webhook.id)
                            }
                            onTrigger={() => handleTriggerWebhook(webhook)}
                            onCopySecret={handleCopySecret}
                            triggering={triggeringWebhook === webhook.id}
                            copiedSecret={copiedSecret}
                          />
                        </div>
                      </Fade>
                    ))}
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Zoom>
      </Grid>

      {/* Webhook Dialog */}
      <WebhookDialog
        openWebhookDialog={openWebhookDialog}
        handleCloseDialogs={handleCloseDialogs}
        currentWebhook={currentWebhook as WebhookFormData}
      />
    </>
  );
};

export default ProviderPanel;
