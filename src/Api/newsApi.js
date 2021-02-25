let newsApi = {};

newsApi.getNews = () => {
  return fetch("MockData/news.json")
    .then((res) => res.json())
    .then((json) => json.data);
};

export default newsApi;
