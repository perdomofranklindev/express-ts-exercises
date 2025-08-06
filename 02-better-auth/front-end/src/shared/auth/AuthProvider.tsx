import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { authClient } from "./services/auth-client";
import type { User } from "./services/user-service";
import { useNavigate } from "react-router-dom";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getSession = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const session = await authClient.getSession();
      setUser(session.data?.user || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get session");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setError(null);
        const result = await authClient.signIn.email({ email, password });
        if (result.error) throw new Error(result.error.message);
        await getSession();
        navigate("/");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Sign in failed";
        setError(msg);
        throw new Error(msg);
      }
    },
    [getSession, navigate]
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      firstName?: string,
      lastName?: string
    ) => {
      try {
        setError(null);
        const result = await authClient.signUp.email({
          email,
          password,
          name: `${firstName || ""} ${lastName || ""}`.trim() || email,
          firstName: firstName || "",
          lastName: lastName || "",
        });
        if (result.error) throw new Error(result.error.message);
        await getSession();
        navigate("/");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Sign up failed";
        setError(msg);
        throw new Error(msg);
      }
    },
    [getSession, navigate]
  );

  const signOut = useCallback(async () => {
    try {
      await authClient.signOut();
      setUser(null);
      navigate("/auth/sign-in");
    } catch {
      setUser(null);
      navigate("/auth/sign-in");
    }
  }, [navigate]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      error,
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoading, error, signIn, signUp, signOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
