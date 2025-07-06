import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircleOutline,
  ErrorOutline,
  Email,
  Home,
  Refresh,
} from "@mui/icons-material";

// API function for email verification
const verifyEmailApi = async (token) => {
  // const response = await fetch(`/api/verify-email?token=${token}`, {
  //   method: "GET",
  //   credentials: "include", // if you need to send cookies
  // });

  // if (!response.ok) {
  //   throw new Error("Email verification failed");
  // }

  // return response.json();
  console.log("token");
  return true;
};

function EmailVerification() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useParams();
  // const token = null;

  // React Query for email verification
  const { data, isLoading, isError, error, refetch, isSuccess } = useQuery({
    queryKey: ["verifyEmail", token],
    queryFn: () => verifyEmailApi(token),
    enabled: !!token, // Only run if token exists
    retry: false, // Don't retry automatically for verification
    refetchOnWindowFocus: false,
  });

  // Optional: Mutation for manual retry
  const { mutate: retryVerification, isPending: isRetrying } = useMutation({
    mutationFn: () => verifyEmailApi(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verifyEmail", token] });
    },
  });

  const LoadingState = () => (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <Email className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-400" />
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
        Verifying Your Email
      </h1>
      <p className="text-gray-300 mb-6">
        Please wait while we verify your email address...
      </p>
      <div className="flex justify-center">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );

  const SuccessState = () => (
    <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircleOutline className="text-white text-4xl" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
        Email Verified Successfully!
      </h1>
      <p className="text-gray-300 mb-8">
        {data?.message || "Your email has been successfully verified!"}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/")}
          className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
        >
          <span className="relative flex items-center justify-center gap-2">
            <Home className="h-4 w-4" />
            Go to Dashboard
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
        </button>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <ErrorOutline className="text-white text-4xl" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-red-400">
        Verification Failed
      </h1>
      <p className="text-gray-300 mb-8">
        {error?.message ||
          "Failed to verify email. The link may have expired or is invalid."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => refetch()}
          disabled={isRetrying}
          className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative flex items-center justify-center gap-2">
            <Refresh
              className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
            />
            {isRetrying ? "Retrying..." : "Try Again"}
          </span>
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-full border-2 border-purple-400/50 text-purple-300 font-medium hover:border-purple-400 hover:text-white hover:bg-purple-500/10 transition-all duration-300"
        >
          <span className="flex items-center justify-center gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </span>
        </button>
      </div>
    </div>
  );

  // Handle missing token
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#141A4B] to-slate-900 flex items-center justify-center">
        <div className="bg-[#181A3B]/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-purple-500/20 text-center">
          <ErrorOutline className="text-red-400 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Invalid Verification Link
          </h1>
          <p className="text-gray-300 mb-6">
            No verification token found in the URL.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#141A4B] to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
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
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-[#181A3B]/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-purple-500/20">
          {/* Decorative gradient orbs */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative">
            {isLoading && <LoadingState />}
            {isSuccess && <SuccessState />}
            {isError && <ErrorState />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
