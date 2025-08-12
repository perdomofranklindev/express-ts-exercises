import { cleanEnv, str } from "envalid";

const env = cleanEnv(import.meta.env, {
  API_PROVIDER_URL: str({ default: "http://localhost:3001" }),
  API_URL: str({ default: "http://localhost:3000" }),
});

// Environment variables with their types
export const envConfig = {
  apiUrl: env.API_URL,
  apiProviderUrl: env.API_PROVIDER_URL,
};
