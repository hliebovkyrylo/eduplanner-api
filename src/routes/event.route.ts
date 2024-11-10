import { Router } from "express";
import { eventController } from "../controllers/event.controller";
import { validate } from "../utils/validate";
import {
  createEventSchema,
  updateEventSchema,
} from "../schemas/event.schema";
import { isAuth } from "../middleware/isAuth.middleware";
import { isPublic } from "../middleware/isPublic.middleware";
import { isAuthor } from "../middleware/isAuthor.middleware";

export const eventRouter = Router();

eventRouter.post(
  "/create",
  isAuth,
  validate(createEventSchema),
  isAuthor("schedule", "scheduleId"),
  eventController.createEvent
);
eventRouter.get(
  "/:eventId",
  isAuth,
  isPublic("event", "eventId"),
  eventController.getEvent
);
eventRouter.patch(
  "/:eventId/update",
  isAuth,
  validate(updateEventSchema),
  isAuthor("event", "eventId"),
  eventController.updateEvent
);
