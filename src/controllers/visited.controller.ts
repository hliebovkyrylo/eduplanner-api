import { Request, Response } from "express";
import { visitedService }    from "../services/visited.service";

class VisitedController {
  public async getVisitedSchedules(request: Request, response: Response) {
    const userId          = request.params.userId;
    const visitedSchedule = await visitedService.findVisitedSchedules(userId);

    response.send(visitedSchedule);
  };

  public async removeVisitedSchedule(request: Request, response: Response) {
    const visitedId = request.params.visitedId;

    await visitedService.removeVisitedSchedule(visitedId);
    response.send("Visited schedule removed");
  };
};

export const visitedController = new VisitedController();