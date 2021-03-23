import React from "react";
import DisplayCard from "./DisplayCard";
import { Box } from "@material-ui/core";
import Headline from "./Headline";
import useHeadlines from "../../utility/useHeadlines";

function HotCard({ title }) {
  const headlines = useHeadlines();
  return (
    <DisplayCard title={title}>
      <Box mt={2}>
        {headlines.map((headline, i) => (
          <Headline key={headline.title} number={i + 1} {...headline} />
        ))}
      </Box>
    </DisplayCard>
  );
}

export default HotCard;
