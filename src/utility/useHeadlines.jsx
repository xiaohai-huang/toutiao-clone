import { useEffect, useState } from "react";
import newsApi from "../Api/newsApi";

function useHeadlines() {
  const [headlines, setHeadlines] = useState([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // newsApi.getHotboard().then((h) => console.log(h));
    setMounted(true);
    newsApi.getHotboard().then((h) => {
      if (mounted) {
        setHeadlines(h);
      }
    });
    return () => {
      setMounted(false);
    };
  }, [mounted]);
  return headlines;
}

export default useHeadlines;
