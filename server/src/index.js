const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const BreweryAPI = require("./datasources/brewery");
const { Query, queryResolvers } = require("./schema/query");
const { User, userResolvers } = require("./schema/user");
const {
  Brewery,
  Address,
  Coordinates,
  Contacts,
  breweryResolvers,
} = require("./schema/brewery");
const { Date, dateResolvers } = require("./schema/date");
const { merge } = require("lodash");

const schema = makeExecutableSchema({
  typeDefs: [Query, Date, User, Brewery, Address, Coordinates, Contacts],
  resolvers: merge(
    queryResolvers,
    dateResolvers,
    userResolvers,
    breweryResolvers
  ),
});

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    breweryAPI: new BreweryAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
