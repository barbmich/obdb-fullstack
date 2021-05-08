import { ApolloError } from "apollo-server-core";
import { sign, verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entity/User";
import { Context } from "../types/Context";

export const createAccessToken = (user: User) => {
  return sign(
    { userId: user.id },
    process.env.JWT_SECRET_ACCESS_TOKEN as string,
    {
      expiresIn: "10m",
    }
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id },
    process.env.JWT_SECRET_REFRESH_TOKEN as string,
    {
      expiresIn: "7d",
    }
  );
};

export const isAuth: MiddlewareFn<Context> = (
  { context },
  next
): Promise<void> => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) throw new ApolloError("Not authenticated");
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN as string
    );
    context.payload = payload as any;
  } catch (error) {
    throw new ApolloError(error.message);
  }
  return next();
};
