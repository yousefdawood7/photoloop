import { z } from "zod";

const authSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(1, { error: "Name is required" }) // for handling empty string case
    .min(3, { error: "Name should be at least 3 characters" }),

  email: z
    .string({ error: "Email is required" })
    .min(1, { error: "Email is required" }) // for handling empty string case
    .pipe(z.email({ error: "Invalid email format" })),

  password: z.coerce
    .string<string>({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" }),

  confirmPassword: z.coerce
    .string<string>({ error: "Please confirm your password" })
    .min(1, { error: "Please confirm your password" }),
});

export const loginSchema = authSchema.partial({
  name: true,
  confirmPassword: true,
});

export const magicLinkSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(3, { error: "Name should be at least 3 characters" }),

  email: z
    .string({ error: "Email is required" })
    .min(1, { error: "Email is required" }) // for handling empty string case
    .pipe(z.email({ error: "Invalid email format" })),
});

export const registerSchema = authSchema.refine(
  (val) => val.password === val.confirmPassword,
  {
    error: "Password don't match",
    path: ["confirmPassword"],
  },
);
