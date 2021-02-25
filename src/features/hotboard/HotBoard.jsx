import React from "react";
import { format, formatDistance } from "date-fns";
import zhlocale from "date-fns/locale/zh-CN";
import { useEffect, useState } from "react";
function HotBoard() {
  const [headlines, setHeadlines] = useState([{}]);
  const [publishTime, setPubilishTime] = useState(Date.now());
  useEffect(() => {
    fetch("MockData/hotboard.json")
      .then((res) => res.json())
      .then((json) => {
        setHeadlines(json.data);
        // 1000 ms precision loss
        let temp = 1614134546;
        setPubilishTime(temp * 10 ** 3);
        // setPubilishTime(json.publish_time * 10 ** 3);
      })
      .catch((err) => console.log(err));
  }, []);
  const time = formatDistance(new Date(), new Date(publishTime), {
    addSuffix: true,
    includeSeconds: true,
    locale: zhlocale,
  });
  return (
    <div>
      {time}
      <div>
        current: {Date.now()} {format(Date.now(), "pp")}
      </div>
      <div>
        pub: {publishTime} {format(publishTime, "pp")}
      </div>
    </div>
  );
}

export default HotBoard;
