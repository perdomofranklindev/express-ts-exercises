import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Avatar,
  Grid,
  Divider,
  useTheme,
  alpha,
  styled,
} from "@mui/material";
import {
  AccountCircle as AccountIcon,
  Edit as EditIcon,
  VerifiedUser as VerifiedIcon,
  Lock as LockIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentUser, useAuth } from "../../../shared/auth";
import { useSnackbar } from "../../../shared/components/Snackbar/useSnackbar";
import { useNavigate } from "react-router-dom";

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  borderRadius: theme.spacing(2),
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: theme.shadows[2],
}));

const UserAccountPage = () => {
  const theme = useTheme();

  const { signOut } = useAuth();
  const { showSnackbar } = useSnackbar(); // Get snackbar function
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      showSnackbar("Successfully signed out!", "success");
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      showSnackbar(
        error instanceof Error ? error.message : "Sign out failed",
        "error"
      );
    },
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 8 }}>
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
            <Typography>Loading user data...</Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 8 }}>
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
            <Typography color="error">
              Error:{" "}
              {error instanceof Error ? error.message : "Failed to load user"}
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

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
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mr: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
              src={user?.image || undefined}
            >
              {!user?.image && (
                <AccountIcon
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "2.5rem",
                  }}
                />
              )}
            </Avatar>
            <Box>
              <Typography variant="h3" component="h1" fontWeight={700}>
                {user?.name || "User Account"}{" "}
                <span style={{ color: theme.palette.primary.main }}>
                  Profile
                </span>
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Manage your account settings and personal information
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, bgcolor: "divider" }} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <AccountIcon fontSize="medium" />
                  Personal Information
                </Typography>

                <Box sx={{ display: "flex", mb: 2 }}>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ minWidth: 80 }}
                  >
                    Name:
                  </Typography>
                  <Typography variant="body1">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 2 }}>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ minWidth: 80 }}
                  >
                    Email:
                  </Typography>
                  <Typography variant="body1">{user?.email}</Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ minWidth: 80 }}
                  >
                    Username:
                  </Typography>
                  <Typography variant="body1">
                    {user?.displayUsername || user?.username || "N/A"}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{
                    borderRadius: 3,
                    py: 1.2,
                    px: 3,
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
                  Edit Profile
                </Button>
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <VerifiedIcon fontSize="medium" />
                  Account Settings
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(
                      user?.emailVerified
                        ? theme.palette.success.light
                        : theme.palette.warning.light,
                      0.15
                    ),
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ minWidth: 120 }}
                  >
                    Email Verified:
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color={
                      user?.emailVerified
                        ? theme.palette.success.main
                        : theme.palette.warning.main
                    }
                  >
                    {user?.emailVerified ? "Verified" : "Pending"}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ minWidth: 120 }}
                  >
                    Created At:
                  </Typography>
                  <Typography variant="body1">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleString()
                      : "N/A"}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<LockIcon />}
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    py: 1.2,
                    mb: 2,
                    boxShadow: `0 4px 20px ${alpha(
                      theme.palette.secondary.main,
                      0.2
                    )}`,
                    "&:hover": {
                      boxShadow: `0 6px 24px ${alpha(
                        theme.palette.secondary.main,
                        0.3
                      )}`,
                    },
                  }}
                >
                  Change Password
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<LogoutIcon />}
                  onClick={() => signOutMutation.mutate()}
                  disabled={signOutMutation.isPending}
                  sx={{
                    borderRadius: 3,
                    py: 1.2,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  {signOutMutation.isPending ? "Signing out..." : "Sign Out"}
                </Button>
              </InfoCard>
            </Grid>
          </Grid>

          <Paper
            sx={{
              p: 3,
              mt: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.05
              )} 0%, transparent 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
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
                <VerifiedIcon color="primary" sx={{ fontSize: 16 }} />
              </Box>
              <strong>Security Tip:</strong> Always keep your password private
              and enable two-factor authentication for better security
            </Typography>
          </Paper>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserAccountPage;
