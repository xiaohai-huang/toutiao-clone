import { useEffect, useState } from "react";
import newsApi from "../Api/newsApi";

function useNews(news_id) {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);
  // initial fetch
  useEffect(() => {
    setMounted(true);
    setLoading(true);
    newsApi
      .getNewsById(news_id)
      .then((n) => {
        if (mounted) {
          setNews(n);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return () => {
      setMounted(false);
    };
    // eslint-disable-next-line
  }, [news_id]);

  const isVideo = Boolean(news.video_id);
  return { news, isVideo, loading };
}

export default useNews;
