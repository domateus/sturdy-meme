import auth from "@config/auth";
import IHashProvider from "@providers/HashProvider/IHashProvider";
import ErrorHelper from "@shared/errors/ErrorHelper";
import TicketService from "@Ticket/services/TicketService";
import TransactionService from "@Transaction/services/TransactionService";
import { CreateUser } from "@User/dtos";
import CommercialInfo from "@User/entities/CommercialInfo";
import IWalletRepository from "@Wallet/repositories/IWalletRepository";
import WalletService from "@Wallet/services/WalletService";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import User from "../entities/User";
import IUserRepository from "../repositories/IUserRepository";

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
    private hashProvider: IHashProvider, // @inject("CacheProvider") // private cacheProvider: ICacheProvider

    @inject("WalletService")
    private walletService: WalletService,

    @inject("TransactionService")
    private transactionService: TransactionService,

    @inject("TicketService")
    private ticketService: TicketService,

    @inject("WalletRepository")
    private walletRepository: IWalletRepository
  ) {}

  public async createUser({
    name,
    email,
    password,
    type,
  }: CreateUser): Promise<User> {
    await this.validateUser(email);
    const passwordDigest = await this.hashProvider.digest(password);
    return await this.repository.createUser({
      name,
      email,
      password: passwordDigest,
    });

    // await this.cacheProvider.invalidatePrefix("providers-list");
  }

  public async buyTicket(ticketId: string) {
    // this.walletRepository.findWalletById(user.)
    // this.walletService.canBuy(user, ticket)
    // this.transactionService.createTransaction(userWallet, ticket, promoter)
    // this.ticketService.buyTicket(transaction)
  }

  public async addPaymentMethod(userId: string, paymentMethod: string) {
    const user = await this.repository.findUserById(userId);
    if (!user) ErrorHelper.userNotFound();
    const commercialInfo = new CommercialInfo();
    commercialInfo.type;
    // await this.repository.updateUser(user);
  }

  public async authenticateUser({
    email,
    password,
  }: IFormAuthenticateUser): Promise<IAuthenticateUserDTO> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw ErrorHelper.userLoginDidNotMatch();

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
