const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (token) => {
  return jwt.verify(token, process.env.SECRET);
};
