const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const BreweryAPI = require("./datasources/brewery");
const UserAPI = require("./datasources/user");

const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    userAPI: new UserAPI(),
    breweryAPI: new BreweryAPI(),
  }),
  context: async ({ req, res }) => {
    return { req, res };
  },
  playground: {
    settings: {
      "schema.polling.enable": false,
    },
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.log(err));

module.exports = server;
