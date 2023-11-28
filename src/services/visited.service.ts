import { prisma } from "..";

class VisitedService {
  public async createVisitedSchedule(userId: string, scheduleId: string) {
    return await prisma.visited.create({
      data: { userId, scheduleId },
    });
  };

  public async findVisitedSchedules(userId: string) {
    return await prisma.visited.findMany({
      where: { 
        userId: userId
      },
    });
  };

  public async findVisited(userId: string, scheduleId: string) {
    return await prisma.visited.findFirst({
      where: {
        userId    : userId,
        scheduleId: scheduleId,
      },
    });
  };

  public async removeVisitedSchedule(visitedId: string) {
    return await prisma.visited.delete({
      where: {
        id: visitedId
      },
    });
  };
};

export const visitedService = new VisitedService();