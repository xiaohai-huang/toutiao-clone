import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "泉州旅游",
  },
  reducers: {
    searchQueryUpdated: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const selectSearchQuery = (state) => state.search.searchQuery;

export const { searchQueryUpdated } = searchSlice.actions;

export default searchSlice.reducer;
