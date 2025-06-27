import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SpeedIcon from "@mui/icons-material/Speed";

export default [
  {
    heading: "Real-Time Articles",
    content:
      "Get condensed, AI-generated insights from live posts on Twitter or Reddit",
    icon: <AccessTimeIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    heading: "Contextual Highlights",
    content: "Understand the tone, themes, and patterns behind each topic",
    icon: <TrackChangesIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    heading: "Sentiment Breakdown",
    content:
      "Identify whether the overall mood is positive, neutral, or negative",
    icon: <SentimentSatisfiedIcon sx={{ width: 30, height: 30 }} />,
  },
  {
    heading: "Fast & Easy to Use",
    content: "Just type and click—no advanced tools or login required",
    icon: <SpeedIcon sx={{ width: 30, height: 30 }} />,
  },
];
