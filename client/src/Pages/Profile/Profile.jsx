import { useState } from "react";
import {
  FiRefreshCw,
  FiTrendingUp,
  FiChevronRight,
  FiBookmark,
  FiSearch,
  FiCreditCard,
} from "react-icons/fi";
import { RiVipCrownFill } from "react-icons/ri";
import { BsTwitter, BsReddit } from "react-icons/bs";
import Navbar from "../Navbar";
import { Avatar } from "@mui/material";
import ActivityModal from "./ActivityModal";
import { getInfo, isLoggedIn as isLoggedInApi } from "../../Utils/api";
import PageLoader from "../../components/PageLoader.jsx";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { EmailVerificationBanner } from "./EmailVerificationBanner.jsx";
import NewSaveBtn from "./NewSaveBtn.jsx";
import DownloadButton from "./DownloadButton.jsx";
import { ArticleContentModal } from "./ArticleContentModal.jsx";
import UnsaveBtn from "./UnsaveBtn.jsx";
import { SavedArticlesModal } from "./SavedArticlesModal.jsx";
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const formatDateWithoutTime = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
const Profile = () => {
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showSavedArticles, setShowSavedArticles] = useState(false);

  // Add these new state variables
  const [showArticleContent, setShowArticleContent] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowArticleContent(true);
  };

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
    username,
    email,
    subscription,
    articles,
    profilePicture,
    verified_email,
  } = userInfo;
  // Filter saved and unsaved articles
  const savedArticles = articles.filter((article) => article.saved);
  return (
    <>
      <Navbar />
      <div className="min-h-screen text-stone-100 pt-20 alink">
        <div className="m-auto xl:max-w-[1050px] w-98/100 space-y-6 p-4 md:p-8">
          {!verified_email && <EmailVerificationBanner email={email} />}

          {/* User Info Section */}
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar
                alt={username}
                sx={{
                  width: 24 * 4,
                  height: 24 * 4,
                }}
                src={profilePicture}
              ></Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white">{username}</h1>
                <p className="text-stone-400">{email}</p>
                <div className="mt-2 inline-flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      subscription.subscriptionTier === "ultra"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-white/10 text-stone-300"
                    }`}
                  >
                    {subscription.subscriptionTier === "ultra" ? (
                      <span className="flex items-center gap-1">
                        <RiVipCrownFill className="text-yellow-400" />
                        Premium
                      </span>
                    ) : (
                      subscription.subscriptionTier + " plan"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
              <FiTrendingUp className="text-blue-400" />
              Usage Statistics
            </h2>

            {/* Platform Legend */}
            <div className="flex items-center gap-6 mb-6 p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-stone-300 flex items-center gap-1">
                  <BsTwitter className="w-4 h-4" />
                  Twitter
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-stone-300 flex items-center gap-1">
                  <BsReddit className="w-4 h-4" />
                  Reddit
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Articles by Platform */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-300">Articles by Platform</span>
                  <span className="text-stone-400">
                    {articles.length} total
                  </span>
                </div>

                {(() => {
                  const twitterCount = articles.filter(
                    (article) => article.search.platform === "twitter"
                  ).length;
                  const redditCount = articles.filter(
                    (article) => article.search.platform === "reddit"
                  ).length;
                  const total = articles.length || 1; // Prevent division by zero
                  const twitterPercentage = (twitterCount / total) * 100;
                  const redditPercentage = (redditCount / total) * 100;

                  return (
                    <>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
                        {twitterCount > 0 && (
                          <div
                            className="h-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${twitterPercentage}%` }}
                          />
                        )}
                        {redditCount > 0 && (
                          <div
                            className="h-full bg-orange-500 transition-all duration-500"
                            style={{ width: `${redditPercentage}%` }}
                          />
                        )}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400">
                          Twitter: {twitterCount} (
                          {Math.round(twitterPercentage)}%)
                        </span>
                        <span className="text-orange-400">
                          Reddit: {redditCount} ({Math.round(redditPercentage)}
                          %)
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* API Requests */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-300">API Requests</span>
                  <span className="text-stone-400">
                    {apiUsage}/{usageQuota}
                  </span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${(apiUsage / usageQuota) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Billing & Subscription Management */}
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FiCreditCard className="text-blue-400" />
                Billing & Subscription
              </h2>
              <Link
                to="/billing"
                className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors noShadow"
              >
                Manage Billing
                <FiChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-stone-300 text-sm mb-2">Current Plan</p>
                <p className="text-white font-semibold">
                  {subscription.subscriptionTier.charAt(0).toUpperCase() +
                    subscription.subscriptionTier.slice(1)}{" "}
                  Plan
                </p>
              </div>
              <div>
                <p className="text-stone-300 text-sm mb-2">Next Billing</p>
                <p className="text-white font-semibold">
                  {subscription.subscriptionTier === "free"
                    ? "No billing"
                    : formatDateWithoutTime(subscription.subscriptionEndDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10 z-20 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Recent Activities
              </h2>
              {articles.length > 2 && (
                <button
                  onClick={() => setShowAllActivities(true)}
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors noShadow"
                >
                  Show All
                  <FiChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* In Recent Activities section */}
            <div className="space-y-4">
              {articles.length === 0 ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <FiRefreshCw className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No Recent Activities
                  </h3>
                  <p className="text-stone-400 text-sm mb-6 max-w-sm mx-auto">
                    Start exploring by searching for topics on Twitter or Reddit
                    to see your activities here
                  </p>
                  <Link
                    to="/analyze/twitter"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FiSearch className="w-4 h-4" />
                    Start Searching
                  </Link>
                </div>
              ) : (
                articles.slice(0, 2).map((activity, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
                      onClick={() => handleArticleClick(activity)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`p-2 rounded ${
                              activity.search.platform === "twitter"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-orange-500/20 text-orange-400"
                            }`}
                          >
                            {activity.search.platform === "twitter" ? (
                              <BsTwitter />
                            ) : (
                              <BsReddit />
                            )}
                          </span>
                          <span className="font-medium text-stone-200">
                            {activity.search.query}
                          </span>
                        </div>
                        <p className="text-sm text-stone-400 mt-1">
                          {formatDate(activity.createdAt)}
                        </p>
                      </div>

                      <div onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2">
                          {!activity.saved && (
                            <NewSaveBtn articleId={activity._id} />
                          )}
                          {subscription.subscriptionTier !== "free" && (
                            <DownloadButton article={activity} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Saved Articles Section */}
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10 z-10 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FiBookmark className="text-blue-400" />
                Saved Articles ({savedArticles.length})
              </h2>
              {savedArticles.length > 2 && (
                <button
                  onClick={() => setShowSavedArticles(true)}
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors noShadow"
                >
                  Show All
                  <FiChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="space-y-4">
              {savedArticles.length === 0 ? (
                <div className="text-center py-8">
                  <FiBookmark className="w-12 h-12 text-stone-500 mx-auto mb-4" />
                  <p className="text-stone-400">No saved articles yet</p>
                  <p className="text-sm text-stone-500 mt-2">
                    Save articles from your recent activities to access them
                    later
                  </p>
                </div>
              ) : (
                savedArticles.slice(0, 2).map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5 z-100"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`p-2 rounded ${
                            article.search.platform === "twitter"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}
                        >
                          {article.search.platform === "twitter" ? (
                            <BsTwitter />
                          ) : (
                            <BsReddit />
                          )}
                        </span>
                        <span className="font-medium text-stone-200">
                          {article.search.query}
                        </span>
                        <span className="hidden sm:block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          Saved
                        </span>
                      </div>
                      <p className="text-sm text-stone-400 mt-1">
                        Created At {formatDate(article.createdAt)}
                      </p>
                    </div>
                    <div
                      className="flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <UnsaveBtn articleId={article._id} />
                      {subscription.subscriptionTier !== "free" && (
                        <DownloadButton article={article} />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Modal */}
          <ActivityModal
            isOpen={showAllActivities}
            onClose={() => setShowAllActivities(false)}
            activities={articles}
            formatDate={formatDate}
            onArticleClick={handleArticleClick}
            subscriptionTier={subscription.subscriptionTier || "free"}
          />

          {/* Saved Articles Modal */}
          <SavedArticlesModal
            isOpen={showSavedArticles}
            onClose={() => setShowSavedArticles(false)}
            savedArticles={savedArticles}
            formatDate={formatDate}
            onArticleClick={handleArticleClick}
            subscriptionTier={subscription.subscriptionTier || "free"}
          />

          {/* New Article Content Modal */}
          <ArticleContentModal
            isOpen={showArticleContent}
            onClose={() => setShowArticleContent(false)}
            subscriptionTier={subscription.subscriptionTier || "free"}
            article={selectedArticle}
          />

          {/* Upgrade CTA */}
          {subscription.subscriptionTier !== "ultra" && (
            <div className="backdrop-blur-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 border border-blue-500/20 ">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Unlock Ultra Features
                </h2>
                <p className="mb-6 text-stone-300">
                  Get unlimited access to advanced analytics, real-time data,
                  and premium features.
                </p>
                <ul className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                  <li className="flex items-center gap-2 text-stone-300">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Upto 250 requests per month
                  </li>
                  <li className="flex items-center gap-2 text-stone-300">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Upto 200 tweets analysis per request
                  </li>
                  <li className="flex items-center gap-2 text-stone-300">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Access to DeepSeek r1-1776 model
                  </li>
                  <li className="flex items-center gap-2 text-stone-300">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <Link
                  to="/pricing"
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Upgrade to Ultra
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
