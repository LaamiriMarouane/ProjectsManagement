import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import registerReducer from "./features/auth/registerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: registerReducer,
  },
});

export default store;
