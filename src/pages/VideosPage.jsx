import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchVideos, selectVideos } from "../features/feed/feedSlice";
import VideoCard from "../features/video/VideoCard";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "0.4rem",
      paddingLeft: "0.3rem",
      paddingRight: "0.3rem",
    },
    [theme.breakpoints.up("sm")]: {
      paddingRight: "1rem",
    },
  },
  [theme.breakpoints.down("xs")]: {
    cardWrapper: {
      borderBottom: "1px solid rgba(221, 221, 221, 0.6)",
      paddingBottom: "1rem",
      paddingTop: "0.5rem",
    },
  },
}));
function VideosPage() {
  const dispatch = useDispatch();
  const videos = useSelector(selectVideos);
  const status = useSelector((state) => state.feed.status);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const handleMore = () => {
    dispatch(fetchVideos());
  };

  return (
    <Grid className={classes.root} container spacing={2}>
      {videos.map((v) => {
        const handleVideoClick = () => {
          history.push(`/video/${v.item_id}`);
        };
        return (
          <Grid key={v.item_id} item lg={3} md={4} sm={6}>
            <Box className={classes.cardWrapper}>
              <VideoCard handleClick={handleVideoClick} {...v} />
            </Box>
          </Grid>
        );
      })}

      <Grid item xs>
        <Box pt={2} display="flex" flexDirection="column" alignItems="center">
          {status === "loading" && (
            <Box display="flex" alignItems="center" flexDirection="column">
              <Typography>
                如遇到视频加载失败，请使用Chrome或者Firefox浏览(Andriod)
              </Typography>
              <Box p={2} />
              <CircularProgress color="secondary" />
            </Box>
          )}
          <Box mb={2} />
          <Button variant="contained" color="secondary" onClick={handleMore}>
            更多
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default VideosPage;
