import { User } from "@prisma/client";
import { prisma } from "..";
import { ApiError } from "../utils/apiError";

class AuthService {
  public async signUp(data: Omit<User, "id" | "username" | "imageUrl">) {
    try {
      const username = data.email.split("@")[0];
      return prisma.user.create({
        data: { ...data, username },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new ApiError(
          409,
          "Such email already exists",
          "email_already_exist"
        );
      }

      throw error;
    }
  }

  public async getUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ApiError(
        404,
        "User with such email not found",
        "user_not_found"
      );
    }

    return user;
  }
}

export const authService = new AuthService();
