import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

import Video from "./Video";
const useStyles = makeStyles((theme) => ({
  info: {
    "& > *": {
      lineHeight: "1.41",
      fontSize: "0.83rem",
      marginBottom: "0.15rem",
    },
  },
  title: {
    fontSize: "0.95rem",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    "&:hover": {
      color: "#ff142b",
      cursor: "pointer",
    },
  },
  video: {
    borderRadius: "4px",
  },
  subtitle: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
function SmallVideoCard({
  title,
  author = {},
  duration,
  preview_url,
  image_url,
  statistics,
  handleClick,
}) {
  const { name } = author;
  const classes = useStyles();
  const play_count = getPlayCount(statistics);
  return (
    <Box display="flex" alignItems="center">
      <Box maxWidth="10.5rem" minWidth="10.5rem">
        <Video
          classes={{ video: classes.video }}
          src={preview_url}
          alt={title}
          poster={image_url}
          muted
          duration={duration}
          onClick={handleClick}
        />
      </Box>
      <Box ml={1.5} />
      <Box className={classes.info} display="flex" flexDirection="column">
        <Typography className={classes.title} onClick={handleClick}>
          {title}
        </Typography>
        <Typography className={classes.subtitle}>{name}</Typography>
        <Typography className={classes.subtitle}>{play_count}</Typography>
      </Box>
    </Box>
  );
}

function getPlayCount(stats) {
  if (stats) {
    return (stats = stats.split(" ")[0]);
  } else {
    return "";
  }
}

export default SmallVideoCard;
