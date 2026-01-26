const jwt = require("jsonwebtoken");

exports.signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m"
  });
};
