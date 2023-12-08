import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import registerReducer from "./features/auth/registerSlice";
import demandReducer from "./features/demandsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: registerReducer,
    demand: demandReducer,
  },
});

export default store;
