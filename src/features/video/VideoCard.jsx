import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import React, { useRef } from "react";
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
  title,
  item_id,
  author,
  duration,
  preview_url,
  image_url,
  statistics,
  play,
  setPreview,
  handleClick,
}) {
  const classes = useStyles();
  const videoRef = useRef(null);
  if (videoRef.current) {
    if (!play && !videoRef.current.paused) {
      videoRef.current.src = preview_url;
    }
  }
  const playPreview = (e) => {
    e.target.play();
    setPreview(item_id);
  };
  return (
    <div className="video-card">
      <Box position="relative">
        {/* <img
          className={classes.coverImage}
          src={image_url}
          alt={title}
          onClick={handleClick}
          onMouseOver={() => setPlay(true)}
          onMouseOut={() => setPlay(false)}
        /> */}
        <video
          className={classes.coverImage}
          ref={videoRef}
          src={preview_url}
          alt={title}
          poster={image_url}
          muted
          onClick={handleClick}
          onTouchStart={playPreview}
          onMouseOver={playPreview}
          onEnded={(e) => (e.target.src = preview_url)}
          // onMouseOut={(e) => e.target.pause()}
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
