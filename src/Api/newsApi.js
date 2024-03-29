let newsApi = {};
const BASE_URL = "https://toutiao-proxy.herokuapp.com/tt";
// const BASE_URL = "https://api.xiaotiao.site:9443/tt";
let TENCENT_SERVER = "https://toutiao-proxy.herokuapp.com/tt";

const getLocation = () => {
  return "CN";
  // return fetch("https://ipinfo.io/country?token=bf9a05b30d48f7")
  //   .then((r) => r.text())
  //   .then((country) => {
  //     country = country.trim();
  //     return country;
  //   });
};

const handleMyOwnNews = () => {
  const category = "xiaohai";
  // const test = "MockData/xiaohai/xiaohai_news.json";
  const test = `http://localhost:4500/tt/news/findByCategory?category=${category}&max_behot_time=0`;
  const production = `${TENCENT_SERVER}/news/findByCategory?category=${category}&max_behot_time=0`;

  const url = process.env.NODE_ENV === "development" ? test : production;
  return fetch(url)
    .then((res) => res.json())
    .then((js) => js.data);
};

newsApi.getNews = async (time, category = "__all__") => {
  if (category === "xiaohai") {
    return handleMyOwnNews();
  }

  const local = "/MockData/news.json";
  const test = `http://localhost:4500/tt/news/findByCategory?category=${category}&max_behot_time=${time}`;
  const production = `${BASE_URL}/news/findByCategory?category=${category}&max_behot_time=${time}`;

  const url = process.env.NODE_ENV === "development" ? test : production;
  const remoteData = await fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)
    .catch(() => console.log("Cannot fetch live data for news."));

  // if live data fetch failed
  // switch to mock data
  let data = remoteData;
  const hasData = remoteData && Object.keys(remoteData).length > 0;
  if (!hasData) {
    console.log("Use local news data.");
    data = await fetch(local)
      .then((res) => res.json())
      .then((json) => json.data);
  }
  return data;
};

// channel = "tuijian" "dianying"
// time = 1616315678
newsApi.getVideos = async (channel, count, time) => {
  // need refine
  const currentLocation = await getLocation();
  if (currentLocation !== "CN") {
    console.log(`You are in ${currentLocation} use Heroku Api`);
    TENCENT_SERVER = BASE_URL;
  } else {
    console.log("You are in =China= use Tencent Cloud Api");
  }

  console.log(currentLocation + " = " + TENCENT_SERVER);
  // need refine
  const local = "/MockData/videos.json";
  const test = "http://localhost:4500/tt/videos";
  const production = `${TENCENT_SERVER}/videos`;

  const url = process.env.NODE_ENV === "development" ? test : production;
  const remoteData = await fetch(url)
    .then((res) => res.json())
    .catch(() => console.log("Cannot fetch live videos"));

  if (remoteData) {
    return remoteData;
  } else {
    console.log("Use local videos");
    let localData = await fetch(local).then((res) => res.json());
    return localData;
  }
};

newsApi.getVideoUrl = async (news_id) => {
  // need refine
  const currentLocation = await getLocation();
  if (currentLocation !== "CN") {
    console.log(`You are in ${currentLocation} use Heroku Api`);
    TENCENT_SERVER = BASE_URL;
  } else {
    console.log("You are in China use Tencent Cloud Api");
  }

  console.log(currentLocation + " = " + TENCENT_SERVER);
  // need refine

  const local = "/MockData/videoUrl.json";
  const test = `http://localhost:4500/tt/videos/${news_id}`;
  const production = `${TENCENT_SERVER}/videos/${news_id}`;
  const url = process.env.NODE_ENV === "development" ? test : production;

  const remoteData = await fetch(url)
    .then((res) => res.json())
    .then((js) => js.video)
    .catch((err) => console.log("Cannot fetch remote video url"));
  if (remoteData) {
    return remoteData;
  } else {
    console.log("Use local video url");
    const localData = await fetch(local)
      .then((res) => res.json())
      .then((js) => js.video);
    return localData;
  }
};

newsApi.getNewsById = async (item_id) => {
  // need refine
  const currentLocation = await getLocation();
  if (currentLocation !== "CN") {
    console.log(`You are in ${currentLocation} use Heroku Api`);
    TENCENT_SERVER = BASE_URL;
  } else {
    console.log("You are in China use Tencent Cloud Api");
  }

  // console.log(currentLocation !== "CN");
  console.log(currentLocation + " = " + TENCENT_SERVER);
  // need refine

  let testVideo = true;
  const localNews = "/MockData/news_details.json";
  const localVideo = "/MockData/video_details.json";
  const test = `http://localhost:4500/tt/news/${item_id}`;
  const production = `${TENCENT_SERVER}/news/${item_id}`;

  const url = process.env.NODE_ENV === "development" ? test : production;
  let data = await fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)
    .catch(() => console.log("Cannot fetch news details data."));
  if (!data) {
    console.log("use local news details");
    data = await fetch(testVideo ? localVideo : localNews)
      .then((res) => res.json())
      .then((json) => {
        return json.data;
      });
  }
  // if the news contains video
  const MOVIE_GROUP = 24;
  // console.log("data.group_source" + data.group_source);
  if (data.video_id || data.group_source === MOVIE_GROUP) {
    data.videoUrl = await newsApi.getVideoUrl(item_id);
  }

  return data;
};

newsApi.getHotboard = async () => {
  const local = "/MockData/hotboard.json";

  const test = `http://localhost:4500/tt/hotboard`;
  const production = `${BASE_URL}/hotboard`;

  const url = process.env.NODE_ENV === "development" ? test : production;

  const remoteData = await fetch(url)
    .then((res) => res.json())
    .then((js) => js.data)
    .catch(() => console.log("Cannot fetch remote hotboard data"));
  if (remoteData) {
    return remoteData;
  } else {
    console.log("Use local hotboard data");
    const localData = await fetch(local)
      .then((res) => res.json())
      .then((js) => js.data.data);

    return localData;
  }
};

newsApi.getSearchResults = async (query, offset = 0) => {
  const production = `${BASE_URL}/news/search?search_query=${query}&offset=${offset}`;
  const test = `http://localhost:4500/tt/news/search?search_query=${query}&offset=${offset}`;
  const url = process.env.NODE_ENV === "development" ? test : production;

  let data = await fetch(url).then((res) => res.json());

  return data;
};

newsApi.getCommentsById = async (news_id, offset) => {
  // const test = "/MockData/comments.json";
  const test = `http://localhost:4500/tt/comments/${news_id}?offset=${offset}`;
  const production = `${BASE_URL}/comments/${news_id}?offset=${offset}`;

  const url = process.env.NODE_ENV === "development" ? test : production;
  const remoteData = await fetch(url)
    .then((res) => res.json())
    .catch((err) =>
      console.log(
        err + " Cannot fetch live data for comments with news id" + news_id
      )
    );

  // if live data fetch failed
  // switch to mock data
  let data = remoteData;
  const hasData = remoteData && Object.keys(remoteData).length > 0;
  if (!hasData) {
    console.log("Use local comments data.");
    data = await fetch(test).then((res) => res.json());
  }
  return data;
};

newsApi.getCommentReplyListById = (comment_id) => {
  const test = `http://localhost:4500/tt/reply_list/${comment_id}`;
  const production = `${BASE_URL}/reply_list/${comment_id}`;
  const url = process.env.NODE_ENV === "development" ? test : production;
  return fetch(url).then((res) => res.json());
};

newsApi.getWeather = async () => {
  // const test = "MockData/weather.json";
  const test = "http://localhost:4500/tt/weather";
  const production = "https://toutiao-proxy.herokuapp.com/tt/weather";

  const url = process.env.NODE_ENV === "development" ? test : production;
  const remoteData = await fetch(url) // url!!!!
    .then((res) => res.json())
    .then((json) => json.weather)
    .catch(() => console.log("Cannot fetch weather data for weather."));

  // if live data fetch failed
  // switch to mock data
  let data = remoteData;
  const hasData = remoteData && Object.keys(remoteData).length > 0;
  if (!hasData) {
    console.log("Use local weather data.");
    data = await fetch(test)
      .then((res) => res.json())
      .then((json) => json.weather);
  }
  return data;
};

newsApi.getCategories = () => {
  return fetch("/MockData/categories.json")
    .then((res) => res.json())
    .then((json) => json.categories);
};

newsApi.uploadNews = (data, token) => {
  const test = `http://localhost:4500/tt/news`;
  const production = `${BASE_URL}/news`;

  const url = process.env.NODE_ENV === "development" ? test : production;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

newsApi.editNews = (data, news_id, token) => {
  const test = `http://localhost:4500/tt/news/${news_id}`;
  const production = `${BASE_URL}/news/${news_id}`;

  const url = process.env.NODE_ENV === "development" ? test : production;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

newsApi.deleteNews = (news_id, token) => {
  const test = `http://localhost:4500/tt/news/${news_id}`;
  const production = `${BASE_URL}/news/${news_id}`;

  const url = process.env.NODE_ENV === "development" ? test : production;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
export default newsApi;
