const BreweryAPI = require("../brewery");

const mocks = {
  get: jest.fn(),
};

const ds = new BreweryAPI();
ds.get = mocks.get;

afterEach(() => {
  jest.clearAllMocks();
});

describe("BreweryAPI.breweryReducer", () => {
  it("should properly transforms brewery", () => {
    expect(ds.breweryReducer(mockBreweryResponse)).toEqual(
      mockBreweryReducerResponse
    );
  });
});

describe("BreweryAPI.getAllBreweries", () => {
  it("should return list of breweries", async () => {
    mocks.get.mockReturnValueOnce([mockBreweryResponse]);
    const res = await ds.getAllBreweries();

    expect(mocks.get).toBeCalledWith("breweries");
    expect(res).toEqual([mockBreweryReducerResponse]);
  });
});

describe("BreweryAPI.getSingleBrewery", () => {
  it("should return the brewery requested", async () => {
    const id = 1;
    mocks.get.mockReturnValueOnce(mockBreweryResponse);
    const res = await ds.getSingleBrewery({ id });

    expect(mocks.get).toBeCalledWith(`breweries/${id}`);
    expect(res).toEqual(mockBreweryReducerResponse);
  });
});

describe("BreweryAPI.getBreweriesById", () => {
  it("should return list of breweries requested", async () => {
    const ids = [1, 2];
    const getSingleBrewery = ds.getSingleBrewery;
    ds.getSingleBrewery = jest.fn(() => ({ id: 1 }));
    const res = await ds.getBreweriesById({ ids });

    expect(res).toEqual([{ id: 1 }, { id: 1 }]);
    expect(ds.getSingleBrewery).toHaveBeenCalledTimes(2);
    ds.getSingleBrewery = getSingleBrewery;
  });
});

// raw response from API
const mockBreweryResponse = {
  id: 1,
  obdb_id: "brewery-mock-nr-1",
  name: "brewery mock nr 1",
  brewery_type: "micro",
  street: "123 Second Avenue",
  address_2: null,
  address_3: null,
  city: "Acme",
  state: "Colorado",
  county_province: null,
  postal_code: "90210",
  country: "United States",
  longitude: "-73.5673",
  latitude: "45.5017",
  phone: "0987654321",
  website_url: "barbmich.com",
  updated_at: "2018-08-24T00:00:00.000Z",
  created_at: "2018-07-24T00:00:00.000Z",
};

// response transformed by breweryReducer
const mockBreweryReducerResponse = {
  id: 1,
  name: "brewery mock nr 1",
  breweryType: "micro",
  street: "123 Second Avenue",
  city: "Acme",
  state: "Colorado",
  postalCode: "90210",
  country: "United States",
  longitude: "-73.5673",
  latitude: "45.5017",
  phone: "0987654321",
  website: "barbmich.com",
};

// response served by GraphQL
const mockBrewery = {
  id: 1,
  name: "brewery mock nr 1",
  breweryType: "micro",
  address: {
    street: "123 Second Avenue",
    city: "Acme",
    state: "Colorado",
    postalCode: "90210",
    country: "United States",
  },
  coordinates: {
    longitude: "-73.5673",
    latitude: "45.5017",
  },
  contacts: {
    phone: "0987654321",
    website: "barbmich.com",
  },
};
