import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  fallback,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      fallback || (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      )
    );
  }

  if (isAuthenticated) {
    // Redirect authenticated users to home or intended location
    const from = (location.state as any)?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
