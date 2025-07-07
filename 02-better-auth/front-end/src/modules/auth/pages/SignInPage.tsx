import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  Link,
} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";
import authClient from "../../../shared/auth/auth-client";
import { signInSchema, type SignInFormData } from "../schemas/signin-schema";
import { useSnackbar } from "../../../shared/components/Snackbar/useSnackbar";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      showSnackbar("Successfully signed in!", "success");
      reset(); // Clear form on success
      // Handle successful sign in (redirect, etc.)
    } catch (error) {
      showSnackbar(
        error instanceof Error ? error.message : "Sign in failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
          >
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              startIcon={<LoginIcon />}
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Link component={RouterLink} to="/auth/sign-up" variant="body2">
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignInPage;
