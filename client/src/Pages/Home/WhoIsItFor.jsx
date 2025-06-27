import {
  BusinessCenter,
  Campaign,
  Psychology,
  School,
  TrendingUp,
} from "@mui/icons-material";
import NewspaperIcon from "@mui/icons-material/Newspaper";

function WhoIsItFor() {
  const audiences = [
    {
      icon: <NewspaperIcon sx={{ fontSize: 40, color: "#8F37FF" }} />,
      title: "Journalists",
      description: "Track breaking news and public sentiment",
    },
    {
      icon: <BusinessCenter sx={{ fontSize: 40, color: "#8F37FF" }} />,
      title: "Business Analysts",
      description:
        "Track market trends, consumer sentiment, & competitor analysis",
    },

    {
      icon: <Campaign sx={{ fontSize: 40, color: "#8F37FF" }} />,
      title: "Digital Marketers",
      description:
        "Monitor campaign performance, audience reactions, and trends",
    },
    {
      icon: <Psychology sx={{ fontSize: 40, color: "#8F37FF" }} />,
      title: "Researchers",
      description: "Analyze social trends for academic/market research",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: "#8F37FF" }} />,
      title: "Content Creators",
      description:
        "Stay ahead & understand what your audience is talking about",
    },
    {
      icon: <School sx={{ fontSize: 40, color: "#8F37FF" }} />,
      title: "Students",
      description:
        "Analyze social media data & gain insights into public discourse.",
    },
  ];

  return (
    <div className="my-32">
      <h1
        className="text-center text-4xl font-extrabold mb-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <span className="bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
          Who Is It For?
        </span>
      </h1>
      <p
        className="text-center text-gray-400 text-lg mb-16"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        Discover how our platform empowers different professionals
      </p>

      <div className="flex flex-wrap justify-center md:justify-around lg:justify-between">
        {audiences.map((audience, index) => (
          <div
            key={audience.title}
            className="group relative rounded-2xl bg-[#141A4B] p-6 overflow-hidden h-[188px] w-[329px] mr-4 mb-8"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={index * 100}
          >
            <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
            <div className="relative flex flex-col items-center text-center bg-ambr-100">
              <div className="mb-4">{audience.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {audience.title}
              </h3>
              <p className="text-gray-400">{audience.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhoIsItFor;
