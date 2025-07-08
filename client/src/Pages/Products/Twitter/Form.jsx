import { useForm } from "react-hook-form";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./dateRange.css";
import { ChevronDown } from "lucide-react";
import { startOfMonth, format, addDays } from "date-fns";
import { twitterPlans } from "../../../Utils/businessModel";

const dateFilterMap = {
  today: "today",
  week: "this week",
  month: "this month",
  custom: "custom",
};
const aiModelDisplayNames = {
  gemeni: "Gemini",
  sonar: "Sonar",
  "sonar-reasoning": "Sonar reasoning",
  "sonar-reasoning-pro": "Sonar reasoning pro",
  "r1-1776": "DeepSeek",
};
function Form({
  handleSubmission,
  isMutating,
  subscriptionTier,
  showDatePicker,
  setShowDatePicker,
}) {
  const { register, handleSubmit } = useForm();
  const [dateRange, setDateRange] = useState([
    {
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
      key: "selection",
    },
  ]);

  const [selectedDateOption, setSelectedDateOption] = useState("today");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState("gemeni");

  // Get current plan configuration
  const currentPlan = twitterPlans[subscriptionTier] || twitterPlans.free;

  // Get all AI models with availability status
  const allAiModels = Object.keys(aiModelDisplayNames).map((model) => ({
    value: model,
    display: aiModelDisplayNames[model],
    available: currentPlan.aiModel.includes(model),
  }));

  function onSubmit(data) {
    const formData = {
      ...data,
      dateRange: {
        startDate: format(dateRange[0].startDate, "yyyy-MM-dd"),
        endDate: format(dateRange[0].endDate, "yyyy-MM-dd"),
      },
      selectedAiModel: selectedAiModel,
      dateFilter: dateFilterMap[selectedDateOption],
    };
    console.log(formData);
    handleSubmission(formData);
  }

  const handleDateOptionChange = (option) => {
    // Check if this date filter is allowed for current plan
    console.log(option);
    if (currentPlan.dateFilters.includes(dateFilterMap[option])) {
      setSelectedDateOption(option);
      setShowDatePicker(option === "custom");

      // Update date range based on selected option
      const today = new Date();
      switch (option) {
        case "today":
          setDateRange([
            {
              startDate: today,
              endDate: today,
              key: "selection",
            },
          ]);
          break;
        case "week":
          setDateRange([
            {
              startDate: addDays(today, -7),
              endDate: today,
              key: "selection",
            },
          ]);
          break;
        case "month":
          setDateRange([
            {
              startDate: startOfMonth(today),
              endDate: today,
              key: "selection",
            },
          ]);
          break;
        default:
          break;
      }
    }
  };

  const handleSelect = (option) => {
    setSelectedAiModel(option);
    setIsOpen(false);
  };

  // Check if search type is available for current plan
  const isSearchTypeAvailable = (searchType) => {
    return currentPlan.searchType.includes(searchType);
  };

  // Check if date filter is available for current plan
  const isDateFilterAvailable = (filterKey) => {
    return currentPlan.dateFilters.includes(dateFilterMap[filterKey]);
  };

  return (
    <>
      <form
        className="lg:w-2/5 w-full py-6 px-2 lg:px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Query Input  */}
        <>
          <h1>Enter a hashtag or keyword to analyze</h1>
          <input
            type="text"
            className="bg-[#2D283C] rounded-xl w-full p-4 my-2 outline-0"
            placeholder='Elections2025 or "climate policy"'
            name="query"
            {...register("query")}
            disabled={isMutating}
          />
          <button
            className={`w-full p-3 rounded-3xl duration-200 bg-[#9810FA] ${
              isMutating
                ? "cursor-not-allowed bg- "
                : "  hover:bg-[#6E11B0] cursor-pointer"
            } `}
            type="submit"
            disabled={isMutating}
          >
            {isMutating ? "Analyzing..." : "Analyze"}
          </button>
        </>

        {/* Search Type  */}
        <>
          <h1 className="mt-8 ">Search type</h1>
          <div className="w-full bg-[#2D283C] p-1 rounded-xl text-center searchTypeDiv">
            <input
              type="radio"
              name="searchType"
              id="hashtag"
              value="hashtag"
              defaultChecked
              hidden
              {...register("searchType")}
              disabled={isMutating}
            />
            <label
              htmlFor="hashtag"
              className="inline-block w-1/2 rounded-xl py-4 labelForHashtag"
              twitter-label={isMutating && "kill"}
            >
              # Search by Hashtag
              {!isSearchTypeAvailable("text") && (
                <span className="text-xs block text-gray-400 opacity-0">
                  Upgrade to unlock
                </span>
              )}
            </label>

            <input
              type="radio"
              name="searchType"
              id="text"
              hidden
              value="text"
              {...register("searchType")}
              disabled={isMutating || !isSearchTypeAvailable("text")}
            />
            <label
              htmlFor="text"
              className="inline-block w-1/2 rounded-xl py-4 labelForText"
              twitter-label={
                (!isSearchTypeAvailable("text") || isMutating) && "kill"
              }
            >
              Aa Search by Text
              {!isSearchTypeAvailable("text") && (
                <span className="text-xs block text-gray-400">
                  Upgrade to unlock
                </span>
              )}
            </label>

            <input
              type="radio"
              name="searchType"
              id="handle"
              hidden
              value="handle"
              {...register("searchType")}
              disabled={isMutating || !isSearchTypeAvailable("handle")}
            />
            <label
              htmlFor="handle"
              className="inline-block w-full mt-2 rounded-xl py-4 labelForHandle"
              status={!isSearchTypeAvailable("handle") ? "kill" : "live"}
              twitter-label={
                (!isSearchTypeAvailable("handle") || isMutating) && "kill"
              }
            >
              @ Search via twitter handle
              {!isSearchTypeAvailable("handle") && (
                <span className="text-xs block text-gray-400">
                  Upgrade to unlock
                </span>
              )}
            </label>
          </div>
        </>

        {/* Ai Model Selection  */}
        <>
          <div>
            <label className="block text-white font-medium mt-4 mb-2">
              Select AI Model
            </label>
            <div className="relative alink">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#2D283C] bg-opacity-80 border border-gray-600 rounded-2xl px-4 py-3 text-left text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all flex items-center justify-between hover:bg-[#2D283C]/90 hover:bg-opacity-80 cursor-pointer"
                disabled={isMutating}
              >
                <span className="text-md">
                  {aiModelDisplayNames[selectedAiModel] || "Choose a model..."}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#2D283C] bg-opacity-90 border border-gray-600 rounded-2xl shadow-xl z-10 overflow-hidden backdrop-blur-sm">
                  {allAiModels.map((model, index) => (
                    <button
                      type="button"
                      key={model.value}
                      onClick={() =>
                        model.available && handleSelect(model.value)
                      }
                      disabled={!model.available}
                      className={`w-full px-4 py-3 text-left text-white transition-all duration-150 ${
                        index !== allAiModels.length - 1
                          ? "border-b border-gray-600"
                          : ""
                      } ${
                        selectedAiModel === model.display
                          ? "bg-purple-600 bg-opacity-30"
                          : ""
                      } ${
                        model.available
                          ? "hover:bg-purple-600 hover:bg-opacity-50 cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{model.display}</span>
                        {!model.available && (
                          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                            Upgrade to unlock
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>

        {/* Enter number of tweets  */}
        <>
          <h1 className="mt-8 ">Number of tweets to analyze</h1>
          <input
            type="number"
            className="bg-[#2D283C] rounded-xl w-full p-4 my-2 outline-0"
            placeholder={`Enter number (max ${currentPlan.maxTweets})`}
            name="count"
            min="5"
            max={currentPlan.maxTweets}
            {...register("count")}
            disabled={isMutating}
          />
          <div className="text-sm text-gray-400 mt-1">
            Your {subscriptionTier} plan allows up to {currentPlan.maxTweets}{" "}
            tweets
          </div>
        </>

        {/* Filter posts  */}
        <>
          <h1 className="mt-8 mb-2">Filter posts by</h1>
          <div className="mydict">
            <div>
              <label
                style={{
                  width: "30%",
                  // opacity: isDateFilterAvailable("today") ? 1 : 0.5,
                }}
              >
                <input
                  type="radio"
                  name="dateFilter"
                  value=" "
                  checked={selectedDateOption === "today"}
                  onChange={() => handleDateOptionChange("today")}
                  disabled={!isDateFilterAvailable("today") || isMutating}
                />
                <span
                  style={{ borderRadius: "0.375em 0 0 0" }}
                  twitter-label={isMutating && "kill"}
                >
                  Today
                </span>
              </label>
              <label
                style={{
                  width: "35%",
                  opacity: isDateFilterAvailable("week") ? 1 : 0.5,
                }}
              >
                <input
                  type="radio"
                  name="dateFilter"
                  value="week"
                  checked={selectedDateOption === "week"}
                  onChange={() => handleDateOptionChange("week")}
                  disabled={!isDateFilterAvailable("week") || isMutating}
                />
                <span twitter-label={isMutating && "kill"}>This week</span>
              </label>
              <label
                style={{
                  width: "35%",
                  opacity: isDateFilterAvailable("month") ? 1 : 0.5,
                }}
              >
                <input
                  type="radio"
                  name="dateFilter"
                  value="month"
                  checked={selectedDateOption === "month"}
                  onChange={() => handleDateOptionChange("month")}
                  disabled={!isDateFilterAvailable("month") || isMutating}
                />
                <span
                  style={{ borderRadius: "0 0.375em  0 0" }}
                  twitter-label={isMutating && "kill"}
                >
                  This month
                </span>
              </label>
            </div>
          </div>
          <div className="mydict">
            <div>
              <label
                style={{
                  width: "100%",
                  opacity: isDateFilterAvailable("custom") ? 1 : 0.5,
                }}
              >
                <input
                  type="radio"
                  name="dateFilter"
                  value="custom"
                  checked={selectedDateOption === "custom"}
                  onChange={() => handleDateOptionChange("custom")}
                  disabled={!isDateFilterAvailable("custom") || isMutating}
                />
                <span
                  style={{ borderRadius: "0 0 0.375em 0.375em " }}
                  twitter-label={isMutating && "kill"}
                >
                  Custom Range
                  {!isDateFilterAvailable("custom") && (
                    <div className="text-xs block border-0 text-gray-400">
                      Upgrade to unlock
                    </div>
                  )}
                </span>
              </label>
            </div>
          </div>
          {showDatePicker && isDateFilterAvailable("custom") && (
            <div className="date-range-wrapper">
              <DateRange
                editableDateInputs={false}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                maxDate={new Date()}
                rangeColors={["#9810FA"]}
              />
            </div>
          )}
        </>

        {/* Plan indicator */}
        <div className="mt-4 p-3 bg-gray-800 rounded-lg text-sm">
          <div className="flex justify-between items-center">
            <span>
              Current plan:{" "}
              <strong className="capitalize">{subscriptionTier}</strong>
            </span>
            {currentPlan.exports && (
              <span className="text-green-400">✓ Exports enabled</span>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
