import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export const SessionLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        gap: 2,
        bgcolor: "background.default",
      }}
    >
      <CircularProgress
        size={40}
        thickness={4}
        sx={{
          color: "primary.main",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: "text.primary",
          fontWeight: 500,
        }}
      >
        Checking Session
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
        }}
      >
        Please wait while we verify your session
      </Typography>
    </Box>
  );
}; 