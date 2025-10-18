require("dotenv").config();
// all constants
const express = require("express");
const cors = require("cors");
const ExpressError = require("./utils/ExpressError");
const rateLimit = require("express-rate-limit");
const cron = require("node-cron");
// Limit: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

//Routers
const analyzeTwitterRouter = require("./routes/analyzeTwitterRouter");
const analyzeRedditRouter = require("./routes/analyzeRedditRouter");
const authRouter = require("./routes/authRouter");
const webhookRouter = require("./routes/webhookRouter");
const razorpayRouter = require("./routes/razorpayRouter");
const stocksRouter = require("./routes/stocksRouter");

const cookie_parser = require("cookie-parser");
const { connectDb } = require("./config/db");
const Transaction = require("./models/Transaction");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const corsOptions = {
  origin: FRONTEND_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();

app.use("/", limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 6400;

connectDb()
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/analyze/twitter", analyzeTwitterRouter);
app.use("/analyze/reddit", analyzeRedditRouter);
app.use("/auth", authRouter);
app.use("/subscribe", razorpayRouter);
app.use("/webhook/sentimind", webhookRouter);
app.use("/", stocksRouter);

// error-handler
app.all("*all", (req, res, next) => {
  next(new ExpressError(404, "page not found"));
});

// another error-handling middleware just in case
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).json({ status: false, message });
});

cron.schedule("* * * * *", async () => {
  console.log("Checking for pending payments older than 5 minutes...");
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const result = await Transaction.updateMany(
    {
      status: "pending",
      createdAt: { $lt: fiveMinutesAgo },
    },
    {
      $set: { status: "failed" },
    }
  );

  console.log(`Marked ${result.modifiedCount} payments as failed.`);
});

app.listen(PORT, () => {
  console.log("LISTENING TO PORT 6400");
});
