const { twitterPlans } = require("../utils/businessModel");
const ExpressError = require("../utils/ExpressError");

module.exports = async function authorizeTwitter(req, res, next) {
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
    const { query, limit, searchType, selectedAiModel, dateFilter } = req.body;

    // Get current plan configuration
    const currentPlan = twitterPlans[subscriptionTier];
    if (!currentPlan) {
      return res.status(400).json({
        error: "Invalid subscription tier",
      });
    }

    const {
      maxTweets,
      searchType: allowedSearchTypes,
      aiModel: allowedAiModels,
      dateFilters: allowedDateFilters,
    } = currentPlan;

    // Extract route endpoint (hashtag, search, handle)
    const currentEndpoint = req.url.split("/").pop().split("?")[0]; // Remove query params if any

    // Validation checks
    const validationErrors = [];

    // 1. Check tweet limit
    if (limit && limit > maxTweets) {
      validationErrors.push(
        `Tweet limit exceeded. Your ${subscriptionTier} plan allows maximum ${maxTweets} tweets, but you requested ${limit}`
      );
    }

    // 2. Check search type authorization based on route
    const routeToSearchTypeMap = {
      hashtag: "hashtag",
      text: "text",
      handle: "handle",
    };

    const requiredSearchType = routeToSearchTypeMap[currentEndpoint];
    if (
      requiredSearchType &&
      !allowedSearchTypes.includes(requiredSearchType)
    ) {
      validationErrors.push(
        `Search type '${requiredSearchType}' not available in your ${subscriptionTier} plan. Available types: ${allowedSearchTypes.join(
          ", "
        )}`
      );
    }

    // 3. Check AI model authorization
    if (selectedAiModel) {
      // Map display names back to internal values
      const aiModelMap = {
        Gemini: "gemeni",
        Sonar: "sonar",
        "Sonar reasoning": "sonar-reasoning",
        "Sonar reasoning pro": "sonar-reasoning-pro",
        DeepSeek: "deepSeek",
      };

      const internalModelName =
        aiModelMap[selectedAiModel] || selectedAiModel.toLowerCase();

      if (!allowedAiModels.includes(internalModelName)) {
        validationErrors.push(
          `AI model '${selectedAiModel}' not available in your ${subscriptionTier} plan. Available models: ${allowedAiModels.join(
            ", "
          )}`
        );
      }
    }

    // 4. Check date filter authorization
    if (dateFilter && !allowedDateFilters.includes(dateFilter)) {
      validationErrors.push(
        `Date filter '${dateFilter}' not available in your ${subscriptionTier} plan. Available filters: ${allowedDateFilters.join(
          ", "
        )}`
      );
    }

    // 5. Basic input validation
    if (!query || query.trim().length === 0) {
      validationErrors.push("Search query is required");
    }

    if (limit && (limit < 5 || limit > 200)) {
      validationErrors.push("Tweet limit must be between 5 and 200");
    }

    // If there are validation errors, return them
    if (validationErrors.length > 0) {
      return res.status(403).json({
        error: "Authorization failed",
        details: validationErrors,
        currentPlan: {
          tier: subscriptionTier,
          maxTweets,
          allowedSearchTypes,
          allowedAiModels,
          allowedDateFilters,
        },
      });
    }

    // Add plan info to request for use in route handlers
    req.planInfo = {
      tier: subscriptionTier,
      maxTweets,
      allowedSearchTypes,
      allowedAiModels,
      allowedDateFilters,
      hasExports: currentPlan.exports,
    };

    // All checks passed, proceed to next middleware/route
    next();
  } catch (error) {
    console.error("Authorization middleware error:", error);
    next(error);
  }
};
