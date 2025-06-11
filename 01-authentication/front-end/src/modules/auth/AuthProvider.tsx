import { useEffect, useState } from 'react';
import { apiClient } from '../../shared/services/ApiClient';
import { AuthContext } from './AuthContext';
import type { CheckTokenUser } from '../../shared/services/types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CheckTokenUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await apiClient.checkToken();
      if (response.isValid && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    await apiClient.signIn({ email, password });
    await checkAuth();
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
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
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
