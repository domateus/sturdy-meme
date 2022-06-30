import { Request, Response } from "express";
import { container } from "tsyringe";
import TicketService from "../services/TicketService";

export default class TicketController {
  public async buyTickets(req: Request, res: Response) {
    const ticketService = container.resolve(TicketService);
    const result = await ticketService.buyTickets(req.params.eventId, req.body);
    return res.json(result);
  }
  public async checkAvailability(req: Request, res: Response) {
    const ticketService = container.resolve(TicketService);
    const result = await ticketService.checkAvailability(
      req.params.eventId,
      req.body
    );
    return res.json(result);
  }
  public async buy(req: Request, res: Response): Promise<Response> {
    const ticketService = container.resolve(TicketService);
    const result = await ticketService.buyTickets(req.params.eventId, req.body);
    return res.json(result);
  }

  public async findAllByEvent(req: Request, res: Response): Promise<Response> {
    const ticketService = container.resolve(TicketService);
    const tickets = await ticketService.findAllByEvent(
      req.params.eventId,
      req.query.type as string
    );
    console.log(tickets);
    return res.json(tickets);
  }

  public async findTicketTypesByEvent(
    req: Request,
    res: Response
  ): Promise<Response> {
    const ticketService = container.resolve(TicketService);
    const result = await ticketService.findTicketTypesByEvent(
      req.params.eventId
    );
    return res.json(result);
  }
}
