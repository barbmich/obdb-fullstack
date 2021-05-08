import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection, getConnectionOptions } from "typeorm";
import { BreweryAPI } from "./datasources/BreweryDataSource";
import { UserAPI } from "./datasources/UserDataSource";
import { resolvers } from "./resolvers/resolvers";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { Context } from "./types/Context";
import { IDataSources } from "./types/IDataSources";

async function bootstrap() {
  try {
    const options = await getConnectionOptions("development");
    await createConnection({
      ...options,
      name: "default",
    });

    const schema = await buildSchema({
      resolvers,
    });

    const server = new ApolloServer({
      schema,
      dataSources: (): DataSources<IDataSources> => ({
        breweryAPI: new BreweryAPI(),
        userAPI: new UserAPI(),
      }),
      context: async ({ req, res }: Context) => {
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
