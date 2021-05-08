import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./AuthResolver";
import { BreweryResolver, BrewerySubFieldsResolver } from "./BreweryResolver";
import { UserResolver, UserSubFieldsResolver } from "./UserResolver";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  UserSubFieldsResolver,
  BreweryResolver,
  BrewerySubFieldsResolver,
  AuthResolver,
];
