import React, { useState } from "react";
import { BsTwitter, BsReddit } from "react-icons/bs";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import styles from "./profile.module.css";
import NewSaveBtn from "./NewSaveBtn";
import DownloadButton from "./DownloadButton";
const ActivityModal = ({
  isOpen,
  onClose,
  activities,
  formatDate,
  onArticleClick,
  subscriptionTier,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredActivities = activities.filter(
    (activity) =>
      activity.search.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.search.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed h-screen inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-4xl max-h-[80vh] m-4 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-white/10 ${styles["modal-scroll"]}`}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">
              All Activities
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-stone-200 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div
          className={`p-6 overflow-y-auto max-h-[60vh] ${styles["modal-scroll"]}`}
        >
          {/* Search Input */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search activities... eg. #TechNews, Twitter, Reddit"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-stone-400 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Activities List */}
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8 text-stone-400">
                No activities found matching your search
              </div>
            ) : (
              filteredActivities.map((activity, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
                    onClick={() => onArticleClick && onArticleClick(activity)}
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
                        {subscriptionTier !== "free" && (
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

        {/* Modal Footer */}
        {/* <div className=" border-t border-white/10">
          <div className="flex px-7 justify-end items-center">
            <button
              onClick={onClose}
              className="px-4 my-1 py-1 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ActivityModal;

function SaveBtn({ articleId }) {
  return (
    <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-stone-200">
      <FiRefreshCw className="w-5 h-5" />
    </button>
  );
}
