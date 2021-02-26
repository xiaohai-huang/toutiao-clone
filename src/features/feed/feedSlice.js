import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsApi from "../../Api/newsApi";

export const fetchNews = createAsyncThunk(
  "feed/fetchNews",
  async (_, { getState }) => {
    const oldNews = getState().feed.news;
    const latestNews = oldNews[oldNews.length - 1];
    const latestTime = latestNews?.behot_time;
    console.log(latestTime);
    const news = await newsApi.getNews(latestTime);
    console.log(news);
    return news;
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    news: [],
    category: "__all__",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchNews.fulfilled]: (state, action) => {
      let newNews = action.payload;
      if (state.news.length !== 0) {
        newNews = newNews.filter((nn) => {
          for (let i = 0; i < state.news.length; i++) {
            if (state.news[i].item_id === nn.item_id) {
              return false;
            }
          }
          return true;
        });
      }
      console.log("passed");
      console.log(newNews);

      if (newNews.length === 0) {
        state.status = "failed";
        return;
      }

      state.news.push(...newNews);
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

export const { nextTimeUpdated } = feedSlice.actions;

export default feedSlice.reducer;
