import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { createConnection, getConnectionOptions } from "typeorm";
import { Brewery } from "./types/Brewery";
import {
  BreweryResolver,
  BrewerySubFieldsResolver,
} from "./resolvers/BreweryResolver";
import { BreweryAPI } from "./datasources/Brewery";

async function bootstrap() {
  try {
    const options = await getConnectionOptions("development");
    await createConnection({ ...options, name: "default" });

    const schema = await buildSchema({
      resolvers: [UserResolver, BreweryResolver, BrewerySubFieldsResolver],
      orphanedTypes: [Brewery],
    });

    const server = new ApolloServer({
      schema,
      dataSources: () => ({
        breweryAPI: new BreweryAPI(),
      }),
    });

    const { url } = await server.listen();
    console.log(`Playground available at ${url}`);
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
