import DownloadButton from "./DownloadButton";
import styles from "./profile.module.css";
import UnsaveBtn from "./UnsaveBtn";
import { BsTwitter, BsReddit } from "react-icons/bs";

import {
  FiDownload,
  FiShare2,
  FiRefreshCw,
  FiTrendingUp,
  FiChevronRight,
  FiBookmark,
} from "react-icons/fi";

export const SavedArticlesModal = ({
  isOpen,
  onClose,
  savedArticles,
  formatDate,
  onArticleClick,
  subscriptionTier,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed h-screen inset-0 z-50 flex items-center justify-center `}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-4xl max-h-[80vh] m-4 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-white/10 ${styles["modal-scroll"]}`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FiBookmark className="text-blue-400" />
              Saved Articles ({savedArticles.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-stone-200"
            >
              ✕
            </button>
          </div>
        </div>
        <div
          className={`${styles["modal-scroll"]} p-6 overflow-y-auto max-h-[60vh]`}
        >
          <div className="space-y-4">
            {savedArticles.length === 0 ? (
              <div className="text-center py-8">
                <FiBookmark className="w-12 h-12 text-stone-500 mx-auto mb-4" />
                <p className="text-stone-400">No saved articles yet</p>
              </div>
            ) : (
              savedArticles.map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5"
                  onClick={() => onArticleClick && onArticleClick(article)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
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
                    </div>
                    <p className="text-sm text-stone-400">
                      Saved on {formatDate(article.createdAt)}
                    </p>
                  </div>
                  <div
                    className="flex gap-2 ml-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <UnsaveBtn articleId={article._id} />
                    {subscriptionTier !== "free" && (
                      <DownloadButton article={article} />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
