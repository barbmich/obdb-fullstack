import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection, getConnectionOptions } from "typeorm";
import { BreweryAPI } from "./datasources/BreweryDataSource";
import { UserAPI } from "./datasources/UserDataSource";
import { resolvers } from "./resolvers/resolvers";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { ExpressContext } from "./types/Context";
import { IDataSources } from "./types/IDataSources";
import express from "express";
import cookieParser from "cookie-parser";

async function bootstrap() {
  try {
    const app = express();
    app.use(cookieParser());

    const options = await getConnectionOptions("development");
    await createConnection({
      ...options,
      name: "default",
    });

    const schema = await buildSchema({
      resolvers,
    });

    const dataSources = (): DataSources<IDataSources> => ({
      breweryAPI: new BreweryAPI(),
      userAPI: new UserAPI(),
    });

    const context = async ({ req, res }: ExpressContext) => {
      return { req, res };
    };

    const apolloServer = new ApolloServer({
      schema,
      dataSources,
      context,
    });

    apolloServer.applyMiddleware({ app });

    const port = 4000;
    app.listen(port, () => {
      console.log(`🚀 playground available at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
