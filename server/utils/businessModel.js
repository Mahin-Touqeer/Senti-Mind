module.exports.twitterPlans = {
  free: {
    maxTweets: 30,
    exports: false,
    dateFilters: ["today", "this week"],
    searchType: ["hashtag"],
    aiModel: ["gemeni"],
  },
  basic: {
    maxTweets: 75,
    exports: true,
    dateFilters: ["today", "this week", "this month", "custom"],
    searchType: ["hashtag", "text", "handle"],
    aiModel: ["gemeni", "sonar"],
  },
  pro: {
    maxTweets: 120,
    exports: true,
    dateFilters: ["today", "this week", "this month", "custom"],
    searchType: ["hashtag", "text", "handle"],
    aiModel: ["gemeni", "sonar", "sonar-reasoning", "sonar-reasoning-pro"],
  },
  ultra: {
    maxTweets: 200,
    exports: true,
    dateFilters: ["today", "this week", "this month", "custom"],
    searchType: ["hashtag", "text", "handle"],
    aiModel: [
      "gemeni",
      "sonar",
      "sonar-reasoning",
      "sonar-reasoning-pro",
      "r1-1776",
    ],
  },
};
module.exports.redditPlans = {
  free: {
    maxPosts: 60,
    exports: false,
    dateFilters: ["last hour", "today"],
    sort: ["hot", "new"],
    aiModel: ["gemini"],
  },
  basic: {
    maxPosts: 120,
    exports: true,
    dateFilters: ["last hour", "today", "last week", "this month"],
    sort: ["hot", "new", "rising", "top", "controversial", "best"],
    aiModel: ["gemeni", "sonar"],
  },
  pro: {
    maxPosts: 200,
    exports: true,
    dateFilters: [
      "last hour",
      "today",
      "last week",
      "this month",
      "this year",
      "all time",
    ],
    sort: ["hot", "new", "rising", "top", "controversial", "best"],
    aiModel: ["gemeni", "sonar", "sonar-reasoning", "sonar-reasoning-pro"],
  },
  ultra: {
    maxPosts: 300,
    exports: true,
    dateFilters: [
      "last hour",
      "today",
      "last week",
      "this month",
      "this year",
      "all time",
    ],
    sort: ["hot", "new", "rising", "top", "controversial", "best"],
    aiModel: [
      "gemeni",
      "sonar",
      "sonar-reasoning",
      "sonar-reasoning-pro",
      "r1-1776",
    ],
  },
};
module.exports.commonPlans = {
  basic: 100,
  pro: 180,
  ultra: 250,
};
