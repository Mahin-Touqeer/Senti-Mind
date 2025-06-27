const { Schema, default: mongoose } = require("mongoose");

const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  razorpayPaymentId: String,
  razorpaySubscriptionId: String,
  plan: {
    type: String,
    enum: ["basic", "pro", "ultra"],
    required: true,
  },
  amount: Number,
  countryCode: {
    type: String,
    enum: ["IN", "US"],
  },
  status: {
    type: String,
    required: true,
  },
  fee: Number,
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
