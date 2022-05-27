import Datasource from "@database/index";
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
}
