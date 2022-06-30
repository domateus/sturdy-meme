import * as d from "@Transaction/dtos";
import Transaction from "@Transaction/entities/Transaction";

export default interface ITransactionRepository {
  createTransaction(transaction: d.FormCreateTransaction): Promise<Transaction>;
  deleteTransaction(transactionId: string): Promise<void>;
  findAllTransactions(): Promise<Transaction[]>;
  findTransactionById(id: string): Promise<Transaction | undefined>;
}
