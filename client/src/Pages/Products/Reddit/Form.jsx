import { useForm } from "react-hook-form";
import { redditPlans as plans } from "../../../Utils/businessModel";

function Form2({ handleSubmission, subscriptionTier, isMutating }) {
  const { register, handleSubmit } = useForm();

  const currentPlan = plans[subscriptionTier] || plans.free;

  function onSubmit(data) {
    handleSubmission(data);
  }

  const isSortAvailaible = (sortType) => {
    return currentPlan.sort.includes(sortType);
  };

  const isDateFilterAvailable = (filterKey) => {
    return currentPlan.dateFilters.includes(filterKey);
  };
  return (
    <form
      className="lg:w-2/5 w-full p-6 bg-mber-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Enter a subreddit to analyze</h1>

      {/* Query Input  */}
      <>
        <input
          type="text"
          className="bg-[#2D283C] rounded-xl w-full p-4 my-2 outline-0"
          placeholder='Elections2025 or "climate policy"'
          name="subreddit"
          {...register("subreddit")}
          required
          disabled={isMutating}
        />
        <button
          className="w-full p-3 rounded-3xl analyzeBtn"
          type="submit"
          disabled={isMutating}
          style={{
            backgroundColor: `${isMutating ? "#6E11B0" : "#9810FA"}`,
            cursor: "pointer",
          }}
        >
          {isMutating ? "Analyzing..." : "Analyze"}
        </button>
      </>

      {/* Coming soon search Type  */}
      <>
        <h1 className="mt-4">Search type</h1>
        <div className="w-full bg-[#2D283C] p-1 rounded-xl text-center searchTypeDiv">
          <input
            type="radio"
            name="searchType"
            id="hashtag"
            value="hashtag"
            defaultChecked
            hidden
            disabled={isMutating}
          />
          <label
            htmlFor="hashtag"
            className="inline-block w-55/100  rounded-xl py-4 labelForHashtag"
          >
            # Search by subreddit
          </label>

          <div
            htmlFor="text"
            className="inline-block w-45/100 rounded-xl py-4 opacity-70"
          >
            coming soon . . .
          </div>
        </div>
      </>

      {/* Number of posts  */}
      <>
        <h1 className="mt-8 ">Number of posts to analyze</h1>
        <input
          type="number"
          className="bg-[#2D283C] rounded-xl w-full p-4 my-2 outline-0"
          placeholder={`Enter number (max ${currentPlan.maxPosts})`}
          name="limit"
          min="10"
          max={currentPlan.maxPosts}
          {...register("limit")}
          disabled={isMutating}
        />
        <div className="text-sm text-gray-400 mt-1">
          Your {subscriptionTier} plan allows up to {currentPlan.maxPosts}{" "}
          tweets
        </div>
      </>

      {/* Sort  */}
      <>
        <h1 className="mt-8">Sort Posts By</h1>
        <div className="mydict">
          <div>
            <label style={{ width: "30%" }}>
              <input
                type="radio"
                name="sort"
                value="hot"
                {...register("sort")}
                disabled={!isSortAvailaible("hot") || isMutating}
                defaultChecked
              />
              <span
                style={{
                  borderRadius: "0.375em 0 0 0",
                  opacity: isSortAvailaible("hot") && !isMutating ? 1 : 0.5,
                  cursor:
                    isSortAvailaible("hot") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                HOT
              </span>
            </label>
            <label style={{ width: "35%" }}>
              <input
                type="radio"
                name="sort"
                value="new"
                disabled={!isSortAvailaible("new") || isMutating}
                {...register("sort")}
              />
              <span
                style={{
                  opacity: isSortAvailaible("new") && !isMutating ? 1 : 0.5,
                  cursor:
                    isSortAvailaible("new") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                NEW
              </span>
            </label>
            <label style={{ width: "35%" }}>
              <input
                type="radio"
                disabled={!isSortAvailaible("rising") || isMutating}
                name="sort"
                value="rising"
                {...register("sort")}
              />
              <span
                style={{
                  borderRadius: "0 0.375em 0 0",
                  opacity: isSortAvailaible("rising") && !isMutating ? 1 : 0.5,
                  cursor:
                    isSortAvailaible("rising") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                RISING
              </span>
            </label>
          </div>
        </div>
        <div className="mydict">
          <div className="!mt-0">
            <label style={{ width: "50%" }}>
              <input
                type="radio"
                name="sort"
                disabled={!isSortAvailaible("top") || isMutating}
                value="top"
                {...register("sort")}
              />
              <span
                style={{
                  borderRadius: "0 0 0 0.375em",
                  padding: "0.75em 0em",
                  opacity: isSortAvailaible("top") && !isMutating ? 1 : 0.5,
                  cursor:
                    isSortAvailaible("top") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                TOP
              </span>
            </label>
            <label style={{ width: "50%" }}>
              <input
                type="radio"
                name="sort"
                value="bset"
                disabled={!isSortAvailaible("best") || isMutating}
                {...register("sort")}
              />
              <span
                style={{
                  borderRadius: "0 0 0.375em 0",
                  padding: "0.75em 0em",
                  opacity: isSortAvailaible("best") && !isMutating ? 1 : 0.5,
                  cursor:
                    isSortAvailaible("best") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                BEST
              </span>
            </label>
          </div>
        </div>
      </>

      {/* Filter  */}
      <>
        <h1 className="mt-8 ">Filter posts by</h1>
        <div className="mydict">
          <div>
            <label style={{ width: "30%" }}>
              <input
                type="radio"
                name="time"
                value="last hour"
                {...register("time")}
                disabled={!isDateFilterAvailable("last hour") || isMutating}
                defaultChecked
              />
              <span
                style={{
                  borderRadius: "0.375em 0 0 0",
                  opacity:
                    isDateFilterAvailable("last hour") && !isMutating ? 1 : 0.5,
                  cursor:
                    isDateFilterAvailable("last hour") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                Last hour
              </span>
            </label>
            <label style={{ width: "35%" }}>
              <input
                type="radio"
                name="time"
                value="today"
                {...register("time")}
                disabled={!isDateFilterAvailable("today") || isMutating}
              />
              <span
                style={{
                  opacity:
                    isDateFilterAvailable("today") && !isMutating ? 1 : 0.5,
                  cursor:
                    isDateFilterAvailable("today") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                Today
              </span>
            </label>
            <label style={{ width: "35%" }}>
              <input
                type="radio"
                name="time"
                value="this week"
                {...register("time")}
                disabled={!isDateFilterAvailable("last week") || isMutating}
              />
              <span
                style={{
                  borderRadius: "0 0.375em 0 0",
                  opacity:
                    isDateFilterAvailable("last week") && !isMutating ? 1 : 0.5,
                  cursor:
                    isDateFilterAvailable("last week") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                This week
              </span>
            </label>
          </div>
        </div>
        <div className="mydict">
          <div className="!mt-0">
            <label style={{ width: "30%" }}>
              <input
                type="radio"
                name="time"
                value="this month"
                {...register("time")}
                disabled={!isDateFilterAvailable("this month") || isMutating}
              />
              <span
                style={{
                  borderRadius: "0 0 0 0.375em",
                  padding: "0.75em 0em",
                  opacity:
                    isDateFilterAvailable("this month") && !isMutating
                      ? 1
                      : 0.5,
                  cursor:
                    isDateFilterAvailable("this month") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                This month
              </span>
            </label>
            <label style={{ width: "35%" }}>
              <input
                type="radio"
                name="time"
                value="this year"
                {...register("time")}
                disabled={!isDateFilterAvailable("this year") || isMutating}
              />
              <span
                style={{
                  opacity:
                    isDateFilterAvailable("this year") && !isMutating ? 1 : 0.5,
                  cursor:
                    isDateFilterAvailable("this year") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                This Year
              </span>
            </label>
            <label style={{ width: "35%" }}>
              <input
                type="radio"
                name="time"
                value="all time"
                {...register("time")}
                disabled={!isDateFilterAvailable("all time") || isMutating}
              />
              <span
                style={{
                  borderRadius: "0 0 0.375em 0",
                  opacity:
                    isDateFilterAvailable("all time") && !isMutating ? 1 : 0.5,
                  cursor:
                    isDateFilterAvailable("all time") && !isMutating
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                All time
              </span>
            </label>
          </div>
        </div>
      </>
    </form>
  );
}

export default Form2;
