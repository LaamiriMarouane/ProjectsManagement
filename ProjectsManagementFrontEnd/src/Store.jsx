import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import registerReducer from "./features/auth/registerSlice";
import demandReducer from "./features/demandsSlice";
import userEventsReducer from "./features/events/UserEventsSlice";
import userReducer from "./features/userSlice";
import invitationReducer from "./features/invitationSlice";
import projectReducer from "./features/project/projectSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: registerReducer,
    demand: demandReducer,
    userEvents: userEventsReducer,
    users: userReducer,
    invitation: invitationReducer,
    project: projectReducer,
  },
});

export default store;
