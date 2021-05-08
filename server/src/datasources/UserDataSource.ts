import { DataSource } from "apollo-datasource";
import { ApolloError } from "apollo-server-core";
import { compare, hash } from "bcryptjs";
import { User } from "../entity/User";
import { IArgId, ILoginArgs, IRegisterArgs } from "src/types/IArg";
import { Like } from "../entity/Like";

export class UserAPI extends DataSource {
  async register({ name, email, password }: IRegisterArgs): Promise<User> {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw new ApolloError("A user with this email already exists.");
    const hashedPassword = await hash(password, 10);
    const newUser = User.create({ name, email, password: hashedPassword });
    await newUser.save();
    return newUser;
  }

  async login({ email, password }: ILoginArgs): Promise<User> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApolloError("Invalid credentials");
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new ApolloError("Invalid credentials");
    }
    return user;
  }

  async getUserLikes({ id }: IArgId): Promise<Like[]> {
    return Like.find({ where: { user: id } });
  }

  async addLike({
    id,
    brewery_id,
  }: {
    id: number;
    brewery_id: number;
  }): Promise<Boolean> {
    const user = await User.findOne(id);
    if (!user) throw new ApolloError("no user found");
    const isLiked = await Like.find({ where: { user: user, brewery_id } });
    if (isLiked.length) return true;
    const like = Like.create();
    like.user = user;
    like.brewery_id = brewery_id;
    await like.save();
    return true;
  }

  async removeLike({
    id,
    brewery_id,
  }: {
    id: number;
    brewery_id: number;
  }): Promise<Boolean> {
    const user = await User.findOne(id);
    if (!user) throw new ApolloError("no user found");
    const isLiked = await Like.find({ where: { user: user, brewery_id } });
    if (!isLiked.length) return true;
    await Like.remove(isLiked);
    return true;
  }
}
