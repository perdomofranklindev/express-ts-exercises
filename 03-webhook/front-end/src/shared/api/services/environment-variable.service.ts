import { apiConsumer } from "../client";

export class EnvironmentVariablesService {
  static async getEnvironmentVariables() {
    const response = await apiConsumer.get("/environment-variables");
    return response.data;
  }
}
