import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiBookmark, FiCheck, FiLoader, FiX } from "react-icons/fi";
import { saveArticle } from "../../Utils/api";

export default function NewSaveBtn({ articleId, savedValue = true }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const queryClient = useQueryClient();
  const {
    mutate,
    data,
    isPending,
    error,
    isError: mutationError,
  } = useMutation({
    mutationFn: async (object) => {
      await saveArticle(object);
    },
    onSuccess: () => {
      setIsSuccess(true);
      setIsError(false);
      // Reset success state after animation
      setTimeout(() => {
        setIsSuccess(false);
        queryClient.invalidateQueries(["userInfo"]);
      }, 2000);
    },
    onError: () => {
      setIsError(true);
      setIsSuccess(false);
      // Reset error state after showing feedback
      setTimeout(() => setIsError(false), 2000);
    },
  });

  function handleSubmit() {
    if (isPending) return; // Prevent multiple clicks during loading
    mutate({ articleId, savedValue });
  }

  // Determine button state and styling
  const getButtonState = () => {
    if (isPending) {
      return {
        icon: FiLoader,
        className:
          "p-2 rounded-full transition-all duration-300 text-blue-400 bg-blue-400/10 cursor-wait",
        iconClassName: "w-5 h-5 animate-spin",
      };
    }

    if (isSuccess) {
      return {
        icon: FiCheck,
        className:
          "p-2 rounded-full transition-all duration-300 text-green-400 bg-green-400/10 scale-110",
        iconClassName: "w-5 h-5",
      };
    }

    if (isError) {
      return {
        icon: FiX,
        className:
          "p-2 rounded-full transition-all duration-300 text-red-400 bg-red-400/10 animate-pulse",
        iconClassName: "w-5 h-5",
      };
    }

    // Check if article is already saved (you might want to pass this as a prop)
    const isSaved = data?.saved || false;

    if (isSaved) {
      return {
        icon: FiBookmark,
        className:
          "p-2 hover:bg-amber-400/10 rounded-full transition-all duration-300 text-amber-400 hover:text-amber-300 hover:scale-105",
        iconClassName: "w-5 h-5 fill-current",
      };
    }

    return {
      icon: FiBookmark,
      className:
        "p-2 hover:bg-white/10 rounded-full transition-all duration-300 text-stone-400 hover:text-stone-200 hover:scale-105",
      iconClassName: "w-5 h-5",
    };
  };

  const { icon: Icon, className, iconClassName } = getButtonState();

  // Tooltip text based on state
  const getTooltipText = () => {
    if (isPending) return "Saving...";
    if (isSuccess) return "Saved!";
    if (isError) return "Failed to save";
    return data?.saved ? "Remove from saved" : "Save article";
  };

  return (
    <div className="relative group">
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className={className}
        aria-label={getTooltipText()}
      >
        <Icon className={iconClassName} />
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        {getTooltipText()}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
}
