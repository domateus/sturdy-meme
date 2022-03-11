import express from "express";
import routes from "./router-file";

const app = express();

app.use((_, res, next) => {
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use("/public", express.static(`${__dirname}/public`));

routes.forEach((filename) => app.use(require(filename)));

app.get("/", (_, res) => res.send("<h1>Server</h1>"));

export default app;
