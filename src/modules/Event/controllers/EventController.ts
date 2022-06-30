import * as d from "@Event/dtos";
import EventService from "@Event/services/EventService";
import { getPagination } from "@shared/Util";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class EventController {
  public async createEvent(
    request: Request,
    response: Response
  ): Promise<Response> {
    const eventService = container.resolve(EventService);

    const event = await eventService.createEvent(request.body);
    return response.json({ id: event.id });
  }

  public async updateEvent(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, title, description, date, location, logo }: d.FormUpdateEvent =
      request.body;

    const eventService = container.resolve(EventService);

    const event = await eventService.updateEvent({
      id,
      title,
      description,
      date,
      location,
      logo,
    });

    return response.json({ id: event.id });
  }

  public async deleteEvent(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.body;

    const eventService = container.resolve(EventService);

    await eventService.deleteEvent(id);

    return response.json({ id });
  }

  public async findAllEvents(
    request: Request,
    response: Response
  ): Promise<Response> {
    const eventService = container.resolve(EventService);
    const paginate = getPagination(request.query);

    const events = await eventService.findAllEvents(paginate);

    return response.json(events);
  }

  public async findEventById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.body;

    const eventService = container.resolve(EventService);

    const event = await eventService.findEventById(id);

    return response.json(event);
  }
}
