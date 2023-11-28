import { type User } from "@prisma/client";
import { prisma }    from "..";

class UserService {
  public async createUser(data: Omit<User, 'id'>) {
    return await prisma.user.create({ data });
  };

  public async findUserById(id: string) {
    return await prisma.user.findFirst({
      where: { id }
    });
  };
};

export const userService = new UserService();