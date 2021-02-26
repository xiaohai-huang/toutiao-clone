import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    device: "PC",
    displayMode: "light",
  },
  reducers: {
    deviceUpdated: (state, action) => {
      state.device = action.payload;
    },
    displayModeUpdated: (state, action) => {
      state.displayMode = action.payload;
    },
  },
});

export const { deviceUpdated, displayModeUpdated } = appSlice.actions;
export default appSlice.reducer;
