import {
  type SignUpData,
  type SignInData,
  type UserProfile,
  type ApiResponse,
  type SignUpResponse,
  type AuthErrorCodeType,
  type AuthErrorResponse,
  type CheckTokenResponse,
  type ChangePasswordData,
  AuthErrorCode,
} from "./types";

class ApiError extends Error {
  public status: number;
  public code?: AuthErrorCodeType;

  constructor(message: string, status: number, code?: AuthErrorCodeType) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing: boolean = false;
  private pendingRequests: Array<() => Promise<any>> = [];

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as AuthErrorResponse;
      throw new ApiError(errorData.message, response.status, errorData.code);
    }

    return data;
  }

  private async protectedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      return await this.request<T>(endpoint, options);
    } catch (error) {
      if (
        error instanceof ApiError &&
        (error.code === AuthErrorCode.ACCESS_TOKEN_EXPIRED ||
          error.code === AuthErrorCode.INVALID_ACCESS_TOKEN ||
          error.code === AuthErrorCode.ACCESS_TOKEN_MISSING)
      ) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          try {
            await this.refreshToken();
            const retryResponse = await this.request<T>(endpoint, options);
            this.pendingRequests.forEach((cb) => cb());
            this.pendingRequests = [];
            return retryResponse;
          } catch (refreshError) {
            if (
              refreshError instanceof ApiError &&
              (refreshError.code === AuthErrorCode.REFRESH_TOKEN_EXPIRED ||
                refreshError.code === AuthErrorCode.REFRESH_TOKEN_MISSING ||
                refreshError.code === AuthErrorCode.INVALID_REFRESH_TOKEN)
            ) {
              window.location.href = "/auth/sign-in";
            }
            throw refreshError;
          } finally {
            this.isRefreshing = false;
          }
        } else {
          return new Promise((resolve, reject) => {
            this.pendingRequests.push(() =>
              this.request<T>(endpoint, options).then(resolve).catch(reject)
            );
          });
        }
      }
      throw error;
    }
  }

  // Auth.

  async signUp(data: SignUpData): Promise<SignUpResponse> {
    return this.request("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async signIn(data: SignInData): Promise<ApiResponse> {
    return this.request("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async signOut(): Promise<ApiResponse> {
    return this.request("/api/auth/sign-out", {
      method: "POST",
    });
  }

  async refreshToken(): Promise<ApiResponse> {
    try {
      const response = await this.request<ApiResponse>(
        "/api/auth/refresh-token",
        {
          method: "POST",
        }
      );
      return response;
    } finally {
      this.isRefreshing = false;
      this.pendingRequests = [];
    }
  }

  async checkToken(): Promise<CheckTokenResponse> {
    return this.protectedRequest("/api/auth/check-token", {
      method: "GET",
    });
  }

  // User.

  async getUserProfile(): Promise<UserProfile> {
    return this.protectedRequest("/api/user/profile", {
      method: "GET",
    });
  }

  async changePassword(data: ChangePasswordData): Promise<ApiResponse> {
    return this.protectedRequest("/api/user/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();
