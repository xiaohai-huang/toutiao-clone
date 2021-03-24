import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsApi from "../../Api/newsApi";

export const fetchVideoDetails = createAsyncThunk(
  "video/fetchVideoDetails",
  async (video_id, { getState }) => {
    const exist = selectAllVideoDetails(getState()).some(
      (oldVideo) => oldVideo.gid === `${video_id}`
    );

    if (exist) {
      return;
    }
    const newVideoDetails = await newsApi.getNewsById(video_id);
    return newVideoDetails;
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState: { videoDetails: [], status: "idle" },
  reducers: {
    addNewVideoDetails: (state, action) => {
      if (action.payload) {
        state.videoDetails.push(action.payload);
      }
    },
  },
  extraReducers: {
    [fetchVideoDetails.fulfilled]: (state, action) => {
      if (action.payload) {
        state.videoDetails.push(action.payload);
      }
      state.status = "success";
    },
    [fetchVideoDetails.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVideoDetails.rejected]: (state) => {
      state.status = "fail";
    },
  },
});

export const selectVideoDetailsById = (video_id) => {
  return (state) => state.video.videoDetails.find((v) => v.gid === video_id);
};
export function selectAllVideoDetails(state) {
  return state.video.videoDetails;
}
export const { addNewVideoDetails } = videoSlice.actions;

export default videoSlice.reducer;
