import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/authenticate", userController.authenticateUser);

userRouter.post("/create", userController.createUser);

export default userRouter;
