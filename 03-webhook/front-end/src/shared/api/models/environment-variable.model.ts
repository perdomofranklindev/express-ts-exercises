export interface EnvironmentVariable {
  id: string;
  name: string;
  secretKey: string;
  provider: string | null;
  createdAt: Date;
  updatedAt: Date;
}
