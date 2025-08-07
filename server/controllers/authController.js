const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../utils/utils");
const ExpressError = require("../utils/ExpressError");
const { oauth2client } = require("../config/googleConfig.js");
const axios = require("axios");
const { sendVerificationEmail } = require("../config/emailConfig.js");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new ExpressError(400, "All fields are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ExpressError(400, "Invalid email format");
    }

    // Validate password strength
    if (password.length < 6) {
      throw new ExpressError(
        400,
        "Password must be at least 6 characters long"
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ExpressError(409, "Email already registered");
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hash,
    });

    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    });

    sendVerificationEmail(email, token);

    res.status(201).json({
      status: true,
      message: "Signed up successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      next(new ExpressError(409, "Email already registered"));
    } else {
      next(error);
    }
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ExpressError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ExpressError(401, "Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ExpressError(401, "Invalid email or password");
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    });

    res.json({
      status: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new ExpressError(400, "Not logged in");
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.json({
      status: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.googleAuthHandler = async function (req, res, next) {
  try {
    const { code } = req.body;
    const googleRes = await oauth2client.getToken(code);

    console.log(googleRes);

    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
      {
        headers: {
          Authorization: `Bearer ${googleRes.tokens.access_token}`,
        },
      }
    );

    const { email, name, picture } = userRes.data;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        email,
        username: name,
        password: process.env.GOOGLE_AUTH_PASSWORD,
        profilePicture: picture,
        verified_email: true,
      });
    }
    await User.findByIdAndUpdate(user._id, { verified_email: true });
    // Create JWT token
    const token = createSecretToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    });

    res.json({
      status: true,
      message: "Google authentication successful",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (!decoded.uid) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const user = await User.findByIdAndUpdate(
      decoded.uid,
      { verified_email: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.send("Email verified successfully");
  } catch (error) {
    console.error("Token verification error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Token expired" });
    }
    return res.status(400).json({ error: "Invalid token" });
  }
};
