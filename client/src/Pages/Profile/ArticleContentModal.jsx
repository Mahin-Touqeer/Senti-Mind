import NewSaveBtn from "./NewSaveBtn";
import { BsTwitter, BsReddit } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import styles from "./profile.module.css";
import ReactMarkdown from "react-markdown";
import UnsaveBtn from "./UnsaveBtn";
import DownloadButton from "./DownloadButton";
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const ArticleContentModal = ({
  isOpen,
  onClose,
  article,
  subscriptionTier,
}) => {
  if (!isOpen || !article) return null;

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
            <div className="flex items-center gap-3">
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
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {article.search.query}
                </h2>
                <p className="text-sm text-stone-400">
                  {formatDate(article.createdAt)}
                </p>
              </div>
            </div>
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
          className={`${styles["modal-scroll"]} p-6 overflow-y-auto max-h-[60vh]`}
        >
          <div className="prose prose-invert max-w-none">
            <div className="text-stone-200 whitespace-pre-wrap leading-relaxed">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-[2px] border-t border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {article.saved ? (
                <UnsaveBtn articleId={article._id} />
              ) : (
                <NewSaveBtn articleId={article._id} />
              )}
              {subscriptionTier !== "free" && (
                <DownloadButton article={article} />
              )}
            </div>
            {/* <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
