import React from "react";
import { Box, makeStyles, Tooltip, Typography, Zoom } from "@material-ui/core";

import { numberToChinese } from "../../utility/utility";
const useStyles = makeStyles((theme) => ({
  headlineRoot: {
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.only("xs")]: {
      marginBottom: theme.spacing(2.7),
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  headlineTitle: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.05rem",
    },
  },
  topNumber: {
    color: "#fc3434",
    fontWeight: "700",
  },
  number: {
    color: "#999",
  },

  hotTag: {
    [theme.breakpoints.only("xs")]: {
      width: "0.95rem",
      height: "0.95rem",
    },
    width: "1.5rem",
    height: "1.5rem",
  },
}));
function Headline({
  number,
  title,
  tag_url,
  hot_value,
  hotColor,
  hotFontSize,
  spacing = 0.5,
  onClick,
}) {
  const classes = useStyles();
  const chineseHotValue = numberToChinese(hot_value);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      className={classes.headlineRoot}
      onClick={onClick}
    >
      {/* Left */}
      <Tooltip
        title={title}
        disableFocusListener
        TransitionComponent={Zoom}
        arrow
        placement="top-start"
      >
        <Box display="flex" alignItems="center" minWidth="0">
          <Typography
            className={number < 4 ? classes.topNumber : classes.number}
          >
            {number}
          </Typography>
          <Box m={spacing} />
          <Typography className={classes.headlineTitle}>{title}</Typography>
        </Box>
      </Tooltip>

      <Box m={spacing - 0.2} />
      {/* Right */}
      <Box display="flex" alignItems="center">
        <Typography style={{ color: hotColor, fontSize: hotFontSize }} noWrap>
          {chineseHotValue}
        </Typography>
        <Box m={spacing} />
        <img
          className={classes.hotTag}
          src={tag_url}
          alt=""
          style={{ visibility: !tag_url && "hidden" }}
        />
      </Box>
    </Box>
  );
}
export default Headline;
