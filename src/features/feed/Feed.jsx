import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  newsDeleted,
  fetchNews,
  fetchSearchResults,
  categoryDeleted,
} from "./feedSlice";

import useAlert from "../../utility/useAlert";
import CardWrapper from "./CardWrapper";
import MediaCard from "./MediaCard";
import SimpleContentCard from "./SimpleContentCard";
import UGCCard from "./UGCCard";
import { selectSearchQuery } from "../search/searchSlice";

const useStyles = makeStyles((theme) => ({
  feedContainer: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0.2rem",
      paddingRight: "0.15rem",
    },
  },
  alertContainer: {
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.mobileStepper,
  },
}));

function Feed() {
  const classes = useStyles();
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const category = useSelector((state) => state.feed.category);
  const news = useSelector((state) => state.feed.news[category]);
  const status = useSelector((state) => state.feed.status);
  const oldQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);
  const [failCount, setFailCount] = React.useState(0);
  const Alert = useAlert("您有未读新闻，点击查看", setOpen);

  // initial fetch
  React.useEffect(() => {
    // fetch search_results for search category
    if (category === "search_results") {
      if (news.length === 0) {
        dispatch(fetchSearchResults());
      }
    } else {
      dispatch(fetchNews(category));
    }
    // close pop up
    const timerId = setTimeout(() => {
      setOpen(false);
    }, 3000);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch when category changes
  React.useEffect(() => {
    // fetch search_results for search category
    if (category === "search_results") {
      if (news.length === 0) {
        dispatch(fetchSearchResults());
      } else if (news.length > 40) {
        dispatch(newsDeleted({ category: "search_results", count: 25 }));
      }
    } else {
      dispatch(fetchNews(category));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, category]);

  React.useEffect(() => {
    if (category === "search_results") {
      dispatch(categoryDeleted("search_results"));
      dispatch(fetchSearchResults(oldQuery));
    }
  }, [dispatch, category, oldQuery]);

  // re-fetch when no new content is fetched
  // React.useEffect(() => {
  //   if (status === "failded" && failCount <= 2) {
  //     dispatch(fetchNews(category));
  //   }
  //   if (status === "successed") {
  //     setFailCount(0);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, status]);

  const handleClick = () => {
    dispatch(fetchNews(category));
    // fetch more search results
    if (category === "search_results") {
      dispatch(fetchSearchResults(oldQuery));
    }
    if (status === "failed") {
      setFailCount(failCount + 1);
    }
  };

  return (
    <Grid container direction="column" className={classes.feedContainer}>
      <Grid item xs className={classes.alertContainer}>
        <Collapse in={open}>
          <Alert />
        </Collapse>
      </Grid>
      <Grid item xs>
        {news.map((newsArticle) => {
          // console.log(newsArticle.more_mode);
          // console.log(newsArticle.title);
          if (!newsArticle.item_id) {
            return undefined;
          }

          // don't display more mode news on xs screen
          if (newsArticle.article_genre === "ugc" && xs) {
            // console.log("articles hidden: " + newsArticle.title);
            return undefined;
          }
          if (newsArticle.article_genre === "ugc") {
            return (
              <CardWrapper key={newsArticle.item_id}>
                <UGCCard {...newsArticle} />
              </CardWrapper>
            );
          }
          if (newsArticle.single_mode && newsArticle.image_url) {
            return (
              <CardWrapper key={newsArticle.item_id}>
                <MediaCard {...newsArticle} />
              </CardWrapper>
            );
          } else {
            return (
              <CardWrapper key={newsArticle.item_id}>
                <SimpleContentCard key={newsArticle.item_id} {...newsArticle} />
              </CardWrapper>
            );
          }
        })}
      </Grid>

      <Grid item xs>
        <Box pt={2} display="flex" flexDirection="column" alignItems="center">
          {failCount >= 1 && <Typography>Already up to date...</Typography>}
          <Box mb={2} />
          {status === "loading" && <CircularProgress color="secondary" />}
          <Box mb={2} />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            更多
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Feed;
