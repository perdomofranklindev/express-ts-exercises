import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Stack,
  Avatar,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { WebhookEvents } from "../../../../shared/api/models/webhook.model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  WebhookFormSchema,
  type WebhookFormData,
} from "../../schemas/webhook.schema";
import { useState } from "react";
import { generateSecretKey } from "../../../../shared/utils";

interface WebhookDialogProps {
  openWebhookDialog: boolean;
  handleCloseDialogs: () => void;
  currentWebhook: WebhookFormData | null;
}

const WebhookDialog: React.FC<WebhookDialogProps> = ({
  openWebhookDialog,
  handleCloseDialogs,
  currentWebhook,
}) => {
  // Hook

  const theme = useTheme();

  // State

  const [showSecret, setShowSecret] = useState(false);

  // Form

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
    getValues,
  } = useForm<WebhookFormData>({
    resolver: zodResolver(WebhookFormSchema),
    defaultValues: currentWebhook || {
      label: "",
      url: "",
      eventType: WebhookEvents.ORDER_CREATED,
      secretKey: generateSecretKey(),
      enabledAt: new Date(),
    },
  });

  const submit = (data: WebhookFormData): void => {
    // TODO: Here handle the data.
    console.log("data: ", data);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={openWebhookDialog}
      onClose={handleCloseDialogs}
      sx={{
        backdropFilter: "blur(20px)",
      }}
      PaperProps={{ sx: { borderRadius: 4 } }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle
          sx={{
            background: theme.palette.gradients.primary,
            color: "white",
            py: 3,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
              <CloudUploadIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {currentWebhook ? "Edit Webhook" : "Create New Webhook"}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Configure your webhook endpoint settings
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ py: `${theme.spacing(4)}!important` }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Webhook Label"
                placeholder="e.g., Order Processing Webhook"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                {...(errors.label && {
                  error: true,
                  helperText: errors.label.message,
                })}
                {...register("label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Endpoint URL"
                placeholder="https://yourdomain.com/webhooks/events"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                helperText="The URL where webhook events will be sent"
                required
                {...(errors.url && {
                  error: true,
                  helperText: errors.url.message,
                })}
                {...register("url")}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select
                  label="Event Type"
                  sx={{
                    borderRadius: 3,
                  }}
                  {...register("eventType")}
                >
                  <MenuItem value={WebhookEvents.ORDER_CREATED}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CheckCircleIcon fontSize="small" color="success" />
                      <span>Order Created</span>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={WebhookEvents.ORDER_UPDATED}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EditIcon fontSize="small" color="info" />
                      <span>Order Updated</span>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={WebhookEvents.ORDER_DELETED}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <DeleteIcon fontSize="small" color="error" />
                      <span>Order Deleted</span>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Switch {...register("enabledAt")} color="primary" />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {getValues("enabledAt") ? "Active" : "Inactive"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getValues("enabledAt")
                        ? "Webhook will receive events immediately"
                        : "Webhook will be created but disabled"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Secret Key
                </Typography>
                <TextField
                  fullWidth
                  value={getValues("secretKey")}
                  type={showSecret ? "text" : "password"}
                  InputProps={{
                    readOnly: true,
                    sx: {
                      borderRadius: 3,
                      fontFamily: "monospace",
                      bgcolor: "action.hover",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowSecret(!showSecret)}
                          edge="end"
                        >
                          {showSecret ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...(errors.secretKey && {
                    error: true,
                    helperText: errors.secretKey.message,
                  })}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Use this key to verify webhook signatures
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<RefreshIcon />}
                    onClick={() =>
                      reset({
                        ...getValues(),
                        secretKey: generateSecretKey(),
                      })
                    }
                    sx={{ borderRadius: 2 }}
                  >
                    Generate New
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialogs} sx={{ borderRadius: 2, px: 3 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!getValues("url")}
            sx={{
              borderRadius: 2,
              px: 4,
              background: theme.palette.gradients.primary,
            }}
            type="submit"
          >
            {currentWebhook ? "Update Webhook" : "Create Webhook"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default WebhookDialog;
