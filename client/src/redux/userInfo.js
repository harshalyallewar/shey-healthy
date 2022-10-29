import { createSlice } from "@reduxjs/toolkit";

export const userInfo = createSlice({
  name: "user",
  initialState: {
    userDetails: 'null',
  },
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
    }
  },
});

export default userInfo.reducer;

export const { setUser } = userInfo.actions;
