import Footer from "../Footer";
import Navbar from "../Navbar";
import FAQ from "./FAQ";
import Features from "./Features";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Sample from "./Sample";
import Testimonials from "./Testimonials";
import UniqueValueSection from "./UniqueValueSection";
import Video from "./Video";
import WhoIsItFor from "./WhoIsItFor";

function Home() {
  return (
    <div className="bg-linear-to-br from-[#500289] via-[#060d3e] to-[#060d3e]">
      <Navbar />
      <div className="m-auto xl:max-w-[1050px] w-full text-stone-100">
        <Hero />
        <Video />
        <UniqueValueSection />
        <Features />
        <HowItWorks />
        <Sample />
        <WhoIsItFor />
        <Testimonials />
        <Pricing />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
