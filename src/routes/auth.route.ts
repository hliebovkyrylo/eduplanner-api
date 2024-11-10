import { Router } from "express";
import { validate } from "../utils/validate";
import { signInSchema, signUpSchema } from "../schemas/auth.schema";
import { authController } from "../controllers/auth.controller";

export const authRoute = Router();

authRoute.post("/sign-in", validate(signInSchema), authController.signIn);
authRoute.post("/sign-up", validate(signUpSchema), authController.signUp);
