import { ApolloError } from "apollo-server-core";
import { Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { REFRESH_TOKEN_COOKIE_NAME } from "../constants/constants";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entity/User";
import { MyContext } from "../types/Context";
import { IAccessTokenPayload } from "src/types/IPayloads";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.JWT_SECRET_ACCESS_TOKEN!, {
    expiresIn: "10m",
  });
};

export const refreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.JWT_SECRET_REFRESH_TOKEN!,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshTokenCookie = (res: Response, user: User) => {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken(user), {
    httpOnly: true,
  });
};

export const sendEmptyAccessToken = (res: Response, message: string) =>
  res.send({ ok: false, accessToken: "", message });

export const removeRefreshToken = (res: Response) =>
  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

export const isAuth: MiddlewareFn<MyContext> = (
  { context },
  next
): Promise<void> => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) throw new ApolloError("Not authenticated");
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN!
    ) as IAccessTokenPayload;
    context.payload = payload;
  } catch (error) {
    throw new ApolloError(error.message);
  }
  return next();
};
