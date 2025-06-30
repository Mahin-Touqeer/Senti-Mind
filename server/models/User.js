const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  subscription: {
    subscriptionStatus: {
      type: String,
      enum: ["paused", "normal", "cancelled"],
      default: "normal",
    },
    subscriptionTier: {
      type: String,
      enum: ["free", "basic", "pro", "ultra"],
      default: "free",
    },
    subscriptionType: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    subscriptionEndDate: {
      type: Date,
      default: null,
    },
    subscriptionStartDate: {
      type: Date,
      default: null,
    },
  },
  razorpayCustomerId: String,
  razorpaySubscriptionId: String,
  apiUsage: {
    type: Number,
    default: 0,
  },
  usageQuota: {
    type: Number,
    default: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified_email: {
    type: Boolean,
    default: false,
  },
});

// Hash password before saving
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Method to compare password for login
// UserSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// Method to check usage limits based on subscription tier
// UserSchema.methods.checkUsageLimit = function() {
//   const limits = {
//     free: 10,
//     pro: 50,
//     ultra: 200
//   };

//   const now = new Date();
//   const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);

//   // Reset count if last reset was more than 24 hours ago
//   if (this.apiUsage.lastReset < oneDayAgo) {
//     this.apiUsage.count = 0;
//     this.apiUsage.lastReset = now;
//   }

//   return this.apiUsage.count < limits[this.subscriptionTier];
// };

// Method to increment usage count
// UserSchema.methods.incrementUsage = async function() {
//   this.apiUsage.count += 1;
//   await this.save();
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;
