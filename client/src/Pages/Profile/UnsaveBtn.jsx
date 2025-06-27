import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiBookmark, FiCheck, FiLoader, FiX } from "react-icons/fi";
import { saveArticle } from "../../Utils/api";

export default function UnsaveBtn({ articleId, savedValue = false }) {
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
      setTimeout(() => {
        setIsSuccess(false);
        queryClient.invalidateQueries(["userInfo"]);
      }, 2000);
    },
    onError: () => {
      setIsError(true);
      setIsSuccess(false);
      setTimeout(() => setIsError(false), 2000);
    },
  });

  function handleSubmit(e) {
    console.log(e);
    console.log("working");

    if (isPending) return;
    mutate({ articleId, savedValue });
  }

  const getButtonState = () => {
    if (isPending) {
      return {
        icon: FiLoader,
        className:
          "p-2 rounded-full transition-all duration-300 text-red-400 bg-red-400/10 cursor-wait",
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

    // Filled bookmark for unsave (indicating it's currently saved)
    return {
      icon: FiBookmark,
      className:
        "p-2 hover:bg-red-400/10 rounded-full transition-all duration-300 text-red-400 hover:text-red-300 hover:scale-105",
      iconClassName: "w-5 h-5 fill-current",
    };
  };

  const { icon: Icon, className, iconClassName } = getButtonState();

  const getTooltipText = () => {
    if (isPending) return "Removing...";
    if (isSuccess) return "Removed!";
    if (isError) return "Failed to remove";
    return "Remove from saved";
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

      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        {getTooltipText()}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
}
