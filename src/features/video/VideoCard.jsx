import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import DurationBadge from "../feed/DurationBadge";

const useStyles = makeStyles((theme) => ({
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "1.5%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  authorInfo: {
    position: "absolute",
    left: "10px",
    bottom: "-18px",
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
    marginTop: "1.8rem",
    marginBottom: "0.3rem",
    "&:hover": {
      color: "#ff142b",
      cursor: "pointer",
    },
  },
}));
function VideoCard({
  author,
  title,
  duration,
  image_url,
  statistics,
  handleClick,
}) {
  const classes = useStyles();
  return (
    <div className="video-card">
      <Box position="relative">
        <img
          className={classes.coverImage}
          src={image_url}
          alt={title}
          onClick={handleClick}
        />
        <Author className={classes.authorInfo} {...author} />
        <DurationBadge duration={duration} />
      </Box>

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
