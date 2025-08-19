import React from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Phone } from "lucide-react";

function ContactUs() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-[#141A4B] to-slate-900 py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto rounded-2xl bg-[#181A3B]/80 backdrop-blur-md shadow-xl border border-purple-500/10 p-6 sm:p-12 relative">
        {/* Decorative Gradient Orbs */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 sm:px-2 md:px-3 py-2 mb-6 rounded-full md:bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:scale-102 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer absolute"
        >
          <ArrowBackIosNewIcon fontSize="small" />
          <span className="hidden md:block">Go Back</span>
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Contact Us
        </h1>
        <p className="text-center text-gray-400 mb-8 text-base">
          We're here to help! Reach out to our team for support, feedback, or
          partnership inquiries.
        </p>

        <div className="flex flex-col items-center gap-4 w-full">
          {/* Email 1 */}
          <div className="flex items-center gap-3 bg-[#141A4B]/70 px-6 py-4 rounded-xl shadow border border-purple-500/10 w-full">
            <EmailOutlinedIcon className="text-purple-400" />
            <a
              href="mailto:support@sentimind.in"
              className="text-lg font-medium text-purple-300 hover:text-pink-400 transition-colors duration-200"
            >
              support@sentimind.in
            </a>
          </div>
          {/* Email 2 */}
          <div className="flex items-center gap-3 bg-[#141A4B]/70 px-6 py-4 rounded-xl shadow border border-purple-500/10 w-full">
            <EmailOutlinedIcon className="text-purple-400" />
            <a
              href="mailto:touqeermahin915@gmail.com"
              className="text-lg font-medium text-purple-300 hover:text-pink-400 transition-colors duration-200"
            >
              touqeermahin915@gmail.com
            </a>
          </div>
          {/* Phone */}
          {/* <div className="flex items-center gap-3 bg-[#141A4B]/70 px-6 py-4 rounded-xl shadow border border-purple-500/10 w-full">
            <Phone color="#C27AFF" />
            <a
              href="tel:8982228221"
              className="text-lg font-medium text-purple-300 hover:text-pink-400 transition-colors duration-200"
            >
              +91 6913807306
            </a>
          </div> */}
          <p className="text-gray-400 text-sm mt-4 text-center">
            We aim to respond within 24 hours on business days.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
