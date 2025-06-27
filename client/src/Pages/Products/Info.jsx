import PsychologyIcon from "@mui/icons-material/Psychology";
import SubBox from "./SubBox";
import GroupsIcon from "@mui/icons-material/Groups";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SubBox_2 from "./SubBox_2";
import howItWorks from "../../data/howItWorks";
import howToUseIt from "../../data/howToUseIt";
import whoIsItFor from "../../data/whoIsItFor";
import tips from "../../data/Tips";
function Info() {
  return (
    <>
      {/* SUBHERO  */}
      <>
        <h1
          className="text-2xl text-center my-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <PsychologyIcon sx={{ width: 40, height: 40 }} />
          What Our AI Social Analyzer Does
        </h1>
        <p
          className="text-muted text-center w-9/10 max-w-[650px] mx-auto my-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Just type a hashtag, handle, or search phrase, and we’ll fetch the top
          posts from Twitter or Reddit— giving you quick insight into what the
          world is saying across platforms.
        </p>
      </>
      {/* HOW IT WORKS  */}
      <>
        <div className="flex justify-center sm:justify-around lg:justify-between  flex-wrap my-8">
          {howItWorks.map((el, i) => (
            <SubBox
              icon={el.icon}
              heading={el.heading}
              content={el.content}
              key={i}
              index={i}
            />
          ))}
        </div>
      </>

      {/* HOW TO USE IT  */}
      <>
        <h1
          className="text-2xl my-4 ml-4 xl:ml-0"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          # How to Use it
        </h1>
        <div className="flex justify-center sm:justify-around lg:justify-between  flex-wrap my-8">
          {howToUseIt.map((el, i) => (
            <SubBox heading={el.heading} content={el.content} key={i} index={i}>
              <div className="flex">
                <div
                  style={{ borderRadius: "50%" }}
                  className="bg-[#9810FA] w-6 h-6 flex justify-center"
                >
                  {i + 1}
                </div>
                &nbsp; &nbsp;{el.icon}
              </div>
            </SubBox>
          ))}
        </div>
      </>
      {/* WHO IS IT FOR  */}
      <>
        <h1
          className="text-2xl my-4 ml-4 xl:ml-0"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <GroupsIcon sx={{ width: 30, height: 30 }} /> Who Is It For?
        </h1>
        <div className="flex md:justify-around justify-center lg:justify-between flex-wrap my-8">
          {whoIsItFor.map((el, i) => (
            <SubBox_2
              icon={el.icon}
              heading={el.heading}
              content={el.content}
              key={i}
              index={i}
            />
          ))}
        </div>
      </>

      {/* TIPS  */}
      <>
        <h1 className="text-2xl my-4 ml-4 xl:ml-0">
          <LightbulbIcon sx={{ width: 30, height: 30 }} />
          Tips
        </h1>
        <ul>
          {tips.map((tip, index) => (
            <li className="bg-[#141A4B] my-4 p-4 flex items-center" key={index}>
              <span className="text-4xl mr-4">&#x2022;</span>
              {tip}
            </li>
          ))}
        </ul>
      </>
    </>
  );
}
// #141026
export default Info;
