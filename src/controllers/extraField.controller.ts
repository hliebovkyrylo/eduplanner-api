import { type Request, type Response }           from "express";
import { extraFieldService }                     from "../services/extraField.service";
import { ICreateExtraField, IUpdateExtraField }  from "../schemas/schedule.schema";

class ExtraFieldController {
  public createExtraField = async (request: Request, response: Response) => {
    const data       = request.body as ICreateExtraField;
    const extraField = await extraFieldService.createExtraField(data);

    response.send(extraField);
  };

  public updateExtraField = async (request: Request, response: Response) => {
    const extraFieldId = request.params.extraFieldId;
    const newData      = request.body as IUpdateExtraField;
    const extraField   = await extraFieldService.updateExtraField(extraFieldId, newData);

    response.send(extraField);
  };

  public getAllExtraFields = async (request: Request, response: Response) => {
    const eventId = request.params.eventId;
    const extraFields = await extraFieldService.getAllExtraFields(eventId);

    response.send(extraFields);
  };
};

export const extraFieldController = new ExtraFieldController();