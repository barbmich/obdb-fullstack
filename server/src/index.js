const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const { merge } = require("lodash");
const BreweryAPI = require("./datasources/brewery");
const UserAPI = require("./datasources/user");
const { Query, queryResolvers } = require("./schema/query");
const {
  User,
  userResolvers,
  UserResponse,
  LoginResponse,
} = require("./schema/user");
const {
  Brewery,
  Address,
  Coordinates,
  Contacts,
  breweryResolvers,
} = require("./schema/brewery");
const { Date, dateResolvers } = require("./schema/date");
const { Mutation, mutationResolvers } = require("./schema/mutation");

const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Mutation,
    Date,
    User,
    UserResponse,
    LoginResponse,
    Brewery,
    Address,
    Coordinates,
    Contacts,
  ],
  resolvers: merge(
    queryResolvers,
    mutationResolvers,
    dateResolvers,
    userResolvers,
    breweryResolvers
  ),
});

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    userAPI: new UserAPI(),
    breweryAPI: new BreweryAPI(),
  }),
  context: async ({ req }) => {
    // console.log(req.headers);
  },
  playground: {
    settings: {
      "schema.polling.enable": false,
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
