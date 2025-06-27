const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ExpressError = require("../utils/ExpressError");

async function isLoggedIn(req, res, next) {
  try {
    const token = req.cookies.token;
    req.auth_token = token;
    if (!token) {
      throw new ExpressError(401, "Authentication required");
    }

    const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
    if (!decoded.uid) {
      throw new ExpressError(401, "Invalid token");
    }

    const user = await User.findById(decoded.uid);
    if (!user) {
      throw new ExpressError(401, "User not found");
    }

    // Add user to request object for use in subsequent middleware
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new ExpressError(401, "Invalid token"));
    } else if (error.name === "TokenExpiredError") {
      next(new ExpressError(401, "Token expired"));
    } else {
      next(error);
    }
  }
}
module.exports.isLoggedIn = isLoggedIn;
