import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(3, { error: "Name should be at least 3 characters" }),

    email: z
      .string({ error: "Email is required" })
      .min(1, { error: "Email is required" }) // for handling empty string case
      .pipe(z.email({ error: "Invalid email format" })),

    password: z.coerce
      .string({ error: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters long" }),

    confirmPassword: z.coerce
      .string({ error: "Please confirm your password" })
      .min(1, { error: "Please confirm your password" }),
  })
  .refine((val) => val.password === val.confirmPassword, {
    error: "Password don't match",
    path: ["confirmPassword"],
  });
