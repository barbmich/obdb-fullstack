import { RESTDataSource } from "apollo-datasource-rest";
import { Brewery } from "src/entity/Brewery";

interface IArgsId {
  id: number;
}

interface IArgsIds {
  ids: number[];
}

interface IFetchedBrewery {
  id: number;
  name: string;
  brewery_type: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
}

interface ITransformedBrewery {
  id: number;
  name: string;
  breweryType: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website: string | null;
}

class BreweryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.openbrewerydb.org/";
  }
  // update to accept pagination and nr of breweries to display
  // by default it displays the first 20 breweries
  async getAllBreweries(): Promise<Brewery[]> {
    const res = await this.get("breweries");
    return res.map((brewery: IFetchedBrewery) => this.breweryReducer(brewery));
  }

  async getSingleBrewery({ id }: IArgsId): Promise<ITransformedBrewery> {
    const res = await this.get(`breweries/${id}`);
    return this.breweryReducer(res);
  }

  async getBreweriesById({ ids }: IArgsIds): Promise<ITransformedBrewery[]> {
    const res = await Promise.all(
      ids.map((id) => this.getSingleBrewery({ id }))
    );
    return res;
  }

  // eases testing and refactors keys to pascalCase
  breweryReducer(brewery: IFetchedBrewery): ITransformedBrewery {
    return {
      id: brewery.id,
      name: brewery.name,
      breweryType: brewery.brewery_type,
      street: brewery.street,
      city: brewery.city,
      state: brewery.state,
      postalCode: brewery.postal_code,
      country: brewery.country,
      longitude: brewery.longitude,
      latitude: brewery.latitude,
      phone: brewery.phone,
      website: brewery.website_url,
    };
  }
}

module.exports = BreweryAPI;
