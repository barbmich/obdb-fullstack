const database = require("../data/data");

module.exports.User = `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    likes: [Brewery!]!
    createdAt: Date
  }
`;

module.exports.UserResponse = `
type UserResponse {
  id: ID!
  name: String!
  email: String!
  likes: [Brewery!]!
}`;

module.exports.LoginResponse = `
  type LoginResponse {
    accessToken: String
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
