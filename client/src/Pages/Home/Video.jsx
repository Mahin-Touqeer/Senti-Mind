function Video() {
  return (
    <div data-aos="fade" className="relative max-w-4xl mx-auto my-12  ">
      {/* Complete Rotating Pink to Purple Border */}
      <div className="relative md:rounded-3xl py-[3px]  md:px-[3px] shadow-2xl overflow-clip">
        {/* Animated rotating gradient background - covers entire border */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl w-15/10 h-20/10 "
          style={{
            background: `conic-gradient(
              from 0deg at 50% 50%,
              #EC4899 0deg,
              #D946EF 72deg,
              #C026D3 144deg,
              #A855F7 216deg,
              #8B5CF6 288deg,
              #EC4899 360deg
            )`,
            animation: "rotateBorder 3s linear infinite",
          }}
        />

        {/* Video container */}
        <div className="relative md:rounded-3xl overflow-hidden bg-[#1E1B4B] w-full h-full">
          <video
            src="/tutorial3.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto md:rounded-3xl object-cover block"
            controls={false}
          />
        </div>

        {/* Optional overlay */}
        <div className="pointer-events-none absolute inset-[3px] md:rounded-3xl bg-gradient-to-t from-black/20 via-transparent to-black/20 z-10" />
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes rotateBorder {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Video;
