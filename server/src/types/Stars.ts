import { UserInputError } from "apollo-server-errors";
import { IsInt, Max, Min } from "class-validator";
import { GraphQLScalarType } from "graphql";
import { Field, InputType } from "type-graphql";

export type StarsType = 1 | 2 | 3 | 4 | 5;

const starsValue = (value: StarsType): StarsType | UserInputError => {
  if (
    !(value === 1 || value === 2 || value === 3 || value === 4 || value === 5)
  )
    throw new UserInputError("");
  return value;
};

@InputType()
export class StarsInput {
  @Field()
  @IsInt()
  brewery_id: number;

  @Field(() => StarsScalar)
  @IsInt()
  @Min(1)
  @Max(5)
  stars: StarsType;
}

export const StarsScalar = new GraphQLScalarType({
  name: "Stars",
  serialize: starsValue,
  parseValue: starsValue,
});
