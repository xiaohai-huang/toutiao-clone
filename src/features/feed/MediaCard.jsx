import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import SimpleContentCard from "./SimpleContentCard";
import { DurationBadage } from "./DurationBadage";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      background: theme.palette.background.default,
      "&:first-child": {
        paddingTop: theme.spacing(1),
      },
    },
  },

  title: {
    marginBottom: "6px",
    [theme.breakpoints.down("sm")]: {
      color: "#222",
    },
  },
  link: {
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  mediaContainer: {
    cursor: "pointer",
  },
  image: {
    width: "154px",
    [theme.breakpoints.down("sm")]: {
      width: "113.95px",
      paddingRight: "0.4rem",
    },
  },
}));

function MediaCard({ image_url, video_duration_str, ...rest }) {
  const classes = useStyles();
  const device = useSelector((state) => state.app.device);

  return (
    <Box
      display="flex"
      alignItems="center"
      pt={1}
      pb={1}
      flexDirection={device === "PC" ? "row" : "row-reverse"}
    >
      <Box className={classes.mediaContainer} position="relative">
        <img
          className={classes.image}
          alt={rest.title}
          src={image_url}
          height="auto"
        />
        {video_duration_str && <DurationBadage duration={video_duration_str} />}
      </Box>
      <Box p={1} />
      <SimpleContentCard {...rest} />
    </Box>
  );
}

export default MediaCard;
