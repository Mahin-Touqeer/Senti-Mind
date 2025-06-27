const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn.js");
const router = express.Router({ mergeParams: true });
const authorizeTwitter = require("../middlewares/authorizeTwitter.js");
const {
  hashtag,
  search,
  handle,
} = require("../controllers/twitterController.js");

// twitter
router.post("/hashtag", isLoggedIn, authorizeTwitter, hashtag);
router.post("/search", isLoggedIn, authorizeTwitter, search);
router.post("/handle", isLoggedIn, authorizeTwitter, handle);

module.exports = router;
