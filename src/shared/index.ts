// import uploadConfig from '@config/upload';
// import rateLimiter from './middlewares/RateLimiter';
// import "@shared/infra/typeorm";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import "./container";
import { errorHandler } from "./errors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/files', express.static(uploadConfig.uploadsFolder));
// app.use(rateLimiter);
app.use(routes);
app.use(errorHandler);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
