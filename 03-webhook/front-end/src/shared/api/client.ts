import axios from "axios";
import { envConfig } from "../config/env-config";

export const apiConsumer = axios.create({
  baseURL: envConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiProvider = axios.create({
  baseURL: envConfig.apiProviderUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
