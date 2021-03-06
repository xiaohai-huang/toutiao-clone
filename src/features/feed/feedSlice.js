import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsApi from "../../Api/newsApi";

export const fetchNews = createAsyncThunk(
  "feed/fetchNews",
  async (category, { getState }) => {
    const oldNews = getState().feed.news[`${category}`];
    const latestNews = oldNews[oldNews.length - 1];
    const latestTime = latestNews?.behot_time;
    const news = await newsApi.getNews(latestTime, category);

    return { news, category };
  }
);
let initialNews = {
  __all__: [],
  news_hot: [],
  xiaohai: [],
  news_entertainment: [],
  news_tech: [],
  news_military: [],
  news_history: [],
  news_food: [],
  software: [],
  internet: [],
  news_sports: [],
  news_car: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    news: initialNews,
    category: "__all__",
    status: "idle",
    error: null,
  },
  reducers: {
    categoryUpdated: (state, action) => {
      state.category = action.payload;
    },
    categoryDeleted: (state, action) => {
      const category = action.payload;
      state.news[category] = [];
    },
  },
  extraReducers: {
    [fetchNews.fulfilled]: (state, action) => {
      const currentCategory = action.payload.category;
      let newNews = action.payload.news;
      let oldNews = state.news[currentCategory];
      if (oldNews && oldNews.length !== 0) {
        newNews = newNews.filter((nn) => {
          for (let i = 0; i < oldNews.length; i++) {
            if (oldNews[i].item_id === nn.item_id) {
              return false;
            }
          }
          return true;
        });
      }

      if (!newNews || newNews?.length === 0) {
        state.status = "failed";
        return;
      }

      // sort the news in DESC order

      state.news[currentCategory].push(...newNews);
      state.news[currentCategory].sort((a, b) => b.behot_time - a.behot_time);
      state.status = "successed";
    },
    [fetchNews.pending]: (state) => {
      state.status = "loading";
    },
    [fetchNews.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    },
  },
});

export const { categoryUpdated, categoryDeleted } = feedSlice.actions;

export default feedSlice.reducer;
