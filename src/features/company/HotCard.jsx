import React from "react";
import DisplayCard from "./DisplayCard";
import { Box } from "@material-ui/core";
import Headline from "./Headline";
import useHeadlines from "../../utility/useHeadlines";

function HotCard({ title = "实时热搜榜" }) {
  const headlines = useHeadlines();
  return (
    <DisplayCard title={title}>
      <Box mt={2}>
        {headlines.map((headline, i) => (
          <Headline key={i + 1} number={i + 1} {...headline} />
        ))}
      </Box>
    </DisplayCard>
  );
}

export default HotCard;
