require("dotenv").config();
const getResFromGemini = require("../services/getResFromGemini");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ExpressError = require("./ExpressError");
const getResFromPerplexity = require("../services/getResFromPerplexity");

async function getTwitterArticle(tweets, tag, model = "gemeni") {
  if (!tweets || !Array.isArray(tweets)) {
    throw new ExpressError(400, "Invalid tweets data provided");
  }

  const prompt = `Write a article (not the summary) of the main topics, sentiments, and any notable events or discussions in detail of releavant information in the following ${
    tweets.length
  } tweets about ${tag}. Divide the article in 2 parts. The first part is the "Quick Insight" part where directly list the main topics, sentiments, and any notable events or discussions releavant information without your analysis or explanation, the second part is the Article part where you write a proper journalist friendy article (you have to strictly only return the content that I told you to make without talking to me). The tweets are:\n\n${tweets.join(
    "\n\n"
  )}`;

  try {
    let response;
    if (model === "gemeni") {
      response = await getResFromGemini(prompt);
    } else {
      response = await getResFromPerplexity(prompt, model);
    }
    if (!response) {
      throw new ExpressError(500, "Failed to generate summary");
    }
    return response;
  } catch (error) {
    console.error("API error:", error.message);
    throw new ExpressError(500, "Error generating summary");
  }
}

function createSecretToken(uid) {
  if (!uid) {
    throw new ExpressError(400, "User ID is required");
  }
  try {
    return jwt.sign({ uid }, process.env.TOKEN_KEY, { expiresIn: "24h" });
  } catch (error) {
    throw new ExpressError(500, "Error generating token");
  }
}

// async function isLoggedIn(req, res, next) {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       throw new ExpressError(401, "Authentication required");
//     }

//     const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
//     if (!decoded.uid) {
//       throw new ExpressError(401, "Invalid token");
//     }

//     const user = await User.findById(decoded.uid);
//     if (!user) {
//       throw new ExpressError(401, "User not found");
//     }

//     // Add user to request object for use in subsequent middleware
//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === "JsonWebTokenError") {
//       next(new ExpressError(401, "Invalid token"));
//     } else if (error.name === "TokenExpiredError") {
//       next(new ExpressError(401, "Token expired"));
//     } else {
//       next(error);
//     }
//   }
// }

async function getRedditSummary(posts, subreddit) {
  if (!posts || !Array.isArray(posts)) {
    throw new ExpressError(400, "Invalid posts data provided");
  }

  if (!subreddit) {
    throw new ExpressError(400, "Subreddit information is required");
  }

  // Format posts for better AI processing
  const formattedPosts = posts.map((post, index) => {
    if (typeof post === "string") {
      return `Post ${index + 1}: ${post}`;
    }

    // If post is an object with title and text
    if (typeof post === "object" && post.title) {
      let formatted = `Post ${index + 1} - Title: ${post.title}`;
      if (post.text && post.text.trim()) {
        formatted += `\nContent: ${post.text}`;
      }
      return formatted;
    }

    return `Post ${index + 1}: ${post}`;
  });

  const prompt = `Write a comprehensive article analyzing the discussions and content from the Reddit community r/${subreddit}. 
Based on the following ${
    posts.length
  } posts from r/${subreddit}, Divide the article in 2 parts. The first part is the "Quick Insight" part where directly list the main topics, sentiments, and any notable events or discussions releavant information without your analysis or explanation, the second part is the Article part where you write a proper journalist friendy article that covers:1. Main topics 
2. Community sentiment and opinions
3. Notable discussions, debates, or trending topics
5. Any significant events or news being discussed
(you have to strictly only return the content that I told you to make without talking to me).
Please structure the article in a professional format with proper headings and provide in-depth analysis rather than just a summary. The length should not matter. If there are more releavant info then all of them should be present. What matters is the content. 
Reddit Posts from r/${subreddit}:

${formattedPosts.join("\n\n")}

Return only the article content in proper format:`;

  try {
    const response = await getResFromGemini(prompt);
    if (!response) {
      throw new ExpressError(500, "Failed to generate Reddit summary");
    }
    return response;
  } catch (error) {
    console.error("Gemini API error for Reddit summary:", error.message);
    throw new ExpressError(500, "Error generating Reddit summary");
  }
}

module.exports = {
  getTwitterArticle,
  createSecretToken,
  getRedditSummary,
};
