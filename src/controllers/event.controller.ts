import { Request, Response }  from "express";
import { ICreateEventSchema, IUpdateEventSchema } from "../schemas/schedule.schema";
import { eventService }       from "../services/event.service";

class EventController {
  public async createEvent(request: Request, response: Response) {
    const data  = request.body as ICreateEventSchema;
    const event = await eventService.createEvent({ ...data });

    response.send(event);
  };

  public async getEvents(request: Request, response: Response) {
    const scheduleId = request.params.scheduleId;
    const events     = await eventService.searchEvents(scheduleId);

    response.send(events);
  };

  public async getEvent(request: Request, response: Response) {
    const eventId = request.params.eventId;
    const event   = await eventService.findEventById(eventId);

    if (!event) {
      response.status(404).send({
        code   : "event-not-found",
        message: "Event not found"
      })
    }

    response.send(event);
  };

  public async updateEvent(request: Request, response: Response) {
    const eventId      = request.params.eventId;
    const newData      = request.body as IUpdateEventSchema;
    const updatedEvent = await eventService.updateEvent(eventId, newData);

    response.send(updatedEvent);
  };
};

export const eventController = new EventController();