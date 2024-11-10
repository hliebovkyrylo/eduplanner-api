import { Prisma, type Schedule } from "@prisma/client";
import { prisma } from "..";
import { ApiError } from "../utils/apiError";

class ScheduleService {
  public async createSchedule(data: Omit<Schedule, "id">) {
    return prisma.schedule.create({ data });
  }

  public async getSchedulesByAuthorId(userId: string) {
    return prisma.schedule.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  public async updateSchedule(
    scheduleId: string,
    data: Prisma.ScheduleUpdateInput
  ) {
    try {
      return prisma.schedule.update({
        where: {
          id: scheduleId,
        },
        data: data,
      });
    } catch (error: any) {
      if (error.code === "P2022") {
        throw new ApiError(
          404,
          "Schedule with such ID not found",
          "schedule_not_found"
        );
      }

      throw error;
    }
  }

  public async getScheduleById(scheduleId: string, userId?: string) {
    const schedule = await prisma.schedule.findFirst({
      where: { id: scheduleId },
      include: { events: true },
    });

    if (!schedule) {
      throw new ApiError(
        404,
        "Schedule with such ID not found",
        "schedule_not_found"
      );
    }

    if (userId && userId !== schedule.authorId.toString()) {
      const isVisited = await prisma.visited.findFirst({
        where: { userId, scheduleId },
      });

      if (!isVisited) {
        await prisma.visited.create({
          data: { userId, scheduleId },
        });
      }
    }

    return schedule;
  }

  public async deleteSchedule(scheduleId: string) {
    try {
      return prisma.schedule.delete({
        where: { id: scheduleId },
      });
    } catch (error: any) {
      if (error.code === "P2022") {
        throw new ApiError(
          404,
          "Schedule with such ID not found",
          "schedule_not_found"
        );
      }

      throw error;
    }
  }
}

export const scheduleService = new ScheduleService();
