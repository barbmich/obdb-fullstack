const { ApolloError } = require("apollo-server-core");
const { compare } = require("bcryptjs");
const { createAccessToken, createRefreshToken } = require("../utils/utils");

module.exports.Mutation = `
  type Mutation {
    login(email: String!, password: String!): LoginResponse
    register(name: String!, email: String!, password: String!): Boolean
    addLike(id: Int!, brewery_id: Int!): Boolean
    removeLike(id: Int!, brewery_id: Int!): Boolean
  }
`;

module.exports.mutationResolvers = {
  Mutation: {
    register: async (_, { name, email, password }, { dataSources }) => {
      const existingUser = await dataSources.userAPI.getUserByEmail({ email });
      if (existingUser) {
        throw new ApolloError("A user with this email already exists.");
      }
      const newUser = await dataSources.userAPI.createUser({
        name,
        email,
        password,
      });
      newUser.likes = [];
      // return newUser;
      return true;
    },
    login: async (_, { email, password }, { req, res, dataSources }) => {
      const user = await dataSources.userAPI.getUserByEmail({ email });
      if (!user) {
        throw new ApolloError("Invalid credentials");
      }
      const validPassword = await compare(password, user.password);
      if (!validPassword) {
        throw new ApolloError("Invalid credentials");
      }

      res.cookie("refresh-token", createRefreshToken(user), {
        httpOnly: true,
      });
      return {
        accessToken: createAccessToken(user),
      };
    },
    addLike: async (_, { id, brewery_id }, { dataSources }) => {
      const add = await dataSources.userAPI.addLike({ id, brewery_id });
      if (!add) {
        throw new ApolloError("Error liking the brewery");
      }
      return true;
    },
    removeLike: async (_, { id, brewery_id }, { dataSources }) => {
      const remove = await dataSources.userAPI.removeLike({ id, brewery_id });
      if (!remove) {
        throw new ApolloError("Error removing like from brewery");
      }
      return true;
    },
  },
};
