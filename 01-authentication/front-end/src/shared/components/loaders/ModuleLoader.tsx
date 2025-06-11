import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface ModuleLoaderProps {
  moduleName?: string;
}

export const ModuleLoader = ({ moduleName = 'module' }: ModuleLoaderProps) => {
  return (
    <Card>
      <CardContent
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          gap: 2,
          borderRadius: 2,
        }}
      >
        <CircularProgress
          size={40}
          thickness={4}
          sx={{
            color: 'primary.main',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 500,
          }}
        >
          Loading {moduleName}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Please wait while we load the content
        </Typography>
      </CardContent>
    </Card>
  );
};
