import { z } from "zod";

export const createScheduleSchema = z.object({
  name: z.string(),
  isPublic: z.boolean().default(false),
  numOfCol: z.number().default(6),
  numOfRow: z.number().default(8),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const updateScheduleSchema = z.object({
  name: z.string().optional(),
  isPublic: z.boolean().optional(),
  numOfCol: z.number().optional(),
  numOfRow: z.number().optional(),
  updatedAt: z.date().default(() => new Date()),
});

export type ICreateScheduleSchema = z.infer<typeof createScheduleSchema>;
export type IUpdateScheduleSchema = z.infer<typeof updateScheduleSchema>;
