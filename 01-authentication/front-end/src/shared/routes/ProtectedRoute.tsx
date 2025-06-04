import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/auth/AuthContext";
import { SessionLoader } from "../components/loaders/SessionLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <SessionLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
