import { Router }            from "express";
import { visitedController } from "../controllers/visited.controller";

export const visitedRouter = Router();

visitedRouter.get('/by/:userId', visitedController.getVisitedSchedules);
visitedRouter.delete('/:visitedId', visitedController.removeVisitedSchedule);