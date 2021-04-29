const User = `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    likes: [Brewery!]!
    createdAt: Date
  }
`;

const UserResponse = `
type UserResponse {
  id: ID!
  name: String!
  email: String!
  likes: [Brewery!]!
}`;

const LoginResponse = `
  type LoginResponse {
    accessToken: String
  }
`;

const userResolvers = {
  User: {
    async likes(parent, _, { dataSources }) {
      const ids = parent.likes;
      return dataSources.breweryAPI.getBreweriesById({ ids });
    },
  },
};

module.exports = {
  User,
  UserResponse,
  LoginResponse,
  userResolvers,
};
