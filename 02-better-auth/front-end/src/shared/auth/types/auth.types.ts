export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export interface AuthError extends Error {
  isAuthError: true;
  message: string;
}

export interface ApiError extends Error {
  isApiError: true;
  code?: string;
  message: string;
}
