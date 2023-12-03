import { Request, Response }     from "express";
import { 
  IUpdateScheduleSchema, 
  IcreateScheduleSchema 
}                                from "../schemas/schedule.schema";
import { scheduleService }       from "../services/schedule.service";
import { visitedService }        from "../services/visited.service";

class ScheduleController {
  // Method to handle the creation of a new schedule
  public async createSchedule(request: Request, response: Response) {
    const data     = request.body as IcreateScheduleSchema; // Extracting schedule data from the request body
    const schedule = await scheduleService.createSchedule({ ...data }); // Creating a new schedule using the schedule service

    response.send(schedule); // Sending the created schedule as the response
  };

  // Method to fetch schedules by the author's userId
  public async fetchSchedulesByAuthor(request: Request, response: Response) {
    const userId = request.user?.id; 

    if (!userId) {
      response.status(401).send({
        code: 'user-not-found',
        message: 'User not found, please log in'
      });
    }

    const schedules = userId && (await scheduleService.searchSchedulesByAuthor(userId)); // Retrieving schedules by author using the schedule service

    response.send(schedules);
  };

  // Method to update an existing schedule
  public async updateSchedule(request: Request, response: Response) {
    const scheduleId      = request.params.scheduleId; // Extracting scheduleId from the request parameters
    const newData         = request.body as IUpdateScheduleSchema; // Extracting updated schedule data from the request body
    const updatedSchedule = await scheduleService.updateSchedule( scheduleId, newData ); // Updating the schedule using the schedule service

    response.send(updatedSchedule);
  };

  // Method to fetch a schedule by it's id
  public async fetchShedule(request: Request, response: Response) {
    const scheduleId = request.params.scheduleId; // Extracting scheduleId from the request parameters
    const schedule   = await scheduleService.findScheduleById(scheduleId); // Finding a schedule by id using the schedule service

    if (!schedule) { // Handling the case where the schedule is not found
      response.status(404).send({
        code   : "schedule-not-found",
        message: "Schedule not found"
      });
    }

    const userId = request.query.userId?.toString(); // Extracting user ID from the query parameters

    if (userId && schedule && userId.toString() !== schedule.authorId.toString()) { // Checking if the schedule belongs to a different author than the requesting user
      const isScheduleAlreadyAdded = await visitedService.findVisited(userId, scheduleId); // Checking if the schedule has already been visited by the user
      
      if (!isScheduleAlreadyAdded) { // If not visited, adding the schedule to the user's visited list
        const scheduleId = schedule.id;

        await visitedService.createVisitedSchedule(userId, scheduleId);
      }
    }
    response.send(schedule);
  };

  // Method to delete a schedule by its ID
  public async deleteSchedule(request: Request, response: Response) {
    const scheduleId = request.params.scheduleId; // Extracting schedule ID from the request parameters
    await scheduleService.deleteSchedule(scheduleId); // Deleting the schedule using the schedule service

    response.send("Schedule deleted");
  };
};

export const scheduleController = new ScheduleController();