import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { FormWrapper } from "../../shared/components/FormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "./schemas/signup.schema";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
    // Handle form submission
  };

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
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            id="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link to="/auth/sign-in">{"Already have an account? Sign In"}</Link>
          </Box>
        </Box>
      </Paper>
    </FormWrapper>
  );
}
