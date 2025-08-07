import { GitHub, Twitter, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-950 to-[#050A2D] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
              Senti Mind
            </h3>
            <p className="text-sm text-gray-400">
              Understand the Internet's Pulse with AI-powered analysis of social
              media conversations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-purple-500 transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/analyze/twitter"
                  className="text-gray-400 hover:text-purple-500 transition-colors text-sm"
                >
                  Twitter Analysis
                </a>
              </li>
              <li>
                <a
                  href="/analyze/reddit"
                  className="text-gray-400 hover:text-purple-500 transition-colors text-sm"
                >
                  Reddit Analysis
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-purple-500 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-400 hover:text-purple-500 transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-purple-500 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://x.com/SentiMind2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <Twitter />
              </a>
              {/* <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <GitHub />
              </a> */}
              {/* <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <LinkedIn />
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Senti Mind. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-sm text-gray-400 hover:text-purple-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-400 hover:text-purple-500 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cancellation-policy"
                className="text-sm text-gray-400 hover:text-purple-500 transition-colors"
              >
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
