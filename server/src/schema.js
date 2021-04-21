const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String
    likes: [Brewery!]
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
    address_2: String
    address_3: String
    city: String
    county_province: String
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

  type Query {
    breweries: [Brewery]!
    brewery(id: Int!): Brewery!
    users: [User!]!
    user(id: Int!): User!
  }
`;

module.exports = typeDefs;
