import { type Request, type Response } from "express";
import { extraFieldService } from "../services/extraField.service";
import {
  ICreateExtraField,
  IUpdateExtraField,
} from "../schemas/extraField.schema";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

class ExtraFieldController {
  public createExtraField = async (request: Request, response: Response) => {
    try {
      const data = request.body as ICreateExtraField[];
      const extraField = await extraFieldService.createExtraField(data);

      response.send(successResponse(extraField));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  };

  public updateExtraField = async (request: Request, response: Response) => {
    try {
      const extraFieldId = request.params.extraFieldId;
      const data = request.body as IUpdateExtraField;
      const updatedExtraField = await extraFieldService.updateExtraField(
        extraFieldId,
        data
      );

      response.json(successResponse(updatedExtraField));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  };

  public deleteExtraField = async (request: Request, response: Response) => {
    try {
      const extraFieldId = request.params.extraFieldId;
      await extraFieldService.deleteExtraField(extraFieldId);

      response.json(successResponse({ message: "Extra field deleted" }));
    } catch (error) {
      if (error instanceof ApiError) {
        return response
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
    }
  };
}

export const extraFieldController = new ExtraFieldController();
