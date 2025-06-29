const { createHashtagURL, createSearchURL } = require("../utils/URL_generator");
const { getTweets, getTweetsOfHandle } = require("../src/tweetScrapper");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/User.js");
const Article = require("../models/Article.js");
const { getTwitterArticle } = require("../utils/utils.js");
// const User = require("../models/user.js");
module.exports.hashtag = async (req, res, next) => {
  try {
    const { query, limit, dateRange, selectedAiModel } = req.body;
    console.log(dateRange);
    console.log(selectedAiModel);

    if (!query) {
      throw new ExpressError(400, "Query is required");
    }

    if (!limit || limit < 1) {
      throw new ExpressError(400, "Valid limit is required");
    }

    if (limit > 50) {
      throw new ExpressError(400, "Limit cannot exceed 50");
    }

    if (query.includes(" ")) {
      throw new ExpressError(400, "hashtag not in format");
    }

    const { apiUsage, usageQuota } = req.user;

    if (apiUsage >= usageQuota) {
      throw new ExpressError(429, "API usage limit exceeded");
    }

    const search_URL = createHashtagURL(query, dateRange);

    const tweets = await getTweets(search_URL, limit);

    if (!tweets.length) {
      res.status(500).json({
        message: `No tweets found for this request`,
      });
      return;
    }

    const tempArticle = await getTwitterArticle(tweets, query, selectedAiModel);

    res.json({ summary: tempArticle });

    // Update API usage
    console.log("updating user...");

    await User.findByIdAndUpdate(req.user._id, { $inc: { apiUsage: 1 } });

    console.log("updated user");

    console.log("saving article...");

    // Create and save article to database
    const article = new Article({
      userId: req.user._id,
      content: tempArticle,
      search: {
        platform: "twitter",
        query: query,
      },
    });

    await article.save();

    console.log("saved article");
  } catch (error) {
    next(error);
  }
};

module.exports.search = async function (req, res, next) {
  try {
    const { query, limit, dateFilter, dateRange, selectedAiModel } = req.body;

    if (!query) {
      throw new ExpressError(400, "Query is required");
    }

    if (!limit || limit < 1) {
      throw new ExpressError(400, "Valid limit is required");
    }

    if (limit > 50) {
      throw new ExpressError(400, "Limit cannot exceed 50");
    }

    const { apiUsage, usageQuota } = req.user;

    if (apiUsage >= usageQuota) {
      throw new ExpressError(429, "API usage limit exceeded");
    }

    const search_URL = createSearchURL(query, dateRange);

    const tweets = await getTweets(search_URL, limit);

    if (!tweets.length) {
      res.status(500).json({
        message: `No tweets found for this request`,
      });
      return;
    }

    const tempArticle = await getTwitterArticle(tweets, query, selectedAiModel);

    res.json({ summary: tempArticle });

    // Update API usage
    console.log("updating user...");

    await User.findByIdAndUpdate(req.user._id, { $inc: { apiUsage: 1 } });

    console.log("updated user");

    console.log("saving article...");

    // Create and save article to database
    const article = new Article({
      userId: req.user._id,
      content: tempArticle,
      search: {
        platform: "twitter",
        query: query,
      },
    });

    await article.save();

    console.log("saved article");
  } catch (error) {
    next(error);
  }
};

module.exports.handle = async function (req, res, next) {
  try {
    const { query, limit, selectedAiModel } = req.body;
    if (!query) {
      throw new ExpressError(400, "Handle is required");
    }

    if (!limit || limit < 1) {
      throw new ExpressError(400, "Valid limit is required");
    }

    if (limit > 50) {
      throw new ExpressError(400, "Limit cannot exceed 50");
    }

    // if (query.includes(" ")) {
    //   throw new ExpressError(400, "hashtag not in format");
    // }

    const { apiUsage, usageQuota } = req.user;

    if (apiUsage >= usageQuota) {
      throw new ExpressError(429, "API usage limit exceeded");
    }
    const new_Query = query.split(" ").join("%20");
    const search_URL = `https://api.twitterapi.io/twitter/user/last_tweets?userName=${new_Query}`;

    const tweets = await getTweetsOfHandle(search_URL, limit);

    if (!tweets.length) {
      res.status(500).json({
        message: `No tweets found for this request`,
      });
      return;
    }

    const tempArticle = await getTwitterArticle(tweets, query, selectedAiModel);

    res.json({ summary: tempArticle });

    // Update API usage
    console.log("updating user...");

    await User.findByIdAndUpdate(req.user._id, { $inc: { apiUsage: 1 } });

    console.log("updated user");

    console.log("saving article...");

    // Create and save article to database
    const article = new Article({
      userId: req.user._id,
      content: tempArticle,
      search: {
        platform: "twitter",
        query: query,
      },
    });

    await article.save();

    console.log("saved article");
  } catch (error) {
    next(error);
  }
};
