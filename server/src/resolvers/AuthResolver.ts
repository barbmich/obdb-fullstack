import { sendRefreshTokenCookie, createAccessToken } from "../utils/auth";
import { Arg, Args, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { ILoginArgs, IRegisterArgs } from "../types/IArg";
import { Ijwt } from "../types/Ijwt";
import { Response } from "express";
import { IDataSources } from "src/types/IDataSources";
import { User } from "src/entity/User";
import { MyContext } from "../types/Context";

@Resolver()
export class AuthResolver {
  private async createTokens({ user, res }: { user: User; res: Response }) {
    sendRefreshTokenCookie(res, user);
    return {
      accessToken: `${createAccessToken(user)}`,
    };
  }

  @Mutation(() => Ijwt, { nullable: true })
  async register(
    @Args() { name, email, password }: IRegisterArgs,
    @Ctx() { res, dataSources }: { res: Response; dataSources: IDataSources }
  ): Promise<Ijwt> {
    await dataSources.userAPI.register({
      name,
      email,
      password,
    });
    // i don't like this passing context around but currently it's needed to avoid code repetition.
    // try to find a better solution (service + repository ?
    // cons of this is: is this really needed in a small app like this one?)
    const user = await dataSources.userAPI.login({ email, password });
    return this.createTokens({ user, res });
  }

  @Mutation(() => Ijwt, { nullable: true })
  async login(
    @Args() { email, password }: ILoginArgs,
    @Ctx() { res, dataSources }: { res: Response; dataSources: IDataSources }
  ): Promise<Ijwt> {
    const user = await dataSources.userAPI.login({ email, password });
    return this.createTokens({ user, res });
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(
    @Arg("id", () => Int) id: number,
    @Ctx() { dataSources }: MyContext
  ): Promise<Boolean> {
    await dataSources.userAPI.revokeRefreshTokenForUser({ id });
    return true;
  }
}
