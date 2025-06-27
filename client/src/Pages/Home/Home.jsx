import Footer from "../Footer";
import Navbar from "../Navbar";
import FAQ from "./FAQ";
import Features from "./Features";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Sample from "./Sample";
import Testimonials from "./Testimonials";
import Video from "./Video";
import WhoIsItFor from "./WhoIsItFor";

function Home() {
  return (
    <>
      <Navbar />
      <div className="m-auto xl:max-w-[1050px] w-98/100 text-stone-100">
        <Hero />
        <Video />
        <Features />
        <HowItWorks />
        <Sample />
        <WhoIsItFor />
        <Testimonials />
        <Pricing />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}

export default Home;
