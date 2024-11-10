import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { isAuth } from "../middleware/isAuth.middleware";

export const userRoute = Router();
userRoute.get("/me", isAuth, userController.getUser);
