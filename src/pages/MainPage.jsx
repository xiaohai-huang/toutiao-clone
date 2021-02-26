import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Box, makeStyles } from "@material-ui/core";

import Channel from "../features/channel/Channel";
import Feed from "../features/feed/Feed";
import Company from "../features/company/Company";

const useStyles = makeStyles((theme) => ({
  root: {},
  channelContainer: {
    padding: "0!important",
  },
}));

export default function MainPage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={1}>
        {/* Channel */}
        <Grid item className={classes.channelContainer} xs={12} sm={3} md={2}>
          <Channel />
        </Grid>
        {/* Feed */}
        <Grid item className={classes.feedContainer} xs={12} sm={9} md>
          <Feed />
        </Grid>
        {/* Links */}
        <Grid item md={4}>
          <span></span>
          <Box display={{ xs: "none", md: "block" }}>
            <Company />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
