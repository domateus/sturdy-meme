import Ticket from "@Ticket/entities/Ticket";
import * as d from "@Wallet/dtos";
import Wallet from "@Wallet/entities/Wallet";
import IWalletRepository from "@Wallet/repositories/IWalletRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class WalletService {
  constructor(
    @inject("WalletRepository")
    private repository: IWalletRepository
  ) {}

  public canBuy(userWallet: Wallet, ticket: Ticket) {
    return ticket.price <= userWallet.balance;
  }

  public async createWallet(wallet: d.FormCreateWallet) {
    return await this.repository.createWallet(wallet);
  }

  public async deleteWallet(walletId: string) {
    await this.repository.deleteWallet(walletId);
  }

  public async findAllWallets() {
    return await this.repository.findAllWallets();
  }

  public async findWalletById(walletId: string) {
    return await this.repository.findWalletById(walletId);
  }
}
