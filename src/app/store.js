import { configureStore } from "@reduxjs/toolkit";

import appReducer from "../app/appSlice";
import feedReducer from "../features/feed/feedSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    feed: feedReducer,
  },
});
