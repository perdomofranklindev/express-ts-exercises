import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useAuth } from "../../auth/AuthContext";

export const WelcomeSection = () => {
  const { user } = useAuth();

  return (
    <Card sx={{ mb: 4, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "primary.main",
              mr: 2,
            }}
          >
            <Person />
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user?.email || "User"}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening with your account today.
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 