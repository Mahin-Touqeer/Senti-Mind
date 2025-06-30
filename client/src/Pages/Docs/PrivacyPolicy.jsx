import { ArrowBackIosNew } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br overflow-hidden from-slate-950 via-[#141A4B] to-slate-900 py-16 px-2  flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto rounded-2xl bg-[#181A3B]/80 backdrop-blur-md shadow-xl border border-purple-500/10 p-6 sm:p-12 relative">
        {/* Decorative Gradient Orb */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={() => navigate(-1)}
          className="flex absolute items-center gap-2 px-3 sm:px-5 py-2  rounded-full sm:bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium sm:shadow hover:scale-102 sm:hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer "
        >
          <ArrowBackIosNew fontSize="small" sx={{ color: "pink" }} />
          <span className="hidden sm:block">Go Back</span>
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Effective Date: <span className="font-medium">[Insert Date]</span>
        </p>
        <div className="prose prose-invert max-w-none text-gray-300">
          <p>
            At <span className="text-purple-400 font-semibold">Senti Mind</span>
            , your privacy is important to us. This Privacy Policy describes how
            we collect, use, and protect your information when you use our
            website and services.
          </p>
          <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            1. Information We Collect
          </h2>
          <ul>
            <li>
              <b>Personal Information:</b> Name and email when you sign up
              (directly or via Google).
            </li>
            <li>
              <b>Authentication Data:</b> From Google Sign-In (e.g., name,
              email).
            </li>
            <li>
              <b>User Inputs:</b> Hashtags, queries, and Twitter handles you
              enter.
            </li>
            <li>
              <b>Generated Content:</b> AI-generated articles based on your
              inputs.
            </li>
            <li>
              <b>Payment Information:</b> Processed securely via Razorpay (we do
              not store card details).
            </li>
            <li>
              <b>Technical Data:</b> IP address, device info, browser type, and
              cookies (for analytics and session management).
            </li>
          </ul>
          <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            2. How We Use Your Information
          </h2>
          <ul>
            <li>Provide, personalize, and improve our services</li>
            <li>Manage your subscriptions and billing</li>
            <li>Communicate service-related updates</li>
            <li>Enable saving and downloading of generated content</li>
            <li>Ensure legal compliance and prevent abuse</li>
          </ul>
          <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            3. Third-Party Services
          </h2>
          <ul>
            <li>
              <b>Google Authentication</b> (for login)
            </li>
            <li>
              <b>Gemini API (Google AI)</b> (for article generation)
            </li>
            <li>
              <b>Razorpay</b> (for secure payments)
            </li>
            <li>
              <b>Analytics tools</b> (e.g., Google Analytics)
            </li>
          </ul>
          <p>
            These services may collect and process data as per their own privacy
            policies.
          </p>
          <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            4. Data Security
          </h2>
          <p>
            We implement modern security measures to protect your data. However,
            no method is 100% secure, and we cannot guarantee absolute security.
          </p>
          <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            5. Your Rights
          </h2>
          <ul>
            <li>Access, update, or delete your personal data</li>
            <li>Cancel your subscription at any time</li>
            <li>
              Contact us regarding privacy at{" "}
              <a href="mailto:support@senti-mind.com" className="text-pink-400">
                sentimind2025@gmail.com
              </a>
            </li>
          </ul>
          <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            6. Cookies
          </h2>
          <p>
            We use cookies for session management and analytics. You can control
            cookies through your browser settings.
          </p>
          <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted here with a new effective date.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
