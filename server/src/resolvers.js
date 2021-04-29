const { merge } = require("lodash");

const { breweryResolvers } = require("./schema/brewery");
const { dateResolvers } = require("./schema/date");
const { mutationResolvers } = require("./schema/mutation");
const { queryResolvers } = require("./schema/query");
const { userResolvers } = require("./schema/user");

module.exports = merge(
  queryResolvers,
  mutationResolvers,
  dateResolvers,
  userResolvers,
  breweryResolvers
);
