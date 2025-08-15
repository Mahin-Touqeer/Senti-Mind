import { useState } from "react";
import {
  ExpandMore,
  ExpandLess,
  Verified,
  DataObject,
} from "@mui/icons-material";

function UniqueValueSection() {
  // FAQ state
  // const [faqOpen, setFaqOpen] = useState(null);

  return (
    <section className="relative  my-36  rounded-3xl  mb-24">
      {/* Animated background orbs */}
      <div className="absolute opacity-50 top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute opacity-50 bottom-10 right-10 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Section Title */}
      <h2
        className="text-3xl sm:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
        data-aos="fade-up"
        data-aos-duration="750"
        // data-aos-delay="1000"
      >
        Real Twitter Data | Real Insights
      </h2>

      {/* Direct AI Misconception Banner */}
      {/* <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        data-aos="fade-up"
        data-aos-duration="750"
      >
        <div className="flex items-center gap-2 bg-slate-900/5 border border-purple-500/30 rounded-xl px-5 py-3 shadow">
          <Verified className="text-green-400" />
          <span className="font-semibold text-white">
            Powered by{" "}
            <span className="text-purple-400">real Twitter data</span>
          </span>
        </div>
      </div> */}
      {/* <p
        className="text-center text-gray-300 mb-10 text-lg max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-duration="750"
      >
        Every insight comes from actual tweets, scraped and analyzed in real
        time. No hallucinated trends, no fabricated data.
      </p> */}

      {/* Comparison Table */}
      <div
        className="overflow-x-auto mb-12 flex justify-center "
        data-aos="fade-up"
        data-aos-duration="750"
      >
        <table className="w-[860px] md:w-full text-base backdrop-blur-lg rounded-2xl mx-auto shadow-lg ">
          <thead className="backdrop-blur-md bg-purple-900/30 ">
            <tr>
              <th className="py-3 px-4 text-left text-gray-300 font-semibold ">
                Feature
              </th>
              <th className="py-3 px-4 text-center text-purple-400 font-semibold">
                SentiMind
              </th>
              <th className="py-3 px-4 text-center text-gray-400 font-semibold">
                ChatGPT / Perplexity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10">
            <tr>
              <td className="py-3 px-4 text-gray-200">Data Source</td>
              <td className="py-3 px-4 text-center text-green-400 font-medium">
                Live tweets from Twitter (X)
              </td>
              <td className="py-3 px-4 text-center text-gray-400">
                No direct Twitter access
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-gray-200">Real-Time Scraping</td>
              <td className="py-3 px-4 text-center text-green-400 font-medium">
                Yes
              </td>
              <td className="py-3 px-4 text-center text-gray-400">No</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-gray-200">
                Latest Trends from Twitter
              </td>
              <td className="py-3 px-4 text-center text-green-400 font-medium">
                Yes
              </td>
              <td className="py-3 px-4 text-center text-gray-400">
                Only based on web/news
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-gray-200">AI Content Generation</td>
              <td className="py-3 px-4 text-center text-gray-400">
                No (analyzes real tweets only)
              </td>
              <td className="py-3 px-4 text-center text-pink-400 font-medium">
                Yes (can generate text)
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-gray-200">
                Custom Hashtag/Handle Search
              </td>
              <td className="py-3 px-4 text-center text-green-400 font-medium">
                Yes
              </td>
              <td className="py-3 px-4 text-center text-gray-400">
                Limited/No
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visual Comparison Mockup */}

      {/* <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
        <div className="flex-1 bg-slate-900/70 rounded-2xl p-6 shadow-lg border border-purple-500/20 min-w-[260px] max-w-xs mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <DataObject className="text-purple-400" />
            <span className="font-bold text-white">SentiMind Dashboard</span>
          </div>
          <div className="text-xs text-gray-400 mb-3">
            #YourHashtag • 23 Tweets
          </div>
          <div className="bg-slate-950/70 rounded-lg p-3 text-left text-gray-200 mb-2">
            <span className="font-semibold text-purple-300">
              "AI in Healthcare"
            </span>{" "}
            is trending with{" "}
            <span className="font-semibold text-green-400">
              positive sentiment
            </span>
            . <br />
            <span className="text-gray-400">
              "Excited to see real-world impact!"
            </span>
          </div>
          <div className="text-xs text-gray-400">
            All insights based on live Twitter data.
          </div>
        </div>
        <div className="flex-1 bg-slate-900/70 rounded-2xl p-6 shadow-lg border border-purple-500/20 min-w-[260px] max-w-xs mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-gray-300">AI Chatbot</span>
          </div>
          <div className="bg-slate-950/70 rounded-lg p-3 text-left text-gray-400 text-sm mb-2">
            Sorry, I can’t access Twitter data.
          </div>
          <div className="text-xs text-gray-500">
            No direct connection to Twitter.
          </div>
        </div>
      </div> */}

      {/* Supporting Messaging */}
      {/* <div className="max-w-4xl px-2 mx-auto mb-12">
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
          <li>
            <span className="font-semibold text-white">
              SentiMind doesn’t generate trends or opinions
            </span>{" "}
            — it analyzes the actual tweets you care about.
          </li>
          <li data-aos="fade-up" data-aos-duration="750">
            <span className="font-semibold text-white">
              Unlike generic AI tools
            </span>
            , SentiMind scrapes real Twitter data, so you get authentic,
            up-to-date insights.
          </li>
          <li data-aos="fade-up" data-aos-duration="750">
            <span className="font-semibold text-white">
              Our platform is purpose-built for Twitter & Reddit
            </span>{" "}
            — not just another AI chatbot.
          </li>
        </ul>
      </div> */}

      {/* Trust-Building Badges */}
      {/* <div
        className="flex flex-wrap gap-4 justify-center mb-12"
        data-aos="fade-up"
        data-aos-duration="750"
      >
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow">
          <Verified className="mr-2" fontSize="small" />
          Powered by Real Twitter Data
        </span>
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-300 font-semibold shadow">
          No AI-Generated Trends — 100% Authentic Insights
        </span>
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/80 border border-pink-400/30 text-pink-300 font-semibold shadow">
          Your Hashtag. Your Handle. Your Data.
        </span>
      </div> */}

      {/* FAQ Section */}
      {/* <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Frequently Asked
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/60 border border-purple-500/20"
            >
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between focus:outline-none"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {faqOpen === idx ? (
                  <ExpandLess className="text-purple-400" />
                ) : (
                  <ExpandMore className="text-purple-400" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  faqOpen === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-4 text-gray-300">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}

export default UniqueValueSection;
