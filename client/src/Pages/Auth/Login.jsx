import React, { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { changeAuthState, hideModal } from "../../Slices/modalSlice";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../Utils/api";
import { toastOptions } from "../../Utils/options.jsx";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton.jsx";

export default function LoginComponent() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  function showSuccess() {
    toast.success("Logged in successfully", {
      ...toastOptions,
      autoClose: 500,
      style: {
        backgroundColor: "#1e5c39", // any color you like
      },
      onClose: () => {
        dispatch(hideModal());
        navigate("/profile");
      },
    });
  }

  function showError(error) {
    toast.error(error.message, {
      ...toastOptions,
      style: {
        backgroundColor: "#fff", // any color you like
        color: "#000",
      },
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(["isLoggedIn"]);
      showSuccess();
    },
    onError: (error) => {
      showError(error);
    },
  });

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <>
      <ToastContainer />
      <div
        className="w-full max-w-md rounded-2xl border-0 p-6 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 alink"
        style={{
          backdropFilter: "blur(3rem)",
          boxShadow: "0px 0px 1px #9810FA",
        }}
      >
        <div className="w-full h-full absolute top-0 left-0 bg-[#45037F]/30 rounded-2xl -z-1" />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                disabled={isPending}
                {...register("email")}
                placeholder="Enter your email"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                disabled={isPending}
                {...register("password")}
                placeholder="Enter your password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-white">Remember me</span>
            </label>
            {/* <button
              type="button"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Forgot password?
            </button> */}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            disabled={isPending}
          >
            {isPending ? "Signing in . . . " : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Google Sign In */}
        <GoogleButton />

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-gray-400">Don't have an account? </span>
          <button
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors cursor-pointer"
            onClick={() => dispatch(changeAuthState(1))}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}
