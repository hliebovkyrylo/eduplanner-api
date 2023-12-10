import { Request, Response } from "express";
import { visitedService }    from "../services/visited.service";

class VisitedController {
  // Method to get schedules that a user has visited
  public async getVisitedSchedules(request: Request, response: Response) {
    const user = request.user;
    if (user === undefined) {
      return response.status(401).send({
        code: "unauthorized",
        message: "You are not authorized"
      });
    }
    const userId          = user.id.toString(); 
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