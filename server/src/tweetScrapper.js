const { PuppeteerCrawler, Dataset, log } = require("crawlee");
const puppeteer = require("puppeteer-extra");
const cookies = require("../controllers/cookies");
const { getTwitterArticle } = require("../utils/utils");
const Article = require("../models/Article");
const User = require("../models/User");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

module.exports = async function getTweets(
  search_URL,
  limit,
  res,
  req,
  query,
  selectedAiModel
) {
  const tweetSet = new Set();
  let timeoutCount = 0;
  const crawler = new PuppeteerCrawler({
    requestHandlerTimeoutSecs: 600,
    launchContext: {
      launchOptions: {
        headless: true,
           executablePath: process.env.NODE_ENV=="production"? "./cache/chromium/linux-1479737/chrome-linux/chrome": puppeteer.executablePath(),
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
      launcher: puppeteer,
      useChrome: true,
    },
    
    preNavigationHooks: [
      async ({ page }) => {
        if (cookies.length) {
          await page.setCookie(...cookies);
          log.info("Cookies set successfully");
        } else {
          log.warning("No cookies found – make sure X_COOKIES is set");
        }

        await page.setRequestInterception(true);
        console.log(timeoutCount);
        if (timeoutCount == 5) {
          res.status(408).json({
            message:
              "Our servers are slow at the moment. Please try again later",
          });
          crawler.stop();
          return;
        }
        timeoutCount++;
        function requestHandlerr(req) {
          const resourceType = req.resourceType();
          const url = req.url();
          const blockedResourceTypes = ["image", "stylesheet", "font", "media"];
          const blockedDomains = ["youtube.com", "vimeo.com"];

          if (
            blockedResourceTypes.includes(resourceType) ||
            blockedDomains.some((domain) => url.includes(domain))
          ) {
            return req.abort();
          }

          return req.continue();
        }
        page.on("request", requestHandlerr);
        page.on("close", () => {
          page.removeListener("request", requestHandlerr);
        });
      },
    ],
    async requestHandler({ page, request }) {
      log.info(`Opening hashtag page: ${request.url}`);
      try {
        await page.goto(request.url, {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
      } catch (error) {
        if (error.name === "TimeoutError") {
          res.status(408).json({
            message:
              "Our servers are slow at the moment. Please try again later",
          });
          return;
        }
        res.status(500).json({ message: error.message });
        return;
      }

      let attempt = 0;
      // Scroll until we get limit+ tweets
      while (tweetSet.size < limit) {
        const newTweets = await page.evaluate(() => {
          return Array.from(
            document.querySelectorAll("article div[data-testid='tweetText']")
          )
            .map((el) => el.innerText.trim())
            .filter((text) => text.length > 0);
        });

        newTweets.forEach((t) => tweetSet.add(t));

        log.info(`Collected ${tweetSet.size} tweets...`);
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await page.evaluate(
          () => new Promise((resolve) => setTimeout(resolve, 5000))
        );
        attempt++;
        if (attempt === 10 && !tweetSet.size) break;
      }

      if (!tweetSet.size) {
        res.status(500).json({
          message: `No tweets found for this request`,
        });
        crawler.stop();
        return;
      }

      const tempArticle = await getTwitterArticle(
        Array.from(tweetSet),
        query,
        selectedAiModel
      );

      res.json({ summary: tempArticle });

      // Update API usage
      console.log("updating user...");

      await User.findByIdAndUpdate(req.user._id, { $inc: { apiUsage: 1 } });

      console.log("updated user");

      console.log("saving article...");

      // Create and save article to database
      const article = new Article({
        userId: req.user._id,
        content: tempArticle,
        search: {
          platform: "twitter",
          query: query,
        },
      });

      await article.save();

      console.log("saved article");

      return;
    },
    maxRequestsPerCrawl: undefined,
  });

  await crawler.run([{ url: "https://www.amazon.com" }]);
  return Array.from(tweetSet);
};
