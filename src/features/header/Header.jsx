import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch } from "react-redux";

import WeatherPopover from "./WeatherPopover";
import useMouseOverPopover from "../../utility/useMouseOverPopover";
import PropductsPopover from "./PropductsPopover";
import MobileHeader from "./MobileHeader";
import { deviceUpdated } from "../../app/appSlice";
const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#222",
    width: "100vw",
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
}));

function WeatherTool() {
  const classes = useStyles();
  const Main = () => (
    <Box display="flex" className={classes.weather}>
      <Typography variant="subtitle2">北京</Typography>
      <Typography variant="subtitle2">多云</Typography>
      <Typography variant="subtitle2">
        <b>-3</b>℃ &nbsp;/&nbsp; <b>6</b>℃
      </Typography>
    </Box>
  );

  return useMouseOverPopover(Main, WeatherPopover);
}

const RightNav = () => {
  const classes = useStyles();
  const Products = () => {
    const Text = () => (
      <Typography className="toolBar_Link" variant="subtitle2">
        头条产品
      </Typography>
    );

    return useMouseOverPopover(Text, PropductsPopover);
  };
  return (
    <Box className={classes.rightNav} display="flex" pr={2}>
      <Typography className="toolBar_Link" variant="subtitle2">
        侵权投诉
      </Typography>
      <Products />
    </Box>
  );
};

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  setTimeout(() => {
    dispatch(deviceUpdated(mobile ? "mobile" : "PC"));
  }, 1000);
  return xs ? (
    <MobileHeader />
  ) : (
    <Box>
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
            {/* <WeatherTool /> */}
          </Box>
          <RightNav />
        </Box>
      </AppBar>
    </Box>
  );
}

export default Header;
