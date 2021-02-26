import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    background: "rgba(0,0,0,.7)",
    fontSize: "0.8rem",
    borderRadius: "10px",
    paddingLeft: "5px",
    paddingRight: "8px",
  },
}));
export const DurationBadage = ({ duration }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      display="flex"
      alignItems="center"
      position="absolute"
      right="0.35rem"
      bottom="0.8rem"
    >
      <PlayArrowIcon fontSize="small" />
      <span>{duration}</span>
    </Box>
  );
};
