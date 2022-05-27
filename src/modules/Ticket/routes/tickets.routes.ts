import { Router } from "express";
import TicketController from "../controllers/TicketController";

const controller = new TicketController();
const ticketRouter = Router();

ticketRouter.post("/", controller.buy);

export default ticketRouter;
