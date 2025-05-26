import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { FormWrapper } from "../../shared/components/FormWrapper";

export function SignIn() {
  return (
    <FormWrapper maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link to="/auth/sign-up">{"Don't have an account? Sign Up"}</Link>
          </Box>
        </Box>
      </Paper>
    </FormWrapper>
  );
}
