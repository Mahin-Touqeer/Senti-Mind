import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function CancellationPolicy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-[#141A4B] to-slate-900 py-16 px-2 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#181A3B]/80 backdrop-blur-md shadow-xl border border-purple-500/10 p-6 sm:p-12 relative">
        {/* Decorative Gradient Orbs */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <ArrowBackIosNewIcon fontSize="small" />
          Go Back
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Cancellation Policy
        </h1>
        <div className="prose prose-invert max-w-none text-gray-300 text-base mt-6">
          <p>
            At <span className="text-purple-400 font-semibold">Senti Mind</span>
            , subscriptions are billed monthly for 12 months. After 12 months,
            you will need to re-subscribe to continue your plan.
          </p>
          <ul>
            <li>
              <b>Cancel Anytime:</b> You can cancel your subscription at any
              time from the billing page.
            </li>
            <li>
              <b>Access Until Next Billing Date:</b> After cancellation, your
              plan benefits remain active until your current billing cycle ends.
            </li>
            <li>
              <b>No Immediate Refunds:</b> We do not offer refunds for the
              remaining period of your subscription. Access continues until the
              end of the paid month.
            </li>
            <li>
              <b>Re-Subscribe:</b> After 12 months, you must re-subscribe to
              continue using Senti Mind.
            </li>
            <li>
              <b>Questions?</b> Contact us at{" "}
              <a
                href="mailto:sentimind2025@gmail.com"
                className="text-purple-300 hover:text-pink-400 transition-colors"
              >
                sentimind2025@gmail.com
              </a>
              .
            </li>
          </ul>
          <p>
            For more details, please refer to our{" "}
            <a
              href="/terms"
              className="text-purple-300 hover:text-pink-400 transition-colors"
            >
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default CancellationPolicy;
