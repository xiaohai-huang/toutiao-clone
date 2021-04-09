import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { searchQueryUpdated, selectSearchQuery } from "../search/searchSlice";
import { useHistory } from "react-router";
import { categoryDeleted } from "../feed/feedSlice";
const useStyles = makeStyles((theme) => ({
  input: {
    color: "inherit",
  },
}));

function MobileSearch({ className, setShowSearch }) {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const oldQuery = useSelector(selectSearchQuery);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    setShowSearch(false);

    if (oldQuery !== query) {
      dispatch(categoryDeleted("search_results"));
      dispatch(searchQueryUpdated(query));
    }

    history.push("/search_results");
  };

  return (
    <Box pl={0.3} pr={0.3} className={className}>
      {/* input */}
      <Box
        component="form"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onSubmit={handleSearch}
      >
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          classes={{ root: classes.textField }}
          fullWidth
          autoFocus
          placeholder="Search"
          variant="outlined"
          size="small"
          color="secondary"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            color: "secondary",
            classes: {
              root: classes.input,
            },
          }}
        />
        <Button
          color="inherit"
          size="small"
          onClick={() => setShowSearch(false)}
        >
          Cancel
        </Button>
      </Box>
      {/* headlines */}
      <Box></Box>
    </Box>
  );
}

export default MobileSearch;
