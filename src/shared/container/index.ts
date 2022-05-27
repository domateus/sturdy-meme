import IHashProvider from "@providers/HashProvider/IHashProvider";
import BCryptHashProvider from "@providers/HashProvider/Impl/BCryptHashProvider";
import ITicketRepository from "@Ticket/repositories/ITicketRepository";
import TicketRepository from "@Ticket/repositories/TicketRepository";
import IUsersRepository from "@User/repositories/IUserRepository";
import UserRepository from "@User/repositories/UserRepository";
import { container } from "tsyringe";

container.registerSingleton<ITicketRepository>(
  "TicketRepository",
  TicketRepository
);

container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
