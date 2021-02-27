import { Box, Divider, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down("xs")]: {
      padding: "0.25rem 0",
    },
  },
}));
function CardWrapper({ children }) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.wrapper}>{children}</Box>
      <Divider />
    </>
  );
}

export default CardWrapper;
