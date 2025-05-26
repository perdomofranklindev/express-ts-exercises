import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { FormWrapper } from "../../shared/components/FormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "./schemas/change-password.schema";

export function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log(data);
    // TODO: Implement password change logic
  };

  return (
    <FormWrapper maxWidth="xs">
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
            type="password"
            id="currentPassword"
            autoComplete="current-password"
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            {...register("currentPassword")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm New Password"
            type="password"
            id="confirmNewPassword"
            autoComplete="new-password"
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword?.message}
            {...register("confirmNewPassword")}
          />
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button type="submit" fullWidth variant="contained">
              Update Password
            </Button>
            <Button fullWidth variant="outlined" href="/user/profile">
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormWrapper>
  );
}
