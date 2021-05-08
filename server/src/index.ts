import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver, UserSubFieldsResolver } from "./resolvers/UserResolver";
import { createConnection, getConnectionOptions } from "typeorm";
import { Brewery } from "./types/Brewery";
import {
  BreweryResolver,
  BrewerySubFieldsResolver,
} from "./resolvers/BreweryResolver";
import { BreweryAPI } from "./datasources/BreweryDataSource";
import { UserAPI } from "./datasources/UserDataSource";
import { AuthResolver } from "./resolvers/AuthResolver";

async function bootstrap() {
  try {
    const options = await getConnectionOptions("development");
    await createConnection({ ...options, name: "default" });

    const schema = await buildSchema({
      resolvers: [
        UserResolver,
        UserSubFieldsResolver,
        BreweryResolver,
        BrewerySubFieldsResolver,
        AuthResolver,
      ],
      orphanedTypes: [Brewery],
    });

    const server = new ApolloServer({
      schema,
      dataSources: () => ({
        breweryAPI: new BreweryAPI(),
        userAPI: new UserAPI(),
      }),
      context: ({ req, res }) => {
        return { req, res };
      },
    });

    const { url } = await server.listen();
    console.log(`Playground available at ${url}`);
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
