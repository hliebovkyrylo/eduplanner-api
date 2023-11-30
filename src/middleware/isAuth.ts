import { 
  Request, 
  Response, 
  NextFunction 
}                      from "express";
import { 
  TokenExpiredError, 
  JsonWebTokenError 
}                      from "jsonwebtoken";
import { verifyToken } from "../utils/token";
import { prisma }      from "..";

export const isAuth = async (
  request : Request, 
  response: Response, 
  next    : NextFunction
) => {
  try {
    const accessToken = request.headers.authorization;

    if (accessToken === undefined) {
      return response.status(401).send({
        code   : "no-jwt",
        message: "No jwt provided"
      });
    }

    const id   = verifyToken(accessToken);
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      response.status(404).send({
        code   : "user-not-found",
        message: "User not found"
      });
    }

    user && (request.user = user);

    return next();

  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return response.status(401).send({
        code   : "jwt-expired",
        message: "Access token has expired"
      });
    }

    if (error instanceof JsonWebTokenError) {
      return response.status(401).send({
        code   : "jwt-invalid",
        message: "Access token is not valid"
      });
    }
  }
};