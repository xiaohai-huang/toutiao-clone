import {
  Box,
  Button,
  makeStyles,
  Paper,
  Typography,
  Zoom,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React, { useState } from "react";

import { debounce } from "../../utility/utility";
import DurationBadge from "../feed/DurationBadge";
import ScoreBadge from "./ScoreBadge";
import Video from "./Video";

const useStyles = makeStyles((theme) => ({
  movieCard: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  movieImage: {
    borderRadius: "4px",
  },
  moviePreviewWrapper: {
    zIndex: theme.zIndex.modal,
    position: "absolute",
    top: "-1rem",
    bottom: "0px",
    left: "-1.45rem",
    right: "-1.45rem",
    background: "#fff",
  },
  previewTitle: {
    fontSize: "1.3rem",
    color: "rgb(0, 0, 0)",
    textOverflow: "ellipsis",
    overflow: "hidden",
    "&:hover": {
      color: "#fe104d",
    },
  },
  previewInfo: {
    height: "100%",
  },
  intro: {
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  actor: {
    display: "-webkit-box",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  start: {
    color: "#999",
    fontSize: "0.76rem",
  },
  details: {
    "& > *": {
      fontSize: "0.75rem",
    },
  },
  playButton: {
    backgroundImage: "linear-gradient(254deg, #ff3183, #ff102b)",
  },
}));
function MovieCard({
  title,
  subTitle,
  score,
  RBTag,
  image_url,
  richPreviewProps,
  onClick,
}) {
  const classes = useStyles();
  const [showPreview, setShowPreview] = useState(false);
  const debouncedSetPreview = debounce(setShowPreview, 40);

  return (
    <Box
      className={classes.movieCard}
      position="relative"
      onClick={onClick}
      onMouseOver={() => debouncedSetPreview(true)}
      onMouseOut={() => debouncedSetPreview(false)}
    >
      <Box>
        <Box position="relative">
          <img
            className={classes.movieImage}
            src={image_url}
            alt={title}
            width="100%"
          />
          {RBTag ? (
            <DurationBadge
              disablePlayArrow
              duration={RBTag}
              style={{ bottom: "1rem", right: "0.35rem" }}
            />
          ) : (
            <ScoreBadge score={score} />
          )}
        </Box>

        <Box mt={1} />
        <Typography>{title}</Typography>
        <Box mb={0.3} />
        <Typography variant="caption">{subTitle}</Typography>
      </Box>
      <Zoom in={showPreview}>
        {richPreviewProps && (
          <Paper className={classes.moviePreviewWrapper} elevation={2}>
            <MoviePreview {...richPreviewProps} />
          </Paper>
        )}
      </Zoom>
    </Box>
  );
}
const albumTypeToString = {
  1: "电影",
  2: "电视剧",
  13: "儿童",
};

function MoviePreview({
  image_url,
  title,
  albumTypeValueList,
  areaList,
  year,
  tagList,
  intro,
  actorList,
  videoURL,
}) {
  const classes = useStyles();
  const typeString = [
    albumTypeToString[albumTypeValueList[0]],
    ...areaList,
    year,
    tagList[0],
  ].join("/");
  const actorString = actorList?.join("、");
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Video src={videoURL} poster={image_url} alt={title} muted loop />
      <Box
        className={classes.previewInfo}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p={2}
        pt={1.3}
      >
        <Box>
          {/* title */}
          <Typography className={classes.previewTitle} variant="h5">
            {title}
          </Typography>
          <Box mt={1.5} />
          {/* details */}
          <Box className={classes.details}>
            {/* types */}
            <Typography className={classes.types}>
              <Typography className={classes.start} component="span">
                类型：
              </Typography>
              {typeString}
            </Typography>
            {/* actors */}
            <Typography className={classes.actor}>
              <Typography className={classes.start} component="span">
                演员：
              </Typography>
              {actorString}
            </Typography>
            <Box mt={1.5} />
            {/* intro */}
            <Typography className={classes.intro}>
              <Typography className={classes.start} component="span">
                简介：
              </Typography>
              {intro}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button
            classes={{ root: classes.playButton }}
            startIcon={<PlayArrowIcon />}
            variant="contained"
            color="secondary"
            disableElevation
          >
            立即观看
          </Button>
          <Button startIcon={<StarBorderIcon />}>收藏</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default MovieCard;
