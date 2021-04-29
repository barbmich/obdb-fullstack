const { dateScalar } = require("../scalars/scalars");

exports.Date = `
  scalar Date
`;

exports.dateResolvers = {
  Date: dateScalar,
};
