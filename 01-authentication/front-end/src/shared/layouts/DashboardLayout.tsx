import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          paddingY: 10,
          display: 'grid',
          gridTemplateColumns: 'auto 2fr',
          gridTemplateRows: 'auto 1fr',
          gap: `${theme.spacing(5)} ${theme.spacing(5)}`,
          gridTemplateAreas: `
          "sidebar header"
          "sidebar main"
        `,
          minHeight: '100dvh',
        }}
      >
        <Box sx={{ gridArea: 'sidebar' }}>
          <Sidebar />
        </Box>
        <Box sx={{ gridArea: 'header' }}>
          <Header />
        </Box>
        <Box
          component="main"
          sx={{
            gridArea: 'main',
          }}
        >
          {children}
        </Box>
      </Box>
    </Container>
  );
}
