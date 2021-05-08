import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Ijwt {
  @Field(() => String)
  accessToken: string;
}
