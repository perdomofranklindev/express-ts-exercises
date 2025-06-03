import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#2563eb",
          light: "#60a5fa",
          dark: "#1d4ed8",
          contrastText: "#fff",
        },
        secondary: {
          main: "#7c3aed",
          light: "#a78bfa",
          dark: "#5b21b6",
          contrastText: "#fff",
        },
        neutral: {
          main: "#6b7280",
          light: "#9ca3af",
          dark: "#4b5563",
          contrastText: "#fff",
        },
        background: {
          default: "#f9fafb",
          paper: "#ffffff",
        },
        text: {
          primary: "#111827",
          secondary: "#4b5563",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#60a5fa",
          light: "#93c5fd",
          dark: "#3b82f6",
          contrastText: "#030712",
        },
        secondary: {
          main: "#a78bfa",
          light: "#c4b5fd",
          dark: "#7c3aed",
          contrastText: "#030712",
        },
        neutral: {
          main: "#9ca3af",
          light: "#d1d5db",
          dark: "#6b7280",
          contrastText: "#030712",
        },
        background: {
          default: "#030712",
          paper: "#111827",
        },
        text: {
          primary: "#f9fafb",
          secondary: "#d1d5db",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
  },
});
