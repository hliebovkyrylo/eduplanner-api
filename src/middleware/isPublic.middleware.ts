import { Request, Response, NextFunction } from "express";
import { prisma } from "..";
import { ApiError } from "../utils/apiError";
import { errorResponse } from "../utils/apiResponse";

type EntityType = "schedule" | "event";

interface BaseEntity {
  id: string;
  authorId: string;
  isPublic: boolean;
}

interface Schedule extends BaseEntity {}

interface Event extends BaseEntity {
  schedule?: Schedule;
}

export const isPublic = (entityType: EntityType, entityIdParam: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id as string;
      const entityId = req.params[entityIdParam];

      if (!entityId) {
        throw new ApiError(400, "Missing required parameters");
      }

      const entity = await getEntityByTypeAndId(entityType, entityId);

      if (!entity) {
        return res
          .status(404)
          .json(
            errorResponse(`${entityType} with ID ${entityId} not found`, 404)
          );
      }

      const hasEntityAccess = await hasAccess(entity, userId);

      if (!hasEntityAccess) {
        return res.status(403).json(errorResponse("Access denied", 403));
      }

      next();
    } catch (error) {
      if (error instanceof ApiError) {
        return res
          .status(error.statusCode)
          .json(errorResponse(error.message, error.statusCode));
      }
      next(error);
    }
  };
};

async function getEntityByTypeAndId(entityType: EntityType, entityId: string) {
  switch (entityType) {
    case "schedule":
      return prisma.schedule.findUnique({
        where: { id: entityId },
      });
    case "event":
      return prisma.event.findUnique({
        where: { id: entityId },
        include: { schedule: true },
      });
    default:
      throw new ApiError(400, `Unsupported entity type: ${entityType}`);
  }
}

async function hasAccess(entity: any, userId: string): Promise<boolean> {
  if (entity.authorId === userId || entity.isPublic) {
    return true;
  }

  const eventEntity = entity as Event;
  if (eventEntity.schedule) {
    return (
      eventEntity.schedule.authorId === userId || eventEntity.schedule.isPublic
    );
  }

  return false;
}
