import { Prisma, type Event } from "@prisma/client";
import { prisma } from "..";
import { ApiError } from "../utils/apiError";

class EventService {
  public async createEvent(data: Omit<Event, "id">) {
    try {
      return prisma.event.create({ data });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new ApiError(
          404,
          "Schedule with such ID not found",
          "schedule_not_found"
        );
      }

      throw error;
    }
  }

  public async getEventById(eventId: string) {
    try {
      return prisma.event.findUniqueOrThrow({
        where: {
          id: eventId,
        },
      });
    } catch (error: any) {
      if (error.code === "P2022") {
        throw new ApiError(
          404,
          "Event with such ID not found",
          "event_not_found"
        );
      }

      throw error;
    }
  }

  public async updateEvent(eventId: string, data: Prisma.EventUpdateInput) {
    try {
      return prisma.event.update({
        where: {
          id: eventId,
        },
        data: data,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new ApiError(
          404,
          "Event with such ID not found",
          "event_not_found"
        );
      }

      throw error;
    }
  }
}

export const eventService = new EventService();
