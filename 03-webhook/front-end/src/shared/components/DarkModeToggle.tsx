import {
  alpha,
  Box,
  IconButton,
  Tooltip,
  useColorScheme,
  useTheme,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const DarkModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: 30,
        zIndex: 1000
      }}
    >
      <Tooltip
        title={mode === "dark" ? "Enable Light Mode" : "Enable Dark Mode"}
        placement="top"
      >
        <IconButton
          sx={{
            p: 2,
            borderRadius: "50%",
            mt: 2,
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.info.dark
                : theme.palette.warning.main,

            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light"
                  ? alpha(theme.palette.info.dark, 0.9)
                  : alpha(theme.palette.warning.main, 0.9),
            },
            color: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease-in-out, transform 0.2s",
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
          onClick={() => {
            if (mode === "dark") {
              setMode("light");
              return;
            }

            setMode("dark");
          }}
          aria-label="toggle dark mode"
          size="small"
        >
          {mode == "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default DarkModeToggle;
