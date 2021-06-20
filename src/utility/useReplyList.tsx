import { useEffect, useState } from "react";
import newsApi from "../Api/newsApi";

function useReplyList(comment_id: string) {
  const [replyList, setReplayList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    newsApi
      .getCommentReplyListById(comment_id)
      .then((apiReplyList) => setReplayList(apiReplyList))
      .finally(() => setLoading(false));
  }, [comment_id]);

  return { replyList, loading };
}

export default useReplyList;
