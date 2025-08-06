import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { envConfig } from "../../config/env-config";

// Create the auth client
export const authClient = createAuthClient({
  baseURL: envConfig.apiUrl, // The base URL of your auth server
  plugins: [
    inferAdditionalFields({
      user: {
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
      },
    }),
  ],
});

// Export auth instance
export default authClient;