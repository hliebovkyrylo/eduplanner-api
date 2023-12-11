import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { checkOwner } from "../middleware";
import { extraFieldController } from "../controllers/extraField.controller";

export const extraFieldRouter = Router();

extraFieldRouter.post('/create', isAuth, checkOwner, extraFieldController.createExtraField);
extraFieldRouter.patch('/update/:extraFieldId', isAuth, extraFieldController.updateExtraField);
extraFieldRouter.get('/:eventId', isAuth, extraFieldController.getAllExtraFields);