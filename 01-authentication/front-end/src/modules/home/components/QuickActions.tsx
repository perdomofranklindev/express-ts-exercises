import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { quickActions } from "../constants";

export const QuickActions = () => {
  return (
    <Card sx={{ borderRadius: 2, height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <List>
          {quickActions.map((action, index) => (
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
                  {action.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={action.title}
                secondary={action.description}
              />
              <IconButton edge="end" color="primary">
                <ArrowForward />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}; 