import { createTheme, type Shadows } from "@mui/material/styles";

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          light: "#8B5FBF",
          main: "#6C3FB5",
          dark: "#4A2A7A",
          contrastText: "#FFFFFF",
        },
        secondary: {
          light: "#FF9EC7",
          main: "#FF6BB3",
          dark: "#E04A96",
          contrastText: "#FFFFFF",
        },
        error: {
          light: "#FF6B6B",
          main: "#F44336",
          dark: "#D32F2F",
          contrastText: "#FFFFFF",
        },
        warning: {
          light: "#FFB74D",
          main: "#FF9800",
          dark: "#F57C00",
          contrastText: "#FFFFFF",
        },
        info: {
          light: "#64B5F6",
          main: "#2196F3",
          dark: "#1976D2",
          contrastText: "#FFFFFF",
        },
        success: {
          light: "#34DEDF", // Airy, bright teal
          main: "#03ADAF", // Primary success tone
          dark: "#028588", // Substantial deep teal
          contrastText: "#FFFFFF",
        },
        text: {
          primary: "#2A2352", // Deepened purple (more sophisticated)
          secondary: "#5E5699", // Muted purple with gray undertones
          disabled: "#8A85B0",
        },
        background: {
          default: "#F5F4FF",
          paper: "#FFFFFF",
          gradient:
            "linear-gradient(135deg, #E6E4FF 0%, #D4D1FF 50%, #C8C2FF 100%)",
          brand:
            "linear-gradient(135deg, #8B5FBF 0%, #6C3FB5 50%, #4A2A7A 100%)",
        },
        action: {
          hover: "rgba(108, 63, 181, 0.08)",
          selected: "rgba(108, 63, 181, 0.12)",
          disabled: "rgba(108, 63, 181, 0.26)",
          disabledBackground: "rgba(108, 63, 181, 0.12)",
        },
        gradients: {
          primary:
            "linear-gradient(135deg, #8B5FBF 0%, #6C3FB5 50%, #4A2A7A 100%)",
          secondary:
            "linear-gradient(135deg, #FF9EC7 0%, #FF6BB3 50%, #E04A96 100%)",
          success:
            "linear-gradient(135deg, #34DEDF 0%, #03ADAF 50%, #028588 100%)",
          warning:
            "linear-gradient(135deg, #FFB74D 0%, #FF9800 50%, #F57C00 100%)",
          dark: "linear-gradient(135deg, #3A3A6B 0%, #2C2C54 50%, #1E1E3F 100%)",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          light: "#9C7ED6",
          main: "#6C3FB5",
          dark: "#5A3494",
          contrastText: "#FFFFFF",
        },
        secondary: {
          light: "#FF9EC7",
          main: "#FF6BB3",
          dark: "#E04A96",
          contrastText: "#FFFFFF",
        },
        error: {
          light: "#EF5350",
          main: "#F44336",
          dark: "#C62828",
          contrastText: "#FFFFFF",
        },
        warning: {
          light: "#FF9800",
          main: "#ED6C02",
          dark: "#E65100",
          contrastText: "#FFFFFF",
        },
        info: {
          light: "#03DAC6",
          main: "#0DCAF0",
          dark: "#0288D1",
          contrastText: "#FFFFFF",
        },
        success: {
          light: "#26C6C8", // More vibrant in dark
          main: "#03ADAF", // Consistent across themes
          dark: "#017D7F", // Deeper for contrast
          contrastText: "#FFFFFF",
        },
        text: {
          primary: "#F0EDFF", // Soft lavender-white
          secondary: "#C5C0FF", // Gentle purple tint
          disabled: "#7E79AA",
        },
        background: {
          default: "#2C2C54",
          paper: "#3A3A6B",
          gradient:
            "linear-gradient(135deg, #2C2C54 0%, #3A3A6B 50%, #4A4A7C 100%)",
          brand:
            "linear-gradient(135deg, #9C7ED6 0%, #6C3FB5 50%, #5A3494 100%)",
        },
        action: {
          hover: "rgba(255, 255, 255, 0.08)",
          selected: "rgba(255, 255, 255, 0.12)",
          disabled: "rgba(255, 255, 255, 0.26)",
          disabledBackground: "rgba(255, 255, 255, 0.12)",
        },
        gradients: {
          primary:
            "linear-gradient(135deg, #9C7ED6 0%, #6C3FB5 50%, #5A3494 100%)",
          secondary:
            "linear-gradient(135deg, #FF9EC7 0%, #FF6BB3 50%, #E04A96 100%)",
          success:
            "linear-gradient(135deg, #26C6C8 0%, #03ADAF 50%, #017D7F 100%)",
          warning:
            "linear-gradient(135deg, #FF9800 0%, #ED6C02 50%, #E65100 100%)",
          dark: "linear-gradient(135deg, #4A4A7C 0%, #3A3A6B 50%, #2C2C54 100%)",
        },
      },
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(108, 63, 181, 0.05)", // Soft primary tint
    "0px 1px 4px rgba(108, 63, 181, 0.1)", // Consistent with primary palette
    "0px 2px 8px rgba(108, 63, 181, 0.1)",
    "0px 3px 12px rgba(108, 63, 181, 0.1)",
    "0px 4px 16px rgba(108, 63, 181, 0.1)",
    "0px 6px 20px rgba(108, 63, 181, 0.15)",
    "0px 8px 24px rgba(108, 63, 181, 0.15)",
    "0px 10px 28px rgba(108, 63, 181, 0.15)",
    "0px 12px 32px rgba(108, 63, 181, 0.15)",
    "0px 14px 36px rgba(108, 63, 181, 0.15)",
    "0px 16px 40px rgba(108, 63, 181, 0.15)",
    ...Array(13).fill("0px 20px 50px rgba(108, 63, 181, 0.2)"), // Higher elevations
  ] as Shadows,
  components: {
    MuiCard: {
      styleOverrides: {
        root: (props) => ({
          borderRadius: props.theme.spacing(2),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: (props) => ({
          borderRadius: props.theme.spacing(2),
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: (props) => ({
          borderRadius: props.theme.spacing(2),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: (props) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: props.theme.spacing(1.5),
          },
        }),
      },
    },
  },
});
