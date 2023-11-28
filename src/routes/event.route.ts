import { Router }               from "express";
import { isPublic, checkOwner } from "../middleware/index";
import { eventController }      from "../controllers/event.controller";
import { validate }             from "../utils/validate";
import { 
  createEventSchema, 
  updateEventSchema 
}                               from "../schemas/schedule.schema";

export const eventRouter = Router();

eventRouter.post('/create/for/:scheduleId', checkOwner, validate(createEventSchema), eventController.createEvent);
eventRouter.get('/getAll/:scheduleId', isPublic, eventController.getEvents);
eventRouter.get('/:scheduleId', isPublic, eventController.getEvents);
eventRouter.patch('/:eventId', checkOwner, validate(updateEventSchema), eventController.updateEvent);