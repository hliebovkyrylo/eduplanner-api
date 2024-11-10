import { string, z } from "zod";

export const signInSchema = z.object({
  email: string().email(),
  password: string(),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
});

export type ISignInSchema = z.infer<typeof signInSchema>;
export type ISignUpSchema = z.infer<typeof signUpSchema>;
