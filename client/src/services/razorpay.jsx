import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../Utils/options";
import { useNavigate } from "react-router-dom";
const { VITE_BACKEND_URL, VITE_IP_URL, VITE_RAZORPAY_KEY_ID } = import.meta.env;
export const handlePayment = async (plan) => {
  try {
    const authorization = await axios.get(VITE_IP_URL);
    const { data } = await axios.post(
      `${VITE_BACKEND_URL}/subscribe/create-subscription`,
      { plan, authorization },
      { withCredentials: true }
    );
    const options = {
      key: VITE_RAZORPAY_KEY_ID,
      subscription_id: data.subscriptionId,
      name: "Senti Mind",
      description: `Subscription Plan: ${data.plan[0].toUpperCase()}${data.plan.slice(
        1
      )}`,
      image:
        "https://res.cloudinary.com/dqx3jfx7m/image/upload/c_crop,w_700,h_700,ar_1:1/v1750747703/Sentimind_Logo_inverted_fcmr4f.png",
      handler: async function (response) {
        try {
          console.log(response);
          await axios.post(
            `${VITE_BACKEND_URL}/subscribe/verify-signature`,
            response,
            {
              withCredentials: true,
            }
          );
          toast.success("Payment Succesfull !", {
            ...toastOptions,
            autoClose: 500,
            style: {
              backgroundColor: "#1e5c39", // any color you like
            },
          });
        } catch (err) {
          console.log(err);
          toast.error("Signature verification error", {
            ...toastOptions,
            style: {
              backgroundColor: "#fff", // any color you like
              color: "#000",
            },
          });
        }
      },
      prefill: {
        name: data.username,
        email: data.email,
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment Error:", error);
    if (error.response) {
      toast.error(error.response.data.message, {
        ...toastOptions,
        style: {
          backgroundColor: "#fff", // any color you like
          color: "#000",
        },
      });
    } else {
      toast.error("Failed to initate subscription", {
        ...toastOptions,
        style: {
          backgroundColor: "#fff", // any color you like
          color: "#000",
        },
      });
    }
  }
};
