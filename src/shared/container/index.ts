import EventRepository from "@Event/repositories/EventRepository";
import EventService from "@Event/services/EventService";
import BCryptHashProvider from "@providers/HashProvider/Impl/BCryptHashProvider";
import TicketRepository from "@Ticket/repositories/TicketRepository";
import TicketService from "@Ticket/services/TicketService";
import TransactionRepository from "@Transaction/repositories/TransactionRepository";
import TransactionService from "@Transaction/services/TransactionService";
import UserRepository from "@User/repositories/UserRepository";
import UserService from "@User/services/UserService";
import WalletRepository from "@Wallet/repositories/TransactionRepository";
import WalletService from "@Wallet/services/WalletService";
import { container } from "tsyringe";

container.registerSingleton("TicketRepository", TicketRepository);

container.registerSingleton("UserRepository", UserRepository);

container.registerSingleton("HashProvider", BCryptHashProvider);

container.registerSingleton("EventRepository", EventRepository);

container.registerSingleton("TransactionRepository", TransactionRepository);

container.registerSingleton("WalletRepository", WalletRepository);

container.registerSingleton("TicketService", TicketService);
container.registerSingleton("UserService", UserService);
container.registerSingleton("WalletService", WalletService);
container.registerSingleton("EventService", EventService);
container.registerSingleton("TransactionService", TransactionService);
