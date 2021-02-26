let newsApi = {};

newsApi.getNews = (time) => {
  return fetch(
    `https://toutiao-proxy.herokuapp.com/tt/news/__all__?max_behot_time=${time}`
  )
    .then((res) => res.json())
    .then((json) => json.data);
};

newsApi.getCategories = () => {
  return fetch("MockData/categories.json")
    .then((res) => res.json())
    .then((json) => json.categories);
};

export default newsApi;
