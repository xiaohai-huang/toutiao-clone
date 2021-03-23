import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.secondary,
    borderTop: "2px solid #ed4040",
    [theme.breakpoints.only("md")]: {
      paddingLeft: "2.8rem",
      paddingRight: "0.6rem",
    },
  },
  title: {
    fontWeight: 700,
  },
}));
function DisplayCard({ title, children }) {
  const classes = useStyles();
  return (
    <Box className={classes.root} p={3} pl={4}>
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
}

export default DisplayCard;
