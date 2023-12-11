import { z } from "zod";

export const createScheduleSchema = z.object({
  scheduleName  : z.string(),
  isPublic      : z.boolean().default(false),
  numOfCol      : z.number().default(6),
  numOfRow      : z.number().default(8),
  authorId      : z.string(),
  authorUsername: z.string(),
  createdAt     : z.date().default(() => new Date()),
  updatedAt     : z.date().default(() => new Date()),
});

export const updateScheduleSchema = z.object({
  scheduleName: z.string().optional(),
  isPublic    : z.boolean().optional(),
  numOfCol    : z.number().optional(),
  numOfRow    : z.number().optional(),
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

export const createExtraField = z.object({
  extraName : z.string(),
  extraValue: z.string(),
  eventId   : z.string(),
});

export const updateExtraField = z.object({
  extraName : z.string(),
  extraValue: z.string(),
});

export type IcreateScheduleSchema = z.infer<typeof createScheduleSchema>;
export type IUpdateScheduleSchema = z.infer<typeof updateScheduleSchema>;
export type ICreateEventSchema    = z.infer<typeof createEventSchema>;
export type IUpdateEventSchema    = z.infer<typeof updateEventSchema>;
export type ICreateExtraField     = z.infer<typeof createExtraField>;
export type IUpdateExtraField     = z.infer<typeof updateExtraField>