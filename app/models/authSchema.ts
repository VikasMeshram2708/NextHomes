import * as z from "zod";

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Name can only contain letters and spaces.",
    }),
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Invalid email address format." }),
  password: z
    .string({ required_error: "Password is Required" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .refine(
      (password) =>
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password),
      { message: "Password must include uppercase, lowercase, and a number." }
    )
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: "Password must include at least one special character.",
    }),
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Invalid email address format." }),
  password: z
    .string({ required_error: "Password is Required" })
    .min(5, { message: "Password must be at least 5 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .refine(
      (password) =>
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password),
      { message: "Password must include uppercase, lowercase, and a number." }
    )
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: "Password must include at least one special character.",
    }),
});

export type loginSchema = z.infer<typeof loginSchema>;
