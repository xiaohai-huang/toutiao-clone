import { formatDistance, format } from "date-fns";
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
  if (timeAgo) {
    if (timeAgo.startsWith("大约")) {
      timeAgo = timeAgo.split("大约")[1];
    }
  }
  return timeAgo;
}

// Date.now() => 2021-02-28 上午 6:38:58
export function formatDate(publishTime) {
  if (!publishTime) {
    return "2012-02-29 上午 12:59:60";
  }
  let temp = publishTime * 10 ** 3;
  return format(new Date(temp), "PPpp", {
    locale: zhlocale,
  });
}

export function numberToChinese(number) {
  // number of digits required for chinese 万
  const W = 4;
  const numStr = number.toString();
  const len = numStr.length;
  if (len > W) {
    return numStr.slice(0, len - W) + "万";
  } else {
    return numStr;
  }
}
