import * as d from "@Transaction/dtos";
import ITransactionRepository from "@Transaction/repositories/ITransactionRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class TransactionService {
  constructor(
    @inject("TransactionRepository")
    private repository: ITransactionRepository
  ) {}

  public async validateTransaction(transactionId: string) {
    return true;
    // return await this.repository.validateTransaction(transactionId);
  }

  public async createTransaction(transaction: d.FormCreateTransaction) {
    return await this.repository.createTransaction(transaction);
  }

  public async deleteTransaction(transactionId: string) {
    await this.repository.deleteTransaction(transactionId);
  }

  public async findAllTransactions() {
    return await this.repository.findAllTransactions();
  }

  public async findTransactionById(transactionId: string) {
    return await this.repository.findTransactionById(transactionId);
  }
}
