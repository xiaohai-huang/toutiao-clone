import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  score: {
    bottom: "1rem",
    right: "1rem",
    color: "#e09865",
    fontWeight: "500",
    fontSize: "1.3rem",
  },
}));
function ScoreBadge({ score }) {
  const classes = useStyles();
  return (
    <Box className={classes.score} position="absolute">
      {score}
    </Box>
  );
}

export default ScoreBadge;
