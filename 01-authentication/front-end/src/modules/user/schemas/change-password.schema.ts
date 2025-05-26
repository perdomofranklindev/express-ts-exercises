import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required")
    .min(8, "Password must be at least 8 characters"),
  newPassword: z
    .string()
    .min(1, "New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmNewPassword: z
    .string()
    .min(1, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>; 