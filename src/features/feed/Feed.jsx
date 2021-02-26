import { Collapse, Grid, makeStyles } from "@material-ui/core";
import React from "react";

import newsApi from "../../Api/newsApi";
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
  const [news, setNews] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const Alert = useAlert("您有未读新闻，点击查看", setOpen);
  // fetch when category changes
  React.useEffect(() => {
    newsApi.getNews().then((news) => {
      setNews(news);
    });
  }, []);
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
    </Grid>
  );
}

export default Feed;
