import api from './axios-instance';

// Define the user type based on backend response (customize as needed)
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  username: string | null;
  displayUsername: string | null;
  firstName: string;
  lastName: string;
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