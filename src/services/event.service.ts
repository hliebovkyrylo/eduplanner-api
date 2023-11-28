import { Prisma, type Event } from "@prisma/client";
import { prisma }             from "..";

class EventService {
  public async createEvent(data: Omit<Event, 'id'>) {
    return await prisma.event.create({ data });
  };

  public async searchEvents(scheduleId: string) {
    return await prisma.event.findMany({
      where: {
        parentId: scheduleId,
      },
    });
  };

  public async findEventById(eventId: string) {
    return await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });
  };

  public async updateEvent(eventId: string, newData: Prisma.EventUpdateInput) {
    return await prisma.event.update({
      where: {
        id: eventId,
      },
      data: newData,
    });
  };
};

export const eventService = new EventService();