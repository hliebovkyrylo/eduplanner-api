import { prisma } from "..";
import { ApiError } from "../utils/apiError";

class VisitedService {
  public async createVisitedSchedule(userId: string, scheduleId: string) {
    try {
      return prisma.visited.create({
        data: { userId, scheduleId },
      });
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

  public async getVisitedSchedules(userId: string) {
    return prisma.visited.findMany({
      where: {
        userId: userId,
      },
      include: {
        schedule: true,
      },
    });
  }

  public async getVisitedByUserAndScheduleIds(
    userId: string,
    scheduleId: string
  ) {
    const visited = await prisma.visited.findFirst({
      where: {
        userId: userId,
        scheduleId: scheduleId,
      },
    });

    if (!visited) {
      throw new ApiError(
        404,
        "Visited schedule with such ID not found",
        "visited_not_found"
      );
    }

    return visited;
  }

  public async getVisitedById(visitedId: string) {
    try {
      return prisma.visited.findUniqueOrThrow({
        where: {
          id: visitedId,
        },
        include: {
          schedule: true,
        },
      });
    } catch (error: any) {
      if (error.code === "P2022") {
        throw new ApiError(
          404,
          "Visited schedule with such ID not found",
          "visited_not_found"
        );
      }

      throw error;
    }
  }

  public async removeVisitedSchedule(userId: string, visitedId: string) {
    const deletedVisited = await prisma.visited.deleteMany({
      where: {
        id: visitedId,
        userId: userId,
      },
    });

    if (deletedVisited.count === 0) {
      throw new ApiError(
        404,
        "Visited with such ID not found or access denied",
        "visited_not_found_or_no_access"
      );
    }

    return deletedVisited;
  }
}

export const visitedService = new VisitedService();
