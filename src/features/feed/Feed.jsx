import { Grid } from "@material-ui/core";
import React from "react";

import newsApi from "../../Api/newsApi";
import SimpleContentCard from "./SimpleContentCard";

function Feed() {
  const [news, setNews] = React.useState([]);
  // fetch when category changes
  React.useEffect(() => {
    newsApi.getNews().then((news) => {
      setNews(news);
    });
  }, []);
  return (
    <Grid container>
      <Grid item xs>
        {news.map((newsArticle) => {
          return (
            <SimpleContentCard key={newsArticle.item_id} {...newsArticle} />
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Feed;
