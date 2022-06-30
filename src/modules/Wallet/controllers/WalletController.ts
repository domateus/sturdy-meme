import { Request, Response } from "express";

export default class WalletController {
  public async validateWallet(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }

  public async createWallet(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }

  public async findAllWallets(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }

  public async findWalletById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }

  public async deleteWallet(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {} = request.body;
  }
}
