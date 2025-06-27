import Navbar from "../Navbar";
import Info from "./Info";
import { Typewriter } from "react-simple-typewriter";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../Footer";

function Products() {
  return (
    <>
      <Navbar />
      <div className="m-auto xl:max-w-[1050px] w-995/1000 text-stone-100 pt-16">
        {/* TYPEWRITER  */}
        <h1 className="text-3xl py-6 text-center font-bold">
          <Typewriter
            words={[
              "AI Tweet Analyzer . . .",
              "Understand threads in seconds . . .",
              "Let AI read the thread for you . . .",
            ]}
            loop={0}
            cursor={false}
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
          />
          <span className="opacity-0">|</span>
        </h1>
        <h1 className="text-center pb-6 text-lg">
          Enter any hashtag or topic. Instantly get a concise,
          journalist-friendly article
          <br /> of the top tweets/posts
        </h1>

        {/* NAVIGATION  */}
        <div className="flex justify-center">
          <NavLink
            to="/analyze/twitter"
            className="alink flex items-center justify-center bg-[#9810FA] w-[150px]  rounded-tl-lg rounded-bl-lg opacity-30"
          >
            <img src="/Twitter-Logo-copy.png" className="w-full" />
          </NavLink>
          <NavLink
            to="/analyze/reddit"
            className="alink bg-[#9810FA] w-[150px] py-2 rounded-tr-lg rounded-br-lg flex justify-center opacity-30"
          >
            <img src="/only-logo-reddit.webp" className="w-[35px]" />
            <h1 className="flex items-center text-2xl font-extrabold ml-2 italic">
              Reddit
            </h1>
          </NavLink>
        </div>

        <Outlet />
        <Info />
      </div>
      <Footer />
    </>
  );
}

export default Products;
