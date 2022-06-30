import * as d from "@Event/dtos";
import Event from "@Event/entities/Event";
import IEventRepository from "@Event/repositories/IEventRepository";
import ErrorHelper from "@shared/errors/ErrorHelper";
import TicketService from "@Ticket/services/TicketService";
import IUserRepository from "@User/repositories/IUserRepository";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "tsyringe";

@injectable()
export default class EventService {
  constructor(
    @inject("EventRepository")
    private repository: IEventRepository,
    @inject("TicketService")
    private ticketService: TicketService,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  public async createEvent(eventPayload: d.FormCreateEvent) {
    const promoter = await this.userRepository.findUserById(
      eventPayload.promoterId
    );
    if (!promoter) throw ErrorHelper.promoterNotFound();
    const newEvent = plainToInstance(Event, eventPayload);
    newEvent.promoter = promoter;
    const event = await this.repository.createEvent(newEvent);
    console.log(eventPayload.tickets);
    this.ticketService.createTickets(event, eventPayload.tickets);
    return event;
  }

  public async updateEvent(event: d.FormUpdateEvent) {
    return await this.repository.updateEvent(event);
  }

  public async deleteEvent(eventId: string) {
    await this.repository.deleteEvent(eventId);
  }

  public async findAllEvents(paginate: Paginate) {
    return await this.repository.findAndCount(paginate);
  }

  public async findEventById(eventId: string) {
    return await this.repository.findEventById(eventId);
  }
}
