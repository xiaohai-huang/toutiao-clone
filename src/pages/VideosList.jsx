import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchVideos, selectVideos } from "../features/feed/feedSlice";
import VideoCard from "../features/video/VideoCard";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      paddingRight: "1rem",
    },
  },
}));
function VideosList() {
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
          history.push(`/news/${v.item_id}`);
        };
        return (
          <Grid key={v.item_id} item lg={3} md={4} sm={6}>
            <Box mb={2} mt={1}>
              <VideoCard handleClick={handleVideoClick} {...v} />
            </Box>
          </Grid>
        );
      })}

      <Grid item xs>
        <Box pt={2} display="flex" flexDirection="column" alignItems="center">
          <Button variant="contained" color="secondary" onClick={handleMore}>
            更多
          </Button>
          <Box mb={2} />
          {status === "loading" && <CircularProgress color="secondary" />}
        </Box>
      </Grid>
    </Grid>
  );
}

export default VideosList;
