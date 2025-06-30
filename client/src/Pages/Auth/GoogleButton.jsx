import axios from "axios";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { toastOptions } from "../../Utils/options";
import { useDispatch } from "react-redux";
import { hideModal } from "../../Slices/modalSlice";
import { useNavigate } from "react-router-dom";
const VITE_BACKEND_URL=  import.meta.env.VITE_BACKEND_URL

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function GoogleButtonDummy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleResponse(response) {
    console.log(response);
    if (response && response.code) {
      try {
        await googleAuthHandler(response.code);
        toast.success("Logged in successfully", {
          ...toastOptions,
          autoClose: 500,
          style: {
            backgroundColor: "#1e5c39", // any color you like
          },
          onClose: () => {
            dispatch(hideModal());
            navigate("/analyze/twitter");
          },
        });
      } catch (err) {
        toast.error(err.message, {
          ...toastOptions,
          style: {
            backgroundColor: "#fff", // any color you like
            color: "#000",
          },
        });
      }
    }
  }
  const googleLogin = useGoogleLogin({
    onSuccess: handleResponse,
    onError: handleResponse,
    flow: "auth-code",
  });
  return (
    <button
      onClick={googleLogin}
      className="w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span>{"Sign in with Google"}</span>
    </button>
  );
}
function GoogleButton() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleButtonDummy />
    </GoogleOAuthProvider>
  );
}
export default GoogleButton;

async function googleAuthHandler(code) {
  await axios.post(
    `${VITE_BACKEND_URL}/auth/google`,
    {
      code,
    },
    {
      withCredentials: true,
    }
  );
}
