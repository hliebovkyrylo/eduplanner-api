import { Router }               from "express";
import { isPublic, checkOwner } from "../middleware/index";
import { eventController }      from "../controllers/event.controller";
import { validate }             from "../utils/validate";
import { 
  createEventSchema, 
  updateEventSchema 
}                               from "../schemas/schedule.schema";
import { isAuth }               from "../middleware/isAuth";

export const eventRouter = Router();

eventRouter.post('/create/for/:scheduleId', isAuth, checkOwner, validate(createEventSchema), eventController.createEvent);
eventRouter.get('/getAll/:scheduleId', isAuth, isPublic, eventController.getEvents);
eventRouter.get('/:scheduleId', isAuth, isPublic, eventController.getEvents);
eventRouter.patch('/:eventId', isAuth, checkOwner, validate(updateEventSchema), eventController.updateEvent);