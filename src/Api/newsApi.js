let newsApi = {};
const BASE_URL = "https://toutiao-proxy.herokuapp.com/tt";

newsApi.getNews = async (time, category = "__all__") => {
  const test = "MockData/news.json";
  // const production = `http://localhost:4500/tt/news/findByCategory?category=${category}&max_behot_time=${time}`;
  const production = `${BASE_URL}/news/findByCategory?category=${category}&max_behot_time=${time}`;

  const url = false ? test : production;
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
    data = await fetch(test)
      .then((res) => res.json())
      .then((json) => json.data);
  }
  return data;
};

newsApi.getNewsById = async (item_id) => {
  const test = "/MockData/news_details.json";
  // const production = `http://localhost:4500/tt/news/${item_id}`;
  const production = `${BASE_URL}/news/${item_id}`;

  const url = false ? test : production;
  const data = await fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

  return data;
};

newsApi.getCommentsById = async (news_id, offset) => {
  const test = "MockData/comments.json";
  // const production = `http://localhost:4500/tt/comments/${news_id}?offset=${offset}`;
  const production = `${BASE_URL}/comments/${news_id}?offset=${offset}`;

  const url = false ? test : production;
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

newsApi.getWeather = async () => {
  const test = "MockData/weather.json";
  const production = "https://toutiao-proxy.herokuapp.com/tt/weather";

  const url = false ? test : production;
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
  return fetch("MockData/categories.json")
    .then((res) => res.json())
    .then((json) => json.categories);
};

export default newsApi;
