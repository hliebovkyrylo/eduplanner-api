import { 
  Request, 
  Response, 
  NextFunction 
}                 from "express";
import { prisma } from "..";

export default async (
  request : Request, 
  response: Response,
  next    : NextFunction,
) => {
  try {
    const scheduleId    = request.params.scheduleId;
    const parentId      = request.body.parentId;
    const currentUserId = request.user?.id;
    const eventId       = request.params.eventId;

    let schedule;

    if (scheduleId) {
      schedule = await prisma.schedule.findUnique({
        where: {
          id: scheduleId,
        },
      });

    } else if (eventId) {
      const event = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      schedule = await prisma.schedule.findUnique({
        where: {
          id: event?.parentId,
        },
      });
    } else if (parentId) {
      schedule = await prisma.schedule.findFirst({
        where: {
          id: parentId
        },
      }) ;
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