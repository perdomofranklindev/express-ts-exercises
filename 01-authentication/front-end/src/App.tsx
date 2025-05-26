import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./modules/auth/AuthContext";
import { router } from "./shared/routes/router";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./shared/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        <CssBaseline />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
