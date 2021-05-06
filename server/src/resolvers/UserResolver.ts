import { User } from "../entity/User";
import { Arg, Int, Query, Resolver } from "type-graphql";

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
  async allUsers(): Promise<User[] | []> {
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
