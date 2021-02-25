import React from "react";
import { useEffect, useState } from "react";

import { timeAgo } from "../../utility/utility";
function HotBoard() {
  const [headlines, setHeadlines] = useState([{}]);
  const [publishTime, setPubilishTime] = useState(Date.now());
  useEffect(() => {
    fetch("MockData/hotboard.json")
      .then((res) => res.json())
      .then((json) => {
        setHeadlines(json.data);
        // 1000 ms precision loss
        setPubilishTime(timeAgo(json.publish_time));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {publishTime}
      <div>current: {Date.now()} </div>
      <div>pub: {publishTime} </div>
    </div>
  );
}

export default HotBoard;
