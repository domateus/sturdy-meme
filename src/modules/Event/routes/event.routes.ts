import EventController from "@Event/controllers/EventController";
import { Router } from "express";

const eventRouter = Router();
const eventController = new EventController();

eventRouter.get("/", eventController.findAllEvents);
eventRouter.get("/:id", eventController.findEventById);
eventRouter.post("/", eventController.createEvent);
eventRouter.put("/:id", eventController.updateEvent);
eventRouter.delete("/:id", eventController.deleteEvent);

export default eventRouter;
