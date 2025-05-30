# Protected Request Logic

This document explains how the protected request system works with access and refresh tokens in our application.

## Overview

The `protectedRequest` method in `ApiClient` handles authenticated API requests with automatic token refresh. Here's how it works:

## Flow Diagram

```mermaid
flowchart TD
    %% Variables and States
    V1[accessToken]:::variable
    V2[refreshToken]:::variable
    V3[pendingRequests]:::variable

    %% Main Flow
    A[protectedRequest] --> B[request]
    B --> C{Response OK?}
    C -->|Yes| D[Return Data]
    C -->|No| E{Token Error?}

    %% Token Error Handling
    E -->|Yes| F{isRefreshing?}
    E -->|No| G[Throw Error]
    F -->|No| H[Start Refresh]
    F -->|Yes| I[Queue Request]

    %% Refresh Flow
    H --> J[refreshToken]
    J --> K{Refresh Success?}
    K -->|Yes| L[Retry Original Request]
    K -->|No| M[Redirect to Login]

    %% Queue Management
    I --> N[Wait for Refresh]
    N --> L

    %% Variable Interactions
    V1 -->|Used in| B
    V2 -->|Used in| J
    V3 -->|Stores| I
    V3 -->|Processes| L

    %% Error States
    ES1[ACCESS_TOKEN_EXPIRED]:::error
    ES2[INVALID_ACCESS_TOKEN]:::error
    ES3[ACCESS_TOKEN_MISSING]:::error
    ES4[REFRESH_TOKEN_EXPIRED]:::error
    ES5[INVALID_REFRESH_TOKEN]:::error
    ES6[REFRESH_TOKEN_MISSING]:::error

    %% Error State Interactions
    ES1 -->|Triggers| E
    ES2 -->|Triggers| E
    ES3 -->|Triggers| E
    ES4 -->|Triggers| M
    ES5 -->|Triggers| M
    ES6 -->|Triggers| M

    %% Style Definitions
    classDef process fill:#f9f,stroke:#333,stroke-width:2px
    classDef decision fill:#bbf,stroke:#333,stroke-width:2px
    classDef variable fill:#dfd,stroke:#333,stroke-width:2px
    classDef error fill:#fdd,stroke:#333,stroke-width:2px

    %% Apply Styles
    class A,B,D,G,H,J,L,M process
    class C,E,F,K decision
    class V1,V2,V3 variable
    class ES1,ES2,ES3,ES4,ES5,ES6 error
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant Client
    participant ApiClient
    participant Server

    %% Initial Request
    Client->>ApiClient: protectedRequest()
    ApiClient->>Server: request() with credentials

    alt Response OK
        Server-->>ApiClient: Success Response
        ApiClient-->>Client: Return Data
    else Token Error
        Server-->>ApiClient: 401 with AuthErrorCode

        alt Not Refreshing
            ApiClient->>ApiClient: Set isRefreshing = true
            ApiClient->>Server: refreshToken()

            alt Refresh Success
                Server-->>ApiClient: New accessToken
                ApiClient->>Server: Retry Original Request
                Server-->>ApiClient: Success Response
                ApiClient->>ApiClient: Process pendingRequests
                ApiClient-->>Client: Return Data
            else Refresh Failed
                Server-->>ApiClient: Refresh Token Error
                ApiClient->>Client: Redirect to /auth/sign-in
            end

            ApiClient->>ApiClient: Set isRefreshing = false
        else Already Refreshing
            ApiClient->>ApiClient: Queue Request in pendingRequests
            Note over ApiClient: Wait for refresh completion
            ApiClient->>Server: Retry Original Request
            Server-->>ApiClient: Success Response
            ApiClient-->>Client: Return Data
        end
    end
```

## Step-by-Step Explanation

1. **Initial Request**

   - When `protectedRequest` is called, it first attempts the request normally
   - The request includes credentials automatically via `credentials: "include"`

2. **Token Error Handling**

   - If the request fails with token-related errors:
     - ACCESS_TOKEN_EXPIRED
     - INVALID_ACCESS_TOKEN
     - ACCESS_TOKEN_MISSING
   - The system checks if a refresh is already in progress

3. **Refresh Token Process**

   - If no refresh is in progress:
     - Sets `isRefreshing = true`
     - Attempts to refresh the token
     - On success, retries the original request
     - Processes any queued requests
     - Finally sets `isRefreshing = false`
   - If a refresh is already in progress:
     - Queues the current request in `pendingRequests`
     - Will be processed after the refresh completes

4. **Error Scenarios**
   - If refresh token is invalid/expired/missing:
     - User is redirected to `/auth/sign-in`
   - Other errors are thrown normally

## Example Usage

```typescript
// Making a protected request
const userProfile = await apiClient.getUserProfile();
```

## Key Features

- Automatic token refresh with request queuing
- Proper error handling with specific error codes
- Automatic redirect to login when needed
- Credentials included in all requests
- Singleton instance for consistent state management

## Important Notes

- All protected requests should use the `
