const jwt = require("jsonwebtoken");
// might move this to the front-end, let the back-end provide all values no matter what
module.exports.createAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

module.exports.createRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};

module.exports.formatAddress = ({ city, state, postal_code }) => {
  const string = [city, state, postal_code]
    .filter((value) => value !== null)
    .join(", ");
  return string ? string : null;
};
