import { Brewery } from "../types/Brewery";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Like } from "./Like";

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

  @Column()
  password: string;

  @Field(() => [Brewery], { nullable: true })
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @Column("int", { default: 0 })
  tokenVersion: number;
}
