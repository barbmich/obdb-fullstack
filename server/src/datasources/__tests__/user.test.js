const fs = require("fs");
const db = require("../../database/dbConnect");
const UserAPI = require("../user");

const userAPI = new UserAPI();

afterEach(async () => {
  const schema = fs.readFileSync(
    `${process.cwd()}/src/database/schema/schema.sql`,
    "utf-8"
  );
  await db.query(schema);
  const seeds = fs.readFileSync(
    `${process.cwd()}/src/database/seeds/seeds.sql`,
    "utf-8"
  );
  await db.query(seeds);
});

afterAll(async () => {
  db.end();
});

const mockedUser = {
  id: 1,
  name: "bob",
  email: "bob@example.com",
};

describe("UserAPI.getAllUsers", () => {
  it("should return a list of users", async () => {
    const res = await userAPI.getAllUsers();
    expect(res).toEqual([mockedUser]);
  });
});

describe("UserAPI.getUser", () => {
  it("should return the mocked user", async () => {
    const res = await userAPI.getUser({ id: 1 });
    expect(res).toEqual(mockedUser);
  });
});
describe("UserAPI.getUserByEmail", () => {
  it("should return the mocked user", async () => {
    const res = await userAPI.getUserByEmail({ email: "bob@example.com" });
    expect(res).toEqual(mockedUser);
  });
});

describe("UserAPI.getUserLikes", () => {
  it("should return a user likes", () => {});
});
