import { DataSource } from "apollo-datasource";
import { ApolloError } from "apollo-server-core";
import { compare, hash } from "bcryptjs";
import { User } from "../entity/User";
import { IArgId, ILoginArgs, IRegisterArgs } from "src/types/IArgTypes";
import { Like } from "../entity/Like";
import { getConnection } from "typeorm";

interface ILikes {
  user_id: number;
  brewery_id: number;
}

interface IStars {
  user_id: number;
  brewery_id: number;
  stars: number;
}
export class UserAPI extends DataSource {
  async register({ name, email, password }: IRegisterArgs): Promise<User> {
    const user = await User.findOne({ email });
    if (user) throw new ApolloError("A user with this email already exists.");
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

  async revokeRefreshTokenForUser({ id }: IArgId): Promise<Boolean> {
    await getConnection()
      .getRepository(User)
      .increment({ id }, "tokenVersion", 1);
    return true;
  }

  async getUserLikes({ id }: IArgId): Promise<Like[]> {
    return Like.find({ where: { user: id } });
  }

  async addLike({ user_id, brewery_id }: ILikes): Promise<Boolean> {
    const user = await User.findOne(user_id);
    if (!user) throw new ApolloError("no user found");
    const entry = await Like.findOne({ where: { user, brewery_id } });
    if (!entry) {
      const newEntry = Like.create();
      newEntry.user = user;
      newEntry.brewery_id = brewery_id;
      newEntry.like = true;
      await newEntry.save();
      return true;
    }
    if (entry.like) return true;
    entry.like = true;
    await entry.save();
    return true;
  }

  async removeLike({ user_id, brewery_id }: ILikes): Promise<Boolean> {
    const user = await User.findOne(user_id);
    if (!user) throw new ApolloError("no user found");
    const entry = await Like.findOne({ where: { user, brewery_id } });
    if (!entry) return true;
    if (!entry.stars) return true;
    entry.like = false;
    await entry.save();
    return true;
  }

  async editStars({ user_id, brewery_id, stars }: IStars): Promise<Boolean> {
    const user = await User.findOne(user_id);
    if (!user) throw new ApolloError("no user found");
    const entry = await Like.findOne({ where: { user, brewery_id } });
    if (!entry) {
      const newEntry = Like.create();
      newEntry.user = user;
      newEntry.brewery_id = brewery_id;
      newEntry.stars = stars;
      await newEntry.save();
      return true;
    }
    if (entry.stars === stars) return true;
    entry.stars = stars;
    await entry.save();
    return true;
  }
}
