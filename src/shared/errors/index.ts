import { NextFunction, Request, Response } from "express";
import ApiError from "./ApiError";

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (err instanceof ApiError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
