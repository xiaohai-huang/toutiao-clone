import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ShareIcon from "@material-ui/icons/Share";

import { positionUpdated } from "../app/appSlice";
import {
  formatDate,
  getVideoDetails,
  numberToChinese,
} from "../utility/utility";
import MobileHotCard from "../features/company/MobileHotCard";
import HotCard from "../features/company/HotCard";
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
    minWidth: "3.85rem",
    borderRadius: "0.96rem",
    fontSize: "0.7rem",
    padding: "0.25rem 0.84rem",
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
      },
    },
  },
}));
function VideoDetailsPage({ videoInfo, news_id }) {
  const classes = useStyles();
  const { videoUrl, poster_url, digg_count, media_user } = videoInfo;
  const dispatch = useDispatch();
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  useEffect(() => {
    dispatch(positionUpdated("video"));
  }, [dispatch]);

  return (
    <div className="videoDetailsPage">
      <Container disableGutters={xs}>
        <Box mt={!xs ? 3 : ""} />
        <Grid container spacing={xs ? 0 : 3}>
          <Grid item md={8} sm={12} xs={12}>
            <video
              className={classes.video}
              controls
              width="100%"
              autoPlay
              poster={poster_url}
            >
              <source src={videoUrl} />
              <source src="http://techslides.com/demos/sample-videos/small.mp4" />
            </video>
            <Container>
              <VideoTitle {...videoInfo} />
              <Box mt={2.5} />
              {!xs && <Author {...media_user} />}
              <Buttons digg_count={digg_count} mt={2.5} mb={3} />
              <MobileHotCard />
              <Box mb={8} />
            </Container>
          </Grid>
          <Grid item md={4} sm>
            {!xs && <HotCard />}
          </Grid>
        </Grid>
      </Container>
    </div>
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
            {is_original && <Typography variant="subtitle2">原创</Typography>}
            <div className={classes.verticalLine}></div>
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
      <Box display="flex" alignItems="center">
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
      >
        {digg_count}
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
