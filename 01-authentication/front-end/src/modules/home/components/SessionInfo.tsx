import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Cookie from "@mui/icons-material/Cookie";
import AccessTime from "@mui/icons-material/AccessTime";
import Refresh from "@mui/icons-material/Refresh";
import Security from "@mui/icons-material/Security";
import { sessionInfo } from "../constants";

export const SessionInfo = () => {
  return (
    <Card sx={{ mb: 4, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Cookie /> Session & Cookie Management
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This application uses a secure token-based authentication system
          with refresh token rotation. Here's how it works:
        </Typography>

        <Grid container spacing={2}>
          {Object.entries(sessionInfo).map(([key, info]) => (
            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
              key={key}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  {key === "accessToken" && <AccessTime color="primary" />}
                  {key === "refreshToken" && <Refresh color="primary" />}
                  {key === "sessionCookie" && <Cookie color="primary" />}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {info.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {info.purpose}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    size="small"
                    icon={<AccessTime />}
                    label={`Duration: ${info.duration}`}
                  />
                  <Chip
                    size="small"
                    icon={<Security />}
                    label={`Storage: ${info.storage}`}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{ mt: 3, p: 2, bgcolor: "background.default", borderRadius: 2 }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Security Features:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="HttpOnly Cookies"
                secondary="Cookies cannot be accessed by JavaScript, preventing XSS attacks"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Secure Flag"
                secondary="Cookies are only sent over HTTPS connections"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Token Rotation"
                secondary="Refresh tokens are rotated on each use for enhanced security"
              />
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}; 