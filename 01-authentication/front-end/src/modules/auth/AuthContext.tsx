import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../../shared/services/ApiClient";
import type { CheckTokenUser, AuthErrorCodeType } from "../../shared/services/types";
import { AuthErrorCode } from "../../shared/services/types";

interface AuthContextType {
  user: CheckTokenUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CheckTokenUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await apiClient.checkToken();
      if (response.isValid && response.user) {
        setUser(response.user);
        return;
      }
      setUser(null);
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        const apiError = error as { code: AuthErrorCodeType };
        if (
          apiError.code === AuthErrorCode.ACCESS_TOKEN_EXPIRED ||
          apiError.code === AuthErrorCode.ACCESS_TOKEN_MISSING
        ) {
          try {
            await refreshToken();
            return;
          } catch (refreshError) {
            setUser(null);
          }
        }
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    if (isRefreshing) return;
    
    try {
      setIsRefreshing(true);
      await apiClient.refreshToken();
      await checkAuth();
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    await apiClient.signIn({ email, password });
    await checkAuth();
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    await apiClient.signUp({ email, password, firstName, lastName });
    await checkAuth();
  };

  const signOut = async () => {
    await apiClient.signOut();
    setUser(null);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    await apiClient.changePassword({ currentPassword, newPassword });
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    refreshToken,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
