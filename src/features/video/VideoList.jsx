import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import VideoCard from "./VideoCard";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "0.4rem",
      paddingLeft: "0.3rem",
      paddingRight: "0.3rem",
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
function VideosList({ videos }) {
  const classes = useStyles();
  const history = useHistory();

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
    </Grid>
  );
}

export default VideosList;
