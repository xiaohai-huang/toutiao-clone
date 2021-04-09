import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsApi from "../../Api/newsApi";

export const fetchNews = createAsyncThunk(
  "feed/fetchNews",
  async (category, { getState }) => {
    // skip search results
    if (category === "search_results") {
      return { news: [], category: "" };
    }
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
    // console.log("number of videos: " + allVideos.length);
    if (allVideos.length > 25) {
      console.log(
        "Too much videos, you can refresh the page to load new videos"
      );

      return { news: [], category: "xigua" };
    }
    const videos = await newsApi.getVideos();
    return videos;
  }
);

export const fetchSearchResults = createAsyncThunk(
  "feed/fetchSearchResults",
  async (searchQuery = "深圳", { getState }) => {
    if (searchQuery === "") {
      searchQuery = "深圳";
    }
    const currentLength = selectSearchResults(getState()).length;
    const results = await newsApi.getSearchResults(searchQuery, currentLength);
    if (!results) {
      return [];
    }
    return results;
  }
);
let initialNews = {
  __all__: [],
  news_hot: [],
  xigua: [],
  movies: [],
  xiaohai: [],
  search_results: [],
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
    newsDeleted: (state, action) => {
      // only keep the first few news
      const { category, count } = action.payload;
      const currentCount = state.news[category].length;
      if (count < currentCount) {
        state.news[category] = state.news[category].slice(0, count);
      }
    },
  },
  extraReducers: {
    [fetchNews.fulfilled]: addFulfilledReducer,
    [fetchNews.pending]: pendingReducer,
    [fetchNews.rejected]: rejectedReducer,
    [fetchVideos.fulfilled]: addVideosFulfilledReducer,
    [fetchVideos.pending]: pendingReducer,
    [fetchVideos.rejected]: rejectedReducer,
    [fetchSearchResults.fulfilled]: (state, action) => {
      let newResults = action.payload;

      state.news.search_results.push(...newResults);
      state.status = "successed";
    },
    [fetchSearchResults.pending]: pendingReducer,
    [fetchSearchResults.rejected]: rejectedReducer,
  },
});

function pendingReducer(state) {
  state.status = "loading";
}
function rejectedReducer(state, action) {
  state.error = action.error.message;
  state.status = "failed";
}

function addFulfilledReducer(state, action) {
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
  // state.news[currentCategory].sort((a, b) => b?.behot_time - a?.behot_time);
  state.status = "successed";
}

function addVideosFulfilledReducer(state, action) {
  const { shortVideos, movies } = action.payload;
  if (movies) {
    state.news.movies.push(...movies);
  }
  // state.news.movies.sort((a, b) => b?.behot_time - a?.behot_time);
  if (shortVideos) {
    state.news.xigua.push(...shortVideos);
  }

  // remove duplicate objs
  state.news.xigua = state.news.xigua.filter(
    (v, i, a) => a.findIndex((t) => t.item_id === v.item_id) === i
  );
  state.news.movies = state.news.movies.filter(
    (v, i, a) => a.findIndex((t) => t.title === v.title) === i
  );
  state.news.movies = state.news.movies.map((m) => {
    m.item_id = m.anchorProps.href.split("/")[1];
    const imageUri = m.coverURIConfig.uri.split("/")[1];
    const richPreviewImageUri = m.richPreviewProps.coverURIConfig.uri.split(
      "/"
    )[1];
    m.image_url = `https://p9.bdxiguaimg.com/img/xigua-lvideo-pic/${imageUri}~tplv-xg-center-qs:574:802:q75.webp`;
    m.richPreviewProps.image_url = `https://p3.bdxiguaimg.com/img/xigua-lvideo-pic/${richPreviewImageUri}~tplv-noop.webp`;
    return m;
  });

  state.status = "successed";
}

export const selectVideos = (state) => state.feed.news.xigua;
export const selectMovies = (state) => state.feed.news.movies;
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
    // 1 because, the playing video itself will be removed at the recommend list
    return result.length === 1 ? state.feed.news.xigua : result;
  };
};

export function selectSearchResults(state) {
  return state.feed.news.search_results;
}

export const {
  categoryUpdated,
  categoryDeleted,
  newsDeleted,
} = feedSlice.actions;

export default feedSlice.reducer;
