import { Request, Response } from "express";
import {
  IUpdateScheduleSchema,
  ICreateScheduleSchema,
} from "../schemas/schedule.schema";
import { scheduleService } from "../services/schedule.service";
import { visitedService } from "../services/visited.service";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

class ScheduleController {
  public async createSchedule(request: Request, response: Response) {
    const userId = request.user?.id as string;
    const data = request.body as ICreateScheduleSchema;
    const schedule = await scheduleService.createSchedule({
      ...data,
      authorId: userId,
    });

    response.json(successResponse(schedule));
  }

  public async getSchedulesByAuthor(request: Request, response: Response) {
    try {
      const userId = request.user?.id as string;
      const schedules = await scheduleService.getSchedulesByAuthorId(userId);

      response.json(successResponse(schedules));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  }

  public async updateSchedule(request: Request, response: Response) {
    try {
      const scheduleId = request.params.scheduleId;
      const data = request.body as IUpdateScheduleSchema;
      const updatedSchedule = await scheduleService.updateSchedule(
        scheduleId,
        data
      );

      response.json(successResponse(updatedSchedule));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  }

  public async getSchedule(request: Request, response: Response) {
    try {
      const userId = request.user?.id;
      const scheduleId = request.params.scheduleId;
      const schedule = await scheduleService.getScheduleById(
        scheduleId,
        userId
      );

      response.json(successResponse(schedule));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  }

  public async deleteSchedule(request: Request, response: Response) {
    try {
      const scheduleId = request.params.scheduleId;
      await scheduleService.deleteSchedule(scheduleId);

      response.json(successResponse({ message: "Schedule deleted" }));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  }
}

export const scheduleController = new ScheduleController();
