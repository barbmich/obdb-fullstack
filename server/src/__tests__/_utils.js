const { HttpLink } = require("apollo-link-http");
const BreweryAPI = require("../datasources/brewery");
const UserAPI = require("../datasources/user");
const typeDefs = require("../typedefs");
const resolvers = require("../resolvers");
const { execute } = require("apollo-link");

exports.constructTestServer = () => {
  const userAPI = new UserAPI();
  const breweryAPI = new BreweryAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ userAPI, breweryAPI }),
    context: () => ({ user: { id: 1, email: "bob@example.com" } }),
  });

  return { server, userAPI, breweryAPI };
};

exports.startTestServer = async (server) => {
  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch,
  });

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  };
};
