const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn.js");
const { analyzeRedditPosts } = require("../controllers/redditController.js");
const authorizeReddit = require("../middlewares/authorizeReddit.js");

const router = express.Router({ mergeParams: true });

// Reddit analysis endpoint
router.post("/subreddit", isLoggedIn, authorizeReddit, analyzeRedditPosts);

module.exports = router;
