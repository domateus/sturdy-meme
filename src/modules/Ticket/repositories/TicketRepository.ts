import Datasource from "@database/index";
import { BuyTicket } from "@Ticket/dto";
import Ticket from "@Ticket/entities/Ticket";
import { Repository } from "typeorm";
import ITicketRepository from "./ITicketRepository";

export default class TicketRepository implements ITicketRepository {
  private repository: Repository<Ticket>;

  constructor() {
    this.repository = Datasource.getRepository(Ticket);
  }

  public async findById(id: string) {
    return await this.repository.findOneBy({ id });
  }

  public async saveAll(tickets: Ticket[]) {
    return await this.repository.save(tickets);
  }

  public async findAllByEvent(eventId: string) {
    return await this.repository.find({
      where: {
        event: { id: eventId },
      },
    });
  }

  public async findAvailable(eventId: string): Promise<BuyTicket[]> {
    const tickets = await this.repository
      .createQueryBuilder("ticket")
      .select("ticket.type", "type")
      .addSelect("COUNT(ticket.type)", "quantity")
      .where("ticket.event.id = :id", { id: eventId })
      .andWhere("ticket.status = :status", { status: "available" })
      .groupBy("ticket.type")
      .getRawMany();
    return tickets;
  }

  public async getSomeByType(
    eventId: string,
    buyRequest: BuyTicket[]
  ): Promise<Ticket[]> {
    const tickets = await this.repository
      .createQueryBuilder("ticket")
      .where("ticket.event.id = :id", { id: eventId })
      .andWhere("ticket.status = :status", { status: "available" })
      .andWhere("ticket.type IN (:...types)", {
        types: buyRequest.map(({ type }) => type),
      })
      .getMany();
    const result: Ticket[] = [];
    buyRequest.forEach(({ type, quantity }) => {
      let total = quantity;
      for (const t of tickets.filter((t) => t.type === type)) {
        if (!total) break;
        result.push(t);
        total--;
      }
    });
    return result;
  }

  public async findAllByEventWhereType(eventId: string, type: string) {
    return await this.repository.find({
      where: {
        event: { id: eventId },
        type,
      },
    });
  }

  public async findTicketTypesByEvent(eventId: string) {
    return (
      await this.repository
        .createQueryBuilder("ticket")
        .select("ticket.type")
        .distinctOn(["ticket.type"])
        .where("ticket.event.id = :id", { id: eventId })
        .getMany()
    ).map(({ type }) => type);
  }
}
