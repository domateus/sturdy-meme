import FormCreateUser from "../dto/FormCreateUser";
import User from "../entities/User";

export default interface IUsersRepository {
  createUser(user: FormCreateUser);
  findUserById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
