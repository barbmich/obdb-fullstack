import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection, getConnectionOptions } from "typeorm";
import { BreweryAPI } from "./datasources/BreweryDataSource";
import { UserAPI } from "./datasources/UserDataSource";
import { resolvers } from "./resolvers/resolvers";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { IDataSources } from "./types/IDataSources";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import {
  createAccessToken,
  sendEmptyAccessToken,
  sendRefreshTokenCookie,
} from "./utils/auth";
import { REFRESH_TOKEN_COOKIE_NAME } from "./constants/constants";
import { IRefreshTokenPayload } from "./types/IPayloads";

async function bootstrap() {
  try {
    const app = express();
    app.use(cookieParser());

    const options = await getConnectionOptions("development");

    await createConnection({
      ...options,
      name: "default",
    });

    app.get("/", (_req, res) => res.send("hello"));
    app.post("/refresh_token", async (req, res) => {
      const token = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
      if (!token) {
        return sendEmptyAccessToken(res, "No refresh token found");
      }
      let payload = null;
      try {
        payload = verify(
          token,
          process.env.JWT_SECRET_REFRESH_TOKEN!
        ) as IRefreshTokenPayload;
      } catch (error) {
        return sendEmptyAccessToken(res, error.message);
      }
      const user = await User.findOne(payload.userId);
      if (!user) {
        return sendEmptyAccessToken(res, "No user found");
      }
      if (user.tokenVersion > payload.tokenVersion) {
        return sendEmptyAccessToken(res, "Refresh token outdated");
      }
      sendRefreshTokenCookie(res, user);
      return res.send({ ok: true, accessToken: createAccessToken(user) });
    });

    const schema = await buildSchema({
      resolvers,
    });

    const dataSources = (): DataSources<IDataSources> => ({
      breweryAPI: new BreweryAPI(),
      userAPI: new UserAPI(),
    });

    const context = async ({ req, res }: { req: Request; res: Response }) => {
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
