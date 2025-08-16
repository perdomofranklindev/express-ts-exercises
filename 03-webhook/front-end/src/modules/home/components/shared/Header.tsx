import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Fade,
  Avatar
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
} from "@mui/icons-material";

interface HeaderProps {
  activeWebhooks: number;
  inactiveWebhooks: number;
  envVars: number;
}

const Header: React.FC<HeaderProps> = ({
  activeWebhooks,
  inactiveWebhooks,
  envVars,
}) => (
  <Fade in timeout={800}>
    <Box
      sx={{
        background:
          "linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(109, 40, 217, 0.9) 100%)",
        backdropFilter: "blur(20px)",
        borderRadius: 4,
        p: 4,
        mb: 4,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\') repeat',
          opacity: 0.1,
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                width: 48,
                height: 48,
              }}
            >
              <SettingsIcon />
            </Avatar>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Webhook Management
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 400,
                }}
              >
                Monitor and manage your webhook integrations
              </Typography>
            </Box>
          </Stack>

          {/* Stats Pills */}
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Chip
              icon={<CheckCircleIcon color="white" fontSize="small" />}
              label={`${activeWebhooks} Active`}
              sx={{
                bgcolor: "rgba(16, 185, 129, 0.2)",
                color: "white",
                borderColor: "rgba(16, 185, 129, 0.5)",
                backdropFilter: "blur(10px)",
              }}
              variant="outlined"
            />
            <Chip
              icon={<WarningIcon color="white" fontSize="small" />}
              label={`${inactiveWebhooks} Inactive`}
              sx={{
                bgcolor: "rgba(245, 158, 11, 0.2)",
                color: "white",
                borderColor: "rgba(245, 158, 11, 0.5)",
                backdropFilter: "blur(10px)",
              }}
              variant="outlined"
            />
            <Chip
              icon={<SecurityIcon color="white" fontSize="small" />}
              label={`${envVars} Variables`}
              sx={{
                bgcolor: "rgba(6, 182, 212, 0.2)",
                color: "white",
                borderColor: "rgba(6, 182, 212, 0.5)",
                backdropFilter: "blur(10px)",
              }}
              variant="outlined"
            />
          </Stack>
        </Box>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Button
            variant="outlined"
            startIcon={<CodeIcon />}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            View Docs
          </Button>
        </Box>
      </Stack>
    </Box>
  </Fade>
);

export default Header;
