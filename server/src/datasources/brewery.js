const { RESTDataSource } = require("apollo-datasource-rest");

class BreweryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.openbrewerydb.org/";
  }

  // update to accept pagination and nr of breweries to display
  // by default it displays the first 20 breweries
  async getAllBreweries() {
    const res = await this.get("breweries");
    return res.map((brewery) => this.breweryReducer(brewery));
  }

  async getSingleBrewery({ id }) {
    const res = await this.get(`breweries/${id}`);
    return this.breweryReducer(res);
  }

  async getBreweriesById({ ids }) {
    const res = await Promise.all(
      ids.map((id) => this.getSingleBrewery({ id }))
    );
    return res;
  }

  // eases testing and refactors keys to pascalCase
  breweryReducer(brewery) {
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
