# Authentication API Documentation

This document provides detailed information about the available API endpoints, their request/response formats, and possible error scenarios.

## Table of Contents

- [Authentication API Documentation](#authentication-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Base URL](#base-url)
  - [Authentication](#authentication)
  - [Error Codes](#error-codes)
  - [Endpoints](#endpoints)
    - [Authentication Endpoints](#authentication-endpoints)
      - [Sign Up](#sign-up)
      - [Sign In](#sign-in)
      - [Sign Out](#sign-out)
      - [Refresh Token](#refresh-token)
      - [Check Token](#check-token)
    - [User Endpoints](#user-endpoints)
      - [Get Profile](#get-profile)
      - [Change Password](#change-password)
  - [Error Response Format](#error-response-format)
  - [Security Notes](#security-notes)
  - [Rate Limiting](#rate-limiting)
  - [Support](#support)

## Base URL

All endpoints are prefixed with `/api`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Tokens are stored in HTTP-only cookies:

- `access_token`: Short-lived token for regular API access
- `refresh_token`: Long-lived token for obtaining new access tokens

> **Note:** Cookie names and lifetimes, as well as JWT expiration, are now managed in code via the `envConfig.auth` object and are configurable via environment variables. See the main README for details.

## Error Codes

The API uses standardized error codes for different types of errors:

| Error Code              | Description                | HTTP Status |
| ----------------------- | -------------------------- | ----------- |
| `ACCESS_TOKEN_MISSING`  | Access token not provided  | 401         |
| `ACCESS_TOKEN_EXPIRED`  | Access token has expired   | 401         |
| `INVALID_ACCESS_TOKEN`  | Invalid access token       | 401         |
| `REFRESH_TOKEN_MISSING` | Refresh token not provided | 401         |
| `REFRESH_TOKEN_EXPIRED` | Refresh token has expired  | 401         |
| `INVALID_REFRESH_TOKEN` | Invalid refresh token      | 401         |
| `INTERNAL_SERVER_ERROR` | Internal server error      | 500         |

## Endpoints

### Authentication Endpoints

#### Sign Up

```http
POST /api/auth/sign-up
```

Creates a new user account.

**Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201 Created):**

```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string"
}
```

**Possible Errors:**

- `400 Bad Request`:
  - Invalid input data
  - User already exists
  - Unexpected error during user creation

#### Sign In

```http
POST /api/auth/sign-in
```

Authenticates a user and returns access and refresh tokens.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200 OK):**

```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string"
}
```

**Cookies Set:**

- `access_token`: JWT access token
- `refresh_token`: JWT refresh token

**Possible Errors:**

- `400 Bad Request`: Invalid input data
- `400 Bad Request`: User not found
- `401 Unauthorized`: Invalid password

#### Sign Out

```http
POST /api/auth/sign-out
```

Logs out the user by clearing authentication cookies.

**Response (200 OK):**

```json
{
  "message": "Successfully signed out"
}
```

#### Refresh Token

```http
POST /api/auth/refresh-token
```

Obtains new access and refresh tokens using the current refresh token.

**Response (200 OK):**

```json
{
  "message": "Tokens refreshed successfully"
}
```

**Possible Errors:**

- `401 Unauthorized`:
  - `REFRESH_TOKEN_EXPIRED`: Refresh token has expired. Please sign in again.
  - `INVALID_REFRESH_TOKEN`: Invalid refresh token
  - `REFRESH_TOKEN_MISSING`: Refresh token not provided

#### Check Token

```http
GET /api/auth/check-token
```

Validates the current access token and returns user information.

**Response (200 OK):**

```json
{
  "isValid": true,
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string"
  }
}
```

**Possible Errors:**

- `401 Unauthorized`:
  - `ACCESS_TOKEN_MISSING`: Access token not provided
  - `ACCESS_TOKEN_EXPIRED`: Access token has expired
  - `INVALID_ACCESS_TOKEN`: Invalid access token

### User Endpoints

#### Get Profile

```http
GET /api/user/profile
```

Retrieves the authenticated user's profile information.

**Headers Required:**

- Valid access token in cookies

**Response (200 OK):**

```json
{
  "message": "Profile data retrieved successfully",
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string"
  }
}
```

**Possible Errors:**

- `401 Unauthorized`:
  - `ACCESS_TOKEN_MISSING`: Access token not provided
  - `ACCESS_TOKEN_EXPIRED`: Access token has expired
  - `INVALID_ACCESS_TOKEN`: Invalid access token

#### Change Password

```http
POST /api/user/change-password
```

Changes the authenticated user's password.

**Headers Required:**

- Valid access token in cookies

**Request Body:**

```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Response (200 OK):**

```json
{
  "message": "Password updated successfully"
}
```

**Possible Errors:**

- `401 Unauthorized`:
  - `ACCESS_TOKEN_MISSING`: Access token not provided
  - `ACCESS_TOKEN_EXPIRED`: Access token has expired
  - `INVALID_ACCESS_TOKEN`: Invalid access token
  - Current password is incorrect
- `404 Not Found`: User not found
- `500 Internal Server Error`:
  - `INTERNAL_SERVER_ERROR`: Failed to update password

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

Example:

```json
{
  "message": "Access token has expired",
  "code": "ACCESS_TOKEN_EXPIRED"
}
```

## Security Notes

1. All passwords must be at least 8 characters long
2. Access tokens are short-lived for security
3. Refresh tokens are long-lived but can be revoked
4. All tokens are stored in HTTP-only cookies to prevent XSS attacks
5. CORS is enabled with strict origin checking
6. All endpoints use HTTPS in production

## Rate Limiting

The API implements rate limiting to prevent abuse. Please contact the administrator if you need higher limits.

## Support

For any issues or questions, please contact the system administrator.
