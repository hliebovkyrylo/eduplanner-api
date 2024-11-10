import { Request, Response } from "express";
import {
  ICreateEventSchema,
  IUpdateEventSchema,
} from "../schemas/event.schema";
import { eventService } from "../services/event.service";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

class EventController {
  public async createEvent(request: Request, response: Response) {
    try {
      const data = request.body as ICreateEventSchema;
      const event = await eventService.createEvent({ ...data });

      response.json(successResponse(event));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  }

  public async getEvent(request: Request, response: Response) {
    try {
      const eventId = request.params.eventId;
      const event = await eventService.getEventById(eventId);

      response.json(successResponse(event));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  }

  public async updateEvent(request: Request, response: Response) {
    try {
      const eventId = request.params.eventId;
      const data = request.body as IUpdateEventSchema;
      const updatedEvent = await eventService.updateEvent(eventId, data);

      response.json(successResponse(updatedEvent));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  }
}

export const eventController = new EventController();
