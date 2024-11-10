import { NextFunction, Request, Response } from "express";
import { prisma } from "..";
import { ApiError } from "../utils/apiError";
import { errorResponse } from "../utils/apiResponse";
import { Schedule } from "@prisma/client";

type EntityType = "schedule" | "event" | "extraField";

export const isAuthor = (entityType: EntityType, entityIdParam: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id as string;
      const entityId = req.params[entityIdParam] || req.body[entityIdParam];

      const entity = await findEntityByTypeAndId(entityType, entityId);
      if (!entity) {
        return res
          .status(404)
          .json(errorResponse(`${entityType} not found`, 404));
      }

      const isUserAuthor = await checkIsUserAuthor(entity, userId, entityType);

      if (!isUserAuthor) {
        return res
          .status(403)
          .json(errorResponse("You have no access to this content", 403));
      }

      next();
    } catch (error) {
      if (error instanceof ApiError) {
        res
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      } else {
        next(error);
      }
    }
  };
};

async function findEntityByTypeAndId(
  entityType: string,
  entityId: string
): Promise<any> {
  switch (entityType) {
    case "schedule":
      return await prisma.schedule.findUnique({ where: { id: entityId } });
    case "event":
      return await prisma.event.findUnique({
        where: { id: entityId },
        include: { schedule: true },
      });
    case "extraField":
      return await prisma.extraField.findUnique({
        where: { id: entityId },
        include: { event: { include: { schedule: true } } },
      });
    default:
      throw new ApiError(404, `${entityType} not found`);
  }
}

async function checkIsUserAuthor(
  entity: any,
  userId: string,
  entityType: EntityType
): Promise<boolean> {
  switch (entityType) {
    case "schedule":
      return entity.authorId === userId;
    case "event":
      return entity.schedule.authorId === userId;
    case "extraField":
      return entity.event.schedule.authorId === userId;
    default:
      return false;
  }
}
