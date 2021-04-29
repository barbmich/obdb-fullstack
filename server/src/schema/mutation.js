const { ApolloError } = require("apollo-server-core");
const { compare } = require("bcryptjs");
const {
  createAccessToken,
  createRefreshToken,
  getUserId,
} = require("../utils/auth");

const Mutation = `
  type Mutation {
    login(email: String!, password: String!): LoginResponse
    register(name: String!, email: String!, password: String!): Boolean
    addLike(brewery_id: Int!): Boolean
    removeLike(brewery_id: Int!): Boolean
  }
`;

const mutationResolvers = {
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
      // console.log(newUser);
      // newUser.likes = [];
      // return newUser;
      return true;
    },
    login: async (_, { email, password }, { res, dataSources }) => {
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
    addLike: async (_, { brewery_id }, { req, dataSources }) => {
      const id = getUserId(req);
      if (!id) {
        throw new ApolloError("Not authenticated");
      }
      const add = await dataSources.userAPI.addLike({ id, brewery_id });
      if (!add) {
        throw new ApolloError("Error liking the brewery");
      }
      return true;
    },
    removeLike: async (_, { brewery_id }, { req, dataSources }) => {
      const id = getUserId(req);
      const remove = await dataSources.userAPI.removeLike({ id, brewery_id });
      if (!remove) {
        throw new ApolloError("Error removing like from brewery");
      }
      return true;
    },
  },
};

module.exports = {
  Mutation,
  mutationResolvers,
};
