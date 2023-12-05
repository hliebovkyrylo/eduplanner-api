import { string, z } from "zod";

export const signInSchema = z.object({
  email   : string(),
  password: string(),
});

export const signUpSchema = z.object({
  email        : z.string(),
  name         : z.string(),
  username     : z.string(),
  image        : z.string(),
  password     : z.string().min(8),
});

export type ISignInSchema = z.infer<typeof signInSchema>;
export type ISignUpSchema = z.infer<typeof signUpSchema>;