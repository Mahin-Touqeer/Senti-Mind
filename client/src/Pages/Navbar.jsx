import { useDispatch } from "react-redux";
import { changeAuthState, displayModal } from "../Slices/modalSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logout } from "../Utils/api";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn as isLoggedInApi, getInfo } from "../Utils/api";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { Menu, Close } from "@mui/icons-material";

function Navbar() {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: isLoggedIn, isPending } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: isLoggedInApi,
    refetchInterval: undefined,
  });
  const { data: userInfo, isLoading: isInfoPending } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getInfo,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/10 border-b border-purple-500/10 z-50 alink">
        <div className="px-4 md:px-6 m-auto max-w-[1050px] flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2 py-3">
            <img src="/Logo.png" alt="logo" className="h-8 opacity-90" />
            <h1 className="text-white text-xl opacity-90 font-semibold">
              Senti Mind
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-purple-300 transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/analyze/twitter"
              className="text-white hover:text-purple-300 transition-colors duration-300 font-medium"
            >
              Products
            </Link>
            {isLoggedIn && (
              <Link
                to="/profile"
                className="text-white hover:text-purple-300 transition-colors duration-300 font-medium"
              >
                Profile
              </Link>
            )}
            {/* <Link
              to="/blog"
              className="text-white hover:text-purple-300 transition-colors duration-300 font-medium"
            >
              Blog
            </Link> */}
            <Link
              to="/pricing"
              className="text-white hover:text-purple-300 transition-colors duration-300 font-medium"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn === false || isPending || isInfoPending ? (
              <Loader />
            ) : !isLoggedIn ? (
              <div className="flex gap-4">
                <button
                  className="text-white cursor-pointer hover:text-purple-300 transition-colors duration-300 font-medium"
                  onClick={() => {
                    dispatch(displayModal());
                    dispatch(changeAuthState(0));
                  }}
                >
                  Sign In
                </button>
                <button
                  className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25"
                  onClick={() => {
                    dispatch(displayModal());
                    dispatch(changeAuthState(1));
                  }}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Logout />
                <Avatar
                  className="cursor-pointer hover:ring-2 hover:ring-purple-500/50 transition-all duration-300"
                  style={{ backgroundColor: "#8F37FF" }}
                  src={userInfo.profilePicture}
                >
                  {userInfo?.username?.slice(0, 1).toUpperCase()}
                </Avatar>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Auth Icons */}
            {isPending || isInfoPending ? (
              <Loader />
            ) : !isLoggedIn ? (
              <button
                className="text-white hover:text-purple-300 transition-colors duration-300 text-sm font-medium"
                onClick={() => {
                  dispatch(displayModal());
                  dispatch(changeAuthState(0));
                }}
              >
                Sign In
              </button>
            ) : (
              <Avatar
                className="cursor-pointer hover:ring-2 hover:ring-purple-500/50 transition-all duration-300"
                style={{ backgroundColor: "#8F37FF", width: 32, height: 32 }}
              >
                {userInfo?.username?.slice(0, 1).toUpperCase()}
              </Avatar>
            )}

            <button
              className="menu-button text-white hover:text-purple-300 transition-colors duration-300 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-[#141A4B] to-[#0A0F2E] backdrop-blur-xl border-l border-purple-500/20 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
          <div className="flex items-center ml-4">
            <h1 className="text-white text-lg font-semibold">Menu</h1>
          </div>
          <button
            onClick={closeMobileMenu}
            className="text-white hover:text-purple-300 transition-colors duration-300 p-1 alink"
          >
            <Close />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div
          className="flex flex-col"
          style={{ height: "calc(100% - 82.1px)" }}
        >
          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <div className="space-y-1 px-6">
              <Link
                to="/"
                className="block py-3 text-white hover:text-purple-300 hover:bg-purple-500/10 rounded-lg px-4 transition-all duration-300 font-medium"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/analyze/twitter"
                className="block py-3 text-white hover:text-purple-300 hover:bg-purple-500/10 rounded-lg px-4 transition-all duration-300 font-medium"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
              {isLoggedIn && (
                <Link
                  to="/profile"
                  className="block py-3 text-white hover:text-purple-300 hover:bg-purple-500/10 rounded-lg px-4 transition-all duration-300 font-medium"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              )}
              {/* <Link
                to="/blog"
                className="block py-3 text-white hover:text-purple-300 hover:bg-purple-500/10 rounded-lg px-4 transition-all duration-300 font-medium"
                onClick={closeMobileMenu}
              >
                Blog
              </Link> */}
              <Link
                to="/pricing"
                className="block py-3 text-white hover:text-purple-300 hover:bg-purple-500/10 rounded-lg px-4 transition-all duration-300 font-medium"
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Mobile Auth Section */}
          <div className="border-t border-purple-500/20 p-6">
            {!isLoggedIn ? (
              <div className="space-y-3">
                <button
                  className="w-full py-3 text-white border border-purple-500/50 rounded-lg hover:bg-purple-500/10 transition-all duration-300 font-medium"
                  onClick={() => {
                    dispatch(displayModal());
                    dispatch(changeAuthState(0));
                    closeMobileMenu();
                  }}
                >
                  Sign In
                </button>
                <button
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg"
                  onClick={() => {
                    dispatch(displayModal());
                    dispatch(changeAuthState(1));
                    closeMobileMenu();
                  }}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar style={{ backgroundColor: "#8F37FF" }}>
                    {userInfo?.username?.slice(0, 1).toUpperCase()}
                  </Avatar>
                  <span className="text-white font-medium">
                    {userInfo?.username}
                  </span>
                </div>
                <Logout onLogout={closeMobileMenu} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

import { LogoutOutlined } from "@mui/icons-material";

function Logout({ onLogout }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const { mutate, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await logout();
      navigate("/");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isLoggedIn"] });
      if (onLogout) onLogout();
    },
  });
  return (
    <div className="relative ">
      <button
        onClick={mutate}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 font-medium text-sm border border-transparent cursor-pointer hover:border-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoggingOut}
        aria-label="Sign out of your account"
      >
        <LogoutOutlined
          className={`h-4 w-4 transition-transform duration-300 ${
            isLoggingOut ? "" : "group-hover:scale-110"
          }`}
        />
        <span className="hidden sm:inline">
          {isLoggingOut ? "Signing out..." : "Logout"}
        </span>
      </button>

      {/* Professional Tooltip */}
      <div
        className={`absolute md:hidden bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg border border-gray-700 whitespace-nowrap transition-all duration-200 z-50 ${
          showTooltip && !isLoggingOut
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-1"
        }`}
      >
        Sign out of your account
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
      </div>
    </div>
  );
}
