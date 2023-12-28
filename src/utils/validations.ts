import { z } from "zod";

export const signupValidation = z
  .object({
    username: z
      .string()
      .min(4, "Username must be atleast 4 characters")
      .max(15, "Username can't be more than 15 characters"),
    email: z.string().email("The email you provided was not valid"),
    password: z.string().min(6, "Password must be atleast 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export type TSignup = z.infer<typeof signupValidation>;

export const loginValidation = z.object({
  email: z.string().email("The email you provided was not valid"),
  password: z.string(),
});

export type TLogin = z.infer<typeof loginValidation>;
