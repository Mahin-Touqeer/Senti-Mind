import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FiAlertCircle, FiCheck, FiMail, FiRefreshCw } from "react-icons/fi";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const EmailVerificationBanner = ({ email }) => {
  const [resendStatus, setResendStatus] = useState(null);
  const { isPending: isResending, mutate } = useMutation({
    mutationFn: async () => {
      axios.get(`${VITE_BACKEND_URL}/auth/send-email-token`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      setResendStatus("success");
      setTimeout(() => setResendStatus(null), 10000);
    },
    onError: () => {
      setResendStatus("error"), setTimeout(() => setResendStatus(null), 10000);
    },
  });

  const onResendEmail = function () {
    mutate();
  };

  return (
    <div className="backdrop-blur-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-6 border border-amber-500/30 relative overflow-hidden -mt-8">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
              <FiMail className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
              <FiAlertCircle className="w-5 h-5 text-amber-400" />
              Email Verification Required
            </h2>
            <p className="text-stone-200 mb-4">
              We've sent a verification link to{" "}
              <strong className="text-amber-300">{email}</strong>. Please check
              your email and click the verification link to unlock full access
              to SentiMind.
            </p>

            {/* Status Messages */}
            {resendStatus === "success" && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-300 text-sm flex items-center gap-2">
                  <FiCheck className="w-4 h-4" />
                  Verification email sent successfully! Check your inbox.
                </p>
              </div>
            )}

            {resendStatus === "error" && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-sm flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4" />
                  Failed to send verification email. Please try again.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={onResendEmail}
                disabled={isResending}
                className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center cursor-pointer"
              >
                {isResending ? (
                  <>
                    <FiRefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiMail className="w-4 h-4" />
                    Resend Verification Email
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 pt-4 border-t border-amber-500/20">
          <div className="flex items-center gap-3 text-sm text-stone-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Account Created</span>
            </div>
            <div className="flex-1 h-px bg-amber-500/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-amber-300">Email Verification</span>
            </div>
            <div className="flex-1 h-px bg-stone-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-stone-600 rounded-full"></div>
              <span>Full Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
