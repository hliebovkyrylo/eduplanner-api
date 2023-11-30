import { type User } from "@prisma/client";

export type IUserDTO = Omit<User, 'password'>;

export class ProfileDTO implements IUserDTO {
  public id      : string;
  public email   : string;
  public username: string;
  public name    : string;
  public image   : string;

  constructor (data: IUserDTO) {
    this.id       = data.id;
    this.email    = data.email;
    this.username = data.username;
    this.name     = data.name;
    this.image    = data.image;
  };
};