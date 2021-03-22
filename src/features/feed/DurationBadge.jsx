import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    background: "rgba(0,0,0,.6)",
    fontSize: "0.8rem",
    borderRadius: "10px",
    paddingLeft: "5px",
    paddingRight: "8px",
    position: "absolute",
    right: "0.35rem",
    bottom: "0.8rem",
    [theme.breakpoints.down("md")]: {
      right: "0.6rem",
      fontSize: "0.7rem",
    },
  },
}));
export default function DurationBadge({ duration, ...rest }) {
  const classes = useStyles();
  return (
    <Box
      {...rest}
      className={classes.root}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <PlayArrowIcon fontSize="small" />
      <Box component="span" pt={0.15}>
        {duration}
      </Box>
    </Box>
  );
}
