import * as d from "@User/dtos";
import User from "../entities/User";

export default interface IUsersRepository {
  createUser(user: d.FormCreateUser);
  findUserById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
