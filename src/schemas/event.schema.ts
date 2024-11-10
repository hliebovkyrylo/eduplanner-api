import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().max(76),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Expected HH:MM"),
  color: z.string().regex(/^#([0-9a-fA-F]{8})$/, "Invalid color format. Expected #RRGGBBAA"),
  rowNum: z.number(),
  colNum: z.number(),
  scheduleId: z.string().regex(/^[0-9a-f]{24}$/),
});

export const updateEventSchema = z.object({
  name: z.string().max(76),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Expected HH:MM"),
  color: z.string().regex(/^#([0-9a-fA-F]{8})$/, "Invalid color format. Expected #RRGGBBAA"),
});

export type ICreateEventSchema = z.infer<typeof createEventSchema>;
export type IUpdateEventSchema = z.infer<typeof updateEventSchema>;
