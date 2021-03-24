import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Video from "./Video";

const useStyles = makeStyles((theme) => ({
  videoCard: {
    width: "100%",
  },
  authorInfo: {
    position: "absolute",
    left: "10px",
    bottom: "-23px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    margin: "4px 0 0 4px",
    boxShadow: "0 0 0 2.3px #fff",
    "&:hover": {
      cursor: "pointer",
    },
  },
  authorName: {
    marginBottom: "-1px",
    fontSize: "0.88rem",
    lineHeight: "20px",
    fontWeight: 400,
    "&:hover": {
      color: "#ff142b",
      cursor: "pointer",
    },
  },
  title: {
    fontSize: "1rem",
    lineHeight: "1.41",
    color: "#1d1d1d",
    fontWeight: 500,
    marginTop: "1.85rem",
    marginBottom: "0.3rem",
    "&:hover": {
      color: "#ff142b",
      cursor: "pointer",
    },
  },
}));
function VideoCard({
  title,
  author,
  duration,
  preview_url,
  image_url,
  statistics,
  handleClick,
}) {
  const classes = useStyles();

  return (
    <div className="videoCard">
      <Video
        src={preview_url}
        alt={title}
        poster={image_url}
        muted
        duration={duration}
        onClick={handleClick}
      >
        <Author className={classes.authorInfo} {...author} />
      </Video>

      <Typography className={classes.title} onClick={handleClick}>
        {title}
      </Typography>
      <Typography variant="caption">{statistics}</Typography>
    </div>
  );
}

function Author({ avatar_url, name, className }) {
  const classes = useStyles();
  return (
    <Box className={className} display="flex" alignItems="flex-end">
      <Avatar className={classes.avatar} src={avatar_url} alt={name} />
      <Box p={0.6} />
      <Typography className={classes.authorName}>{name}</Typography>
    </Box>
  );
}

export default VideoCard;
