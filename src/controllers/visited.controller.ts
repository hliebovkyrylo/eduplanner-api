import { Request, Response } from "express";
import { visitedService } from "../services/visited.service";
import { successResponse } from "../utils/apiResponse";

class VisitedController {
  public async getVisitedSchedules(request: Request, response: Response) {
    const userId = request.user?.id as string;
    const visitedSchedules = await visitedService.getVisitedSchedules(userId);

    response.json(successResponse(visitedSchedules));
  }

  public async removeVisitedSchedule(request: Request, response: Response) {
    const userId = request.user?.id as string;
    const visitedId = request.params.visitedId;
    await visitedService.removeVisitedSchedule(userId, visitedId);

    response.json(successResponse({ message: "Visited schedule removed" }));
  }
}

export const visitedController = new VisitedController();
