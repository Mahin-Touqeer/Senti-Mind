const fetchRedditPosts = require("../src/redditScrapper");
const { getRedditSummary } = require("../utils/utils");
const User = require("../models/User");
const Article = require("../models/Article");
// const ExpressError = require("../utils/ExpressError");

const analyzeRedditPosts = async (req, res, next) => {
  try {
    const { subreddit, limit = 10, sort = "hot", mappedTimeFilter } = req.body;
    // Use the mapped time filter from authorization middleware
    const timeFilter = mappedTimeFilter || "day";

    // Fetch Reddit posts using the API-compatible time filter
    const dataArr = await fetchRedditPosts(subreddit, sort, {
      limit,
      time: timeFilter, // This is now the API-compatible value
    });

    const postSet = new Set();

    dataArr.forEach((post) => {
      if (post && post.title) {
        postSet.add(post.title);
        if (post.text && post.text.trim()) {
          postSet.add(post.text);
        }
      }
    });

    if (!postSet.size) {
      res.json({
        summary: `No posts found for this request from r/${subreddit} \n (Need not worry! This request will not be counted as used)`,
      });
      return;
    }

    const summary = await getRedditSummary(Array.from(postSet), subreddit);
    res.json({ summary });

    // Update API usage
    console.log("updating user...");
    await User.findByIdAndUpdate(req.user._id, { $inc: { apiUsage: 1 } });
    console.log("updated user");
    console.log("saving article...");

    // Create and save article to database
    const article = new Article({
      userId: req.user._id,
      content: summary,
      search: {
        platform: "reddit",
        query: `r/${subreddit}`,
        sort: sort,
        limit: limit,
        timeFilter: timeFilter, // Store the API value
      },
    });

    await article.save();
    console.log("saved article");
  } catch (error) {
    console.error("Error in analyzeRedditPosts:", error);
    next(error);
  }
};

module.exports = {
  analyzeRedditPosts,
};
