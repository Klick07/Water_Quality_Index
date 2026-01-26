const jwt = require("jsonwebtoken");
const AppError = require("../error/AppError");

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.govUser = payload; // { sub, username }
    next();
  } catch (err) {
    next(new AppError("Invalid or expired token", 401));
  }
};
