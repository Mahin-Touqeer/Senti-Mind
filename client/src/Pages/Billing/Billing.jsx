import { useState } from "react";
import {
  FiCreditCard,
  FiDownload,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiPause,
  FiX,
} from "react-icons/fi";
import { RiVipCrownFill } from "react-icons/ri";
import Navbar from "../Navbar";
import {
  cancelSubscription,
  getInfo,
  isLoggedIn as isLoggedInApi,
} from "../../Utils/api";
import PageLoader from "../../components/PageLoader.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { planIds } from "../../Utils/businessModel.js";
import { toastOptions } from "../../Utils/options.jsx";
import { toast, ToastContainer } from "react-toastify";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const faqItems = [
  {
    question: "How does billing work?",
    answer:
      "We bill monthly based on your selected plan. Your subscription automatically renews unless cancelled.",
  },
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription anytime from this billing page. Your access continues until the end of your current billing period.",
  },
];
const Billing = () => {
  const [showAllInvoices, setShowAllInvoices] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  // const [showCancelModal, setShowCancelModal] = useState(false);
  // const [showPauseModal, setShowPauseModal] = useState(false);
  // const [showResumeModal, setShowResumeModal] = useState(false);
  // const [isProcessing, setIsProcessing] = useState(false);

  const { data: isLoggedIn, isLoading } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: isLoggedInApi,
    refetchInterval: undefined,
  });

  const { data: userInfo, isLoading: isInfoPending } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getInfo,
  });

  if (isLoading || isInfoPending) {
    return <PageLoader />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const {
    apiUsage,
    usageQuota,
    subscription,
    articles,
    modifiedTransactions: billingHistory,
  } = userInfo;

  const twitterCount = articles.filter(
    (article) => article.search.platform === "twitter"
  ).length;
  const redditCount = articles.filter(
    (article) => article.search.platform === "reddit"
  ).length;
  const currentPeriodUsage = {
    twitter: twitterCount,
    reddit: redditCount,
    total: redditCount + twitterCount,
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="min-h-screen text-stone-100 pt-20 alink">
        <div className="m-auto xl:max-w-[1050px] w-98/100 space-y-6 p-4 md:p-8">
          {/* Header */}
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Billing & Usage
                </h1>
                <p className="text-stone-400">
                  Manage your subscription and monitor usage
                </p>
              </div>
              <Link
                to="/profile"
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                ← Back to Profile
              </Link>
            </div>
          </div>

          {/* Current Plan & Usage */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Plan */}
            {/* Current Plan - Enhanced with Subscription Management */}
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FiCreditCard className="text-blue-400" />
                  Current Plan
                </h2>
                {subscription.subscriptionTier === "ultra" && (
                  <RiVipCrownFill className="text-yellow-400 text-xl" />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      subscription.subscriptionTier === "ultra"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : subscription.subscriptionTier === "free"
                        ? "bg-gray-500/20 text-gray-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {subscription.subscriptionTier.charAt(0).toUpperCase() +
                      subscription.subscriptionTier.slice(1) +
                      " Plan"}
                  </span>

                  {/* Subscription Status Indicator */}
                  {subscription.subscriptionStatus === "paused" && (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full flex items-center gap-1">
                      <FiPause className="w-3 h-3" />
                      Paused
                    </span>
                  )}
                  {subscription.subscriptionStatus === "cancelled" && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full flex items-center gap-1">
                      <FiX className="w-3 h-3" />
                      Cancelled
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400">Monthly Cost</span>
                    <span className="text-white font-medium">
                      {subscription.subscriptionTier !== "free"
                        ? billingHistory
                            .slice(-1)
                            .map(
                              (invoice) =>
                                planIds[invoice.countryCode][invoice.plan]
                            )
                        : "No billing"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400">API Limit</span>
                    <span className="text-white font-medium">
                      {usageQuota}/month
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400">
                      {subscription.subscriptionStatus === "paused"
                        ? "Paused Until"
                        : subscription.subscriptionStatus === "cancelled"
                        ? "Access Until"
                        : "Next Billing"}
                    </span>
                    <span className="text-white font-medium">
                      {subscription.subscriptionTier === "free"
                        ? "No billing"
                        : formatDate(subscription.subscriptionEndDate)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {subscription.subscriptionTier !== "free" &&
                    subscription.subscriptionStatus !== "cancelled" && (
                      <>
                        <div className="flex gap-3">
                          {/* <button
                          onClick={() => setShowPauseModal(true)}
                          className="flex-1 bg-yellow-500/20 text-yellow-300 py-2 px-4 rounded-lg hover:bg-yellow-500/30 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <FiPause className="w-4 h-4" />
                          Pause Subscription
                        </button> */}
                          <CancelSubscriptionButton />
                        </div>
                      </>
                    )}

                  {/* {subscription.subscriptionStatus === "paused" && (
                    <button
                      onClick={() => setShowResumeModal(true)}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiPlay className="w-4 h-4" />
                      Resume Subscription
                    </button>
                  )} */}

                  {subscription.subscriptionStatus === "cancelled" &&
                    billingHistory.length && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-red-300 text-sm text-center">
                          Your subscription has been cancelled and will end on{" "}
                          <br /> {formatDate(subscription.subscriptionEndDate)}
                        </p>
                        {/* <Link
                          to="/pricing"
                          className="w-full bg-indigo-700 text-white py-2 px-4 rounded-lg hover:bg-indigo-800 transition-colors text-center block mt-3"
                        >
                          Resubscribe
                        </Link> */}
                      </div>
                    )}

                  {subscription.subscriptionTier !== "ultra" &&
                    subscription.status === "active" && (
                      <Link
                        to="/pricing"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-center block"
                      >
                        Upgrade Plan
                      </Link>
                    )}
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FiTrendingUp className="text-blue-400" />
                Current Usage
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-stone-300">API Requests</span>
                    <span className="text-stone-400">
                      {apiUsage}/{usageQuota}
                    </span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (apiUsage / usageQuota) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    {Math.round((apiUsage / usageQuota) * 100)}% of monthly
                    limit used
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium text-stone-300 mb-3">
                    This Month's Activity
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-400">Twitter Analyses</span>
                      <span className="text-blue-400">
                        {currentPeriodUsage.twitter}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-400">Reddit Analyses</span>
                      <span className="text-orange-400">
                        {currentPeriodUsage.reddit}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2 border-t border-white/5">
                      <span className="text-stone-300">Total</span>
                      <span className="text-white">
                        {currentPeriodUsage.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FiCalendar className="text-blue-400" />
                Billing History
              </h2>
              {billingHistory.length > 3 && (
                <button
                  onClick={() => setShowAllInvoices(!showAllInvoices)}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-1"
                >
                  {showAllInvoices ? "Show Less" : "Show All"}
                  {showAllInvoices ? (
                    <FiChevronUp className="w-4 h-4" />
                  ) : (
                    <FiChevronDown className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {billingHistory.length == 0 ? (
              <div className="text-center py-8">
                <FiDollarSign className="w-12 h-12 text-stone-500 mx-auto mb-4" />
                <p className="text-stone-400">No billing history available</p>
                <p className="text-sm text-stone-500 mt-2">
                  Upgrade to a paid plan to see your billing history here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {(showAllInvoices
                  ? billingHistory
                  : billingHistory.slice(-2)
                ).map((invoice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-stone-200">
                            {invoice.plan.charAt(0).toUpperCase() +
                              invoice.plan.slice(1)}
                          </span>
                          <span className="text-sm text-stone-400">
                            {formatDate(invoice.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium text-white">
                          {planIds[invoice.countryCode][invoice.plan]}
                        </div>
                        <div
                          className={`text-xs ${
                            invoice.status === "paid"
                              ? "text-green-400"
                              : invoice.status === "pending"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </div>
                      </div>

                      {/* <button className="p-2 text-stone-400 hover:text-white transition-colors">
                        <FiDownload className="w-4 h-4" />
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method
          {subscription.subscriptionTier !== "free" && (
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FiCreditCard className="text-blue-400" />
                Payment Method
              </h2>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold text-white">
                    VISA
                  </div>
                  <div>
                    <div className="text-stone-200">•••• •••• •••• 4242</div>
                    <div className="text-sm text-stone-400">Expires 12/25</div>
                  </div>
                </div>

                <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                  Update
                </button>
              </div>
            </div>
          )} */}

          {/* FAQ Section */}
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <FiHelpCircle className="text-blue-400" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-white/10 rounded-lg">
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-stone-200">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="w-5 h-5 text-stone-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-4">
                          <p className="text-stone-400 text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Need Help?
              </h2>
              <p className="text-stone-400 mb-6">
                Our support team is here to help with any billing questions
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Contact Support
                  <FiExternalLink className="w-4 h-4" />
                </Link>

                <Link
                  to="/help"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-stone-300 rounded-lg hover:bg-white/20 transition-colors"
                >
                  View Documentation
                  <FiExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const CancelSubscriptionButton = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      toast.success("Cancelled successfully", {
        ...toastOptions,
        autoClose: 500,
        style: {
          backgroundColor: "#1e5c39", // any color you like
        },
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        ...toastOptions,
        style: {
          backgroundColor: "#fff", // any color you like
          color: "#000",
        },
      });
    },
  });

  return (
    <button
      onClick={mutate}
      className="flex-1 bg-red-500/20 text-red-300 py-2 px-4 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
    >
      <FiX className="w-4 h-4" />
      {isPending ? "Cancelling..." : "Cancel Subscription"}
    </button>
  );
};
export default Billing;
