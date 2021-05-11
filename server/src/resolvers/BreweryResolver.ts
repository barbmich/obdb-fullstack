import { Address, Brewery, Contacts, Coordinates } from "../types/Brewery";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { MyContext } from "src/types/Context";

@Resolver()
export class BreweryResolver {
  @Query(() => [Brewery])
  async getAllBreweries(
    @Ctx()
    { dataSources }: MyContext
  ) {
    const allBreweries = await dataSources.breweryAPI.getAllBreweries();
    return allBreweries;
  }

  @Query(() => Brewery)
  async getSingleBrewery(
    @Arg("id", () => Int)
    id: number,
    @Ctx()
    { dataSources }: MyContext
  ) {
    const brewery = await dataSources.breweryAPI.getSingleBrewery({ id });
    return brewery;
  }
}

@Resolver(() => Brewery)
export class BrewerySubFieldsResolver {
  @FieldResolver()
  address(@Root() brewery: Brewery): Address {
    return brewery.address;
  }

  @FieldResolver()
  coordinates(@Root() brewery: Brewery): Coordinates {
    return brewery.coordinates;
  }

  @FieldResolver()
  contacts(@Root() brewery: Brewery): Contacts {
    return brewery.contacts;
  }
}
