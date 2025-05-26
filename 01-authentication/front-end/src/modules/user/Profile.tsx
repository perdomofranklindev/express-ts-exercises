import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FormWrapper } from "../../shared/components/FormWrapper";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import LockIcon from "@mui/icons-material/Lock";

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Software Engineer",
  avatar: "https://i.pravatar.cc/300",
  bio: "Passionate about creating beautiful and functional user interfaces. Love working with React and TypeScript.",
  location: "San Francisco, CA",
  joinDate: "January 2023",
};

export function Profile() {
  return (
    <FormWrapper maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        {/* Header Section */}
        <Box sx={{ position: "relative", mb: 4 }}>
          <Box
            sx={{
              height: 120,
              backgroundColor: "primary.main",
              borderRadius: "12px 12px 0 0",
              position: "absolute",
              top: -24,
              left: -24,
              right: -24,
            }}
          />
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 8,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                alt={mockUser.name}
                src={mockUser.avatar}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "grey.100" },
                }}
                size="small"
              >
                <PhotoCamera fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: 600 }}>
              {mockUser.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {mockUser.role}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Profile Information */}
        <Box component="form" sx={{ mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Profile Information</Typography>
            <IconButton size="small" color="primary">
              <EditIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              defaultValue={mockUser.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              defaultValue={mockUser.email}
            />
            <TextField
              margin="normal"
              fullWidth
              id="role"
              label="Role"
              name="role"
              defaultValue={mockUser.role}
            />
            <TextField
              margin="normal"
              fullWidth
              id="location"
              label="Location"
              name="location"
              defaultValue={mockUser.location}
            />
          </Box>

          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            id="bio"
            label="Bio"
            name="bio"
            defaultValue={mockUser.bio}
          />

          <Box
            sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="error"
              component={Link}
              to="/auth/sign-in"
            >
              Sign Out
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/user/change-password"
              startIcon={<LockIcon />}
            >
              Change Password
            </Button>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormWrapper>
  );
}
