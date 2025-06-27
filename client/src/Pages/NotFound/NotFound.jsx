import { Link } from "react-router-dom";
import { Home, TrendingUp } from "@mui/icons-material";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden alink">
      {/* Background texture and effects - matching Hero section */}
      <div className="absolute inset-0 z-10 opacity-20">
        {/* Main gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#141A4B] to-slate-900"></div> */}

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20  "
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Subtle lines pattern with fade */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 35%, rgba(139, 92, 246, 0.4) 50%, transparent 65%), 
              linear-gradient(-45deg, transparent 35%, rgba(236, 72, 153, 0.4) 50%, transparent 65%)
            `,
            backgroundSize: "60px 60px",
            maskImage: `radial-gradient(ellipse at center, black 40%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 40%, transparent 80%)`,
          }}
        ></div>

        {/* Floating particles effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-ping delay-500"></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-ping delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-300/40 rounded-full animate-ping delay-1500"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* 404 Number - Reduced size */}
        <div className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-none mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 text-transparent bg-clip-text">
            404
          </span>
        </div>

        {/* Main heading - Reduced size */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Page Not Found
          </span>
        </h1>

        {/* Subtitle - Reduced size */}
        <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          <br className="hidden sm:block" />
          Let's get you back on track.
        </p>

        {/* Action Buttons - Reduced size */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 ">
          <Link to="/" className="w-full sm:w-auto">
            <button className="group relative w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-2xl hover:shadow-purple-500/25 hover:scale-102 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50 active:scale-95 cursor-pointer">
              <span className="relative flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              {/* Animated background effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </button>
          </Link>

          <Link to="/analyze/twitter" className="w-full sm:w-auto">
            <button className="group w-full sm:w-auto px-5 py-2.5 rounded-full border-2 border-purple-400/50 text-purple-300 font-medium hover:border-purple-400 hover:text-white hover:bg-purple-500/10 transition-all duration-300 cursor-pointer">
              <span className="flex items-center justify-center gap-2 ">
                <TrendingUp className="h-4 w-4" />
                Start Analyzing
              </span>
            </button>
          </Link>
        </div>

        {/* Help text - Reduced size */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@sentimind.com"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
            >
              sentimind2025@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
