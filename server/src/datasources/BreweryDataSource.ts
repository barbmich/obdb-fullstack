import { RESTDataSource } from "apollo-datasource-rest";
import { Brewery } from "../types/Brewery";
import { IArgId, IArgIds } from "src/types/IArgTypes";
import { IFetchedBrewery } from "src/types/IFetchedBrewery";
import { Like } from "../entity/Like";
import { ApolloError } from "apollo-server-errors";
export class BreweryAPI extends RESTDataSource {
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

  async getSingleBrewery({ id }: IArgId): Promise<Brewery> {
    let res = null;
    try {
      res = await this.get(`breweries/${id}`);
    } catch (error) {
      throw new ApolloError(error.extensions.response.body.message);
    }
    return this.breweryReducer(res);
  }

  async getBreweriesByIds({ ids }: IArgIds): Promise<Brewery[]> {
    const breweries = await Promise.allSettled(
      ids.map((id) => this.getSingleBrewery({ id }))
    );
    const filteredBreweries = breweries
      .filter((id) => id.status === "fulfilled")
      .map((id: any) => id.value) as Brewery[];
    return filteredBreweries;
  }

  async getBreweryLikes({ id }: IArgId): Promise<number> {
    return Like.count({ where: { brewery_id: id } });
  }

  async getBreweryStars({ id }: IArgId): Promise<number | undefined> {
    const starsList = await Like.createQueryBuilder()
      .where("brewery_id = :id", { id })
      .getMany();
    const notNullStarsListLength = starsList.filter(
      (id) => id.stars !== null
    ).length;
    if (!notNullStarsListLength) return undefined;
    const average =
      starsList.map((id) => id.stars).reduce((acc, curr) => acc + curr) /
      notNullStarsListLength;
    return Number(average.toFixed(2));
  }

  // eases testing and refactors keys to pascalCase
  async breweryReducer(brewery: IFetchedBrewery): Promise<Brewery> {
    const likes = await this.getBreweryLikes({ id: brewery.id });
    const stars = await this.getBreweryStars({ id: brewery.id });
    return {
      id: brewery.id,
      slug: brewery.obdb_id,
      name: brewery.name,
      breweryType: brewery.brewery_type,
      address: {
        street: brewery.street,
        city: brewery.city,
        state: brewery.state,
        postalCode: brewery.postal_code,
        country: brewery.country,
      },
      coordinates: {
        longitude: brewery.longitude,
        latitude: brewery.latitude,
      },
      contacts: {
        phone: brewery.phone,
        website: brewery.website_url,
      },
      likes,
      stars,
    };
  }
}
