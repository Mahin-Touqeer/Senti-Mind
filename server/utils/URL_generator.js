function createSearchURL(query, dateRange) {
  const newQuery_01 = query.split(" ").join("%20");
  const newQuery_02 = `${newQuery_01}%20until%3A${dateRange.endDate}%20since%3A${dateRange.startDate}`;
  // const queryParams = new URLSearchParams({
  //   src: "typed_query",
  //   f: "top", // Default to top results
  //   time: Date.now(),
  // });
  const NEW_URL = `https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=Top&query=${newQuery_02}`;
  // const NEW_URL = `${BASE_URL}/search?q=${newQuery_02}&${queryParams.toString()}`;
  return NEW_URL;
}

function createHashtagURL(query, dateRange) {
  try {
    const newQuery_01 =
      query[0] === "#" ? `%23${query.slice(1)}` : `%23${query}`;

    let newQuery_02 = `${newQuery_01}%20until%3A${dateRange.endDate}%20since%3A${dateRange.startDate}`;
    if (dateRange.endDate === dateRange.startDate) {
      return `https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=Top&query=${newQuery_01}`;
    }
    // const queryParams = new URLSearchParams({
    //   src: "typed_query",
    //   f: "top", // Default to top results
    //   time: Date.now(),
    // });
    const NEW_URL = `https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=Top&query=${newQuery_01}`;
    // const NEW_URL = `${BASE_URL}/search?q=${newQuery_02}&${queryParams.toString()}`;
    return NEW_URL;
  } catch (err) {
    console.log("error creating url");
    console.log(err);
  }
}

module.exports = { createHashtagURL, createSearchURL };
