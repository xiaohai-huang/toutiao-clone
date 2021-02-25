import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Popover, Typography } from "@material-ui/core";
import Weather from "./Weather";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#222",
    lineHeight: "20px",
    height: "34px",
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    "& .toolBar_Link": {
      padding: "0 10px",
      borderRight: "1px solid #3a3a3a",
    },
  },
  toolBar: {},
  weather: {
    paddingLeft: "7px",
    "& h6": {
      marginRight: "11px",
    },
  },
  popover: {
    pointerEvents: "none",
    marginTop: "0.4rem",
  },
  paper: {
    border: "none",
  },
}));

function WeatherTool() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box
      className={classes.weather}
      display="flex"
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onClick={() => console.log("click")}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Typography variant="subtitle2">北京</Typography>
      <Typography variant="subtitle2">多云</Typography>
      <Typography variant="subtitle2">
        <b>-3</b>℃ &nbsp;/&nbsp; <b>6</b>℃
      </Typography>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        className={classes.popover}
        classes={{ paper: classes.paper }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Weather />
      </Popover>
    </Box>
  );
}

function Header() {
  const classes = useStyles();

  return (
    <Box display={{ xs: "none", sm: "block", md: "block" }}>
      <AppBar className={classes.appBar} position="static" elevation={0}>
        <Box
          className={classes.toolBar}
          display="flex"
          justifyContent="space-between"
        >
          <Box className={classes.leftNav} display="flex">
            <Typography className="toolBar_Link" variant="subtitle2">
              下载APP
            </Typography>
            <Typography className="toolBar_Link" variant="subtitle2">
              注册头条号
            </Typography>

            <WeatherTool />
          </Box>
          <Box className={classes.rightNav} display="flex">
            <Typography className="toolBar_Link" variant="subtitle2">
              侵权投诉
            </Typography>
            <Typography className="toolBar_Link" variant="subtitle2">
              头条产品
            </Typography>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}

export default Header;
