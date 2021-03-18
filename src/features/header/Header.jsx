import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import WeatherPopover from "./WeatherPopover";
import useMouseOverPopover from "../../utility/useMouseOverPopover";
import PropductsPopover from "./PropductsPopover";
import MobileHeader from "./MobileHeader";
import { deviceUpdated } from "../../app/appSlice";
import newsApi from "../../Api/newsApi";
import { userLogout } from "../../app/appSlice";
const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#222",
    width: "100%",
    lineHeight: "20px",
    height: "34px",
    display: "flex",
    justifyContent: "center",
  },
  toolBar_Link: {
    padding: "0 10px",
    borderRight: "1px solid #3a3a3a",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.grey[300],
    },
  },
  loginButton: {
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.grey[300],
    },
  },
  toolBar: {
    height: "100%",
  },
  rightNav: {
    height: "100%",
  },
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
  const [weather, setWeather] = useState({});
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  useEffect(() => {
    if (!xs) {
      let isMounted = true;
      newsApi.getWeather().then((wea) => isMounted && setWeather(wea));
      return () => (isMounted = false);
    }
  }, [xs]);
  const {
    city_name,
    current_condition,
    dat_low_temperature,
    dat_high_temperature,
  } = weather;
  const Main = () => (
    <Box display="flex" className={classes.weather}>
      <Typography variant="subtitle2">{city_name}</Typography>
      <Typography variant="subtitle2">{current_condition}</Typography>
      <Typography variant="subtitle2">
        <b>{dat_low_temperature}</b>℃ &nbsp;/&nbsp;{" "}
        <b>{dat_high_temperature}</b>℃
      </Typography>
    </Box>
  );
  const Pop = () => <WeatherPopover {...weather} />;

  return useMouseOverPopover(Main, Pop);
}

const RightNav = ({ mobile, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);

  const Products = () => {
    const Text = () => (
      <Typography className={classes.toolBar_Link} variant="subtitle2">
        头条产品
      </Typography>
    );

    return useMouseOverPopover(Text, PropductsPopover);
  };
  const Login = () => (
    <Box
      style={{ backgroundColor: "#ed4040" }}
      alignSelf="stretch"
      display="flex"
      alignItems="center"
      pl={2.5}
      pr={2.5}
    >
      <Typography
        className={classes.loginButton}
        variant="subtitle2"
        onClick={() => history.push("/login")}
      >
        登录
      </Typography>
    </Box>
  );
  const Logout = () => (
    <Typography
      className={classes.toolBar_Link}
      variant="subtitle2"
      onClick={() => dispatch(userLogout())}
    >
      注销
    </Typography>
  );
  return (
    <Box className={classes.rightNav} display="flex" pr={2} alignItems="center">
      {user && (
        <Typography className={classes.toolBar_Link} variant="subtitle2">
          你好，{user.username}
        </Typography>
      )}
      {user ? <Logout /> : <Login />}
      {!mobile ? (
        <>
          <Typography className={classes.toolBar_Link} variant="subtitle2">
            侵权投诉
          </Typography>
          <Products />
        </>
      ) : (
        <Typography
          className={classes.toolBar_Link}
          variant="subtitle2"
          onClick={() => history.push("/news/create")}
        >
          新头条
        </Typography>
      )}
    </Box>
  );
};

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  setTimeout(() => {
    dispatch(deviceUpdated(mobile ? "mobile" : "PC"));
  }, 500);
  return xs ? (
    <MobileHeader />
  ) : (
    <Box>
      <AppBar className={classes.appBar} position="static" elevation={0}>
        <Box
          className={classes.toolBar}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box className={classes.leftNav} display="flex">
            <Typography
              className={classes.toolBar_Link}
              variant="subtitle2"
              onClick={() => history.push("/")}
            >
              下载APP
            </Typography>
            <Typography
              className={classes.toolBar_Link}
              variant="subtitle2"
              onClick={() => history.push("/register")}
            >
              注册头条号
            </Typography>
            <WeatherTool />
            {/* <WeatherTool /> */}
          </Box>
          <RightNav mobile={mobile} history={history} />
        </Box>
      </AppBar>
    </Box>
  );
}

export default Header;
