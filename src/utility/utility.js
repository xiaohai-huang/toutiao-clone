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
// publishTime: 1616302548
export function formatDate(publishTime, formatStr) {
  // {formatDate(publish_time, "PPP")} => 2021年3月21日
  if (!publishTime) {
    return "2012-02-29 上午 12:59:60";
  }
  let temp = publishTime * 10 ** 3;
  return format(new Date(temp), formatStr ? formatStr : "PPpp", {
    locale: zhlocale,
  });
}

export function numberToChinese(number = 0) {
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

// only support duration under 1 hour
export function secondsToTimeStr(seconds) {
  // 620 => 10:20
  const mins = Math.floor(seconds / 60);
  const s = seconds - mins * 60;
  return `${mins}:${s}`;
}

// "<p><div class="tt-video-box" tt-videoid='v03004250000c18a1m3ao9dbg8tvqmt0'
// tt-poster='http://p3.pstatp.com/large/tos-cn-i-0004/b24579d3aed84f339099da80c3608983'>
// 视频加载中...</div><script src="https://s0.pstatp.com/tt_player/tt.player.js?v=20160723"></script></p><p>虽然自从美国前总统特朗普执政中期开始，美国军政高层就在疯狂叫嚣和中国打仗，但是从实际军费开支和部署情况看，美军所做的都是一些“小动作”。我们并没有看到美军在中国周边实施有规模的军事集结和部署，以当前印度洋和太平洋地区的美军兵力兵器，甚至不足以对中小国家发起一场局部战争，更不要说和中国打仗了。但是这并不妨碍美国各军兵种拿中国当做接口，向国会不断伸手要钱。（美国高层疯狂叫嚣和中国打仗，但印太美军真打得过解放军吗？）</p>"
export function getVideoDetails(content) {
  const re = /<p>(.*?)<\/p>/g;
  let result;
  try {
    result = [...content.matchAll(re)].pop()[1];
    if (!result) {
      result = "nothing";
    }
    // result = [...content.matchAll(re)].pop().pop();
  } catch {
    result = "loading...";
  }

  return result;
}
