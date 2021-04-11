import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import SimpleContentCard from "./SimpleContentCard";
import DurationBadge from "./DurationBadge";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

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
    minHeight: "103px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "7rem",
      minHeight: "4.5rem",
      paddingRight: "0.4rem",
    },
  },
  middle: {
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1.3),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.3),
    },
  },
}));

function MediaCard({ image_url, video_duration_str, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const device = useSelector((state) => state.app.device);
  const { item_id } = rest;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={device === "PC" ? "flex-start" : "space-between"}
      flexDirection={device === "PC" ? "row" : "row-reverse"}
      pt={1}
      pb={1}
    >
      <Box
        className={classes.mediaContainer}
        position="relative"
        onClick={() => history.push(`/news/${item_id}`)}
      >
        <img className={classes.image} alt={rest.title} src={image_url} />
        {video_duration_str && <DurationBadge duration={video_duration_str} />}
      </Box>
      <Box className={classes.middle} />
      <SimpleContentCard {...rest} />
    </Box>
  );
}

export default MediaCard;
