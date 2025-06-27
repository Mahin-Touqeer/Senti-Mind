import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
function Features() {
  return (
    <div className="my-32">
      <h1
        className="text-center text-4xl font-extrabold "
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <span className="bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
          Key Features
        </span>
      </h1>
      <div className="flex justify-around lg:justify-between w-full lg:w-8/10 m-auto flex-wrap">
        <div
          className="w-[400px] h-auto  flex flex-wrap items-center flex-col text-center gap-2 py-4 my-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="flex">
            <img src="reddit.svg" alt="one" className="w-[70px] m-auto" />
            <img src="twitter.svg" alt="one" className="w-[60px] m-auto" />
          </div>
          <h1 className="text-xl font-extrabold ">Dual Platform Analysis</h1>
          <h2 className=" text-gray-400">
            Analyze both Reddit and Twitter content
          </h2>
        </div>
        <div
          className="w-[400px] h-auto  flex flex-wrap items-center flex-col text-center gap-2 py-4 my-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <ArticleRoundedIcon
            sx={{
              width: 70,
              height: 70,
              color: "#8F37FF",
            }}
          />
          <h1 className="text-xl font-extrabold ">Advanced Insights</h1>
          <h2 className=" text-gray-400">Get concise, AI-generated articles</h2>
        </div>
        <div
          className="w-[400px] h-auto  flex flex-wrap items-center flex-col text-center gap-2 py-4 my-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <ElectricBoltIcon
            sx={{
              width: 70,
              height: 70,
              color: "#8F37FF",
            }}
          />
          <h1 className="text-xl font-extrabold ">Real-time updates</h1>
          <h2 className=" text-gray-400">
            Get instant insights from the latest trends
          </h2>
        </div>
        <div
          className="w-[400px] h-auto  flex flex-wrap items-center flex-col text-center gap-2 py-4 my-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <TuneRoundedIcon
            sx={{
              width: 70,
              height: 70,
              color: "#8F37FF",
            }}
          />
          <h1 className="text-xl font-extrabold ">Custom Query Options</h1>
          <h2 className=" text-gray-400">Customize Date Range and Topics</h2>
        </div>
      </div>
    </div>
  );
}

export default Features;
