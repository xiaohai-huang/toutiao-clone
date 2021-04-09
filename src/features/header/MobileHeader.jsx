import { Badge, Box, IconButton, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Channel from "../channel/Channel";
import MobileSearch from "./MobileSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.appBar,
  },
  nav: {
    background: "#d43d3d",
    height: "2.8rem",
  },
  badge: {
    background: "#fff",
  },
  logoContainer: {
    "&:hover": {
      cursor: "pointer",
    },
    position: "relative",
    "& > .refreshButton": {
      position: "absolute",
      right: "-33px",
    },
  },
  hide: {
    display: "none !important",
  },
  search: {
    position: "absolute",
    zIndex: theme.zIndex.drawer,
    backgroundColor: "#d43d3d",
    color: "white",
    top: "2px",
    width: "100%",
  },
}));
function MobileHeader() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const category = useSelector((state) => state.feed.category);
  const [showSearch, setShowSearch] = useState(false);
  return (
    // <Box className={currentPosition === "video" ? classes.hide : classes.root}>
    <Box className={classes.root}>
      {/* app bar */}
      <Box
        className={classes.nav}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        color="#fff"
        pl={2}
        pr={2}
      >
        <IconButton
          color="inherit"
          size="small"
          onClick={() => history.push("/news/create")}
        >
          <Badge
            classes={{ colorPrimary: classes.badge }}
            variant="dot"
            color="primary"
            overlap="circle"
            badgeContent=" "
          >
            <MailOutlineIcon />
          </Badge>
        </IconButton>
        <Box
          className={classes.logoContainer}
          display="flex"
          flexDirection="row"
          alignItems="center"
          onClick={() => history.push("/" + category)}
        >
          <img
            src="https://sf1-scmcdn2-tos.pstatp.com/mobile_list/image/wap_logo@3x_581de69e.png"
            alt="今日头条"
            style={{ width: "83px", height: "21px" }}
          />
          <IconButton className="refreshButton" size="small" color="inherit">
            <RefreshIcon />
          </IconButton>
        </Box>
        <IconButton
          size="small"
          color="inherit"
          onClick={() => setShowSearch(true)}
        >
          <SearchIcon />
        </IconButton>
      </Box>
      {showSearch && (
        <MobileSearch
          className={classes.search}
          setShowSearch={setShowSearch}
        />
      )}
      <Channel className={!isHomePage(pathname) && classes.hide} />
    </Box>
  );
}

function isHomePage(pathname = "") {
  const re = /\/[^/]+/g;
  let results = [...pathname.matchAll(re)];
  return results.length === 1;
}

export default MobileHeader;
