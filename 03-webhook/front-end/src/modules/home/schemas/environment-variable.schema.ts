import z from "zod";

export const EnvVarFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(
      /^[A-Z_][A-Z0-9_]*$/,
      "Must be uppercase with underscores only (e.g., API_KEY)"
    ),
  secretKey: z.string().min(1, "Secret key is required"),
  provider: z.string().optional(),
});

export type EnvVarFormData = z.infer<typeof EnvVarFormSchema>;