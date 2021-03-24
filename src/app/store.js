import { configureStore } from "@reduxjs/toolkit";

import appReducer from "../app/appSlice";
import feedReducer from "../features/feed/feedSlice";
import videoReducer from "../features/video/videoSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    feed: feedReducer,
    video: videoReducer,
  },
});
