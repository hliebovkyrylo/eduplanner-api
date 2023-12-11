import { Prisma, type Schedule } from "@prisma/client";
import { prisma }                from "..";

class ScheduleService {
  public async createSchedule(data: Omit<Schedule, 'id'>) {
    return await prisma.schedule.create({ data });
  };

  public async searchSchedulesByAuthor(userId: string) {
    return await prisma.schedule.findMany({
      where: {
        authorId: userId
      },
    });
  };

  public async findSchdeulesByIds(schdeuleIds: any) {
    return await prisma.schedule.findMany({
      where: {
        id: {
          in: schdeuleIds
        }
      }
    })
  }

  public async updateSchedule(scheduleId: string, newData: Prisma.ScheduleUpdateInput) {
    return await prisma.schedule.update({
      where: {
        id: scheduleId,
      },
      data: newData,
    });
  };

  public async findScheduleById(scheduleId: string) {
    return await prisma.schedule.findFirst({
      where: {
        id: scheduleId,
      },
    });
  };

  public async deleteSchedule(scheduleId: string) {
    const events = await prisma.event.findMany({
      where: {
        parentId: scheduleId,
      },
    });

    if (events !== null) {
      const eventIds = events.map(event => event.id);

      await prisma.extraField.deleteMany({
        where: {
          eventId: {
            in: eventIds,
          },
        },
      });

      await prisma.event.deleteMany({
        where: {
          parentId: scheduleId,
        },
      });
    }

    return await prisma.schedule.delete({
      where: {
        id: scheduleId,
      },
    });
  };
};

export const scheduleService = new ScheduleService();