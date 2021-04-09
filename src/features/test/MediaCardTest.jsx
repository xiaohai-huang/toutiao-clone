import React, { useEffect, useState } from "react";
import MediaCard from "../feed/MediaCard";
import SimpleContentCard from "../feed/SimpleContentCard";

function MediaCardTest() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4500/tt/news/search?search_query=xiaohai")
      .then((res) => res.json())
      .then((js) => setData(js));
  }, []);

  return (
    <div>
      {data.map((n) => {
        if (n.single_mode) {
          return <MediaCard key={n.item_id} {...n} />;
        } else if (n) {
          return <SimpleContentCard key={n.item_id} {...n} />;
        }
        return undefined;
      })}
    </div>
  );
}

export default MediaCardTest;
