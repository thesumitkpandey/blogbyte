import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
export default store;
