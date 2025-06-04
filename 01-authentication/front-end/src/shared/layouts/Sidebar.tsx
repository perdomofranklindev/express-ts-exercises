import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useLocation, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const navigation = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "Profile", path: "/user/profile", icon: <PersonIcon /> },
  {
    name: "Change Password",
    path: "/user/change-password",
    icon: <LockIcon />,
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <Card
      sx={{
        p: 3,
        flexShrink: 0,
        height: "100%",
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ p: 2, textAlign: "center" }}>
          iDashboard
        </Typography>
      </Box>
      <List>
        {navigation.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.8 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 8,
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.2s ease-in-out",
                bgcolor:
                  location.pathname === item.path ? "primary.main" : "inherit",
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": {
                    color: "primary.contrastText",
                    transition: "color 0.2s ease-in-out",
                  },
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
