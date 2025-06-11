import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export const AppLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        gap: 2,
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: 'primary.main',
        }}
      />
      <Typography
        variant="h5"
        sx={{
          color: 'text.primary',
          fontWeight: 500,
          letterSpacing: 0.5,
        }}
      >
        Loading Dashboard
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
        }}
      >
        Please wait while we prepare your workspace
      </Typography>
    </Box>
  );
};
