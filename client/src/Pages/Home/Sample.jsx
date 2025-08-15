import ReactMarkdown from "react-markdown";

function Sample() {
  return (
    <div
      className="bg-[#15134C] text-gray-300/80 p-4 md:p-8 relative rounded-2xl max-w-[56rem] m-auto"
      data-aos="fade-up"
    >
      <div className="absolute p-3 md:p-4 bg-amber-100 text-white -top-6 text-xl rounded-md bg-gradient-to-r from-purple-500 to-pink-400 ">
        Sample Article
      </div>
      <h1 className="text-center text-xl  md:text-2xl mt-4 md:mt-0 mb-6 font-bold text-gray-300">
        #ENGvIND
      </h1>
      <div className="h-[408px] overflow-y-scroll modal-scroll text-sm md:text-base">
        <ReactMarkdown>## Part 1: Quick Insight</ReactMarkdown>

        <ReactMarkdown>**Main Topics:**</ReactMarkdown>
        <ReactMarkdown>
          {`* Mohammed Siraj's performance (5-wicket haul, 6-wicket haul, leading the attack in Bumrah's absence).\n
* Shubman Gill's performance (269 runs, highest individual score by an Indian on English soil in Tests, 7th highest individual score for India in Test cricket).\n
* Yashasvi Jaiswal reaching 2000 Test runs.\n
* General praise for Team India.`}
        </ReactMarkdown>

        <ReactMarkdown>**Sentiments:**</ReactMarkdown>
        <ReactMarkdown>
          {`* Positive and celebratory towards Siraj and Gill's achievements.\n
* Respect and admiration for Siraj's dedication and performance in Bumrah's absence.\n
* Pride in Team India's performance.`}
        </ReactMarkdown>

        <ReactMarkdown>**Notable Events/Discussions:**</ReactMarkdown>
        <ReactMarkdown>
          {`* Siraj's 5-wicket and 6-wicket hauls in the Test match.\n
* Gill's record-breaking innings of 269 runs.\n
* Discussion of Gill joining an "elite club" and Siraj being "GOATed".\n
* Comparison of Siraj's performance to Bumrah's absence.\n
* Yashasvi Jaiswal reaching 2000 Test runs.`}
        </ReactMarkdown>
        <br />
        <ReactMarkdown>## Part 2: Article</ReactMarkdown>

        <ReactMarkdown>
          **Siraj and Gill Shine as India Dominate in Test Match**
        </ReactMarkdown>

        <ReactMarkdown>
          {`Mohammed Siraj and Shubman Gill have emerged as the heroes of the ongoing Test match between England and India, captivating fans with their exceptional performances.`}
        </ReactMarkdown>

        <ReactMarkdown>
          {`Siraj's outstanding bowling display, highlighted by a 5-wicket haul and later a 6-wicket haul, has been instrumental in India's success. Fans are praising Siraj's ability to step up and lead the bowling attack in the absence of Jasprit Bumrah, recognizing his passion and dedication to Test cricket. Many are calling him a "legend" and celebrating his "Miyan Magic."`}
        </ReactMarkdown>

        <ReactMarkdown>
          {`Adding to the Indian dominance, Shubman Gill has etched his name in the record books with a magnificent innings of 269 runs. This remarkable score is not only the highest individual score by an Indian on English soil in Tests but also the 7th highest individual score for India in Test cricket overall.`}
        </ReactMarkdown>

        <ReactMarkdown>
          {`Gill's achievement has been met with widespread acclaim, with fans and analysts alike lauding his skill and determination. His performance has earned him a place among the legends, and many are celebrating his entry into an "elite club." He's being praised as an Indian captain who is leading by example.`}
        </ReactMarkdown>

        <ReactMarkdown>
          {`Adding to the accolades, Yashasvi Jaiswal has reached 2000 Test runs, achieving the milestone joint-fastest for Team India, along with Rahul Dravid and Virender Sehwag.`}
        </ReactMarkdown>

        <ReactMarkdown>
          {`The performances of Siraj, Gill and Jaiswal have fueled immense pride and excitement among Indian cricket fans, who are celebrating Team India's overall performance and dominance in the Test match.`}
        </ReactMarkdown>
      </div>
      <p className="text-gray-400 text-xs mt-4">
        * The above article was generated using the data of 20 tweets (#ENGvIND)
        on 04/07/25
      </p>
    </div>
  );
}

export default Sample;
