import TransactionController from "@Transaction/controllers/TransactionController";
import { Router } from "express";

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get("/", transactionController.findAllTransactions);
transactionRouter.get("/:id", transactionController.findTransactionById);
transactionRouter.post("/", transactionController.createTransaction);
transactionRouter.delete("/:id", transactionController.deleteTransaction);

export default transactionRouter;
