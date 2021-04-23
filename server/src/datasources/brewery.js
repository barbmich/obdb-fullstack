const { RESTDataSource } = require("apollo-datasource-rest");

class BreweryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.openbrewerydb.org/";
  }

  // update to accept pagination and nr of breweries to display
  // by default it displays the first 20 breweries
  async getAllBreweries() {
    return this.get("breweries");
  }

  async getSingleBrewery({ id }) {
    return this.get(`breweries/${id}`);
  }

  getBreweriesById({ ids }) {
    return Promise.all(ids.map((id) => this.getSingleBrewery({ id })));
  }
}

module.exports = BreweryAPI;
