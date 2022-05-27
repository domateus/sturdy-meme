import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "tiktoken",
  password: "tiktoken",
  database: "tiktoken",
  entities: ["./src/modules/*/entities/*.ts"],
  migrations: ["./src/shared/infra/http/typeorm/migrations/**/*.ts"],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

export default AppDataSource;
