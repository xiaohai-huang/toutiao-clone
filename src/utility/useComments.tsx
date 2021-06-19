import { useEffect, useState } from "react";
import newsApi from "../Api/newsApi";

function useComments(item_id: number | string) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    newsApi
      .getCommentsById(item_id)
      .then((apiComments) => setComments(apiComments))
      .finally(() => setLoading(false));
  }, [item_id]);

  return { comments, loading };
}

export default useComments;
