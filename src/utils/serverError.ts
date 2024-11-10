import { 
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { errorResponse } from "./apiResponse";

export default async (
  error   : Error,
  request : Request,
  response: Response,
  next    : NextFunction,
) => {
  console.log(error);
  response.status(500).json(errorResponse("Internal server error", 500));
}