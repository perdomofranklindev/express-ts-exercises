import api from './axios-instance';

// Define the user type based on Better-Auth session response
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  displayUsername?: string | null;
  username?: string | null;
}

/**
 * Fetch the current authenticated user.
 * Throws ApiError or AuthError on failure.
 */
export async function fetchCurrentUser(): Promise<User> {
  const response = await api.get('/api/user/me');
  // The backend wraps the user in { status: 'success', data: user }
  return response.data.data as User;
} 