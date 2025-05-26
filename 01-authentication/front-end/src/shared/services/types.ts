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

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface CheckTokenUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CheckTokenResponse {
  isValid: boolean;
  message?: string;
  user?: CheckTokenUser;
}

export const AuthErrorCode = {
  ACCESS_TOKEN_MISSING: "ACCESS_TOKEN_MISSING",
  ACCESS_TOKEN_EXPIRED: "ACCESS_TOKEN_EXPIRED",
  INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
  REFRESH_TOKEN_EXPIRED: "REFRESH_TOKEN_EXPIRED",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type AuthErrorCodeType =
  (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

export interface AuthErrorResponse {
  message: string;
  code: AuthErrorCodeType;
}

export const AuthErrorResponses: Record<AuthErrorCodeType, AuthErrorResponse> =
  {
    [AuthErrorCode.ACCESS_TOKEN_MISSING]: {
      message: "Access token not found",
      code: AuthErrorCode.ACCESS_TOKEN_MISSING,
    },
    [AuthErrorCode.ACCESS_TOKEN_EXPIRED]: {
      message: "Access token has expired",
      code: AuthErrorCode.ACCESS_TOKEN_EXPIRED,
    },
    [AuthErrorCode.INVALID_ACCESS_TOKEN]: {
      message: "Invalid access token",
      code: AuthErrorCode.INVALID_ACCESS_TOKEN,
    },
    [AuthErrorCode.REFRESH_TOKEN_EXPIRED]: {
      message: "Refresh token has expired. Please sign in again.",
      code: AuthErrorCode.REFRESH_TOKEN_EXPIRED,
    },
    [AuthErrorCode.INVALID_REFRESH_TOKEN]: {
      message: "Invalid refresh token",
      code: AuthErrorCode.INVALID_REFRESH_TOKEN,
    },
    [AuthErrorCode.INTERNAL_SERVER_ERROR]: {
      message: "Internal server error",
      code: AuthErrorCode.INTERNAL_SERVER_ERROR,
    },
  };
