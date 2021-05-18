import { ArgsType, Field, Int } from "type-graphql";

export interface IArgId {
  id: number;
}

export interface IArgIds {
  ids: number[];
}

@ArgsType()
export class IRegisterArgs {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ArgsType()
export class ILoginArgs {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ArgsType()
export class IStars {
  @Field(() => Int)
  stars: number;
}
