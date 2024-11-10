import { Router } from "express";
import { visitedController } from "../controllers/visited.controller";
import { isAuth } from "../middleware/isAuth.middleware";

export const visitedRouter = Router();

visitedRouter.get("/get-all", isAuth, visitedController.getVisitedSchedules);
visitedRouter.delete(
  "/:visitedId",
  isAuth,
  visitedController.removeVisitedSchedule
);
