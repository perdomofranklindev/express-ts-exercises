export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
}

export interface ApiResponse {
  message: string;
}

export interface SignUpResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export enum AuthErrorCode {
  ACCESS_TOKEN_MISSING = "ACCESS_TOKEN_MISSING",
  ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED",
  INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
  REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",
  INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export interface AuthErrorResponse {
  message: string;
  code: AuthErrorCode;
}
