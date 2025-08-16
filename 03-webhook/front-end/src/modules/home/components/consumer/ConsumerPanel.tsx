import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Stack,
  Fade,
  Zoom,
  Avatar,
  CardHeader,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Info as InfoIcon,
  Timeline as TimelineIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import type { EnvironmentVariable } from "../../../../shared/api/models/environment-variable.model";
import { useState } from "react";
import {
  EnvVarFormSchema,
  type EnvVarFormData,
} from "../../schemas/environment-variable.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import EnvVarCard from "../shared/EnvVarCard";
import EmptyState from "../shared/EmptyState";
import EnvironmentVariableDialog from "./EnvironmentVariableDialog";

interface ConsumerPanelProps {
  initialEnvVars: EnvironmentVariable[];
}

const ConsumerPanel: React.FC<ConsumerPanelProps> = ({ initialEnvVars }) => {
  const theme = useTheme();

  const [envVars, setEnvVars] = useState<EnvironmentVariable[]>(initialEnvVars);
  const [openEnvVarDialog, setOpenEnvVarDialog] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState<string | null>(null);
  const [currentEnvVar, setCurrentEnvVar] =
    useState<EnvironmentVariable | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    register,
    getValues,
  } = useForm<EnvVarFormData>({
    resolver: zodResolver(EnvVarFormSchema),
    defaultValues: {
      name: "",
      secretKey: "",
      provider: "",
    },
  });

  const handleEnvVarDialogOpen = (
    envVar: EnvironmentVariable | null = null
  ) => {
    if (envVar) {
      setCurrentEnvVar(envVar);
      reset({
        name: envVar.name,
        secretKey: envVar.secretKey,
        provider: envVar.provider || "",
      });
    } else {
      setCurrentEnvVar(null);
      reset({
        name: "",
        secretKey: "",
        provider: "",
      });
    }
    setOpenEnvVarDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenEnvVarDialog(false);
  };

  const handleDeleteEnvVar = (id: string) => {
    // TODO: API call!
    setEnvVars(envVars.filter((ev) => ev.id !== id));
    // setSnackbar({
    //   open: true,
    //   message: "Environment variable deleted",
    //   severity: "info",
    // });
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
      {/* Consumer Panel */}
      <Grid size={{ xs: 12, lg: 5 }}>
        <Zoom in timeout={800}>
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
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <SecurityIcon />
                </Avatar>
              }
              title={
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Environment Variables
                </Typography>
              }
              subheader="Secure credential management"
              action={
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                  onClick={() => handleEnvVarDialogOpen(null)}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    background: theme.palette.gradients.success,
                  }}
                >
                  Add Variable
                </Button>
              }
              sx={{ pb: 1 }}
            />

            <CardContent>
              {envVars.length > 0 ? (
                <Stack spacing={2}>
                  {envVars.map((envVar, index) => (
                    <Fade in timeout={1000 + index * 200} key={envVar.id}>
                      <div>
                        <EnvVarCard
                          envVar={envVar}
                          onEdit={() => handleEnvVarDialogOpen(envVar)}
                          onDelete={() => handleDeleteEnvVar(envVar.id)}
                          onCopySecret={handleCopySecret}
                          copiedSecret={copiedSecret}
                        />
                      </div>
                    </Fade>
                  ))}
                </Stack>
              ) : (
                <EmptyState
                  icon={<SecurityIcon />}
                  title="No Environment Variables"
                  description="Add environment variables to securely manage your webhook secrets."
                  action={
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<AddIcon />}
                      onClick={() => handleEnvVarDialogOpen(null)}
                      sx={{ borderRadius: 2 }}
                    >
                      Add Variable
                    </Button>
                  }
                />
              )}

              <Divider sx={{ my: 4 }} />

              {/* Quick Start Guide */}
              <Fade in timeout={1500}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
                    border: `1px solid ${theme.palette.primary.light}20`,
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 2 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 32,
                          height: 32,
                        }}
                      >
                        <TimelineIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Quick Start Guide
                      </Typography>
                    </Stack>

                    <Stack spacing={2}>
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Box
                          sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            mr: 2,
                            mt: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          1
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Create your webhook endpoint
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Add your server URL and select event types
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Box
                          sx={{
                            bgcolor: "secondary.main",
                            color: "white",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            mr: 2,
                            mt: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          2
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Secure your integration
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Copy the secret key to your environment variables
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Box
                          sx={{
                            bgcolor: "success.main",
                            color: "white",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            mr: 2,
                            mt: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          3
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Test and monitor
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Use the trigger button to test your integration
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>

                    <Box
                      sx={{
                        mt: 3,
                        pt: 2,
                        borderTop: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<InfoIcon />}
                        fullWidth
                        sx={{ borderRadius: 2 }}
                      >
                        View Documentation
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </CardContent>
          </Card>
        </Zoom>
      </Grid>

      {/* Environment Variable Dialog */}
      <EnvironmentVariableDialog
        openEnvVarDialog={openEnvVarDialog}
        handleCloseDialogs={handleCloseDialogs}
        currentEnvVar={currentEnvVar as EnvVarFormData}
      />
    </>
  );
};

export default ConsumerPanel;
