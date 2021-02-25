import { formatDistance } from "date-fns";
import zhlocale from "date-fns/locale/zh-CN";

// publish time precision is 1000 ms level = 1s
export function timeAgo(publishTime) {
  let temp = publishTime * 10 ** 3;
  let timeAgo = formatDistance(new Date(temp), new Date(), {
    addSuffix: true,
    includeSeconds: true,
    locale: zhlocale,
  });

  timeAgo = timeAgo.split(" ");
  timeAgo = timeAgo.join("");
  return timeAgo;
}
