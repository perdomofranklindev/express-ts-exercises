import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./shared/routes/router";
import { SnackbarProvider } from "./shared/components/Snackbar/SnackbarProvider";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline enableColorScheme />
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
