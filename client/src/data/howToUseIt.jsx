import SearchIcon from "@mui/icons-material/Search";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default [
  {
    icon: "#",
    heading: "Enter a Hashtag or Topic",
    content: "Start by typing something like 'AI' or 'ceasefire'",
  },
  {
    icon: <SearchIcon sx={{ width: 30, height: 30 }} />,
    heading: "Click Analyze",
    content:
      "Our engine will fetch the most releavant tweets/posts and analyze them for you",
  },
  {
    icon: <EqualizerIcon sx={{ width: 30, height: 30 }} />,
    heading: "Review the article",
    content:
      "Read or export a concise AI-written overview of what people are discussing about",
  },
  {
    icon: <ExitToAppIcon sx={{ width: 30, height: 30 }} />,
    heading: "Export Your Summary",
    content:
      "Done analyzing? Export it as a clean doc file, or even shareable PDF.",
  },
];
