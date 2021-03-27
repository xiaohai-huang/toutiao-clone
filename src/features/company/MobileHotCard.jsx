import {
  Box,
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import useHeadlines from "../../utility/useHeadlines";
import Headline from "./Headline";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#222",
    fontWeight: 700,
    marginBottom: "1rem",
  },
}));
function MobileHotCard() {
  const classes = useStyles();
  const headlines = useHeadlines();
  const history = useHistory();
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  if (!xs) {
    return <></>;
  }
  return (
    <div className="mobileHotCard">
      <Typography className={classes.title} variant="h6">
        实时热榜
      </Typography>
      {headlines.map((headline, i) => (
        <Headline
          key={headline.title}
          number={i + 1}
          spacing={1}
          hotColor="#999"
          hotFontSize="0.8rem"
          {...headline}
        />
      ))}
      <Box m={5} />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        onClick={() => history.push("/")}
      >
        去今日头条看更多精彩内容
      </Button>
    </div>
  );
}

export default MobileHotCard;
