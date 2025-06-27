function Video() {
  return (
    <div
      data-aos="fade"
      className="bg-purple-700 md:w-8/10 mx-auto rounded-2xl overflow-clip border-6 md:border-12 lg:border-12 border-purple-700"
    >
      <div className="rounded-2xl overflow-clip ">
        <video src="/tutorial3.mp4" autoPlay muted loop />
      </div>
    </div>
  );
}

export default Video;
