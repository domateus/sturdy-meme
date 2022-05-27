import { Request, Response } from 'express';
import { container } from 'tsyringe';
import TicketService from '../services/TicketService';

export default class TicketController {
  public async buy(req: Request, res: Response): Promise<Response> {


  const ticketService = container.resolve(TicketService);

  return res.json();
}
}