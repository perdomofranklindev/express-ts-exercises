import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "./schemas/change-password.schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../shared/components/Snackbar/SnackbarContext";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { changePassword } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordFormData) =>
      changePassword(data.currentPassword, data.newPassword),
    onSuccess: () => {
      showSnackbar("Password changed successfully!", "success");
      reset();
      navigate("/user/profile");
    },
    onError: (error: Error) => {
      showSnackbar(error.message, "error");
    },
  });

  // Handle navigation confirmation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (changePasswordMutation.isPending) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [changePasswordMutation.isPending]);

  const onSubmit = (data: ChangePasswordFormData) => {
    changePasswordMutation.mutate(data);
  };

  const isLoading = changePasswordMutation.isPending;

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Change Password
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Please enter your current password and your new password
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Current Password"
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            autoComplete="current-password"
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            disabled={isLoading}
            {...register("currentPassword")}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle current password visibility"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            autoComplete="new-password"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            disabled={isLoading}
            {...register("newPassword")}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle new password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmNewPassword"
            autoComplete="new-password"
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword?.message}
            disabled={isLoading}
            {...register("confirmNewPassword")}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              to="/user/profile"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
