import Datasource from "@database/index";
import { Repository } from "typeorm";
import FormCreateUser from "../dto/FormCreateUser";
import User from "../entities/User";
import IUserRepository from "./IUserRepository";

export default class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = Datasource.getRepository(User);
  }

  createUser(user: FormCreateUser) {
    return this.repository.save(user);
  }
  async findUserById(id: string) {
    return await this.repository.findOne({ where: { id } });
  }
  public async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
    });
  }
}
