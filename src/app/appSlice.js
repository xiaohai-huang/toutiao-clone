import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    device: "mobile",
    displayMode: "light",
    user: null,
    currentPosition: "home",
  },
  reducers: {
    deviceUpdated: (state, action) => {
      state.device = action.payload;
    },
    displayModeUpdated: (state, action) => {
      state.displayMode = action.payload;
    },
    positionUpdated: (state, action) => {
      state.currentPosition = action.payload;
    },
    userUpdated: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});

export const {
  deviceUpdated,
  positionUpdated,
  displayModeUpdated,
  userUpdated,
  userLogout,
} = appSlice.actions;
export default appSlice.reducer;
