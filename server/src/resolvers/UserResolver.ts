import { User } from "../entity/User";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Brewery } from "src/types/Brewery";
import { Like } from "src/entity/Like";

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

  @Query(() => User, { nullable: true })
  async userByEmail(
    @Arg("email")
    email: string
  ): Promise<User | undefined> {
    return User.findOne({ email });
  }
}

@Resolver(() => User)
export class UserSubFieldsResolver {
  @FieldResolver()
  async likes(
    @Root() user: User,
    @Ctx() { dataSources }: any
  ): Promise<Brewery[]> {
    const likes = await dataSources.userAPI.getUserLikes({ id: user.id });
    const ids = likes.map((like: Like) => like.brewery_id);
    return dataSources.breweryAPI.getBreweriesByIds({ ids });
  }
}
