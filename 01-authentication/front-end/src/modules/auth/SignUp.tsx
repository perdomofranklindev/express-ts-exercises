import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { FormWrapper } from "../../shared/components/FormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "./schemas/signup-schema";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../shared/components/Snackbar/SnackbarContext";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export function SignUp() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const signUpMutation = useMutation({
    mutationFn: (data: Omit<SignUpFormData, "confirmPassword">) =>
      signUp(data.email, data.password, data.firstName, data.lastName),
    onSuccess: () => {
      showSnackbar("Account created successfully!", "success");
      navigate("/auth/sign-in");
    },
    onError: (error: Error) => {
      showSnackbar(error.message, "error");
    },
  });

  // Handle navigation confirmation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (signUpMutation.isPending) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [signUpMutation.isPending]);

  const onSubmit = (data: SignUpFormData) => {
    const { confirmPassword, ...rest } = data;
    signUpMutation.mutate(rest);
  };

  const isLoading = signUpMutation.isPending;

  return (
    <FormWrapper maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            autoComplete="given-name"
            autoFocus
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            autoComplete="family-name"
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="email"
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="new-password"
            disabled={isLoading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            autoComplete="new-password"
            disabled={isLoading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
            loading={isLoading}
          >
            {"Sign Up"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link
              to="/auth/sign-in"
              style={{ pointerEvents: isLoading ? "none" : "auto" }}
            >
              {"Already have an account? Sign In"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </FormWrapper>
  );
}
