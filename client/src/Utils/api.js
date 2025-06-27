import axios from "axios";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function handleTwitter(values) {
  try {
    const { query, count, searchType, dateFilter, dateRange, selectedAiModel } =
      values;
    if (!query) {
      throw new Error("Query is required");
    }

    if (!count) {
      throw new Error("Count is required");
    }

    if (!searchType) {
      throw new Error("SearchType is required");
    }
    let postUrl;

    if (searchType === "hashtag") {
      postUrl = `${VITE_BACKEND_URL}/analyze/twitter/hashtag`;
    } else if (searchType === "text") {
      postUrl = `${VITE_BACKEND_URL}/analyze/twitter/search`;
    } else if (searchType === "handle") {
      postUrl = `${VITE_BACKEND_URL}/analyze/twitter/handle`;
    } else {
      throw new Error("Invalid searchType");
    }

    const { data } = await axios.post(
      postUrl,
      {
        query,
        limit: count,
        searchType,
        dateFilter,
        dateRange,
        selectedAiModel: selectedAiModel || "gemeni",
      },
      { withCredentials: true }
    );

    if (!data) {
      throw new Error("No data received from server");
    }

    const { summary } = data;

    if (!summary) {
      throw new Error("No article received from server");
    }

    return summary;
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message || "Server error occurred");
    }
    throw error;
  }
}
export async function handleSubreddit(values) {
  const { subreddit, limit, sort, time } = values;
  const { data } = await axios.post(
    `${VITE_BACKEND_URL}/analyze/reddit/subreddit`,
    {
      subreddit,
      limit,
      sort,
      time,
    },
    { withCredentials: true }
  );
  return data.summary;
}
export async function signup(values) {
  // console.log(values);
  const URL = `${VITE_BACKEND_URL}/auth/signup`;

  try {
    const { data } = await axios.post(
      URL,
      {
        ...values,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error("something went wrong");
  }
}
export async function login(values) {
  const URL = `${VITE_BACKEND_URL}/auth/login`;
  try {
    const { data } = await axios.post(
      URL,
      {
        ...values,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error("something went wrong");
  }
}
export async function logout() {
  try {
    const data = await axios.post(
      `${VITE_BACKEND_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    const { status, message } = data;
    console.log(status, message);
    return data;
  } catch {
    throw new Error("something went wrong xxx");
  }
}
export async function isLoggedIn() {
  try {
    const URL = `${VITE_BACKEND_URL}/auth/verify`;
    await axios.get(URL, {
      withCredentials: true,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function getInfo() {
  try {
    console.log(VITE_BACKEND_URL);
    const URL = `${VITE_BACKEND_URL}/auth/info`;
    const response = await axios.get(URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error("something went wrong");
  }
}
export async function saveArticle({ articleId, savedValue = true }) {
  try {
    const response = await axios.post(
      `${VITE_BACKEND_URL}/auth/save`,
      {
        articleId,
        savedValue,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Failed to save article");
  }
}
export async function cancelSubscription() {
  try {
    const URL = `${VITE_BACKEND_URL}/subscribe/cancel-subscription`;
    const response = await axios.post(
      URL,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error("something went wrong");
  }
}
