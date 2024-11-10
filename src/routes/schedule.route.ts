import { Router } from "express";
import { scheduleController } from "../controllers/schedule.controller";
import { validate } from "../utils/validate";
import {
  createScheduleSchema,
  updateScheduleSchema,
} from "../schemas/schedule.schema";
import { isAuth } from "../middleware/isAuth.middleware";
import { isAuthor } from "../middleware/isAuthor.middleware";
import { isPublic } from "../middleware/isPublic.middleware";

export const scheduleRoute = Router();

scheduleRoute.post(
  "/create",
  isAuth,
  validate(createScheduleSchema),
  scheduleController.createSchedule
);
scheduleRoute.patch(
  "/:scheduleId/update",
  isAuth,
  isAuthor("schedule", "scheduleId"),
  validate(updateScheduleSchema),
  scheduleController.updateSchedule
);
scheduleRoute.delete(
  "/:scheduleId/delete",
  isAuth,
  isAuthor("schedule", "scheduleId"),
  scheduleController.deleteSchedule
);
scheduleRoute.get("/get-all", isAuth, scheduleController.getSchedulesByAuthor);
scheduleRoute.get(
  "/:scheduleId",
  isAuth,
  isPublic("schedule", "scheduleId"),
  scheduleController.getSchedule
);
