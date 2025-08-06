import { RouterProvider } from 'react-router-dom';
import { router } from './shared/routes/router';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './shared/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from './shared/components/Snackbar/SnackbarProvider';
import { AuthProvider } from './modules/auth/AuthProvider';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

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
        <CssBaseline enableColorScheme />
        <SnackbarProvider>
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.default',
            }}
          >
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
