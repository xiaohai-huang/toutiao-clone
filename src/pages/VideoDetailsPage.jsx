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
import { formatDate, numberToChinese } from "../utility/utility";
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
import ReactMarkdown from "react-markdown";
import Comment from "../features/common/Comment.tsx";
import useComments from "../utility/useComments.tsx";
const useStyles = makeStyles((theme) => ({
  titleSection: {
    boxShadow: "none",
    backgroundColor: theme.palette.background.default,
  },
  videoTitle: {
    fontSize: "1.28rem",
    lineHeight: "1.65rem",
    color: "rgba(0, 0, 0, 0.87)",
  },
  verticalLine: {
    height: ".7rem",
    width: ".08rem",
    backgroundColor: "#757575",
  },
  stats: {
    color: "#757575",
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      "& > *": {
        fontWeight: 300,
        fontSize: "0.77rem",
        marginRight: "0.25rem",
      },
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
  videoDescription: {
    fontSize: "0.88rem",
    color: "#666",
    "& *": {
      margin: "0px",
    },
  },

  socialButtons: {
    "& > button": {
      borderRadius: "0.96rem",
      margin: "0 0.25rem",
      whiteSpace: "nowrap",
    },
  },
  [theme.breakpoints.up("sm")]: {
    video: {
      borderRadius: "0.03rem",
    },
    avatar: {
      width: "54px",
      height: "54px",
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
        marginRight: "0.25rem",
      },
    },
  },

  playNextTitle: {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "#222",
  },
}));
// if params is not undefined, fetch news details myself
function VideoDetailsPage() {
  const classes = useStyles();
  const { video_id } = useParams();
  const dispatch = useDispatch();
  const { comments } = useComments(video_id);

  let videoInfo = useSelector(selectVideoDetailsById(video_id));
  if (!videoInfo) {
    videoInfo = {};
  }
  let { videoUrl, poster_url, digg_count, media_user } = videoInfo;

  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  let recommendedVideos = useSelector(selectVideosAfterId(video_id));
  let {
    image_url,
    title,
    author: preview_author,
  } = getVideoPreviewInfo(video_id, recommendedVideos);
  // use preview info to populate video author first
  if (!media_user) {
    preview_author = {
      screen_name: preview_author ? preview_author.name : "作者",
      ...preview_author,
    };
    media_user = preview_author;
  }
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

    window.scrollTo(0, 0);
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
        <Container disableGutters={xs} maxWidth="xl">
          <Box mt={!xs ? 3 : ""} />
          <Grid container spacing={xs ? 0 : 3}>
            <Grid item lg={9} md={8} sm={12} xs={12}>
              {/* Video */}
              {Object.keys(videoInfo).length === 0 ? (
                <>
                  <LinearProgress />
                  <img src={image_url} alt={title} width="100%" />
                  <Container disableGutters={!xs}>
                    <VideoTitle title={title} media_user={media_user} />
                  </Container>
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
                  <Container disableGutters={!xs}>
                    <VideoTitle {...videoInfo} />
                  </Container>
                </>
              )}

              <Container disableGutters={!xs}>
                <Box mt={2.5} />
                {!xs && <Author {...media_user} />}
                {/* Social Buttons */}
                <Buttons digg_count={digg_count || 0} mt={2.5} mb={3} />

                {/* Comments */}
                {comments.map((comment) => (
                  <Box mb={3}>
                    <Comment key={comment.id} hasReplyList {...comment} />
                  </Box>
                ))}
                {/* Mobile Recommend Videos */}

                {smDown && (
                  <>
                    <Divider />
                    <Box mt={2.5} />
                    <AutoPlay
                      autoPlay={autoPlay}
                      handleChange={() => setAutoPlay((prev) => !prev)}
                    />
                    <Box mb={1.5} />
                    <RecommendedVideos recommendedVideos={recommendedVideos} />
                  </>
                )}
                <Box mt={3} />
                <MobileHotCard />
                <Box mb={8} />
              </Container>
            </Grid>
            {/* PC only recommend videos */}
            {mdUp && (
              <Grid item lg={3} md={4}>
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
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography className={classes.playNextTitle}>接下来播放</Typography>
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
  content = "loading",
  video_play_count,
  publish_time,
  is_original,
  media_user,
}) {
  const xsDown = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const classes = useStyles();
  content = content.replace("视频加载中...", "");
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
            mt={0.8}
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
        <Box width="100%">
          <Typography className={classes.videoDescription}>
            {/* getVideoDetails(content) */}
            <ReactMarkdown source={content} escapeHtml={false} />
          </Typography>
          <Box mt={1.5} />
          {xsDown && <Author {...media_user} />}
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

  useEffect(() => {
    setCount(digg_count);
  }, [digg_count]);
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
