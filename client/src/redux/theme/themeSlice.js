import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  darkMode: false,
};
export const themeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.darkMode = !action.payload;
    },
  },
});

export const { setDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
