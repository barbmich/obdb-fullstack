const { Brewery, Address, Coordinates, Contacts } = require("./schema/brewery");
const { Date } = require("./schema/date");
const { Mutation } = require("./schema/mutation");
const { Query } = require("./schema/query");
const { User, UserResponse, LoginResponse } = require("./schema/user");

module.exports = [
  Query,
  Mutation,
  Date,
  User,
  UserResponse,
  LoginResponse,
  Brewery,
  Address,
  Coordinates,
  Contacts,
];
