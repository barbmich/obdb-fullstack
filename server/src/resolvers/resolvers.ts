import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./AuthResolver";
import { BreweryResolver, BrewerySubFieldsResolver } from "./BreweryResolver";
import { UserResolver } from "./UserResolver";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  BreweryResolver,
  BrewerySubFieldsResolver,
  AuthResolver,
];
