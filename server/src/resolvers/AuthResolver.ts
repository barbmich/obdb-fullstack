import { createAccessToken, createRefreshToken } from "../utils/auth";
import { Args, Ctx, Mutation, Resolver } from "type-graphql";
import { ILoginArgs, IRegisterArgs } from "../types/IArg";
import { Ijwt } from "../types/Ijwt";

@Resolver()
export class AuthResolver {
  @Mutation(() => Ijwt, { nullable: true })
  async register(
    @Args() { name, email, password }: IRegisterArgs,
    @Ctx() { res, dataSources }: any
  ): Promise<Ijwt> {
    await dataSources.userAPI.register({
      name,
      email,
      password,
    });
    // i don't like this passing context around but currently it's needed to avoid code repetition.
    // try to find a better solution (service + repository ?
    // cons of this is: is this really needed in a small app like this one?)
    return this.login({ email, password }, { res, dataSources });
  }

  @Mutation(() => Ijwt, { nullable: true })
  async login(
    @Args() { email, password }: ILoginArgs,
    @Ctx() { res, dataSources }: any
  ): Promise<Ijwt> {
    const user = dataSources.userAPI.login({ email, password });
    res.cookie("refresh-token", createRefreshToken(user), {
      httpOnly: true,
    });
    return {
      accessToken: createAccessToken(user),
    };
  }
}
