import { User } from "../entity/User";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types/Context";
import { isAuth } from "../utils/auth";
import { StarsInput } from "../types/Stars";

@Resolver()
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async allUsers(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async userByID(
    @Arg("id", () => Int)
    id: number
  ): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async getLoggedUser(
    @Ctx() { payload }: MyContext
  ): Promise<User | undefined> {
    return User.findOne(payload.userId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addLike(
    @Arg("brewery_id", () => Int) brewery_id: number,
    @Ctx() { dataSources, payload }: MyContext
  ) {
    const userId = Number(payload.userId);
    return dataSources.userAPI.addLike({ user_id: userId, brewery_id });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removeLike(
    @Arg("brewery_id", () => Int) brewery_id: number,
    @Ctx() { dataSources, payload }: MyContext
  ) {
    const userId = Number(payload.userId);
    return dataSources.userAPI.removeLike({ user_id: userId, brewery_id });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async editStars(
    @Arg("input") { brewery_id, stars }: StarsInput,
    @Ctx() { dataSources, payload }: MyContext
  ) {
    console.log(stars);
    const userId = Number(payload.userId);
    return dataSources.userAPI.editStars({
      user_id: userId,
      brewery_id: brewery_id,
      stars: stars,
    });
  }
}
