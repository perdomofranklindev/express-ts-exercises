import type {
  SignUpData,
  SignInData,
  UserProfile,
  ApiResponse,
  SignUpResponse,
  AuthErrorCodeType,
  AuthErrorResponse,
  CheckTokenResponse,
  ChangePasswordData,
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
      throw new ApiError(
        errorData.message,
        response.status,
        errorData.code
      );
    }

    return data;
  }

  async signUp(data: SignUpData): Promise<SignUpResponse> {
    return this.request("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async signIn(data: SignInData): Promise<ApiResponse> {
    return this.request("/api/sign-in", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async signOut(): Promise<ApiResponse> {
    return this.request("/api/sign-out", {
      method: "POST",
    });
  }

  async refreshToken(): Promise<ApiResponse> {
    return this.request("/api/refresh-token", {
      method: "POST",
    });
  }

  async getUserProfile(): Promise<UserProfile> {
    return this.request("/api/user/profile", {
      method: "GET",
    });
  }

  async checkToken(): Promise<CheckTokenResponse> {
    return this.request("/api/check-token", {
      method: "GET",
    });
  }

  async changePassword(data: ChangePasswordData): Promise<ApiResponse> {
    return this.request("/api/user/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();
