import React from "react";
import { Box, Container } from "@mui/material";

interface CenteredFormProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
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
