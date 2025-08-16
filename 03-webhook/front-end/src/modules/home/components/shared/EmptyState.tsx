import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Empty State Component
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <Box
    sx={{
      textAlign: "center",
      py: 6,
      px: 3,
      borderRadius: 3,
      background:
        "linear-gradient(135deg, rgba(124, 58, 237, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%)",
      border: "2px dashed",
      borderColor: "divider",
    }}
  >
    <Box
      sx={{
        color: "text.secondary",
        mb: 2,
        "& > *": {
          fontSize: "3rem",
        },
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ mb: 3, maxWidth: 300, mx: "auto" }}
    >
      {description}
    </Typography>
    {action && action}
  </Box>
);

export default EmptyState;
