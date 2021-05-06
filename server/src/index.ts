import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { createConnection, getConnectionOptions } from "typeorm";
import { Brewery } from "./entity/Brewery";

async function bootstrap() {
  const options = await getConnectionOptions("development");
  await createConnection({ ...options, name: "default" });

  const schema = await buildSchema({
    resolvers: [UserResolver],
    orphanedTypes: [Brewery],
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  const { url } = await server.listen(4000);
  console.log(`Playground available at ${url}`);
}

bootstrap();
