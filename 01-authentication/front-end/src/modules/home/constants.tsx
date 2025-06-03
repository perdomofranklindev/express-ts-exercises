import {
  People,
  Security,
  Notifications,
  TrendingUp,
  Person,
  Settings,
  Lock,
} from "@mui/icons-material";

export const stats = [
  {
    title: "Total Users",
    value: "1,234",
    icon: <People />,
    color: "#1976d2",
  },
  {
    title: "Active Sessions",
    value: "42",
    icon: <Security />,
    color: "#2e7d32",
  },
  {
    title: "Notifications",
    value: "12",
    icon: <Notifications />,
    color: "#ed6c02",
  },
  {
    title: "Growth",
    value: "+23%",
    icon: <TrendingUp />,
    color: "#9c27b0",
  },
];

export const recentActivity = [
  {
    user: "John Doe",
    action: "Updated profile settings",
    time: "2 minutes ago",
    avatar: <Person />,
  },
  {
    user: "Jane Smith",
    action: "Changed password",
    time: "1 hour ago",
    avatar: <Lock />,
  },
  {
    user: "Mike Johnson",
    action: "Updated system preferences",
    time: "3 hours ago",
    avatar: <Settings />,
  },
];

export const quickActions = [
  {
    title: "Update Profile",
    description: "Modify your personal information",
    icon: <Person />,
    path: "/user/profile",
  },
  {
    title: "Security Settings",
    description: "Manage your security preferences",
    icon: <Security />,
    path: "/user/security",
  },
  {
    title: "Notifications",
    description: "Configure your notification settings",
    icon: <Notifications />,
    path: "/user/notifications",
  },
];

export const sessionInfo = {
  accessToken: {
    name: "access_token",
    duration: "1 hour",
    purpose: "Authentication for API requests",
    storage: "Memory (not in cookies)",
  },
  refreshToken: {
    name: "refresh_token",
    duration: "7 days",
    purpose: "Obtain new access tokens",
    storage: "HttpOnly cookie",
  },
  sessionCookie: {
    name: "session",
    duration: "7 days",
    purpose: "Maintain user session",
    storage: "HttpOnly cookie",
  },
}; 