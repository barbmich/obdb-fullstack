const database = require("./data");
const { dateScalar } = require("./scalars");

const resolvers = {
  Query: {
    users: () => {
      return database.users;
    },
    user: (_, { id }) => {
      const user = database.users.find((user) => user.id === id);
      return user;
    },
    breweries: async (_, __, { dataSources }) => {
      const allBreweries = await dataSources.breweryAPI.getAllBreweries();
      return allBreweries;
    },
    brewery: async (_, { id }, { dataSources }) => {
      const brewery = await dataSources.breweryAPI.getSingleBrewery({ id });
      return brewery;
    },
  },

  Date: dateScalar,
};

module.exports = resolvers;
