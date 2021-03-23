import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import newsApi from "../../Api/newsApi";
import { Box, makeStyles, Typography } from "@material-ui/core";

import { numberToChinese } from "../../utility/utility";
const useStyles = makeStyles((theme) => ({
  headlineTitle: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  topNumber: {
    color: "#fc3434",
    fontWeight: "700",
  },
  number: {
    color: "#999",
  },

  hotTag: {
    width: "1.5rem",
    height: "1.5rem",
  },
}));
function HotCard({ title }) {
  const [headlines, setHeadlines] = useState([]);
  useEffect(() => {
    // newsApi.getHotboard().then((h) => console.log(h));
    newsApi.getHotboard().then((h) => setHeadlines(h));
  }, []);
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
function Headline({ number, title, tag_url, hot_value }) {
  const classes = useStyles();
  const chineseHotValue = numberToChinese(hot_value);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mt={1.5}
    >
      <Box display="flex" alignItems="center" minWidth="0">
        <Typography className={number < 4 ? classes.topNumber : classes.number}>
          {number}
        </Typography>
        <Box m={0.5} />
        <Typography className={classes.headlineTitle}>{title}</Typography>
      </Box>
      <Box m={0.3} />
      <Box display="flex" alignItems="center">
        <Typography className={classes.hotValue} noWrap>
          {chineseHotValue}
        </Typography>
        <Box m={0.5} />
        <img
          className={classes.hotTag}
          src={tag_url}
          alt=""
          style={{ visibility: !tag_url && "hidden" }}
        />
      </Box>
    </Box>
  );
}

export default HotCard;
