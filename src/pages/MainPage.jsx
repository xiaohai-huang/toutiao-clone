import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Box, makeStyles, useMediaQuery } from "@material-ui/core";
import { useParams } from "react-router-dom";

import Channel from "../features/channel/Channel";
import Feed from "../features/feed/Feed";
import Company from "../features/company/Company";
import { categoryUpdated } from "../features/feed/feedSlice";
import { useDispatch } from "react-redux";
import VideosList from "./VideosList";
import { positionUpdated } from "../app/appSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10px",
    paddingRight: "10px",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const { category } = useParams();
  const xs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoryUpdated(category));
    dispatch(positionUpdated("home"));
  }, [dispatch, category]);

  let mainContent;
  if (category === "xigua") {
    mainContent = (
      <Grid item className={classes.videosContainer} xs={12} sm md>
        <VideosList />
      </Grid>
    );
  } else {
    mainContent = (
      <Grid item className={classes.feedContainer} xs={12} sm={9} md>
        <Feed />
      </Grid>
    );
  }

  return (
    <Container className={classes.root}>
      <Grid container spacing={1}>
        {/* Channel */}
        {!xs && (
          <Grid item className={classes.channelContainer} xs={12} sm={3} md={2}>
            <Channel />
          </Grid>
        )}

        {/* Feed or Videos*/}
        {mainContent}
        {/* Links */}
        {category !== "xigua" && (
          <Grid item md={4}>
            <span></span>
            <Box display={{ xs: "none", md: "block" }}>
              <Company />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
