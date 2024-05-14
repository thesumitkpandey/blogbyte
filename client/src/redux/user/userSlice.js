import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
