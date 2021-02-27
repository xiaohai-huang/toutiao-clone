let newsApi = {};

newsApi.getNews = (time, category = "__all__") => {
  const test = "MockData/news.json";
  // const test = `http://localhost:4500/tt/news/${category}?max_behot_time=${time}`;
  const production = `https://toutiao-proxy.herokuapp.com/tt/news/${category}?max_behot_time=${time}`;

  const url = false ? test : production;
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);
};

newsApi.getCategories = () => {
  return fetch("MockData/categories.json")
    .then((res) => res.json())
    .then((json) => json.categories);
};

export default newsApi;
