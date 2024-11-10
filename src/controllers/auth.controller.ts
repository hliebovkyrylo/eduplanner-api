import { Request, Response } from "express";
import { ISignInSchema, ISignUpSchema } from "../schemas/auth.schema";
import bcrypt from "bcrypt";
import { authService } from "../services/auth.service";
import { createAccessToken } from "../utils/token";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

class AuthController {
  public async signUp(request: Request, response: Response) {
    try {
      const data = request.body as ISignUpSchema;
      const password = await bcrypt.hash(data.password, 10);
      const user = await authService.signUp({ ...data, password });
      const accessToken = createAccessToken(user.id);

      response.json(successResponse({ accessToken }));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  }

  public async signIn(request: Request, response: Response) {
    try {
      const data = request.body as ISignInSchema;
      const user = await authService.getUserByEmail(data.email);

      const isCorrectPassword =
        user && (await bcrypt.compare(data.password, user.password));

      if (!isCorrectPassword) {
        return response
          .status(409)
          .json(successResponse("Wrong entered data", 409));
      }

      const accessToken = createAccessToken(user.id);

      response.json(successResponse({ accessToken }));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  }
}

export const authController = new AuthController();
