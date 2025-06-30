import { useQuery } from "@tanstack/react-query";
import PricingBox from "./PricingBox";
import { Link } from "react-router-dom";
import axios from "axios";
import { planIds } from "../../Utils/businessModel";
const { VITE_IP_URL } = import.meta.env;

function Pricing() {
  const { data: c, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const authorization = await axios.get(VITE_IP_URL);
        const c = authorization.data.country === "IN" ? "IN" : "US";
        return c || "US";
      } catch (err) {
        console.log("err: " + err);
        console.log("Error occured in Authorization");
        return false;
      }
    },
    queryKey: ["authorization"],
  });
  return (
    <div className="my-32 alink">
      <h1
        className="text-center text-4xl font-extrabold mb-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <span className="bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
          Simple Pricing
        </span>
      </h1>
      <p
        className="text-center text-gray-400 text-lg mb-16"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        Choose the plan that fits your needs
      </p>

      <div className="flex justify-center flex-wrap gap-8">
        <PricingBox
          price={isLoading ? "$0" : planIds[c]["free"]}
          plan="FREE"
          description="Perfect for getting started"
          features={[
            { text: "10 searches", available: true },
            { text: "upto 30 tweets per search", available: true },
            { text: "Basic Reddit analysis", available: true },
            { text: "Standard AI insights", available: true },
            { text: "PDF/Word export", available: false },
            { text: "Custom date ranges", available: false },
            { text: "Priority support", available: false },
          ]}
          buttonText="Get Started"
        />

        <PricingBox
          price={isLoading ? "$7.99" : planIds[c]["basic"]}
          plan="BASIC"
          description="For regular content creators"
          features={[
            { text: "100 searches per month", available: true },
            { text: "upto 75 tweets per search", available: true },
            { text: "Enhanced Reddit analysis", available: true },
            { text: "Advanced AI insights", available: true },
            { text: "PDF/Word export", available: true },
            { text: "Custom date ranges", available: false },
            { text: "Priority support", available: false },
          ]}
          buttonText="Choose Basic"
          popular={true}
        />

        <PricingBox
          price={isLoading ? "$17.99" : planIds[c]["pro"]}
          plan="PRO"
          description="For professional use"
          features={[
            { text: "250 searches", available: true },
            { text: "upto 150 tweets per search", available: true },
            { text: "Full Reddit access", available: true },
            { text: "Premium AI models", available: true },
            { text: "PDF/Word export", available: true },
            { text: "Custom date ranges", available: true },
            { text: "Priority support", available: true },
          ]}
          buttonText="Choose Pro"
        />
      </div>
      <div className="text-center mt-16">
        <Link
          to="/pricing"
          aria-label="View detailed pricing plans and features"
        >
          <button
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50 active:scale-95 cursor-pointer"
            type="button"
          >
            <span className="relative flex items-center justify-center gap-2">
              View Detailed Pricing
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Pricing;
