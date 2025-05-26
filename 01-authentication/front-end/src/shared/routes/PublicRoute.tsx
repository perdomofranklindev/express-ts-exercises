import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/auth/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  if (isAuthenticated) {
    // Redirect to home page if user is already authenticated
    return <Navigate to="/user/profile" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
