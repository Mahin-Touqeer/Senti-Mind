import { useQuery } from "@tanstack/react-query";
import { handlePayment } from "../../services/razorpay";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { isLoggedIn as isLoggedInApi } from "../../Utils/api";
import { useDispatch } from "react-redux";
import { displayModal } from "../../Slices/modalSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageLoader from "../../components/PageLoader";
import axios from "axios";
import { planIds } from "../../Utils/businessModel";
const { VITE_IP_URL } = import.meta.env;

const pricingPlans = [
  {
    name: "Free",
    credits: 10,
    monthlyPrice: "0",
    yearlyPrice: "0",
    popular: false,
    features: [
      { text: "Max Tweets / search: 30", included: true },
      { text: "Max Reddit Posts / search: 60", included: true },
      // { text: "Max Requests: 10", included: true },
      { text: "PDF/txt/Word exports", included: false },
      { text: "Filter by date (Twitter): Today, This week", included: true },
      { text: "Filter type (Twitter): hashtag", included: true },
      { text: "Filter by date (Reddit): last hour, today", included: true },
      { text: "Filter type (Reddit): Hot, New", included: true },
      { text: "AI Models:", included: true },
      { text: "Gemini 2.5 Flash", included: true },
      { text: "Sonar", included: false },
      { text: "Sonar-reasoning", included: false },
      { text: "Sonar-reasoning pro", included: false },
      { text: "DeepSeek R1-1776", included: false },
    ],
  },
  {
    name: "Basic",
    credits: 100,
    monthlyPrice: "7.99",
    yearlyPrice: "79",
    popular: true,
    features: [
      { text: "Max Tweets / search: 75", included: true },
      { text: "Max Reddit Posts / search: 120", included: true },
      // { text: "Max Requests: 100 / month", included: true },
      { text: "PDF/txt/Word exports", included: true },
      {
        text: "Filter by date (Twitter): custom range",
        included: true,
      },
      {
        text: "Filter type (Twitter): hashtag, search, handle",
        included: true,
      },
      {
        text: "Filter by date (Reddit): Last hour, Today, Last week, This month",
        included: true,
      },
      {
        text: "Filter type (Reddit): hot, new, rising, top, best",
        included: true,
      },
      { text: "AI Models:", included: true },
      { text: "Gemini 2.5 Flash", included: true },
      { text: "Sonar", included: true },
      { text: "Sonar-reasoning", included: false },
      { text: "Sonar-reasoning pro", included: false },
      { text: "DeepSeek R1-1776", included: false },
    ],
  },
  {
    name: "Pro",
    credits: 180,
    monthlyPrice: "17.99",
    yearlyPrice: "179",
    popular: false,
    features: [
      { text: "Max Tweets / search: 120", included: true },
      { text: "Max Reddit Posts / search: 200", included: true },
      // { text: "Max Requests: 180 / month", included: true },
      { text: "PDF/txt/Word exports", included: true },
      { text: "Filter by date (Twitter): custom range", included: true },
      {
        text: "Filter type (Twitter): hashtag, search, handle",
        included: true,
      },
      {
        text: "Filter by date (Reddit): This month, This year, all time",
        included: true,
      },
      {
        text: "Filter type (Reddit): hot, new, rising, top, best",
        included: true,
      },
      { text: "AI Models:", included: true },
      { text: "Gemini 2.5 Flash", included: true },
      { text: "Sonar", included: true },
      { text: "Sonar-reasoning", included: true },
      { text: "Sonar-reasoning pro", included: true },
      { text: "DeepSeek R1-1776", included: false },
    ],
  },

  // {
  //   name: "Ultra",
  //   credits:250,
  //   monthlyPrice: "39",
  //   yearlyPrice: "349",
  //   popular: false,
  //   features: [
  //     { text: "Max Tweets / search: 200", included: true },
  //     { text: "Max Reddit Posts / search: 300", included: true },
  // { text: "Max Requests: 250 / month", included: true },
  //     { text: "PDF/txt/Word exports", included: true },
  //     { text: "Filter by date (Twitter): custom range", included: true },
  //     {
  //       text: "Filter type (Twitter): hashtag, search, handle",
  //       included: true,
  //     },
  //     {
  //       text: "Filter by date (Reddit): This month, This year, all time",
  //       included: true,
  //     },
  //     {
  //       text: "Filter type (Reddit): hot, new, rising, top, best",
  //       included: true,
  //     },
  //     { text: "AI Models:", included: true },
  //     { text: "• Gemini 2.5 Flash", included: true },
  //     { text: "• Sonar", included: true },
  //     { text: "• Sonar-reasoning", included: true },
  //     { text: "• Sonar-reasoning pro", included: true },
  //     { text: "• DeepSeek R1-1776", included: true },
  //   ],
  // },
];
const enterprisePlan = {
  name: "Enterprise",
  credits: "Custom",
  monthlyPrice: "Let's talk",
  yearlyPrice: "Let's talk",
  popular: false,
  features: [
    { text: "Custom max Tweets per search", included: true },
    { text: "Custom max Reddit Posts per search", included: true },
    { text: "Unlimited Requests", included: true },
    { text: "PDF/txt/Word exports", included: true },
    { text: "Custom date filters for Twitter and Reddit", included: true },
    { text: "All AI Models included:", included: true },
    { text: "Gemini 2.5 Flash", included: true },
    { text: "Sonar", included: true },
    { text: "Sonar-reasoning", included: true },
    { text: "Sonar-reasoning pro", included: true },
    { text: "DeepSeek R1-1776", included: true },
    { text: "Priority support", included: true },
    { text: "Dedicated account manager", included: true },
    { text: "Custom integrations and API access", included: true },
  ],
};

function PricingPage() {
  const [isYearly] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadingPlan, setIsLoadingPlan] = useState(null);
  const { data: isLoggedIn } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: isLoggedInApi,
  });

  const { data: c, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const authorization = await axios.get(VITE_IP_URL);
        const c = authorization.data.country === "IN" ? "IN" : "US";
        return c || "US";
      } catch (err) {
        console.log("err: " + err);
        console.log("Error occured in Authorization");
        return false;
      }
    },
    queryKey: ["authorization"],
  });
  const handlePaymentClick = async function (name) {
    if (!isLoggedIn) {
      dispatch(displayModal());
    } else {
      if (name === "free") {
        navigate("/analyze/twitter");
      } else {
        setIsLoadingPlan(name);
        await handlePayment(name);
        setIsLoadingPlan(null);
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <Navbar />
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="min-h-screen pt-32 text-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-offset="50"
              >
                Choose Your Plan
              </h1>
              <p
                className="text-lg text-gray-400"
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-offset="50"
                data-aos-delay="100"
              >
                Scale your social media management with flexible options
              </p>

              {/* <div
              className="flex items-center justify-center mt-8 gap-3"
              data-aos="fade-up"
              data-aos-duration="750"
              data-aos-offset="50"
              data-aos-delay="200"
            >
              <span
                className={`text-sm ${
                  !isYearly ? "text-white" : "text-gray-400"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative inline-flex h-6 w-11 items-center alink cursor-pointer rounded-full bg-purple-600/30 transition-colors focus:outline-none"
              >
                <span className="sr-only">Toggle billing period</span>
                <span
                  className={`${
                    isYearly ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-purple-600 transition-transform`}
                />
              </button>
              <span
                className={`text-sm ${
                  isYearly ? "text-white" : "text-gray-400"
                }`}
              >
                Yearly
                <span className="ml-1.5 rounded-full bg-purple-600/20 px-2 py-0.5 text-xs text-purple-400">
                  Save up to 20%
                </span>
              </span>
            </div> */}
            </div>

            <div
              className="flex flex-wrap justify-around"
              data-aos="fade-up"
              data-aos-duration="750"
              data-aos-offset="50"
              data-aos-delay="300"
            >
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={` w-[354.4px] rounded-2xl border border-purple-500/30 mb-8 ${
                    plan.popular ? "relative" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-0 right-0 z-10">
                      <div className="mx-auto w-fit px-4 py-1 rounded-full bg-purple-600 text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className="rounded-2xl bg-slate-900/50 backdrop-blur-sm p-8 h-full flex flex-col">
                    <div className="">
                      <h3 className="text-xl font-bold mb-4 text-center">
                        {plan.name}
                      </h3>
                      <div className="flex items-center justify-center">
                        {/* Credits Section - Maximum Emphasis */}
                        <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/20 border border-purple-400/40 rounded-xl px-6 py-4 shadow-lg">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-white">
                              {plan.credits === "Unlimited"
                                ? "∞"
                                : plan.credits}
                            </div>
                            <div className="text-sm text-purple-200 font-semibold uppercase tracking-wide">
                              Credits/Month
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-center mx-auto my-4">
                        <span className="text-2xl font-bold text-white">
                          {isYearly
                            ? plan.yearlyPrice
                            : planIds[c][plan.name.toLowerCase()]}
                        </span>
                        <span className="text-gray-400 ml-2 text-sm">
                          /{isYearly ? "yr" : "mo"}
                        </span>
                      </div>

                      {isYearly && (
                        <div
                          className={`mt-2 space-y-1 ${
                            plan.name === "Free" && "opacity-0"
                          }`}
                        >
                          <p className="text-sm text-purple-400">
                            ${(plan.yearlyPrice / 12).toFixed(2)}/mo when paid
                            yearly
                          </p>
                          <p className="text-sm text-green-400">
                            Save $
                            {(
                              plan.monthlyPrice * 12 -
                              plan.yearlyPrice
                            ).toFixed(2)}{" "}
                            yearly
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 flex-grow">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          {feature.included ? (
                            // <CheckIcon className="h-6 w-6 flex-shrink-0 text-purple-500" />
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                              <CheckIcon className="h-4 w-4 text-purple-400" />
                            </div>
                          ) : (
                            <XMarkIcon className="h-6 w-6 flex-shrink-0 text-gray-500" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-gray-200"
                                : "text-gray-500"
                            }
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        handlePaymentClick(plan.name.toLowerCase())
                      }
                      className={`w-full rounded-xl py-3 px-6 text-center font-semibold transition-all mt-8 cursor-pointer ${
                        plan.popular
                          ? "bg-purple-600 hover:bg-purple-500"
                          : "border border-purple-600 hover:bg-purple-600/20"
                      }`}
                    >
                      {isLoadingPlan == plan.name.toLowerCase()
                        ? "Pending..."
                        : plan.name !== "Free"
                        ? "Choose"
                        : "Get Started"}
                    </button>
                  </div>
                </div>
              ))}
              {/* Enterprise Plan - Enhanced Theme Match */}
              <div className="w-[354.4px] rounded-2xl border border-purple-500/50 mb-8 relative overflow-hidden shadow-2xl">
                {/* Enterprise Badge
                <div className="absolute -top-3 left-0 right-0 z-10">
                  <div className="mx-auto w-fit px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-semibold text-white shadow-lg">
                    Enterprise
                  </div>
                </div> */}

                {/* Background gradient effects matching your theme */}
                <div className="absolute -left-16 -top-16 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />

                <div className="rounded-2xl bg-slate-900/50 backdrop-blur-sm p-8 h-full flex flex-col border border-purple-400/30 relative">
                  <div className="">
                    <h3 className="text-xl text-center font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                      Enterprise
                    </h3>
                    <div className="flex items-center justify-center">
                      {/* Credits Section - Enhanced with theme colors */}
                      <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/20 border border-purple-400/40 rounded-xl px-6 py-4 shadow-lg">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-white">∞</div>
                          <div className="text-sm text-purple-200 font-semibold uppercase tracking-wide">
                            Custom Credits
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-baseline my-4 justify-center">
                    <span className="text-2xl font-bold text-white">
                      Let's talk
                    </span>
                  </div>
                  <div className="space-y-4 flex-grow">
                    {enterprisePlan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                          <CheckIcon className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-gray-200 ">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  {/* Premium indicator */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">
                      ⭐ Custom solutions for enterprise needs
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/contact")}
                    className="w-full rounded-xl py-3 px-6 text-center font-semibold transition-all duration-300 mt-8 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 "
                  >
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default PricingPage;
