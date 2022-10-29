import { createSlice } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export default alertsSlice.reducer;

export const {showLoading, hideLoading} = alertsSlice.actions;