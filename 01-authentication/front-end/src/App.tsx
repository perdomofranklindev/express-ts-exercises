import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./modules/auth/AuthContext";
import { router } from "./shared/routes/router";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./shared/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "./shared/components/Snackbar/SnackbarContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
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
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
