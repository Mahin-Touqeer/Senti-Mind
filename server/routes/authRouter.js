const express = require("express");
const jwt = require("jsonwebtoken");
// const WrapAsync = require("../utils/WrapAsync");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const Article = require("../models/Article");
const { sendVerificationEmail } = require("../config/emailConfig.js");
const User = require("../models/User.js");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/google", authController.googleAuthHandler);
router.post("/logout", authController.logout);
router.get(
  "/verify",
  async (req, res, next) => {
    try {
      const token = req.cookies.token;
      req.auth_token = token;
      if (!token) {
        res.json({ isAuthenticated: false });
        return;
      }

      const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
      if (!decoded.uid) {
        return res.json({ isAuthenticated: false });
      }

      const user = await User.findById(decoded.uid);
      if (!user) {
        return res.json({ isAuthenticated: false });
      }
      next();
    } catch (err) {
      next(err);
    }
  },
  (req, res) => {
    res.json({ isAuthenticated: true, message: "verified" });
  }
);

router.get("/info", isLoggedIn, async (req, res) => {
  const {
    apiUsage,
    usageQuota,
    username,
    email,
    subscription,
    _id,
    profilePicture,
    verified_email,
  } = req.user;
  // Get all articles for this user
  const reversedArticles = await Article.find({ userId: _id });
  const articles = reversedArticles.reverse();

  const transactions = await require("../models/Transaction").find({
    userId: _id,
  });

  const modifiedTransactions = transactions
    .map((transaction) => {
      return {
        plan: transaction.plan,
        status: transaction.status,
        createdAt: transaction.createdAt,
        amount: transaction.amount,
        countryCode: transaction.countryCode,
      };
    })
    .reverse();

  res.json({
    apiUsage,
    usageQuota,
    username,
    email,
    subscription,
    profilePicture,
    articles,
    verified_email,
    modifiedTransactions,
  });
});

router.post("/save", isLoggedIn, async (req, res) => {
  try {
    const { articleId, savedValue = true } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { saved: savedValue },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({
      message: "Article saved successfully",
      article: updatedArticle,
    });
  } catch (err) {
    console.error("Error saving article:", err);
    res.status(500).json({ error: "Failed to save article" });
  }
});

router.get("/verify-email", authController.verifyEmail);
router.get("/send-email-token", isLoggedIn, (req, res) => {
  try {
    const { email } = req.user;
    const token = req.auth_token;

    if (!email) {
      return res.status(400).json({ error: "Email not found in user data" });
    }

    if (!token) {
      return res.status(400).json({ error: "Authentication token not found" });
    }

    sendVerificationEmail(email, token);

    res.json({
      message: "Verification email sent successfully",
      email: email,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ error: "Failed to send verification email" });
  }
});

module.exports = router;
