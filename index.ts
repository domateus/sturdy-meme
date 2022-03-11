import dotenv from "dotenv";
import { createServer } from "http";

dotenv.config();

const app = require("./config/router-factory");

const http = createServer(app);

process.on("SIGINT", () =>
  http.close((error) => {
    if (error) {
      console.error(`${error.name}: ${error.message}`);
    }
    process.exit(error ? 1 : 0);
  })
);

http.listen(8080, () => console.log("Ouvindo no *:8080"));
