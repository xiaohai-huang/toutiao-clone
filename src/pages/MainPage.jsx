import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Channel from "../features/channel/Channel";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({}));
export default function MainPage() {
  const classes = useStyles();
  let arr = Array.apply(null, Array(20));
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={2}>
          <Channel />
        </Grid>
        <Grid item xs={12} sm={9} md>
          <Grid container>
            <Grid item xs>
              {arr.map((e, i) => (
                <Typography>
                  {i}. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis vel iste quod sed consectetur omnis! Odit, consequatur
                  deserunt minus alias ducimus explicabo animi culpa magni
                  laborum voluptatibus, odio pariatur facilis.
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3}>
          <span></span>
          <Box display={{ xs: "none", md: "block" }}>
            <Paper>Links</Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
