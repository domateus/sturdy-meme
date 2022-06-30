import { BuyTicket } from "@Ticket/dto";
import Ticket from "../entities/Ticket";

export default interface ITicketRepository {
  getSomeByType(eventId: string, buyRequest: BuyTicket[]): Promise<Ticket[]>;
  findTicketTypesByEvent(eventId: string): Promise<string[]>;
  findById(id: string): Promise<Ticket | null>;
  saveAll(tickets: Ticket[]): Promise<Ticket[]>;
  findAllByEventWhereType(eventId: string, type: string): Promise<Ticket[]>;
  findAllByEvent(eventId: string): Promise<Ticket[]>;
  findAvailable(eventId: string): Promise<BuyTicket[]>;
}
