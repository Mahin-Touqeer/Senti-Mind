const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  search: {
    platform: {
      type: String,
      required: true,
      enum: ["twitter", "reddit"],
    },
    query: {
      type: String,
      required: true,
    },
  },
  saved: {
    type: Boolean,
    default: false,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
