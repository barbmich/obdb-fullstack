const database = require("./data");

const resolvers = {
  Query: {
    users: () => {
      return database.users;
    },
    user: (_, { id }) => {
      const user = database.users.find((user) => user.id === id);
      return user;
    },
    breweries: () => {
      return database.breweries;
    },
    brewery: (_, { id }) => {
      const brewery = database.breweries.find((brewery) => brewery.id === id);
      return brewery;
    },
  },
  User: {
    likes(parent) {
      return database.breweries.filter((brewery) =>
        parent.likes.includes(brewery.id)
      );
    },
  },
  Brewery: {
    address(parent) {
      return {
        street: parent.street,
        address_2: parent.address_2,
        address_3: parent.address_3,
        city: parent.city,
        state: parent.state,
        county_province: parent.county_province,
        postal_code: parent.postal_code,
        country: parent.country,
      };
    },
    coordinates(parent) {
      return { longitude: parent.longitude, latitude: parent.latitude };
    },
    contacts(parent) {
      return { phone: parent.phone, website: parent.website_url };
    },
  },
};

module.exports = resolvers;
