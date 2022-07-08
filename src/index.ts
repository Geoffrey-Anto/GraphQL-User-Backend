import "reflect-metadata";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/Register";
import { DataSource } from "typeorm";

async function main() {
  try {
    const AppDataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "geoffrey",
      database: "test1",
      synchronize: true,
      logging: true,
      entities: ["src/entity/**/*.ts"],
    });

    await AppDataSource.initialize()

    const schema = await buildSchema({
      resolvers: [RegisterResolver],
    });

    const server = new ApolloServer({ schema });

    const app = Express();

    await server.start();

    server.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log("Server Started at http://localhost:4000");
    });
  } catch (error) {
    console.error(error);
  }
}

main();
