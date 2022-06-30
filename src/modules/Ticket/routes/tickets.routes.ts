import { Router } from "express";
import TicketController from "../controllers/TicketController";

const controller = new TicketController();
const ticketRouter = Router();

ticketRouter.get("/:eventId", controller.findAllByEvent);
ticketRouter.get("/types/:eventId", controller.findTicketTypesByEvent);
ticketRouter.post("/availability/:eventId", controller.checkAvailability);
ticketRouter.post("/buy/:eventId", controller.buyTickets);

export default ticketRouter;
