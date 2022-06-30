import Datasource from "@database/index";
import * as d from "@Wallet/dtos";
import Wallet from "@Wallet/entities/Wallet";
import { Repository } from "typeorm";
import IWalletRepository from "./IWalletRepository";

export default class WalletRepository implements IWalletRepository {
  private repository: Repository<Wallet>;

  constructor() {
    this.repository = Datasource.getRepository(Wallet);
  }

  async createWallet(transaction: d.FormCreateWallet) {
    return await this.repository.save(transaction);
  }

  async deleteWallet(walletId: string) {
    await this.repository.delete(walletId);
  }

  async findAllWallets() {
    return await this.repository.find();
  }

  async findWalletById(id: string) {
    return await this.repository.findOne({ where: { id } });
  }
}
