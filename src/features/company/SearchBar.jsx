import React from "react";
import { Box, Button, InputBase, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  SearchBar: {},
  input: {
    background: theme.palette.background.secondary,
    padding: "3px 10px",
    paddingRight: "0px",
    border: "1px solid #e8e8e8",
    [theme.breakpoints.only("md")]: {
      fontSize: "0.93rem",
    },
  },
}));

function SearchBar() {
  const classes = useStyles();

  return (
    <div className={classes.SearchBar}>
      <Box component="form" display="flex" flexDirection="row">
        <InputBase
          className={classes.input}
          placeholder="搜索站内资讯、视频或用户"
          fullWidth
        />
        <Button
          color="primary"
          variant="contained"
          disableElevation
          disableRipple
        >
          搜索
        </Button>
      </Box>
    </div>
  );
}

export default SearchBar;
