const snoowrap = require("snoowrap");
const ExpressError = require("../utils/ExpressError");

// Validate environment variables
if (
  !process.env.REDDIT_USER_AGENT ||
  !process.env.REDDIT_CLIENT_ID ||
  !process.env.REDDIT_CLIENT_SECRET ||
  !process.env.REDDIT_USERNAME ||
  !process.env.REDDIT_PASSWORD
) {
  throw new Error(
    "Missing required Reddit API credentials in environment variables"
  );
}

const redditClient = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

async function fetchRedditPosts(subreddit, sort, filter = {}) {
  console.log("came here");
  try {
    if (!subreddit) {
      throw new ExpressError(400, "Subreddit is required");
    }

    const { limit = 10, time } = filter;
    if (limit < 1 || limit > 300) {
      throw new ExpressError(400, "Limit must be between 1 and 300");
    }

    const subredditObj = redditClient.getSubreddit(subreddit);
    const method = getInfo(subredditObj, limit, sort, time);
    if (!method) {
      throw new ExpressError(400, `Unsupported sort type: ${sort}`);
    }

    const posts = await method();
    if (!posts || posts.length === 0) {
      throw new ExpressError(404, `No posts found in r/${subreddit}`);
    }

    return posts
      .map((post) => {
        try {
          return {
            id: post.id,
            title: post.title,
            text: post.is_self ? post.selftext : null,
            author: post.author?.name || "[deleted]",
            score: post.score,
            comments: post.num_comments,
            link: `https://reddit.com${post.permalink}`,
            created_utc: post.created_utc,
            url: post.url, // Added URL for link posts
            subreddit: post.subreddit.display_name, // Added subreddit name
          };
        } catch (err) {
          console.error(`Error processing post ${post.id}:`, err);
          return null;
        }
      })
      .filter(Boolean);
  } catch (error) {
    if (error instanceof ExpressError) {
      throw error;
    }

    if (error.statusCode === 404) {
      throw new ExpressError(404, `Subreddit '${subreddit}' not found`);
    }

    if (error.statusCode === 403) {
      throw new ExpressError(
        403,
        `Access to subreddit '${subreddit}' is forbidden`
      );
    }

    if (error.statusCode === 429) {
      throw new ExpressError(
        429,
        "Rate limit exceeded. Please try again later"
      );
    }

    console.error("Reddit API Error:", error);
    throw new ExpressError(500, "Failed to fetch Reddit posts");
  }
}

function getInfo(subredditObj, limit, sort, time) {
  const validSorts = ["hot", "new", "rising", "top", "controversial", "best"];
  const validTimes = ["hour", "day", "week", "month", "year", "all"];

  if (sort && !validSorts.includes(sort)) {
    throw new ExpressError(
      400,
      `Invalid sort type. Must be one of: ${validSorts.join(", ")}`
    );
  }

  if (time && !validTimes.includes(time)) {
    throw new ExpressError(
      400,
      `Invalid time filter. Must be one of: ${validTimes.join(", ")}`
    );
  }

  switch (sort) {
    case "hot":
      return () => subredditObj.getHot({ amount: limit });
    case "new":
      return () => subredditObj.getNew({ amount: limit });
    case "rising":
      return () => subredditObj.getRising({ amount: limit });
    case "top":
      return () => subredditObj.getTop({ amount: limit, t: time || "day" });
    case "controversial":
      return () =>
        subredditObj.getControversial({ amount: limit, t: time || "day" });
    case "best":
      return () => subredditObj.getBest({ amount: limit, t: time || "day" });
    default:
      return () => subredditObj.getHot({ limit });
  }
}

module.exports = fetchRedditPosts;
