import { z } from "zod";

export const createExtraFields = z
  .array(
    z.object({
      name: z.string().min(1),
      value: z.string().min(1),
      eventId: z.string().regex(/^[0-9a-f]{24}$/),
    })
  )
  .min(1);

export const updateExtraField = z.object({
  name: z.string(),
  value: z.string(),
});

export type ICreateExtraField = z.infer<typeof createExtraFields>[number];
export type IUpdateExtraField = z.infer<typeof updateExtraField>;
