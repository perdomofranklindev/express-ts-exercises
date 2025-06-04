import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FormWrapper } from "../../shared/components/FormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "./schemas/auth-schema";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../shared/components/Snackbar/SnackbarContext";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

export function SignIn() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const signInMutation = useMutation({
    mutationFn: (data: SignInFormData) => signIn(data.email, data.password),
    onSuccess: () => {
      showSnackbar("Signed in successfully!", "success");
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error);
      showSnackbar(error.message, "error");
    },
  });

  // Handle navigation confirmation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (signInMutation.isPending) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [signInMutation.isPending]);

  const onSubmit = (data: SignInFormData) => {
    signInMutation.mutate(data);
  };

  const isLoading = signInMutation.isPending;

  return (
    <FormWrapper maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
          autoComplete="on"
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            disabled={isLoading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link
              to="/auth/sign-up"
              style={{ pointerEvents: isLoading ? "none" : "auto" }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </FormWrapper>
  );
}
