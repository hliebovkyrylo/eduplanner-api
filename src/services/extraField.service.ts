import { Prisma, type ExtraField } from "@prisma/client";
import { prisma } from "..";
import { ApiError } from "../utils/apiError";

class ExtraFieldService {
  public async createExtraField(data: Omit<ExtraField, "id">[]) {
    try {
      return prisma.extraField.createMany({ data });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new ApiError(
          404,
          "Event with such ID not found",
          "event_not_found"
        );
      }

      throw error;
    }
  }

  public async updateExtraField(
    extraFieldId: string,
    newData: Prisma.ExtraFieldUpdateInput
  ) {
    try {
      return prisma.extraField.update({
        where: {
          id: extraFieldId,
        },
        data: newData,
      });
    } catch (error: any) {
      if (error.code === "P2022") {
        throw new ApiError(
          404,
          "Extra field with such ID not found",
          "extra_field_not_found"
        );
      }

      throw error;
    }
  }

  public async deleteExtraField(extraFieldId: string) {
    try {
      return prisma.extraField.delete({
        where: {
          id: extraFieldId,
        },
      });
    } catch (error: any) {
      if (error.code === "P2022") {
        throw new ApiError(
          404,
          "Extra field with such ID not found",
          "extra_field_not_found"
        );
      }

      throw error;
    }
  }

  public async getExtraFieldById(extraFieldId: string) {
    try {
      return prisma.extraField.findUniqueOrThrow({
        where: {
          id: extraFieldId,
        },
      });
    } catch (error: any) {
      if (error.code === "P2022") {
        throw new ApiError(
          404,
          "Extra field with such ID not found",
          "extra_field_not_found"
        );
      }

      throw error;
    }
  }
}

export const extraFieldService = new ExtraFieldService();
