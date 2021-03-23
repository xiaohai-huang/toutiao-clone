import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import DurationBadge from "../feed/DurationBadge";

const useStyles = makeStyles((theme) => ({
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    borderRadius: "1.5%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  video: {
    opacity: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "1.5%",
    "&:hover": {
      cursor: "pointer",
      opacity: 1,
    },
    transition: "opacity 0.3s",
    position: "absolute",
    left: "0px",
    top: "0px",
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
  item_id,
  author,
  duration,
  preview_url,
  image_url,
  statistics,
  handleClick,
}) {
  const classes = useStyles();
  const videoRef = useRef(null);
  const [showBadage, setShowBadage] = useState(true);

  const playPreview = (e) => {
    setShowBadage(false);
    try {
      e.target.play();
    } catch {
      console.log("error at previewing video");
    }
  };

  const resumePreview = (e) => {
    setShowBadage(true);
    try {
      e.target.load();
    } catch {
      console.log("error at resuming video");
    }
  };
  return (
    <div className="video-card">
      <Box position="relative">
        <Box
          onTouchStart={playPreview}
          onMouseOver={playPreview}
          onMouseOut={resumePreview}
        >
          <img className={classes.coverImage} src={image_url} alt={title} />
          <video
            style={{ opacity: !showBadage && 1 }}
            className={classes.video}
            ref={videoRef}
            src={preview_url}
            alt={title}
            poster={image_url}
            muted
            onClick={handleClick}
            onEnded={resumePreview}
          />
        </Box>

        <Author className={classes.authorInfo} {...author} />

        <DurationBadge
          style={{ display: !showBadage && "none" }}
          duration={duration}
        />
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
