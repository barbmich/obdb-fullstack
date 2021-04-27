const { ApolloError } = require("apollo-server-core");
const { sign, verify } = require("jsonwebtoken");

module.exports.createAccessToken = (user) => {
  return sign({ userId: user.id }, process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

module.exports.createRefreshToken = (user) => {
  return sign({ userId: user.id }, process.env.JWT_SECRET_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};

module.exports.getUserId = (req) => {
  try {
    const authorization = req.headers["authorization"];
    if (authorization) {
      const token = authorization.split(" ")[1];
      const user = verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
      return user.userId;
    }
    return;
  } catch (err) {
    throw new ApolloError("Not authenticated");
  }
};
