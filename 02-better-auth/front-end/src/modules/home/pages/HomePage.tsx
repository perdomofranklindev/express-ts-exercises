import { Container, Typography, Box, Button, Paper } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Home Page
          </Typography>
          <Typography variant="body1" paragraph>
            This is the main home page of your application.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button variant="outlined" color="secondary">
            Learn More
          </Button>
        </Paper>
      </Box>
    </Container>
  )
}

export default HomePage 