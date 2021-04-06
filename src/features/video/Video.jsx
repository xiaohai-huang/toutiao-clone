import React, { useRef, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import DurationBadge from "../feed/DurationBadge";
import clsx from "clsx";
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
}));
function Video({
  src,
  duration,
  alt,
  poster,
  muted,
  loop,

  classes: external = {},
  children,
  ...rest
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

    e.target.load()?.catch((err) => {
      console.log("error at resuming video");
    });
  };
  return (
    <Box className="magic-video" position="relative" {...rest}>
      <Box>
        <img className={classes.coverImage} src={poster} alt={alt} />
        <video
          style={{ opacity: !showBadage && 1 }}
          className={clsx(external.video, classes.video)}
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          playsInline
          loop={loop}
          onTouchStart={playPreview}
          onMouseOver={playPreview}
          onMouseOut={resumePreview}
          onEnded={resumePreview}
        />
        <DurationBadge
          style={{ display: !showBadage && "none" }}
          disablePlayArrow
          duration={duration}
        />
      </Box>
      {children}
    </Box>
  );
}

export default Video;
