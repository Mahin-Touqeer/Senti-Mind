import React from "react";
import { Check, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const PricingBox = ({
  price,
  plan,
  description,
  features,
  buttonText,
  popular = false,
}) => {
  const navigate = useNavigate();

  const handleClick = function () {
    if (plan === "FREE") {
      navigate("/analyze/twitter");
    } else {
      navigate("/pricing");
    }
  };

  return (
    <div
      className={`group relative w-80 ${popular ? "scale-105" : ""}`}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-purple-500 to-pink-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-[1px] shadow-2xl transition-all duration-300 ${
          popular ? "shadow-purple-500/25" : ""
        }`}
      >
        <div className="relative rounded-2xl bg-[#141A4B]/50 backdrop-blur-sm p-6 h-[520px] flex flex-col">
          {/* Gradient background effects */}
          <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
          <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />

          <div className="relative flex flex-col h-full">
            {/* Plan header */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-2">{plan}</h3>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-4xl font-bold text-white">{price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-sm text-gray-400">{description}</p>
            </div>

            {/* Features list - flex-grow to take remaining space */}
            <div className="space-y-3 mb-6 flex-grow">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      feature.available ? "bg-purple-500/20" : "bg-red-500/20"
                    }`}
                  >
                    {feature.available ? (
                      <Check className="h-3 w-3 text-purple-500" />
                    ) : (
                      <Close className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      feature.available
                        ? "text-gray-300"
                        : "text-gray-500 line-through"
                    }`}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button - positioned at bottom */}
            <div className="mt-auto">
              <button
                onClick={handleClick}
                className="cursor-pointer group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-px font-semibold text-white transition-all duration-300 "
              >
                <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                  <span className="relative">{buttonText}</span>
                </div>
              </button>

              {/* Money back guarantee */}
              <div className="mt-4 text-center">
                <span className="text-xs text-gray-400">
                  30-day money-back guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;
