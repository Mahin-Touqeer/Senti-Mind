const express = require("express");
const router = express.Router({ mergeParams: true });
const Razorpay = require("razorpay");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const ExpressError = require("../utils/ExpressError");
const crypto = require("crypto");
const { commonPlans } = require("../utils/businessModel.js");
const { sendSubscriptionStartEmail } = require("../config/emailConfig.js");

// Environment variables validation
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay credentials are not properly configured");
}

const planIds = {
  IN: {
    basic: {
      planId: "plan_Qm9DYOJjnwo8jq",
      amount: 199,
    },
    pro: {
      planId: "plan_Qm9ED6EWd6Mdb5",
      amount: 449,
    },
    ultra: {
      planId: "plan_Qm9Enz4IsfGgjf",
      amount: 899,
    },
  },
  US: {
    basic: {
      planId: "plan_Qm9HNNxecWtb6q",
      amount: 687,
    },
    pro: {
      planId: "plan_Qm9I0krvyylhZZ",
      amount: 1558,
    },
    ultra: {
      planId: "plan_Qm9IStTvvAGHdA",
      amount: 3290,
    },
  },
};

// Initialize Razorpay instance
const rzp = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Helper function to validate plan and country
function validatePlanAndCountry(plan, countryCode) {
  if (!planIds[countryCode]) {
    throw new ExpressError(400, `Unsupported country: ${countryCode}`);
  }

  if (!planIds[countryCode][plan]) {
    throw new ExpressError(
      400,
      `Invalid plan: ${plan} for country: ${countryCode}`
    );
  }

  return planIds[countryCode][plan];
}

// Helper function to create or get customer
async function getOrCreateCustomer(user) {
  try {
    if (user.razorpayCustomerId) {
      return user.razorpayCustomerId;
    }

    const customer = await rzp.customers.create({
      name: user.username,
      email: user.email,
    });

    await User.findByIdAndUpdate(user._id, {
      razorpayCustomerId: customer.id,
    });

    return customer.id;
  } catch (error) {
    console.error("Error creating/getting customer:", error);
    throw new ExpressError(500, "Failed to create customer");
  }
}

router.post("/create-subscription", isLoggedIn, async (req, res, next) => {
  try {
    const { plan, authorization } = req.body;

    // Input validation
    console.log(req.user);
    if (
      req.user.subscription.subscriptionStatus !== "normal" ||
      req.user.subscription.subscriptionTier !== "free"
    ) {
      throw new ExpressError(400, "Plan already active");
    }

    if (!plan || !authorization) {
      throw new ExpressError(400, "Plan and authorization are required");
    }

    if (!authorization.data || !authorization.data.country) {
      throw new ExpressError(400, "Invalid authorization data");
    }

    if (!req.user.verified_email) {
      throw new ExpressError(403, "Email verification required");
    }

    // Validate plan and get plan details
    const countryCode = authorization.data.country === "IN" ? "IN" : "US";

    const planDetails = validatePlanAndCountry(plan, countryCode);

    // Get or create customer
    await getOrCreateCustomer(req.user);

    // Create subscription
    const subscription = await rzp.subscriptions.create({
      plan_id: planDetails.planId,
      customer_notify: true,
      total_count: 12,
      quantity: 1,
    });

    // Create transaction record
    const transaction = await Transaction.create({
      userId: req.user._id,
      razorpayPaymentId: null,
      razorpaySubscriptionId: subscription.id,
      plan: plan,
      amount: planDetails.amount,
      countryCode,
      status: "pending",
      createdAt: new Date(),
    });

    // Update user with subscription ID
    await User.findByIdAndUpdate(req.user._id, {
      razorpaySubscriptionId: subscription.id,
    });

    res.status(201).json({
      subscriptionId: subscription.id,
      username: req.user.username,
      email: req.user.email,
      plan: plan,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);

    // Handle specific Razorpay errors
    if (error.error && error.error.description) {
      return next(new ExpressError(400, error.error.description));
    }

    // Handle ExpressError instances
    if (error instanceof ExpressError) {
      return next(error);
    }

    // Handle other errors
    next(new ExpressError(500, "Failed to create subscription"));
  }
});

router.post("/verify-signature", async (req, res, next) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    // Input validation
    if (
      !razorpay_payment_id ||
      !razorpay_subscription_id ||
      !razorpay_signature
    ) {
      throw new ExpressError(
        400,
        "Missing required payment verification parameters"
      );
    }

    // Verify signature
    const isValid = verifySubscriptionSignature(
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      RAZORPAY_KEY_SECRET
    );

    if (!isValid) {
      throw new ExpressError(400, "Invalid payment signature");
    }

    // Find and update transaction
    const transaction = await Transaction.findOneAndUpdate(
      { razorpaySubscriptionId: razorpay_subscription_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        status: "paid",
      },
      { new: true }
    );

    if (!transaction) {
      throw new ExpressError(404, "Transaction not found");
    }

    const { userId, plan } = transaction;

    // Update user subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    console.log(commonPlans[plan]);

    const currentUser = await User.findByIdAndUpdate(userId, {
      "subscription.subscriptionStatus": "normal",
      "subscription.subscriptionTier": plan,
      "subscription.subscriptionType": "monthly",
      "subscription.subscriptionStartDate": startDate,
      "subscription.subscriptionEndDate": endDate,
      apiUsage: 0,
      usageQuota: commonPlans[plan],
    });

    sendSubscriptionStartEmail(
      currentUser.email,
      currentUser.username,
      plan.toUpperCase()
    );

    res.status(200).json({ message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying payment:", error);

    if (error instanceof ExpressError) {
      return next(error);
    }

    next(new ExpressError(500, "Failed to verify payment"));
  }
});

// Helper function to verify subscription signature
function verifySubscriptionSignature(
  paymentId,
  subscriptionId,
  razorpaySignature,
  secret
) {
  try {
    if (!paymentId || !subscriptionId || !razorpaySignature || !secret) {
      return false;
    }

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${paymentId}|${subscriptionId}`)
      .digest("hex");

    return generatedSignature === razorpaySignature;
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
}

// Route to cancel a subscription
router.post("/cancel-subscription", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || !user.razorpaySubscriptionId) {
      throw new ExpressError(400, "No active subscription found for user");
    }

    // Cancel the subscription on Razorpay
    const razorpayResponse = rzp.subscriptions.cancel(
      user.razorpaySubscriptionId,
      { cancel_at_cycle_end: 1 }
    );

    // Update user subscription status in DB
    await User.findByIdAndUpdate(req.user._id, {
      "subscription.subscriptionStatus": "cancelled",
    });

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      razorpayResponse,
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);

    if (error instanceof ExpressError) {
      return next(error);
    }

    next(new ExpressError(500, "Failed to cancel subscription"));
  }
});

// Error handling middleware for this router
router.use((error, req, res, next) => {
  console.error("Razorpay router error:", error);

  if (error instanceof ExpressError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

module.exports = router;
