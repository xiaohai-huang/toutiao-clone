import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import SimpleContentCard from "./SimpleContentCard";
import { DurationBadage } from "./DurationBadage";

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
}));

function MediaCard({ image_url, video_duration_str, ...rest }) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" pt={1} pb={1}>
      <Box className={classes.mediaContainer} position="relative">
        <img alt={rest.title} src={image_url} width={154} height="auto" />
        {video_duration_str && <DurationBadage duration={video_duration_str} />}
      </Box>
      <Box p={1} />
      <SimpleContentCard {...rest} />
    </Box>
  );
}

export default MediaCard;
