import { ApolloError } from "apollo-server-core";
import { Request } from "express";
import { sign, verify } from "jsonwebtoken";
import { User } from "../entity/User";

export const createAccessToken = (user: User) => {
  return sign(
    { userId: user.id },
    process.env.JWT_SECRET_ACCESS_TOKEN as string,
    {
      expiresIn: "15m",
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

export const getUserId = (req: Request) => {
  try {
    const authorization = req.headers["authorization"];
    if (authorization) {
      const token = authorization.split(" ")[1];
      const user = verify(token, process.env.JWT_SECRET_ACCESS_TOKEN as string);
      return user;
    }
    return;
  } catch (err) {
    throw new ApolloError("Not authenticated");
  }
};
