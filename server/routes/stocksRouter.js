const express = require("express");
const { getTweets } = require("../src/tweetScrapper");
const getResFromGemini = require("../services/getResFromGemini");
const router = express.Router({ mergeParams: true });

const MAX_TWEETS = 200;

const BASE_URL =
  "https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=Top&query=";
const API_KEY = process.env.STOCKS_API_KEY;

router.post("/stock-data", async (req, res, next) => {
  // get data
  const { stockName } = req.body;

  if (!stockName) {
    return res.status(400).json({ error: "Stock name is required" });
  }

  if (!/^[a-zA-Z0-9]+$/.test(stockName)) {
    return res
      .status(400)
      .json({ error: "Stock name can only contain letters and numbers" });
  }

  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const queryParams = `${stockName}%20since:${yesterday
    .toISOString()
    .slice(0, 10)}`;

  //create Search URL
  const search_URL = `${BASE_URL}${queryParams}`;

  // fetch tweets
  const tweets = await getTweets(search_URL, MAX_TWEETS, API_KEY);

  // analyze tweets
  const postivePercentage = await analyzeSentimentGemini(tweets);

  // return response
  return res.json({
    stockName,
    postivePercentage,
    totalTweets: tweets.length,
    tweets,
  });
});

async function analyzeSentimentGemini(tweets) {
  if (!tweets || !tweets.length) {
    return 0;
  }

  const prompt =
    `
    You are a sentiment analysis engine. 
    For each of the following tweets, respond with "positive" or "negative"
    Filter only those tweets that are relevant to stock market sentiment. 

    Eg: " Microsoft's new product launch is amazing! Stocks are going to soar!" -> positive and relevant                

    Return ONLY a JSON array like:
    {
        "sentiment": [
            "positive",
            "negative",
        ]
    }

    Tweets: ${JSON.stringify(tweets)}

    dont include any other text  
  ` + "dont include ```json and ``` in the response ";

  let text = await getResFromGemini(prompt);
  console.log("text: ", text);
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  const sentiments = JSON.parse(text);
  console.log("sentiments: ", sentiments);
  const positive = sentiments.sentiment.filter((s) => s === "positive").length;
  const total = sentiments.sentiment.length;
  const percentage = (positive / total) * 100;
  return percentage.toFixed(2);
}

module.exports = router;
