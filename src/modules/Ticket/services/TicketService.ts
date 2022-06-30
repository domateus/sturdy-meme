import Event from "@Event/entities/Event";
import IEventRepository from "@Event/repositories/IEventRepository";
import ErrorHelper from "@shared/errors/ErrorHelper";
import { range } from "@shared/Util";
import { BuyRequest, BuyTicket, CreateTicket } from "@Ticket/dto";
import Ticket from "@Ticket/entities/Ticket";
import ITicketRepository from "@Ticket/repositories/ITicketRepository";
import IUserRepository from "@User/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class TicketService {
  constructor(
    @inject("TicketRepository")
    private repository: ITicketRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("EventRepository")
    private eventRepository: IEventRepository
  ) {}

  public async buyTickets(eventId: string, buyRequest: BuyRequest) {
    await this.checkAvailability(eventId, buyRequest.tickets);
    const promoter = await this.getEventPromoter(eventId);
    const buyer = await this.userRepository.findUserById(buyRequest.buyer);
    if (!buyer) throw ErrorHelper.userNotFound();
    const tickets = await this.repository.getSomeByType(
      eventId,
      buyRequest.tickets
    );
    tickets.forEach((t) => {
      t.status = "sold";
      t.owner = buyer.name;
    });
    this.repository.saveAll(tickets);
    return tickets;
  }

  public async checkAvailability(
    eventId: string,
    requestAvailable: BuyTicket[]
  ) {
    const available = await this.repository.findAvailable(eventId);
    const result = requestAvailable.map(({ type, quantity }) => {
      const ticket = available.find(({ type: t }) => t === type);
      return { type, available: ticket ? ticket.quantity >= quantity : false };
    });
    if (result.some(({ available }) => !available)) {
      throw ErrorHelper.notEnoughTickets();
    }
    return result;
  }

  public async findTicketTypesByEvent(eventId: string) {
    return await this.repository.findTicketTypesByEvent(eventId);
  }

  public async findAllByEvent(eventId: string, type: string) {
    return await this.repository.findAllByEventWhereType(eventId, type);
  }

  public async createTickets(
    event: Event,
    ticketsPayload: CreateTicket[]
  ): Promise<void> {
    const tickets: Ticket[] = [];
    ticketsPayload.forEach(({ price, quantity, type }, k) => {
      for (const i of range(quantity)) {
        const ticket = new Ticket();
        ticket.event = event;
        ticket.status = "available";
        ticket.type = type;
        ticket.price = price;
        ticket.number = `${k}#${String(i + 1).padStart(4, "0")}`;
        tickets.push(ticket);
      }
    });
    await this.repository.saveAll(tickets);
  }

  private async getEventPromoter(eventId: string) {
    const p = await this.eventRepository.findPromoterId(eventId);
    if (!p?.promoterId) throw ErrorHelper.promoterNotFound();
    const promoter = await this.userRepository.findUserById(p?.promoterId);
    if (!promoter) throw ErrorHelper.promoterNotFound();
    return promoter;
  }
}
