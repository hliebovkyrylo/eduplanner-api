import { z } from "zod";

export const createUserSchema = z.object({
  userId       : z.string(),
  name         : z.string(),
  username     : z.string(),
  image        : z.string(),
  allowedAccess: z.array(z.string()).default([])
});

export type ICreateUserSchema = z.infer<typeof createUserSchema>;