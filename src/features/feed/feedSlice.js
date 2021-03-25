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
export const fetchVideos = createAsyncThunk(
  "feed/fetchVideos",
  async (_, { getState }) => {
    const allVideos = selectVideos(getState());
    console.log("number of videos: " + allVideos.length);
    if (allVideos.length > 25) {
      console.log(
        "Too much videos, you can refresh the page to load new videos"
      );

      return { news: [], category: "xigua" };
    }
    const videos = await newsApi.getVideos();
    return { news: videos, category: "xigua" };
  }
);
let initialNews = {
  __all__: [],
  news_hot: [],
  xigua: [],
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
    [fetchNews.fulfilled]: addFullfilledReducer,
    [fetchNews.pending]: pendingReducer,
    [fetchNews.rejected]: rejectedReducer,
    [fetchVideos.fulfilled]: addFullfilledReducer,
    [fetchVideos.pending]: pendingReducer,
    [fetchVideos.rejected]: rejectedReducer,
  },
});

function pendingReducer(state) {
  state.status = "loading";
}
function rejectedReducer(state, action) {
  state.error = action.error.message;
  state.status = "failed";
}

function addFullfilledReducer(state, action) {
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
  state.news[currentCategory].sort((a, b) => b?.behot_time - a?.behot_time);
  state.status = "successed";
}

export const selectVideos = (state) => state.feed.news.xigua;
export const selectVideosAfterId = (id, maxCount = 13) => {
  return (state) => {
    const item_index = state.feed.news.xigua.findIndex(
      (video) => video.item_id === id
    );

    const filteredVideos = state.feed.news.xigua.filter((_, i) => {
      return i >= item_index;
    });
    const count = filteredVideos.length;
    // handle situation that the video is not in the list
    const result = filteredVideos.slice(0, maxCount > count ? count : maxCount);

    return result.length === 0 ? state.feed.news.xigua : result;
  };
};

export const { categoryUpdated, categoryDeleted } = feedSlice.actions;

export default feedSlice.reducer;
