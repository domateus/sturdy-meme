import ticketRouter from "@Ticket/routes/tickets.routes";
import userRouter from "@User/routes/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/ticket", ticketRouter);

export default routes;
