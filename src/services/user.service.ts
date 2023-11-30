import { type User } from "@prisma/client";
import { prisma }    from "..";

class UserService {
  public async createUser(data: Omit<User, 'id'>) {
    return await prisma.user.create({ data });
  };

  public async findUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  };

  public async findUserByUsername(username: string) {
    return await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  };
};

export const userService = new UserService();