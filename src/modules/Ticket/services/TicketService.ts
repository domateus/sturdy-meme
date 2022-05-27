import ITicketRepository from "@Ticket/repositories/ITicketRepository";
import UserService from "@User/services/UserService";
import { inject, injectable } from "tsyringe";

@injectable()
export default class TicketService {
  constructor(
    @inject("TicketRepository")
    private repository: ITicketRepository,
    @inject("UserService")
    private userService: UserService
  ) {}
}
