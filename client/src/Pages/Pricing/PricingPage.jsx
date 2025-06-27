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
    monthlyPrice: "0",
    yearlyPrice: "0",
    popular: false,
    features: [
      { text: "Max Tweets per request: 30", included: true },
      { text: "Max Reddit Posts / request: 60", included: true },
      { text: "Max Requests: 10", included: true },
      { text: "PDF/txt/Word exports", included: false },
      { text: "Filter by date (Twitter): Today, This week", included: true },
      { text: "Filter type (Twitter): hashtag", included: true },
      { text: "Filter by date (Reddit): last hour, today", included: true },
      { text: "Filter type (Reddit): Hot, New", included: true },
      { text: "AI Models:", included: true },
      { text: "• Gemini 2.5 Flash", included: true },
      { text: "• Sonar", included: false },
      { text: "• Sonar-reasoning", included: false },
      { text: "• Sonar-reasoning pro", included: false },
      { text: "• DeepSeek R1-1776", included: false },
    ],
  },
  {
    name: "Basic",
    monthlyPrice: "7.99",
    yearlyPrice: "79",
    popular: true,
    features: [
      { text: "Max Tweets per request: 75", included: true },
      { text: "Max Reddit Posts / request: 120", included: true },
      { text: "Max Requests: 100 / month", included: true },
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
      { text: "• Gemini 2.5 Flash", included: true },
      { text: "• Sonar", included: true },
      { text: "• Sonar-reasoning", included: false },
      { text: "• Sonar-reasoning pro", included: false },
      { text: "• DeepSeek R1-1776", included: false },
    ],
  },
  {
    name: "Pro",
    monthlyPrice: "17.99",
    yearlyPrice: "179",
    popular: false,
    features: [
      { text: "Max Tweets per request: 120", included: true },
      { text: "Max Reddit Posts / request: 200", included: true },
      { text: "Max Requests: 180 / month", included: true },
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
      { text: "• Gemini 2.5 Flash", included: true },
      { text: "• Sonar", included: true },
      { text: "• Sonar-reasoning", included: true },
      { text: "• Sonar-reasoning pro", included: true },
      { text: "• DeepSeek R1-1776", included: false },
    ],
  },
  {
    name: "Ultra",
    monthlyPrice: "39",
    yearlyPrice: "349",
    popular: false,
    features: [
      { text: "Max Tweets per request: 200", included: true },
      { text: "Max Reddit Posts / request: 300", included: true },
      { text: "Max Requests: 250 / month", included: true },
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
      { text: "• Gemini 2.5 Flash", included: true },
      { text: "• Sonar", included: true },
      { text: "• Sonar-reasoning", included: true },
      { text: "• Sonar-reasoning pro", included: true },
      { text: "• DeepSeek R1-1776", included: true },
    ],
  },
];

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
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">
                          {isYearly
                            ? plan.yearlyPrice
                            : planIds[c][plan.name.toLowerCase()]}
                        </span>
                        <span className="text-gray-400 ml-2">
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
                            <CheckIcon className="h-6 w-6 flex-shrink-0 text-purple-500" />
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
                        : "Choose"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default PricingPage;
