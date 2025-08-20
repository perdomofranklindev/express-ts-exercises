import {
  createTheme,
  ThemeOptions,
  PaletteOptions,
} from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

// Extend the default theme interface to include custom properties
declare module "@mui/material/styles" {
  interface Palette {
    accent: {
      pink: string;
      cyan: string;
      orange: string;
      success: string;
      warning: string;
      error: string;
    };
    gradients: {
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      pink?: string;
      cyan?: string;
      orange?: string;
      success?: string;
      warning?: string;
      error?: string;
    };
    gradients?: {
      primary?: string;
      secondary?: string;
      success?: string;
      warning?: string;
      dark?: string;
    };
  }

  interface TypeBackground {
    brand: string;
    gradient: string;
    cardPrimary: string;
    cardSecondary: string;
  }
}

// Color palette constants
const colorTokens = {
  primary: {
    50: "#f3f0ff",
    100: "#e9e2ff",
    200: "#d6ccff",
    300: "#b8a5ff",
    400: "#9575ff",
    500: "#7c3aed",
    600: "#6d28d9",
    700: "#5b21b6",
    800: "#4c1d95",
    900: "#3c1361",
  },
  secondary: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  neutral: {
    0: "#ffffff",
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  accent: {
    pink: "#ff6b9d",
    cyan: "#06b6d4",
    orange: "#f59e0b",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
  },
} as const;

// Gradient definitions
const gradients = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  warning: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  dark: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
} as const;

// Typography configuration
const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
  },
  caption: {
    fontSize: "0.75rem",
    lineHeight: 1.4,
  },
} as const;

// Shadows configuration
const shadows = [
  "none",
  "0px 2px 4px rgba(0, 0, 0, 0.05)",
  "0px 4px 8px rgba(0, 0, 0, 0.08)",
  "0px 8px 16px rgba(0, 0, 0, 0.1)",
  "0px 12px 24px rgba(0, 0, 0, 0.12)",
  "0px 16px 32px rgba(0, 0, 0, 0.15)",
  "0px 20px 40px rgba(0, 0, 0, 0.18)",
  "0px 24px 48px rgba(0, 0, 0, 0.2)",
  "0px 32px 64px rgba(0, 0, 0, 0.25)",
  ...Array(16).fill("0px 32px 64px rgba(0, 0, 0, 0.25)"),
] as const;

const darkShadows = [
  "none",
  "0px 2px 4px rgba(0, 0, 0, 0.2)",
  "0px 4px 8px rgba(0, 0, 0, 0.25)",
  "0px 8px 16px rgba(0, 0, 0, 0.3)",
  "0px 12px 24px rgba(0, 0, 0, 0.35)",
  "0px 16px 32px rgba(0, 0, 0, 0.4)",
  "0px 20px 40px rgba(0, 0, 0, 0.45)",
  "0px 24px 48px rgba(0, 0, 0, 0.5)",
  "0px 32px 64px rgba(0, 0, 0, 0.55)",
  ...Array(16).fill("0px 32px 64px rgba(0, 0, 0, 0.55)"),
] as const;

// Color schemas definition
interface ColorSchemas {
  light: PaletteOptions;
  dark: PaletteOptions;
}

const colorSchemas: ColorSchemas = {
  light: {
    mode: "light",
    primary: {
      main: colorTokens.primary[500],
      light: colorTokens.primary[300],
      dark: colorTokens.primary[700],
      contrastText: colorTokens.neutral[0],
    },
    secondary: {
      main: colorTokens.secondary[500],
      light: colorTokens.secondary[300],
      dark: colorTokens.secondary[700],
      contrastText: colorTokens.neutral[0],
    },
    background: {
      default: colorTokens.neutral[50],
      paper: colorTokens.neutral[0],
      gradient: gradients.primary,
      cardPrimary: colorTokens.neutral[0],
      cardSecondary: colorTokens.neutral[100],
    },
    text: {
      primary: colorTokens.neutral[800],
      secondary: colorTokens.neutral[500],
    },
    divider: colorTokens.neutral[200],
    action: {
      hover: `rgba(124, 58, 237, 0.04)`,
      selected: `rgba(124, 58, 237, 0.08)`,
      disabled: colorTokens.neutral[300],
      disabledBackground: colorTokens.neutral[100],
    },
    accent: colorTokens.accent,
    gradients,
  },
  dark: {
    mode: "dark",
    primary: {
      main: colorTokens.primary[400],
      light: colorTokens.primary[200],
      dark: colorTokens.primary[600],
      contrastText: colorTokens.neutral[0],
    },
    secondary: {
      main: colorTokens.secondary[400],
      light: colorTokens.secondary[200],
      dark: colorTokens.secondary[600],
      contrastText: colorTokens.neutral[0],
    },
    background: {
      default: colorTokens.neutral[900],
      paper: colorTokens.neutral[800],
      gradient: gradients.dark,
      cardPrimary: colorTokens.neutral[800],
      cardSecondary: colorTokens.neutral[700],
    },
    text: {
      primary: colorTokens.neutral[50],
      secondary: colorTokens.neutral[300],
    },
    divider: colorTokens.neutral[700],
    action: {
      hover: `rgba(124, 58, 237, 0.08)`,
      selected: `rgba(124, 58, 237, 0.12)`,
      disabled: colorTokens.neutral[600],
      disabledBackground: colorTokens.neutral[800],
    },
    accent: colorTokens.accent,
    gradients,
  },
};

// Base theme configuration
interface UnifiedThemeConfig {
  colorSchemas: ColorSchemas;
  typography: typeof typography;
  shape: {
    borderRadius: number;
  };
  spacing: number;
  components: ThemeOptions["components"];
}

const unifiedTheme: UnifiedThemeConfig = {
  colorSchemas,
  typography,
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0px 8px 20px rgba(124, 58, 237, 0.3)",
          },
        },
        containedPrimary: {
          background: gradients.primary,
          "&:hover": {
            background: gradients.primary,
            opacity: 0.9,
          },
        },
        containedSecondary: {
          background: gradients.secondary,
          "&:hover": {
            background: gradients.secondary,
            opacity: 0.9,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16,
          transition: "all 0.3s ease-in-out",
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.05)"
              : "1px solid rgba(0, 0, 0, 0.05)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0px 12px 40px rgba(0, 0, 0, 0.4)"
                : "0px 12px 40px rgba(0, 0, 0, 0.15)",
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          background: gradients.primary,
          color: colorTokens.neutral[0],
        },
        colorSecondary: {
          background: gradients.success,
          color: colorTokens.neutral[0],
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
        },
      },
    },
  },
};

// Theme creation function with proper typing
export const createUnifiedTheme = (mode: PaletteMode) => {
  const palette = unifiedTheme.colorSchemas[mode];
  const shadowsToUse = mode === "dark" ? darkShadows : shadows;

  return createTheme({
    palette,
    typography: unifiedTheme.typography,
    shape: unifiedTheme.shape,
    spacing: unifiedTheme.spacing,
    // eslint-disable-next-line
    shadows: shadowsToUse as any, // Type assertion needed for shadows
    components: unifiedTheme.components,
  });
};

export default unifiedTheme;
