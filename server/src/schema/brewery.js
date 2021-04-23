const Brewery = `
  type Brewery {
    id: ID!
    name: String!
    brewery_type: String
    address: Address
    coordinates: Coordinates
    contacts: Contacts
  }
`;

const Address = `
  type Address {
    street: String
    city: String
    state: String
    postal_code: String
    country: String
  }
`;

const Coordinates = `
  type Coordinates {
    longitude: String
    latitude: String
  }
`;

const Contacts = `
  type Contacts {
    phone: String
    website_url: String
  }
`;

const breweryResolvers = {
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

module.exports = { Brewery, Address, Coordinates, Contacts, breweryResolvers };
