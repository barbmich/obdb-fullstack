const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    name: String!
    email: String
    likes: [Brewery!]
    createdAt: Date
  }

  type Brewery {
    id: ID!
    name: String!
    brewery_type: String
    address: Address
    coordinates: Coordinates
    contacts: Contacts
  }

  type Address {
    street: String
    city: String
    state: String
    postal_code: String
    country: String
  }

  type Coordinates {
    longitude: String
    latitude: String
  }

  type Contacts {
    phone: String
    website_url: String
  }

  # type Response

  type Query {
    breweries: [Brewery]!
    brewery(id: Int!): Brewery!
    users: [User!]!
    user(id: Int!): User!
  }
`;

module.exports = typeDefs;
