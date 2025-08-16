import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EnvVarFormSchema,
  type EnvVarFormData,
} from "../../schemas/environment-variable.schema";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";

interface EnvironmentVariableDialogProps {
  openEnvVarDialog: boolean;
  handleCloseDialogs: () => void;
  currentEnvVar: EnvVarFormData | null;
}

const EnvironmentVariableDialog: React.FC<EnvironmentVariableDialogProps> = ({
  openEnvVarDialog,
  handleCloseDialogs,
  currentEnvVar,
}) => {
  const theme = useTheme();

  const [showSecret, setShowSecret] = useState(false);

  const { control, handleSubmit, reset, formState, register, getValues } =
    useForm<EnvVarFormData>({
      resolver: zodResolver(EnvVarFormSchema),
      defaultValues: {
        name: "",
        secretKey: "",
        provider: "",
      },
    });

  const submit = (data: EnvVarFormData): void => {
    // TODO: API create or update environment variable.
    console.log("Submitted Data:", data);
  };

  return (
    <Dialog
      open={openEnvVarDialog}
      onClose={handleCloseDialogs}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
        },
      }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle
          sx={{
            background: theme.palette.gradients.success,
            color: "white",
            py: 3,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
              <SecurityIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {currentEnvVar
                  ? "Edit Environment Variable"
                  : "Add Environment Variable"}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Manage secure credential storage
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Variable Name"
                placeholder="e.g., WEBHOOK_SECRET"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                helperText="Use uppercase with underscores (e.g., MY_WEBHOOK_SECRET)"
                required
                {...register("name")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Secret Key"
                type={showSecret ? "text" : "password"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    fontFamily: "monospace",
                  },
                }}
                InputProps={{
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
                helperText="The secret key or token value"
                required
                {...register("secretKey")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Provider"
                placeholder="e.g., Stripe, PayPal, Custom"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                helperText="Optional: Service or provider name for organization"
                {...register("provider")}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialogs} sx={{ borderRadius: 2, px: 3 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={!getValues("name") || !getValues("secretKey")}
            sx={{
              borderRadius: 2,
              px: 4,
              background: theme.palette.gradients.success,
            }}
          >
            {currentEnvVar ? "Update Variable" : "Add Variable"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EnvironmentVariableDialog;
