/*// --------------------------------------------------------- //

This file is intened to used in the near future

// --------------------------------------------------------- //*/

const { PuppeteerCrawler, Dataset, log } = require("crawlee");
const cookies = require("./cookies");

module.exports = async function getTrendingHashtags(limit) {
  const BASE_URL = "https://x.com/explore/tabs/trending?_" + Date.now();
  console.log("gettrendinghashtags is runninng");
  const hashtags = [];
  const crawler = new PuppeteerCrawler({
    launchContext: {
      launchOptions: {
        headless: true, // Set to false to see the browser
      },
    },
    preNavigationHooks: [
      async ({ page }) => {
        if (cookies.length) {
          await page.setCookie(...cookies);
          log.info("Cookies set successfully");
        } else {
          log.warning("No cookies found – make sure X_COOKIES is set");
        }
      },
    ],
    async requestHandler({ page, request }) {
      log.info(`Opening hashtag page: ${request.url}`);
      // Block images, videos, and stylesheets to speed up scraping
      await page.setRequestInterception(true);

      page.on("request", (request) => {
        const resourceType = request.resourceType();
        // Block resources that are not needed
        if (
          resourceType === "image" ||
          resourceType === "media" ||
          resourceType === "stylesheet"
        ) {
          request.abort();
        } else {
          request.continue();
        }
      });
      await page.goto(request.url, { waitUntil: "networkidle2" });

      // Wait for the trending section to load
      await page.waitForSelector('[aria-label="Timeline: Explore"]', {
        timeout: 3000,
      });

      // Extract top post URLs
      const totalTags = await page.evaluate(() => {
        const elements = Array.from(
          document.querySelectorAll("div[data-testid='cellInnerDiv'] span")
        );
        const postLinks = elements.map((a) => a.innerText);
        return postLinks;
      });

      for (let i = 0; i < totalTags.length; i++) {
        if (totalTags[i] === "·") {
          const targetIndex = i + 2;
          if (totalTags[targetIndex]) {
            hashtags.push(totalTags[targetIndex]);
          }
        }
      }
    },
    maxRequestsPerCrawl: 10,
  });
  await crawler.run([{ url: BASE_URL }]);

  console.log("returning hashtags");
  return hashtags.filter((item) => !/[^\u0000-\u007F]/.test(item));
};
