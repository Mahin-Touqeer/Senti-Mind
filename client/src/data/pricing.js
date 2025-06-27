export default [
  {
    plan: "FREE",
    price: 0,
    maxTweets: 30,
    maxRedditPosts: 60,
    MaxRequests: 10,
    export: false,
    filter: {
      twitter: ["Today", "This Week"],
      reddit: [],
      custom: false,
    },
    Ai: {
      sonar: false,
      sonarReasoning: false,
      sonarReasoningPro: false,
    },
  },
  {
    plan: "BASIC",
    price: 9,
    maxTweets: 75,
    maxRedditPosts: 120,
    MaxRequests: 100,
    export: true,
    filter: {
      twitter: ["Today", "This Week", "This month"],
      reddit: ["Last hour", "Today", "Last week"],
      custom: false,
    },
    searchType: {
      twitter: ["hashtag", "search", "handle"],
      reddit: ["hot", "new", "rising", "top", "controversial", "best"],
    },
    Ai: {
      sonar: true,
      sonarReasoning: false,
      sonarReasoningPro: true,
      DeepSeekR1: false,
    },
  },
  {
    plan: "PRO",
    price: 19,
    maxTweets: 150,
    maxRedditPosts: 240,
    MaxRequests: 250,
    export: true,
    filter: {
      twitter: ["Today", "This Week", "This month"],
      reddit: ["Last hour", "Today", "Last week"],
      custom: true,
    },
    searchType: {
      twitter: ["hashtag", "search", "handle"],
      reddit: ["hot", "new", "rising", "top", "controversial", "best"],
    },
    Ai: {
      sonar: true,
      sonarReasoning: true,
      sonarReasoningPro: true,
      DeepSeekR1: false,
    },
  },
  {
    plan: "ULTRA",
    price: 39,
    maxTweets: 300,
    maxRedditPosts: 480,
    MaxRequests: 250,
    export: true,
    filter: {
      twitter: ["Today", "This Week", "This month"],
      reddit: ["Last hour", "Today", "Last week"],
      custom: true,
    },
    searchType: {
      twitter: ["hashtag", "search", "handle"],
      reddit: ["hot", "new", "rising", "top", "controversial", "best"],
    },
    Ai: {
      sonar: true,
      sonarReasoning: true,
      sonarReasoningPro: true,
      DeepSeekR1: true,
    },
  },
];
