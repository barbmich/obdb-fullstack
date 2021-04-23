module.exports.Brewery = `
  type Brewery {
    id: ID!
    name: String!
    brewery_type: String
    address: Address
    coordinates: Coordinates
    contacts: Contacts
  }
`;

module.exports.Address = `
  type Address {
    street: String
    city: String
    state: String
    postal_code: String
    country: String
  }
`;

module.exports.Coordinates = `
  type Coordinates {
    longitude: String
    latitude: String
  }
`;

module.exports.Contacts = `
  type Contacts {
    phone: String
    website_url: String
  }
`;

module.exports.breweryResolvers = {
  Brewery: {
    address(parent) {
      return {
        street: parent.street,
        city: parent.city,
        state: parent.state,
        postal_code: parent.postal_code,
        country: parent.country,
      };
    },
    coordinates(parent) {
      return { longitude: parent.longitude, latitude: parent.latitude };
    },
    contacts(parent) {
      return { phone: parent.phone, website: parent.website_url };
    },
  },
};
