let newsApi = {};

newsApi.getNews = () => {
  return fetch("MockData/news.json")
    .then((res) => res.json())
    .then((json) => json.data);
};

newsApi.getCategories = () => {
  return fetch("MockData/categories.json")
    .then((res) => res.json())
    .then((json) => json.categories);
};

export default newsApi;
