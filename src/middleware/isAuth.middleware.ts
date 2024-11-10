import { Request, Response, NextFunction } from "express";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { verifyToken } from "../utils/token";
import { prisma } from "..";
import { errorResponse } from "../utils/apiResponse";

export const isAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const accessToken = request.headers.authorization;

    if (accessToken === undefined) {
      return response.status(401).json(errorResponse("No jwt provided", 401));
    }

    const id = verifyToken(accessToken);
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return response.status(404).json(errorResponse("User not found", 404));
    }

    request.user = user;

    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return response
        .status(410)
        .json(errorResponse("Access token has expired", 410));
    }

    if (error instanceof JsonWebTokenError) {
      return response
        .status(400)
        .json(errorResponse("Access token is not valid", 400));
    }
  }
};
