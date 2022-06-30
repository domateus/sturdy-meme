import eventRouter from "@Event/routes/event.routes";
import ticketRouter from "@Ticket/routes/tickets.routes";
import transactionRouter from "@Transaction/routes/Transaction.routes";
import userRouter from "@User/routes/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/ticket", ticketRouter);
routes.use("/event", eventRouter);
routes.use("/transaction", transactionRouter);

export default routes;
