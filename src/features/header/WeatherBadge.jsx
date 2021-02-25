import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  WeatherBadge: {
    background: theme.palette.warning.main,
    color: theme.palette.primary.contrastText,
    padding: "0 4px",
    fontSize: "0.75rem",
    display: "inline-block",
    borderRadius: "4px",
    textAlign: "center",
  },
}));
function WeatherBadge({ level, levelDigit }) {
  const classes = useStyles();

  return (
    <Box className={classes.WeatherBadge} component="span" display="inline">
      {level} {levelDigit}
    </Box>
  );
}

export default WeatherBadge;
