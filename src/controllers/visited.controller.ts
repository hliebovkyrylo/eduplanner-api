import { Request, Response } from "express";
import { visitedService }    from "../services/visited.service";

class VisitedController {
  // Method to get schedules that a user has visited
  public async getVisitedSchedules(request: Request, response: Response) {
    const userId          = request.params.userId; // Extracting userId from the request parameters
    const visitedSchedule = await visitedService.findVisitedSchedules(userId); // Finding visited schedules for the user using the visited service

    response.send(visitedSchedule); // Sending the visited schedules as the response
  };

  // Method to remove a visited schedule by its id
  public async removeVisitedSchedule(request: Request, response: Response) {
    const visitedId = request.params.visitedId; // Extracting visited schedule from the request parameters

    await visitedService.removeVisitedSchedule(visitedId); // Removing the visited schedule using the visited service
    response.send("Visited schedule removed");
  };
};

export const visitedController = new VisitedController();