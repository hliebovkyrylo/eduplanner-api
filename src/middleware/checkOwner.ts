import { 
  Request, 
  Response, 
  NextFunction 
}                 from "express";
import { prisma } from "..";

const findScheduleById = async (id: string) => {
  return prisma.schedule.findUnique({
    where: { id },
  });
};

const findScheduleByEventId = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });
  return event ? findScheduleById(event.parentId) : null;
};

export default async (
  request : Request, 
  response: Response,
  next    : NextFunction,
) => {
  try {
    const scheduleId        = request.params.scheduleId;
    const parentId          = request.body.parentId;
    const currentUserId     = request.user?.id;
    const eventId           = request.params.eventId;
    const extraFieldEventId = request.body.eventId;

    let schedule;

    if (scheduleId) {
      schedule = await findScheduleById(scheduleId);

    } else if (eventId) {
      schedule = await findScheduleByEventId(eventId);

    } else if (parentId) {
      schedule = await findScheduleById(parentId);

    } else if (extraFieldEventId) {
      schedule = await findScheduleByEventId(extraFieldEventId);
      
    }

    if (schedule?.authorId.toString() === currentUserId?.toString()) {
      next();
    } else {
      response.status(403).send({
        code: "forbidden",
        error: "You do not have access to this schedule!"
      });
    }

  } catch (error) {
    next(error);
  }
};