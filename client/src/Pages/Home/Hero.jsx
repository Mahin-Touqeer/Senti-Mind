import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative pt-24 pb-16 lg:pt-24 xl:pt-36 text-center p-4 font-[700] overflow-hidden">
      {/* Background texture and effects */}
      <div className="absolute inset-0 z-10">
        {/* Subtle lines pattern */}
        <div
          className="absolute inset-0 opacity-10"
          data-aos="fade"
          data-aos-delay="750"
          style={{
            backgroundImage: `
      linear-gradient(45deg, transparent 40%, rgba(139, 92, 246, 0.025) 50%, transparent 60%), 
      linear-gradient(-45deg, transparent 40%, rgba(236, 72, 153, 0.025) 50%, transparent 60%)
    `,
            backgroundSize: "150px 150px",
            maskImage: `radial-gradient(ellipse at center, black 40%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 40%, transparent 80%)`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1
          className="text-[3.5rem]/[4.5rem] text-left sm:text-center lg:text-[4rem]/[5rem] xl:text-[4.5rem]/[6rem]"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <span
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Understand <br className="sm:hidden" /> the Internet's
          </span>
          <br />
          <span
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            Pulse - Instantly
          </span>
        </h1>
        <p
          className="text-xl my-4 text-gray-400 text-left  sm:text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          Discover real-time trends, public opinions, and updates
          <br className="hidden md:block" /> from Twitter and Reddit
        </p>
        <Link to="/analyze/twitter">
          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="700"
            className="cursor-pointer group/btn relative md:w-full max-w-[350px] mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
          >
            <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
              <span className="relative flex items-center justify-center gap-2">
                Start Analyzing now
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                >
                  <path
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
