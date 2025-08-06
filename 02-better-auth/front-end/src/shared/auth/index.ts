// Main exports for the auth module
export { useAuth } from './hooks/useAuth';
export { ProtectedRoute } from './components/ProtectedRoute';
export { PublicRoute } from './components/PublicRoute';
export { AuthProvider } from './AuthProvider';
export { AuthContext } from './AuthContext';

// Types
export type { User, AuthState, AuthActions, AuthError, ApiError } from './types/auth.types';

// Services (for internal use)
export { authClient } from './services/auth-client';
export { fetchCurrentUser } from './services/user-service';
export { default as api } from './services/axios-instance';
