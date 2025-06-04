import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/auth/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    // Redirect to home page if user is already authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
