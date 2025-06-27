const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

module.exports.connectDb = async function () {
  await mongoose.connect(MONGO_URL);
};
