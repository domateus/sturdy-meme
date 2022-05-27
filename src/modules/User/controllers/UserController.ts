import { Request, Response } from "express";
import { container } from "tsyringe";
import UserService from "../services/UserService";

export default class UserController {
  public async createUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, password } = request.body;

    const userService = container.resolve(UserService);

    const user = await userService.createUser({
      name,
      email,
      password,
    });

    return response.json({ id: user.id });
  }

  public async authenticateUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password }: { email: string; password: string } =
      request.body;

    const userService = container.resolve(UserService);

    const { user, token } = await userService.authenticateUser({
      email,
      password,
    });

    return response.json({
      id: user.id,
      token,
    });
  }
}
