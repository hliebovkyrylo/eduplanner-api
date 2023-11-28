import { Request, Response }     from "express";
import { 
  IUpdateScheduleSchema, 
  IcreateScheduleSchema 
}                                from "../schemas/schedule.schema";
import { scheduleService }       from "../services/schedule.service";
import { userService }           from "../services/user.service";
import { visitedService }        from "../services/visited.service";

class ScheduleController {
  public async createSchedule(request: Request, response: Response) {
    const data     = request.body as IcreateScheduleSchema;
    const schedule = await scheduleService.createSchedule({ ...data });

    response.send(schedule);
  };

  public async fetchSchedulesByAuthor(request: Request, response: Response) {
    const userId    = request.params.userId;
    const schedules = await scheduleService.searchSchedulesByAuthor(userId);

    response.send(schedules);
  };

  public async updateSchedule(request: Request, response: Response) {
    const scheduleId      = request.params.scheduleId;
    const newData         = request.body as IUpdateScheduleSchema;
    const updatedSchedule = await scheduleService.updateSchedule( scheduleId, newData );

    response.send(updatedSchedule);
  };

  public async fetchShedule(request: Request, response: Response) {
    const scheduleId = request.params.scheduleId;
    const schedule   = await scheduleService.findScheduleById(scheduleId);

    if (!schedule) {
      response.status(404).send({
        code   : "schedule-not-found",
        message: "Schedule not found"
      });
    }

    const userId = request.query.userId?.toString();

    if (userId && schedule && userId.toString() !== schedule.authorId.toString()) {
      const isScheduleAlreadyAdded = await visitedService.findVisited(userId, scheduleId);
      
      if (!isScheduleAlreadyAdded) {
        const scheduleId = schedule.id;

        await visitedService.createVisitedSchedule(userId, scheduleId);
      }
    }
    response.send(schedule);
  };

  public async deleteSchedule(request: Request, response: Response) {
    const scheduleId = request.params.scheduleId;
    await scheduleService.deleteSchedule(scheduleId);

    response.send("Schedule deleted");
  };
};

export const scheduleController = new ScheduleController();