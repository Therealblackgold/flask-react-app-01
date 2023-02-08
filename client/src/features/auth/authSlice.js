import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      //assigning action.payload to accessToken

      const { accessToken } = action.payload;
      //then setting the state.token to accessToken which is the action.payload from previous line
      state.token = accessToken;
    },
    logOut: (state, action) => {
      //setting state.token to null on logout
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// creating state selector
export const selectCurrentToken = (state) => state.auth.token;
