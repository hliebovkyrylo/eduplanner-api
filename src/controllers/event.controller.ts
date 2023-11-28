import { Request, Response }  from "express";
import { ICreateEventSchema, IUpdateEventSchema } from "../schemas/schedule.schema";
import { eventService }       from "../services/event.service";

class EventController {
  // Creating event
  public async createEvent(request: Request, response: Response) {
    const data  = request.body as ICreateEventSchema; // Retrieving the request body and casting it to type ICreateEventSchema
    const event = await eventService.createEvent({ ...data }); // Call the createEvent service method with data transfer and wait for the result

    response.send(event); // Return the created event
  };

  // Receiving all events of the schedule
  public async getEvents(request: Request, response: Response) {
    const scheduleId = request.params.scheduleId; // Take the scheduleId from the request parameters
    const events     = await eventService.searchEvents(scheduleId); // Looking for all events that belong to the schedule

    response.send(events); // Return the received events
  };

  // Receiving one event
  public async getEvent(request: Request, response: Response) {
    const eventId = request.params.eventId; // Take the eventId from the request parameters
    const event   = await eventService.findEventById(eventId); 

    if (!event) { // If the event is not found we return a 404 error
      response.status(404).send({
        code   : "event-not-found",
        message: "Event not found"
      })
    }

    response.send(event); // Return the received event
  };

  // Event update
  public async updateEvent(request: Request, response: Response) {
    const eventId      = request.params.eventId; // Get the id of the event that needs to be updated
    const newData      = request.body as IUpdateEventSchema; // Transmit new data
    const updatedEvent = await eventService.updateEvent(eventId, newData); // update the event

    response.send(updatedEvent);
  };
};

export const eventController = new EventController();