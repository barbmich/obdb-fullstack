const { dateScalar } = require("../scalars/scalars");

module.exports.Date = `
  scalar Date
`;

module.exports.dateResolvers = {
  Date: dateScalar,
};
