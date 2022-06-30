import * as d from "@Event/dtos";
import Event from "@Event/entities/Event";

export default interface IEventRepository {
  findPromoterId(eventId: string): Promise<{ promoterId: string } | undefined>;
  createEvent(event: Partial<Event>): Promise<Event>;
  updateEvent(event: d.FormUpdateEvent): Promise<Event>;
  deleteEvent(eventId: string): Promise<void>;
  findEventById(id: string): Promise<Event | null>;
  findAndCount: findAndCount<Event>;
}
