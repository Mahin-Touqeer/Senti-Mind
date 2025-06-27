// Map human-readable time filters to Reddit API values
const timeFilterMap = {
  // Human-readable -> Reddit API value
  "last hour": "hour",
  today: "day",
  "this week": "week",
  "this month": "month",
  "this year": "year",
  "all time": "all",

  // Also support direct API values (for backwards compatibility)
  hour: "hour",
  day: "day",
  week: "week",
  month: "month",
  year: "year",
  all: "all",
};

// Reverse mapping for displaying human-readable names
const humanReadableMap = {
  hour: "last hour",
  day: "today",
  week: "this week",
  month: "this month",
  year: "this year",
  all: "all time",
};

function mapTimeFilterToApi(humanFilter) {
  if (!humanFilter) return "day"; // default

  const apiValue = timeFilterMap[humanFilter.toLowerCase()];
  if (!apiValue) {
    throw new Error(
      `Invalid time filter: ${humanFilter}. Supported filters: ${Object.keys(
        timeFilterMap
      ).join(", ")}`
    );
  }

  return apiValue;
}

function mapApiToHumanReadable(apiValue) {
  return humanReadableMap[apiValue] || apiValue;
}

function getValidTimeFilters() {
  return Object.keys(timeFilterMap).filter(
    (key) => !["hour", "day", "week", "month", "year", "all"].includes(key)
  );
}

module.exports = {
  mapTimeFilterToApi,
  mapApiToHumanReadable,
  getValidTimeFilters,
  timeFilterMap,
  humanReadableMap,
};
