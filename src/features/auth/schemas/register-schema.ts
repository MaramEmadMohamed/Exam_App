import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters"),
    username: z
      .string()
      .trim()
      .min(5, "Username must be at least 5 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers, and underscores are allowed",
      ),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number must be at least 7 digits")
      .max(20, "Phone number is too long")
      .regex(/^[+\d][\d\s()-]*$/, "Enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Use uppercase, lowercase, number, and special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });