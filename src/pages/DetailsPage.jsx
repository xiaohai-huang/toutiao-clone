import { LinearProgress } from "@material-ui/core";
import React from "react";
import { Redirect, useParams } from "react-router-dom";

import useNews from "../utility/useNews";
import NewsDetailsPage from "./NewsDetailsPage";
import AppBar from "../features/common/AppBar";
import { useDispatch } from "react-redux";
import { addNewVideoDetails } from "../features/video/videoSlice";

function DetailsPage() {
  const { news_id } = useParams();
  const { news, isVideo, loading } = useNews(news_id);
  const dispatch = useDispatch();
  let content;
  if (loading) {
    content = <LinearProgress color="secondary" />;
  } else {
    if (isVideo) {
      dispatch(addNewVideoDetails(news));
      // history.push(`/video/${news_id}`);
      return <Redirect to={`/video/${news_id}`} />;
    }
    content = <NewsDetailsPage news={news} news_id={news_id} />;
  }
  return <AppBar>{content}</AppBar>;
}

export default DetailsPage;
