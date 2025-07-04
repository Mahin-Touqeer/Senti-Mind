import { useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Link } from "react-router-dom";
const faqs = [
  {
    question: "What is SentiMind and how does it work?",
    answer:
      "SentiMind is an AI-powered social media analysis platform that scrapes and analyzes tweets and Reddit posts based on hashtags or topics you provide. Our advanced algorithms process the data and generate comprehensive articles with sentiment analysis, helping you understand public opinion and trends instantly.",
  },
  {
    question: "Which social media platforms does SentiMind support?",
    answer:
      "Currently, SentiMind supports Twitter and Reddit analysis. You can analyze tweets using hashtags or handles, and Reddit posts from various subreddits. We're continuously working to expand our platform support.",
  },
  {
    question: "How many tweets or posts can I analyze at once?",
    answer:
      "The number of posts you can analyze depends on your subscription plan. Free users can analyze up to 30 tweets per query, while subscribed users can analyze up to 200 tweets or 400 Reddit posts.",
  },
  {
    question: "How accurate is the sentiment analysis?",
    answer:
      "Our AI-powered sentiment analysis uses advanced natural language processing models. The system continuously learns and improves from new data, ensuring reliable insights for your social media analysis needs.",
  },
  {
    question: "Can I customize the date range for analysis?",
    answer:
      "Yes! SentiMind allows you to specify custom date ranges for your analysis. You can analyze posts from the last 24 hours, past week, month, or set a specific date range that suits your research needs.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We take data security seriously. All analyzed data is processed securely and is not stored permanently on our servers. We comply with data protection regulations and ensure your queries and results remain private.",
  },
  {
    question: "What formats can I export my analysis results in?",
    answer:
      "You can export your analysis results in multiple formats including PDF reports, or WORD docs. We are continuously working on expanding it to CSV and JSON for developers.",
  },
  {
    question: "Do you offer API access for developers?",
    answer:
      "Currently, we do not provide RESTful API access for developers and businesses",
  },
  {
    question: "How often is the data updated?",
    answer:
      "SentiMind provides real-time analysis capabilities. When you run a query, we fetch the most recent posts available from the platforms. For trending topics, we recommend running analysis periodically to capture evolving conversations.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-32 alink">
      <h1
        className="text-center text-4xl font-extrabold mb-4"
        data-aos="fade-up"
        data-aos-duration="750"
        data-aos-once={true}
      >
        <span className="bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
          Frequently Asked Questions
        </span>
      </h1>
      <p
        className="text-center text-gray-400 text-lg mb-16"
        data-aos="fade-up"
        data-aos-duration="750"
        data-aos-delay="50"
        data-aos-once={true}
      >
        Everything you need to know about SentiMind
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="group relative rounded-2xl bg-[#141A4B]/50 backdrop-blur-sm border border-purple-500/10 overflow-hidden transition-all duration-300 hover:border-purple-500/30"
            data-aos="fade-up"
            data-aos-duration="750"
            data-aos-once={true}
          >
            {/* Gradient background effect */}
            <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />

            <div className="relative">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ExpandLess className="text-purple-500 transition-transform duration-500 ease-in-out " />
                  ) : (
                    <ExpandMore className="text-purple-500 transition-transform duration-750 ease-in-out " />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-750 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center mt-12">
        <p
          className="text-gray-400 mb-6"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once={true}
        >
          Still have questions? We're here to help!
        </p>
        <button
          className="cursor-pointer group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once={true}
        >
          <Link to="/contact">
            <div className="relative rounded-xl bg-slate-950/50 px-6 py-3 transition-colors group-hover/btn:bg-transparent">
              <div className="relative">Contact Support</div>
            </div>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default FAQ;
