export enum AuthErrorCode {
  ACCESS_TOKEN_MISSING = 'ACCESS_TOKEN_MISSING',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
  INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN',
  REFRESH_TOKEN_MISSING = 'REFRESH_TOKEN_MISSING',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export const AuthErrorResponse = {
  [AuthErrorCode.ACCESS_TOKEN_MISSING]: {
    message: 'Access token not provided',
    code: AuthErrorCode.ACCESS_TOKEN_MISSING,
  },
  [AuthErrorCode.ACCESS_TOKEN_EXPIRED]: {
    message: 'Access token has expired',
    code: AuthErrorCode.ACCESS_TOKEN_EXPIRED,
  },
  [AuthErrorCode.INVALID_ACCESS_TOKEN]: {
    message: 'Invalid access token',
    code: AuthErrorCode.INVALID_ACCESS_TOKEN,
  },
  [AuthErrorCode.REFRESH_TOKEN_MISSING]: {
    message: 'Refresh token not provided',
    code: AuthErrorCode.REFRESH_TOKEN_MISSING,
  },
  [AuthErrorCode.REFRESH_TOKEN_EXPIRED]: {
    message: 'Refresh token has expired. Please sign in again.',
    code: AuthErrorCode.REFRESH_TOKEN_EXPIRED,
  },
  [AuthErrorCode.INVALID_REFRESH_TOKEN]: {
    message: 'Invalid refresh token',
    code: AuthErrorCode.INVALID_REFRESH_TOKEN,
  },
  [AuthErrorCode.INTERNAL_SERVER_ERROR]: {
    message: 'Internal server error',
    code: AuthErrorCode.INTERNAL_SERVER_ERROR,
  },
} as const;
