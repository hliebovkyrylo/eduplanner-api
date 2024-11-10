import { Router } from "express";
import { isAuth } from "../middleware/isAuth.middleware";
import { extraFieldController } from "../controllers/extraField.controller";
import { isAuthor } from "../middleware/isAuthor.middleware";

export const extraFieldRouter = Router();

extraFieldRouter.post(
  "/create",
  isAuth,
  isAuthor("event", "eventId"),
  extraFieldController.createExtraField
);
extraFieldRouter.patch(
  "/:extraFieldId/update",
  isAuth,
  isAuthor("extraField", "extraFieldId"),
  extraFieldController.updateExtraField
);
extraFieldRouter.delete(
  "/:extraFieldId/delete",
  isAuth,
  isAuthor("extraField", "extraFieldId"),
  extraFieldController.deleteExtraField
);
