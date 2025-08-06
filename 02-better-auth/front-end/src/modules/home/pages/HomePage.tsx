import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Avatar,
  Divider,
  Grid,
  useTheme,
  alpha,
  styled,
} from "@mui/material";
import {
  Add as AddIcon,
  AccountCircle as AccountIcon,
  Dashboard as DashboardIcon,
  BarChart as StatsIcon,
  RocketLaunch as RocketIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  borderRadius: theme.spacing(2),
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: "blur(10px)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 8,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(${alpha(
              theme.palette.primary.light,
              0.4
            )} 0%, transparent 70%)`,
            zIndex: -1,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.background.default,
              0.8
            )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            backdropFilter: "blur(8px)",
            border: "1px solid",
            borderColor: alpha(theme.palette.divider, 0.1),
            boxShadow: `0 25px 50px -12px ${alpha(
              theme.palette.primary.dark,
              0.1
            )}`,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 4,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    width: 72,
                    height: 72,
                    mr: 3,
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                  }}
                >
                  <DashboardIcon
                    fontSize="large"
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "2.5rem",
                    }}
                  />
                </Avatar>
                <Box>
                  <Typography
                    variant="h3"
                    component="h1"
                    fontWeight={700}
                    gutterBottom
                  >
                    Dashboard{" "}
                    <span style={{ color: theme.palette.primary.main }}>
                      Pro
                    </span>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ maxWidth: 500 }}
                  >
                    Welcome back! Manage your account, track analytics, and
                    boost productivity.
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3, bgcolor: "divider" }} />

              <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Button
                    variant="contained"
                    startIcon={<RocketIcon />}
                    size="large"
                    fullWidth
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      boxShadow: `0 4px 20px ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                      "&:hover": {
                        boxShadow: `0 6px 24px ${alpha(
                          theme.palette.primary.main,
                          0.3
                        )}`,
                      },
                    }}
                  >
                    Launch
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    fullWidth
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    Explore
                  </Button>
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<AccountIcon />}
                    size="large"
                    fullWidth
                    disableElevation
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
  
                    }}
                    onClick={() => navigate("/user/account")}
                  >
                    Profile
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6 }}>
                  <FeatureCard>
                    <Box
                      sx={{
                        bgcolor: alpha(theme.palette.success.light, 0.2),
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <AddIcon color="success" fontSize="medium" />
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Quick Start
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jumpstart your projects with templates and guides
                    </Typography>
                  </FeatureCard>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <FeatureCard>
                    <Box
                      sx={{
                        bgcolor: alpha(theme.palette.warning.light, 0.2),
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <StatsIcon color="warning" fontSize="medium" />
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Analytics
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track performance with real-time metrics
                    </Typography>
                  </FeatureCard>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.05
                      )} 0%, transparent 100%)`,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box
                        component="span"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 1.5,
                        }}
                      >
                        <AddIcon color="primary" sx={{ fontSize: 16 }} />
                      </Box>
                      <strong>Pro Tip:</strong> Use our advanced filters to
                      analyze your data segments
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
