import { Box, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#d43d3d",
    height: "2.8rem",
  },
  logoContainer: {
    position: "relative",
    "& > .refreshButton": {
      position: "absolute",
      right: "-33px",
    },
  },
}));
function MobileHeader() {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      color="#fff"
      pl={2}
      pr={2}
    >
      <IconButton color="inherit" size="small">
        <MailOutlineIcon />
      </IconButton>
      <Box
        className={classes.logoContainer}
        display="flex"
        flexDirection="row"
        alignItems="center"
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
      <IconButton size="small" color="inherit">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default MobileHeader;
