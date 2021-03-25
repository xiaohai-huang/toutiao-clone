import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ShareIcon from "@material-ui/icons/Share";
import { useHistory, useParams } from "react-router";

import AppBar from "../features/common/AppBar.jsx";
import {
  formatDate,
  getVideoDetails,
  numberToChinese,
} from "../utility/utility";
import MobileHotCard from "../features/company/MobileHotCard";
import SmallVideoCard from "../features/video/SmallVideoCard";
import {
  categoryUpdated,
  fetchVideos,
  selectVideosAfterId,
} from "../features/feed/feedSlice";
import { positionUpdated } from "../app/appSlice";
import {
  selectVideoDetailsById,
  fetchVideoDetails,
} from "../features/video/videoSlice";
import VideosList from "../features/video/VideoList";
import SwitchButton from "../features/video/SwitchButton";
const useStyles = makeStyles((theme) => ({
  titleSection: {
    boxShadow: "none",
    backgroundColor: theme.palette.background.default,
  },
  videoTitle: {
    fontSize: "1.05rem",
    lineHeight: "1.4rem",
    color: "rgba(0, 0, 0, 0.87)",
  },
  verticalLine: {
    height: ".7rem",
    width: ".08rem",
    backgroundColor: "#757575",
  },
  stats: {
    color: "#757575",
    "& > *": {
      fontSize: "0.7rem",
      marginRight: "0.25rem",
    },
  },
  avatar: {
    width: "2.18rem",
    height: "2.18rem",
  },
  authorName: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "0.9rem",
  },
  subscribeButton: {
    backgroundColor: "#f33",
    borderRadius: "0.96rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0.25rem 0.84rem",
      fontSize: "0.7rem",
      minWidth: "3.85rem",
    },
  },
  accordionSummary: {
    padding: "0px",
    alignItems: "flex-start",
  },
  accordionDetails: {
    padding: "0px",
    color: "#757575",
    "& > *": {
      fontSize: "0.81rem",
    },
  },

  socialButtons: {
    "& > button": {
      borderRadius: "0.96rem",
      margin: "0 0.25rem",
      whiteSpace: "nowrap",
    },
  },
  [theme.breakpoints.up("xs")]: {
    video: {
      borderRadius: "0.03rem",
    },
    avatar: {
      width: "54px",
      height: "54px",
      margin: "4px 0 0 4px",
      boxShadow: "0 0 0 2.3px #fff",
      "&:hover": {
        cursor: "pointer",
      },
    },
    authorName: {
      fontSize: "1.06rem",
      fontWeight: 500,
    },
    stats: {
      "& > *": {
        fontSize: "0.95rem",
        fontWeight: "400",
      },
    },
  },
}));
// if params is not undefined, fetch news details myself
function VideoDetailsPage() {
  const classes = useStyles();
  const { video_id } = useParams();
  const dispatch = useDispatch();

  let videoInfo = useSelector(selectVideoDetailsById(video_id));
  if (!videoInfo) {
    videoInfo = {};
  }
  let { videoUrl, poster_url, digg_count, media_user } = videoInfo;

  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  let recommendedVideos = useSelector(selectVideosAfterId(video_id));
  const { image_url, title } = getVideoPreviewInfo(video_id, recommendedVideos);
  const [autoPlay, setAutoPlay] = useState(true);
  const videoRef = useRef(null);
  const history = useHistory();
  // remove the first one which is the current one
  recommendedVideos = recommendedVideos.slice(1);

  useEffect(() => {
    dispatch(categoryUpdated("xigua"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVideoDetails(video_id));
  }, [video_id, dispatch]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
  }, [video_id, videoUrl]);

  useEffect(() => {
    dispatch(positionUpdated("video"));
  }, [dispatch]);

  // load recommend videos
  useEffect(() => {
    if (recommendedVideos.length < 3) {
      dispatch(fetchVideos());
    }
    // eslint-disable-next-line
  }, [dispatch]);

  // console.log(Object.keys(videoInfo));

  return (
    <AppBar>
      <div className="videoDetailsPage">
        <Container disableGutters={xs}>
          <Box mt={!xs ? 3 : ""} />
          <Grid container spacing={xs ? 0 : 3}>
            <Grid item md={8} sm={12} xs={12}>
              {Object.keys(videoInfo).length === 0 ? (
                <>
                  <LinearProgress />
                  <img src={image_url} alt={title} width="100%" />
                </>
              ) : (
                <>
                  <video
                    className={classes.video}
                    controls
                    width="100%"
                    autoPlay
                    poster={poster_url}
                    ref={videoRef}
                    onEnded={() => {
                      if (autoPlay) {
                        const id = recommendedVideos[0].item_id;
                        history.push(`/video/${id}`);
                      }
                    }}
                  >
                    <source src={videoUrl} />
                    <source src="http://techslides.com/demos/sample-videos/small.mp4" />
                  </video>
                  <Container>
                    <VideoTitle {...videoInfo} />
                  </Container>
                </>
              )}
              <Container>
                <Box mt={2.5} />
                {!xs && <Author {...media_user} />}
                <Buttons digg_count={digg_count} mt={2.5} mb={3} />

                {smDown && (
                  <>
                    <AutoPlay
                      autoPlay={autoPlay}
                      handleChange={() => setAutoPlay((prev) => !prev)}
                    />
                    <Box mb={3} />
                    <RecommendedVideos recommendedVideos={recommendedVideos} />
                  </>
                )}
                <Box mt={3} />
                <MobileHotCard />
                <Box mb={8} />
              </Container>
            </Grid>
            {mdUp && (
              <Grid item md={4}>
                <AutoPlay
                  autoPlay={autoPlay}
                  handleChange={() => setAutoPlay((prev) => !prev)}
                />
                <RecommendedVideos recommendedVideos={recommendedVideos} />
              </Grid>
            )}
          </Grid>
        </Container>
      </div>
    </AppBar>
  );
}
function AutoPlay({ autoPlay, handleChange }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>接下来播放</Typography>
      <SwitchButton autoPlay={autoPlay} handleChange={handleChange} />
    </Box>
  );
}
function getVideoPreviewInfo(video_id, recommendedVideos) {
  const v = recommendedVideos.find((v) => v.item_id === video_id);
  if (v) {
    return v;
  }
  return {};
}
function RecommendedVideos({ recommendedVideos }) {
  const history = useHistory();
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <>
      {sm ? (
        <VideosList videos={recommendedVideos} />
      ) : (
        <>
          {recommendedVideos.map((v, i) => {
            const handleVideoClick = () => {
              history.push(`/video/${v.item_id}`);
            };
            return (
              <div key={i}>
                <Box mt={1.3} mb={1.3}>
                  <SmallVideoCard handleClick={handleVideoClick} {...v} />
                </Box>
                {i === 0 && <Divider />}
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

function VideoTitle({
  title,
  content,
  video_play_count,
  publish_time,
  is_original,
  media_user,
}) {
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const classes = useStyles();
  return (
    <Accordion classes={{ root: classes.titleSection }}>
      <AccordionSummary
        classes={{ root: classes.accordionSummary }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box>
          <Typography className={classes.videoTitle}>{title}</Typography>
          <Box
            className={classes.stats}
            display="flex"
            alignItems="center"
            mt={0.3}
          >
            {is_original && (
              <>
                <Typography variant="subtitle2">原创</Typography>
                <div className={classes.verticalLine}></div>
              </>
            )}
            <Typography variant="subtitle2">
              {numberToChinese(video_play_count)}次播放
            </Typography>
            <span>·</span>
            <Typography variant="subtitle2">
              {formatDate(publish_time, "PPP")}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.accordionDetails }}>
        <Box>
          <Typography>{getVideoDetails(content)}</Typography>
          <Box mt={1.5} />
          {xs && <Author {...media_user} />}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

function Author({ screen_name, avatar_url, video_count, follower_count }) {
  const classes = useStyles();
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  return (
    <Box
      display="flex"
      justifyContent={xs ? "space-between" : "flex-start"}
      alignItems="center"
      mb={3}
    >
      <Box display="flex" alignItems="center" width="100%">
        <Avatar className={classes.avatar} alt={screen_name} src={avatar_url} />
        <Box p={0.5} />
        <Box>
          <Typography className={classes.authorName} variant="subtitle2">
            {screen_name}
          </Typography>
          <Box display="flex" className={classes.stats}>
            <Typography variant="subtitle2">
              {numberToChinese(follower_count)}粉丝
            </Typography>
            <span>·</span>
            <Typography variant="subtitle2">{video_count}视频</Typography>
          </Box>
        </Box>
      </Box>
      {!xs && <Box ml={4} />}

      <Button
        variant="contained"
        color="secondary"
        className={classes.subscribeButton}
      >
        关注
      </Button>
    </Box>
  );
}

function Buttons({ digg_count, ...rest }) {
  const classes = useStyles();
  const [count, setCount] = useState(digg_count);
  return (
    <Box
      className={classes.socialButtons}
      display="flex"
      justifyContent="space-between"
      {...rest}
    >
      <Button
        size="large"
        fullWidth
        variant="outlined"
        startIcon={<ThumbUpIcon />}
        onClick={() => setCount((prev) => prev + 1)}
      >
        {count}
      </Button>
      <Button
        size="large"
        fullWidth
        variant="outlined"
        startIcon={<StarBorderIcon />}
      >
        收藏
      </Button>
      <Button
        size="large"
        fullWidth
        variant="outlined"
        startIcon={<ShareIcon />}
      >
        转发
      </Button>
    </Box>
  );
}
export default VideoDetailsPage;
