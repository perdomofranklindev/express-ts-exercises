import axios, { AxiosError } from "axios";
import { envConfig } from "../../config/env-config";

// Error codes from backend
enum ErrorCodes {
  INVALID_TOKEN = 'INVALID_TOKEN',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  FAILED_TO_GET_SESSION = 'FAILED_TO_GET_SESSION'
}

// API response types
interface ApiErrorResponse {
  status: 'error';
  message: string;
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

export interface AuthError extends AxiosError {
  isAuthError: true;
  message: string;
}

export interface ApiError extends AxiosError {
  isApiError: true;
  code?: string;
  message: string;
}

// Create Axios instance
const api = axios.create({
  baseURL: envConfig.apiUrl || "http://localhost:3000",
  withCredentials: true, // Send cookies (session token)
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const errorResponse = error.response?.data as ApiErrorResponse;
    
    // Handle authentication errors
    if (error.response?.status === 401 || 
        errorResponse?.code === ErrorCodes.INVALID_TOKEN || 
        errorResponse?.code === ErrorCodes.SESSION_EXPIRED || 
        errorResponse?.code === ErrorCodes.FAILED_TO_GET_SESSION) {
      
      // Just return the auth error - let the useAuth hook handle sign out and redirects
      return Promise.reject({
        ...error,
        isAuthError: true,
        message: errorResponse?.message || "Session expired. Please sign in again."
      } as AuthError);
    }

    // Return standardized error object for other errors
    return Promise.reject({
      ...error,
      isApiError: true,
      code: errorResponse?.code,
      message: errorResponse?.message || error.message || "An unexpected error occurred"
    } as ApiError);
  }
);

export default api;