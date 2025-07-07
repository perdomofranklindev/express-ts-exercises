import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#0066cc", // macOS system blue
          dark: "#0052a3",
          light: "#3d85d6",
        },
        secondary: {
          main: "#8e8e93", // macOS system gray
        },
        background: {
          default: "#f5f5f7", // Light gray background
          paper: "#ffffff", // Pure white panels
        },
        text: {
          primary: "#1a1a1a", // Almost black
          secondary: "#6e6e73",
        },
        divider: "#e0e0e0",
        success: {
          main: "#34c759", // macOS green
        },
        error: {
          main: "#ff3b30", // macOS red
        },
        warning: {
          main: "#ff9500", // macOS orange
        },
        info: {
          main: "#5ac8fa", // macOS teal blue
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#0a84ff", // Brighter system blue for dark mode
          dark: "#0062cc",
          light: "#5fa9ff",
        },
        secondary: {
          main: "#98989d",
        },
        background: {
          default: "#1e1e1e", // Dark gray
          paper: "#2c2c2e", // Card background
        },
        text: {
          primary: "#f5f5f7", // Off-white
          secondary: "#aeaeb2",
        },
        divider: "#3a3a3c",
        success: {
          main: "#30d158", // Brighter green for dark mode
        },
        error: {
          main: "#ff453a",
        },
        warning: {
          main: "#ff9f0a",
        },
        info: {
          main: "#64d2ff",
        },
      },
    },
  },
  shape: {
    borderRadius: 10, // macOS-like rounded corners
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    button: {
      textTransform: "none", // macOS uses normal case buttons
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Pill-shaped buttons
          padding: "6px 16px",
          boxShadow: "none",
              '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: "none",
          transition: "transform 0.3s ease",

          "&:active": {
            transform: "scale(0.98)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Disable gradient
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: "visible",
          border: "1px solid rgba(0, 0, 0, 0.04)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
        },
      },
    },
  },
});
