module.exports.Query = `
  type Query {
    breweries: [Brewery]!
    brewery(id: Int!): Brewery!
    users: [User]!
    user(id: Int!): User!
  }
`;
