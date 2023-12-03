import { Router }            from "express";
import { visitedController } from "../controllers/visited.controller";
import { isAuth }            from "../middleware/isAuth";

export const visitedRouter = Router();

visitedRouter.get('/getAll', isAuth, visitedController.getVisitedSchedules);
visitedRouter.delete('/:visitedId', isAuth, visitedController.removeVisitedSchedule);