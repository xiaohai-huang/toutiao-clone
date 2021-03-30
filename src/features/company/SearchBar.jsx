import React, { useState } from "react";
import { Box, Button, InputBase, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

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
  const [query, setQuery] = useState("");
  const history = useHistory();
  const handleSubmit = () => history.push(`/news/${query}`);

  return (
    <div className={classes.SearchBar}>
      <Box
        component="form"
        display="flex"
        flexDirection="row"
        onSubmit={handleSubmit}
      >
        <InputBase
          className={classes.input}
          placeholder="搜索站内资讯、视频或用户"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          color="primary"
          variant="contained"
          disableElevation
          disableRipple
          onClick={handleSubmit}
        >
          搜索
        </Button>
      </Box>
    </div>
  );
}

export default SearchBar;
