import { RouterProvider } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { router } from "./router";
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
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
