// import uploadConfig from '@config/upload';
// import rateLimiter from './middlewares/RateLimiter';
// import "@shared/infra/typeorm";
import { errors } from "celebrate";
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import "./container";
import ApiError from "./errors/ApiError";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/files', express.static(uploadConfig.uploadsFolder));
// app.use(rateLimiter);
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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
});

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log("Server started on port 8080");
});
