import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signUpSchema, type SignUpFormData } from "../schemas/signup-schema";
import { useSnackbar } from "../../../shared/components/Snackbar/useSnackbar";
import authClient from "../../../shared/auth/auth-client";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        name: data.firstName,
      });

      // Show success message and redirect
      showSnackbar("Successfully signed up!", "success");
      reset();

      // Redirect to sign-in page after a short delay
      setTimeout(() => {
        navigate("/auth/sign-in");
      }, 1500);
    } catch (error) {
      showSnackbar(
        error instanceof Error ? error.message : "Sign up failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper elevation={0} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Sign Up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
          >
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              autoComplete="username"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              autoComplete="new-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              margin="normal"
              autoComplete="new-password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link component={RouterLink} to="/auth/sign-in" variant="body2">
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUpPage;
