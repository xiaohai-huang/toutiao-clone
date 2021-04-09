import React from "react";
import DisplayCard from "./DisplayCard";
import { Box } from "@material-ui/core";
import Headline from "./Headline";
import useHeadlines from "../../utility/useHeadlines";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { searchQueryUpdated } from "../search/searchSlice";

function HotCard({ title = "实时热搜榜" }) {
  const headlines = useHeadlines();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = (title) => () => {
    dispatch(searchQueryUpdated(title));
    history.push("/search_results");
  };

  return (
    <DisplayCard title={title}>
      <Box mt={2}>
        {headlines.map((headline, i) => {
          return (
            <Headline
              key={i + 1}
              number={i + 1}
              onClick={handleClick(headline.title)}
              {...headline}
            />
          );
        })}
      </Box>
    </DisplayCard>
  );
}

export default HotCard;
