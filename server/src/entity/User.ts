import { Brewery } from "../types/Brewery";
import { Ctx, Field, ID, ObjectType, Root } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Like } from "./Like";
import { MyContext } from "src/types/Context";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field(() => [Brewery], { nullable: true })
  @OneToMany(() => Like, (like) => like.user)
  async favorites(
    @Root() user: User,
    @Ctx() { dataSources }: MyContext
  ): Promise<Brewery[]> {
    const likes = await dataSources.userAPI.getUserLikes({ id: user.id });
    const ids = likes.map((like: Like) => like.brewery_id);
    return dataSources.breweryAPI.getBreweriesByIds({ ids });
  }

  @Column()
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;
}
