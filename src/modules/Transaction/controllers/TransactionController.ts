import { Request, Response } from "express";

export default class TransactionController {
  public async validateTransaction(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }

  public async createTransaction(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }

  public async findAllTransactions(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }

  public async findTransactionById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }

  public async deleteTransaction(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }
}
