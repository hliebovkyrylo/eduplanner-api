import { z } from "zod";

export const createScheduleSchema = z.object({
  scheduleName  : z.string(),
  isPublic      : z.boolean().default(false),
  authorId      : z.string(),
  authorUsername: z.string(),
  createdAt     : z.date().default(() => new Date()),
  updatedAt     : z.date().default(() => new Date()),
});

export const updateScheduleSchema = z.object({
  scheduleName: z.string(),
  isPublic    : z.boolean(),
  updatedAt   : z.date().default(() => new Date()),
});

export const createEventSchema = z.object({
  eventName : z.string().max(76),
  eventTime : z.string(),
  eventColor: z.string(),
  rowNum    : z.number(),
  colNum    : z.number(),
  parentId  : z.string(),
});

export const updateEventSchema = z.object({
  eventName : z.string().max(76),
  eventTime : z.string(),
  eventColor: z.string(),
});

export type IcreateScheduleSchema = z.infer<typeof createScheduleSchema>;
export type IUpdateScheduleSchema = z.infer<typeof updateScheduleSchema>;
export type ICreateEventSchema    = z.infer<typeof createEventSchema>;
export type IUpdateEventSchema    = z.infer<typeof updateEventSchema>;