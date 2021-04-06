import { Box, makeStyles, useMediaQuery } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import MovieCard from "./MovieCard";

const useStyles = makeStyles((theme) => ({
  movieList: {
    "& > *": {
      marginRight: "0.6rem",
    },
    "& :last-child": {
      marginRight: "0px",
    },
  },
}));
function MovieList({ movies }) {
  const classes = useStyles();
  const history = useHistory();
  const sm = useMediaQuery((theme) => theme.breakpoints.only("sm"));
  const md = useMediaQuery((theme) => theme.breakpoints.only("md"));
  if (md) {
    movies = movies.slice(0, 4);
  } else if (sm) {
    movies = movies.slice(0, 3);
  }

  return (
    <Box
      className={classes.movieList}
      display="flex"
      justifyContent="space-between"
    >
      {movies.map((m) => {
        const handleMovieClick = () => {
          history.push(`/video/${m.item_id}`);
        };
        return <MovieCard key={m.item_id} onClick={handleMovieClick} {...m} />;
      })}
    </Box>
  );
}

export default MovieList;
