import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import registerReducer from "./features/auth/registerSlice";
import demandReducer from "./features/demandsSlice";
import userEventsReducer from "./features/events/UserEventsSlice";
import projectEventsReducer from "./features/events/PorjectEventSlice";
import userReducer from "./features/userSlice";
import invitationReducer from "./features/invitationSlice";
import projectReducer from "./features/project/projectSlice";
import statisticsReducer from "./features/statistics/statisticsSlice";
import resourcesReducer from "./features/project/resourceSlice"
import chatReducer from "./features/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: registerReducer,
    demand: demandReducer,
    userEvents: userEventsReducer,
    projectEvents: projectEventsReducer,
    users: userReducer,
    invitation: invitationReducer,
    project: projectReducer,
    statistics: statisticsReducer,
    resources : resourcesReducer,
    chat: chatReducer,
  },
});

export default store;
