const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError");
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
const crypto = require("crypto");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const planIdToPlan = {
  plan_QjPWFuhJEc4UNV: "basic",
  plan_QjPVhmshFIaVn5: "pro",
  plan_QjPVF9GVru8s82: "ultra",
  plan_Qi8E3BaUkckdTE: "basic",
  plan_QjPPalYVdU6W0T: "pro",
  plan_QjPSYcsYHfO6zg: "ultra",
};
router.get("/", (req, res) => {
  res.json({ message: "This route is for production later" });
});

router.post("/all", async (req, res) => {
  console.log("webhook triggered");
  try {
    const razorpaySignature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    console.log(req.body);

    // Compute expected signature
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpaySignature;

    if (!isValid) {
      console.log("Invalid webhook signature");
      throw new ExpressError(400, "Invalid webhook signature");
    }

    const event = req.body.event;
    const payload = req.body.payload;
    let subscription = null;
    let payment = null;
    if (payload.subscription) {
      subscription = payload.subscription.entity;
    }
    if (payload.payment) {
      payment = payload.payment.entity;
    }

    const user = await User.findOne({
      razorpaySubscriptionId: subscription.id,
    });

    switch (event) {
      case "subscription.cancelled":
        await handleSubscriptionCancelled(subscription);
        break;
      case "subscription.charged":
        await handleSubscriptionCharged(subscription, payment, user);
        break;
      case "subscription.halted":
        await handleSubscriptionHalted(subscription);
        break;
      default:
        console.log(`Unhandled webhook event: ${event.event}`);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);

    if (error instanceof ExpressError) {
      return next(error);
    }

    next(new ExpressError(500, "Webhook processing failed"));
  }
});

async function handleSubscriptionCancelled(subscription) {
  try {
    // Also update the user's subscription status to "inactive"
    const user = await User.findOne({
      razorpaySubscriptionId: subscription.id,
    });

    if (user) {
      await User.findByIdAndUpdate(user._id, {
        "subscription.subscriptionTier": "free",
        "subscription.subscriptionStatus": "normal",
        "subscription.subscriptionEndDate": null,
        "subscription.subscriptionStartDate": null,
      });
    }
  } catch (error) {
    console.error("Error handling subscription cancellation:", error);
  }
}

async function handleSubscriptionCharged(subscription, payment, user) {
  try {
    const transaction = await Transaction.findOne({
      razorpayPaymentId: payment.id,
    });
    if (!transaction) {
      // If no transaction exists for this payment, create a new Transaction
      await Transaction.create({
        userId: user._id || null, // You may need to map customer_id to userId in your system
        razorpayPaymentId: payment.id,
        razorpaySubscriptionId: subscription.id,
        plan: planIdToPlan[subscription.plan_id] || "basic",
        amount: payment.amount / 100, // Amount may not be available here, set if you have it
        countryCode: payment.international ? "US" : "IN", // Set if you have this info
        status: "paid",
        createdAt: new Date(),
      });
      // After creating a new Transaction for a subscription charge, update the user's subscription info
      if (user && user._id) {
        const plan = planIdToPlan[subscription.plan_id] || "basic";

        const startDate = new Date(subscription.current_start * 1000);
        const endDate = new Date(subscription.current_end * 1000);

        await User.findByIdAndUpdate(user._id, {
          "subscription.subscriptionTier": plan,
          "subscription.subscriptionType": "monthly",
          "subscription.subscriptionStartDate": startDate,
          "subscription.subscriptionEndDate": endDate,
          apiUsage: 0,
          usageQuota: commonPlans[plan],
        });
      }
    }
  } catch (error) {
    console.error("Error handling subscription charge:", error);
  }
}

async function handleSubscriptionHalted(subscription) {
  try {
    // Update the transaction status to "halted"
    await Transaction.findOneAndUpdate(
      { razorpaySubscriptionId: subscription.id },
      { status: "pending" }
    );
    // Also update the user's subscription status to "halted"
    const user = await User.findOne({
      "subscription.razorpaySubscriptionId": subscription.id,
    });
    if (user) {
      await User.findByIdAndUpdate(user._id, {
        "subscription.status": "paused",
      });
    }
  } catch (error) {
    console.error("Error handling subscription halt:", error);
  }
}

module.exports = router;
