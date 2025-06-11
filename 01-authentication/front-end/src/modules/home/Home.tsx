import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { WelcomeSection } from './components/WelcomeSection';
import { StatsOverview } from './components/StatsOverview';
import { SessionInfo } from './components/SessionInfo';
import { QuickActions } from './components/QuickActions';
import { RecentActivity } from './components/RecentActivity';

export default function Home() {
  return (
    <Box>
      <WelcomeSection />
      <StatsOverview />
      <SessionInfo />

      {/* Quick Actions and Recent Activity */}
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <QuickActions />
        </Grid>

        {/* Recent Activity */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
}
