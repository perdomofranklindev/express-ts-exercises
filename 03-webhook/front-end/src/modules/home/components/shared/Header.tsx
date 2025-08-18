// MUI Components

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";

// MUI Icons

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";
import CodeIcon from "@mui/icons-material/Code";
import WebhookIcon from '@mui/icons-material/Webhook';

import {
  alpha,
  useTheme,
} from "@mui/material";

interface HeaderProps {
  activeWebhooks: number;
  inactiveWebhooks: number;
  envVars: number;
}

const Header: React.FC<HeaderProps> = ({
  activeWebhooks,
  inactiveWebhooks,
  envVars,
}) => {
  const theme = useTheme();


  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          backdropFilter: "blur(20px)",
          borderRadius: 4,
          p: 4,
          mb: 4,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 1 }}
            >
              <Avatar
                sx={{
                  bgcolor: alpha('#FFFFFF', 0.3),
                  width: 48,
                  height: 48,
                }}
              >
                <WebhookIcon
                  sx={{
                    color: "primary.main",
                  }}
                />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "primary.contrastText",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  Webhook Management
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.contrastText",
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
                icon={
                  <CheckCircleIcon
                    style={{ color: theme.palette.success.contrastText }}
                    fontSize="small"
                  />
                }
                label={`${activeWebhooks} Active`}
                sx={{
                  color: theme.palette.success.contrastText,
                  bgcolor: alpha(theme.palette.success.main, 0.3),
                  borderColor: alpha(theme.palette.success.main, 0.6),
                  backdropFilter: "blur(10px)",
                }}
                variant="outlined"
              />
              <Chip
                icon={
                  <WarningIcon
                    style={{ color: theme.palette.warning.contrastText }}
                    fontSize="small"
                  />
                }
                label={`${inactiveWebhooks} Inactive`}
                sx={{
                  color: theme.palette.warning.contrastText,
                  bgcolor: alpha(theme.palette.warning.main, 0.3),
                  borderColor: alpha(theme.palette.warning.main, 0.6),
                  backdropFilter: "blur(10px)",
                }}
                variant="outlined"
              />
              <Chip
                icon={
                  <SecurityIcon
                    style={{ color: theme.palette.info.contrastText }}
                    fontSize="small"
                  />
                }
                label={`${envVars} Variables`}
                sx={{
                  color: theme.palette.info.contrastText,
                  bgcolor: alpha(theme.palette.info.main, 0.3),
                  borderColor: alpha(theme.palette.info.main, 0.6),
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
};

export default Header;
