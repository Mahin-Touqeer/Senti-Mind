function HowItWorks() {
  return (
    <div className="my-32 ">
      <h1
        className="text-center text-4xl font-extrabold "
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <span className="bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
          How It Works?
        </span>
      </h1>
      <div className="flex flex-wrap justify-around">
        <div
          className="flex flex-col justify-between h-auto w-[400px] items-center text-center mt-8 px-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <img src="choose.svg" alt="" className="opacity-80 my-4 w-[192px]" />
          <h1 className="font-bold text-xl">1. Choose an analyzer</h1>
          <h1 className="text-gray-400">
            Select our AI powered Twitter or Reddit analyzer{" "}
          </h1>
        </div>
        <div
          className="flex flex-col justify-between h-auto w-[400px] items-center text-center mt-8 px-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <img src="enter.svg" alt="" className="opacity-80 my-4 w-[200px]" />
          <h1 className="font-bold text-xl">2. Enter a hashtag or topic</h1>
          <h1 className="text-gray-400">
            Start by typing a keyword like #India or "climate change"
          </h1>
        </div>
        <div
          className="flex flex-col justify-between h-auto w-[400px] items-center text-center mt-8 px-4 "
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <img
            src="generate.svg"
            alt=""
            className="opacity-80 my-4 w-[200px]"
          />
          <h1 className="font-bold text-xl">3. Generate an article</h1>
          <h1 className="text-gray-400">
            We process the data and generate the article
          </h1>
        </div>
        <div
          className="flex flex-col justify-between h-auto w-[400px] items-center text-center mt-8 px-4 "
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <img src="review.svg" alt="" className="opacity-80 my-4 w-[130px]" />
          <h1 className="font-bold text-xl">4. Review the results</h1>
          <h1 className="text-gray-400">
            Read and export key insights from the aggregated posts
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
