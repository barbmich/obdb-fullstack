const database = require("../data");

module.exports.User = `
  type User {
    id: ID!
    name: String!
    email: String
    likes: [Brewery!]
    createdAt: Date
  }
`;

module.exports.userResolvers = {
  User: {
    async likes(parent, _, { dataSources }) {
      const ids = parent.likes;
      return dataSources.breweryAPI.getBreweriesById({ ids });
    },
  },
};
