const { createHashtagURL, createSearchURL } = require("../utils/URL_generator");
const getTweets = require("../src/tweetScrapper");
const ExpressError = require("../utils/ExpressError");

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

    // res.json({ summary: "This is a test summary" });

    const search_URL = createHashtagURL(query, dateRange);
    await getTweets(search_URL, limit, res, req, query, selectedAiModel);
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
    await getTweets(search_URL, limit, res, req, query);
  } catch (error) {
    next(error);
  }
};

module.exports.handle = async function (req, res, next) {
  try {
    const { query, limit } = req.body;

    if (!query) {
      throw new ExpressError(400, "Handle is required");
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

    const search_URL = `https://x.com/${query}?time=${Date.now()}`;
    await getTweets(search_URL, limit, res, req, query);
  } catch (error) {
    next(error);
  }
};
