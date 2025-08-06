import api from './axios-instance';

// Define the user type based on backend response (customize as needed)
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  // Add other fields as needed
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