import { Router }               from "express";
import { scheduleController }   from "../controllers/schedule.controller";
import { checkOwner, isPublic } from "../middleware/index";
import { validate }             from "../utils/validate";
import { 
  createScheduleSchema, 
  updateScheduleSchema 
}                               from "../schemas/schedule.schema";

export const scheduleRoute = Router();

scheduleRoute.post('/create', validate(createScheduleSchema), scheduleController.createSchedule);
scheduleRoute.patch('/update/:scheduleId', checkOwner, validate(updateScheduleSchema), scheduleController.updateSchedule);
scheduleRoute.delete('/delete/:scheduleId', checkOwner, scheduleController.deleteSchedule);
scheduleRoute.get('/by/:userId', scheduleController.fetchSchedulesByAuthor);
scheduleRoute.get('/:scheduleId', isPublic, scheduleController.fetchShedule);