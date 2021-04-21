const users = [
  {
    id: 1,
    name: "Fikayo Adepoju",
    email: "fik4christ@yahoo.com",
    likes: [1, 2],
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@company.com",
    likes: [1],
  },
  {
    id: 3,
    name: "Jane Paul",
    email: "jane@company.com",
    likes: [],
  },
];

const breweries = [
  {
    id: 1,
    name: "MadTree Brewing",
    brewery_type: "regional",
    street: "3301 Madison Rd",
    address_2: null,
    address_3: null,
    city: "Cincinnati",
    state: "Ohio",
    county_province: null,
    postal_code: "45209-1132",
    country: "United States",
    longitude: "-84.4239715",
    latitude: "39.1563725",
    phone: "5138368733",
    website_url: "http://www.madtreebrewing.com",
  },
  {
    id: 2,
    name: "Almanac Beer Company",
    brewery_type: "micro",
    street: "651B W Tower Ave",
    address_2: null,
    address_3: null,
    city: "Alameda",
    state: "California",
    county_province: null,
    postal_code: "94501-5047",
    country: "United States",
    longitude: "-122.306283180899",
    latitude: "37.7834497667258",
    phone: "4159326531",
    website_url: "http://almanacbeer.com",
  },
];

module.exports = database = {
  users,
  breweries,
};
