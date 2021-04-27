module.exports.Query = `
  type Query {
    breweries: [Brewery!]
    brewery(id: Int!): Brewery
    users: [User!]
    user(id: Int!): User
  }
`;

module.exports.queryResolvers = {
  Query: {
    users: (_, __, { dataSources }) => {
      return dataSources.userAPI.getAllUsers();
    },
    user: (_, { id }, { dataSources }) => {
      const user = dataSources.userAPI.getUser({ id });
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
};
