const axios = require("axios");

const API_KEY = process.env.TWITTER_API_KEY; 

module.exports.getTweets = async function getTweets(search_URL, limit) {
  try {
    let totalTweets = [];
    let hasNextPage = true;
    let cursor = null;
    let page = 1;

    while (hasNextPage && totalTweets.length < limit) {
      console.log(search_URL);
      const url = cursor ? `${search_URL}&cursor=${cursor}` : search_URL;

      const response = await axios.get(url, {
        headers: {
          "X-API-Key": API_KEY,
        },
      });
      console.log(response.data);
      const { tweets = [], has_next_page, cursor: nextCursor } = response.data;

      totalTweets.push(...tweets);
      hasNextPage = has_next_page;
      cursor = nextCursor;

      console.log(
        `Fetched page ${page++}, total tweets: ${totalTweets.length}`
      );
    }

    totalTweets = totalTweets.map((tweet) => tweet.text);
    return totalTweets;
  } catch (error) {
    console.error("Failed to fetch tweets:", error.message);
    return [];
  }
};
module.exports.getTweetsOfHandle = async function getTweetsOfHandle(
  search_URL,
  limit
) {
  try {
    let totalTweets = [];
    let hasNextPage = true;
    let cursor = null;
    let page = 1;

    while (hasNextPage && totalTweets.length < limit) {
      console.log(search_URL);
      const url = cursor ? `${search_URL}&cursor=${cursor}` : search_URL;

      const response = await axios.get(url, {
        headers: {
          "X-API-Key": API_KEY,
        },
      });
      console.log(response.data);
      const { data, has_next_page, cursor: nextCursor } = response.data;
      console.log(data.tweets);
      const tweets = data.tweets;

      totalTweets.push(...tweets);
      hasNextPage = has_next_page;
      cursor = nextCursor;

      console.log(
        `Fetched page ${page++}, total tweets: ${totalTweets.length}`
      );
    }

    totalTweets = totalTweets.map((tweet) => tweet.text);
    return totalTweets;
  } catch (error) {
    console.error("Failed to fetch tweets:", error.message);
    return [];
  }
};
