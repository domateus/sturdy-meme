import * as d from "@Wallet/dtos";
import Wallet from "@Wallet/entities/Wallet";

export default interface IWalletRepository {
  createWallet(wallet: d.FormCreateWallet): Promise<Wallet>;
  deleteWallet(walletId: string): Promise<void>;
  findAllWallets(): Promise<Wallet[]>;
  findWalletById(id: string): Promise<Wallet | undefined>;
}
