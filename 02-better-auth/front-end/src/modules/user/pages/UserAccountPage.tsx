import { Container, Typography, Box, Button, Paper, Avatar, Grid } from '@mui/material'
import { AccountCircle as AccountIcon, Edit as EditIcon } from '@mui/icons-material'

const UserAccountPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 2 }}>
              <AccountIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1">
                User Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your account settings
              </Typography>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Typography variant="body1" paragraph>
                Name: John Doe
              </Typography>
              <Typography variant="body1" paragraph>
                Email: john.doe@example.com
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ mt: 1 }}
              >
                Edit Profile
              </Button>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Change Password
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
}

export default UserAccountPage 