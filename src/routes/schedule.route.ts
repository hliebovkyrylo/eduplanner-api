import { Router }               from "express";
import { scheduleController }   from "../controllers/schedule.controller";
import { checkOwner, isPublic } from "../middleware/index";
import { validate }             from "../utils/validate";
import { 
  createScheduleSchema, 
  updateScheduleSchema 
}                               from "../schemas/schedule.schema";
import { isAuth }               from "../middleware/isAuth";

export const scheduleRoute = Router();

scheduleRoute.post('/create', isAuth, validate(createScheduleSchema), scheduleController.createSchedule);
scheduleRoute.patch('/update/:scheduleId', isAuth, checkOwner, validate(updateScheduleSchema), scheduleController.updateSchedule);
scheduleRoute.delete('/delete/:scheduleId', isAuth, checkOwner, scheduleController.deleteSchedule);
scheduleRoute.get('/by/:userId', isAuth, scheduleController.fetchSchedulesByAuthor);
scheduleRoute.get('/:scheduleId', isAuth, isPublic, scheduleController.fetchShedule);