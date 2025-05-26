import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/auth/AuthContext";
import { useEffect, useState } from "react";
import type { AuthErrorCodeType } from "../services/types";
import { AuthErrorCode } from "../services/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, refreshToken } = useAuth();
  const location = useLocation();
  const [error, setError] = useState<AuthErrorCodeType | null>(null);

  useEffect(() => {
    const handleTokenRefresh = async () => {
      try {
        await refreshToken();
      } catch (err) {
        if (err instanceof Error && "code" in err) {
          const apiError = err as { code: AuthErrorCodeType };
          setError(apiError.code);
        }
      }
    };

    if (!isLoading && !isAuthenticated) {
      handleTokenRefresh();
    }
  }, [isLoading, isAuthenticated, refreshToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle both cases where token is missing or refresh token is invalid
  if (
    error === AuthErrorCode.ACCESS_TOKEN_MISSING ||
    error === AuthErrorCode.INVALID_REFRESH_TOKEN ||
    !isAuthenticated
  ) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
