import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import throttle from "lodash.throttle";

import { fetchNews } from "./feedSlice";
import useAlert from "../../utility/useAlert";
import CardWrapper from "./CardWrapper";
import MediaCard from "./MediaCard";
import SimpleContentCard from "./SimpleContentCard";

const useStyles = makeStyles((theme) => ({
  alertContainer: {
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.snackbar,
  },
}));
function Feed() {
  const classes = useStyles();
  // const [news, setNews] = React.useState([]);
  const news = useSelector((state) => state.feed.news);
  const status = useSelector((state) => state.feed.status);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);
  const Alert = useAlert("您有未读新闻，点击查看", setOpen);
  // fetch when category changes
  React.useEffect(() => {
    if (status === "idle" || status === "failed") {
      throttle(() => {
        dispatch(fetchNews());
      }, 4000)();
    }
  }, [dispatch, status]);

  const handleClick = () => {
    dispatch(fetchNews());
    // dispatch(fetchNews(nextTime));
  };
  return (
    <Grid container direction="column">
      <Grid item xs className={classes.alertContainer}>
        <Collapse in={open}>
          <Alert />
        </Collapse>
      </Grid>
      <Grid item xs>
        {news.map((newsArticle) => {
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
          {status === "loading" && <CircularProgress color="secondary" />}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Feed;
