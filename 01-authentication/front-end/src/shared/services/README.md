# Protected Request Logic

This document explains how the protected request system works with access and refresh tokens in our application.

## Overview

The `protectedRequest` method in `ApiClient` handles authenticated API requests with automatic token refresh. Here's how it works:

## Flow Diagram

```
[Protected Request] → [Check Response]
         ↓
[If Token Error] → [Is Refreshing?]
         ↓
    [Yes] → [Queue Request]
    [No]  → [Try Refresh Token]
         ↓
[If Refresh Success] → [Retry Original Request]
[If Refresh Fails] → [Redirect to Login]
```

## Step-by-Step Explanation

1. **Initial Request**
   - When you make a protected request, it first tries to execute normally
   - The request includes the access token automatically

2. **Token Error Handling**
   - If the request fails due to token issues (expired, invalid, or missing), the system checks if a refresh is already in progress

3. **Refresh Token Process**
   - If no refresh is in progress:
     - Starts the refresh token process
     - Retries the original request with the new token
     - Processes any queued requests
   - If a refresh is already in progress:
     - Queues the current request
     - Will be processed after the refresh completes

4. **Error Scenarios**
   - If the refresh token is invalid/expired:
     - User is redirected to the login page
   - Other errors are thrown normally

## Example Usage

```typescript
// Making a protected request
const userProfile = await apiClient.getUserProfile();
```

## Key Features

- Automatic token refresh
- Request queuing during refresh
- Seamless error handling
- Automatic redirect to login when needed

## Important Notes

- All protected requests should use the `protectedRequest` method
- The system handles token management automatically
- No manual token refresh is needed in your code 