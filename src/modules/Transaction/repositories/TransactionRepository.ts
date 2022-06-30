import Datasource from "@database/index";
import * as d from "@Transaction/dtos";
import Transaction from "@Transaction/entities/Transaction";
import { Repository } from "typeorm";
import ITransactionRepository from "./ITransactionRepository";

export default class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = Datasource.getRepository(Transaction);
  }

  async createTransaction(transaction: d.FormCreateTransaction) {
    return await this.repository.save(transaction);
  }

  async deleteTransaction(transactionId: string) {
    await this.repository.delete(transactionId);
  }

  async findAllTransactions() {
    return await this.repository.find();
  }

  async findTransactionById(id: string) {
    return await this.repository.findOne({ where: { id } });
  }
}
