import React from "react";
import { Box, Container, type Breakpoint } from "@mui/material";

interface CenteredFormProps {
  children: React.ReactNode;
  maxWidth?: Breakpoint;
}

export function CenteredForm({ children, maxWidth = "sm" }: CenteredFormProps) {
  return (
    <Box>
      <Container maxWidth={maxWidth}>
        <Box>{children}</Box>
      </Container>
    </Box>
  );
}
