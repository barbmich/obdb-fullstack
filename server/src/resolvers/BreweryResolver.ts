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
import { ITransformedBrewery } from "src/types/ITransformedBrewery";

@Resolver()
export class BreweryResolver {
  @Query(() => [Brewery])
  async getAllBreweries(
    @Ctx()
    { dataSources }: any
  ) {
    const allBreweries = await dataSources.breweryAPI.getAllBreweries();
    return allBreweries;
  }

  @Query(() => Brewery)
  async getSingleBrewery(
    @Arg("id", () => Int)
    id: number,
    @Ctx()
    { dataSources }: any
  ) {
    const brewery = await dataSources.breweryAPI.getSingleBrewery({ id });
    return brewery;
  }
}

@Resolver(() => Brewery)
export class BrewerySubFieldsResolver {
  @FieldResolver()
  address(@Root() brewery: ITransformedBrewery): Address {
    return {
      street: brewery.street,
      city: brewery.city,
      state: brewery.state,
      postalCode: brewery.postalCode,
      country: brewery.country,
    };
  }

  @FieldResolver()
  coordinates(@Root() brewery: ITransformedBrewery): Coordinates {
    return {
      longitude: brewery.longitude,
      latitude: brewery.latitude,
    };
  }

  @FieldResolver()
  contacts(@Root() brewery: ITransformedBrewery): Contacts {
    return {
      phone: brewery.phone,
      website: brewery.website,
    };
  }
}
