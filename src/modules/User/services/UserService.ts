import auth from "@config/auth";
import IHashProvider from "@providers/HashProvider/IHashProvider";
import ErrorHelper from "@shared/errors/ErrorHelper";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import User from "../entities/User";
import IUserRepository from "../repositories/IUserRepository";

interface IFormCreateUser {
  name: string;
  email: string;
  password: string;
}

interface IFormAuthenticateUser {
  email: string;
  password: string;
}

interface IAuthenticateUserDTO {
  user: User;
  token: string;
}

@injectable()
export default class UserService {
  constructor(
    @inject("UserRepository")
    private repository: IUserRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider // @inject("CacheProvider") // private cacheProvider: ICacheProvider
  ) {}

  public async createUser({
    name,
    email,
    password,
  }: IFormCreateUser): Promise<User> {
    await this.validateUser(email);
    const passwordDigest = await this.hashProvider.digest(password);
    return await this.repository.createUser({
      name,
      email,
      password: passwordDigest,
    });

    // await this.cacheProvider.invalidatePrefix("providers-list");
  }

  public async authenticateUser({
    email,
    password,
  }: IFormAuthenticateUser): Promise<IAuthenticateUserDTO> {
    const user = await this.repository.findByEmail(email);
    if (!user) ErrorHelper.userLoginDidNotMatch();

    const passwordIsValid = await this.hashProvider.compare(
      password,
      user.password
    );
    if (!passwordIsValid) ErrorHelper.invalidPassword();

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }

  private async validateUser(email: string) {
    const checkUserExists = await this.repository.findByEmail(email);
    if (checkUserExists) ErrorHelper.userArealyExists();
  }
}
