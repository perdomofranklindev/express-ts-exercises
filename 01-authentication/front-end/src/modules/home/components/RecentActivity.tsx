import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { recentActivity } from "../constants";

export const RecentActivity = () => {
  return (
    <Card sx={{ borderRadius: 2, height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <List>
          {recentActivity.map((activity, index) => (
            <ListItem
              key={index}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {activity.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={activity.action}
                secondary={`${activity.user} • ${activity.time}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}; 