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
    const currentUserId = request.user?.id;
    const eventId       = request.params.eventId;

    let schedule;

    if (scheduleId !== undefined) {
      schedule = await prisma.schedule.findUnique({
        where: {
          id: scheduleId,
        },
      });

    } else if (eventId !== undefined) {
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
    }

    if (!schedule) {
      response.status(404).send({
        code   : "schedule-not-found",
        message: "Schedule not found"
      });
    }

    if ((schedule?.isPublic === true) || (currentUserId && schedule?.authorId.toString() === currentUserId.toString())) {
      next();
    } else {
      response.status(403).send({
        code   : "forbidden",
        message: "You do not have access to this content"
      });
    }
    
  } catch (error) {
    next(error);
  }
}