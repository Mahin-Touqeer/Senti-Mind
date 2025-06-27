import { Star } from "@mui/icons-material";

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Marketing Manager",
      content:
        "This tool has revolutionized how we track social media trends. The sentiment analysis is incredibly accurate and saves us hours of manual work.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Research Analyst",
      content:
        "The dual platform analysis of Twitter and Reddit gives us comprehensive insights we couldn't find anywhere else. A game-changer for social research.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Content Creator",
      content:
        "I love how quickly I can understand what's trending and why. The AI summaries are concise and spot-on every time. It really saved a lot of my time",
      rating: 5,
    },
    {
      name: "Priya Mehra",
      role: "Journalist",
      content:
        "Senti Mind makes it effortless to capture the public pulse on breaking news. The real-time insights and export features are invaluable for my reporting workflow.",
      rating: 5,
    },
  ];

  return (
    <div className="my-32">
      <h1
        className="text-center text-4xl font-extrabold"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <span className="bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">
          What Our Users Say
        </span>
      </h1>

      <div className="flex flex-wrap justify-around gap-6 mt-12">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-[350px] p-6 rounded-2xl relative overflow-hidden"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={index * 100}
          >
            {/* Gradient background with blur effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-sm rounded-2xl" />

            {/* Content */}
            <div className="relative">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-purple-500"
                    sx={{ fontSize: 20 }}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author info */}
              <div>
                <h3 className="font-semibold text-white">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
