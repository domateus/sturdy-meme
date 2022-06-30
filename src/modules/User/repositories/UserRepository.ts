import Datasource from "@database/index";
import * as d from "@User/dtos";
import { Repository } from "typeorm";
import User from "../entities/User";
import IUserRepository from "./IUserRepository";

export default class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = Datasource.getRepository(User);
  }

  createUser(user: d.CreateUser) {
    return this.repository.save(user);
  }
  async findUserById(id: string) {
    console.log("id", id);
    return await this.repository.findOne({ where: { id } });
  }
  public async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
    });
  }
}
