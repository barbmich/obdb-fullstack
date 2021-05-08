import { User } from "../entity/User";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Brewery } from "src/types/Brewery";
import { Like } from "../entity/Like";
import { Context } from "src/types/Context";
import { isAuth } from "../utils/auth";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async userByID(
    @Arg("id", () => Int)
    id: number
  ): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Query(() => [User], { nullable: true })
  async allUsers(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addLike(
    @Arg("brewery_id", () => Int) brewery_id: number,
    @Ctx() { dataSources, payload }: Context
  ) {
    const userId = Number(payload!.userId);
    return dataSources.userAPI.addLike({ id: userId, brewery_id });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removeLike(
    @Arg("brewery_id", () => Int) brewery_id: number,
    @Ctx() { dataSources, payload }: Context
  ) {
    const userId = Number(payload!.userId);
    return dataSources.userAPI.removeLike({ id: userId, brewery_id });
  }
}

@Resolver(() => User)
export class UserSubFieldsResolver {
  @FieldResolver()
  async likes(
    @Root() user: User,
    @Ctx() { dataSources }: Context
  ): Promise<Brewery[]> {
    const likes = await dataSources.userAPI.getUserLikes({ id: user.id });
    const ids = likes.map((like: Like) => like.brewery_id);
    return dataSources.breweryAPI.getBreweriesByIds({ ids });
  }
}
