const { redditPlans } = require("../utils/businessModel");
const ExpressError = require("../utils/ExpressError");
const { mapTimeFilterToApi } = require("../utils/timeFilterMapper");

module.exports = async function authorizeReddit(req, res, next) {
  try {
    if (!req.user.verified_email) {
      throw new ExpressError(400, "Email verification required");
    }
    const { subscription } = req.user;

    if (!subscription || !subscription.subscriptionTier) {
      return res.status(401).json({
        error: "No valid subscription found",
      });
    }

    const { subscriptionTier } = subscription;
    const { subreddit, limit, sort, selectedAiModel, time } = req.body;

    // Get current plan configuration
    const currentPlan = redditPlans[subscriptionTier];

    if (!currentPlan) {
      return res.status(400).json({
        error: "Invalid subscription tier",
      });
    }

    const {
      maxPosts,
      sort: allowedSortTypes,
      aiModel: allowedAiModels,
      dateFilters: allowedDateFilters,
    } = currentPlan;

    // Validation checks
    const validationErrors = [];

    // 1. Check post limit
    if (limit && limit > maxPosts) {
      validationErrors.push(
        `Post limit exceeded. Your ${subscriptionTier} plan allows maximum ${maxPosts} posts, but you requested ${limit}`
      );
    }

    // 2. Check sort type authorization
    if (sort && !allowedSortTypes.includes(sort)) {
      validationErrors.push(
        `Sort type '${sort}' not available in your ${subscriptionTier} plan. Available types: ${allowedSortTypes.join(
          ", "
        )}`
      );
    }

    // 3. Check AI model authorization
    if (selectedAiModel) {
      // const aiModelMap = {
      //   Gemini: "gemini",
      //   Sonar: "sonar",
      //   "Sonar reasoning": "sonar-reasoning",
      //   "Sonar reasoning pro": "sonar-reasoning-pro",
      //   DeepSeek: "deepSeek",
      // };

      const internalModelName = selectedAiModel;

      if (!allowedAiModels.includes(internalModelName)) {
        validationErrors.push(
          `AI model '${selectedAiModel}' not available in your ${subscriptionTier} plan. Available models: ${allowedAiModels.join(
            ", "
          )}`
        );
      }
    }

    // 4. Check date filter authorization and map to API value
    let mappedTimeFilter = null;
    if (time) {
      // Check if the human-readable time filter is allowed in the plan
      if (!allowedDateFilters.includes(time)) {
        validationErrors.push(
          `Time filter '${time}' not available in your ${subscriptionTier} plan. Available filters: ${allowedDateFilters.join(
            ", "
          )}`
        );
      } else {
        try {
          // Map human-readable to API value
          mappedTimeFilter = mapTimeFilterToApi(time);
        } catch (error) {
          validationErrors.push(error.message);
        }
      }
    }

    // 5. Basic input validation
    if (!subreddit || subreddit.trim().length === 0) {
      validationErrors.push("Subreddit is required");
    }

    if (limit && (limit < 5 || limit > 300)) {
      validationErrors.push("Post limit must be between 5 and 300");
    }

    if (subreddit && !/^[a-zA-Z0-9_]+$/.test(subreddit.trim())) {
      validationErrors.push(
        "Invalid subreddit format. Use only letters, numbers, and underscores"
      );
    }

    // If there are validation errors, return them
    if (validationErrors.length > 0) {
      return res.status(403).json({
        error: "Authorization failed",
        details: validationErrors,
        currentPlan: {
          tier: subscriptionTier,
          maxPosts,
          allowedSortTypes,
          allowedAiModels,
          allowedDateFilters,
        },
      });
    }

    // Add plan info and mapped time filter to request
    req.planInfo = {
      tier: subscriptionTier,
      maxPosts,
      allowedSortTypes,
      allowedAiModels,
      allowedDateFilters,
      hasExports: currentPlan.exports,
    };

    // Add the mapped time filter to the request body for the scraper
    if (mappedTimeFilter) {
      req.body.mappedTimeFilter = mappedTimeFilter;
    }

    next();
  } catch (error) {
    next(error);
    // console.error("Reddit authorization middleware error:", error);
    // return res.status(500).json({
    //   error: "Internal server error during authorization",
    // });
  }
};
