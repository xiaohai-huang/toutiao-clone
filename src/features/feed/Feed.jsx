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

import { fetchNews } from "./feedSlice";
import useAlert from "../../utility/useAlert";
import CardWrapper from "./CardWrapper";
import MediaCard from "./MediaCard";
import SimpleContentCard from "./SimpleContentCard";
import UGCCard from "./UGCCard";

const useStyles = makeStyles((theme) => ({
  feedContainer: {
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
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
  // const [news, setNews] = React.useState([]);
  const category = useSelector((state) => state.feed.category);
  const news = useSelector((state) => state.feed.news[category]);
  const status = useSelector((state) => state.feed.status);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);
  const [failCount, setFailCount] = React.useState(0);
  const Alert = useAlert("您有未读新闻，点击查看", setOpen);
  const onScroll = () => {
    // copied from css tricks
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);
    if (scrollPercentRounded > 80) {
      // fetch new news
      // dispatch(fetchNews(category));
    }
  };
  // initial fetch
  React.useEffect(() => {
    dispatch(fetchNews(category));
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  // fetch when category changes
  React.useEffect(() => {
    dispatch(fetchNews(category));
  }, [dispatch, category]);
  // re-fetch when no new content fetched
  React.useEffect(() => {
    if (status === "failded" && failCount <= 2) {
      dispatch(fetchNews(category));
    }
    if (status === "successed") {
      setFailCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, status]);

  const handleClick = () => {
    dispatch(fetchNews(category));
    if (status === "failed") {
      setFailCount(failCount + 1);
    }
    // dispatch(fetchNews(nextTime));
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
          if (newsArticle.single_mode) {
            return (
              <CardWrapper key={newsArticle.item_id}>
                <MediaCard {...newsArticle} />
              </CardWrapper>
            );
          }
          return (
            <CardWrapper key={newsArticle.item_id}>
              <SimpleContentCard key={newsArticle.item_id} {...newsArticle} />
            </CardWrapper>
          );
        })}
      </Grid>

      <Grid item xs>
        <Box pt={2} display="flex" flexDirection="column" alignItems="center">
          <Button variant="contained" color="secondary" onClick={handleClick}>
            更多
          </Button>
          <Box mb={2} />
          {failCount >= 1 && <Typography>Already up to date...</Typography>}
          {status === "loading" && <CircularProgress color="secondary" />}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Feed;
