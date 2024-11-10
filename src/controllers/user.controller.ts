import { type Request, type Response } from "express";
import { type User } from "@prisma/client";
import { ProfileDTO } from "../dtos/user.dto";
import { successResponse } from "../utils/apiResponse";

class UserController {
  public async getUser(request: Request, response: Response) {
    const user = request.user as User;
    const profileDTO = new ProfileDTO(user);

    response.json(successResponse({ ...profileDTO }));
  }
}

export const userController = new UserController();
