import Ticket from "../entities/Ticket";

export default interface ITicketRepository {
  findById(id: string): Promise<Ticket | null>;
}
