import { useState, useEffect, type ReactNode } from 'react'
import { authClient } from './auth-client'
import { AuthContext } from './AuthContext'
import type { User } from './auth-client'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Better-auth handles session checking automatically
        // You can implement additional session verification here if needed
        // const session = await authClient.session.get()
        // setUser(session.user)
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authClient.signIn.email({
        email,
        password,
      })
      
      if (response.data?.user) {
        setUser(response.data.user as User)
      }
    } catch (error) {
      console.error('Sign in failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true)
      const response = await authClient.signUp.email({
        email,
        password,
        name: name || '',
      });
      
      if (response.data?.user) {
        setUser(response.data.user as User)
      }
    } catch (error) {
      console.error('Sign up failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      await authClient.signOut()
      setUser(null)
    } catch (error) {
      console.error('Sign out failed:', error)
      // Still clear local state even if API call fails
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 