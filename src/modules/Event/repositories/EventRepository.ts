import Datasource from "@database/index";
import * as d from "@Event/dtos";
import Event from "@Event/entities/Event";
import { paginateToFindAndCount } from "@shared/Util";
import { Repository } from "typeorm";
import IEventRepository from "./IEventRepository";

export default class EventRepository implements IEventRepository {
  private repository: Repository<Event>;

  constructor() {
    this.repository = Datasource.getRepository(Event);
  }

  async findAndCount(paginate: Paginate): Promise<[Event[], number]> {
    return await this.repository.findAndCount(paginateToFindAndCount(paginate));
  }

  async createEvent(event: Partial<Event>) {
    return await this.repository.save(event);
  }

  async updateEvent(event: d.FormUpdateEvent) {
    return await this.repository.save(event);
  }

  async deleteEvent(eventId: string) {
    await this.repository.delete(eventId);
  }

  async findEventById(id: string) {
    return await this.repository.findOne({ where: { id } });
  }

  async findPromoterId(
    eventId: string
  ): Promise<{ promoterId: string } | undefined> {
    return await this.repository
      .createQueryBuilder("events")
      .select("events.promoter")
      .where("events.id = :id", { id: eventId })
      .getRawOne();
  }
}
