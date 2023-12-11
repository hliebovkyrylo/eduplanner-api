import { Prisma, type ExtraField } from "@prisma/client";
import { prisma }                  from "..";

class ExtraFieldService {
  public async createExtraField(data: Omit<ExtraField, 'id'>) {
    return await prisma.extraField.create({ data });
  };
  
  public async updateExtraField(extraFieldId: string, newData: Prisma.ExtraFieldUpdateInput) {
    return await prisma.extraField.update({
      where: {
        id: extraFieldId
      },
      data: newData,
    });
  };

  public async getAllExtraFields(eventId: string) {
    return await prisma.extraField.findMany({
      where: {
        eventId: eventId,
      },
    });
  };
};

export const extraFieldService = new ExtraFieldService();